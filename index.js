var readline = require('readline');
var fs = require('fs');
var args = require('minimist')(process.argv.slice(2));

if (args._[0] === 'log.txt') {
    var stat = require('./stat');
} else if ((args.c === true) || (args.clear === true)) {
    var clear = require('./clear');
} else {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var sideCoin = [["1", "Орел"], ["2", "Решка"]];

    var rand = Math.floor(Math.random() * sideCoin.length);

    rl.write('Введите 1 (Орел) или 2 (Решка):\n');

    rl.on('line', function (cmd) {
        this.write('Вы выбрали "' + cmd + '" ');

        var string;
        if (cmd === sideCoin[rand][0]) {
            this.write('Урааа! Вы выиграли!');
            string = "Win\n";
        } else {
            this.write('Упс. Вы проиграли.');
            string = "Loss\n";
        }
        fs.appendFile('log.txt', string, function (err) {
            if (err) {
                throw err;
            }
        });
        this.close();
    });
}
