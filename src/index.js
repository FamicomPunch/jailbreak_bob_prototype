import Boot from 'states/boot';
import Load from 'states/load';
import Menu from 'states/menu';
import Play from 'states/play';

const defaultConfigs = {
	gameWidth: 1280,
	gameHeight: 1024,
	parent: 'content',
	renderer: Phaser.CANVAS
}

// phuong melody - green pastures

class Game extends Phaser.Game {

	constructor() {
		const { width, height, parent, renderer } = defaultConfigs;

		console.log('calling super with args: ');
		console.log(defaultConfigs);
		
		super
		(
			width, 						// Game width
			height, 					// Game height
			renderer, 				// Render mode
			parent, 					// HTML component
		);

		this.state.add('Boot', Boot, false);
		this.state.add('Load', Load, false);
		this.state.add('Menu', Menu, false);
		this.state.add('Play', Play, false);

		this.state.start('Boot');
	}

}

const game = new Game();
