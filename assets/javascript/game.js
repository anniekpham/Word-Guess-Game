const wordbank = [`milkyway`, `polaris`, `mars rover`, `aurora`, `constellation`]
const letter = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`]
const computerGuess = wordbank[Math.floor(Math.random() * wordbank.length)];
const currentWord = computerGuess.split("").join("")
let answer = [];
let wrongletters = [];
let Won = 0;
let Lost = 0;
let Guesses = 10;

// replace computerGuess word with underline 
for (i = 0; i < computerGuess.length; i++) {
    if (computerGuess[i] === ` `) {
        answer.push(` `);
    } else {
        answer.push(`_`);
    }
    document.querySelector(`#wordGuess`).textContent = `${answer.join(``)}`
}

// start game by pressing any key to guess the letter
document.onkeyup = e => {
    if (letter.indexOf(e.key) !==-1) {
        // if letter pressed exist w/in the word replace underline w/ actually letter
        if (currentWord.indexOf(e.key) !== -1) {
            for (i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === e.key) {
                    answer[i] = e.key;
                    
                    document.querySelector(`#wordGuess`).textContent = `${answer.join(``)}`
                    console.log(answer.join(``))
                }       
            }  
            // increase win score and reset # of guess allow to 10 when all letters matches 
            if (computerGuess === answer.join(``)){
                Won++
                Guesses = 10
            }  
        } else {
            // add letter to wrong guess when key pressed doesn't match
            if (e.key !== currentWord[i]) {
                wrongletters[i] = e.key
                let wrongGuess = document.createElement(`span`)
                wrongGuess.textContent = `${e.key}`

                document.querySelector(`#wrongletter`).append(wrongGuess)
                // remove letter from array after guessing wrong
                for (i = 0; i < letter.length; i++){
                    if (letter[i] === e.key){
                        letter.splice(i,1)
                    }
                }
                // decrease # of guesses allow 
                Guesses--
            // increase losing score and reset # of guesses when equal to 0
            }if (Guesses === 0){
                Lost++
                Guesses = 10
            }
        }
    }
    document.querySelector(`#scores`).innerHTML = `
    <p>Win = ${Won}</p>
    <p>Lost = ${Lost}</p>`
    
    document.querySelector(`#guesses`).innerHTML = `
    <p>Guess remaining = ${Guesses}`
}
