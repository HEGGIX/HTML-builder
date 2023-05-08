const fs = require('fs');
const fsPromises = fs.promises;

fs.readdir(__dirname + '/styles', async (err, files) => {
    const values = await getAllValueFromFiles(files);
    fsPromises.writeFile(__dirname + '/project-dist/bundle.css', values.join(' '));
})

async function getAllValueFromFiles(files) {
    const values = [];
    for await (const file of files) {
        if (file.split('.')[1] === 'txt') continue;
        const style = await fsPromises.readFile(__dirname + '/styles/' + file);
        values.push('' + style);
    }
    return values;
}