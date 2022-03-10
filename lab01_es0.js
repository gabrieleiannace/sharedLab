"use strict";

let a_s =  Array.of("it","a","cat","pippo","pluto","paperino");

for (const s of a_s)
{
    if(s.length<2)
    {
        console.log("");
    }
    else
    {
        const end_r = s.slice(0,2) + s.slice(-2,s.length);
        console.log(end_r);
    }
}