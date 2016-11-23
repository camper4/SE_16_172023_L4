//Librerie da importare
var express = require('express');
var url = require('url');
var util = require('util');
var bodyParser = require('body-parser');
var bind = require('bind');

//instanzio express
var app = express(); 

//per prendere i dati dal post
app.use(bodyParser.urlencoded({ extended: false }));

//importo da script la funzione che permette di far interagire dati e view
var octopus = require('./script.js'); 

//setto la porta da utilizzare
app.set('port', (process.env.PORT || 1337));

//rendo accessibile il file script.js
app.get('/script.js', function(req,res){
	res.sendFile('script.js' , { root : __dirname });
});

//rendo accessibile il file style.css
app.get('/style.css', function(req,res){
	res.sendFile('tpl/style.css' , { root : __dirname });
});

//riceve le chiamate in get dal client e sarà la prima ad essere invocata
app.get('/', function(req, res){

		bind.toFile('tpl/base.tpl',{
			visibilita: "display:none"
		}, 
    function(data) 
    {
			//write resonse
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data);
    });
  }
);

//chiamate in post per l'inserimento dei dati dal form
app.post('/insert', function(req, res){
	
	//controllo se sono stati inseriti almeno tutti i campi
	if(octopus.check_campi("insert" , req.body.id,req.body.name,req.body.surname,req.body.level,req.body.salary) == 				"campi_corretti"){
		octopus.insert_data(req.body.id,req.body.name,req.body.surname,req.body.level,req.body.salary);
		
		//ricarico il template rendendo invisibile il form
		bind.toFile('tpl/base.tpl', {
			visibilita: "display:none"
		}, 
			function(data){
			//setto la risposta
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
		}
	else{ //se invece alcuni campi mancano ricarico il template con il messaggio di errore
		bind.toFile('tpl/base.tpl', {
				error_message : 'Solo ID può essere vuoto, compila gli altri campi',
				visibilita: "display:none"
			}, 
			function(data){
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			}
		);
	}
});


//chiamate in post per la ricerca dell'impiegato tramite id
app.post('/search', function(req, res){
	//invoco la funzione per vedere se id esiste
	indice = octopus.check_id(req.body.id);
	if(indice < 0){ //se id non esiste ricarico il template mandando l'errore
		bind.toFile('tpl/base.tpl', {
					error_message : 'id non trovato',
					visibilita: "display:none"
    		}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		}
		);
	}
	else{ //altrimenti mi faccio ritornare l'impiegato tramite una funzione
		var impiegato = octopus.return_data(indice);
		//e carico il template con i dati dell'impiegato ricercato
		bind.toFile('tpl/base.tpl', {
			id: impiegato[0],
			name: impiegato[1],
			surname: impiegato[2],
			level: impiegato[3],
			salary: impiegato[4],
			visibilita: "display:block"
    	}, 
			function(data){
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			}
		);
	}
});


//chiamate in post per la cancellazione dell'impiegato tramite id
app.post('/delete', function(req, res){
	//invoco la funzione per vedere se id esiste
	indice = octopus.check_id(req.body.id);
	if(indice < 0){ //se non esiste ricarico il template e mando indietro l'errore
		bind.toFile('tpl/base.tpl', {
					error_message : 'id non trovato'
    		}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		}
		);
	}
	else{ //altrimenti uso una funzione per cancellare l'impiegato e ricarico poi il template
		var impiegato = octopus.cancel_data(indice);
		bind.toFile('tpl/base.tpl', {}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		}
		);
	}
});


//specifico dove sta in attesa il server e lo faccio attendere su una porta
console.log('Server running at http://127.0.0.1:1337/');
app.listen(app.get('port'), function() {
});

		
