/**
 * Created by asistent on 04.05.2016.
 */
var fs = require('fs');
var args = require('minimist')(process.argv.slice(2));

if (args._[0] === 'log.txt') {
    fs.unlink('log.txt', function (err) {
        if (err) {
            console.log('Ещё не сыграно ни одной игры');
        } else {
            console.log('Файл успешно очищен');
        }
    });
}