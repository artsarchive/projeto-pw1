import {
  Component,
  signal,
  EventEmitter,
  Output,
  Input,
  viewChild,
  ElementRef,
  AfterViewInit,
  inject,
} from '@angular/core';

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
import 'leaflet-control-geocoder';

const template = `
  <div
    style="height: 100%"
    leaflet
    [leafletOptions]="mapOptions"
    (leafletClick)="onMapClick($event)"
  ></div>
`;

@Component({
  selector: 'app-base-map',
  imports: [LeafletDirective],
  template: template,
})
export class BaseMap {
  @Output() localSelecionado = new EventEmitter<LatLng>();
  @Output() nomeLocalCarregado = new EventEmitter<string>();

  map = viewChild.required<ElementRef>('map');
  geocoder: any = null;

  protected readonly defaultLocation = latLng(-14.79755, -39.17305);
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
    center: this.defaultLocation,
  };

  clearMarkers() {
    console.log("CLEAR");
    this.markers.clearLayers();
  }

  setOnlyMarker(latlng: {lat: number, lng: number}) {
    this.clearMarkers();
    this.addMarker(latlng);
  }

  addMarker(latlng: {lat: number, lng: number}) {
    console.log(["ADD", latlng]);
    marker(latlng).addTo(this.markers);
  }

  onMapClick(event: LeafletMouseEvent) {
    this.localSelecionado.emit(event.latlng);
  }
}

@Component({
  selector: 'app-reverse-geocoded-map',
  imports: [LeafletDirective],
  template: template,
})
export class ReverseGeocodedMap extends BaseMap implements AfterViewInit {
  ngAfterViewInit() {
    const L = leaflet as any;
    this.geocoder = new L.Control.Geocoder({
      geocoder: L.Control.Geocoder.nominatim(),
      defaultMarkGeocode: false,
    });
    this.geocoder.addTo(this);
  }

  override onMapClick(event: LeafletMouseEvent) {
    super.onMapClick(event);
    this.setOnlyMarker(event.latlng);

    const zoom = 1000000000; // XXX: acho que seria bom calcular o zoom mas não entendi como; isso aqui dá pro gasto
    this.geocoder.options.geocoder
      .reverse(event.latlng, zoom)
      .then((results: {name: string}[]) => {
        const r = results[0];
        if (!r) return;
        this.nomeLocalCarregado.emit(r.name);
      });
  }
}
