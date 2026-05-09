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
      tileLayer('https://www.openstreetmap.org/search?lat=-13.86059&lon=-40.07263&zoom=15#map=15/-13.86060/-40.07261', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909),
  };

  ngOnInit() {}
}
