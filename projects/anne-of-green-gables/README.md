# Angular component for 🍃 Neshan Leaflet map.

### Developed by Rayan NiK team

## About The Project

This project implements Neshan map as an angular library ,it has used Leaflet to implement the map.
This library is written for the needs of our company. If you have any questions or suggestions to improve it ,create an issue.

## Installation

npm:

## Features
### Use Laflet Maps API 

You can access to Leaflet Maps `L` , `map`  objects by using `onInit`.

```javascript
 ngOnInit(): void {
    this.initMap();
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
  }
}
```

## Further help

[Example here](https://github.com/ReyhaneAkhgari/Neshanleafletangular)
