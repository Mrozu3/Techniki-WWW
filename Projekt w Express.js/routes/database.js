var express = require('express');
var router = express.Router(); //obiekt utworzony na metodzie Router z biblioteki express

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies'
});

// Połączenie z bazą danych MOVIES
db.connect();


/* Wyświetl i sortuj */
router.get('/',  (req, res) => {

    let ordername;
    let orderby;
    const order = req.query.order;

    switch (order) {
        case 'titledesc':
            ordername = "Title";
            orderby = "desc";
            break;
        case 'titleasc':
            ordername = "Title";
            orderby = "asc";
            break;
        case 'genredesc':
            ordername = "Genre";
            orderby = "desc";
            break;
        case 'genreasc':
            ordername = "Genre";
            orderby = "asc";
            break;
        case 'runtimedesc':
            ordername = "Runtime";
            orderby = "desc";
            break;
        case 'runtimeasc':
            ordername = "Runtime";
            orderby = "asc"
            break;
        case 'yeardesc':
            ordername = "Year";
            orderby = "desc";
            break;
        case 'yearasc':
            ordername = "Year";
            orderby = "asc";
            break;
        default:
            ordername = "Title";
            orderby = "desc";
    }

    const sql = `SELECT id,Cover,Title,Description,Year,Runtime,Genre FROM movies ORDER BY ${ordername} ${orderby};`;
    db.query(sql, (error, dane) => {
        //res.json(dane);
        res.render('movies', {dane: dane});
    });
});

/* Szukaj */
router.post('/', (req, res) => {
    var findby = req.body.findby;
    const sql = `SELECT id,Cover,Title,Description,Year,Runtime,Genre FROM movies WHERE Title LIKE "%${findby}%" OR Genre LIKE "%${findby}%" OR Year LIKE "%${findby}%" OR Runtime LIKE "%${findby}%";`;
    db.query(sql, (error, dane) => {
        if (error) {
            console.log(error);
            res.status(404).json(error.message)
        }
        res.render('movies', {dane: dane});
    });
})

/* Dodaj */
router.post('/movies', (req, res) => {
    const {cover, title, description, genre, year, runtime} = req.body
    const coverurl = cover //"./images/" + cover + "/cover.jpg";
    const sql = `INSERT INTO movies (cover, title, description, genre, year, runtime) VALUES (?,?,?,?,?,?)`;
    db.query(sql, [coverurl, title, description, genre, year, runtime], (error, dane) => {
        if (error) {
            console.log(error);
            res.status(404).json(error.message)
        }
        res.redirect('/');
    });
})

router.get('/movieadd', (req, res) => {
    res.render('movieadd');
})

/* Szczegóły */
router.get('/:idDetails', (req, res) => {
    var idDetails = req.params.idDetails;

    const sql = `SELECT * FROM movies WHERE Title="${idDetails}"`;
    db.query(sql, (error, dane) => {
        if (error) {
            console.log(error);
            res.status(404).json(error.message)
        }
        res.render('details', {dane: dane});
    });
})

/* Usuwanie */
router.delete('/movies/:id', (req, res) => {
    const sql = `DELETE FROM movies WHERE id=?`;
    db.query(sql, req.params.id, (error, dane) => {
        if (error) {
            console.log(error);
            res.status(404 ).json(error.message)
        }
        res.json({message: "Usunięto pomyślnie"})
    });
})

module.exports = router;        //mechanizm globalnego eksportu, wymienia informacje i funkcje pomiędzy kilkoma plikami
