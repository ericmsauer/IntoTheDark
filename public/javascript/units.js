//---------------------------------------UNITS--------------------------
function unit_1(startx, starty, face, block){
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
	//Equipment
	this.right_hand = 0;
	this.right_hand_use = 0;
	this.left_hand = 0;
	this.left_hand_use = 0;
	//Movement
	this.viewX = 0;
	this.viewY = 0;
	this.face_player = face;
	this.north = false;
	this.south = false;
	this.west = false;
	this.east = false;
	this.distanceX = 0;
	this.distanceY = 0;
	//Canvas_elements
	this.IMAGE_SRC_BODY = "/pictures/unit_1_body.png";
	this.IMAGE_SRC_RIGHT_HAND = "/pictures/axe.png";
	this.IMAGE_SRC_LEFT_HAND = "/pictures/shield.png"; 
	this.canvas_element_body;
	this.canvas_element_right_hand;
	this.canvas_element_left_hand;
	this.canvas_element_health;
	this.action = [0,0,0,0,0,0,block,0];

	this.update = function(){
		//Death
		if(this.health <= 0) {
			this.health = 0;
			this.dead = true; 
		}
		//Check if player is not dead
		if(!this.dead){
			//Movement	
			if (this.action[0]) { //left
				this.positionX -= 3;
				this.west = true;
				this.distanceX = 3;
				game.score += 3;
			}
			if (this.action[1]) { //right
				this.positionX += 3;
				this.east = true;
				this.distanceX = 3;
				game.score += 3;
			}
			if (this.action[2]) { //up
				this.positionY -= 3;
				this.north = true;
				this.distanceY = 3;
				game.score += 3;
			}
			if (this.action[3]) { //down
				this.positionY += 3;
				this.south = true;
				this.distanceY = 3;
				game.score += 3;
			}
			if (this.action[4]) { //space
			}
			if (this.action[6])
				this.left_hand_use = 1;
			else
				this.left_hand_use = 0;
			if(this.action[7] == 1)
				this.right_hand_use = 1;
			else
				this.right_hand_use = 0;
				
			
			//Check for collision with other units and boundaries	
			this.check_collision();

			//Determine rotation needed to face the mouse
			if(this.face_player)
				this.rotation = 180*Math.atan2(game.player.positionY - this.positionY, game.player.positionX - this.positionX)/Math.PI + 90;	
			else
				this.rotation = 180*Math.atan2(this.viewY - this.positionY, this.viewX - this.positionX)/Math.PI + 90;

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
			//if(game.unit_collision(this,unit) || game.boundary_collision(this)){
			//	this.reset_position();
			//}
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
		this.canvas_element_health = paper.rect(this.positionX - this.RADIUS, this.positionY - this.RADIUS*2 - 5, this.RADIUS*2, 3);
		this.canvas_element_health.attr({fill: "#0f0", stroke: "#0f0"});
	}

	//Update the canvas
	this.draw_update = function(){
		this.canvas_element_body.attr({x: this.positionX-this.RADIUS, y: this.positionY-this.RADIUS});
		this.canvas_element_right_hand.attr({x: this.positionX-this.RADIUS + 17, y: this.positionY - this.RADIUS - 35});
		this.canvas_element_left_hand.attr({x: this.positionX-this.RADIUS, y: this.positionY - this.RADIUS - 10});
		this.canvas_element_health.attr({x: this.positionX - this.RADIUS, y: this.positionY - this.RADIUS*2 - 5, width:(this.RADIUS*2)*(this.health/this.MAX_HEALTH)});
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

function arrow_shooter(startx, starty, direction){
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
	this.attack_speed = 10;
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
	this.canvas_element_body;
	this.canvas_element_health;

	this.update = function(){
		//Death
		if(this.health <= 0) {
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
			if(this.attack_time == 20)
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
		this.canvas_element_health.attr({x: this.positionX - this.RADIUS, y: this.positionY - this.RADIUS*2 - 5, width:(this.RADIUS*2)*(this.health/this.MAX_HEALTH)});
		this.canvas_element_body.transform("r" + (this.rotation - 90));
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
	this.IMAGE_SRC_BODY = "/pictures/arrow.png";
	this.canvas_element_body;

	this.update = function(){
		//Check if player is not dead
		if(!this.dead){
			this.positionX -= 8*Math.cos(this.rotation*Math.PI/180);
			this.positionY += 8*Math.sin(this.rotation*Math.PI/180);
			this.draw_update();
		}
	}

	//Collision
	this.check_collision = function(){	
		unit = game.collision_units[0];
		if(game.unit_collision(this,unit)){
			if(unit.left_hand_use){
				if(unit.rotation > this.rotation - 180 - 30 && unit.rotation < this.rotation - 180 + 30)
					unit.health -= this.damage/5;
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
		this.canvas_element_body = paper.image(this.IMAGE_SRC_BODY,this.positionX-this.RADIUS,this.positionY - this.RADIUS,20,20);
	}

	//Update the canvas
	this.draw_update = function(){
		this.canvas_element_body.attr({x: this.positionX-this.RADIUS, y: this.positionY-this.RADIUS});
		this.canvas_element_body.transform("r" + (this.rotation - 90));
	}

	this.init();
}