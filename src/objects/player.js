export default class Player extends Phaser.Sprite //(game, x, y, @rotateSpeed) -> super game, x, y, 'bunny'	update: -> @angle += @rotateSpeed
{
	constructor (game, x, y, key, frame) 
	{
		super(game,x,y,key,frame);
		this.game = game;
		this.player = this.game.add.sprite(64, 150, 'cowboy');
		this.game.physics.arcade.enable(this.player);
		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 700;
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('left', [15, 16, 17, 18], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);

		this.cursors = game.input.keyboard.createCursorKeys();
		this.face = 'r';
	}
	
	update () {
		//console.log(this.texture);
		this.player.body.velocity.x = 0;

		if ( this.cursors.left.isDown) {
			this.player.body.velocity.x = -300;
			this.player.animations.play('left');
			this.player.face = 'l';
		}
		else if ( this.cursors.right.isDown ) {
			this.player.body.velocity.x = 300;
			this.player.animations.play('right');
			this.player.face = 'r';
		}
		else {
			this.player.animations.stop();
			this.player.frame = 0;
			if ( this.player.face == 'l' )
				this.player.frame = 14;
		}

		//if ( this.cursors.up.isDown && this.player.body.touching.down )
			//this.player.body.velocity.y = -500;
	}

	pause() {
		this.player.animations.stop();
		this.player.body.velocity.x = 0;
	}

}