import { EventEmitter, AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AnneOfGreenGablesComponent implements AfterViewInit {
    key: string;
    center: Array<number>;
    zoom: number;
    mapType: string;
    poi: boolean;
    traffic: boolean;
    setView: boolean;
    lastCenter: EventEmitter<Point2D>;
    locationFound: EventEmitter<Point2D>;
    selectedMarkerIndex: EventEmitter<number>;
    _map: any;
    private _layerGroup;
    private _circleLayerGroup;
    private _currentLocation;
    idRandom: string;
    private _selectedIcon;
    private _unselectedIcon;
    constructor();
    ngAfterViewInit(): void;
    initMap(): void;
    private _emitLastCenterOnMoveEnd;
    concatMarkers(markers: Array<Point2D>): void;
    concatMarkers2(markers: Array<Point2D>): void;
    removeMarkers(): void;
    moveToCurrentLocation(): void;
    selectMarker(item: Point2D): void;
    unSelectMarker(item: Point2D): void;
    selectDivIcon(item: Point2D): void;
    unSelectDivIcon(item: Point2D): void;
    flyTo(item: Point2D): void;
    removeMap(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnneOfGreenGablesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AnneOfGreenGablesComponent, "lib-anne-of-green-gables", never, { "key": "key"; "center": "center"; "zoom": "zoom"; "mapType": "mapType"; "poi": "poi"; "traffic": "traffic"; "setView": "setView"; }, { "lastCenter": "lastCenter"; "locationFound": "locationFound"; "selectedMarkerIndex": "selectedMarkerIndex"; }, never, never>;
}
export declare class Point2D {
    lat: number;
    lng: number;
    text: string;
    constructor();
    setFromLatLng(latLng: {
        lat: number;
        lng: number;
    }): void;
}
