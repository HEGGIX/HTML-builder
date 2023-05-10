const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

stdout.write('Введите что-нибудь\n');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdin.on('data', data => {
    const word = data.toString().trim();
    if(word==='exit'){
        exit()
    } else {
        output.write(data);
    }
});
process.on('exit', () => stdout.write('До встречи!'));
process.on('SIGINT', () => {
    exit();
    stdout.write('До встречи!')
})