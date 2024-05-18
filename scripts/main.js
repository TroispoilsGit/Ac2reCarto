import InitMap, { map } from "./map.js";
import InitOverlayPoi from "./overlays/overlaysPoi.js";
import InitOverlayCoord, { UpdateCoord } from "./overlays/overlaysCoord.js";
import InitOverlayPlayer from "./overlays/overlaysPlayer.js";

//Init leaflet
InitMap();

//Init Overlay Control
InitOverlayPoi(map);
InitOverlayCoord(map);

map.on("click", function (ev) {
    UpdateCoord(ev, map);
});

//Interval Player Overlay
//setInterval(InitOverlayPlayer, 5000);