"use strict";

const a_s =  Array.of("it","a","cat","pippo","pluto","paperino");



const a_s_mod = a_s.map( (s => {
    if(s.length>1)
    {
        const end_r = s.slice(0,2) + s.slice(-2,s.length);
        return end_r;
    }
    return "";
}));
console.log(a_s_mod);

const mod_string_f = function (array_string) 
{
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
}
mod_string_f(a_s);