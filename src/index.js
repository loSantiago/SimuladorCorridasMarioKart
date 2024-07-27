//Imports
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Objeto dos jogadores/corredores.
let runners = [
    {
        Nome : "Mario",
        Velocidade : 4,
        Manobrabilidade : 3,
        Poder : 3,
        Pontos : 0
    },

    {
        Nome : "Peach",
        Velocidade : 3,
        Manobrabilidade : 4,
        Poder : 2,
        Pontos : 0
    },

    {
        Nome : "Yoshi",
        Velocidade : 2,
        Manobrabilidade : 4,
        Poder : 3,
        Pontos : 0
    },

    {
        Nome : "Bowser",
        Velocidade : 5,
        Manobrabilidade : 2,
        Poder : 5,
        PONtos : 0
    },

    {
        Nome : "Luigi",
        Velocidade : 3,
        Manobrabilidade : 4,
        Poder : 4,
        Pontos : 0
    },

    {
        Nome : "Donkey Kong",
        Velocidade : 2,
        Manobrabilidade : 2,
        Poder : 5,
        Pontos : 0
    }
];

//Player number.
let playerOne = 1, playerTwo = 5;

//Rola o dado.
function RollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

//Gera um bloco aleatorio/pedaço de pista.
async function GetRandomBlock(){
    let random = Math.random();
    let result;

    switch (true){
        case random < 0.33:
            result = "RETA"
            break;
        case (random < 0.66 && random >= 0.33):
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }

    return result;
}

//Imprime na tela o resultado do dado.
async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

//Roda o jogo.
async function PlayRaceEngine(character1, character2) {
    //Start race message.
    console.log(`🏁🎉 Corrida entre ${runners[playerOne - 1].Nome + ' vs ' + runners[playerTwo - 1].Nome} começando...\n`);

    //Race loop
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //Sortear um bloco.
        let block = await GetRandomBlock();
        console.log("Bloco: " + block);

        //Rolar os dados.
        let diceResult1 = await RollDice();
        let diceResult2 = await RollDice();

        //Teste de Habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if ("reta" === (block.toLowerCase())) {
            totalTestSkill1 = diceResult1 + character1.Velocidade;
            totalTestSkill2 = diceResult2 + character2.Velocidade;

            await logRollResult(character1.Nome, "velocidade", diceResult1, character1.Velocidade);
            await logRollResult(character2.Nome, "velocidade", diceResult2, character2.Velocidade);
        }
        if ("curva" === (block.toLowerCase())) {
            totalTestSkill1 = diceResult1 + character1.Manobrabilidade;
            totalTestSkill2 = diceResult2 + character2.Manobrabilidade;

            await logRollResult(character1.Nome, "manobrabolidade", diceResult1, character1.Manobrabilidade);
            await logRollResult(character2.Nome, "manobrabolidade", diceResult1, character2.Manobrabilidade);
        }
        if ("confronto" === (block.toLowerCase())) {
            let powerResult1 = diceResult1 + character1.Poder;
            let powerResult2 = diceResult2 + character2.Poder;

            console.log(`🫵 ${character1.Nome} confrontou com ${character2.Nome}! 🥊`);
            await logRollResult(character1.Nome, "poder", diceResult1, character1.Poder);
            await logRollResult(character2.Nome, "poder", diceResult2, character2.Poder);

            if(powerResult1 > powerResult2 && character2.Pontos > 0) {
                character2.Pontos -= 1;
                console.log(`🌟 ${character1.Nome} ganhou o confronto! ${character2.Nome} perdeu um ponto! 💀`)
            }else if(powerResult2 > powerResult1 && character1.Pontos > 0) {
                character1.Pontos -= 1;
                console.log(`🌟 ${character2.Nome} ganhou o confronto! ${character1.Nome} perdeu um ponto! 💀`)
            }

            console.log(powerResult1 === powerResult2 ?
                    `🛑 Confronto empatado! Ninguém pedeu pontos.` :
                    "");
        }

        //Verificação de pontuação/vencedor.
        if(totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.Nome} marcou um ponto! 🏅`)
            character1.Pontos += 1;
        }else if(totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.Nome} marcou um ponto! 🏅`)
            character2.Pontos += 1;
        }

        console.log("-----------------------------------------")
    } //end FOR.

    //Declara o vencedor da corrida.
    await DeclareWinner(character1, character2);
}

async function DeclareWinner(character1, character2) {
    console.log("🥇🥇🥇 RESULTADO FINAL 🥇🥇🥇");
    console.log(`⭐ ${character1.Nome}: ${character1.Pontos} ponto(s)`);
    console.log(`⭐ ${character2.Nome}: ${character2.Pontos} ponto(s)`);

    //Verifica o vencedor!
    if(character1.Pontos > character2.Pontos) {
        console.log(`🏅 O grande vencedor foi: ${character1.Nome.toUpperCase()} 🏆🏆🏆`);
    }else if(character2.Pontos > character1.Pontos) {
        console.log(`🏅 O grande vencedor foi: ${character2.Nome.toUpperCase()} 🏆🏆🏆`);
    }else{
        console.log(`🚨 Empate, não teve um vencendor! 🚨`)
    }
}

//Menu de seleção de personagem.
async function SelectionCharacterMenu(){
    console.log("************** Choose your destiny! **************")
    console.log(`1 - Mario      2 - Peach        3- Yoshi\n4 - Bowser     5- Luigi         6- Donkey Kong`);

    //Read a terminal choice.

    //Player One
    playerOne = parseInt(
        await new Promise(resolve => {
            rl.question("Select your first runner(only numbers): ", resolve)
        })
    );

    //Player Two
    playerTwo = parseInt(
        await new Promise(resolve => {
            rl.question("Select your second runner(only numbers): ", resolve)
        })
    );

    rl.close(); //Close the connection read.

    /*

    rl1.question('Select first runner (numbers only): ', (answer) => {
        console.log(`${answer} is first runner`);
        playerOne = parseInt(answer);
        readline.close();
    });

    await rl2.question('Select second runner: ', (answer) => {
        console.log(`${answer} is second runner`);
        playerTwo = parseInt(answer);
        readline.close();
    });*/
}


//Function start a game.
(async function main(){
    //Select character to run...
    await SelectionCharacterMenu();
    console.clear() //Limpa o terminal.

    //Start race.
    await PlayRaceEngine(runners[playerOne - 1], runners[playerTwo - 1]);
})(); //Autorun function;