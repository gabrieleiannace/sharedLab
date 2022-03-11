'use strict'

//devo stampare i primi due e gli ultimi due caratteri

let s = ['pippo', 'primavera', 'spring', 'tavolino', 'a', 'sim', 'tt']; //mi creo un array


//arrow function
const fn = (as) => {
    const t = [];
    let inizio, fine
    for (let i of as) {  //qua mi scorro tutto l'array
        if (i.length < 2) {
            t.push('')
        }
        else {
            inizio = i.slice(0, 2);
            fine = i.slice(i.length - 2, i.length)
            t.push(inizio + fine)
        }
    }
    return t;

}


s = fn(s);
console.log(s);



