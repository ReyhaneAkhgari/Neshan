import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
const leafletNeshan = require('../src/assets/js/leafletNeshan.js');
export class AnneOfGreenGablesComponent {
    constructor() {
        this.key = '';
        this.center = [0, 0];
        this.zoom = 14;
        this.mapType = 'dreamy';
        this.poi = true;
        this.traffic = false;
        this.setView = true;
        this.lastCenter = new EventEmitter();
        this.locationFound = new EventEmitter();
        this.selectedMarkerIndex = new EventEmitter();
        this._currentLocation = new Point2D();
        this.idRandom = Math.random().toString(36).substring(2);
        this._selectedIcon = leafletNeshan.icon({
            iconUrl: 'src/assets/icons/marker-selected.png',
            iconSize: [35, 40],
        });
        this._unselectedIcon = leafletNeshan.icon({
            iconUrl: 'src/assets/icons/marker-not-selected.png',
            iconSize: [35, 40],
        });
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
        this._map.on('locationfound', (e) => {
            const layerTemp = leafletNeshan.circle(e.latlng, e.accuracy).addTo(e.target);
            this._circleLayerGroup = leafletNeshan.layerGroup().addLayer(layerTemp).addTo(e.target);
            this._currentLocation.setFromLatLng(e.latlng);
            this.locationFound.emit(this._currentLocation);
        });
    }
    _emitLastCenterOnMoveEnd() {
        this._map.on('moveend', (_ev) => {
            this.lastCenter.emit(this._map.getCenter());
        });
    }
    concatMarkers(markers) {
        const markerStyle = { border: '0px', background: 'transparent' };
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
            leafletNeshan.marker([item.lat, item.lng], { icon: _iconDivUnselect, alt: item.text }).on('click', (ev) => {
                const markerLayers = this._layerGroup.getLayers();
                markerLayers.forEach((element, index) => {
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
    concatMarkers2(markers) {
        markers.forEach((item) => {
            leafletNeshan.marker([item.lat, item.lng], { icon: this._unselectedIcon }).on('click', (ev) => {
                const markerLayers = this._layerGroup.getLayers();
                markerLayers.forEach((element, index) => {
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
    removeMarkers() {
        this._layerGroup.clearLayers();
    }
    moveToCurrentLocation() {
        this._map.setView(this._currentLocation);
    }
    selectMarker(item) {
        this._layerGroup.getLayers().forEach((element) => {
            if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
                element.setIcon(this._selectedIcon);
            }
        });
    }
    unSelectMarker(item) {
        this._layerGroup.getLayers().forEach((element) => {
            if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
                element.setIcon(this._unselectedIcon);
            }
        });
    }
    selectDivIcon(item) {
        const markerStyle = { border: '0px', background: 'transparent' };
        const _iconDivSelect = leafletNeshan.divIcon({
            html: '<div style="position:relative;text-align:center;width:35px;height:40px;">'
                + '<img src="src/assets/icons/marker-selected.png" style="width:35px;height:40px;"/>'
                + '<span style="top:30%;left:25%;position:absolute;font-size:.6rem;color:#fff;">' + item.text + '</span>' + '</div>', className: 'markerStyle'
        });
        this._layerGroup.getLayers().forEach((element) => {
            if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
                element.setIcon(_iconDivSelect);
            }
        });
    }
    unSelectDivIcon(item) {
        const markerStyle = { border: '0px', background: 'transparent' };
        const _iconDivUnselect = leafletNeshan.divIcon({
            html: '<div style="position:relative;text-align:center;width:35px;height:40px;">'
                + '<img src="src/assets/icons/marker-not-selected.png" style="width:35px;height:40px;"/>'
                + '<span style="top:30%;left:25%;position:absolute;font-size:.6rem;color:#2a168c;">' + item.text + '</span>' + '</div>', className: 'markerStyle'
        });
        this._layerGroup.getLayers().forEach((element) => {
            if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
                element.setIcon(_iconDivUnselect);
            }
        });
    }
    flyTo(item) {
        this._map.flyTo(item, this.zoom);
    }
    removeMap() {
        this._map.remove();
    }
}
AnneOfGreenGablesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0, type: AnneOfGreenGablesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AnneOfGreenGablesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.0", type: AnneOfGreenGablesComponent, selector: "lib-anne-of-green-gables", inputs: { key: "key", center: "center", zoom: "zoom", mapType: "mapType", poi: "poi", traffic: "traffic", setView: "setView" }, outputs: { lastCenter: "lastCenter", locationFound: "locationFound", selectedMarkerIndex: "selectedMarkerIndex" }, ngImport: i0, template: `  
  <div id="{{this.idRandom}}" style="min-height: 440px; background: #eee; border: 2px solid #aaa;">  
    <div class="leafleat-top leaflet-left" style="position:absolute;width:32px;height:32px;z-index:20000;top:75px;left:10px;">
      <button style="height:32px;width:32px;" (click)="moveToCurrentLocation()">
        <img src="/assets/icons/my-location.png" style="position: absolute;top: 0;right: 0;">
      </button>
    </div>
  </div>
  `, isInline: true, styles: [".leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg,.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important}.leaflet-container.leaflet-touch-zoom{touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-tile{will-change:opacity}.leaflet-fade-anim .leaflet-popup{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{transform-origin:0 0}.leaflet-zoom-anim .leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline:0}.leaflet-container a{color:#0078a8}.leaflet-container a.leaflet-active{outline:2px solid orange}.leaflet-zoom-box{border:2px dotted #38f;background:rgba(255,255,255,.5)}.leaflet-container{font:12px/1.5 \"Helvetica Neue\",Arial,Helvetica,sans-serif}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a,.leaflet-bar a:hover{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:bold 18px \"Lucida Console\",Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/layers.png);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/layers-2x.png);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/marker-icon.png)}.leaflet-container .leaflet-control-attribution{background:#fff;background:rgba(255,255,255,.7);margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover{text-decoration:underline}.leaflet-container .leaflet-control-attribution,.leaflet-container .leaflet-control-scale{font-size:11px}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;font-size:11px;white-space:nowrap;overflow:hidden;box-sizing:border-box;background:#fff;background:rgba(255,255,255,.5)}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 19px;line-height:1.4}.leaflet-popup-content p{margin:18px 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:white;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;padding:4px 4px 0 0;border:none;text-align:center;width:18px;height:14px;font:16px/14px Tahoma,Verdana,sans-serif;color:#c3c3c3;text-decoration:none;font-weight:bold;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover{color:#999}.leaflet-popup-scrolled{overflow:auto;border-bottom:1px solid #ddd;border-top:1px solid #ddd}.leaflet-oldie .leaflet-popup-content-wrapper{zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-popup-tip-container{margin-top:-1px}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-clickable{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:\"\"}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0, type: AnneOfGreenGablesComponent, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { key: [{
                type: Input
            }], center: [{
                type: Input
            }], zoom: [{
                type: Input
            }], mapType: [{
                type: Input
            }], poi: [{
                type: Input
            }], traffic: [{
                type: Input
            }], setView: [{
                type: Input
            }], lastCenter: [{
                type: Output
            }], locationFound: [{
                type: Output
            }], selectedMarkerIndex: [{
                type: Output
            }] } });
export class Point2D {
    constructor() {
        this.lat = 0;
        this.lng = 0;
        this.text = '';
        this.lat = 0;
        this.lng = 0;
        this.text = '';
    }
    setFromLatLng(latLng) {
        this.lat = latLng.lat;
        this.lng = latLng.lng;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5uZS1vZi1ncmVlbi1nYWJsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5uZS1vZi1ncmVlbi1nYWJsZXMvc3JjL2xpYi9hbm5lLW9mLWdyZWVuLWdhYmxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBRWpILE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBa0JuRSxNQUFNLE9BQU8sMEJBQTBCO0lBMEJyQztRQXpCUyxRQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ1QsV0FBTSxHQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsWUFBTyxHQUFHLFFBQVEsQ0FBQztRQUNuQixRQUFHLEdBQVksSUFBSSxDQUFDO1FBQ3BCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN2QixlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDaEUsa0JBQWEsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNuRSx3QkFBbUIsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUl6RSxxQkFBZ0IsR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzNDLGFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRCxrQkFBYSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDekMsT0FBTyxFQUFFLHNDQUFzQztZQUMvQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFD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Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0ksVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLG1CQUFtQjtzQkFBNUIsTUFBTTs7QUF3S1QsTUFBTSxPQUFPLE9BQU87SUFLbEI7UUFKTyxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBQ2hCLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUd2QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLGFBQWEsQ0FBQyxNQUFvQztRQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvbiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuY29uc3QgbGVhZmxldE5lc2hhbiA9IHJlcXVpcmUoJy4uL3NyYy9hc3NldHMvanMvbGVhZmxldE5lc2hhbi5qcycpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItYW5uZS1vZi1ncmVlbi1nYWJsZXMnLFxyXG4gIHRlbXBsYXRlOiBgICBcclxuICA8ZGl2IGlkPVwie3t0aGlzLmlkUmFuZG9tfX1cIiBzdHlsZT1cIm1pbi1oZWlnaHQ6IDQ0MHB4OyBiYWNrZ3JvdW5kOiAjZWVlOyBib3JkZXI6IDJweCBzb2xpZCAjYWFhO1wiPiAgXHJcbiAgICA8ZGl2IGNsYXNzPVwibGVhZmxlYXQtdG9wIGxlYWZsZXQtbGVmdFwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MzJweDtoZWlnaHQ6MzJweDt6LWluZGV4OjIwMDAwO3RvcDo3NXB4O2xlZnQ6MTBweDtcIj5cclxuICAgICAgPGJ1dHRvbiBzdHlsZT1cImhlaWdodDozMnB4O3dpZHRoOjMycHg7XCIgKGNsaWNrKT1cIm1vdmVUb0N1cnJlbnRMb2NhdGlvbigpXCI+XHJcbiAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ljb25zL215LWxvY2F0aW9uLnBuZ1wiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlO3RvcDogMDtyaWdodDogMDtcIj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogW1xyXG4gICAgJy4uL2Fzc2V0cy9zdHlsZS9sZWFmbGV0TmVzaGFuLmNzcydcclxuICBdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIEFubmVPZkdyZWVuR2FibGVzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KCkga2V5ID0gJyc7XHJcbiAgQElucHV0KCkgY2VudGVyOiBBcnJheTxudW1iZXI+ID0gWzAsIDBdO1xyXG4gIEBJbnB1dCgpIHpvb20gPSAxNDtcclxuICBASW5wdXQoKSBtYXBUeXBlID0gJ2RyZWFteSc7XHJcbiAgQElucHV0KCkgcG9pOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB0cmFmZmljOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2V0VmlldzogYm9vbGVhbiA9IHRydWU7XHJcbiAgQE91dHB1dCgpIGxhc3RDZW50ZXI6IEV2ZW50RW1pdHRlcjxQb2ludDJEPiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9pbnQyRD4oKTtcclxuICBAT3V0cHV0KCkgbG9jYXRpb25Gb3VuZDogRXZlbnRFbWl0dGVyPFBvaW50MkQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludDJEPigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZE1hcmtlckluZGV4OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG4gIHB1YmxpYyBfbWFwOiBhbnk7XHJcbiAgcHJpdmF0ZSBfbGF5ZXJHcm91cDogYW55O1xyXG4gIHByaXZhdGUgX2NpcmNsZUxheWVyR3JvdXA6IGFueTtcclxuICBwcml2YXRlIF9jdXJyZW50TG9jYXRpb246IFBvaW50MkQgPSBuZXcgUG9pbnQyRCgpO1xyXG4gIHB1YmxpYyBpZFJhbmRvbSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyKTtcclxuXHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJY29uID0gbGVhZmxldE5lc2hhbi5pY29uKHtcclxuICAgIGljb25Vcmw6ICdzcmMvYXNzZXRzL2ljb25zL21hcmtlci1zZWxlY3RlZC5wbmcnLFxyXG4gICAgaWNvblNpemU6IFszNSwgNDBdLFxyXG4gIH0pO1xyXG4gIHByaXZhdGUgX3Vuc2VsZWN0ZWRJY29uID0gbGVhZmxldE5lc2hhbi5pY29uKHtcclxuICAgIGljb25Vcmw6ICdzcmMvYXNzZXRzL2ljb25zL21hcmtlci1ub3Qtc2VsZWN0ZWQucG5nJyxcclxuICAgIGljb25TaXplOiBbMzUsIDQwXSxcclxuICB9KTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdE1hcCgpO1xyXG4gICAgdGhpcy5fbGF5ZXJHcm91cCA9IGxlYWZsZXROZXNoYW4ubGF5ZXJHcm91cCgpLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICB0aGlzLl9lbWl0TGFzdENlbnRlck9uTW92ZUVuZCgpO1xyXG4gIH1cclxuICBcclxuICBpbml0TWFwKCkge1xyXG4gICAgdGhpcy5fbWFwID0gbmV3IGxlYWZsZXROZXNoYW4uTWFwKHRoaXMuaWRSYW5kb20sIHtcclxuICAgICAga2V5OiB0aGlzLmtleSxcclxuICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcclxuICAgICAgem9vbTogdGhpcy56b29tLFxyXG4gICAgICBwb2k6IHRoaXMucG9pLFxyXG4gICAgICBtYXB0eXBlOiB0aGlzLm1hcFR5cGUsXHJcbiAgICAgIHRyYWZmaWM6IHRoaXMudHJhZmZpYyxcclxuICAgIH0pO1xyXG4gICAgbGVhZmxldE5lc2hhbi50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJyxcclxuICAgICAgbWF4Wm9vbTogdGhpcy56b29tXHJcbiAgICB9KS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgdGhpcy5fbWFwLmxvY2F0ZSh7IHNldFZpZXc6IHRoaXMuc2V0VmlldywgbWF4Wm9vbTogdGhpcy56b29tIH0pO1xyXG4gICAgdGhpcy5fbWFwLm9uKCdsb2NhdGlvbmZvdW5kJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBsYXllclRlbXAgPSBsZWFmbGV0TmVzaGFuLmNpcmNsZShlLmxhdGxuZywgZS5hY2N1cmFjeSkuYWRkVG8oZS50YXJnZXQpO1xyXG4gICAgICB0aGlzLl9jaXJjbGVMYXllckdyb3VwID0gbGVhZmxldE5lc2hhbi5sYXllckdyb3VwKCkuYWRkTGF5ZXIobGF5ZXJUZW1wKS5hZGRUbyhlLnRhcmdldCk7XHJcbiAgICAgIHRoaXMuX2N1cnJlbnRMb2NhdGlvbi5zZXRGcm9tTGF0TG5nKGUubGF0bG5nKTtcclxuICAgICAgdGhpcy5sb2NhdGlvbkZvdW5kLmVtaXQodGhpcy5fY3VycmVudExvY2F0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwcml2YXRlIF9lbWl0TGFzdENlbnRlck9uTW92ZUVuZCgpIHtcclxuICAgIHRoaXMuX21hcC5vbignbW92ZWVuZCcsIChfZXY6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmxhc3RDZW50ZXIuZW1pdCh0aGlzLl9tYXAuZ2V0Q2VudGVyKCkgYXMgUG9pbnQyRCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25jYXRNYXJrZXJzKG1hcmtlcnM6IEFycmF5PFBvaW50MkQ+KSB7XHJcbiAgICBjb25zdCBtYXJrZXJTdHlsZSA9IHsgYm9yZGVyOiAnMHB4JywgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyB9XHJcbiAgICBtYXJrZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgX2ljb25EaXZTZWxlY3QgPSBsZWFmbGV0TmVzaGFuLmRpdkljb24oe1xyXG4gICAgICAgIGh0bWw6ICc8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzVweDtoZWlnaHQ6NDBweDtcIj4nICtcclxuICAgICAgICAgICc8aW1nIHNyYz1cInNyYy9hc3NldHMvaWNvbnMvbWFya2VyLXNlbGVjdGVkLnBuZ1wiIHN0eWxlPVwid2lkdGg6MzVweDtoZWlnaHQ6NDBweDtcIi8+JyArXHJcbiAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJ0b3A6MzAlO2xlZnQ6MjUlO3Bvc2l0aW9uOmFic29sdXRlO2ZvbnQtc2l6ZTouNnJlbTtjb2xvcjojZmZmO1wiPicgKyBpdGVtLnRleHQgKyAnPC9zcGFuPicgKyAnPC9kaXY+JywgY2xhc3NOYW1lOiAnbWFya2VyU3R5bGUnXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBfaWNvbkRpdlVuc2VsZWN0ID0gbGVhZmxldE5lc2hhbi5kaXZJY29uKHtcclxuICAgICAgICBodG1sOiAnPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjM1cHg7aGVpZ2h0OjQwcHg7XCI+JyArXHJcbiAgICAgICAgICAnPGltZyBzcmM9XCJzcmMvYXNzZXRzL2ljb25zL21hcmtlci1ub3Qtc2VsZWN0ZWQucG5nXCIgc3R5bGU9XCJ3aWR0aDozNXB4O2hlaWdodDo0MHB4O1wiLz4nICtcclxuICAgICAgICAgICc8c3BhbiBzdHlsZT1cInRvcDozMCU7bGVmdDoyNSU7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOi42cmVtO2NvbG9yOiMyYTE2OGM7XCI+JyArIGl0ZW0udGV4dCArICc8L3NwYW4+JyArICc8L2Rpdj4nLCBjbGFzc05hbWU6ICdtYXJrZXJTdHlsZSdcclxuICAgICAgfSk7XHJcbiAgICAgIGxlYWZsZXROZXNoYW4ubWFya2VyKFtpdGVtLmxhdCwgaXRlbS5sbmddLCB7IGljb246IF9pY29uRGl2VW5zZWxlY3QsIGFsdDogaXRlbS50ZXh0IH0pLm9uKCdjbGljaycsIChldjogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFya2VyTGF5ZXJzID0gdGhpcy5fbGF5ZXJHcm91cC5nZXRMYXllcnMoKTtcclxuICAgICAgICBtYXJrZXJMYXllcnMuZm9yRWFjaCgoZWxlbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIGxlYWZsZXROZXNoYW4uTWFya2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9pY29uRGl2U2VsZWN0ID0gbGVhZmxldE5lc2hhbi5kaXZJY29uKHtcclxuICAgICAgICAgICAgICBodG1sOiAnPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjM1cHg7aGVpZ2h0OjQwcHg7XCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGltZyBzcmM9XCJzcmMvYXNzZXRzL2ljb25zL21hcmtlci1zZWxlY3RlZC5wbmdcIiBzdHlsZT1cIndpZHRoOjM1cHg7aGVpZ2h0OjQwcHg7XCIvPicgK1xyXG4gICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwidG9wOjMwJTtsZWZ0OjI1JTtwb3NpdGlvbjphYnNvbHV0ZTtmb250LXNpemU6LjZyZW07Y29sb3I6I2ZmZjtcIj4nICsgZWxlbWVudFsnb3B0aW9ucyddWydhbHQnXSArICc8L3NwYW4+JyArICc8L2Rpdj4nLCBjbGFzc05hbWU6ICdtYXJrZXJTdHlsZSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IF9pY29uRGl2VW5zZWxlY3QgPSBsZWFmbGV0TmVzaGFuLmRpdkljb24oe1xyXG4gICAgICAgICAgICAgIGh0bWw6ICc8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzVweDtoZWlnaHQ6NDBweDtcIj4nICtcclxuICAgICAgICAgICAgICAgICc8aW1nIHNyYz1cInNyYy9hc3NldHMvaWNvbnMvbWFya2VyLW5vdC1zZWxlY3RlZC5wbmdcIiBzdHlsZT1cIndpZHRoOjM1cHg7aGVpZ2h0OjQwcHg7XCIvPicgK1xyXG4gICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwidG9wOjMwJTtsZWZ0OjI1JTtwb3NpdGlvbjphYnNvbHV0ZTtmb250LXNpemU6LjZyZW07Y29sb3I6IzJhMTY4YztcIj4nICsgZWxlbWVudFsnb3B0aW9ucyddWydhbHQnXSArICc8L3NwYW4+JyArICc8L2Rpdj4nLCBjbGFzc05hbWU6ICdtYXJrZXJTdHlsZSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0SWNvbihfaWNvbkRpdlVuc2VsZWN0KTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuX2xhdGxuZy5sYXQgPT0gaXRlbS5sYXQgJiYgZWxlbWVudC5fbGF0bG5nLmxuZyA9PSBpdGVtLmxuZykge1xyXG4gICAgICAgICAgICAgIGVsZW1lbnQuc2V0SWNvbihfaWNvbkRpdlNlbGVjdCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5fbWFwLmZseVRvKGVsZW1lbnQuX2xhdGxuZyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1hcmtlckluZGV4LmVtaXQoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pLmFkZFRvKHRoaXMuX2xheWVyR3JvdXApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjb25jYXRNYXJrZXJzMihtYXJrZXJzOiBBcnJheTxQb2ludDJEPikge1xyXG4gICAgbWFya2Vycy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGxlYWZsZXROZXNoYW4ubWFya2VyKFtpdGVtLmxhdCwgaXRlbS5sbmddLCB7IGljb246IHRoaXMuX3Vuc2VsZWN0ZWRJY29uIH0pLm9uKCdjbGljaycsIChldjogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFya2VyTGF5ZXJzID0gdGhpcy5fbGF5ZXJHcm91cC5nZXRMYXllcnMoKTtcclxuICAgICAgICBtYXJrZXJMYXllcnMuZm9yRWFjaCgoZWxlbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIGxlYWZsZXROZXNoYW4uTWFya2VyKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0SWNvbih0aGlzLl91bnNlbGVjdGVkSWNvbik7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Ll9sYXRsbmcubGF0ID09IGl0ZW0ubGF0ICYmIGVsZW1lbnQuX2xhdGxuZy5sbmcgPT0gaXRlbS5sbmcpIHtcclxuICAgICAgICAgICAgICBlbGVtZW50LnNldEljb24odGhpcy5fc2VsZWN0ZWRJY29uKTtcclxuICAgICAgICAgICAgICB0aGlzLl9tYXAuZmx5VG8oZWxlbWVudC5fbGF0bG5nKTtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWFya2VySW5kZXguZW1pdChpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSkuYWRkVG8odGhpcy5fbGF5ZXJHcm91cCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVNYXJrZXJzKCkge1xyXG4gICAgdGhpcy5fbGF5ZXJHcm91cC5jbGVhckxheWVycygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVUb0N1cnJlbnRMb2NhdGlvbigpIHtcclxuICAgIHRoaXMuX21hcC5zZXRWaWV3KHRoaXMuX2N1cnJlbnRMb2NhdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VsZWN0TWFya2VyKGl0ZW06IFBvaW50MkQpOiB2b2lkIHtcclxuICAgIHRoaXMuX2xheWVyR3JvdXAuZ2V0TGF5ZXJzKCkuZm9yRWFjaCgoZWxlbWVudDogYW55KSA9PiB7XHJcbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgbGVhZmxldE5lc2hhbi5NYXJrZXIgJiYgZWxlbWVudC5fbGF0bG5nLmxhdCA9PT0gaXRlbS5sYXQgJiYgZWxlbWVudC5fbGF0bG5nLmxuZyA9PT0gaXRlbS5sbmcpIHtcclxuICAgICAgICBlbGVtZW50LnNldEljb24odGhpcy5fc2VsZWN0ZWRJY29uKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5TZWxlY3RNYXJrZXIoaXRlbTogUG9pbnQyRCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbGF5ZXJHcm91cC5nZXRMYXllcnMoKS5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBsZWFmbGV0TmVzaGFuLk1hcmtlciAmJiBlbGVtZW50Ll9sYXRsbmcubGF0ID09PSBpdGVtLmxhdCAmJiBlbGVtZW50Ll9sYXRsbmcubG5nID09PSBpdGVtLmxuZykge1xyXG4gICAgICAgIGVsZW1lbnQuc2V0SWNvbih0aGlzLl91bnNlbGVjdGVkSWNvbik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgc2VsZWN0RGl2SWNvbihpdGVtOiBQb2ludDJEKTogdm9pZCB7XHJcbiAgICBjb25zdCBtYXJrZXJTdHlsZSA9IHsgYm9yZGVyOiAnMHB4JywgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyB9XHJcbiAgICBjb25zdCBfaWNvbkRpdlNlbGVjdCA9IGxlYWZsZXROZXNoYW4uZGl2SWNvbih7XHJcbiAgICAgIGh0bWw6ICc8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzVweDtoZWlnaHQ6NDBweDtcIj4nXHJcbiAgICAgICAgKyAnPGltZyBzcmM9XCJzcmMvYXNzZXRzL2ljb25zL21hcmtlci1zZWxlY3RlZC5wbmdcIiBzdHlsZT1cIndpZHRoOjM1cHg7aGVpZ2h0OjQwcHg7XCIvPidcclxuICAgICAgICArICc8c3BhbiBzdHlsZT1cInRvcDozMCU7bGVmdDoyNSU7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOi42cmVtO2NvbG9yOiNmZmY7XCI+JyArIGl0ZW0udGV4dCArICc8L3NwYW4+JyArICc8L2Rpdj4nLCBjbGFzc05hbWU6ICdtYXJrZXJTdHlsZSdcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fbGF5ZXJHcm91cC5nZXRMYXllcnMoKS5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBsZWFmbGV0TmVzaGFuLk1hcmtlciAmJiBlbGVtZW50Ll9sYXRsbmcubGF0ID09PSBpdGVtLmxhdCAmJiBlbGVtZW50Ll9sYXRsbmcubG5nID09PSBpdGVtLmxuZykge1xyXG4gICAgICAgIGVsZW1lbnQuc2V0SWNvbihfaWNvbkRpdlNlbGVjdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVuU2VsZWN0RGl2SWNvbihpdGVtOiBQb2ludDJEKTogdm9pZCB7XHJcbiAgICBjb25zdCBtYXJrZXJTdHlsZSA9IHsgYm9yZGVyOiAnMHB4JywgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyB9XHJcbiAgICBjb25zdCBfaWNvbkRpdlVuc2VsZWN0ID0gbGVhZmxldE5lc2hhbi5kaXZJY29uKHtcclxuICAgICAgaHRtbDogJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDozNXB4O2hlaWdodDo0MHB4O1wiPidcclxuICAgICAgICArICc8aW1nIHNyYz1cInNyYy9hc3NldHMvaWNvbnMvbWFya2VyLW5vdC1zZWxlY3RlZC5wbmdcIiBzdHlsZT1cIndpZHRoOjM1cHg7aGVpZ2h0OjQwcHg7XCIvPidcclxuICAgICAgICArICc8c3BhbiBzdHlsZT1cInRvcDozMCU7bGVmdDoyNSU7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOi42cmVtO2NvbG9yOiMyYTE2OGM7XCI+JyArIGl0ZW0udGV4dCArICc8L3NwYW4+JyArICc8L2Rpdj4nLCBjbGFzc05hbWU6ICdtYXJrZXJTdHlsZSdcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fbGF5ZXJHcm91cC5nZXRMYXllcnMoKS5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBsZWFmbGV0TmVzaGFuLk1hcmtlciAmJiBlbGVtZW50Ll9sYXRsbmcubGF0ID09PSBpdGVtLmxhdCAmJiBlbGVtZW50Ll9sYXRsbmcubG5nID09PSBpdGVtLmxuZykge1xyXG4gICAgICAgIGVsZW1lbnQuc2V0SWNvbihfaWNvbkRpdlVuc2VsZWN0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmx5VG8oaXRlbTogUG9pbnQyRCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbWFwLmZseVRvKGl0ZW0sIHRoaXMuem9vbSk7XHJcbiAgfVxyXG4gIHJlbW92ZU1hcCgpIHtcclxuICAgIHRoaXMuX21hcC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50MkQge1xyXG4gIHB1YmxpYyBsYXQ6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIGxuZzogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgdGV4dDogc3RyaW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5sYXQgPSAwO1xyXG4gICAgdGhpcy5sbmcgPSAwO1xyXG4gICAgdGhpcy50ZXh0ID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RnJvbUxhdExuZyhsYXRMbmc6IHsgbGF0OiBudW1iZXIsIGxuZzogbnVtYmVyIH0pOiB2b2lkIHtcclxuICAgIHRoaXMubGF0ID0gbGF0TG5nLmxhdDtcclxuICAgIHRoaXMubG5nID0gbGF0TG5nLmxuZztcclxuICB9XHJcbn1cclxuIl19