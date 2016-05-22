export default class Boot extends Phaser.State {

	create () {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.cursors = this.input.keyboard.createCursorKeys();
		this.state.start('Load', false, false, {});
	}

}
