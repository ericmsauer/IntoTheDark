//INIT
var game;
var paper;
var key=[0,0,0,0,0]; // left, right, up, down

window.onload = function () {
	paper = Raphael("canvas", 640, 480);
	game = new Game();
	game.init();
};

//GAME
function Game(){
	this.player = new Player();
	this.collision_units = new Array();
	this.score = 0;
	this.update_counter = 0;
		
	this.drawCanvas = function(){
		paper.clear();
		paper.rect(0, 0, 640, 480, 10).attr({fill: "#fff", stroke: "none"});
		paper.text(60,10,"Score: " + this.score + " Health: " + this.player.health);
		//Draw the player
		this.player.draw();
		//Draw the units	
		for(var i=1; i<this.collision_units.length; i++){
			this.collision_units[i].draw();
		}
		
		//Death
		if(this.player.dead == true) {
			paper.text(320,240,"GAME OVER").attr({fill: "#A00"});
		}
	}

	this.update = function(){	
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
		this.drawCanvas();
	}

	this.init = function(){
		this.drawCanvas();
		unit1 = new unit_1(300,300, Math.random());
		unit2 = new unit_1(500,200, Math.random());
		this.collision_units[1] = unit1;
		this.collision_units[2] = unit2;
		this.collision_units[0] = this.player;
		setInterval(function() {
			game.update();
			}, 35);
	}
	this.collision = function(unit,target_unit){
		if(unit.positionX > 640) {
			return true;
		} else if(unit.positionX < 0) {
			return true;
		} else if(unit.positionY > 480) {
			return true;
		} else if(unit.positionY < 0) {
			return true;
		}
		else if(unit!=target_unit){
			if(unit.collisionType == 'circle' && target_unit.collisionType == 'circle'){
				var distance = Math.sqrt(Math.pow((unit.positionX-target_unit.positionX),2) +
										Math.pow((unit.positionY-target_unit.positionY),2))<(unit.radius+target_unit.radius);
				if(distance){
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

//UNITS
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

	this.newrand = function() {
		this.rand = Math.random();
	}
	
	this.update = function(){	
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
			this.distancet = 1;
		}
	
		//Collision Reset	
		for(var i=0; i<game.collision_units.length; i++){
			unit = game.collision_units[i];
			if(game.collision(this,unit)){
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
		}
		//Reset
		this.north = false;
		this.south = false;
		this.east = false;
		this.west = false;
		this.distanceX = 0;
		this.distanceY = 0;
	}

	this.draw = function(){
		paper.ellipse(this.positionX,this.positionY,10,10).attr({fill: "#0A0"});
	}
}

//PLAYER
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

	this.update = function(){
		//Death
		if(this.health <= 0) {
			this.dead = true; 
		}
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
	
		for(var i=1; i<game.collision_units.length; i++){
			unit = game.collision_units[i];
			if(game.collision(this,unit)){
				this.health -= 1;
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
		}

		//Reset
		this.north = false;
		this.south = false;
		this.east = false;
		this.west = false;
		this.distanceX = 0;
		this.distanceY = 0;
	}

	this.draw = function(){
		paper.ellipse(this.positionX,this.positionY,10,10).attr({fill: "#A00"});
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
