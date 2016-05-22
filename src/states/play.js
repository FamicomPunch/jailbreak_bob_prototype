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
        this.inQTE = false;
    }

    create () {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		

        this.add.sprite(0, 0, 'sky');
		this.player = new Player(this.game, 0, 0, 'cowboy');
       
        this.qteBaddieColl = this.add.group();
        this.qteBaddieColl.enableBody = true;

        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        let ground = this.platforms.create(0, this.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        this.cursors = this.input.keyboard.createCursorKeys();


        /*this.qteCollBox = this.add.graphics(600,450);
        this.qteCollBox.lineStyle(6, 0x000000, 1);
        this.qteCollBox.drawRect(-3, -3, 50, 100);
        //this.qteCollBox.alpha = 1;
        */
        let coll = this.qteBaddieColl.create(600,480,'dude');
        coll.body.immovable = true;
        //this.body.immovable = true;


        
    }

    update () {
        if (this.inQTE){
            this.qteSystem.buttonCheck();
            this.game.physics.arcade.collide(this.player, this.platforms);
            if ( this.qteSystem.curBtnInCombo == this.qteSystem.buttonsNum )
                this.qteComplete();
        }
		else {
			this.player.update();
            
			this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);
            this.game.physics.arcade.overlap(this.player, this.qteBaddieColl, this.startQTE, null, this);
            if ( this.cursors.up.isDown && this.player.body.touching.down )
                this.player.body.velocity.y = -500;
            /*
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);
            this.game.physics.arcade.overlap(this.player, this.qteBaddieColl, this.startQTE, null, this);
            if ( this.cursors.up.isDown && this.player.body.touching.down )
                this.player.body.velocity.y = -500;
*/
		}
        
    }

    startQTE ( plyr, box) {
        this.inQTE = true;
        this.qteSystem.createQTE(10);
        this.player.pause();
        console.log("fuck");
        //box.kill();
    }

    qteComplete () {
        setTimeout(() => this.player.unpause(), 100);
        
        this.qteSystem.kill();
        this.qteBaddieColl.getChildAt(0).kill();// NEEDS TO BE FIXED
        this.inQTE = false;

        this.stars = this.add.group();
        this.stars.enableBody = true;

        for ( var i = 0; i<80; i++ ) {
            var star = this.stars.create(i*10,0,'star');
            star.body.gravity.y = 400;
            star.body.bounce.y = 0.6 + Math.random()*0.2;

        }

        


    }
}

