import { Component } from '@angular/core';
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
export class Map {
  protected readonly mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 14,
    center: latLng(-14.79755, -39.17305),
  };
}

@Component({
  selector: 'app-denuncie-aqui',
  imports: [Map, Menu],
  templateUrl: './denuncie-aqui.html',
  styleUrl: './denuncie-aqui.css',
})
export class DenuncieAqui {}
