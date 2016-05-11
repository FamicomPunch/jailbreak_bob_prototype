export default class Menu extends Phaser.State {

	create () {
		this.state.start('Play', false, false, {oi: 'oi!'});
	}

}


