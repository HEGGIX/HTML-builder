const fs = require('fs');
const fsPromises = fs.promises;

async function createFolder() {
    await fsPromises.mkdir(__dirname + '/files-copy', { recursive: true });
}

function copyFilesFromTo(fromDir, toDir) {
    fs.readdir(__dirname + '/' + fromDir, async (err, files) => {
        for (const file of files) {
            await fsPromises.copyFile(__dirname + '/' + fromDir + '/' + file, __dirname + '/' + toDir + '/' + file);
        }
    })
}

createFolder();
copyFilesFromTo('files', 'files-copy');
