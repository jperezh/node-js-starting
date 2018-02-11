const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const cool = require('cool-ascii-faces')
const mongo = require('mongodb').MongoClient;


const databaseName = 'heroku_8zdr4tt7';

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (request, response) => response.send(cool()))
  .get('/times', (req, res) => {
		let result = '';
		let times = process.env.TIMES || 5;
		console.log(times);
		for(var i=0; i < times; i++) {
			result += i + ' ';
		}
		res.send(result);
  })
  .get('/db', (req, res) => {
  		console.log(process.env.MONGODB_URI)
		mongo.connect(process.env.MONGODB_URI, (err, client) => {
			console.log('Succesfully connected to the database')
			const dbo = client.db(databaseName)
			dbo.createCollection('customers', (err, res) => {
				if (err) throw err;
				console.log('Collection created!!');
				client.close();
			})
		})
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
