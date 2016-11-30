var ZPlat = ZPlat || {
};

/* All Variables */


var first_name;
var actualLevel;
var teams;
var teamsButton;

/* Global Vars */
var user_id=1;
var team_id, level_id, level_name, team_movements, player_turn;

/* End Global Vars */

getRequests(function(output){
 	console.log(output[0].first_name);
 	first_name = output[0].first_name;
},'users');

getRequests(function(output){
 	teams = output;
},'teams');


ZPlat.LevelsState={

	preload:function(){
		//Load del spritesheet botón. (Nombre Único, Ubicación, Width (Del botón), Height(del botón))
		this.game.load.spritesheet('teamButtons', 'assets/buttons/levelButton.png', 203,66);

	},

	create:function(){
		this.createButtons();
		//console.log(teams[0].team_id);

	},
	update:function(){
	},

	createButtons:function(){
		for(var i= 0; i < teams.length; i++){
			teamButton = this.game.add.button(i*220, 100, 'teamButtons',this.actionOnClick, this, 2, 1, 0);
			teamButton.onInputOver.add(over, this);
		    teamButton.onInputOut.add(out, this);
		    teamButton.onInputUp.add(up, this);
			teamButton.id = teams[i].team_id;
		}	
	},

	actionOnClick:function(button){
		team_id = button.id;
		//	alert(team_id);
				getLevel(function(output){
				  console.log(output[0]);
				  //level=output;
				  level_id=output[0]['level_id'];
				  level_name=output[0]['name'];
				  level_status=output[0]['status'];
				  team_movements=output[0]['movements'];
				  player_turn = output[0]['turn'];
				},'level');
				
				this.game.state.start('Game');
	}
		
}


function getRequests(handleData,request) {
  $.ajax({
    url:"http://localhost/elreach-develop/php/classes/index.php",
    type: 'POST',
    async: false,
    data: {consulta: request, id: user_id}
  }).done(function(data) {
      handleData(jQuery.parseJSON(data)); 
    });
}

function up() {
  //  console.log('button up', arguments);
}

function over() {
}

function out() {
}


function getLevel(handleData,request) {
  $.ajax({
    url:"http://localhost/elreach-develop/php/classes/index.php",
    type: 'POST',
    data: {consulta: request, team_id: team_id},
    async: false,  
    success:function(data) {
      handleData(jQuery.parseJSON(data)); 
    }
  });
}

