const characters$$ = document.querySelector("[data-function='characters']")
const arena$$ = document.querySelector("[data-function='arena']")
let playerOne;
let playerTwo;

init();
async function init() {
    const characters = await getCharacters();
    printCharacters(characters);
}

async function getCharacters() {
    try {
        const res = await fetch("http://localhost:3000/characters");
        return await res.json();
    } catch (e) {
        console.error(e)
    }
}

function printCharacters(characters) {
    for (const character of characters) {
        const div$$ = document.createElement("div");
        div$$.classList.add("c-characters__item")
        div$$.innerHTML = `
            <img src="${character.avatar}"/>
            <h2>${character.name}</h2>
        `

        div$$.addEventListener("click", () => { selectPlayer(character) })
        characters$$.appendChild(div$$)
    }
}

function selectPlayer(character) {
    if (playerOne) {
        playerTwo = character;
        readyForBattle();
    } else {
        playerOne = character;
    }
}

function readyForBattle() {
    const button$$ = document.createElement("button");
    button$$.innerHTML = "Fight!"
    button$$.addEventListener('click', battle)
    characters$$.appendChild(button$$)
}

function battle() {
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    if (randomNumber === 1) {
        round(playerOne, playerTwo);
    } else {
        round(playerTwo, playerOne);
    }
}









function round(playerAttacking, playerDefending) {
  let roundDamage = 0;
   

  for (const dice of playerAttacking.damage) {
      roundDamage += rollADice(dice, playerAttacking.critic);
  }

  finalDamage(roundDamage, playerDefending);

  if (playerDefending.vitality > 0) {
      setTimeout(() => { round(playerDefending, playerAttacking) }, 1000);
  }
   
  const p1$$ = document.createElement('p');
  const p2$$ = document.createElement('p');
  
  const textRound$$ = document.querySelector('[data-function="arena"]');

  let text1 = playerAttacking.name + " ataca y causa " + roundDamage + " puntos de daño a " + playerDefending.name;
  let text2 = playerDefending.name + " se queda con " + playerDefending.vitality + " puntos de vida.";

  p1$$.textContent = text1;
  p2$$.textContent = text2;
  textRound$$.appendChild(p1$$);
  textRound$$.appendChild(p2$$);

 

  console.log(playerAttacking.name + " pegando");
  console.log(playerDefending.name + " vida: " + playerDefending.vitality);
}








 









function finalDamage(damage, playerDefending) {
    const finalDamage = damage - playerDefending.defense;
    playerDefending.vitality -= finalDamage;
}

function rollADice(dice, critic) {
    const indexOfD = dice.indexOf("d");
    const timesToRoll = dice.substring(0, indexOfD);
    const sides = dice.substring(indexOfD + 1, dice.length);
    let diceDamage = 0;

    for (let index = 0; index < timesToRoll; index++) {
        rollingDamage = Math.floor(Math.random() * Number(sides)) + 1;
        diceDamage += rollingDamage === critic ? rollingDamage * 2 : rollingDamage;
    }

    return diceDamage;
}
// const getCharacters = async () => {

//     const characterApi = await fetch(url);
//     const characterRes = await characterApi.json();
//     console.log(characterRes);

//     for (const character of characterRes) {
//         const div$$ = document.createElement('div');
//         div$$.classList.add("c-characters__item")
//         div$$.innerHTML = `
//         <img src=${character.avatar}>
//         <h2>${character.name}</h2>
//         <h3>Vida: ${character.vitality}</h3>
//         <h3>Defensa: ${character.defense}</h3>
//         <h3>Daño: ${character.damage}</h3>
//         <h3>Crítico: ${character.critic}</h3>
//         `
//         characters$$.appendChild(div$$)
//     }

// };

// getCharacters();
