function Film(id, title, favorite = false, date = '', rating = 0) {
    this.id = id;
    this.title = title
    this.date = date && dayjs(date)
    this.rating = rating
    this.favorite = favorite

    //questo lo faccio io per stampare
    //this.toString = () => (`Id = ${this.id} - Title = ${this.title} - Date = ${this.date.format('DD-MM-YYYY')} - Rating = ${this.rating} - Favorite = ${this.favorite}`)
    //altro modo per scrivere la stessa funzione solo che sopra l ho fatto con arrow function
    this.toString = function () {
        return `Id: ${this.id}, ` +
            `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this._formatRating()}, ` +
            `watchDate: ${this._formatWatchDate('LL')}\n`
    };

    this._formatWatchDate = (format) => {
        return this.date ? this.date.format(format) : '<not defined>';
    }

    this._formatRating = () => {
        return this.rating ? this.rating : '<not assigned>';
    }
}


function FilmLibrary() {
    this.film = []    //mi creo un array di film

    this.addNewFilm = (e) => {       //aggiungo i Film all'array film , e non ritrono nulla perchè il ritorno è implicito se non metto nulla
        //faccio il controllo del duplicato se esiste già non lo inserisco
        if (!this.film.some(f => f.id == e.id))
            this.film.push(e);
        //else
        //throw new Error('Duplicate ID')
    }
}

export { Film, FilmLibrary }