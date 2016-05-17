import * as util from 'util/shortcut';
import QTESystem from '../objects/qte';

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
        this.load.image('arrow', 'assets/white_arrow.png');

        this.qteSystem = new QTESystem(this);
        this.inQTE = true;
    }

    create () {
        this.add.sprite(0, 0, 'sky');

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
    }
}

