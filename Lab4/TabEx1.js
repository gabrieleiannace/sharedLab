'use strict';


function Film(id, title, favorite = false, date = '', rating = 0) {
    this.id = id;
    this.title = title
    this.date = date && dayjs(date)
    this.rating = rating
    this.favorite = favorite

}

function FilmLibrary() {
    this.film = []    //mi creo un array di film

    this.addNewFilm = (e) => {       //aggiungo i Film all'array film , e non ritrono nulla perchè il ritorno è implicito se non metto nulla
        //faccio il controllo del duplicato se esiste già non lo inserisco
        if (!this.film.some(f => f.id == e.id))
            this.film.push(e);
        else
            throw new Error('Duplicate ID')
    }
}

function populateWebPage(film) {
    //carico il titolo
    const newTd1 = document.createElement("div");
    if (film.favorite) {
        newTd1.innerText = film.title
        newTd1.classList.add("text-danger")
        newTd1.classList.add("col-4")
    } else {
        newTd1.innerText = film.title
        newTd1.classList.add("col-4")
    }

    //carico favorite
    const newTd2 = document.createElement("div");
    if (film.favorite) {
        newTd2.innerHTML = ` <input class="form - check - input me - 1" type="checkbox" value="" id="flexCheckChecked" checked > Favorite`
        newTd2.classList.add("col-2")
    }
    else {
        newTd2.innerHTML = ` <input class="form - check - input me - 1" type="checkbox" value="" id="flexCheckChecked"  > Favorite`
        newTd2.classList.add("col-2")
    }

    //carico la data
    const newTd3 = document.createElement("div");
    if (film.date == '') {
        newTd3.innerText = ""
        newTd3.classList.add("col-3")
    } else {
        newTd3.innerText = film.date.format('MMMM D , YYYY')
        newTd3.classList.add("col-3")
    }

    //carico rating
    const newTd4 = document.createElement("div")
    for (let i = 0; i < 5; i++) {
        if (film.rating > i) {
            newTd4.innerHTML += `&#9733`
            newTd4.classList.add("col-2")
        }
        else {
            newTd4.innerHTML += `&#9734`
            newTd4.classList.add("col-2")
        }
    }

    //inserisco icona cestino
    const newTd5 = document.createElement("div")
    newTd5.innerHTML = `&#128465`
    newTd5.classList.add("col-1")
    newTd5.setAttribute("id", "trash")


    //creo la mia struttura annidata , unendo opportunamente i figli
    const newTr = document.createElement("li");
    newTr.classList.add("list-group-item")
    newTr.classList.add("pt-3")
    newTr.classList.add("pb-3")
    //creo il div interno a li
    const newTr1 = document.createElement("div")
    newTr1.classList.add("container-fluid")
    newTr.appendChild(newTr1)
    //creo il div interno al div precedente
    const newTr2 = document.createElement("div")
    newTr2.classList.add("row")
    newTr1.appendChild(newTr2)
    //mi creo tutti gli elementi e li unisco al padre (div precedente) ma dato che non mi serve una struttura annidata
    //li appendo tutti al div corrente(newTr2)
    newTr2.appendChild(newTd1)
    newTr2.appendChild(newTd2)
    newTr2.appendChild(newTd3)
    newTr2.appendChild(newTd4)
    newTr2.appendChild(newTd5)
    //newTr contiene il primo elemento a cui devo unire tutti i figli
    return newTr

}

function arrayFilm() {
    //creo alcune istanze dei film
    const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
    const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
    const f3 = new Film(3, "Star Wars", false);
    const f4 = new Film(4, "Matrix", false);
    const f5 = new Film(5, "Shrek", false, "2022-03-31", 3);
    //aggiungo i film alla libreria
    const library = new FilmLibrary();
    library.addNewFilm(f1)
    library.addNewFilm(f2)
    library.addNewFilm(f3)
    library.addNewFilm(f4)
    library.addNewFilm(f5)

    return library
}


function paginaIniziale() {

    let films = arrayFilm()
    //mi prendo ul dal mio codice HTML , id "ta" l ho inserito io
    const tableBody = document.getElementById('ta')

    //faccio un for su tutto l'array film per inserire i film e a ogni ciclo chiamo il metodo sviluppato sopra
    for (let film of films.film) {
        const newRow = populateWebPage(film)
        //qua parte tutto perche totalBody è il padre di tutto a cui passo newRow che contiene il valore NewTr 
        //in pratico annido a totalBody il primo elemento ovvero li e poi tutto il resto lo fa la funzione
        //come commentato
        tableBody.appendChild(newRow)
    }
    const trash = document.querySelectorAll('#trash')
    trash.forEach(t => {
        t.setAttribute("style", "cursor:pointer")
        t.addEventListener('click', event => {
            const tra = t.parentNode.parentNode.parentNode
            tra.remove()
        })
    })
}

function filter() {
    paginaIniziale()

    const all = document.getElementById('all')
    all.addEventListener('click', event => {
        let films = arrayFilm()
        const tableBodyA = document.getElementById('ta')
        tableBodyA.innerText = ""
        for (let f of films.film) {
            const a = populateWebPage(f)
            tableBodyA.appendChild(a)
        }
        const nav = document.querySelectorAll(".list-group-item-action")
        nav.forEach(n => {
            n.classList.remove("active")
            n.classList.add("bg-light")
        })
        all.classList.add('active')
        all.classList.remove("bg-light")

        const trash = document.querySelectorAll('#trash')
        trash.forEach(t => {
            t.setAttribute("style", "cursor:pointer")
            t.addEventListener('click', event => {
                const tra = t.parentNode.parentNode.parentNode
                tra.remove()
            })
        })
    })

    const link = document.getElementById('favorite')
    link.addEventListener('click', event => {
        let films = arrayFilm()
        const tableBodyF = document.getElementById('ta')
        tableBodyF.innerText = ""
        for (let f of films.film) {
            if (f.favorite) {
                const newFavorite = populateWebPage(f)
                tableBodyF.appendChild(newFavorite)
            }
        }
        const nav = document.querySelectorAll(".list-group-item-action")
        nav.forEach(n => {
            n.classList.remove("active")
            n.classList.add("bg-light")
        })
        link.classList.add('active')
        link.classList.remove("bg-light")

        const trash = document.querySelectorAll('#trash')
        trash.forEach(t => {
            t.setAttribute("style", "cursor:pointer")
            t.addEventListener('click', event => {
                const tra = t.parentNode.parentNode.parentNode
                tra.remove()
            })
        })
    })


    const best = document.getElementById('best')
    best.addEventListener('click', event => {
        let films = arrayFilm()
        const tableBodyB = document.getElementById('ta')
        tableBodyB.innerText = ""
        for (let f of films.film) {
            if (f.rating == 5) {
                const newBest = populateWebPage(f)
                tableBodyB.appendChild(newBest)
            }
        }
        const nav = document.querySelectorAll(".list-group-item-action")
        nav.forEach(n => {
            n.classList.remove("active")
            n.classList.add("bg-light")
        })
        best.classList.add('active')
        best.classList.remove("bg-light")

        const trash = document.querySelectorAll('#trash')
        trash.forEach(t => {
            t.setAttribute("style", "cursor:pointer")
            t.addEventListener('click', event => {
                const tra = t.parentNode.parentNode.parentNode
                tra.remove()
            })
        })
    })

    const lastSeen = document.getElementById('last')
    lastSeen.addEventListener('click', event => {
        let films = arrayFilm()
        const tableBodyL = document.getElementById('ta')
        tableBodyL.innerText = ""

        let today = dayjs(new Date())
        for (let f of films.film) {
            let filmDate = f.date
            if (today.diff(filmDate, 'day') < 7) {
                const newLastSeen = populateWebPage(f)
                tableBodyL.appendChild(newLastSeen)
            }
        }
        const nav = document.querySelectorAll(".list-group-item-action")
        nav.forEach(n => {
            n.classList.remove("active")
            n.classList.add("bg-light")
        })
        lastSeen.classList.add('active')
        lastSeen.classList.remove("bg-light")

        const trash = document.querySelectorAll('#trash')
        trash.forEach(t => {
            t.setAttribute("style", "cursor:pointer")
            t.addEventListener('click', event => {
                const tra = t.parentNode.parentNode.parentNode
                tra.remove()
            })
        })

    })


    const Monthy = document.getElementById('monthy')
    Monthy.addEventListener('click', event => {
        let films = arrayFilm()
        const tableBodyM = document.getElementById('ta')
        tableBodyM.innerText = ""

        let today = dayjs(new Date())
        for (let f of films.film) {
            let filmDate = f.date
            if (today.diff(filmDate, 'day') < 30) {
                const newLastMonthy = populateWebPage(f)
                tableBodyM.appendChild(newLastMonthy)
            }
        }
        const nav = document.querySelectorAll(".list-group-item-action")
        nav.forEach(n => {
            n.classList.remove("active")
            n.classList.add("bg-light")
        })
        Monthy.classList.add('active')
        Monthy.classList.remove("bg-light")

        const trash = document.querySelectorAll('#trash')
        trash.forEach(t => {
            t.setAttribute("style", "cursor:pointer")
            t.addEventListener('click', event => {
                const tra = t.parentNode.parentNode.parentNode
                tra.remove()
            })
        })

    })

}





filter();

