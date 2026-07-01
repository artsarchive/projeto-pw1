import { Component, signal, EventEmitter, Output } from '@angular/core'; /* OBS: Adição do EventEmitter e Output */
import { KeyValuePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import { MapOptions, tileLayer, latLng, LeafletMouseEvent, layerGroup, marker } from 'leaflet'; /* OBS: Adição do LeafletMouseEvent */
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
      (leafletClick)="onMapClick($event)">
    </div>
  `,
}) /* OBS: Adição de (leafletClick)="onMapClick($event)"> */

export class Map { /* OBS: Exportei a class */
  /* OBS: Adição do Output(). */
  @Output()
  localSelecionado = new EventEmitter<{
    latitude: number;
    longitude: number;
  }>();

  protected readonly markers = layerGroup();

  protected readonly mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }),
      this.markers,
    ],
    zoom: 14,
    center: latLng(-14.79755, -39.17305),
  };

  /* OBS: Adição do onMapClick(). */
  onMapClick(event: LeafletMouseEvent) {
    // TODO: fazer imagem do marker funcionar
    this.markers.clearLayers();
    marker(event.latlng).addTo(this.markers);

    this.localSelecionado.emit({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  }
}

export class Submissao {
  constructor(
    public tipoViolencia: string = "agressao",
    public dataOcorrencia: string = "",
    public horarioOcorrencia: string = "tarde",
    public pontoReferencia: string = "",
    public local: string = "",
    public latitude: number | null = null, /* OBS: Adição */
    public longitude: number | null = null, /* OBS: Adição */
  ) {}
}

function dateOffset(d: Date, off: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + off);
  return c;
}

@Component({
  selector: 'app-denuncie-aqui',
  imports: [Map, Menu, FormsModule, KeyValuePipe, JsonPipe, Rodape],
  templateUrl: './denuncie-aqui.html',
  styleUrl: './denuncie-aqui.css',
})
export class DenuncieAqui {
  debugSig = signal("");

  readonly tiposViolencia = {
    "trafico": "Tráfico",
    "sexual": "Sexual",
    "feminicidio": "Feminicídio",
    "agressao": "Agressão",
    "psicologica": "Psicológica",
    "exploração": "Exploração",
    "machismo": "Machismo",
    "assalto": "Assalto",
    "insulto": "Insulto",
    "desrespeito": "Desrespeito",
    "injustica": "Injustiça",
    "indiferença": "Indiferença",
  };

  readonly horariosOcorrencia = {
    "madrugada": "Madrugada (00:00 - 04:59)",
    "manha": "Manhã (05:00 - 12:59)",
    "tarde": "Tarde (13:00 - 17:59)",
    "noite": "Noite (18:00 - 23:59)",
  };

  model = new Submissao();

  validateForm(): boolean {
    const now = new Date();
    const got = new Date(this.model.dataOcorrencia).getDate();

    if (got < dateOffset(now, -7).getDate()) return false;
    if (got > now.getDate()) return false;
    return true;
  }

  onSubmit(ev: Event) {
    this.debugSig.set(`Tentou enviar; válido=${this.validateForm()}`);
  }

  /* OBS: Adição do método receberLocal() */
  receberLocal(local: { latitude: number; longitude: number }) {
    this.model.latitude = local.latitude;
    this.model.longitude = local.longitude;

    // this.debugSig.set(
    //   `Lat: ${local.latitude}, Lng: ${local.longitude}`
    // );
  }
}
