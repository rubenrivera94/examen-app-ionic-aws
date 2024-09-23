import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener las coordenadas
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  lat: number;
  lng: number;

  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    // Obtener las coordenadas del historial
    let geo: any = this.route.snapshot.queryParamMap.get('geo');

    // Procesar el texto del formato geo:lat,lng
    geo = geo.substr(4); // Eliminar "geo:"
    geo = geo.split(','); // Dividir en lat y lng
    this.lat = Number(geo[0]);
    this.lng = Number(geo[1]);

    // Iniciar el mapa centrado en las coordenadas
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoicmFyYjk0IiwiYSI6ImNtMGRhZTJhbjA2b3gyam9ncmV5MDN1cXQifQ.CwslITrWqmC4FXJF57IC1Q';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.lng, this.lat], // Centrar en las coordenadas
      zoom: 15.5, // Zoom inicial
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    // Agregar un marcador en las coordenadas
    new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(map);

    // Manejar evento de carga del mapa
    map.on('load', () => {
      map.resize();
    });
  }
}
