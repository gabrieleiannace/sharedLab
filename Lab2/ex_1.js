'use strict';
const dayjs = require("dayjs");
const sqlite = require('sqlite3');


// internationalization (i18n) 
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat); // use shortcuts 'LL' for date in U.S. format
/* locale
  const locale_it = require('dayjs/locale/it');
  dayjs.locale('it');
*/

function Film(id, title, isFavorite = false, watchDate = '', rating = 0) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  this.watchDate = watchDate && dayjs(watchDate);

  this.toString = () => {
    return `Id: ${this.id}, ` +
    `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this._formatRating()}, ` +
    `watchDate: ${this._formatWatchDate('LL')}`;
  }

  this._formatWatchDate = (format) => {
    return this.watchDate ? this.watchDate.format(format) : '<not defined>';
  }

  this._formatRating = () => {
    return this.rating ? this.rating : '<not assigned>';
  }
}

function FilmLibrary() {
  this.list = [];

  this.print = () => {
    console.log("***** List of Films *****");
    this.list.forEach((item) => console.log(item.toString()));
  }

  this.addNewFilm = (film) => {
    if(!this.list.some(f => f.id == film.id))
      this.list.push(film);
    else
      throw new Error('Duplicate id');
  };

  this.deleteFilm = (id) => {
    const new_list = this.list.filter(function(film, index, arr) {
      return film.id !== id;
    })
    this.list = new_list;
  }

  this.resetWatchedFilms = () => {
    this.list.forEach((film) => film.watchDate = '');
  }

  this.getRated = () => {
    const new_list = this.list.filter(function(film, index, arr) {
      return film.rating > 0;
    })
    return new_list;
  }

  this.sortByDate = () => {
    const new_array = [...this.list];
    new_array.sort((f1, f2) => {
      if(f1.watchDate === f2.watchDate)
        return 0;    // works also for null === null
      else if(f1.watchDate === null || f1.watchDate === '')
        return 1;    // null/empty watchDate is the lower value
      else if(f2.watchDate === null || f2.watchDate === '')
        return -1;
      else
        return f1.watchDate.diff(f2.watchDate)
    });
    return new_array;
  }

  this.getAll = () => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err; });
      const query = 'SELECT * FROM FILMS'
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          resolve(rows);
        }
      });
      db.close();
    });
  }

  this.getFavorites = () => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err; });
      const query = 'SELECT * FROM FILMS WHERE FAVORITE = 1';
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          resolve(rows);
        }
      });
      db.close();
    })
  }

  this.getWatchedToday = () => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err });
      const query = 'SELECT * FROM FILMS WHERE WATCHDATE = ?';
      db.all(query, [dayjs().format('YYYY-MM-DD')], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          if (rows.length == 0) resolve('Nothing to show');
          const films = rows.map(record => new Film(record.id, record.title,
            record.favorite, record.watchdate, record.rating));
          resolve(films);
        }
      })
    })
  }

  this.getBeforeDate = (inputDate) => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err });
      const query = 'SELECT * FROM FILMS WHERE WATCHDATE <= ?';
      db.all(query, [inputDate], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          resolve(rows);
        }
      })
    })
  }

  this.getGreaterThanRating = (inputRating) => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err });
      const query = 'SELECT * FROM FILMS WHERE RATING >= ?';
      db.all(query, [inputRating], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          const films = rows.map(record => new Film(record.id, record.title,
            record.favorite, record.watchdate, record.rating));
          resolve(films);
        }
      })
    })
  }

  this.getByTitle = (inputTitle) => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err });
      const query = 'SELECT * FROM FILMS WHERE TITLE = ?';
      db.all(query, [inputTitle], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          const films = rows.map(record => new Film(record.id, record.title,
            record.favorite, record.watchdate, record.rating));
          resolve(films);
        }
      })
    })
  }

  this.store = (title, favorite, watchdate, rating) => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err });
      const query = 'INSERT INTO FILMS(title, favorite, watchdate, rating) VALUES (?, ?, ?, ?);';
      db.run(query, [title, favorite, dayjs(watchdate), rating], (err) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          resolve("Success");
        }
      })
      db.close()
    })
  }

  this.deleteById = (id) => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err });
      const query = 'DELETE FROM FILMS WHERE ID = ?;';
      db.run(query, [id], (err) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          resolve("Success");
        }
      })
    })
  }

  this.resetWatchdate = () => {
    return new Promise((resolve, reject) => {
      const db = new sqlite.Database('films.db', (err) => { if (err) throw err });
      const query = "UPDATE FILMS SET WATCHDATE = ''";
      db.run(query, [], (err) => {
        if (err) {
          reject(err);
          return;
        }
        else {
          resolve("Success");
        }
      })
      db.close();
    })
  }

}

async function main() {
  // Creating some film entries
  const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
  const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
  const f3 = new Film(3, "Star Wars", false);
  const f4 = new Film(4, "Matrix", false);
  const f5 = new Film(5, "Shrek", false, "2022-03-21", 3);

  // Adding the films to the FilmLibrary
  const library = new FilmLibrary();
  library.addNewFilm(f1);
  library.addNewFilm(f2);
  library.addNewFilm(f3);
  library.addNewFilm(f4);
  library.addNewFilm(f5);

  // Print Sorted films
  // console.log("***** List of Films sorted by watchDate *****");
  // const sorted_films = library.sortByDate();
  // sorted_films.forEach((film) => console.log(film.toString()));

  // Deleting film #3
  // library.deleteFilm(3);

  // Reset dates
  // library.resetWatchedFilms();

  // Printing modified Library
  // library.print();

  // Retrieve and print films with an assigned rating
  // console.log("***** Films filtered, only the rated ones *****");
  // const rated_films = library.getRated();
  // rated_films.forEach((film) => console.log(film.toString()));

  // // Additional instruction to enable debug 
  // debugger;
  // await library.getAll().then(value => console.log(value));

  // await library.getFavorites().then(value => console.log(value));
  // await library.getWatchedToday().then(value => console.log(value));
  // await library.getBeforeDate("2022-03-21").then(value => console.log(value));
  // await library.getGreaterThanRating(3).then(value => console.log(value));
  // await library.getByTitle("Star Wars").then(value => console.log(value));

  // Resolve: DB does not update
  await library.store("Hunger Games", 1, "2022-03-21", 4).then(value => console.log(value));
  await library.deleteById(23).then(value => console.log(value));
  await library.resetWatchdate().then(value => console.log(value));
  
}

main();

