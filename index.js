var readline = require('readline');
var fs = require("fs");
var args = require('minimist')(process.argv.slice(2));

if (args._[0] === 'log.txt') {
    fs.readFile('log.txt', 'utf8', function (err, data) {
        if (err) {
            console.log('Ещё не сыграно ни одной игры');
            return;
        }

        var arr = data.split('\n');
        var parties = arr.length - 1;

        var win = 0, loss = 0, maxWin = 0, maxLoss = 0, i = 0, j = 0;

        for (var key in arr) {
            if (arr[key] === 'Win') {
                win++;
                i++;
            } else {
                if (i >= maxWin) {
                    maxWin = i;
                    i = 0;
                }
                i = 0;
            }

            if (arr[key] === 'Loss') {
                loss++;
                j++;
            } else {
                if (j >= maxLoss) {
                    maxLoss = j;
                    j = 0;
                }
                j = 0;
            }

        }

        console.log('Сыграно партий ' + parties);
        console.log('Выигранных партий ' + win);
        console.log('Проигранных партий ' + loss);
        console.log('Соотношение партий: ' + win + ':' + loss);
        console.log("Максимальне число побед подряд = " + maxWin);
        console.log("Максимальне число проигрышей подряд = " + maxLoss);
    });
} else if (args.c === true) {
    fs.unlink('log.txt', function(err) {
        if (err) {
            console.log('Ещё не сыграно ни одной игры');
        } else {
            console.log('Файл успешно очищен');
        }
    });
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
