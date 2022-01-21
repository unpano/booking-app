import { Component, OnInit } from '@angular/core';
import {Circle, Fill, Style} from 'ol/style';
import {Feature, Map, Overlay, View} from 'ol/index';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {useGeographic} from 'ol/proj';
import { transform } from 'ol/proj';
import { ApiKey } from "@esri/arcgis-rest-auth"
import { geocode} from '@esri/arcgis-rest-geocoding'
import 'ol/ol.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    const apiKey = "AAPK0cbee99e35d14cbebf21eda3a2bfe434S_lze-jHTfjjnMXCdlc9oQPvLydYTGYB4mG_rUib6TQm9LLBUCR-qbD-yUwo5ebE";

    let location = sessionStorage.getItem("location")?.toString()
    const query = location;

    const authentication = new ApiKey({
      key: apiKey
    });

    geocode({
        singleLine: query,
        authentication
      })
      .then((response) => {
        const result = response.candidates[0];
        const place = [result.location.x, result.location.y];
        const point = new Point(place);
        this.initializeMap(point,place)
      })
  }

  initializeMap(point: Point, place: number[]){
    const map = new Map({
      target: 'map1',
      view: new View({
        center: place,
        projection: 'EPSG:4326',
        zoom: 15,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(point)],
          }),
          style: new Style({
            image: new Circle({
              radius: 11,
              fill: new Fill({color: 'indigo'}),
            }),
          }),
        })
      ]
    })
  }

}
