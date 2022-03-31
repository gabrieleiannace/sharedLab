'use strict';


function Film(id, title, favorite = false, date = '', rating = 0) {
    this.id = id;
    this.title = title
    this.date = date && dayjs(date)
    this.rating = rating
    this.favorite = favorite

}

const filmList = [
    new Film(1, "Pulp Fiction", true, "2022-03-10", 5),
    new Film(2, "21 Grams", true, "2022-03-17", 4),
    new Film(3, "Star Wars", false),
    new Film(4, "Matrix", false),
    new Film(5, "Shrek", false, "2022-03-21", 3),
];

function populateWebPage(film) {
    const newTd1 = document.createElement("td");
    if (film.favorite) {
        newTd1.innerText = film.title
        newTd1.classList.add("text-danger")
    } else {
        newTd1.innerText = film.title
    }

    const newTd2 = document.createElement("td");
    if (film.favorite) {
        newTd2.innerHTML = ` <input class="form - check - input me - 1" type="checkbox" value="" id="flexCheckChecked" checked > Favorite`
    }
    else {
        newTd2.innerHTML = ` <input class="form - check - input me - 1" type="checkbox" value="" id="flexCheckChecked"  > Favorite`
    }

    const newTd3 = document.createElement("td");
    if (film.date == '') {
        newTd3.innerText = ""
    } else {
        newTd3.innerText = film.date.format('MMMM D , YYYY')
    }


    const newTd4 = document.createElement("td")
    for (let i = 0; i < 5; i++) {
        if (film.rating > i) {
            newTd4.innerHTML += `&#9733`
        }
        else {
            newTd4.innerHTML += `&#9734`
        }
    }





    const newTr = document.createElement("tr");
    newTr.appendChild(newTd1)
    newTr.appendChild(newTd2)
    newTr.appendChild(newTd3)
    newTr.appendChild(newTd4)
    return newTr
}

const tableBody = document.querySelector('tbody')

for (let film of filmList) {
    const newRow = populateWebPage(film)
    tableBody.appendChild(newRow)
}




