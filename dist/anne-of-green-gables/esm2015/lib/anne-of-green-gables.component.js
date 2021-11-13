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
        this.lastCenter = new EventEmitter();
        this.locationFound = new EventEmitter();
        this.selectedMarkerIndex = new EventEmitter();
        this._currentLocation = new Point2D();
        this._selectedIcon = leafletNeshan.icon({
            iconUrl: 'src/assets/icon/marker-selected.png',
            iconSize: [35, 40]
        });
        this._unselectedIcon = leafletNeshan.icon({
            iconUrl: 'src/assets/icon/marker-not-selected.png',
            iconSize: [35, 40]
        });
    }
    ngOnInit() {
        this.initMap();
        this._emitLastCenterOnMoveEnd();
        this._layerGroup = leafletNeshan.layerGroup().addTo(this._map);
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
        markers.forEach((item) => {
            leafletNeshan.marker([item.lat, item.lng], { icon: this._unselectedIcon }).on('click', (ev) => {
                const markerLayers = this._layerGroup.getLayers();
                markerLayers.forEach((element, index) => {
                    if (element instanceof leafletNeshan.Marker) {
                        element.setIcon(this._unselectedIcon);
                        if (element._latlng.lat == item.lat && element._latlng.lng == item.lng)
                            this.selectedMarkerIndex.emit(index);
                    }
                });
                ev.target.setIcon(this._selectedIcon);
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
}
AnneOfGreenGablesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0, type: AnneOfGreenGablesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AnneOfGreenGablesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.0", type: AnneOfGreenGablesComponent, selector: "lib-anne-of-green-gables", inputs: { key: "key", center: "center", zoom: "zoom", mapType: "mapType", poi: "poi", traffic: "traffic" }, outputs: { lastCenter: "lastCenter", locationFound: "locationFound", selectedMarkerIndex: "selectedMarkerIndex" }, ngImport: i0, template: `  
  <div id='map' style="width: 800px; height: 500px; background: #eee; border: 2px solid #aaa;">  
    <div class="leafleat-top leaflet-left" style="position:absolute;width:34px;height:34px;z-index:20000;top:75px;left:10px;">
      <button style="height:34px;width:34px;" (click)="moveToCurrentLocation()">
      <img src="/assets/icon/my-location.png" style="position: relative;top: -3px;right: 5px;">
    </button>
    <div class="leafleat-top leaflet-right" style="position:absolute;width:34px;height:34px;z-index:20000;">
      <button style="height:34px;width:34px;" (click)="removeMarkers()">rm</button>
    </div> 
  </div>
  `, isInline: true, styles: [".leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg,.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important}.leaflet-container.leaflet-touch-zoom{touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-tile{will-change:opacity}.leaflet-fade-anim .leaflet-popup{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{transform-origin:0 0}.leaflet-zoom-anim .leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline:0}.leaflet-container a{color:#0078a8}.leaflet-container a.leaflet-active{outline:2px solid orange}.leaflet-zoom-box{border:2px dotted #38f;background:rgba(255,255,255,.5)}.leaflet-container{font:12px/1.5 \"Helvetica Neue\",Arial,Helvetica,sans-serif}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a,.leaflet-bar a:hover{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:bold 18px \"Lucida Console\",Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/layers.png);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/layers-2x.png);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/marker-icon.png)}.leaflet-container .leaflet-control-attribution{background:#fff;background:rgba(255,255,255,.7);margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover{text-decoration:underline}.leaflet-container .leaflet-control-attribution,.leaflet-container .leaflet-control-scale{font-size:11px}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;font-size:11px;white-space:nowrap;overflow:hidden;box-sizing:border-box;background:#fff;background:rgba(255,255,255,.5)}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 19px;line-height:1.4}.leaflet-popup-content p{margin:18px 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:white;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;padding:4px 4px 0 0;border:none;text-align:center;width:18px;height:14px;font:16px/14px Tahoma,Verdana,sans-serif;color:#c3c3c3;text-decoration:none;font-weight:bold;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover{color:#999}.leaflet-popup-scrolled{overflow:auto;border-bottom:1px solid #ddd;border-top:1px solid #ddd}.leaflet-oldie .leaflet-popup-content-wrapper{zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-popup-tip-container{margin-top:-1px}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-clickable{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:\"\"}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0, type: AnneOfGreenGablesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-anne-of-green-gables',
                    template: `  
  <div id='map' style="width: 800px; height: 500px; background: #eee; border: 2px solid #aaa;">  
    <div class="leafleat-top leaflet-left" style="position:absolute;width:34px;height:34px;z-index:20000;top:75px;left:10px;">
      <button style="height:34px;width:34px;" (click)="moveToCurrentLocation()">
      <img src="/assets/icon/my-location.png" style="position: relative;top: -3px;right: 5px;">
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
        this.lat = 0;
        this.lng = 0;
    }
    setFromLatLng(latLng) {
        this.lat = latLng.lat;
        this.lng = latLng.lng;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5uZS1vZi1ncmVlbi1nYWJsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5uZS1vZi1ncmVlbi1nYWJsZXMvc3JjL2xpYi9hbm5lLW9mLWdyZWVuLWdhYmxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFbEcsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFvQm5FLE1BQU0sT0FBTywwQkFBMEI7SUF1QnJDO1FBdEJTLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFDVCxXQUFNLEdBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ25CLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDcEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN4QixlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsa0JBQWEsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxRCx3QkFBbUIsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUlqRSxxQkFBZ0IsR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzFDLGtCQUFhLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN6QyxPQUFPLEVBQUUscUNBQXFDO1lBQzlDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FDbkIsQ0FBQyxDQUFDO1FBQ0ssb0JBQWUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzNDLE9BQU8sRUFBRSx5Q0FBeUM7WUFDbEQsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUNuQixDQUFDLENBQUM7SUFHSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDdkMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsYUFBYSxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsRUFBRTtZQUNqRSxXQUFXLEVBQUUsMEVBQTBFO1lBQ3ZGLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHdCQUF3QjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBYSxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sYUFBYSxDQUFDLE9BQXVCO1FBQzFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2QixhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQU8sRUFBRSxFQUFFO2dCQUNqRyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNsRCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLEtBQWEsRUFBRSxFQUFFO29CQUNuRCxJQUFJLE9BQU8sWUFBWSxhQUFhLENBQUMsTUFBTSxFQUFFO3dCQUMzQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHOzRCQUNwRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN4QztnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxhQUFhO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLHFCQUFxQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sWUFBWSxDQUFDLElBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUNwRCxJQUFJLE9BQU8sWUFBWSxhQUFhLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDbkgsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxjQUFjLENBQUMsSUFBYTtRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ3BELElBQUksT0FBTyxZQUFZLGFBQWEsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNuSCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUN2QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7dUhBbEdVLDBCQUEwQjsyR0FBMUIsMEJBQTBCLCtSQWhCM0I7Ozs7Ozs7Ozs7R0FVVDsyRkFNVSwwQkFBMEI7a0JBbEJ0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELFNBQVMsRUFBRTt3QkFDVCxtQ0FBbUM7cUJBQ3BDO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0QzswRUFFVSxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDSSxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csbUJBQW1CO3NCQUE1QixNQUFNOztBQTRGVCxNQUFNLE9BQU8sT0FBTztJQUlsQjtRQUhPLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsUUFBRyxHQUFXLENBQUMsQ0FBQztRQUdyQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGFBQWEsQ0FBQyxNQUFrQztRQUNyRCxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5jb25zdCBsZWFmbGV0TmVzaGFuID0gcmVxdWlyZSgnLi4vc3JjL2Fzc2V0cy9qcy9sZWFmbGV0TmVzaGFuLmpzJyk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1hbm5lLW9mLWdyZWVuLWdhYmxlcycsXHJcbiAgdGVtcGxhdGU6IGAgIFxyXG4gIDxkaXYgaWQ9J21hcCcgc3R5bGU9XCJ3aWR0aDogODAwcHg7IGhlaWdodDogNTAwcHg7IGJhY2tncm91bmQ6ICNlZWU7IGJvcmRlcjogMnB4IHNvbGlkICNhYWE7XCI+ICBcclxuICAgIDxkaXYgY2xhc3M9XCJsZWFmbGVhdC10b3AgbGVhZmxldC1sZWZ0XCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDozNHB4O2hlaWdodDozNHB4O3otaW5kZXg6MjAwMDA7dG9wOjc1cHg7bGVmdDoxMHB4O1wiPlxyXG4gICAgICA8YnV0dG9uIHN0eWxlPVwiaGVpZ2h0OjM0cHg7d2lkdGg6MzRweDtcIiAoY2xpY2spPVwibW92ZVRvQ3VycmVudExvY2F0aW9uKClcIj5cclxuICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ljb24vbXktbG9jYXRpb24ucG5nXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7dG9wOiAtM3B4O3JpZ2h0OiA1cHg7XCI+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxkaXYgY2xhc3M9XCJsZWFmbGVhdC10b3AgbGVhZmxldC1yaWdodFwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MzRweDtoZWlnaHQ6MzRweDt6LWluZGV4OjIwMDAwO1wiPlxyXG4gICAgICA8YnV0dG9uIHN0eWxlPVwiaGVpZ2h0OjM0cHg7d2lkdGg6MzRweDtcIiAoY2xpY2spPVwicmVtb3ZlTWFya2VycygpXCI+cm08L2J1dHRvbj5cclxuICAgIDwvZGl2PiBcclxuICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogW1xyXG4gICAgJy4uL2Fzc2V0cy9zdHlsZS9sZWFmbGV0TmVzaGFuLmNzcydcclxuICBdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIEFubmVPZkdyZWVuR2FibGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBrZXkgPSAnJztcclxuICBASW5wdXQoKSBjZW50ZXI6IEFycmF5PG51bWJlcj4gPSBbMCwgMF07XHJcbiAgQElucHV0KCkgem9vbSA9IDE0O1xyXG4gIEBJbnB1dCgpIG1hcFR5cGUgPSAnZHJlYW15JztcclxuICBASW5wdXQoKSBwb2k6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHRyYWZmaWM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgbGFzdENlbnRlcjogRXZlbnRFbWl0dGVyPFBvaW50MkQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBsb2NhdGlvbkZvdW5kOiBFdmVudEVtaXR0ZXI8UG9pbnQyRD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkTWFya2VySW5kZXg6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByaXZhdGUgX21hcDogYW55O1xyXG4gIHByaXZhdGUgX2xheWVyR3JvdXA6IGFueTtcclxuICBwcml2YXRlIF9jaXJjbGVMYXllckdyb3VwOiBhbnk7XHJcbiAgcHJpdmF0ZSBfY3VycmVudExvY2F0aW9uOiBQb2ludDJEID0gbmV3IFBvaW50MkQoKTtcclxuICBwcml2YXRlIF9zZWxlY3RlZEljb24gPSBsZWFmbGV0TmVzaGFuLmljb24oe1xyXG4gICAgaWNvblVybDogJ3NyYy9hc3NldHMvaWNvbi9tYXJrZXItc2VsZWN0ZWQucG5nJyxcclxuICAgIGljb25TaXplOiBbMzUsIDQwXVxyXG4gIH0pO1xyXG4gIHByaXZhdGUgX3Vuc2VsZWN0ZWRJY29uID0gbGVhZmxldE5lc2hhbi5pY29uKHtcclxuICAgIGljb25Vcmw6ICdzcmMvYXNzZXRzL2ljb24vbWFya2VyLW5vdC1zZWxlY3RlZC5wbmcnLFxyXG4gICAgaWNvblNpemU6IFszNSwgNDBdXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRNYXAoKTtcclxuICAgIHRoaXMuX2VtaXRMYXN0Q2VudGVyT25Nb3ZlRW5kKCk7XHJcbiAgICB0aGlzLl9sYXllckdyb3VwID0gbGVhZmxldE5lc2hhbi5sYXllckdyb3VwKCkuYWRkVG8odGhpcy5fbWFwKTtcclxuICB9XHJcblxyXG4gIGluaXRNYXAoKSB7XHJcbiAgICB0aGlzLl9tYXAgPSBuZXcgbGVhZmxldE5lc2hhbi5NYXAoJ21hcCcsIHtcclxuICAgICAga2V5OiB0aGlzLmtleSxcclxuICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcclxuICAgICAgem9vbTogdGhpcy56b29tLFxyXG4gICAgICBwb2k6IHRoaXMucG9pLFxyXG4gICAgICBtYXB0eXBlOiB0aGlzLm1hcFR5cGUsXHJcbiAgICAgIHRyYWZmaWM6IHRoaXMudHJhZmZpYyxcclxuICAgIH0pO1xyXG4gICAgbGVhZmxldE5lc2hhbi50aWxlTGF5ZXIoJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycycsXHJcbiAgICAgIG1heFpvb206IDIwXHJcbiAgICB9KS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgdGhpcy5fbWFwLmxvY2F0ZSh7IHNldFZpZXc6IHRydWUsIG1heFpvb206IDE2IH0pO1xyXG4gICAgdGhpcy5fbWFwLm9uKCdsb2NhdGlvbmZvdW5kJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBsYXllclRlbXAgPSBsZWFmbGV0TmVzaGFuLmNpcmNsZShlLmxhdGxuZywgZS5hY2N1cmFjeSkuYWRkVG8oZS50YXJnZXQpO1xyXG4gICAgICB0aGlzLl9jaXJjbGVMYXllckdyb3VwID0gbGVhZmxldE5lc2hhbi5sYXllckdyb3VwKCkuYWRkTGF5ZXIobGF5ZXJUZW1wKS5hZGRUbyhlLnRhcmdldCk7XHJcbiAgICAgIHRoaXMuX2N1cnJlbnRMb2NhdGlvbi5zZXRGcm9tTGF0TG5nKGUubGF0bG5nKTtcclxuICAgICAgdGhpcy5sb2NhdGlvbkZvdW5kLmVtaXQodGhpcy5fY3VycmVudExvY2F0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZW1pdExhc3RDZW50ZXJPbk1vdmVFbmQoKSB7XHJcbiAgICB0aGlzLl9tYXAub24oJ21vdmVlbmQnLCAoX2V2OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5sYXN0Q2VudGVyLmVtaXQodGhpcy5fbWFwLmdldENlbnRlcigpIGFzIFBvaW50MkQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29uY2F0TWFya2VycyhtYXJrZXJzOiBBcnJheTxQb2ludDJEPikge1xyXG4gICAgbWFya2Vycy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGxlYWZsZXROZXNoYW4ubWFya2VyKFtpdGVtLmxhdCwgaXRlbS5sbmddLCB7IGljb246IHRoaXMuX3Vuc2VsZWN0ZWRJY29uIH0pLm9uKCdjbGljaycsIChldjogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFya2VyTGF5ZXJzID0gdGhpcy5fbGF5ZXJHcm91cC5nZXRMYXllcnMoKTtcclxuICAgICAgICBtYXJrZXJMYXllcnMuZm9yRWFjaCgoZWxlbWVudDogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7IFxyXG4gICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBsZWFmbGV0TmVzaGFuLk1hcmtlcikgeyBcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRJY29uKHRoaXMuX3Vuc2VsZWN0ZWRJY29uKTsgXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Ll9sYXRsbmcubGF0ID09IGl0ZW0ubGF0ICYmIGVsZW1lbnQuX2xhdGxuZy5sbmcgPT0gaXRlbS5sbmcpXHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1hcmtlckluZGV4LmVtaXQoaW5kZXgpO1xyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgICAgICBldi50YXJnZXQuc2V0SWNvbih0aGlzLl9zZWxlY3RlZEljb24pO1xyXG4gICAgICB9KS5hZGRUbyh0aGlzLl9sYXllckdyb3VwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZU1hcmtlcnMoKSB7XHJcbiAgICB0aGlzLl9sYXllckdyb3VwLmNsZWFyTGF5ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbW92ZVRvQ3VycmVudExvY2F0aW9uKCkge1xyXG4gICAgdGhpcy5fbWFwLnNldFZpZXcodGhpcy5fY3VycmVudExvY2F0aW9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RNYXJrZXIoaXRlbTogUG9pbnQyRCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbGF5ZXJHcm91cC5nZXRMYXllcnMoKS5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHsgXHJcbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgbGVhZmxldE5lc2hhbi5NYXJrZXIgJiYgZWxlbWVudC5fbGF0bG5nLmxhdCA9PT0gaXRlbS5sYXQgJiYgZWxlbWVudC5fbGF0bG5nLmxuZyA9PT0gaXRlbS5sbmcpIHsgXHJcbiAgICAgICAgZWxlbWVudC5zZXRJY29uKHRoaXMuX3NlbGVjdGVkSWNvbik7IFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1blNlbGVjdE1hcmtlcihpdGVtOiBQb2ludDJEKTogdm9pZCB7XHJcbiAgICB0aGlzLl9sYXllckdyb3VwLmdldExheWVycygpLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4geyBcclxuICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBsZWFmbGV0TmVzaGFuLk1hcmtlciAmJiBlbGVtZW50Ll9sYXRsbmcubGF0ID09PSBpdGVtLmxhdCAmJiBlbGVtZW50Ll9sYXRsbmcubG5nID09PSBpdGVtLmxuZykgeyBcclxuICAgICAgICBlbGVtZW50LnNldEljb24odGhpcy5fdW5zZWxlY3RlZEljb24pO1xyXG4gICAgICB9IFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnQyRCB7XHJcbiAgcHVibGljIGxhdDogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgbG5nOiBudW1iZXIgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubGF0ID0gMDtcclxuICAgIHRoaXMubG5nID0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRGcm9tTGF0TG5nKGxhdExuZzoge2xhdDogbnVtYmVyLCBsbmc6IG51bWJlcn0pOiB2b2lkIHtcclxuICAgIHRoaXMubGF0ID0gbGF0TG5nLmxhdDtcclxuICAgIHRoaXMubG5nID0gbGF0TG5nLmxuZztcclxuICB9XHJcbn1cclxuIl19