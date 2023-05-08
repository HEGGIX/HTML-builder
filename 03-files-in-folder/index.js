const fs = require('fs');
const path = require('path');

async function readDir(dir) {
    fs.readdir(__dirname + dir, {withFileTypes: true}, async (err, files) => {
        for (const file of files) {
            const isDirectory = file.isDirectory();
            if (isDirectory) continue;
            
            const name = file.name.split('.')[0];
            const ext = path.extname(__dirname + '/' + file.name).split('.')[1];
            let weight = await fs.statSync(__dirname + '/secret-folder/' + file.name).size;
            
            console.log(`${name}-${ext}-${formatBytes(weight)}`);
        }
    })
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

readDir('/secret-folder');