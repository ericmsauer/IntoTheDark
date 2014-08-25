// LINE SEGMENTS

var x_levels = 1;
var y_levels = 3;

var level_0_0 = [
	// Border
	[{a:{x:0,y:0}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}}],
	
	//Walls
	[{a:{x:440,y:0}, b:{x:440,y:480}},
	{a:{x:440,y:480}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:440,y:0}}],
	[{a:{x:200,y:0}, b:{x:200,y:480}},
	{a:{x:200,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}},
	{a:{x:0,y:0}, b:{x:200,y:0}}],
	[{a:{x:200,y:460}, b:{x:440,y:460}},
	{a:{x:440,y:460}, b:{x:440,y:480}},
	{a:{x:440,y:480}, b:{x:200,y:480}},
	{a:{x:200,y:480}, b:{x:200,y:460}}],
];
var level_0_0_units = [
	 {type:"unit_1",
	 x: 300, y: 60},
];
var level_0_0_triggers = [
];

var level_0_1 = [
	// Border
	[{a:{x:0,y:0}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}}],
	
	//Walls
	[{a:{x:480,y:0}, b:{x:480,y:40}},
	{a:{x:480,y:40}, b:{x:440,y:40}},
	{a:{x:440,y:40}, b:{x:440,y:120}},
	{a:{x:440,y:120}, b:{x:480,y:120}},
	{a:{x:480,y:120}, b:{x:480,y:160}},
	{a:{x:480,y:160}, b:{x:440,y:160}},
	{a:{x:440,y:160}, b:{x:440,y:240}},
	{a:{x:440,y:240}, b:{x:480,y:240}},
	{a:{x:480,y:240}, b:{x:480,y:280}},
	{a:{x:480,y:280}, b:{x:440,y:280}},
	{a:{x:440,y:280}, b:{x:440,y:480}},
	{a:{x:440,y:480}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:480,y:0}}],

	[{a:{x:200,y:0}, b:{x:200,y:480}},
	{a:{x:200,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}},
	{a:{x:0,y:0}, b:{x:200,y:0}}],
];
var level_0_1_units = [
	 {type:"arrow_shooter",
	 x: 460, y: 20,
	 direction: 3,
	 attack_speed: 10},
	 {type:"arrow_shooter",
	 x: 460, y: 140,
	 direction: 3,
	 attack_speed: 10},
	 {type:"arrow_shooter",
	 x: 460, y: 260,
	 direction: 3,
	 attack_speed: 10},
];
var level_0_1_triggers = [
];

var level_0_2 = [
	// Border
	[{a:{x:0,y:0}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}}],
	
	//Walls
	[{a:{x:440,y:0}, b:{x:440,y:480}},
	{a:{x:440,y:480}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:440,y:0}}],
	[{a:{x:200,y:0}, b:{x:200,y:480}},
	{a:{x:200,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}},
	{a:{x:0,y:0}, b:{x:200,y:0}}],
	[{a:{x:240,y:320}, b:{x:240,y:340}},
	{a:{x:240,y:340}, b:{x:400,y:340}},
	{a:{x:400,y:340}, b:{x:400,y:320}},
	{a:{x:400,y:320}, b:{x:240,y:320}}],
];
var level_0_2_units = [
];
var level_0_2_triggers = [
];

var level_0_3 = [
	// Border
	[{a:{x:0,y:0}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}}],
	
	//Walls
	[{a:{x:0,y:0}, b:{x:240,y:0}},
	{a:{x:240,y:0}, b:{x:240, y:200}},
	{a:{x:240,y:200}, b:{x:0,y:200}},
	{a:{x:0,y:200}, b:{x:0,y:0}}],
	[{a:{x:640,y:0}, b:{x:400,y:0}},
	{a:{x:400,y:0}, b:{x:400, y:200}},
	{a:{x:400,y:200}, b:{x:640,y:200}},
	{a:{x:640,y:200}, b:{x:640,y:0}}],
	[{a:{x:440,y:480}, b:{x:440,y:300}},
	{a:{x:440,y:300}, b:{x:640, y:300}},
	{a:{x:640,y:300}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:440,y:480}}],
	[{a:{x:200,y:480}, b:{x:200,y:300}},
	{a:{x:200,y:300}, b:{x:0, y:300}},
	{a:{x:0,y:300}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:200,y:480}}],
];
var level_0_3_units = [
	{type:"spikes",
	 x: 10, y: 200, length: 40, height: 100,
	 IMAGE_SRC: "/pictures/spikes_level_0_3.png"
	},
];
var level_0_3_triggers = [
	{x: 10, y: 230, radius: 45, func: function(){
		game.units[0][3][0].triggered = true;
		game.units[0][3][0].start();
	}},
	{x: 10, y: 230, radius: 40, func: function(){
		game.player.dead = true;
	}},
	{x: 10, y: 270, radius: 45, func: function(){
		game.units[0][3][0].triggered = true;
		game.units[0][3][0].start();
	}},
	{x: 10, y: 270, radius: 40, func: function(){
		game.player.dead = true;
	}}
];

var level_0_4 = [
	// Border
	[{a:{x:0,y:0}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}}],
	
	//Walls
	[{a:{x:0,y:0}, b:{x:160,y:0}},
	{a:{x:160,y:0}, b:{x:160,y:80}},
	{a:{x:160,y:80}, b:{x:500,y:80}},
	{a:{x:500,y:80}, b:{x:500,y:120}},
	{a:{x:500,y:120}, b:{x:340,y:120}},
	{a:{x:340,y:120}, b:{x:340,y:90}},
	{a:{x:340,y:90}, b:{x:280,y:90}},
	{a:{x:280,y:90}, b:{x:280,y:120}},
	{a:{x:280,y:120}, b:{x:20,y:120}},
	{a:{x:20,y:120}, b:{x:20,y:160}},
	{a:{x:20,y:160}, b:{x:60,y:160}},
	{a:{x:60,y:160}, b:{x:60,y:300}},
	{a:{x:60,y:300}, b:{x:280,y:300}},
	{a:{x:280,y:300}, b:{x:280,y:340}},
	{a:{x:280,y:340}, b:{x:340,y:340}},
	{a:{x:340,y:340}, b:{x:340,y:300}},
	{a:{x:340,y:300}, b:{x:500,y:300}},
	{a:{x:500,y:300}, b:{x:500,y:350}},
	{a:{x:500,y:350}, b:{x:240,y:350}},
	{a:{x:240,y:350}, b:{x:240,y:480}},
	{a:{x:240,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}}],	

	[{a:{x:220,y:0}, b:{x:220,y:40}},
	{a:{x:220,y:40}, b:{x:560,y:40}},
	{a:{x:560,y:40}, b:{x:560,y:160}},
	{a:{x:560,y:160}, b:{x:440,y:160}},
	{a:{x:440,y:160}, b:{x:440,y:260}},
	{a:{x:440,y:260}, b:{x:600,y:260}},
	{a:{x:600,y:260}, b:{x:600,y:300}},
	{a:{x:600,y:300}, b:{x:560,y:300}},
	{a:{x:560,y:300}, b:{x:560,y:400}},
	{a:{x:560,y:400}, b:{x:400,y:400}},
	{a:{x:400,y:400}, b:{x:400,y:480}},
	{a:{x:400,y:480}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:220,y:0}}],

	[{a:{x:420,y:260}, b:{x:420,y:160}},
	{a:{x:420,y:160}, b:{x:380,y:160}},
	{a:{x:380,y:160}, b:{x:380,y:260}},
	{a:{x:380,y:260}, b:{x:420,y:260}}],

	[{a:{x:360,y:260}, b:{x:360,y:160}},
	{a:{x:360,y:160}, b:{x:320,y:160}},
	{a:{x:320,y:160}, b:{x:320,y:260}},
	{a:{x:320,y:260}, b:{x:360,y:260}}],

	[{a:{x:300,y:260}, b:{x:300,y:160}},
	{a:{x:300,y:160}, b:{x:260,y:160}},
	{a:{x:260,y:160}, b:{x:260,y:260}},
	{a:{x:260,y:260}, b:{x:300,y:260}}],

	[{a:{x:240,y:260}, b:{x:240,y:160}},
	{a:{x:240,y:160}, b:{x:200,y:160}},
	{a:{x:200,y:160}, b:{x:200,y:260}},
	{a:{x:200,y:260}, b:{x:240,y:260}}],

	[{a:{x:180,y:260}, b:{x:180,y:160}},
	{a:{x:180,y:160}, b:{x:140,y:160}},
	{a:{x:140,y:160}, b:{x:140,y:260}},
	{a:{x:140,y:260}, b:{x:180,y:260}}],
];
var level_0_4_units = [
	{type:"arrow_shooter",
	 x: 40, y: 140,
	 direction: 1,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 580, y: 280,
	 direction: 3,
	 attack_speed: 24},
	 {type:"item",
	 x: 190, y: 50,
	 item_id: 0}
];
var level_0_4_triggers = [
	{x: 190, y: 50, radius:12, func: function(){
		game.units[0][4][2].triggered = true;
		game.player.left_hand = 1;
		game.player.draw_hands();
	}},
];

var level_0_5 = [
	// Border
	[{a:{x:0,y:0}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}}],
	
	//Walls
	[{a:{x:600,y:440}, b:{x:600,y:40}},
	{a:{x:600,y:40}, b:{x:40,y:40}},
	{a:{x:40,y:40}, b:{x:40,y:440}},
	{a:{x:40,y:440}, b:{x:160,y:440}},
	{a:{x:160,y:440}, b:{x:160,y:480}},
	{a:{x:160,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}},
	{a:{x:0,y:0}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:220,y:480}},
	{a:{x:220,y:480}, b:{x:220,y:440}},
	{a:{x:220,y:440}, b:{x:600,y:440}}],

	[{a:{x:80,y:80}, b:{x:160,y:80}},
	{a:{x:160,y:80}, b:{x:160,y:160}},
	{a:{x:160,y:160}, b:{x:80,y:160}},
	{a:{x:80,y:160}, b:{x:80,y:80}}],

	[{a:{x:200,y:200}, b:{x:240,y:200}},
	{a:{x:240,y:200}, b:{x:240,y:240}},
	{a:{x:240,y:240}, b:{x:200,y:240}},
	{a:{x:200,y:240}, b:{x:200,y:200}}],

	[{a:{x:200,y:280}, b:{x:240,y:280}},
	{a:{x:240,y:280}, b:{x:240,y:320}},
	{a:{x:240,y:320}, b:{x:200,y:320}},
	{a:{x:200,y:320}, b:{x:200,y:280}}],

	[{a:{x:200,y:360}, b:{x:240,y:360}},
	{a:{x:240,y:360}, b:{x:240,y:400}},
	{a:{x:240,y:400}, b:{x:200,y:400}},
	{a:{x:200,y:400}, b:{x:200,y:360}}],

	[{a:{x:280,y:200}, b:{x:320,y:200}},
	{a:{x:320,y:200}, b:{x:320,y:240}},
	{a:{x:320,y:240}, b:{x:280,y:240}},
	{a:{x:280,y:240}, b:{x:280,y:200}}],

	[{a:{x:280,y:280}, b:{x:320,y:280}},
	{a:{x:320,y:280}, b:{x:320,y:320}},
	{a:{x:320,y:320}, b:{x:280,y:320}},
	{a:{x:280,y:320}, b:{x:280,y:280}}],

	[{a:{x:280,y:360}, b:{x:320,y:360}},
	{a:{x:320,y:360}, b:{x:320,y:400}},
	{a:{x:320,y:400}, b:{x:280,y:400}},
	{a:{x:280,y:400}, b:{x:280,y:360}}],

	[{a:{x:360,y:200}, b:{x:400,y:200}},
	{a:{x:400,y:200}, b:{x:400,y:240}},
	{a:{x:400,y:240}, b:{x:360,y:240}},
	{a:{x:360,y:240}, b:{x:360,y:200}}],

	[{a:{x:360,y:280}, b:{x:400,y:280}},
	{a:{x:400,y:280}, b:{x:400,y:320}},
	{a:{x:400,y:320}, b:{x:360,y:320}},
	{a:{x:360,y:320}, b:{x:360,y:280}}],

	[{a:{x:360,y:360}, b:{x:400,y:360}},
	{a:{x:400,y:360}, b:{x:400,y:400}},
	{a:{x:400,y:400}, b:{x:360,y:400}},
	{a:{x:360,y:400}, b:{x:360,y:360}}],

	[{a:{x:440,y:200}, b:{x:480,y:200}},
	{a:{x:480,y:200}, b:{x:480,y:240}},
	{a:{x:480,y:240}, b:{x:440,y:240}},
	{a:{x:440,y:240}, b:{x:440,y:200}}],

	[{a:{x:440,y:280}, b:{x:480,y:280}},
	{a:{x:480,y:280}, b:{x:480,y:320}},
	{a:{x:480,y:320}, b:{x:440,y:320}},
	{a:{x:440,y:320}, b:{x:440,y:280}}],

	[{a:{x:440,y:360}, b:{x:480,y:360}},
	{a:{x:480,y:360}, b:{x:480,y:400}},
	{a:{x:480,y:400}, b:{x:440,y:400}},
	{a:{x:440,y:400}, b:{x:440,y:360}}],
];
var level_0_5_units = [
	 {type:"item",
	 x: 550, y: 60,
	 item_id: 1},
	 {type:"arrow_shooter",
	 x: 60, y: 180,
	 direction: 1,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 60, y: 260,
	 direction: 1,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 60, y: 340,
	 direction: 1,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 60, y: 420,
	 direction: 1,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 180, y: 60,
	 direction: 0,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 260, y: 60,
	 direction: 0,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 340, y: 60,
	 direction: 0,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 420, y: 60,
	 direction: 0,
	 attack_speed: 24},
	 {type:"arrow_shooter",
	 x: 500, y: 60,
	 direction: 0,
	 attack_speed: 24},
];
var level_0_5_triggers = [
	{x: 550, y: 60, radius:12, func: function(){
		game.units[0][5][0].triggered = true;
		game.player.right_hand = 1;
		game.player.draw_hands();
	}},
];

var level_1_3 = [
	// Border
	[{a:{x:0,y:0}, b:{x:640,y:0}},
	{a:{x:640,y:0}, b:{x:640,y:480}},
	{a:{x:640,y:480}, b:{x:0,y:480}},
	{a:{x:0,y:480}, b:{x:0,y:0}}],
	
	//Walls
];
var level_1_3_units = [
];
var level_1_3_triggers = [
];
