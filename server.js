var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id": "232kAk",
        "text": "Eggs"
    },
    {
        "id": "dkP345",
        "text": "Milk"
    },
    {
        "id": "dkcuu7",
        "text": "Bacon"
    },
    {
        "id": "73hdy",
        "text": "Frogs Legs"
    }
];

app.get('/ingredients', function(req, res) {   //req is request, res is response
    res.send(ingredients);
});

app.post('/ingredients', function(req, res) {
    var ingredient = req.body;
    if(!ingredient || ingredient.text === "") {
        res.status(500).send({error: "Your ingredient must have text"});
    }
    else {
        ingredients.push(ingredient);
        res.status(200).send(ingredients);
    }
});

app.put('/ingredients/:ingredientId', function(req, res) {
    
    var newText = req.body.text;
    
    if (!newText || newText === "") {
        res.status(500).send({error: "You must provide ingredent text"});
    } else {
        var objectFound = false;
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];
            
            if (ing.id === req.params.ingredientId) {
                ingredients[x].text = newText;
                objectFound = true;
                break;
            }
        }
        
        if (!objectFound) {
            res.status(500).send({error: "Ingredient id not found"});
        } else {
            res.send(ingredients);
        }
    }
});

app.listen(3000, function() {
   console.log("First API running on port 3000!"); 
});