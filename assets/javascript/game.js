let Won = 0, Lost = 0, Guesses = 10;

document.querySelector(`#scores`).innerHTML = `
<p>Win = ${Won}</p>
<p>Lost = ${Lost}</p>`

document.querySelector(`#guesses`).innerHTML = `
<p>Number of guess left = ${Guesses}`