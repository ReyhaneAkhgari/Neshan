
import { Component,Input, OnInit, Output,EventEmitter,ViewEncapsulation} from '@angular/core';

const leafletNeshan= require('../src/assets/js/leafletNeshan.js');

@Component({
  selector: 'lib-anne-of-green-gables',
  template: `
  
  <div id='map' style="width: 800px; height: 500px; background: #eee; border: 2px solid #aaa;">  
    <div class="leafleat-top leaflet-left" style="position:absolute;width:34px;height:34px;z-index:20000;top:75px;left:10px;">
      <button style="height:34px;width:34px;" (click)="moveToCurrentLocation()">
      <img src="../src/assets/icon/my-location.png" style="position: relative;top: -3px;right: 5px;">
    </button>
    <div class="leafleat-top leaflet-right" style="position:absolute;width:34px;height:34px;z-index:20000;">
      <button style="height:34px;width:34px;" (click)="removeMarkers()">rm</button>
    </div> 
  </div>
  `,
  styleUrls: [
    '../assets/style/leafletNeshan.css'
], 
  encapsulation: ViewEncapsulation.None
})
export class AnneOfGreenGablesComponent implements OnInit {
  @Input() key = '';
  @Input() center: Array<number> = [0, 0];
  @Input() zoom = 14;
  @Input() mapType = 'dreamy';
  @Input() poi: boolean = true;
  @Input() traffic: boolean = false;
  @Output() lastCenter: EventEmitter<Point2D> = new EventEmitter();
  @Output() counterMove: EventEmitter<number> = new EventEmitter();
  @Output() selectedMarkerlng: EventEmitter<Point2D> = new EventEmitter();
  public _map: any;
  public marker: any;
  public layerGroup: any;
  public circleMarker: any;
  public activeMarker: Array<Point2D> = new Array<Point2D>();
  public markermarker: any;
  public markersIndex: any;
  public Layers: any;
  public removeLayers: any;
  Lat: any;
  lng: any;
  public currentLocation:Array<number>=[];
  public movecenter!: Array<number>;
  x: any;
  y: any;
  arr: Array<number> = [];
  public counter: number = 0;
  public selectedIcon = leafletNeshan.icon({
    iconUrl: '../src/assets/icon/marker-selected.png',
    iconSize: [35, 40]
  });
  public unselectedIcon = leafletNeshan.icon({
    iconUrl: '../src/assets/icon/marker-not-selected.png',
    iconSize: [35, 40]
  });
  constructor() {


  }

  ngOnInit(): void {
    this.initMap();
    this._emitLastCenter();
    this.layerGroup = leafletNeshan.layerGroup().addTo(this._map);
  }

  initMap() {
    this._map = new leafletNeshan.Map('map', {
      key: this.key,
      center: this.center,
      zoom: this.zoom,
      poi: this.poi,
      maptype: this.mapType,
      traffic: this.traffic,
    });
    leafletNeshan.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20
    }).addTo(this._map);
    this._map.locate({ setView: true, maxZoom: 16 });
    this._map.on('locationfound', this.onLocationFound);
  }
  private _emitLastCenter() {
    this._map.on('moveend', (ev: any) => {
      this.lastCenter.emit(this._map.getCenter() as Point2D);
      this.counter++;
      this.counterMove.emit(this.counter);
    });
  }

  public concatMarkers(markers: Array<Point2D>) {
    markers.forEach((item) => {
      leafletNeshan.marker([item.lat, item.lng], { icon: this.unselectedIcon }).on('click', (ev: any) => {
        this.Layers = this.layerGroup.getLayers();
        this.Layers.forEach((element: any) => { element.setIcon(this.unselectedIcon) });
        ev.target.setIcon(this.selectedIcon);
      }).addTo(this.layerGroup);
    });
  }

  public removeMarkers() {
    this.layerGroup.clearLayers();
  }

  public onLocationFound(e: any) {
    const layerTemp = leafletNeshan.circle(e.latlng, e.accuracy - 50).addTo(e.target);
    this.layerGroup = leafletNeshan.layerGroup().addLayer(layerTemp).addTo(e.target);
    this.currentLocation=e.latlng;
  }

  public moveToCurrentLocation() {
    this._map.setView(this._map.currentLocation);
  }

}

export class Point2D {
  public lat: number = 0;
  public lng: number = 0;
  on: any;
  setIcon: any;

  constructor() {
    this.lat = 0;
    this.lng = 0;
  }
}
