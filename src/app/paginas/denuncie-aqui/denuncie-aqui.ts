import {
  Component,
  signal,
  EventEmitter,
  Output,
  ViewChild,
  viewChild,
  ElementRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import { KeyValuePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import {
  MapOptions,
  tileLayer,
  LatLng,
  latLng,
  LeafletMouseEvent,
  layerGroup,
  marker,
} from 'leaflet';
import * as leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder';

import { Menu } from '../../a/menu/menu';
import { Rodape } from '../../a/rodape/rodape';

@Component({
  selector: 'app-map',
  imports: [LeafletDirective],
  template: `
    <div
      style="height: 100%"
      leaflet
      [leafletOptions]="mapOptions"
      (leafletClick)="onMapClick($event)"
    ></div>
  `,
}) /* OBS: Adição de (leafletClick)="onMapClick($event)"> */
export class Map implements AfterViewInit {
  /* OBS: Exportei a class */
  map = viewChild.required<ElementRef>('map');
  geocoder: any = null;

  /* OBS: Adição do Output(). */
  @Output()
  localSelecionado = new EventEmitter<LatLng>();

  @Output()
  nomeLocalCarregado = new EventEmitter<string>();

  protected readonly markers = layerGroup();

  protected readonly mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Mapa proveniente do <a href="https://openstreetmap.org/">OpenStreetMap</a>.',
      }),
      this.markers,
    ],
    zoom: 14,
    center: latLng(-14.79755, -39.17305),
  };

  ngAfterViewInit() {
    const L = leaflet as any;
    this.geocoder = new L.Control.Geocoder({
      geocoder: L.Control.Geocoder.nominatim(),
      defaultMarkGeocode: false,
    });
    this.geocoder.addTo(this);
  }

  /* OBS: Adição do onMapClick(). */
  onMapClick(event: LeafletMouseEvent) {
    this.markers.clearLayers();
    marker(event.latlng).addTo(this.markers);

    this.localSelecionado.emit(event.latlng);

    type NominatimResult = {
      name: string;
    };

    const zoom = 1000000000; // XXX: acho que seria bom calcular o zoom mas não entendi como; isso aqui dá pro gasto
    this.geocoder.options.geocoder
      .reverse(event.latlng, zoom)
      .then((results: NominatimResult[]) => {
        const r = results[0];
        if (!r) return;
        this.nomeLocalCarregado.emit(r.name);
      });
  }
}

export class Submissao {
  constructor(
    public tipoViolencia: string = 'agressao',
    public dataOcorrencia: string = '',
    public horarioOcorrencia: string = 'tarde',
    public pontoReferencia: string = '',
    public nomeLocal: string = '',
    public latitude: number | null = null /* OBS: Adição */,
    public longitude: number | null = null /* OBS: Adição */,
  ) {}
}

function dateOffset(d: Date, off: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + off);
  return c;
}

@Component({
  selector: 'app-denuncie-aqui',
  imports: [Map, Menu, FormsModule, KeyValuePipe, Rodape],
  templateUrl: './denuncie-aqui.html',
  styleUrl: './denuncie-aqui.css',
})
export class DenuncieAqui {
  private http = inject(HttpClient);
  debugSig = signal('');

  readonly tiposViolencia = {
    trafico: 'Tráfico',
    sexual: 'Sexual',
    feminicidio: 'Feminicídio',
    agressao: 'Agressão',
    psicologica: 'Psicológica',
    exploração: 'Exploração',
    machismo: 'Machismo',
    assalto: 'Assalto',
    insulto: 'Insulto',
    desrespeito: 'Desrespeito',
    injustica: 'Injustiça',
    indiferença: 'Indiferença',
  };

  readonly horariosOcorrencia = {
    madrugada: 'Madrugada (00:00 - 04:59)',
    manha: 'Manhã (05:00 - 12:59)',
    tarde: 'Tarde (13:00 - 17:59)',
    noite: 'Noite (18:00 - 23:59)',
  };

  model = new Submissao();

  displayCoords(): string {
    if (this.model.latitude === null || this.model.longitude === null) {
      return '';
    }
    return `${this.model.latitude}, ${this.model.longitude}`;
  }

  validateForm(): boolean {
    const now = new Date();
    const got = new Date(this.model.dataOcorrencia).getDate();

    if (got < dateOffset(now, -7).getDate()) return false;
    if (got > now.getDate()) return false;
    return true;
  }

  onSubmit(ev: Event) {
    if (!this.validateForm()) {
      this.debugSig.set("Falha ao enviar (form inválido)");
      return;
    }

    this.debugSig.set('Enviando...');
    this.http.post<any>('http://localhost:8080/denuncias/', this.model).toPromise()
      .then((response: any) => {
        this.debugSig.set(`Sucesso; resposta: ${response}`);
        console.log(response);
      })
      .catch((response: any) => {
        this.debugSig.set(`Falha; resposta: ${response}`);
        console.log(response);
      });
  }

  /* OBS: Adição do método receberLocal() */
  receberLocal(local: LatLng) {
    this.model.latitude = local.lat;
    this.model.longitude = local.lng;
    this.model.nomeLocal = '(Carregando...)';
  }

  carregarNomeLocal(nome: string) {
    this.model.nomeLocal = nome;
  }
}
