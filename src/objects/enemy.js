import QuickTimeEvent from '../objects/qte';
export default class Player extends Phaser.Sprite {
	/* Our 'class' constructor, receives the instance
	of game, a position and a start frame, then it calls
	the constructor of the superclass and pass on those
	parameters in order to be initialized properly
	*/
	constructor (game, x, y, key, frame, group, player) {
		super(game, x, y, key, frame);

		// Add sprite instance to game and
		// enable physics for the player
		game.add.existing(this);
    game.physics.arcade.enable(this);

    group.add(this);
    this.group = group;

		// Keyboard input
		this.cursors = game.cursors;

		// Physics 'body' configuration
		this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.immovable = true;
    this.body.collideWorldBounds = true;
		this.collision = [];
		
		// Direction facing
		this.face = 'right';

		// Speed (px/s)
		this.walkSpeed = 300;
		this.jumpSpeed = 500;

		// VERY IMPORTANT: Player states
		// Able to move? (Useful for cutscenes, QTEs, etc.)
		this.movementEnabled = true;
		this.animate = true;
		this.isMoving = false;
		this.enemyQTEplaying = false;
	}

	addCollision(gameObject) {
    this.collision.push(gameObject);
  }
	
	/* Update method is called every frame, and
	its logic is executed in order to alter
	the object state */
	update () { 
		// Collide with objects
		this.collision.forEach((gameObject) => this.game.physics.arcade.collide(this, gameObject));
		if (this.enemyQTEplaying) this.qte.update();

		// Finally, call animation logic
		//this.draw();
	}

	draw () {

	}

	startQTE () {
		if (this.enemyQTEplaying) return;
		this.qte = new QuickTimeEvent(this.game, 5, 5000, () => this.handleQTEWin(), () => {console.log('loss')});
		this.enemyQTEplaying = true;
	}

	handleQTEWin() {
		this.destroy();
		this.group.remove(this);
	}

}