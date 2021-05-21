const express = require('express');
const path = require('path');
const app = express();

let popularity = {};

app.use('/static', express.static(path.join(__dirname, 'data')));

let pokemons = require('./data/pokemon-data/pokemons.json'); //Get json data file.

for (pokemon of pokemons) { //Init popularity of all the pokemons.
    popularity[pokemon.id] = 0;
}

app.get('/api/pokemons/:id', (req, res) => { //Return json data of specific pokemon.
    var currentId = req.params.id;

    res.send(pokemons[currentId - 1]);
});

app.post('/api/pokemons/:id', (req, res) => { //Return json data of specific pokemon and increse popularity.
    var currentId = req.params.id;
    popularity[currentId] += 1;

    res.send(pokemons[currentId - 1]);
});

app.get('/pokemons/:id', (req, res) => { //Return the template html page.

    res.sendFile(path.resolve("pages/specificPokemon.html"))
});

app.get('/pokemons', (req, res) =>
    res.sendFile(path.resolve("pages/allPokemons.html"))); //Return all pokemons html page.

function getMax3(arr) { //Helper function that get's the 3 most popular pokemons.
    //Create items array
    var items = Object.keys(arr).map(function(key) {
        return [key, arr[key]];
    });

    //Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    //Create a new array with only the first 3 items
    let max3Array = items.slice(0, 3);

    let retVal = [{
            "index": "1",
            "pokemon": pokemons[max3Array[0][0] - 1],
            "popularity": max3Array[0][1]
        },
        {
            "index": "2",
            "pokemon": pokemons[max3Array[1][0] - 1],
            "popularity": max3Array[1][1]
        },
        {
            "index": "3",
            "pokemon": pokemons[max3Array[2][0] - 1],
            "popularity": max3Array[2][1]
        }
    ];

    return retVal;
}

app.get('/max3', (req, res) => { //Return json data of top 3 popular pokemons.

    var m3 = getMax3(popularity);

    res.send(m3)
});

app.get('/all', (req, res) => res.send(pokemons)); //Return json data file of all the pokemons.

app.get('/', (req, res) => res.sendFile(path.resolve("pages/index.html"))); //Home page.
app.listen(3000);