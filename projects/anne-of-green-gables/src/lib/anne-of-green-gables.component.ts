
import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation, AfterViewInit } from '@angular/core';

const leafletNeshan = require('../src/assets/js/leafletNeshan.js');

@Component({
  selector: 'lib-anne-of-green-gables',
  template: `  
  <div id="{{this.idRandom}}" style="min-height: 440px; background: #eee; border: 2px solid #aaa;">  
    <div class="leafleat-top leaflet-left" style="position:absolute;width:32px;height:32px;z-index:20000;top:75px;left:10px;">
      <button style="height:32px;width:32px;" (click)="moveToCurrentLocation()">
        <img src="/assets/icons/my-location.png" style="position: absolute;top: 0;right: 0;">
      </button>
    </div>
  </div>
  `,
  styleUrls: [
    '../assets/style/leafletNeshan.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AnneOfGreenGablesComponent implements AfterViewInit {
  @Input() key = '';
  @Input() center: Array<number> = [0, 0];
  @Input() zoom = 14;
  @Input() mapType = 'dreamy';
  @Input() poi: boolean = true;
  @Input() traffic: boolean = false;
  @Input() setView: boolean = true;
  @Output() lastCenter: EventEmitter<Point2D> = new EventEmitter<Point2D>();
  @Output() locationFound: EventEmitter<Point2D> = new EventEmitter<Point2D>();
  @Output() selectedMarkerIndex: EventEmitter<number> = new EventEmitter<number>();
  public _map: any;
  private _layerGroup: any;
  private _circleLayerGroup: any;
  private _currentLocation: Point2D = new Point2D();
  public idRandom = Math.random().toString(36).substring(2);

  private _selectedIcon = leafletNeshan.icon({
    iconUrl: 'src/assets/icons/marker-selected.png',
    iconSize: [35, 40],
  });
  private _unselectedIcon = leafletNeshan.icon({
    iconUrl: 'src/assets/icons/marker-not-selected.png',
    iconSize: [35, 40],
  });

  constructor() {
  }
  ngAfterViewInit() {
    this.initMap();
    this._layerGroup = leafletNeshan.layerGroup().addTo(this._map);
    this._emitLastCenterOnMoveEnd();
  }
  
  initMap() {
    this._map = new leafletNeshan.Map(this.idRandom, {
      key: this.key,
      center: this.center,
      zoom: this.zoom,
      poi: this.poi,
      maptype: this.mapType,
      traffic: this.traffic,
    });
    leafletNeshan.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: this.zoom
    }).addTo(this._map);
    this._map.locate({ setView: this.setView, maxZoom: this.zoom });
    this._map.on('locationfound', (e: any) => {
      const layerTemp = leafletNeshan.circle(e.latlng, e.accuracy).addTo(e.target);
      this._circleLayerGroup = leafletNeshan.layerGroup().addLayer(layerTemp).addTo(e.target);
      this._currentLocation.setFromLatLng(e.latlng);
      this.locationFound.emit(this._currentLocation);
    });
  }
  private _emitLastCenterOnMoveEnd() {
    this._map.on('moveend', (_ev: any) => {
      this.lastCenter.emit(this._map.getCenter() as Point2D);
    });
  }

  public concatMarkers(markers: Array<Point2D>) {
    const markerStyle = { border: '0px', background: 'transparent' }
    markers.forEach((item) => {
      const _iconDivSelect = leafletNeshan.divIcon({
        html: '<div style="position:relative;text-align:center;width:35px;height:40px;">' +
          '<img src="src/assets/icons/marker-selected.png" style="width:35px;height:40px;"/>' +
          '<span style="top:30%;left:25%;position:absolute;font-size:.6rem;color:#fff;">' + item.text + '</span>' + '</div>', className: 'markerStyle'
      });
      const _iconDivUnselect = leafletNeshan.divIcon({
        html: '<div style="position:relative;text-align:center;width:35px;height:40px;">' +
          '<img src="src/assets/icons/marker-not-selected.png" style="width:35px;height:40px;"/>' +
          '<span style="top:30%;left:25%;position:absolute;font-size:.6rem;color:#2a168c;">' + item.text + '</span>' + '</div>', className: 'markerStyle'
      });
      leafletNeshan.marker([item.lat, item.lng], { icon: _iconDivUnselect, alt: item.text }).on('click', (ev: any) => {
        const markerLayers = this._layerGroup.getLayers();
        markerLayers.forEach((element: any, index: number) => {
          if (element instanceof leafletNeshan.Marker) {
            const _iconDivSelect = leafletNeshan.divIcon({
              html: '<div style="position:relative;text-align:center;width:35px;height:40px;">' +
                '<img src="src/assets/icons/marker-selected.png" style="width:35px;height:40px;"/>' +
                '<span style="top:30%;left:25%;position:absolute;font-size:.6rem;color:#fff;">' + element['options']['alt'] + '</span>' + '</div>', className: 'markerStyle'
            });
            const _iconDivUnselect = leafletNeshan.divIcon({
              html: '<div style="position:relative;text-align:center;width:35px;height:40px;">' +
                '<img src="src/assets/icons/marker-not-selected.png" style="width:35px;height:40px;"/>' +
                '<span style="top:30%;left:25%;position:absolute;font-size:.6rem;color:#2a168c;">' + element['options']['alt'] + '</span>' + '</div>', className: 'markerStyle'
            });
            element.setIcon(_iconDivUnselect);
            if (element._latlng.lat == item.lat && element._latlng.lng == item.lng) {
              element.setIcon(_iconDivSelect);
              this._map.flyTo(element._latlng);
              this.selectedMarkerIndex.emit(index);
            }
          }
        });
      }).addTo(this._layerGroup);
    });
  }
  public concatMarkers2(markers: Array<Point2D>) {
    markers.forEach((item) => {
      leafletNeshan.marker([item.lat, item.lng], { icon: this._unselectedIcon }).on('click', (ev: any) => {
        const markerLayers = this._layerGroup.getLayers();
        markerLayers.forEach((element: any, index: number) => {
          if (element instanceof leafletNeshan.Marker) {
            element.setIcon(this._unselectedIcon);
            if (element._latlng.lat == item.lat && element._latlng.lng == item.lng) {
              element.setIcon(this._selectedIcon);
              this._map.flyTo(element._latlng);
              this.selectedMarkerIndex.emit(index);
            }
          }
        });
      }).addTo(this._layerGroup);
    });
  }

  public removeMarkers() {
    this._layerGroup.clearLayers();
  }

  public moveToCurrentLocation() {
    this._map.setView(this._currentLocation);
  }

  public selectMarker(item: Point2D): void {
    this._layerGroup.getLayers().forEach((element: any) => {
      if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
        element.setIcon(this._selectedIcon);
      }
    });
  }

  public unSelectMarker(item: Point2D): void {
    this._layerGroup.getLayers().forEach((element: any) => {
      if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
        element.setIcon(this._unselectedIcon);
      }
    });
  }
  public selectDivIcon(item: Point2D): void {
    const markerStyle = { border: '0px', background: 'transparent' }
    const _iconDivSelect = leafletNeshan.divIcon({
      html: '<div style="position:relative;text-align:center;width:35px;height:40px;">'
        + '<img src="src/assets/icons/marker-selected.png" style="width:35px;height:40px;"/>'
        + '<span style="top:30%;left:25%;position:absolute;font-size:.6rem;color:#fff;">' + item.text + '</span>' + '</div>', className: 'markerStyle'
    });
    this._layerGroup.getLayers().forEach((element: any) => {
      if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
        element.setIcon(_iconDivSelect);
      }
    });
  }

  public unSelectDivIcon(item: Point2D): void {
    const markerStyle = { border: '0px', background: 'transparent' }
    const _iconDivUnselect = leafletNeshan.divIcon({
      html: '<div style="position:relative;text-align:center;width:35px;height:40px;">'
        + '<img src="src/assets/icons/marker-not-selected.png" style="width:35px;height:40px;"/>'
        + '<span style="top:30%;left:25%;position:absolute;font-size:.6rem;color:#2a168c;">' + item.text + '</span>' + '</div>', className: 'markerStyle'
    });
    this._layerGroup.getLayers().forEach((element: any) => {
      if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
        element.setIcon(_iconDivUnselect);
      }
    });
  }

  public flyTo(item: Point2D): void {
    this._map.flyTo(item, this.zoom);
  }
  removeMap() {
    this._map.remove();
  }

}


export class Point2D {
  public lat: number = 0;
  public lng: number = 0;
  public text: string = '';

  constructor() {
    this.lat = 0;
    this.lng = 0;
    this.text = '';
  }

  public setFromLatLng(latLng: { lat: number, lng: number }): void {
    this.lat = latLng.lat;
    this.lng = latLng.lng;
  }
}
