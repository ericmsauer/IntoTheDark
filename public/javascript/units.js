//---------------------------------------UNITS--------------------------
function unit_1(startx, starty){
// Attributes
	this.positionX = startx;
	this.positionY = starty;
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
	this.right_hand = 1;
	this.right_hand_use = 0;
	this.right_hand_repeat = 0;
	this.right_hand_hit = 0;
	this.left_hand = 1;
	this.left_hand_use = 0;
	this.right_hand_length = 40;
	this.right_hand_damage = 25;
	//Movement
	this.speed = 3;
	this.north = false;
	this.south = false;
	this.west = false;
	this.east = false;
	this.distanceX = 0;
	this.distanceY = 0;
	//Canvas_elements
	this.IMAGE_SRC_LEG = "/pictures/player_leg.png";
	this.IMAGE_SRC_BODY = "/pictures/unit_1_body.png";
	this.IMAGE_SRC_RIGHT_HAND = "/pictures/axe.png";
	this.IMAGE_SRC_LEFT_HAND = "/pictures/unit_1_shield.png";
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
	//AI
	this.action = [0,0,0,0,0,0,0,0];
	this.see_player = true;
	this.walk_anim_direction = 1;

	this.determine_actions = function(){
		this.action = [0,0,0,0,0,0,0,0];
		if(this.see_player){
			var distance = Math.sqrt(Math.pow(game.player.positionY - this.positionY,2)+Math.pow(game.player.positionX - this.positionX,2));
			if(distance > 30){
				if(game.player.positionX > this.positionX - 3){
					this.action[1] = true;
					this.action[0] = false;
				}
				else if(game.player.positionX < this.positionX + 3){
					this.action[1] = false;
					this.action[0] = true;
				}
				else{
					this.action[0] = false;
					this.action[1] = false;
				}
				if(game.player.positionY > this.positionY - 3){
					this.action[3] = true;
					this.action[2] = false;
				}
				else if(game.player.positionY < this.positionY + 3){
					this.action[3] = false;
					this.action[2] = true;
				}
				else{
					this.action[2] = false;
					this.action[3] = false;
				}
			}
			else{
				this.action[0] = false;
				this.action[1] = false;
				this.action[2] = false;
				this.action[3] = false;
			}
			if(this.left_hand)
				this.action[6] = true;
			if((distance < 10) && !this.action[6] && !this.action[7])
				this.action[7] = true;
			else
				this.action[7] = false;
		}
	}

	this.update = function(){
		this.determine_actions();
		//Death
		if(this.health <= 0) {
			this.dead = true;
		}
		//Check if player is not dead
		if(!this.dead){
			//Movement
			if (this.action[0]) { //left
				this.positionX -= this.speed;
				this.west = true;
				this.distanceX = this.speed;
			}
			if (this.action[1]) { //right
				this.positionX += this.speed;
				this.east = true;
				this.distanceX = this.speed;
			}
			if (this.action[2]) { //up
				this.positionY -= this.speed;
				this.north = true;
				this.distanceY = this.speed;
			}
			if (this.action[3]) { //down
				this.positionY += this.speed;
				this.south = true;
				this.distanceY = this.speed;
			}
			if(this.left_hand != 0){
				if (this.action[6] && this.right_hand_anim == 40)
					this.left_hand_use = 1;
				else
					this.left_hand_use = 0;
			}
			if(this.right_hand != 0){
				if(this.action[7] == 1) {
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
				this.walk_anim += this.walk_anim_direction;
				if(this.walk_anim >= 6)
					this.walk_anim_direction = -1;
				if(this.walk_anim <= -6)
					this.walk_anim_direction = 1;
			}
			
			//Check for collision with other units and boundaries	
			this.check_collision();

			//Determine rotation needed to face the mouse
			if(this.see_player)
				this.rotation = 180*Math.atan2(game.player.positionY - this.positionY, game.player.positionX - this.positionX)/Math.PI;

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

	//Draw
	this.init = function(){
		//Hands
		this.canvas_element_left_hand = paper.image(this.IMAGE_SRC_LEFT_HAND,this.positionX-this.RADIUS-20,this.positionY-this.RADIUS-20,25,5);
		this.canvas_element_right_hand = paper.image(this.IMAGE_SRC_RIGHT_HAND,this.positionX-this.RADIUS-20,this.positionY-this.RADIUS-20,15,40);

		//Legs
		this.canvas_element_legs_1 = paper.image(this.IMAGE_SRC_LEG,this.positionX - this.RADIUS,this.positionY-6,10,13);
		this.canvas_element_legs_2 = paper.image(this.IMAGE_SRC_LEG,this.positionX + 3,this.positionY-6,10,13);

		//Body
		this.canvas_element_body = paper.image(this.IMAGE_SRC_BODY,this.positionX-this.RADIUS,this.positionY - this.RADIUS,20,20);

		//Health
		this.canvas_element_health = paper.rect(this.positionX - this.RADIUS, this.positionY - this.RADIUS*2 - 5, this.RADIUS*2, 3);
		this.canvas_element_health.attr({fill: "#0f0", stroke: "#0f0"});

		this.draw_update();
	}

	//Update the canvas
	this.draw_update = function(){

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

		this.canvas_element_health.attr({x: this.positionX - this.RADIUS, y: this.positionY - this.RADIUS*2 - 5, width:(this.RADIUS*2)*(this.health/this.MAX_HEALTH)});
	}

	this.start = function(){
		this.canvas_element_body.show();
		this.canvas_element_health.show();
		this.canvas_element_right_hand.show();
		this.canvas_element_left_hand.show();
		if(this.walk_anim < 5)
			this.canvas_element_legs_1.show();
		else
			this.canvas_element_legs_1.hide();
	}

	//Stop a unit
	this.stop = function(){
		this.canvas_element_body.hide();
		this.canvas_element_health.hide();
		this.canvas_element_right_hand.hide();
		this.canvas_element_left_hand.hide();
		this.canvas_element_legs_1.hide();
		this.canvas_element_legs_2.hide();
	}

	this.init();
}

function arrow_shooter(startx, starty, direction, attack_speed){
	// Attributes
	this.positionX = startx;
	this.positionY = starty;
	this.rotation = 0; 
	this.RADIUS = 10;
	this.COLLISION_RADIUS = this.RADIUS + 1;
	this.COLLISIONTYPE = 'circle';
	this.health = 100;
	this.MAX_HEALTH = 100;
	this.dead = false;
	//Arrows
	this.attack_speed = attack_speed;
	this.attack_time = 0;
	this.projectiles = new Array();
	//Shooting direction
	if(direction == 0){
		this.rotation = 90;
	}
	if(direction == 1){
		this.rotation = 0;
	}
	if(direction == 2){
		this.rotation = 270;
	}
	if(direction == 3){
		this.rotation = 180;
	}
	//Canvas_elements
	this.IMAGE_SRC_BODY = "/pictures/arrow_shooter.png";
	this.IMAGE_SRC_BODY_DEATH = "/pictures/arrow_shooter_dead.png";
	this.canvas_element_body;
	this.canvas_element_health;
	//Sound
	this.sound_death = new Audio("/sounds/arrow_shooter_death.wav");

	this.update = function(){
		//Death
		if(this.health <= 0 && !this.dead) {
			this.canvas_element_body.hide();
			this.canvas_element_body = paper.image(this.IMAGE_SRC_BODY_DEATH,this.positionX-this.RADIUS + 15,this.positionY - this.RADIUS - 20,20,20);
			this.canvas_element_health.hide();
			this.sound_death.play();
			this.health = 0;
			this.dead = true; 
		}

		//Update all projectiles
		for(var i = 0; i < this.projectiles.length; i++){
			if(this.projectiles[i] != 0){
				this.projectiles[i].update();
				if(this.projectiles[i].check_collision()){
					this.projectiles[i].dead = true;
					this.projectiles[i].canvas_element_body.remove();
					this.projectiles[i] = 0;
				}
			}
		}

		//Check if player is not dead
		if(!this.dead){
			this.attack_time++;
			if(this.attack_time == this.attack_speed*2)
				this.attack_time = 0;

			if(this.attack_time == this.attack_speed){
				this.projectiles.push(new projectile(this, this.positionX,this.positionY,this.rotation));
			}
			this.draw_update();
		}
		else{

		}
	}

	//Draw
	this.init = function(){
		this.canvas_element_body = paper.image(this.IMAGE_SRC_BODY,this.positionX-this.RADIUS + 15,this.positionY - this.RADIUS - 20,20,20);
		this.canvas_element_health = paper.rect(this.positionX - this.RADIUS, this.positionY - this.RADIUS*2 - 5, this.RADIUS*2, 3);
		this.canvas_element_health.attr({fill: "#0f0", stroke: "#0f0"});

		//Hide elements
		this.canvas_element_body.hide();
		this.canvas_element_health.hide();
	}

	//Update the canvas
	this.draw_update = function(){
		this.canvas_element_body.attr({x: this.positionX-this.RADIUS, y: this.positionY-this.RADIUS});
		this.canvas_element_health.attr({x: this.positionX - this.RADIUS, y: this.positionY - this.RADIUS*2, width:(this.RADIUS*2)*(this.health/this.MAX_HEALTH)});
		this.canvas_element_body.transform("r" + (this.rotation + 90));
		this.canvas_element_body.toFront();
	}

	//Start a unit
	this.start = function(){
		this.canvas_element_body.show();
		this.canvas_element_health.show();
	}

	//Stop a unit
	this.stop = function(){
		this.canvas_element_body.hide();
		this.canvas_element_health.hide();
		for(var i = 0; i < this.projectiles.length; i++){
			if(this.projectiles[i] != 0)
				this.projectiles[i].canvas_element_body.remove();
		}
		this.projectiles = new Array();
	}

	this.init();
}

function projectile(origin, startx, starty, direction){
	// Attributes
	this.positionX = startx;
	this.positionY = starty;
	this.rotation = direction + 90; 
	this.RADIUS = 10;
	this.dead = false;
	this.COLLISION_RADIUS = this.RADIUS + 1;
	this.COLLISIONTYPE = 'circle';
	this.rotation = direction;
	this.origin = origin;
	this.damage = 20;
	//Canvas_elements
	this.canvas_element_body;

	this.update = function(){
		//Check if player is not dead
		if(!this.dead){
			this.positionX += 15*Math.cos(this.rotation*Math.PI/180);
			this.positionY += 15*Math.sin(this.rotation*Math.PI/180);
			this.draw_update();
		}
	}

	//Collision
	this.check_collision = function(){	
		unit = game.collision_units[0];
		if(game.unit_collision(this,unit)){
			if(unit.left_hand_use){
				if(unit.rotation+360 > this.rotation+180-40 && unit.rotation+360 < this.rotation+180+60){
					unit.stamina -= 5*this.damage;
					if(unit.stamina < 0){
						unit.health += unit.stamina;
						unit.stamina = 0;
					}
					unit.sound_shield_hit.play();
				}
				else
					unit.health -= this.damage;
			}
			else{
				unit.health -= this.damage;
			}
			return true;
		}
		if(game.boundary_collision(this))
			return true;
		return false;
	}

	//Draw
	this.init = function(){
		this.canvas_element_body = paper.circle(this.positionX,this.positionY,this.RADIUS);
		this.canvas_element_body.attr({"fill":"grey"});
	}

	//Update the canvas
	this.draw_update = function(){
		this.canvas_element_body.attr({"cx": this.positionX, "cy": this.positionY});
	}

	this.init();
}

function spikes(startx, starty, length, height, IMAGE_SRC){
	// Attributes
	this.positionX = startx;
	this.positionY = starty;
	this.length = length;
	this.height = height;
	this.triggered = false;
	this.dead = false;
	//Canvas_elements
	this.IMAGE_SRC_BODY = IMAGE_SRC;
	this.canvas_element_body;
	//Sound
	this.sound_death = new Audio("/sounds/spikes_death.wav");

	this.update = function(){
		if(this.triggered)
			this.draw_update();
	}

	//Draw
	this.init = function(){
		this.canvas_element_body = paper.image(this.IMAGE_SRC_BODY,this.positionX,this.positionY,this.length,this.height);

		//Hide elements
		this.canvas_element_body.hide();
	}

	//Update the canvas
	this.draw_update = function(){
		this.canvas_element_body.toFront();
	}

	//Start a unit
	this.start = function(){
		if(this.triggered && !this.dead){
			this.canvas_element_body.show();
			this.sound_death.play();
			this.dead = true;
		}
	}

	//Stop a unit
	this.stop = function(){
		this.canvas_element_body.hide();
	}

	this.init();
}

function item(startx, starty, item_id){
	// Attributes
	this.positionX = startx;
	this.positionY = starty;
	this.triggered = false;
	//Canvas_elements
	if(item_id == 0){
		this.IMAGE_SRC_BODY = "/pictures/shield.png"
		this.length = 25;
		this.height = 5;
	}
	if(item_id == 1){
		this.IMAGE_SRC_BODY = "/pictures/bronze_sword.png"
		this.length = 10;
		this.height = 40;
	}
	this.canvas_element_body;

	this.update = function(){
		if(this.triggered){
			this.stop();
		}
	}

	//Draw
	this.init = function(){
		this.canvas_element_body = paper.image(this.IMAGE_SRC_BODY,this.positionX - this.length/2,this.positionY - this.height/2,this.length,this.height);

		//Hide elements
		this.canvas_element_body.hide();
	}

	//Update the canvas
	this.draw_update = function(){
		if(this.triggered)
			this.canvas_element_body.hide();
		this.canvas_element_body.toFront();
	}

	//Start a unit
	this.start = function(){
		this.canvas_element_body.show();
	}

	//Stop a unit
	this.stop = function(){
		this.canvas_element_body.hide();
	}

	this.init();
}