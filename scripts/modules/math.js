const CENTER = 127.5;

export function coordToCardinal(lat, lng) {
    // Vérifier que les valeurs de lat et lng sont dans la plage spécifiée
    if (lat > 0 || lat < -255 || lng < 0 || lng > 255) {
        return "Coordonnées invalides";
    }
    let cardinalLng = 0;
    if (lng < CENTER) cardinalLng = 100 - (lng * 100 / CENTER);
    else if (lng > CENTER) cardinalLng = (lng - CENTER) * 100 / CENTER;
    else if (lng === CENTER) cardinalLng = 0;

    let cardinalLat = 0;
    lat = lat * -1;
    if (lat < CENTER) cardinalLat = 100 - (lat * 100 / CENTER);
    else if (lat > CENTER) cardinalLat = (lat - CENTER) * 100 / CENTER;
    else if (lat === 0) cardinalLat = 0;

    // Déterminer les directions
    let directionLat = lat < CENTER ? "N" : "S";
    let directionLng = lng < CENTER ? "W" : "E";

    // Retourner la chaîne de caractères résultante
    return cardinalLat.toFixed(1) + "" + directionLat + " " + cardinalLng.toFixed(1) + "" + directionLng;
}

export function GetLandBlockId(ev, map) {
    var latlng = ev.latlng;
    var pointATmp = map.project(latlng, 4);
    const blockSize = 16; // Taille d'un bloc
    var y = Math.floor((4080 - pointATmp.y) / blockSize);
    var x = Math.floor(pointATmp.x / blockSize);

    return L.point(x, y);
}