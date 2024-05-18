import * as math from "../modules/math.js";

var coordOverlay = L.control({ position: "bottomleft" });

coordOverlay.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "coordinates-overlay");
  this._div.innerHTML = "Cliquez sur la carte pour voir les coordonnées";
  // Empêcher la propagation des clics sur l'overlay à la carte
  L.DomEvent.disableClickPropagation(this._div);
  return this._div;
};

coordOverlay.update = function (coord, cardinal) {
  this._div.innerHTML = "LandBlockId:" + "<br>" + 
  "0x" + coord.x.toString(16).toUpperCase().padStart(2, '0') 
  + "" + coord.y.toString(16).toUpperCase().padStart(2, '0') 
  + "FFFF"
  + "<br>"
  + cardinal;
};

export function UpdateCoord(ev, map) {
    coordOverlay.update(math.GetLandBlockId(ev, map), math.coordToCardinal(ev.latlng.lat, ev.latlng.lng));
}

export default function InitialisationOverlayCoord(map) {
    coordOverlay.addTo(map);
}
