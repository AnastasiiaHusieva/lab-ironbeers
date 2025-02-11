const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(path.join(__dirname + "/views/partials"));

app.get('/', (req, res) => {
  res.render ('index')
}) 

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
  })
  .catch(error => {
      console.error(error);
  })
})
app.get('/beers/:beerId', (req, res) => {
  const beerId = req.params.beerId;
  punkAPI
  .getBeer(beerId)
  .then(beerDetails => {
      res.render('beer-details', { beer: beerDetails[0] });
  })
  .catch(error => {
      console.error(error);
      res.redirect('/beers');
  })
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beer', { randomBeer: responseFromAPI[0] });
  })
  .catch(error => console.log(error));
})
app.listen(3000, () => console.log('🏃‍ on port 3000'));
