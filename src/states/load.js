export default class Load extends Phaser.State {

	preload () {
		this.config = {
			game: this.game,
			x: this.game.world.centerX - 100,
			y: this.game.world.centerY,
			text: 'Loading...',
			style: 
			{
				font : '45px Arial',
				fill : '#00ffff',
				align: 'center'
			}
		}
	}

	create () {
		const { 
			game, 			// Game instance
			x, 					// Canvas x coord
			y, 					// Canvas y coord
			text, 			// Display text
			style 			// CSS object
		} = this.config;

		this.world.addChild(new Phaser.Text(game, x, y, text, style));

		setTimeout(() => {
			this.game.state.start
			(
				'Menu', 	// State name
				true, 		// Clear world
				true, 		// Clear cache
				{}				// Empty param
			);
		}, 350);
	}

}
