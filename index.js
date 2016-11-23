//Librerie
var express = require('express');
var url = require('url');
var util = require('util');
var bodyParser = require('body-parser');
var bind = require('bind');

//instanzio express
var app = express(); 

app.use(bodyParser.urlencoded({ extended: false }));


var octopus = require('./script.js'); //importo da script funzione inserimento valori


//setto la porta da utilizzare
app.set('port', (process.env.PORT || 1337));

//rendo accessibile al server il file script.js contenuto in tpl
app.get('/script.js', function(req,res){
	res.sendFile('script.js' , { root : __dirname });
});

//creo server quando ricevo la prima richiesta in get immettendo l'indirizzo e la porta
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

//create a server
app.post('/insert', function(req, res){
	//controllo se sono stati inseriti almeno tutti i campi
	if(octopus.check_campi("insert" , req.body.id,req.body.name,req.body.surname,req.body.level,req.body.salary) == 				"campi_corretti"){
		octopus.insert_data(req.body.id,req.body.name,req.body.surname,req.body.level,req.body.salary);
		
		bind.toFile('tpl/base.tpl', {
			visibilita: "display:none"
		}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		});
	}
	else
		{
			bind.toFile('tpl/base.tpl', {
					//set up parameters
					error_message : 'Solo ID può essere vuoto, compila gli altri campi',
					visibilita: "display:none"
    		}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		});
		}
	
	
	}
);



app.post('/search', function(req, res){
	indice = octopus.check_id(req.body.id);
	if(indice < 0){
		bind.toFile('tpl/base.tpl', {
					error_message : 'id non trovato'
    		}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		});
	}
	else{
		var impiegato = octopus.return_data(indice);
		bind.toFile('tpl/base.tpl', {
					id: impiegato[0],
					name: impiegato[1],
					surname: impiegato[2],
					level: impiegato[3],
					salary: impiegato[4],
					visibilita: "display:block"
    		}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		});
	}
		
		

}
);


app.post('/delete', function(req, res){
	indice = octopus.check_id(req.body.id);
	if(indice < 0){
		bind.toFile('tpl/base.tpl', {
					error_message : 'id non trovato'
    		}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		});
	}
	else{
		var impiegato = octopus.cancel_data(indice);
		bind.toFile('tpl/base.tpl', {}, 
    		function(data){
        //write resonse
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
    		});
	}
		
		

}
);


console.log('Server running at http://127.0.0.1:1337/');
app.listen(app.get('port'), function() {
});

		
