(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('anne-of-green-gables', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['anne-of-green-gables'] = {}, global.ng.core));
}(this, (function (exports, i0) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var AnneOfGreenGablesService = /** @class */ (function () {
        function AnneOfGreenGablesService() {
        }
        return AnneOfGreenGablesService;
    }());
    AnneOfGreenGablesService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    AnneOfGreenGablesService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var leafletNeshan = require('../src/assets/js/leafletNeshan.js');
    var AnneOfGreenGablesComponent = /** @class */ (function () {
        function AnneOfGreenGablesComponent() {
            this.key = '';
            this.center = [0, 0];
            this.zoom = 14;
            this.mapType = 'dreamy';
            this.poi = true;
            this.traffic = false;
            this.lastCenter = new i0.EventEmitter();
            this.locationFound = new i0.EventEmitter();
            this.selectedMarkerIndex = new i0.EventEmitter();
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
        AnneOfGreenGablesComponent.prototype.ngOnInit = function () {
            this.initMap();
            this._emitLastCenterOnMoveEnd();
            this._layerGroup = leafletNeshan.layerGroup().addTo(this._map);
        };
        AnneOfGreenGablesComponent.prototype.initMap = function () {
            var _this = this;
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
            this._map.on('locationfound', function (e) {
                var layerTemp = leafletNeshan.circle(e.latlng, e.accuracy).addTo(e.target);
                _this._circleLayerGroup = leafletNeshan.layerGroup().addLayer(layerTemp).addTo(e.target);
                _this._currentLocation.setFromLatLng(e.latlng);
                _this.locationFound.emit(_this._currentLocation);
            });
        };
        AnneOfGreenGablesComponent.prototype._emitLastCenterOnMoveEnd = function () {
            var _this = this;
            this._map.on('moveend', function (_ev) {
                _this.lastCenter.emit(_this._map.getCenter());
            });
        };
        AnneOfGreenGablesComponent.prototype.concatMarkers = function (markers) {
            var _this = this;
            markers.forEach(function (item) {
                leafletNeshan.marker([item.lat, item.lng], { icon: _this._unselectedIcon }).on('click', function (ev) {
                    var markerLayers = _this._layerGroup.getLayers();
                    markerLayers.forEach(function (element, index) {
                        if (element instanceof leafletNeshan.Marker) {
                            element.setIcon(_this._unselectedIcon);
                            if (element._latlng.lat == item.lat && element._latlng.lng == item.lng)
                                _this.selectedMarkerIndex.emit(index);
                        }
                    });
                    ev.target.setIcon(_this._selectedIcon);
                }).addTo(_this._layerGroup);
            });
        };
        AnneOfGreenGablesComponent.prototype.removeMarkers = function () {
            this._layerGroup.clearLayers();
        };
        AnneOfGreenGablesComponent.prototype.moveToCurrentLocation = function () {
            this._map.setView(this._currentLocation);
        };
        AnneOfGreenGablesComponent.prototype.selectMarker = function (item) {
            var _this = this;
            this._layerGroup.getLayers().forEach(function (element) {
                if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
                    element.setIcon(_this._selectedIcon);
                }
            });
        };
        AnneOfGreenGablesComponent.prototype.unSelectMarker = function (item) {
            var _this = this;
            this._layerGroup.getLayers().forEach(function (element) {
                if (element instanceof leafletNeshan.Marker && element._latlng.lat === item.lat && element._latlng.lng === item.lng) {
                    element.setIcon(_this._unselectedIcon);
                }
            });
        };
        return AnneOfGreenGablesComponent;
    }());
    AnneOfGreenGablesComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    AnneOfGreenGablesComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.0", type: AnneOfGreenGablesComponent, selector: "lib-anne-of-green-gables", inputs: { key: "key", center: "center", zoom: "zoom", mapType: "mapType", poi: "poi", traffic: "traffic" }, outputs: { lastCenter: "lastCenter", locationFound: "locationFound", selectedMarkerIndex: "selectedMarkerIndex" }, ngImport: i0__namespace, template: "  \n  <div id='map' style=\"width: 800px; height: 500px; background: #eee; border: 2px solid #aaa;\">  \n    <div class=\"leafleat-top leaflet-left\" style=\"position:absolute;width:34px;height:34px;z-index:20000;top:75px;left:10px;\">\n      <button style=\"height:34px;width:34px;\" (click)=\"moveToCurrentLocation()\">\n      <img src=\"/assets/icon/my-location.png\" style=\"position: relative;top: -3px;right: 5px;\">\n    </button>\n    <div class=\"leafleat-top leaflet-right\" style=\"position:absolute;width:34px;height:34px;z-index:20000;\">\n      <button style=\"height:34px;width:34px;\" (click)=\"removeMarkers()\">rm</button>\n    </div> \n  </div>\n  ", isInline: true, styles: [".leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg,.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important}.leaflet-container.leaflet-touch-zoom{touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-tile{will-change:opacity}.leaflet-fade-anim .leaflet-popup{opacity:0;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{transform-origin:0 0}.leaflet-zoom-anim .leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline:0}.leaflet-container a{color:#0078a8}.leaflet-container a.leaflet-active{outline:2px solid orange}.leaflet-zoom-box{border:2px dotted #38f;background:rgba(255,255,255,.5)}.leaflet-container{font:12px/1.5 \"Helvetica Neue\",Arial,Helvetica,sans-serif}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a,.leaflet-bar a:hover{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:bold 18px \"Lucida Console\",Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/layers.png);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/layers-2x.png);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(https://static.neshan.org/sdk/leaflet/1.4.0/images/marker-icon.png)}.leaflet-container .leaflet-control-attribution{background:#fff;background:rgba(255,255,255,.7);margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover{text-decoration:underline}.leaflet-container .leaflet-control-attribution,.leaflet-container .leaflet-control-scale{font-size:11px}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;font-size:11px;white-space:nowrap;overflow:hidden;box-sizing:border-box;background:#fff;background:rgba(255,255,255,.5)}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 19px;line-height:1.4}.leaflet-popup-content p{margin:18px 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:white;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;padding:4px 4px 0 0;border:none;text-align:center;width:18px;height:14px;font:16px/14px Tahoma,Verdana,sans-serif;color:#c3c3c3;text-decoration:none;font-weight:bold;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover{color:#999}.leaflet-popup-scrolled{overflow:auto;border-bottom:1px solid #ddd;border-top:1px solid #ddd}.leaflet-oldie .leaflet-popup-content-wrapper{zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:\"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-popup-tip-container{margin-top:-1px}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-clickable{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:\"\"}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}\n"], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-anne-of-green-gables',
                        template: "  \n  <div id='map' style=\"width: 800px; height: 500px; background: #eee; border: 2px solid #aaa;\">  \n    <div class=\"leafleat-top leaflet-left\" style=\"position:absolute;width:34px;height:34px;z-index:20000;top:75px;left:10px;\">\n      <button style=\"height:34px;width:34px;\" (click)=\"moveToCurrentLocation()\">\n      <img src=\"/assets/icon/my-location.png\" style=\"position: relative;top: -3px;right: 5px;\">\n    </button>\n    <div class=\"leafleat-top leaflet-right\" style=\"position:absolute;width:34px;height:34px;z-index:20000;\">\n      <button style=\"height:34px;width:34px;\" (click)=\"removeMarkers()\">rm</button>\n    </div> \n  </div>\n  ",
                        styleUrls: [
                            '../assets/style/leafletNeshan.css'
                        ],
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { key: [{
                    type: i0.Input
                }], center: [{
                    type: i0.Input
                }], zoom: [{
                    type: i0.Input
                }], mapType: [{
                    type: i0.Input
                }], poi: [{
                    type: i0.Input
                }], traffic: [{
                    type: i0.Input
                }], lastCenter: [{
                    type: i0.Output
                }], locationFound: [{
                    type: i0.Output
                }], selectedMarkerIndex: [{
                    type: i0.Output
                }] } });
    var Point2D = /** @class */ (function () {
        function Point2D() {
            this.lat = 0;
            this.lng = 0;
            this.lat = 0;
            this.lng = 0;
        }
        Point2D.prototype.setFromLatLng = function (latLng) {
            this.lat = latLng.lat;
            this.lng = latLng.lng;
        };
        return Point2D;
    }());

    var AnneOfGreenGablesModule = /** @class */ (function () {
        function AnneOfGreenGablesModule() {
        }
        return AnneOfGreenGablesModule;
    }());
    AnneOfGreenGablesModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AnneOfGreenGablesModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesModule, declarations: [AnneOfGreenGablesComponent], exports: [AnneOfGreenGablesComponent] });
    AnneOfGreenGablesModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.0", ngImport: i0__namespace, type: AnneOfGreenGablesModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            AnneOfGreenGablesComponent
                        ],
                        imports: [],
                        exports: [
                            AnneOfGreenGablesComponent
                        ]
                    }]
            }] });

    /*
     * Public API Surface of anne-of-green-gables
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AnneOfGreenGablesComponent = AnneOfGreenGablesComponent;
    exports.AnneOfGreenGablesModule = AnneOfGreenGablesModule;
    exports.AnneOfGreenGablesService = AnneOfGreenGablesService;
    exports.Point2D = Point2D;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=anne-of-green-gables.umd.js.map
