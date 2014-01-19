function Game(){

	var player
	var score = 0;
		
	this.changeKey = function(which, to){
		switch (which){
			case 65: case 37: key[0]=to; break; // left
			case 87: case 38: key[2]=to; break; // up
			case 68: case 39: key[1]=to; break; // right
			case 83: case 40: key[3]=to; break;// down
			case 32: key[4]=to; break; // space bar;
			case 17: key[5]=to; break; // ctrl
		}
	}

	this.drawCanvas = function(){
		paper.clear();
		paper.rect(0, 0, 640, 480, 10).attr({fill: "#fff", stroke: "none"});
		paper.text(40,10,"Score " + score);
		paper.ellipse(player.positionX,player.positionY,10,10);
	}

	this.init = function(){
		player = new Player();
		game.drawCanvas();
		setInterval(player.update, 35);
	}
}

function Player(){
	var positionX = 100;
	var positionY = 100;

	this.update = function(){
		var change=false;
		if (key[0]) { //left
			positionX -= 3;
			score += 3;
			change=true;
		}
		if (key[1]) { //right
			positionX += 3;
			score += 3;
			change=true;
		}
		if (key[2]) { //up
			positionY -= 3;
			score += 3;
			change=true;
		}
		if (key[3]) { //down
			positionY += 3;
			score += 3;
			change=true;
		}
		if (key[4]) { //space
			
		}

		if(positionX > 640) {
			positionX = 640;
		} else if(positionX < 0) {
			positionX = 0;
		} else if(positionY > 480) {
			positionY = 480;
		} else if(positionY < 0) {
			positionY = 0;
		}
		if (change) drawCanvas();
	}
}

//INIT
var game;
var paper;
var key=[0,0,0,0,0]; // left, right, up, down

window.onload = function () {
	paper = Raphael("canvas", 640, 480);
	game = new Game();
	game.init();
};
