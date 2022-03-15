"use strict";
const words = ['i', 'spring', 'it', 'cat'];
for(const word of words){
    if(word.length > 1) console.log(word.slice(0, 2) + word.slice(-2));
    else console.log('.');
}