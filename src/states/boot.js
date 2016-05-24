export default class Boot extends Phaser.State {

	create () {
		this.game.cursors = this.input.keyboard.createCursorKeys();
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.state.start('Load', false, false, {});
	}

}
