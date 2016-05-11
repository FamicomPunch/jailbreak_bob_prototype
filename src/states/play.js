import * as util from 'util/shortcut';

export default class Play extends Phaser.State {

    init (config) {
        console.log(config);
    }

	preload () {
		this.load.image('star', 'assets/star.png');
		this.load.image('player', '/assets/player.png');
        this.load.image('ground', '/assets/platform.png');
        this.load.image('sky', '/assets/sky.png');
        this.load.spritesheet('dude', '/assets/dude.png', 32, 48);
	}

	create () {
        this.add.sprite(0, 0, 'sky');

        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        let ground = this.platforms.create(0, this.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

//This is a test comment
        console.log(ground);

	}
}
