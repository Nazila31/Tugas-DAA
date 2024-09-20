const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function solve20game(numbers, goal) {
    const ops = ['+', '-', '*', '/'];
    let results = [];

    function calculate(soFar, remaining) {
        if (remaining.length === 0) {
            try {
                if (eval(soFar) === goal) {
                    results.push(soFar);
                }
            } catch (e) {}
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            let next = remaining[i];
            let rest = remaining.slice(0, i).concat(remaining.slice(i + 1));

            if (soFar === '') {
                calculate(next.toString(), rest);
            } else {
                for (let op of ops) {
                    calculate(soFar + op + next.toString(), rest);
                }
            }
        }
    }

    calculate('', numbers);
    return results;
}

rl.question('Masukkan 4 angka yang dipisahkan dengan spasi: ', (input) => {
    let numbers = input.split(' ').map(Number);

    rl.question('Masukkan goal: ', (goalInput) => {
        let goal = Number(goalInput);

        if (isNaN(goal) || goal < 0 || goal > 99 || !goal) {
            console.log("Goal harus antara 0 dan 99. Menggunakan goal default: 20");
            goal = 20;
        }

        console.log(`Menghitung hasil untuk angka: ${numbers} dengan goal: ${goal}`);
        let results = solve20game(numbers, goal);

        if (results.length === 0) {
            console.log("Tidak ada jawaban yang ditemukan.");
        } else {
            console.log(`Solusi untuk goal ${goalInput}:`);
            results.forEach((result) => console.log(result));
        }

        rl.close();
    });
});
