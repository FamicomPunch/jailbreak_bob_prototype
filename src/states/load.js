export default class Load extends Phaser.State {

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
				true, 		// Clear cache
				{}				// Empty param
			);
		}, 1000);
	}

	updateText () {
		console.log('doing some stuff');
		this.loadingText.setText(this.props.text[Math.floor(Math.random()*this.props.text.length)]);
		if (!this.done) setTimeout(() => this.updateText(), 300); 
	}

}
