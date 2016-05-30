export default class Player extends Phaser.Sprite {
	/* Our 'class' constructor, receives the instance
	of game, a position and a start frame, then it calls
	the constructor of the superclass and pass on those
	parameters in order to be initialized properly
	*/
	constructor (game, x, y, key, frame) {
		super(game, x, y, key, frame);

		// Add sprite instance to game and
		// enable physics for the player
		game.add.existing(this);
    game.physics.arcade.enable(this);

    console.log(game.whatever);

		// Keyboard input
		this.cursors = game.cursors;

		// Physics 'body' configuration
		this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
		this.collision = [];

		// Finally, add animations to our player object
		this.animations.add('left', [15, 16, 17, 18], 10, true);
		this.animations.add('right', [5, 6, 7, 8], 10, true);
		
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

		// Call method to take care of player movement separately
		this.handlePlayerMovement();

		// Finally, call animation logic
		this.draw();
	}

	handlePlayerMovement () {
		// If player cannot move, do not perform operations
		if (!this.movementEnabled) return;

		// Deconstruct our object into variables
		// based on each variable name
		const {
			animations,
			body,
			cursors,
			walkSpeed,
			jumpSpeed
		} = this;

		// If no button is pressed at all
		// velocity should be always 0
		// NOTE: no damping applied!
		body.velocity.x = 0;

		// If...else tree deceipting possible
		// player movements. Note this.frame and
		// this.face are the only attributes being
		// referenced directly because they are the
		// only attributes being modified (thus not constant)
		if (cursors.left.isDown) {
			body.velocity.x = -walkSpeed;
			this.face = 'left';
		} 
		else if (cursors.right.isDown) {
			body.velocity.x = walkSpeed;
			this.face = 'right';
		} 

		if ( cursors.up.isDown && this.body.onFloor() ) {
			console.log('jumped');
			this.body.velocity.y = -jumpSpeed;
		}

		// Check velocities to see if something has changed
		this.isMoving = body.velocity.x !== 0;
	}

	draw () {
		// If this isn't supposed to be animated, then skip
		if (!this.animate) return;

		const {
			animations,
			isMoving,
			isJumping,
			face
		} = this;

		//console.log(isJumping);

		if (isMoving) {
			// Detect which direction and display
			// correct animation
			if (face === 'right') animations.play('right');
			else animations.play('left');
		} 
		else {
			animations.stop();
			// Short for if (this.face === 1) this.frame = 14
			// else this.frame = 0
			this.frame = this.face === 1 ? 14 : 0;
		}
	}

	pause () {
		// No need to deconstruct because code
		// is very short here, so repeating 'this'
		// isn't confusing/annoying
		this.animations.stop();
		this.frame = this.face === 1 ? 14 : 0;
		this.body.velocity.x = 0;
		this.movementEnabled = false;
		this.animate = false;
	}

	unpause () {
		console.log('unpause!');
		this.movementEnabled = true;
		this.animate = true;
	}

}
