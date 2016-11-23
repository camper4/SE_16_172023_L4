<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title> Employee </title>
		<link rel="stylesheet" href="style.css" type="text/css" />
  </head>
  <body>
		<button id="mostra" onclick="view.show_form_button()">SHOW</button>
		<div id="error_message" >(: error_message :)</div>
		
		<div id="mostra_nascondi" style="(: visibilita :)">
			<form action="http://127.0.0.1:1337/" method="post" name="myform" id="myform">
				ID:<input id="id" name="id" value="(: id :)"><br> <div id="id_error" style="display:none">input ID non numerico</div>
				Name:<input id="name" name="name" value="(: name :)"><br>
				Surname:<input id="surname" name="surname" value="(: surname :)"><br>
				Level:<input id="level" name="level" value="(: level :)"><br><div id="level_error" style="display:none">input level non numerico</div>
				Salary:<input id="salary" name="salary" value="(: salary :)"><br> <div id="salary_error" style="display:none">input salary non numerico</div>
			</form>
			<button id="send" onclick="octopus.insert()">insert</button>
			<button id="send" onclick="octopus.delete()">delete</button>
			<button id="send" onclick="octopus.search()">search</button>
		</div>	
		<script src="script.js"></script>
	</body>
		

</html>