//INIT
var game; //This is the main object that contains and controls the game
var paper;	//The canvas that Raphael draws on
var key=[0,0,0,0,0]; // left, right, up, down

window.onload = function () {
	paper = Raphael("canvas", 640, 480);
	game = new Game();
};

//GAME
function Game(){
	//Canvas elements
	this.game_background;
	this.game_foreground;
	this.mainmenu_start_button;
	this.mainmenu_title;
	this.game_UI;
	this.mainmenu_elements = new Array();
	this.game_elements = new Array();
	//Other
	this.game_interval;
	//Game related variables
	this.player;
	this.collision_units = new Array(); //Array of units to be checked for collision
	this.score = 0;
	this.update_counter = 0; //Update counter for random unit movement
	//Mouse Attributes
	this.mouse_x = 0;
	this.mouse_y = 0;
	this.mouse_click = 0;


	//---------------------------------------Draw Functions--------------------------
	this.draw_init_game = function(){
		//Draw UI
		this.game_UI = paper.text(60,10,"Score: " + this.score + " Health: " + this.player.health);
		//Draw player and units
		this.player.draw(); //Draw the player
		//Draw the units #TODO Seperate into different array?
		for(var i=1; i<this.collision_units.length; i++){
			this.collision_units[i].init_draw();
		}
		//Add elements to game element Array
		this.game_elements[0] = this.game_UI;
		this.game_elements[1] = this.player.canvas_element;
		for(var i=1; i<this.collision_units.length; i++){
			this.game_elements.push(this.collision_units[i].canvas_element);
		}
		this.game_foreground.toFront();
	}
	
	this.draw_updated_game = function(){
		//Draw the UI
		this.game_UI.attr({text: "Score: " + this.score + " Health: " + this.player.health});
		//Update Player
		this.player.draw_update();
		//Draw the units #TODO Seperate into different array?
		for(var i=1; i<this.collision_units.length; i++){
			this.collision_units[i].draw_update();
		}
		//If the player is dead
		if(this.player.dead == true) {
			this.hide_game();
			gameover = paper.text(320,240,"GAME OVER").attr({fill: "#A00"}).scale(10,10);
			clearInterval(this.game_interval);
		}
		this.game_foreground.toFront();
	}
	
	this.hide_game = function(){
		for(var i=0; i<this.game_elements.length; i++){
			this.game_elements[i].hide();
		}	
	}

	//Main menu draw functions
	this.draw_init_mainmenu = function(){
		mainmenu_title = paper.text(320,60,"Game").scale(10,10);
		mainmenu_start_button = paper.rect(160,140,320,60).attr({fill: "#f0f"});
		mainmenu_start_button.node.onclick = function(){game.start_game();}
		mainmenu_start_text = paper.text(320,170,"Start").scale(5,5);
		mainmenu_start_text.node.onclick = function(){game.start_game();}
		//Add elements to game element Array
		this.mainmenu_elements[0] = mainmenu_start_button;
		this.mainmenu_elements[1] = mainmenu_start_text;
		this.mainmenu_elements[2] = mainmenu_title;
	}
	
	this.draw_updated_mainmenu = function(){
			
	}
	
	this.draw_mainmenu = function(){
		for(var i=0; i<this.mainmenu_elements.length; i++){
			this.mainmenu_elements[i].show();
		}
	}

	this.hide_mainmenu = function(){
		for(var i=0; i<this.mainmenu_elements.length; i++){
			this.mainmenu_elements[i].hide();
		}
	}

	//---------------------------------------Update Functions--------------------------
	//Update all objects in the game
	this.update_game = function(){	
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
		unit3 = new unit_1(350,250, Math.random());
		unit4 = new unit_1(550,150, Math.random());
		this.collision_units[1] = unit1;
		this.collision_units[2] = unit2;
		this.collision_units[3] = unit3;
		this.collision_units[4] = unit4;
		//Hide main menu elements
		this.hide_mainmenu();
		//Draw game elements
		this.draw_init_game();
		//Start update interval
		this.game_interval = setInterval(function() {
			game.update_game();
			}, 35);
	}	

	//Initialize the game
	this.init = function(){
		this.game_background = paper.rect(0, 0, 640, 480, 10).attr({fill: "#ccc", stroke: "none"}); //Create game box view
		this.game_foreground = paper.rect(0, 0, 640, 480, 10).attr({fill: "#fff", opacity: "0"});
		this.game_foreground.mousemove(function (event){
			game.mouse_x = event.offsetX;
			game.mouse_y = event.offsetY;
		});
		this.game_foreground.mousedown(function (event){
			game.mouse_click = 1;
		});
		this.game_foreground.mouseup(function (event){
			game.mouse_click = 0;
		});
		this.draw_init_mainmenu();
	}	

	//---------------------------------------Game Functions--------------------------
	//Check collision between two units
	this.unit_collision = function(unit,target_unit){
		//Collision between two units
		if(unit!=target_unit){
			//If collision is between two circles
			if(unit.COLLISIONTYPE == 'circle' && target_unit.COLLISIONTYPE == 'circle'){
				var sq1 = Math.pow((unit.positionX-target_unit.positionX),2);
				var sq2 = Math.pow((unit.positionY-target_unit.positionY),2);
				var distance = unit.RADIUS+target_unit.RADIUS;
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

	//Check collision with boundaries
	this.boundary_collision = function(unit){
		//Check for out of boundaries
		if(unit.positionX + unit.RADIUS > 640) {
			return true;
		} else if(unit.positionX - unit.RADIUS < 0) {
			return true;
		} else if(unit.positionY + unit.RADIUS > 480) {
			return true;
		} else if(unit.positionY - unit.RADIUS < 0) {
			return true;
		}
	}


	
	this.init();
}

//---------------------------------------UNITS--------------------------
function unit_1(start_x, start_y, start_rand){
	//Standard Attributes
	this.positionX = start_x;
	this.positionY = start_y;
	this.RADIUS = 10;
	this.COLLISIONTYPE = 'circle';
	this.health = 100;
	this.dead = false;
	//Movement
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
	//Animation helpers
	this.walking = false;
	this.walkcounter = 0;

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
				this.walking = true;
				this.east = true;
				this.distanceX = 1;
			} else if (this.rand >= 0.25 && this.rand < 0.5) {
				this.positionX -= 1;
				this.walking = true;
				this.west = true;
				this.distanceX = 1;
			} else if (this.rand >= 0.5 && this.rand < 0.75) {
				this.positionY -= 1;
				this.walking = true;
				this.north = true;
				this.distanceY = 1;
			} else if (this.rand >= 0.75) {
				this.positionY += 1;
				this.walking = true;
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
		else if(this.dead){
		}
	}
	
	//Collision
	this.check_collision = function(){
		for(var i=0; i<game.collision_units.length; i++){
			unit = game.collision_units[i];
			if(game.unit_collision(this,unit)){
				//unit.health -= 5;
				this.reset_position();
			}
			if(game.boundary_collision(this)){this.reset_position();}
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
	this.init_draw = function(){
		this.canvas_element = paper.image("./art/skeleton_stand.png",this.positionX,this.positionY,40,40);
	}
	
	this.update_draw = function() {
		if(this.walking) {
			if(this.walkcounter <= 8) {
				this.canvas_element.attr({x: this.positionX,
			                              y: this.positionY,
										  src: "./art/skeleton_walk.png"});
				this.walkcounter += 1;
			} else if(this.walkcounter > 8 && this.walkcounter < 16) {
				this.canvas_element.attr({x: this.positionX,
			                              y: this.positionY,
										  src: "./art/skeleton_stand.png"});
				this.walkcounter += 1;
			} else {
				this.walkcounter = 0;
			}
			this.walking = false;
		} else {
			this.canvas_element.attr({x: this.positionX,
			                          y: this.positionY,
								      src: "./art/skeleton_stand.png"});
		}	
	}
	
	//Update the canvas for this unit
	this.draw_update = function(){
		this.canvas_element.attr({x: this.positionX-this.RADIUS, y: this.positionY-this.RADIUS});
	}
}

//---------------------------------------PLAYER--------------------------
function Player(){
	// Attributes
	this.positionX = 100;
	this.positionY = 100;
	this.rotation = 0; 
	this.RADIUS = 10;
	this.COLLISIONTYPE = 'circle';
	this.health = 100;
	this.dead = false;
	//Equipment
	this.right_hand = 0;
	this.right_hand_use = 0;
	this.left_hand = 0;
	this.left_hand_use = 0;
	//Movement
	this.north = false;
	this.south = false;
	this.west = false;
	this.east = false;
	this.distanceX = 0;
	this.distanceY = 0;
	//Canvas_elements
	this.IMAGE_SRC_BODY = "/pictures/player_body.png";
	this.IMAGE_SRC_RIGHT_HAND = "/pictures/axe.png";
	this.IMAGE_SRC_LEFT_HAND = "/pictures/shield.png"; 
	this.canvas_element_body;
	this.canvas_element_right_hand;
	this.canvas_element_left_hand;

	this.update = function(){
		//Death
		if(this.health <= 0) {
			this.dead = true; 
		}
		//Check if player is not dead
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
			if (key[6])
				this.left_hand_use = 1;
			else
				this.left_hand_use = 0;
			if(game.mouse_click == 1)
				this.right_hand_use = 1;
			else
				this.right_hand_use = 0;
				
			
			//Check for collision with other units and boundaries	
			this.check_collision();

			//Determine rotation needed to face the mouse
			this.rotation = 180*Math.atan2(game.mouse_y - this.positionY, game.mouse_x - this.positionX)/Math.PI + 90;

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
			if(game.unit_collision(this,unit)){
				unit.health -= 5;
				this.reset_position();
			}
			if(game.boundary_collision(this)){
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
		this.canvas_element_left_hand = paper.image(this.IMAGE_SRC_LEFT_HAND,this.positionX-this.RADIUS-20,this.positionY-this.RADIUS-20,25,5);
		this.canvas_element_right_hand = paper.image(this.IMAGE_SRC_RIGHT_HAND,this.positionX-this.RADIUS-20,this.positionY-this.RADIUS-20,15,40);
		this.canvas_element_body = paper.image(this.IMAGE_SRC_BODY,this.positionX-this.RADIUS + 15,this.positionY - this.RADIUS - 20,20,20);
	}

	//Update the canvas
	this.draw_update = function(){
		this.canvas_element_body.attr({x: this.positionX-this.RADIUS, y: this.positionY-this.RADIUS});
		this.canvas_element_right_hand.attr({x: this.positionX-this.RADIUS + 17, y: this.positionY - this.RADIUS - 35});
		this.canvas_element_left_hand.attr({x: this.positionX-this.RADIUS, y: this.positionY - this.RADIUS - 10});
		this.canvas_element_body.transform("r" + this.rotation);
		if(this.right_hand_use == 1)
			this.canvas_element_right_hand.transform("r" + (this.rotation - 20) + "," + this.positionX + "," + this.positionY);
		else
			this.canvas_element_right_hand.transform("r" + (this.rotation + 40) + "," + this.positionX + "," + this.positionY);
		if(this.left_hand_use == 1)
			this.canvas_element_left_hand.transform("r" + (this.rotation - 20) + "," + this.positionX + "," + this.positionY);
		else
			this.canvas_element_left_hand.transform("r" + (this.rotation - 70) + "," + this.positionX + "," + this.positionY);
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
		case 16: key[6]=to; break; //shift
	}
}
document.onkeydown=function(e){changeKey((e||window.event).keyCode, 1);};
document.onkeyup=function(e){changeKey((e||window.event).keyCode, 0);};
