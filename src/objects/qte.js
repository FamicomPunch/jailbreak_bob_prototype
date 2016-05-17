export default class QTESystem {
	constructor (game) {
		this.game = game;

		this.combo;
		this.comboImages;
		this.curCursors = {"up":false,"down":false,"left":false,"right":false};
		this.curBtnInCombo = 0;
		this.buttonsNum;
		this.curTimeBox;
		this.timeLeft;
		this.timeGiven = 0;
	}

	createQTE (difficulty) {
		this.curCursors = {"up":false,"down":false,"left":false,"right":false};
		this.comboImages = this.game.add.group();

		//combo.scale = new PIXI.Point(0.05,0.05);

		let BUTTSCALEX = 0.05;
		let BUTTSCALEY = 0.05;
		let button;

		this.buttonsNum = this.numOfButtons(difficulty);
		this.timeGiven = this.setTimer(difficulty);
		this.timeLeft = this.timeGiven;
		this.combo = this.createRandomCombo(this.buttonsNum);

		let temp = this.game.add.sprite(0,0,'arrow');
		temp.scale.setTo(BUTTSCALEX, BUTTSCALEY);
		let buttonWidth = temp.width+3;
		temp.destroy(true);
		let initButtonX = this.game.stage.width/2-((this.buttonsNum-1)*buttonWidth)/2;

		for ( let i = 0; i< this.buttonsNum; i++ ) {
			button = this.comboImages.create(initButtonX+(buttonWidth*i), this.game.stage.height/2-50, 'arrow');
			button.scale.setTo(BUTTSCALEX, BUTTSCALEY);
			button.anchor.setTo(0.5,0.5);
			button.angle = 90*this.combo[i];
		}

		//this.game.add.sprite(0,0,'arrow');
		const TIME_BOX_WIDTH = 300;
		this.curTimeBox = this.game.add.graphics(this.game.stage.width/2-TIME_BOX_WIDTH/2,this.game.stage.height/2+50);
		this.curTimeBox.beginFill(0xFFFFFF);
		this.curTimeBox.drawRect(0,0,TIME_BOX_WIDTH,30);

		let timeBox = this.game.add.graphics(this.game.stage.width/2-TIME_BOX_WIDTH/2,this.game.stage.height/2+50);
		timeBox.lineStyle(6, 0x000000, 1);
    timeBox.drawRect(-3, -3, TIME_BOX_WIDTH+6, 36);
	}

	createRandomCombo (num) {
		let tempCombo = [];
		let temp;
		for ( let i=0; i<num; i++ ) {
			tempCombo.push(Math.floor(Math.random()*4));
		}

		//alert(tempCombo);
		return tempCombo;
	}

	numOfButtons (difficulty) {
		switch(difficulty) {
			case 1:
			case 2:
			case 3:
				return 3;
			case 4:
			case 5:
				return 4;
			case 6:
			case 7:
				return 5;
			case 8:
			case 9:
				return 6;
			default:
				return 7;
		}
	}

	buttonCheck () {
		let cursors = this.game.input.keyboard.createCursorKeys();

		if (cursors.left.isDown && this.curCursors.left == false ) {
			this.curCursors.left = true;
			//comboImages[0].tint = "Green";
			if ( this.comboImages.getChildAt(this.curBtnInCombo).angle == 270 || this.comboImages.getChildAt(this.curBtnInCombo).angle == -90 ) {
				this.comboImages.getChildAt(this.curBtnInCombo).tint = 0x00FF00;
				this.curBtnInCombo++;

			}
			else {
				this.curBtnInCombo = 0;
				this.clearComboImages();
			}

		}
		else if (cursors.right.isDown && this.curCursors.right == false ) {
			this.curCursors.right = true;
			//comboImages[0].tint = "Green";
			if ( this.comboImages.getChildAt(this.curBtnInCombo).angle == -270 || this.comboImages.getChildAt(this.curBtnInCombo).angle == 90 ) {
				this.comboImages.getChildAt(this.curBtnInCombo).tint = 0x00FF00;
				this.curBtnInCombo++;

			}
			else {
				this.curBtnInCombo = 0;
				this.clearComboImages();
			}

		}
		else if (cursors.up.isDown && this.curCursors.up == false ) {
			this.curCursors.up = true;
			//comboImages[0].tint = "Green";
			if ( this.comboImages.getChildAt(this.curBtnInCombo).angle == 0 || this.comboImages.getChildAt(this.curBtnInCombo).angle == 0 ) {
				this.comboImages.getChildAt(this.curBtnInCombo).tint = 0x00FF00;
				this.curBtnInCombo++;

			}
			else {
				this.curBtnInCombo = 0;
				this.clearComboImages();
			}

		}
		else if (cursors.down.isDown && this.curCursors.down == false ) {
			this.curCursors.down = true;
			//comboImages[0].tint = "Green";
			if ( this.comboImages.getChildAt(this.curBtnInCombo).angle == 180 || this.comboImages.getChildAt(this.curBtnInCombo).angle == -180 ) {
				this.comboImages.getChildAt(this.curBtnInCombo).tint = 0x00FF00;
				this.curBtnInCombo++;

			}
			else {
				this.curBtnInCombo = 0;
				this.clearComboImages();
			}

		}


		if ( !cursors.left.isDown ) 
			this.curCursors.left = false;
		if ( !cursors.right.isDown ) 
			this.curCursors.right = false;
		if ( !cursors.up.isDown ) 
			this.curCursors.up = false;
		if ( !cursors.down.isDown ) 
			this.curCursors.down = false;

		if ( this.timeLeft > 0 ) {
			this.timeLeft-=this.game.time.elapsedMS;
			if ( this.timeLeft<0) {
				this.timeLeft = 0;


			}
		}

		this.curTimeBox.scale.x = this.timeLeft/this.timeGiven;
	}

	clearComboImages () {
		for (let i = 0; i< this.buttonsNum; i++ ) {
			this.comboImages.getChildAt(i).tint =  0xFFFFFF;
		}

	}

	setTimer( difficulty ) {
		return ((9-Math.round(difficulty/2))*1000+1);
	}

}
