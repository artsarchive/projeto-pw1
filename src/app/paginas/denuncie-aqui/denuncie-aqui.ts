import { Component } from '@angular/core';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import { MapOptions, tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-denuncie-aqui',
  imports: [LeafletDirective],
  templateUrl: './denuncie-aqui.html',
  styleUrl: './denuncie-aqui.css',
})
export class DenuncieAqui {
  protected readonly mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909),
  };

  ngOnInit() {}
}
