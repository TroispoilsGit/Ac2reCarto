const path = require('path');
const fs = require('fs');

function initPoImarker(name) {
    let jsonName = path.join(__dirname, 'data', `${name}.json`);
    const result = JSON.parse(fs.readFileSync(jsonName));
    return result;
}

export default initPoImarker;