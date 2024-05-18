import customIcons from '../modules/iconsMap.js';

export default async function getOverlayNpc() {
    const url = `/npcloc`;
    try {
        var markers = L.markerClusterGroup({
            chunkedLoading: true,
            disableClusteringAtZoom: 8,
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
          });
        const layerNpc = L.layerGroup();
        const response = await fetch(url);
        const data = await response.json();
        let npcLoc = [];
        data.forEach((npc) => {
            markers.addLayer(L.marker([npc.locy, npc.locx], { icon: customIcons.yellowNpc, id: npc.entityid }).bindPopup(npc.literalValue).on('click', function (a) {
                console.log('marker ' + this.options.id);
            }));
        });
        return markers;
    } catch (error) {
        console.error(`Error fetching ${url} data:`, error);
    }
}