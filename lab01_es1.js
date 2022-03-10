"use strict";
function Film(id,title,favourite,date,score) {
    this.id = id,
    this.title = title,
    this.favourite = favourite||false,
    this.date = date,
    this.score = score
    this.toString = ()=>{
        console.log(`id: ${this.id}, title: ${this.title}`);
    }
};

function FilmLibrary(){
    this.library=[],
    this.addNewFilm= function (film){
        if(Array.isArray(film))
        {
            for(const f of film)
            {
                this.library.push(f);
            }
        }
        else this.library.push(film);
    },
    this.deleteFIlm= function (id){
        this.library=this.library.filter((f)=>f.id!==id);
    },
    this.resetWatchedFilms= function(){
        this.library=this.library.map(f=>{
            f.date=undefined;
            return f;
        });
    }
    this.getRated= function(){
        return this.library.filter(f=>f.score!==undefined)
    }
}
let filmLib= new FilmLibrary();
let filmlist= [];
filmlist.push(new Film(1,"pulp fiction",true,15,5));
filmlist.push( new Film(2,"21 Grams",true,16,4) );
filmlist.push( new Film(3,"Star Wars",false)) ;
filmLib.addNewFilm(filmlist);
filmLib.addNewFilm(new Film(4,"Matrix"));
filmLib.addNewFilm(new Film(5,"Shrek",false,17,3));
console.log(filmLib);
filmLib.deleteFIlm(1);
console.log(filmLib);
filmLib.resetWatchedFilms();
console.log(filmLib);
console.log(`film con score:`);
console.log(filmLib.getRated());