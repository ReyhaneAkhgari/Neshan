import { OnInit, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AnneOfGreenGablesComponent implements OnInit {
    key: string;
    center: Array<number>;
    zoom: number;
    mapType: string;
    poi: boolean;
    traffic: boolean;
    lastCenter: EventEmitter<Point2D>;
    locationFound: EventEmitter<Point2D>;
    selectedMarkerIndex: EventEmitter<number>;
    private _map;
    private _layerGroup;
    private _circleLayerGroup;
    private _currentLocation;
    private _selectedIcon;
    private _unselectedIcon;
    constructor();
    ngOnInit(): void;
    initMap(): void;
    private _emitLastCenterOnMoveEnd;
    concatMarkers(markers: Array<Point2D>): void;
    removeMarkers(): void;
    moveToCurrentLocation(): void;
    selectMarker(item: Point2D): void;
    unSelectMarker(item: Point2D): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnneOfGreenGablesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AnneOfGreenGablesComponent, "lib-anne-of-green-gables", never, { "key": "key"; "center": "center"; "zoom": "zoom"; "mapType": "mapType"; "poi": "poi"; "traffic": "traffic"; }, { "lastCenter": "lastCenter"; "locationFound": "locationFound"; "selectedMarkerIndex": "selectedMarkerIndex"; }, never, never>;
}
export declare class Point2D {
    lat: number;
    lng: number;
    constructor();
    setFromLatLng(latLng: {
        lat: number;
        lng: number;
    }): void;
}
