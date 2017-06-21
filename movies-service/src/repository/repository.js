// strict
'use strict'

// const
// db
const repository = (db) => {
  // db collection
  // movies
  const collection = db.collection('movies')

  // get all movie
  // fat arrow
  const getAllMovies = () => {
    // return new promise, res, rej
    return new Promise((resolve, reject) => {
      // movie array
      const movies = []
      // cursor for collection of movies
      // find with title 1, id 1
      const cursor = collection.find({}, {title: 1, id: 1})

      // add movie just push into array
      const addMovie = (movie) => {
        movies.push(movie)
      }

      // slice movie
      const sendMovies = (err) => {
        // error
        if (err) {
          // reject
          reject(new Error('An error occured fetching all movies, err:' + err))
        }

        // resolve, slice that movie
        resolve(movies.slice())
      }

      // cursor after find
      // each add and remove, 2????????????
      cursor.forEach(addMovie, sendMovies)
    })
  }

  // const again
  // get movie pre
  const getMoviePremiers = () => {
    // promise
    return new Promise((resolve, reject) => {
      // mov array
      const movies = []
      // today date
      const currentDay = new Date()
      // release year
      // 2016 < x <= 2017
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        // month
        // 6 + 1 < x <= 6 + 2
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        // date
        // <= 22
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }

      // another cursor with query
      const cursor = collection.find(query)
      // add movies same
      const addMovie = (movie) => {
        movies.push(movie)
      }
      // send movie same
      const sendMovies = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err:' + err))
        }
        resolve(movies)
      }
      cursor.forEach(addMovie, sendMovies)
    })
  }

  // get movie by i
  const getMovieById = (id) => {
    // pro
    return new Promise((resolve, reject) => {
      // what _id, id, title, format
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      // promise
      const sendMovie = (err, movie) => {
        if (err) {
          reject(new Error(`An error occured fetching a movie with id: ${id}, err: ${err}`))
        }
        resolve(movie)
      }
      // collection find one
      // with id as obj, proj?????
      // send movie, resolve movie
      collection.findOne({id: id}, projection, sendMovie)
    })
  }

  // dis db
  const disconnect = () => {
    db.close()
  }

  // all objcreate
  return Object.create({
    getAllMovies,
    getMoviePremiers,
    getMovieById,
    disconnect
  })
}

// now promise connect with connection
const connect = (connection) => {
  // pro
  return new Promise((resolve, reject) => {
    // error
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    // see fun above
    resolve(repository(connection))
  })
}

// new obj, {}, {connect}
module.exports = Object.assign({}, {connect})
