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
    const newTd1 = document.createElement("div");
    if (film.favorite) {
        newTd1.innerText = film.title
        newTd1.classList.add("text-danger")
        newTd1.classList.add("col-4")
    } else {
        newTd1.innerText = film.title
        newTd1.classList.add("col-4")
    }

    const newTd2 = document.createElement("div");
    if (film.favorite) {
        newTd2.innerHTML = ` <input class="form - check - input me - 1" type="checkbox" value="" id="flexCheckChecked" checked > Favorite`
        newTd2.classList.add("col-3")
    }
    else {
        newTd2.innerHTML = ` <input class="form - check - input me - 1" type="checkbox" value="" id="flexCheckChecked"  > Favorite`
        newTd2.classList.add("col-3")
    }

    const newTd3 = document.createElement("div");
    if (film.date == '') {
        newTd3.innerText = ""
        newTd3.classList.add("col-3")
    } else {
        newTd3.innerText = film.date.format('MMMM D , YYYY')
        newTd3.classList.add("col-3")
    }


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





    const newTr = document.createElement("li");
    newTr.classList.add("list-group-item")
    newTr.classList.add("pt-3")
    newTr.classList.add("pb-3")

    const newTr1 = document.createElement("div")
    newTr1.classList.add("container-fluid")
    newTr.appendChild(newTr1)

    const newTr2 = document.createElement("div")
    newTr2.classList.add("row")
    newTr1.appendChild(newTr2)

    newTr2.appendChild(newTd1)
    newTr2.appendChild(newTd2)
    newTr2.appendChild(newTd3)
    newTr2.appendChild(newTd4)
    return newTr
}

const tableBody = document.getElementById('ta')

for (let film of filmList) {
    const newRow = populateWebPage(film)
    tableBody.appendChild(newRow)
}

/*
                        <li class="list-group-item pt-3 pb-3">
                            <div class="container-fluid ">
                                <div class="row">
                                    <div class="col-4 text-danger">Pulp Fiction</div>
                                    <div class="col-3">
                                        <input class="form-check-input me-1" type="checkbox" value=""
                                            id="flexCheckChecked" checked>
                                        Favorite
                                    </div>
                                    <div class="col-3">March 10, 2022</div>
                                    <div class="col-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                                </div>
                            </div>
                        </li>*/