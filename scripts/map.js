// Constantes
const TILE_SIZE = 255;
const CENTER_LAT = -127.5;
const CENTER_LON = 127.5;
const ZOOM_LEVEL = 4;
const BOUNDS_MAX = [
  [-255, 0],
  [0, 255],
];

// Variables
export var map = {};

// Fonction pour initialiser la carte
export default function InitialisationMap() {
  map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: 1,
    maxZoom: 8,
  }).setView([CENTER_LAT, CENTER_LON], ZOOM_LEVEL);

  addTileLayer();
}

// Fonction pour ajouter la couche de tuiles
function addTileLayer() {
  L.tileLayer("tiles/{z}/{x}/{y}.png", {
    tileSize: TILE_SIZE,
    noWrap: true,
    bounds: BOUNDS_MAX,
    attribution: "© Asheron's call 2 maps",
  }).addTo(map);
}