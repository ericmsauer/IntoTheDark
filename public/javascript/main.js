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
	this.active_units = new Array();
	this.score = 0;
	this.update_counter = 0;
		
	this.drawCanvas = function(){
		paper.clear();
		paper.rect(0, 0, 640, 480, 10).attr({fill: "#fff", stroke: "none"});
		paper.text(60,10,"Score: " + this.score + " Health: " + this.player.health);
		this.player.draw();	
		for(var i=1; i<this.active_units.length; i++){
			this.active_units[i].draw();
		}
	}

	this.update = function(){
	
		if(this.update_counter < 100) {
			this.update_counter += 1;
		} else {
			this.update_counter = 0;
		}
		
		this.player.update();
		for(var i=1; i<this.active_units.length; i++){
			if (this.update_counter == 99) {
				this.active_units[i].newrand();
			}
			this.active_units[i].update();
		}
		this.drawCanvas();
	}

	this.init = function(){
		this.drawCanvas();
		unit1 = new unit_1(300,300, Math.random());
		unit2 = new unit_1(500,200, Math.random());
		this.active_units[1] = unit1;
		this.active_units[2] = unit2;
		setInterval(function() {
			game.update();
			}, 35);
	}
}

//UNITS
function unit_1(start_x, start_y, start_rand){
	this.positionX = start_x;
	this.positionY = start_y;
	this.collisionType = 'circle';
	this.radius = 10;
	this.direction = 3;
	this.rand = start_rand;

	this.newrand = function() {
		this.rand = Math.random();
	}
	
	this.update = function(){
		if(this.positionX == 200){
			this.direction=0;
		}	
		else if(this.positionX == 100){
			this.direction=1;
		}
		if(this.direction==1){
			this.positionX += 1;
		}
		else if(this.direction==0){
			this.positionX -= 1;
		}
		//^^^^^^ dunno what this does
		
		//Random walk
		if(this.rand < 0.25) {
			this.positionX += 1;
		} else if (this.rand >= 0.25 && this.rand < 0.5) {
			this.positionX -= 1;
		} else if (this.rand >= 0.5 && this.rand < 0.75) {
			this.positionY += 1;
		} else if (this.rand >= 0.75) {
			this.positionY -= 1;
		}
		
		//Boundaries
		if(this.positionX > 640) {
			this.positionX = 640;
		} else if(this.positionX < 0) {
			this.positionX = 0;
		} else if(this.positionY > 480) {
			this.positionY = 480;
		} else if(this.positionY < 0) {
			this.positionY = 0;
		}
	}

	this.draw = function(){
		paper.ellipse(this.positionX,this.positionY,10,10).attr({fill: "#0A0"});
	}
}

//PLAYER
function Player(){
	//Position
	this.positionX = 100;
	this.positionY = 100;
	this.radius = 10;
	this.health = 100;
	//Collision helpers
	this.north = false;
	this.south = false;
	this.west = false;
	this.east = false;
	this.distanceX = 0;
	this.distanceY = 0;

	this.collision = function(unit){
		if(unit.collisionType == 'circle'){
			var distance = Math.sqrt(Math.pow((unit.positionX-this.positionX),2)+Math.pow((unit.positionY-this.positionY),2))<(unit.radius+this.radius);
			if(distance){
				this.health -= 1;
				return true;
			}
			else{
				return false;
			}
		}
	}
	this.update = function(){
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
	
		for(var i=1; i<game.active_units.length; i++){
			unit = game.active_units[i];
			if(this.collision(unit)){
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

		//Boundaries
		if(this.positionX > 640) {
			this.positionX = 640;
		} else if(this.positionX < 0) {
			this.positionX = 0;
		} else if(this.positionY > 480) {
			this.positionY = 480;
		} else if(this.positionY < 0) {
			this.positionY = 0;
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
