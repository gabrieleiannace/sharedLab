import dayjs from 'dayjs';

// costruttore
function Film(id, title, favorite = false, date = '', rating = 0) {
    this.id = id;
    this.title = title;
    this.date = date && dayjs(date);
    this.rating = rating;
    this.favorite = favorite;
}

function Library() {
    this.film = [];
    this.addNewFilm = (f) => {return this.film.push(f)};
}

export { Film, Library };