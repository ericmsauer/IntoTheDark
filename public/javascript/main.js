//INIT
var game; //This is the main object that contains and controls the game
var paper;	//The canvas that Raphael draws on
var key=[0,0,0,0,0,0,0]; // left, right, up, down

window.onload = function () {
	paper = Raphael("canvas", 640, 480);
	game = new Game();
};

//GAME
function Game(){
	//Canvas elements
	this.game_background;
	this.game_foreground;
	this.mainmenu_elements = new Array();
	this.game_elements = new Array();
	this.game_tips = new Array();
	//Other
	this.game_interval;
	this.mainmenu_interval;
	//Game related variables
	this.levelx = 1;
	this.levely = 1;
	//Pre-game loads
	this.player;
	this.units;
	this.collision_units = new Array();
	this.walls;
	this.collision_walls;
	this.triggers;
	
	//Mouse Attributes
	this.mouse_x = 0;
	this.mouse_y = 0;
	this.mouse_click = 0;
	
	//Audio
	var sound_shield_hit = new Audio("/sounds/shield_hit.wav");

	//---------------------------------------Draw Functions--------------------------
	this.setup_level = function(){
		//Draw Floor
		for(var x = 0; x < 640/40; x ++){
			for(var y = 0; y < 480/40; y ++){
				this.game_background[x][y].show();
			}
		}

		//Draw Game Tips
		if(this.levely < this.game_tips.length)
			this.game_tips[this.levely].show();
		
		//Draw Enviornment
		for(var i = 0; i < this.collision_walls[this.levelx][this.levely].length; i++){
			this.collision_walls[this.levelx][this.levely][i].show();
		}

		//Setup and Draw Units
		for(var i = 0; i < this.units[this.levelx][this.levely].length; i++){
			this.units[this.levelx][this.levely][i].start();
			this.collision_units[i+1] = this.units[this.levelx][this.levely][i];
		}

		this.game_foreground.toFront();
	}

	this.hide_level = function(){
		//Hide floors
		for(var x = 0; x < 640/40; x ++){
			for(var y = 0; y < 480/40; y ++){
				this.game_background[x][y].hide();
			}
		}

		//Hide walls
		for(var i = 0; i < this.collision_walls[this.levelx][this.levely].length; i++){
			this.collision_walls[this.levelx][this.levely][i].hide();
		}

		//Hide tips
		if(this.levely < this.game_tips.length)
			this.game_tips[this.levely].hide();

		//Hide Units
		for(var i = 0; i < this.units[this.levelx][this.levely].length; i++){
			this.units[this.levelx][this.levely][i].stop();
		}

		//Recreate collison array
		this.collision_units = new Array();
		this.collision_units[0] = this.player;
	}
	
	this.draw_updated_game = function(){
		//Draw the units #TODO Seperate into different array?
		for(var i=1; i<this.collision_units.length; i++){
			this.collision_units[i].draw_update();
		}
		//Update Player
		this.player.draw_update();
		this.game_foreground.toFront();
	}

	//Main menu draw functions
	this.draw_init_mainmenu = function(){
		mainmenu_background = paper.rect(0, 0, 640, 480);
		mainmenu_background.attr({fill:"black",opacity:"1"});

		mainmenu_title = paper.text(320,200,"Hidden in the Dark").scale(5,10);
		mainmenu_title.attr({"font-family": "WC", fill:"white",opacity:"0"});

		//Add elements to game element Array
		this.mainmenu_elements[0] = mainmenu_background;
		this.mainmenu_elements[1] = mainmenu_title;

		//Start mainmenu animation]
		mainmenu_title.animate({opacity:"1"},1000,
			function(){
				game.mainmenu_elements[1].animate({opacity:"0"},1000,
					function(){
						game.start_game();
					});
			});
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
		if(!this.player.dead){
			this.player.update();
			for(var i=1; i<this.collision_units.length; i++)
				this.collision_units[i].update();
			for(var i=0; i<this.triggers[this.levelx][this.levely].length; i++)
				this.triggers[this.levelx][this.levely][i].check_collision();
			this.draw_updated_game();
		}
		else{
			var death_text = paper.text(320,240,"You Died").scale(5,5);
			death_text.attr({"font-family": "WC", fill:"Red",opacity:"0"});
			death_text.animate({opacity:"1"},500);
			clearInterval(this.game_interval);
		}
	}

	//Update all objects in the mainmenu
	this.update_mainmenu = function(){
		this.draw_updated_mainmenu();
	}

	//---------------------------------------Init Functions--------------------------
	this.start_game = function(){
		//Background music
		this.sound_background = new Audio("/sounds/background.mp3");
		this.sound_background.addEventListener('ended', function() {
    		this.currentTime = 0;
   			this.play();
		}, false);
		this.sound_background.play();

		//Set Level
		this.levelx = 0;
		this.levely = 0;
		//Init player and units
		this.player = new Player();
		this.collision_units[0] = this.player;
		this.player.positionX = 320;
		this.player.positionY = 440;
		
		clearInterval(this.mainmenu_interval);

		//Hide main menu elements
		this.hide_mainmenu();
		//Draw game elements
		this.player.draw(); //Draw the player
		this.setup_level();
		//Start update game_interval
		this.game_interval = setInterval(function() {
			game.update_game();
			}, 35);
	}	

	//Initialize the game
	this.init = function(){
		//LOAD EVERYTHING BECAUSE WHY NOT!
		//Game Background
		this.game_background = new Array();
		for(var x = 0; x < 640/40; x++){
			this.game_background[x] = new Array();
			for(var y = 0; y < 480/40; y++){
				this.game_background[x][y] = paper.image("/pictures/tile.jpg",x*40,y*40,40,40).hide();
			}
		}
		
		//Walls
		this.walls = new Array();
		this.collision_walls = new Array();
		for(var y = 0; y < y_levels; y++){
			this.walls[y] = new Array();
			this.collision_walls[y] = new Array();
		}
		this.walls[0][0] = level_0_0;
		this.walls[0][1] = level_0_1;
		this.walls[0][2] = level_0_2;
		this.walls[0][3] = level_0_3;
		this.walls[0][4] = level_0_4;
		this.walls[0][5] = level_0_5;
		this.walls[1][3] = level_1_3;
		this.collision_walls[0][0] = this.load_walls(level_0_0);
		this.collision_walls[0][1] = this.load_walls(level_0_1);
		this.collision_walls[0][2] = this.load_walls(level_0_2);
		this.collision_walls[0][3] = this.load_walls(level_0_3);
		this.collision_walls[0][4] = this.load_walls(level_0_4);
		this.collision_walls[0][5] = this.load_walls(level_0_5);
		this.collision_walls[1][3] = this.load_walls(level_1_3);

		//Tips
		this.game_tips[0] = paper.text(320,240,"W,A,S,D to move\n \nHold space to\nsprint").scale(2,2);
		this.game_tips[0].attr({"font-family": "WC", fill:"white",opacity:"1"});
		this.game_tips[1] = paper.text(320,210,"Don't die,\nyou only have one life!").scale(2,2);
		this.game_tips[1].attr({"font-family": "WC", fill:"white",opacity:"1"});
		this.game_tips[2] = paper.text(320,329,"But not Yet...\n \nBeware of the dark").scale(2,2);
		this.game_tips[2].attr({"font-family": "WC", fill:"white",opacity:"1"});
		for(var i = 0; i < this.game_tips.length; i++)
			this.game_tips[i].hide();

		//Units
		this.units = new Array();
		for(var y = 0; y < y_levels; y++){
			this.units[y] = new Array();
		}
		this.units[0][0] = this.load_units(level_0_0_units);
		this.units[0][1] = this.load_units(level_0_1_units);
		this.units[0][2] = this.load_units(level_0_2_units);
		this.units[0][3] = this.load_units(level_0_3_units);
		this.units[0][4] = this.load_units(level_0_4_units);
		this.units[0][5] = this.load_units(level_0_5_units);
		this.units[1][3] = this.load_units(level_1_3_units);

		//Triggers
		this.triggers = new Array();
		for(var y = 0; y < y_levels; y++){
			this.triggers[y] = new Array();
		}
		this.triggers[0][0] = this.load_triggers(level_0_0_triggers);
		this.triggers[0][1] = this.load_triggers(level_0_1_triggers);
		this.triggers[0][2] = this.load_triggers(level_0_2_triggers);
		this.triggers[0][3] = this.load_triggers(level_0_3_triggers);
		this.triggers[0][4] = this.load_triggers(level_0_4_triggers);
		this.triggers[0][5] = this.load_triggers(level_0_5_triggers);
		this.triggers[1][3] = this.load_triggers(level_1_3_triggers);

		this.mainmenu_background = paper.rect(0, 0, 640, 480);
		this.game_foreground = paper.rect(0, 0, 640, 480).attr({fill: "#000", opacity: "0"});
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
		this.mainmenu_interval = setInterval(function() {
			game.update_mainmenu();
			}, 35);
	}

	this.change_level = function(x,y){
		this.hide_level();
		this.levelx = x;
		this.levely = y;
		this.setup_level();
	}

	//---------------------------------------Game Functions--------------------------
	//Function to load walls easily
	this.load_walls = function(walls){
		collision_walls = new Array();
		//Load Walls
		for(var i = 0; i < walls.length; i++){
			var path = "M" + walls[i][0].a.x + "," + walls[i][0].a.y;
			for(var j = 0; j < walls[i].length; j++){
				path += "L" + walls[i][j].b.x + "," + walls[i][j].b.y;
			}
			collision_walls[i] = paper.path(path).hide();
			if(i != 0)
				collision_walls[i].attr({"stroke":"white","stroke-width":"3"});
		}
		return collision_walls;
	}

	//Function to load walls easily
	this.load_triggers = function(triggers){
		collision_triggers = new Array();
		//Load Walls
		for(var i = 0; i < triggers.length; i++){
			collision_triggers[i] = new Trigger(triggers[i].x,triggers[i].y,triggers[i].radius,triggers[i].func);
		}
		return collision_triggers;
	}

	//Function to load walls easily
	this.load_units = function(units){
		collision_units = new Array();
		for(var i = 0; i < units.length; i++){
			if(units[i].type == "unit_1")
				collision_units[i] = new unit_1(units[i].x,units[i].y);
			if(units[i].type == "arrow_shooter")
				collision_units[i] = new arrow_shooter(units[i].x,units[i].y,units[i].direction,units[i].attack_speed);
			if(units[i].type == "spikes")
				collision_units[i] = new spikes(units[i].x,units[i].y,units[i].length,units[i].height,units[i].IMAGE_SRC);
			if(units[i].type == "item")
				collision_units[i] = new item(units[i].x,units[i].y,units[i].item_id);
		}
		return collision_units;
	}

	//Check collision between two units
	this.unit_collision = function(unit,target_unit){
		//Collision between two units
		if(unit!=target_unit){
			//If collision is between two circles
			if(unit.COLLISIONTYPE == 'circle' && target_unit.COLLISIONTYPE == 'circle'){
				var sq1 = Math.pow((unit.positionX-target_unit.positionX),2);
				var sq2 = Math.pow((unit.positionY-target_unit.positionY),2);
				var distance = unit.COLLISION_RADIUS+target_unit.COLLISION_RADIUS;
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
	
	this.weapon_collision = function(unit,target_unit){
		if(unit!=target_unit){
			if(!unit.right_hand_hit){
				var rotation1 = 180*Math.atan2(target_unit.positionY - unit.positionY, target_unit.positionX - unit.positionX)/Math.PI + 90;
				if(rotation1 > unit.rotation + 70 && rotation1 < unit.rotation + 140){
					var sq1 = Math.pow((unit.positionX-target_unit.positionX),2);
					var sq2 = Math.pow((unit.positionY-target_unit.positionY),2);
					var distance = unit.COLLISION_RADIUS+target_unit.COLLISION_RADIUS;
					if(Math.sqrt(sq1 + sq2)<distance + unit.right_hand_length){
						if(target_unit.left_hand_use){
							var rotation2 = 180*Math.atan2(unit.positionY - target_unit.positionY, unit.positionX - target_unit.positionX)/Math.PI + 90;
							if(rotation2 > target_unit.rotation + 65 && rotation2 < target_unit.rotation + 115){
								unit.right_hand_hit = 1;
								unit.sound_shield_hit.play();
								return;
							}
						}
						target_unit.health -= unit.right_hand_damage;
						unit.right_hand_hit = 1;
						new Audio("/sounds/sword_bone_hit.wav").play();
					}
				}
			}
		}
	}

	//Check collision with boundaries
	this.boundary_collision = function(unit){
		for(var x = 0; x < this.walls[this.levelx][this.levely].length; x++){
			var segments = this.walls[this.levelx][this.levely][x];
			for(var y = 0; y < segments.length; y++){
				var seg_v_x = segments[y].b.x - segments[y].a.x;
				var seg_v_y = segments[y].b.y - segments[y].a.y;
				
				var pt_v_x = unit.positionX - segments[y].a.x;
				var pt_v_y = unit.positionY - segments[y].a.y;

				var seg_v = Math.sqrt(seg_v_x*seg_v_x + seg_v_y*seg_v_y);
				var seg_v_unit_x = seg_v_x/seg_v;
				var seg_v_unit_y = seg_v_y/seg_v;

				var proj = pt_v_x*seg_v_unit_x + pt_v_y*seg_v_unit_y;

				if(proj <= 0){
					var closest_x = segments[y].a.x;
					var closest_y = segments[y].a.y;
				}
				else if(proj >= seg_v){
					var closest_x = segments[y].b.x;
					var closest_y = segments[y].b.y;
				}
				else{
					var closest_x = segments[y].a.x + seg_v_unit_x*proj;
					var closest_y = segments[y].a.y + seg_v_unit_y*proj;
				}
				var dist_v_x = unit.positionX - closest_x;
				var dist_v_y = unit.positionY - closest_y;
				if(Math.sqrt(dist_v_x*dist_v_x + dist_v_y*dist_v_y) < unit.RADIUS){
					if(x == 0 && unit == game.player){
						this.hide_level();
						if(y == 0){
							this.levely += 1;
							game.player.positionY = 480 - 20 - game.player.positionY;
						}
						if(y == 1){
							this.levelx += 1;
							game.player.positionX = 640 + 20 - game.player.positionX;
						}
						if(y == 2){
							this.levely -= 1;
							game.player.positionY = 480 + 20 - game.player.positionY;
						}
						if(y == 3){
							this.levelx -= 1;
							game.player.positionX = 640 - 20 - game.player.positionX;
						}
						this.setup_level();
					}
					return true;
				}
			}
		}
		return false;
	}
	
	this.init();
}

//---------------------------------------PLAYER--------------------------
function Player(){
	// Attributes
	this.positionX = 0;
	this.positionY = 0;
	this.rotation = 0; 
	this.RADIUS = 10;
	this.COLLISION_RADIUS = this.RADIUS + 2;
	this.COLLISIONTYPE = 'circle';
	this.health = 100;
	this.MAX_HEALTH = 100;
	this.stamina = 150;
	this.MAX_STAMINA = 150;
	this.dead = false;
	//Equipment
	this.right_hand = 0;
	this.right_hand_use = 0;
	this.right_hand_repeat = 0;
	this.right_hand_hit = 0;
	this.left_hand = 0;
	this.left_hand_use = 0;
	this.right_hand_length = 40;
	this.right_hand_damage = 25;
	//Movement
	this.speed = 3;
	this.sprint = false;
	this.north = false;
	this.south = false;
	this.west = false;
	this.east = false;
	this.distanceX = 0;
	this.distanceY = 0;
	//Canvas_elements
	this.IMAGE_SRC_LEG = "/pictures/player_leg.png";
	this.IMAGE_SRC_BODY = "/pictures/player_body.png";
	this.IMAGE_SRC_RIGHT_HAND = "/pictures/bronze_sword.png";
	this.IMAGE_SRC_LEFT_HAND = "/pictures/shield.png";
	this.canvas_element_legs_1;
	this.canvas_element_legs_2;
	this.canvas_element_body;
	this.canvas_element_right_hand;
	this.canvas_element_left_hand;
	this.canvas_element_health;
	this.canvas_element_stamina;
	//Animations
	this.right_hand_anim = 40;
	this.left_hand_anim = 0;
	this.walk_anim = 0;
	this.walk_anim_direction = 1;
	//Sound
	this.sound_shield_hit = new Audio("/sounds/shield_hit.wav");

	this.update = function(){
		//Death
		if(this.health <= 0) {
			this.dead = true;
		}
		//Check if player is not dead
		if(!this.dead){
			//Movement
			if (key[4] && (this.stamina > 20 || this.sprint)) { //space
				this.speed = 5;
				this.sprint = true;
			}
			else {
				this.speed = 3;
				this.sprint = false;
			}

			if (key[0]) { //left
				this.positionX -= this.speed;
				this.west = true;
				this.distanceX = this.speed;
			}
			if (key[1]) { //right
				this.positionX += this.speed;
				this.east = true;
				this.distanceX = this.speed;
			}
			if (key[2]) { //up
				this.positionY -= this.speed;
				this.north = true;
				this.distanceY = this.speed;
			}
			if (key[3]) { //down
				this.positionY += this.speed;
				this.south = true;
				this.distanceY = this.speed;
			}
			//Check if sprinting
			if ((key[0] || key[1] || key[2] || key[3]) && this.sprint){
				this.stamina -= 3;
				if(this.stamina < 0){
					this.sprint = false;
					this.stamina = 0;
				}
			}
			else {
				this.stamina += 2;
				if(this.stamina >= this.MAX_STAMINA)
					this.stamina = this.MAX_STAMINA;
			}
			if(this.left_hand != 0){
				if (key[6] && this.right_hand_anim == 40)
					this.left_hand_use = 1;
				else
					this.left_hand_use = 0;
			}
			if(this.right_hand != 0){
				if(game.mouse_click == 1) {
					if(this.left_hand_use == 0 && this.right_hand_repeat == 0) {
						this.right_hand_use = 1;
						this.right_hand_repeat = 1;
					}
				}
				else {
					this.right_hand_repeat = 0;
				}
			}
			
			//Determine Right Hand Animation Rate
			if(this.right_hand_use == 1 || this.right_hand_anim != 40) {
				if(this.right_hand_use == 1) {
					if(this.right_hand_anim > -30)
						this.right_hand_anim -= 30;
					else {
						this.right_hand_hit = 0;
						this.right_hand_anim = -30;
						this.right_hand_use = 0;
					}
				}
				else {
					if(this.right_hand_anim < 40)
						this.right_hand_anim += 20;
					else
						this.right_hand_anim = 40
				}
			}

			//Walk animation
			if(this.north || this.south || this.east || this.west) {
				if(this.sprint)
					this.walk_anim += 2*this.walk_anim_direction;
				else
					this.walk_anim += this.walk_anim_direction;
				if(this.walk_anim >= 6)
					this.walk_anim_direction = -1;
				if(this.walk_anim <= -6)
					this.walk_anim_direction = 1;
			}
			
			//Check for collision with other units and boundaries	
			this.check_collision();

			//Determine rotation needed to face the mouse
			this.rotation = 180*Math.atan2(game.mouse_y - this.positionY, game.mouse_x - this.positionX)/Math.PI;

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
		if(game.boundary_collision(this))
			this.reset_position();
		for(var i=1; i<game.collision_units.length; i++){
			unit = game.collision_units[i];
			if(this.right_hand_use == 1)
				game.weapon_collision(this,unit);
			if(game.unit_collision(this,unit)){
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

	this.sight_line_angles = new Array();
	this.sight_line_intersects = new Array();
	this.sight_lines_element = new Array();
	this.sight_lines_poly;
	this.sight_lines_poly_1;

	//Draw
	this.draw = function(){
		this.sight_lines_poly = paper.path();
		this.sight_lines_poly_1 = paper.path();

		//Hands
		this.draw_hands();

		//Legs
		this.canvas_element_legs_1 = paper.image(this.IMAGE_SRC_LEG,this.positionX - this.RADIUS,this.positionY-6,10,13);
		this.canvas_element_legs_2 = paper.image(this.IMAGE_SRC_LEG,this.positionX + 3,this.positionY-6,10,13);

		//Body
		this.canvas_element_body = paper.image(this.IMAGE_SRC_BODY,this.positionX-this.RADIUS,this.positionY - this.RADIUS,20,20);

		//UI
		this.canvas_element_health = paper.rect(3, 3, 100, 4);
		this.canvas_element_health.attr({fill: "#f00", stroke: "#f00"});
		this.canvas_element_stamina = paper.rect(3, 11, 100, 4);
		this.canvas_element_stamina.attr({fill: "#ff0", stroke: "#ff0"});

		this.draw_update();
	}

	this.draw_hands = function(){
		if(this.left_hand != 0 && !this.canvas_element_left_hand)
			this.canvas_element_left_hand = paper.image(this.IMAGE_SRC_LEFT_HAND,this.positionX-this.RADIUS-20,this.positionY-this.RADIUS-20,25,5);
		if(this.right_hand != 0 && !this.canvas_element_right_hand)
			this.canvas_element_right_hand = paper.image(this.IMAGE_SRC_RIGHT_HAND,this.positionX-this.RADIUS-20,this.positionY-this.RADIUS-20,15,40);
	}

	//Update the canvas
	this.draw_update = function(){
		//UI
		this.canvas_element_health.animate({width:100*(this.health/this.MAX_HEALTH)}, 50);
		this.canvas_element_stamina.animate({width:100*(this.stamina/this.MAX_STAMINA)}, 50);

		//Legs
		this.canvas_element_legs_1.attr({x: this.positionX-this.RADIUS-3, y: this.positionY-6 - this.walk_anim});
		this.canvas_element_legs_1.transform("r" + (this.rotation + 90) + "," + this.positionX + "," + this.positionY);
		this.canvas_element_legs_2.attr({x: this.positionX + 3, y: this.positionY-6 + this.walk_anim});
		this.canvas_element_legs_2.transform("r" + (this.rotation + 90) + "," + this.positionX + "," + this.positionY);

		//Body
		this.canvas_element_body.attr({x: this.positionX-this.RADIUS, y: this.positionY-this.RADIUS});
		this.canvas_element_body.transform("r" + (this.rotation + 90));

		//Hands
		if(this.right_hand != 0){
			this.canvas_element_right_hand.attr({x: this.positionX-this.RADIUS + 17, y: this.positionY - this.RADIUS - 35});
			this.canvas_element_right_hand.transform("r" + (this.rotation + 90 + this.right_hand_anim) + "," + this.positionX + "," + this.positionY);
		}
		if(this.left_hand != 0){
			this.canvas_element_left_hand.attr({x: this.positionX-this.RADIUS, y: this.positionY - this.RADIUS - 10});
			if(this.left_hand_use == 1)
				this.canvas_element_left_hand.transform("r" + (this.rotation + 70) + "," + this.positionX + "," + this.positionY);
			else
				this.canvas_element_left_hand.transform("r" + (this.rotation - 20) + "," + this.positionX + "," + this.positionY);
		}

		//Determine rays
		var i = 0;
		for(var x = 0; x < game.walls[game.levelx][game.levely].length; x++){
			for(var y = 0; y < game.walls[game.levelx][game.levely][x].length; y++){
				this.sight_line_angles[i] = Math.atan2(game.walls[game.levelx][game.levely][x][y].b.y-this.positionY,game.walls[game.levelx][game.levely][x][y].b.x-this.positionX);
				i++;
			}
		}

		//Check rays with every other line
		var j = 0;
		for(var i = 0; i < this.sight_line_angles.length; i++){
			var offset = .001;
			var closest_result = new intersection();
			var closest_result_neg = new intersection();
			var closest_result_pos = new intersection();
			for(var x = 0; x < game.walls[game.levelx][game.levely].length; x++){
				for(var y = 0; y < game.walls[game.levelx][game.levely][x].length; y++){
					//Standard Angle
					var result = line_seg_intersect(new line_seg(new point(this.positionX,this.positionY),
							 									 new point(Math.cos(this.sight_line_angles[i])*1000 + this.positionX,
							 									 		   Math.sin(this.sight_line_angles[i])*1000 + this.positionY)),
													new line_seg(new point(game.walls[game.levelx][game.levely][x][y].a.x,game.walls[game.levelx][game.levely][x][y].a.y),
																 new point(game.walls[game.levelx][game.levely][x][y].b.x,game.walls[game.levelx][game.levely][x][y].b.y)));
					if(result.onLine1 && result.onLine2){
						if(closest_result.onLine1 && closest_result.onLine2){
							if(Math.sqrt((result.x - this.positionX)*(result.x - this.positionX) + (result.y - this.positionY)*(result.y - this.positionY)) < Math.sqrt((closest_result.x - this.positionX)*(closest_result.x - this.positionX) + (closest_result.y - this.positionY)*(closest_result.y - this.positionY)))
								closest_result = result;
						}
						else
							closest_result = result;
					}
					//Negative Offset
					result = line_seg_intersect(new line_seg(new point(this.positionX,this.positionY),
							 									 new point(Math.cos(this.sight_line_angles[i]-offset)*1000 + this.positionX,
							 									 		   Math.sin(this.sight_line_angles[i]-offset)*1000 + this.positionY)),
													new line_seg(new point(game.walls[game.levelx][game.levely][x][y].a.x,game.walls[game.levelx][game.levely][x][y].a.y),
																 new point(game.walls[game.levelx][game.levely][x][y].b.x,game.walls[game.levelx][game.levely][x][y].b.y)));
					if(result.onLine1 && result.onLine2){
						if(closest_result_neg.onLine1 && closest_result_neg.onLine2){
							if(Math.sqrt((result.x - this.positionX)*(result.x - this.positionX) + (result.y - this.positionY)*(result.y - this.positionY)) < Math.sqrt((closest_result_neg.x - this.positionX)*(closest_result_neg.x - this.positionX) + (closest_result_neg.y - this.positionY)*(closest_result_neg.y - this.positionY)))
								closest_result_neg = result;
						}
						else
							closest_result_neg = result;
					}
					//Positive Offset
					result = line_seg_intersect(new line_seg(new point(this.positionX,this.positionY),
							 									 new point(Math.cos(this.sight_line_angles[i]+offset)*1000 + this.positionX,
							 									 		   Math.sin(this.sight_line_angles[i]+offset)*1000 + this.positionY)),
													new line_seg(new point(game.walls[game.levelx][game.levely][x][y].a.x,game.walls[game.levelx][game.levely][x][y].a.y),
																 new point(game.walls[game.levelx][game.levely][x][y].b.x,game.walls[game.levelx][game.levely][x][y].b.y)));
					if(result.onLine1 && result.onLine2){
						if(closest_result_pos.onLine1 && closest_result_pos.onLine2){
							if(Math.sqrt((result.x - this.positionX)*(result.x - this.positionX) + (result.y - this.positionY)*(result.y - this.positionY)) < Math.sqrt((closest_result_pos.x - this.positionX)*(closest_result_pos.x - this.positionX) + (closest_result_pos.y - this.positionY)*(closest_result_pos.y - this.positionY)))
								closest_result_pos = result;
						}
						else
							closest_result_pos = result;
					}
				}
			}
			//Standard
			this.sight_line_intersects[j] = new line_seg(new point(this.positionX,this.positionY),
													  new point(closest_result.x,closest_result.y));
			j++;
			this.sight_line_intersects[j] = new line_seg(new point(this.positionX,this.positionY),
													  new point(closest_result_neg.x,closest_result_neg.y));
			j++;
			this.sight_line_intersects[j] = new line_seg(new point(this.positionX,this.positionY),
													  new point(closest_result_pos.x,closest_result_pos.y));
			j++;
		}
		
		this.sight_line_intersects = this.sight_line_intersects.sort(function(a,b){
			return Math.atan2(a.p2.y - a.p1.y, a.p2.x - a.p1.x) - Math.atan2(b.p2.y - b.p1.y, b.p2.x - b.p1.x);
			});

		//Fill in sight polygons
		var path = "M"
		for(var i = 0; i < this.sight_line_intersects.length; i++){
			path += this.sight_line_intersects[i].p2.x + "," + this.sight_line_intersects[i].p2.y + "L";
		}
		path += this.sight_line_intersects[0].p2.x + "," + this.sight_line_intersects[0].p2.y + "z";
		path += "M0,0L0,480L640,480L640,0L0,0z";
		this.sight_lines_poly.attr({path:path + this.sight_line_intersects[0].p2.x + "," + this.sight_line_intersects[0].p2.y,
									stroke:"black",
									fill:"black",
									opacity:"1"});

		//UI
		this.sight_lines_poly.toFront();
		this.canvas_element_health.toFront();
		this.canvas_element_stamina.toFront();
	}
}

//Triggers
function Trigger(x,y,radius,func){
	// Attributes
	this.positionX = x;
	this.positionY = y;
	this.COLLISION_RADIUS = radius;
	this.COLLISIONTYPE = 'circle';
	this.trigger_function = func;
	this.triggered = false;

	//Collision
	this.check_collision = function(){
		if(!this.triggered){
			if(game.unit_collision(this,game.collision_units[0])){
				this.trigger_function();
				this.triggered = true;
			}
		}
	}
}

//Input functions
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

//GEOMETRY
function line_seg(point_1,point_2){
	this.p1 = point_1;
	this.p2 = point_2;
}

function point(a_x,a_y){
	this.x = a_x;
	this.y = a_y;
}

function intersection(){
	this.x = 0;
	this.y = 0;
	this.onLine1 = false;
	this.onLine2 = false;
}

function line_seg_intersect(seg_1,seg_2){
	var result = new intersection();

	var denominator = ((seg_2.p2.y - seg_2.p1.y) * (seg_1.p2.x - seg_1.p1.x)) - ((seg_2.p2.x - seg_2.p1.x) * (seg_1.p2.y - seg_1.p1.y));
	if (denominator == 0) {
        return false;
    }
    var a = seg_1.p1.y - seg_2.p1.y;
    var b = seg_1.p1.x - seg_2.p1.x;
    var numerator1 = ((seg_2.p2.x - seg_2.p1.x) * a) - ((seg_2.p2.y - seg_2.p1.y) * b);
    var numerator2 = ((seg_1.p2.x - seg_1.p1.x) * a) - ((seg_1.p2.y - seg_1.p1.y) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;	

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = seg_1.p1.x + (a * (seg_1.p2.x - seg_1.p1.x));
    result.y = seg_1.p1.y + (a * (seg_1.p2.y - seg_1.p1.y));
/*
        // it is worth noting that this should be the same as:
        x = seg_2.p1.x + (b * (seg_2.p2.x - seg_2.p1.x));
        y = seg_2.p1.x + (b * (seg_2.p2.y - seg_2.p1.y));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a >= 0 && a <= 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b >= 0 && b <= 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
}
