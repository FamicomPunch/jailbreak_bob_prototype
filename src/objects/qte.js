export default class QuickTimeEvent {

	constructor (game, inputs, time, onWin, onLoss) {
		// Game instance
		this.game = game;

		// Initialize sequence
		this.sequenceOptions = [
			{ name: 'up', key: Phaser.KeyCode.UP, rotation: 0 },
			{ name: 'down', key: Phaser.KeyCode.DOWN, rotation: 180, },
			{ name: 'right', key: Phaser.KeyCode.RIGHT, rotation: 90 },
			{ name: 'left', key: Phaser.KeyCode.LEFT, rotation: -90 }
		];

		this.generateRandomSequence(inputs);
	  this.initializeKeys();

		// Time-control variables (in milisseconds)
		this.qteTime = time;
		this.elapsedTime = 0;

		// Loss and win callbacks
		this.onLoss = () => onLoss();
		this.onWin = () => onWin();

		// Execute
		this.playing = true;
		this.finished = false;
		this.currentIndex = 0;
		this.renderQTE();
		this.game.player.pause();
	}

	initializeKeys() {
		this.keys = [];
		this.sequenceOptions.forEach(option => {
			
			this.keys.push( this.game.input.keyboard.addKey(option.key).onDown.add((key) => this.keyPress(key)));

			/*this.keys[option.name] = this.game.input.keyboard.addKey(option.key);
			this.keys[option.name].onDown.add((key) => {
				this.keyPress(key);
			});*/
		});
	}

	keyPress (key) {
		if (this.finished || !this.playing) return;
		let button = this.sequence[this.currentIndex];
		
		if (key.keyCode === this.sequence[this.currentIndex].option.key) {
			this.sequence[this.currentIndex].state = 'pressed';
			this.currentIndex += 1;
		} else {
			
			this.stopQTE('loss');
		}
	}

	generateRandomSequence (inputs) {
		// Initialize variables
		const optionsLenght = this.sequenceOptions.length;
		this.sequence = [];

		// Get a random sequence option from the
		// sequenceOptions array
		for (let i = 0; i < inputs; ++i) {
			this.sequence.push
			(
				{ state: 'not pressed', 
					option: this.sequenceOptions[Math.floor(Math.random()*optionsLenght)],
					sprite: undefined
				}
			);
		}
	}

	stopQTE (state) {

		setTimeout(() => this.game.player.unpause(), 359);

		this.sequence.forEach((button) => {
			button.sprite.tint = (state === 'win' ? 0x00FF00 : 0xFF0000);
		});

		this.playing = false;
		this.finished = true;

		setTimeout(() => {
			this.sequence.forEach((button) => {
				button.sprite.destroy();
			});

			this.curTimeBox.destroy();
			this.timeBox.destroy();
		}, 50);

		if (state === 'win') this.onWin();
		else this.onLoss();
	}

	update () {
		// If QTE isn't playing, do not perform
		// this update routine and just skip
		if (!this.playing) return;

		const {
			sequence,
			currentIndex,
			cursors,
			game
		} = this;

		// Add elapsed time since last frame
		this.elapsedTime += this.game.time.elapsedMS;

		// If timer exceeds our limit for the QTE
		if (this.elapsedTime > this.qteTime) {
			// Player failed to complete QTE, call loss function
			this.stopQTE('loss');

			// And stop QTE
			return;
		} else { 

			let win = true;
			this.sequence.forEach((button) => {
				if (button.state === 'not pressed') win = false;
			});

			if (win) {
				this.stopQTE('win');
			}
		}

		this.draw();
	}

	draw () {
		if (!this.playing) return;

		this.sequence.forEach((sequence, i) => {
			if (sequence.state === 'pressed') sequence.sprite.tint = 0x00FF00;
			else sequence.sprite.tint = 0xFFFFFF;
		});

   	this.curTimeBox.scale.x = (this.qteTime - this.elapsedTime) /this.qteTime;
	}

	renderQTE() {
		const spriteWidth = this.game.cache.getImage('arrow').width;
		const spriteHeight = this.game.cache.getImage('arrow').height;
		const sequenceLength = this.sequence.length;
		const startX = (this.game.camera.width / 2) - (((spriteWidth + 2)/2 ) * sequenceLength);
		const startY = (this.game.camera.height / 2) - ((spriteHeight/2));

		this.sequence.forEach((sequence, i) => {
			sequence.sprite = this.game.add.sprite(startX + ((spriteWidth + 2) * i), startY, 'arrow');
			sequence.sprite.anchor.setTo(0.5, 0.5);
			sequence.sprite.x += spriteWidth/2;
			sequence.sprite.angle = sequence.option.rotation;
			sequence.sprite.fixedToCamera = true;
		});

		console.log(window.outerHeight);

		const TIME_BOX_WIDTH = (spriteWidth + 2) * sequenceLength;
		this.curTimeBox = this.game.add.graphics(this.game.camera.width/2-TIME_BOX_WIDTH/2,startY + spriteHeight);
		this.curTimeBox.beginFill(0xFFFFFF);
		this.curTimeBox.drawRect(0,0,TIME_BOX_WIDTH,30);
		this.curTimeBox.fixedToCamera = true;

		this.timeBox = this.game.add.graphics(this.game.camera.width/2-TIME_BOX_WIDTH/2, startY + spriteHeight);
		this.timeBox.lineStyle(6, 0x000000, 1);
   	this.timeBox.drawRect(-3, -3, TIME_BOX_WIDTH+6, 36);
   	this.timeBox.fixedToCamera = true;
	}

	pause() {
		this.playing = false;
	}

	unpause() {
		if (!this.finished) this.playing = true;
	}

}
