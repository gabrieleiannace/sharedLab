/*Before starting, from Visual Studio Code, make sure that Node.js has been installed on your computer.
Create a function that, given an array of strings, for each string computes and prints a new one composed
by the first two and last two characters. For instance, ‘spring’ yields ‘spng’.
If the word is shorter than two characters, it prints an empty string. Otherwise, if the word is two or three
characters long, the function prints the same character two times. For instance, ‘it’ yields ‘itit’ and ‘cat’
yields ‘caat’.
Write some test instructions that call the function with a variety of strings and check the result's
correctness. */

"use strict";
const words = ['i', 'spring', 'it', 'cat'];
for(const word of words){
    if(word.length > 1) console.log(word.slice(0, 2) + word.slice(-2));
    else console.log('.');
}