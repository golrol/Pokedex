const express = require('express');
const path = require('path');
const app = express();
let count = 0;
let popularity = {};

app.use('/static', express.static(path.join(__dirname, 'pokemon-data')))

let pokemons = require('./pokemon-data/pokemons.json');

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
    return items.slice(0, 3);
}

app.use('/api/pokemons/:id', (req, res) => {
    var currentId = req.params.id;
    popularity[currentId] += 1;

    res.send(pokemons[currentId - 1])
});

app.get('/pokemons/:id', (req, res) => {
    var currentId = req.params.id;

    res.sendFile(path.resolve("pages/specificPokemon.html"))
});



// app.post('/pokemons/:id', (req, res) => {
//     var currentId = req.params.id;
//     popularity[currentId] += 1;
//     res.send(pokemons[currentId - 1])
// });

app.get('/', (req, res) => res.sendFile(path.resolve("pages/index.html")));
app.get('/pokemons', (req, res) => res.sendFile(path.resolve("pages/allPokemons.html")));
app.get('/max3', (req, res) => {

    var m3 = getMax3(popularity);

    res.send(m3)
});

app.get('/all', (req, res) => res.send(pokemons));
app.listen(3000);