export default class Load extends Phaser.State {
	preload () {
		// Load the image assets
    	this.load.image('star', 'assets/sprites/star.png');
        this.load.image('player', '/assets/sprites/player.png');
        this.load.image('sky', '/assets/sprites/sky.png');
        this.load.image('arrow', 'assets/sprites/white_arrow.png');
        this.load.image('ground', 'assets/spritesheets/ground.png');
        this.load.image('background', 'assets/sprites/blue-land.png');

        // Load spritesheets
        this.load.spritesheet('redboy', '/assets/sprites/redboy.png', 128, 128);
        this.load.spritesheet('cowboy', 'assets/sprites/cowboy.png', 128, 128);

        // Load audio
    	this.load.audio('tumbleweed', ['assets/audio/tumbleweedtown.mp3']);
    	
        // Load tilemaps 
        this.load.tilemap('intro', 'assets/tilemaps/intro.json', null, Phaser.Tilemap.TILED_JSON);

	}

    create () {
        this.state.start('Menu');
    }


}
