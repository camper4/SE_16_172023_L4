var view = {
	
	errori_num: function(){
		if(isNaN(document.getElementById("id").value))
			document.getElementById("id_error").setAttribute("style" , "display:block")
		if(isNaN(document.getElementById("level").value))
			document.getElementById("level_error").setAttribute("style" , "display:block")
		if(isNaN(document.getElementById("salary").value))
			document.getElementById("salary_error").setAttribute("style" , "display:block")
	},
	
	/**
	* Funzione che, premuto il bottone SHOW o DISAPPEAR fa comparire o scomparire il form
 */
	show_form_button: function(){
		//setto tutti i campi di input vuoti
		document.getElementById("id").value = "";
		document.getElementById("name").value = "";
		document.getElementById("surname").value = "";
		document.getElementById("level").value = "";
		document.getElementById("salary").value = "";
		
		//setto il messaggio di errore, se presente, a vuoto
		document.getElementById('error_message').innerHTML = "";
		
		var testo_bottone = document.getElementById("mostra").innerHTML;
		if(testo_bottone == "SHOW"){ //se il bottone è SHOW mostro il form
			mostra_nascondi.setAttribute("style" , "display:block");
			document.getElementById("mostra").innerHTML = "DISAPPEAR";
		}
		else{ //se il bottone è DISAPPEAR nascondo il form
			mostra_nascondi.setAttribute("style" , "display:none");
			document.getElementById("mostra").innerHTML = "SHOW";
		}
	},
	
	
};

var data = {
	//tabella impiegati
	imp: new Array()
};



var octopus = {
	/**
 * funzione che si attiva quando viene premuto il pulsante di inserimento
 */
	insert: function(){
		if(isNaN(document.getElementById("id").value) || isNaN(document.getElementById("level").value) || isNaN(document.getElementById("salary").value)){
			view.errori_num();}
		else{
			myform.action = "http://127.0.0.1:1337/insert";
			myform.submit();
		}
	},
	
	/**
 * funzione che si attiva quando viene premuto il pulsante di cancellazione
 */
	delete: function(){
		if(isNaN(document.getElementById("id").value))
			 view.errori_num();
		else{
			myform.action = "http://127.0.0.1:1337/delete";
			myform.submit();
		}
	},
	
	/**
 * funzione che si attiva quando viene premuto il pulsante di ricerca
 */
	search: function(){
		if(isNaN(document.getElementById("id").value))
			 view.errori_num();
		else{
			myform.action = "http://127.0.0.1:1337/search";
			myform.submit();
		}
	},
	
	
	/**
 * Funzione che ricevuto un id, ritorna l'indice di quell'impiegato se trovato, -1 altrimenti
 * @param in int id id in ingresso
 */
	check_id: function(id){
		var num_impiegati = data.imp.length; //quanti impiegati ho al momento salvati
		var esiste = -1;
		for(var i = 0; i < num_impiegati; i++) { //controllo su tutti gli impiegati che id non esista
			if(id == data.imp[i][0])	{ //se id esiste già
				esiste = i; //salvo l'indice dell'impiegato
				break;
			}
		}
		return esiste;
	},
	
	
	/**
 * funzione inserimento impiegato con controllo sul campo id
 */
	insert_data: function(id , name , surname , level , salary){
		var num_impiegati = data.imp.length; //quanti impiegati ho al momento salvati
		if(id!=""){ //se il campo id non è nullo
			sovrascritto = octopus.check_id(id);
			if(sovrascritto >= 0){ // 1) se id esiste già sovrascrivo gli altri dati
				for (var i = 0; i < arguments.length; i++) { //assegno al nuovo impiegato i parametri
					data.imp[sovrascritto][i] = arguments[i];
				}
			}
			else{ // 2) se non esiste lo aggiungo
				data.imp[num_impiegati] = new Array(); //creo nuovo impiegato
				for (var i = 0; i < arguments.length; i++) { //assegno al nuovo impiegato i parametri
					data.imp[num_impiegati].push(arguments[i]);
				}
			}
		}
		else{ // 3) se id è nullo invece
			var id = 0;
			var esiste = true; // permetto l'entrata nel while
			while(esiste){ // continuo a ciclare finchè non trovo un id che non esista già
				esiste = false;
				for(var i = 0; i < num_impiegati; i++) { //se id non c'è 'esiste' resterà false
					if(id==data.imp[i][0]){
						esiste = true;
						break;
					}
				}
				if(esiste) // se id c'era già ne provo un altro aumentandolo
					id++;
			}
			data.imp[num_impiegati] = new Array(); //creo nuovo impiegato
			data.imp[num_impiegati].push(id); //inserisco l'id che ho trovato
			for (var i = 1; i < arguments.length; i++) { //assegno al nuovo impiegato i parametri partendo dal secondo
				data.imp[num_impiegati].push(arguments[i]);
			}
		}
		console.log(data.imp , "\n");
	},
	
	
	/**
 * funzione che ritorna le generalità dell'impiegato dall'indice fornito
 */
	return_data: function(indice){
		return data.imp[indice];
	},
	
	
	
	/**
 * Controllo sui campi con primo parametro per differenziare i controlli
 */
	check_campi: function(tiporichiesta , id , name , surname , level , salary){
		//se la richiesta arriva dal post dell'inserimento
		if(tiporichiesta == "insert"){
			if(name == '' || surname == '' || level == '' || salary == '')
				return "campi_assenti";
			else
				return "campi_corretti";
		}
		
		//se la richiesta arriva dal post della ricerca
		if(tiporichiesta == "search"){
			var indice = octopus.check_id(id);
			if(indice >= 0)
				return indice;
			else
				return "indice_non_trovato";	
		}
	},
	
	cancel_data: function(id){
		data.imp.splice(id , 1);
		console.log("cancell" , data.imp , "\n")
	}
};

exports.imp = data.imp;
exports.insert_data = octopus.insert_data;
exports.check_campi = octopus.check_campi;
exports.return_data = octopus.return_data;
exports.cancel_data = octopus.cancel_data;
exports.check_id = octopus.check_id;