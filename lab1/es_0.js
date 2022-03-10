"use strict";

const array = ['pippo', 'pluto','c', 'paperino', 'topolino'];

for(const index of array){
    if(index.length < 2){
        console.log('');
        continue;
    }
    console.log(index.slice(0,2) + index.slice(-2));
}

//Implementazione con la map

const array2 = array.map( frase  => {
    if(frase.length < 2)
        return '';
    return (frase.slice(0,2) + frase.slice(-2));
})

console.log(array2);