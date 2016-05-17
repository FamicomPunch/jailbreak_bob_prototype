 export default class Player extends Phaser.Sprite //(game, x, y, @rotateSpeed) -> super game, x, y, 'bunny'	update: -> @angle += @rotateSpeed
{
	constructor (game, x, y, key, frame) 
	{
		super(game,x,y,key,frame);
		this.game = game;
		//this.player = this.game.add.sprite(64, 150, 'cowboy');
		this.game.physics.arcade.enable(this.player);
		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 700;
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('left', [15, 16, 17, 18], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);
	}
	
	update () {
		
	}
}