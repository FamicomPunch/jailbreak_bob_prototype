export default class Load extends Phaser.State {
//test
	preload () {
		this.props = {
			game: this.game,
			x: this.game.world.centerX - 100,
			y: this.game.world.centerY,
			text: [
				'Loading...',
				'Loading..',
				'Loading.',
				'Loading',
				'Calibrating',
				'Adjusting some stuff',
				'Putting off fires'
			],
			style: 
			{
				font : '45px Arial',
				fill : '#00ffff',
				align: 'center'
			}
		}

		this.load.image('star', 'assets/sprites/star.png');
    this.load.image('player', '/assets/sprites/player.png');
    this.load.image('sky', '/assets/sprites/sky.png');
    this.load.image('arrow', 'assets/sprites/white_arrow.png');
    this.load.image('ground', 'assets/spritesheets/ground.png');
    this.load.image('background', 'assets/sprites/blue-land.png');

    this.load.spritesheet('redboy', '/assets/sprites/redboy.png', 128, 128);
    this.load.spritesheet('cowboy', 'assets/sprites/cowboy.png', 128, 128);

	this.load.audio('tumbleweed', ['assets/audio/tumbleweedtown.mp3']);
	
    this.load.tilemap('intro', 'assets/tilemaps/intro.json', null, Phaser.Tilemap.TILED_JSON);
	}

	create () {
		const { 
			game, 			// Game instance
			x, 					// Canvas x coord
			y, 					// Canvas y coord
			text, 			// Display text
			style 			// CSS object
		} = this.props;

		this.loadingText = this.world.addChild(new Phaser.Text(game, x, y, text[0], style));
		this.done = false;
		setTimeout(() => this.updateText(), 300);

		setTimeout(() => {
			this.done = true;
			this.game.state.start
			(
				'Menu', 	// State name
				true, 		// Clear world
				false, 		// Clear cache
				{}				// Empty param
			);
		}, 1000);
	}

	updateText () {
		this.loadingText.setText(this.props.text[Math.floor(Math.random()*this.props.text.length)]);
		if (!this.done) setTimeout(() => this.updateText(), 300); 
	}

}
