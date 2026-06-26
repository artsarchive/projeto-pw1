import { Component, signal } from '@angular/core';
import { KeyValuePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import { MapOptions, tileLayer, latLng } from 'leaflet';
import { Menu } from '../../a/menu/menu';
import { Rodape } from '../../a/rodape/rodape';

@Component({
  selector: 'app-map',
  imports: [LeafletDirective],
  template: `
    <div style="height: 100%" leaflet [leafletOptions]="mapOptions"></div>
  `,
})
class Map {
  protected readonly mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 14,
    center: latLng(-14.79755, -39.17305),
  };
}

export class Submissao {
  constructor(
    public tipoViolencia: string,
    public dataOcorrencia: string,
    public horarioOcorrencia: string,
    public pontoReferencia: string,
    public local: string, // TODO: descobrir tipo
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

    // FIXME: esses aqui fazem sentido? eles tem overlap
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

  model = new Submissao("agressao", "", "tarde", "", "");

  validateForm(): boolean {
    const now = new Date();
    const got = new Date(this.model.dataOcorrencia).getDate();

    if (got < dateOffset(now, -7).getDate()) return false;
    if (got > now.getDate()) return false;
    return true;
  }

  onSubmit(ev: Event) {
    this.debugSig.set(`SEI LA ${this.validateForm()}`);
  }
}
