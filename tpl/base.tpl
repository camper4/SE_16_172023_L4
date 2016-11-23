<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title> Employee </title>
  </head>
  <body>
		<button id="mostra" onclick="view.show_form_button()">SHOW</button>
		<div id="error_message" >(: error_message :)</div>
		
		<div id="mostra_nascondi" style="(: visibilita :)">
			<form action="http://127.0.0.1:1337/" method="post" name="myform" id="myform">
				ID:<input name="id" value=(: id :)><br>
				Name:<input name="name" value=(: name :)><br>
				Surname:<input name="surname" value=(: surname :)><br>
				Level:<input name="level" value=(: level :)><br>
				Salary:<input name="salary" value=(: salary :)><br>
				
				<button onclick="octopus.insert()">insert</button>
				<button onclick="octopus.delete()">delete</button>
				<button onclick="octopus.search()">search</button>
			</form>
		</div>

		
		<script src="script.js"></script>
	</body>
		

</html>