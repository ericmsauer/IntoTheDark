//INIT
var game; //This is the main object that contains and controls the game
var paper;	//The canvas that Raphael draws on
var key=[0,0,0,0,0]; // left, right, up, down

window.onload = function () {
	paper = Raphael("canvas", 640, 480);
	game = new Game();
	game.init();
};

//GAME
function Game(){
	//Canvas elements
	this.game_background;
	this.mainmenu_start_button;
	this.game_UI;
	//Other
	this.game_interval;
	//Game related variables
	this.player;
	this.collision_units = new Array(); //Array of units to be checked for collision
	this.score = 0;
	this.update_counter = 0; //Update counter for random unit movement

	//---------------------------------------Draw Functions--------------------------
	//This function draws the game
	this.draw_updated_game = function(){
		this.player.canvas_element.attr({cx: this.player.positionX,cy: this.player.positionY});
		//Draw the units #TODO Seperate into different array?
		for(var i=1; i<this.collision_units.length; i++){
			this.collision_units[i].canvas_element.attr({cx: this.collision_units[i].positionX,cy: this.collision_units[i].positionY});
		}
		//If the player is dead
		if(this.player.dead == true) {
			paper.text(320,240,"GAME OVER").attr({fill: "#A00"});
		}
	}

	this.draw_mainmenu = function(){
		this.mainmenu_start_button = paper.rect(200,100,100,100).attr({fill: "#f0f"});
		this.mainmenu_start_button.node.onclick = function(){game.start_game();}
	}

	//---------------------------------------Update Functions--------------------------
	//Update all objects in the game
	this.update_game = function(){	
		//If the player is dead
		if(this.player.dead == true) {
			paper.text(320,240,"GAME OVER").attr({fill: "#A00"});
		}
		//Update counter
		if(this.update_counter < 100) {
			this.update_counter += 1;
		} else {
			this.update_counter = 0;
		}
		
		this.player.update();
		for(var i=1; i<this.collision_units.length; i++){
			if (this.update_counter == 99) {
				this.collision_units[i].newrand();
			}
			this.collision_units[i].update();
		}
		this.draw_updated_game();
	}

	//---------------------------------------Init Functions--------------------------
	this.start_game = function(){
		//Init player and units
		this.player = new Player();
		this.collision_units[0] = this.player;	
		unit1 = new unit_1(300,300, Math.random());
		unit2 = new unit_1(500,200, Math.random());
		this.collision_units[1] = unit1;
		this.collision_units[2] = unit2;
		//Hide main menu elements
		this.mainmenu_start_button.hide();
		//Draw UI
		game_UI = paper.text(60,10,"Score: " + this.score + " Health: " + this.player.health);
		//Draw player and units
		this.player.draw(); //Draw the player
		//Draw the units #TODO Seperate into different array?
		for(var i=1; i<this.collision_units.length; i++){
			this.collision_units[i].draw();
		}	
		//Start update interval
		this.game_interval = setInterval(function() {
			game.update_game();
			}, 35);
	}	

	//Initialize the game
	this.init = function(){
		this.game_background = paper.rect(0, 0, 640, 480, 10).attr({fill: "#fff", stroke: "none"}); //Create game box view
		this.draw_mainmenu();
	}	

	//---------------------------------------Game Functions--------------------------
	//Check collision between two units
	this.collision = function(unit,target_unit){
		//Check for out of boundaries
		if(unit.positionX + unit.radius > 640) {
			return true;
		} else if(unit.positionX - unit.radius < 0) {
			return true;
		} else if(unit.positionY + unit.radius > 480) {
			return true;
		} else if(unit.positionY - unit.radius < 0) {
			return true;
		}
		//Collision between two units
		else if(unit!=target_unit){
			//If collision is between two circles
			if(unit.collisionType == 'circle' && target_unit.collisionType == 'circle'){
				var sq1 = Math.pow((unit.positionX-target_unit.positionX),2);
				var sq2 = Math.pow((unit.positionY-target_unit.positionY),2);
				var distance = unit.radius+target_unit.radius;
				if(Math.sqrt(sq1 + sq2)<distance){
					return true;
				}
				else{
					return false;
				}
			}
		}
		else{
			return false;
		}
	}
}

//---------------------------------------UNITS--------------------------
function unit_1(start_x, start_y, start_rand){
	//Standard Attributes
	this.positionX = start_x;
	this.positionY = start_y;
	this.radius = 10;
	this.collisionType = 'circle';
	this.health = 100;
	this.dead = false;
	//Collision helpers
	this.north = false;
	this.south = false;
	this.west = false;
	this.east = false;
	this.distanceX = 0;
	this.distanceY = 0;
	//Random
	this.rand = start_rand;
	//Canvas element
	this.canvas_element;

	this.newrand = function() {
		this.rand = Math.random();
	}

	//Update the unit's attributes
	this.update = function(){	
		if(this.health <= 0) {
			this.dead = true; 
		}
		//If the player is dead stop movement
		if(!this.dead){
			//Random walk
			if(this.rand < 0.25) {
				this.positionX += 1;
				this.east = true;
				this.distanceX = 1;
			} else if (this.rand >= 0.25 && this.rand < 0.5) {
				this.positionX -= 1;
				this.west = true;
				this.distanceX = 1;
			} else if (this.rand >= 0.5 && this.rand < 0.75) {
				this.positionY -= 1;
				this.north = true;
				this.distanceY = 1;
			} else if (this.rand >= 0.75) {
				this.positionY += 1;
				this.south = true;
				this.distanceY = 1;
			}

			this.check_collision();

			//Reset
			this.north = false;
			this.south = false;
			this.east = false;
			this.west = false;
			this.distanceX = 0;
			this.distanceY = 0;
		}
	}
	
	//Collision
	this.check_collision = function(){
		for(var i=0; i<game.collision_units.length; i++){
			unit = game.collision_units[i];
			if(game.collision(this,unit)){
				this.reset_position();
			}
		}	
	}

	//Reset the position of the unit
	this.reset_position = function(){	
		if(this.west){this.positionX += this.distanceX;}
		if(this.east){this.positionX -= this.distanceX;}
		if(this.north){this.positionY += this.distanceY;}
		if(this.south){this.positionY -= this.distanceY;}
	}

	//Draw the unit
	this.draw = function(){
		this.canvas_element = paper.ellipse(this.positionX,this.positionY,10,10).attr({fill: "#0A0"});
	}
}

//---------------------------------------UNITS--------------------------
function Player(){
	//Standard Attributes
	this.positionX = 100;
	this.positionY = 100;
	this.radius = 10;
	this.collisionType = 'circle';
	this.health = 100;
	this.dead = false;
	//Collision helpers
	this.north = false;
	this.south = false;
	this.west = false;
	this.east = false;
	this.distanceX = 0;
	this.distanceY = 0;
	//Canvas_element
	this.canvas_element;

	this.update = function(){
		//Death
		if(this.health <= 0) {
			this.dead = true; 
		}
		//If the player is dead stop movement
		if(!this.dead){
				//Movement	
				if (key[0]) { //left
					this.positionX -= 3;
					this.west = true;
					this.distanceX = 3;
					game.score += 3;
				}
				if (key[1]) { //right
					this.positionX += 3;
					this.east = true;
					this.distanceX = 3;
					game.score += 3;
				}
				if (key[2]) { //up
					this.positionY -= 3;
					this.north = true;
					this.distanceY = 3;
					game.score += 3;
				}
				if (key[3]) { //down
					this.positionY += 3;
					this.south = true;
					this.distanceY = 3;
					game.score += 3;
				}
				if (key[4]) { //space
					
				}
				
				//Check for collision with other units and boundaries	
				this.check_collision();

				//Reset
				this.north = false;
				this.south = false;
				this.east = false;
				this.west = false;
				this.distanceX = 0;
				this.distanceY = 0;
		}
	}

	//Collision
	this.check_collision = function(){
		for(var i=1; i<game.collision_units.length; i++){
			unit = game.collision_units[i];
			if(game.collision(this,unit)){
				this.reset_position();
			}
		}	
	}

	this.reset_position = function(){	
		if(this.west){
			this.positionX += this.distanceX;
		}
		if(this.east){
			this.positionX -= this.distanceX;
		}
		if(this.north){
			this.positionY += this.distanceY;
		}
		if(this.south){
			this.positionY -= this.distanceY;
		}
	}

	//Draw
	this.draw = function(){
		this.canvas_element = paper.ellipse(this.positionX,this.positionY,10,10).attr({fill: "#A00"});
	}
}

function changeKey(which, to){
	switch (which){
		case 65: case 37: key[0]=to; break; // left
		case 87: case 38: key[2]=to; break; // up
		case 68: case 39: key[1]=to; break; // right
		case 83: case 40: key[3]=to; break;// down
		case 32: key[4]=to; break; // space bar;
		case 17: key[5]=to; break; // ctrl
	}
}
document.onkeydown=function(e){changeKey((e||window.event).keyCode, 1);};
document.onkeyup=function(e){changeKey((e||window.event).keyCode, 0);};
