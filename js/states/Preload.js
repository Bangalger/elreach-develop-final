var ZPlat = ZPlat || {};

//Cargo algunos assets del juego
ZPlat.PreloadState = {
  preload: function() {
    //Muestro la barra de carga
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    // 28 ancho, 30 alto
    //36, 60 
    //cambien player a character, testeo: se ve mal, pero se ve, esta invertido
    //ahora cambio resoluc: 36 60
    //inverti, achique 31x52
    //achique mas 28x48
    //this.load.image('platform', 'assets/images/platform.png');
    this.load.image('goal', 'assets/images/goal.png');
    //this.load.image('slime', 'assets/images/slime.png');
    this.load.spritesheet('player', 'assets/images/charact-spr.png', 36, 60, 8, 1, 1); 
    //this.load.spritesheet('player', 'assets/images/charact-spr-inv.png', 36, 60, 8, 1, 1); 
    //this.load.spritesheet('fly', 'assets/images/fly_spritesheet.png', 35, 18, 2, 1, 2);    
    
    this.load.image('gameTiles', 'assets/images/tiles_spriteshat.png');    
    this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
	this.load.image('coin', 'assets/images/coin.png');

    
	
  },
  create: function() {
    //Una vez que termina preload, entro a create que llamo a levels.
    this.state.start('Levels');
  }
};