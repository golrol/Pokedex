const express = require('express');
const path = require('path');
const app = express();
let count = 0;
let popularity = {};

app.use('/static', express.static(path.join(__dirname, 'data')));

let pokemons = require('./data/pokemon-data/pokemons.json');

for (pokemon of pokemons) {
    popularity[pokemon.id] = 0;
}

function getMax3(arr) {
    // Create items array
    var items = Object.keys(arr).map(function(key) {
        return [key, arr[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });


    // Create a new array with only the first 5 items
    let x = items.slice(0, 3);

    let p = {
        "max1": {
            "id": x[0][0],
            "popularity": x[0][1]
        },
        "max2": {
            "id": x[1][0],
            "popularity": x[1][1]
        },
        "max3": {
            "id": x[2][0],
            "popularity": x[2][1]
        }
    };
    return p;
}

app.get('/api/pokemons/:id', (req, res) => {
    var currentId = req.params.id;

    res.send(pokemons[currentId - 1])
});

app.post('/api/pokemons/:id', (req, res) => {
    var currentId = req.params.id;
    popularity[currentId] += 1;

    res.send(pokemons[currentId - 1])
});

app.get('/pokemons/:id', (req, res) => {
    var currentId = req.params.id;

    res.sendFile(path.resolve("pages/specificPokemon.html"))
});

app.get('/', (req, res) => res.sendFile(path.resolve("pages/index.html")));
app.get('/pokemons', (req, res) => res.sendFile(path.resolve("pages/allPokemons.html")));
app.get('/max3', (req, res) => {

    var m3 = getMax3(popularity);

    res.send(m3)
});

app.get('/all', (req, res) => res.send(pokemons));
app.listen(3000);