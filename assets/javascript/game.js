const wordbank = [`astronomy`, `eclipse`, `asteroid`, `nebula`, `galaxy`, `universe`,`milkyway`, `polaris`, `mars rover`, `aurora`, `constellation`];
var letter = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`];
var computerGuess = wordbank[Math.floor(Math.random() * wordbank.length)];
var currentWord = computerGuess.split("").join("");
var sound = new Audio(`shooting_star-Mike_Koenig-1132888100.mp3`);
let answer = [];
let wrongletters = [];
let Won = 0;
let Lost = 0;
let Guesses = 10;
document.querySelector(`#goodjob`).style.visibility = 'hidden'

// reset game when answer = guessed word or when #of guess = 0
const reset = () => {
    document.querySelector(`#goodjob`).style.visibility = 'hidden'
    answer = [];
    wrongletters = [];
    computerGuess = wordbank[Math.floor(Math.random() * wordbank.length)]
    currentWord = computerGuess.split("").join("")
    document.querySelector(`#wrongletter`).innerHTML = ``
    letter = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`]
    for (i = 0; i < computerGuess.length; i++) {
        if (computerGuess[i] === ` `) {
            answer.push(` `);
        } else {
            answer.push(`_`);
        }
        document.querySelector(`#wordGuess`).textContent = `${answer.join(``)}`
    }
}

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
                    sound.play()

                    // increase win score and reset # of guess allow to 10 when all letters matches 
                    if (computerGuess === answer.join(``)){
                        document.querySelector(`#goodjob`).style.visibility = ''
                        Won++
                        Guesses = 10
                        setTimeout(reset,3000)
                    }  
                }     
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
                reset()            
            }
        }
    }
    document.querySelector(`#scores`).innerHTML = `
    <p>Win = ${Won}</p>
    <p>Lost = ${Lost}</p>`
    
    document.querySelector(`#guesses`).innerHTML = `
    <p>Guess remaining = ${Guesses}`
}