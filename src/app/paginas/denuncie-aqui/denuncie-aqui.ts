import { Component } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import { MapOptions, tileLayer, latLng } from 'leaflet';
import { Menu } from '../../a/menu/menu';

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

// TODO: https://angular.dev/guide/forms/template-driven-forms
export class Form {
  constructor(
    public tipoViolencia: string,
    public dataOcorrencia: string,
    public horarioOcorrencia: string,
    public pontoReferencia: string,
    public local: string, // TODO: descobrir tipo
  ) {}
}

@Component({
  selector: 'app-denuncie-aqui',
  imports: [Map, Menu, FormsModule, KeyValuePipe],
  templateUrl: './denuncie-aqui.html',
  styleUrl: './denuncie-aqui.css',
})
export class DenuncieAqui {
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

  model = new Form("agressao", "", "tarde", "", "");
}
