import * as util from 'util/shortcut';
import QTESystem from '../objects/qte';
import Player from '../objects/player';

export default class Play extends Phaser.State {

    init (config) {
        //console.log(config);
    }

    preload () {
        this.load.image('star', 'assets/star.png');
        this.load.image('player', '/assets/player.png');
        this.load.image('ground', '/assets/platform.png');
        this.load.image('sky', '/assets/sky.png');
        this.load.spritesheet('dude', '/assets/dude.png', 32, 48);
        this.load.image('arrow', 'assets/white_arrow.png');
		this.load.spritesheet('cowboy', 'assets/cowboy.png',128,128);
		
		

        this.qteSystem = new QTESystem(this);
        this.inQTE = true;
    }

    create () {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		

        this.add.sprite(0, 0, 'sky');
		this.player = new Player(this,0,0);
		
        this.qteSystem.createQTE(10);

        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        let ground = this.platforms.create(0, this.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
    }

    update () {
        if (this.inQTE){
            this.qteSystem.buttonCheck();
        }
		else {
			this.player.update();
			this.game.physics.arcade.collide(this.player, this.platforms);
   
		}
    }
}

