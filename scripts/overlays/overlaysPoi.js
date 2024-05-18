import customIcons from '../modules/iconsMap.js';
import npcLocOverlay from "./overlaysNpc.js";

var overlayMaps = {};
var layerControl = {};

async function setupOverlayMaps() {
    var overlayPoi = await getOverlayMaps(); // Attend que overlayPoi soit chargé

    // Itérer sur les clés de overlayPoi
    Object.keys(overlayPoi).forEach(key => {
        const layerGroup = overlayPoi[key];
        //overlayMaps[key] = layerGroup; // Assigner chaque layerGroup à la clé correspondante dans overlayMaps
        layerControl.addOverlay(layerGroup, key); // Ajoute chaque couche à la carte avec son nom
    });

    //ADD OVERLAY NPC
    let test =  await npcLocOverlay();
    overlayMaps["Npc"] = test;
    layerControl.addOverlay(test, "Npc");
}

async function getOverlayMaps() {
    await Promise.all(Object.keys(overlayMapsTemplate).map(async (key) => {
        const url = `/poi/${key.toLowerCase()}/`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            let icon = overlayMapsTemplate[key].icon;
            overlayMaps[key] = L.layerGroup(data.map((item) => L.marker([item.y, item.x], { icon: icon }).bindPopup(item.description)));
        } catch (error) {
            console.error(`Error fetching ${key} data:`, error);
        }
    }));
    return overlayMaps;
}

// overlayMapsTemplate est l'objet avec les clés que vous avez définies
const overlayMapsTemplate = {
    Ringways: { icon: customIcons.blueCircleVoidIcon },
    Gateways: { icon: customIcons.blueCircleFullIcon },
    PoI: { icon: customIcons.blueCrossFullIcon },
    Town: { icon: customIcons.yellowSquareFullIcon },
    Outpost: { icon: customIcons.yellowSquareVoidIcon },
    Vault: { icon: customIcons.redCrossFullIcon },
    Dungeon: { icon: customIcons.redCrossVoidIcon },
    City: { icon: customIcons.yellowCrownIcon },
    Faction: { icon: customIcons.greySquareIcon },
};

export default function InitialisationOverlay(map) {
    setupOverlayMaps();
    layerControl = L.control.layers(null, overlayMaps).addTo(map);
}