var ZPlat = ZPlat || {};

var warning_full;
var gameOver = false;
var myWarning = false;



ZPlat.GameState = {

  init: function(level) {    
    //console.log("this"+button.id)
    this.currentLevel = level || 'level1';
    //constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 400;
    this.D_JUMPING_SPEED = 600;
    this.BOUNCING_SPEED = 150;
    this.DASHING_SPEED = 500;


	this.coinText;
	this.totalCoins=0;

    //gravity
    this.game.physics.arcade.gravity.y = 1000;    
    
    //cursor keys to move the player
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.add.plugin(Fabrique.Plugins.InputField);
    


  },
  preload:function(){
    this.game.load.image('warning', 'assets/images/warning.png');

  },
  create: function() {
    //load current level
    var input = this.game.add.inputField(10, 90, {
    font: '18px Arial',
    fill: '#212121',
    fontWeight: 'bold',
    width: 150,
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    placeHolder: 'Password',
});

    this.game.input.mouse.capture = true;
    this.loadLevel(); 
	  this.timerDown();
///////////////////////////////////////////////////////////////////////////////
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
	
	for (i = 0; i < 10; i++) {
		
    this.coin = this.coins.create(i* 180,0, 'coin');
	//this.chest.body.gravity.y = 6;
	//this.chest = this.game.add.sprite(400,50, 'chest');
	//this.game.physics.enable(this.chest, Phaser.Physics.ARCADE);
	//this.chest.body.collideWorldBounds = true;
	//this.chest.enableBody = true;
}	
	this.coinText = this.game.add.text(10, 10, 'Coins: 0/10', { fontSize: '16px', fill: '#fff' });
	this.coinText.fixedToCamera = true;
  this.getWarnings(function(output){
  //alert("Level ID:" + level_id);
      warning_full = output;
    },'warnings');





  //alert(warning_full);
  for(var i=0; i<warning_full.length;i++){
    this.game.add.sprite(warning_full[i]['posX'], warning_full[i]['posY'], 'warning');
  }
  },   
  update: function() {

    console.log("mouseX :" + this.game.input.mousePointer.x);
    console.log("mouseY :" + this.game.input.mousePointer.y);
    $('.div').show();;    
    //collision between the player, enemies and the collision layer
    this.game.physics.arcade.collide(this.player, this.collisionLayer); 
    //this.game.physics.arcade.collide(this.enemies, this.collisionLayer); 
    
    //collision between player and enemies
    //this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
    
    //overlap between player and goal
    //this.game.physics.arcade.overlap(this.player, this.goal, this.changeLevel, null, this);
	
	
	this.game.physics.arcade.collide(this.coins, this.collisionLayer); 
	this.game.physics.arcade.overlap(this.player, this.coins, this.pickCoin, null, this);
    
    //generic platformer behavior (as in Monster Kong)
    this.player.body.velocity.x = 0;

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
      if(this.cursors.down.isDown)
      {
        this.player.body.velocity.x = -this.DASHING_SPEED;
      }
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
      if(this.cursors.down.isDown)
      {
        this.player.body.velocity.x = this.DASHING_SPEED;
      }
    }
    else {
      this.player.animations.stop();
      this.player.frame = 3;
    }

    if((this.cursors.up.isDown /*|| this.player.customParams.mustJump*/) && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;

      if (this.cursors.up.shiftKey)
        {
          this.player.body.velocity.y = -this.D_JUMPING_SPEED;
      }
    }

    
    //kill enemy if it falls off
    if(this.player.bottom == this.game.world.height){
      gameOver = true;
      myWarning = true;
      this.gameOver();
    }
  },
  loadLevel: function(){  
    //create a tilemap object
    this.map = this.add.tilemap(this.currentLevel);
    
    //join the tile images to the json data
    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
    
    //create tile layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');
    
    //send background to the back
    this.game.world.sendToBack(this.backgroundLayer);
    
    //collision layer should be collisionLayer
    this.map.setCollisionBetween(1, 160, true, 'collisionLayer');
    
    //resize the world to fit the layer
    this.collisionLayer.resizeWorld();
    
    /*
    //create the goal
    var goalArr = this.findObjectsByType('goal', this.map, 'objectsLayer');
    this.goal = this.add.sprite(goalArr[0].x, goalArr[0].y, goalArr[0].properties.key);
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.allowGravity = false;
    this.goal.nextLevel = goalArr[0].properties.nextLevel;
    */
    
    //create player
    var playerArr = this.findObjectsByType('player', this.map, 'objectsLayer');
    this.player = this.add.sprite(playerArr[0].x, playerArr[0].y, 'player', 3);
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.player.body.collideWorldBounds = true;

    //follow player with the camera
    this.game.camera.follow(this.player);
    
    //create enemies
    /*
    this.enemies = this.add.group();
    this.createEnemies();
    */
  },
  findObjectsByType: function(targetType, tilemap, layer){
    var result = [];
    
    tilemap.objects[layer].forEach(function(element){
      if(element.properties.type == targetType) {
        element.y -= tilemap.tileHeight;        
        result.push(element);
      }
    }, this);
    
    return result;
  },
  changeLevel: function(player, goal){
    this.game.state.start('Game', true, false);
  },
  //borre goal, luego de player, y goal.nextlevel luego de false.
  /*

  createEnemies: function(){
    var enemyArr = this.findObjectsByType('enemy', this.map, 'objectsLayer');
    var enemy;
    
    enemyArr.forEach(function(element){
      enemy = new ZPlat.Enemy(this.game, element.x, element.y, 'slime', +element.properties.velocity, this.map);
      this.enemies.add(enemy);
    }, this);
  },
  hitEnemy: function(player, enemy){
    if(enemy.body.touching.up){
      enemy.kill();
      player.body.velocity.y = -this.BOUNCING_SPEED;
    }
    else {
      this.gameOver();
    }
  },

  */
  gameOver: function(){
    var scope = this.game;
    $('body').on('click', function(){
      if(gameOver){
         insertWarnings(function(output){
                    alert("I'm In");
                    gameOver=false;
                     scope.state.start('Game', true, false, this.currentLevel);
                    

              },'insert_warnings',event.pageX,event.pageY);       
      }
    });
      
  },
  pickCoin:function(player, coin){
	  this.totalCoins+=1;
	this.coinText.text = 'Coins: ' + this.totalCoins +'/10';
	  coin.kill();
  },
 timerDown:function(){ 
 
 	this.timer=60;
	this.timerText;
	this.timerText = this.game.add.text(1200, 10, 'Tiempo: ', { fontSize: '16px', fill: '#fff' });
	this.timerText.fixedToCamera = true;
	
 setInterval(function(){	  
	if(this.timer>0){
		this.timer -= 1;
		this.timerText.text = 'Tiempo: ' + this.timer;
	} else {
		//this.gameOver();
		//gameOverText.fixedToCamera = true;
	}
	},1000);
	
 },


getWarnings:function(handleData,request){
    $.ajax({
    url:"http://localhost/elreach-develop/php/classes/index.php",
    type: 'POST',
    async: false,
    data: {consulta: request, team_id: team_id, level_id: level_id},  
    success:function(data) {
      handleData(jQuery.parseJSON(data));
    }
  });
}

};

function insertWarnings(handleData,request,posX,posY){
    $.ajax({
    url:"http://localhost/elreach-develop/php/classes/index.php",
    type: 'POST',
    async: false,
    data: {consulta: request, posX: posX, posY: posY, tile:1, team_id:team_id, level_id:level_id},  
    success:function(data) {
      handleData(jQuery.parseJSON(data));

    }
  });
}

