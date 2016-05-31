export default class Menu extends Phaser.State {

preload (){
		
		this.load.image('title', '/assets/bobpage.png');
	}
	
 	create () {
		let music = this.game.add.audio('tumbleweed');
		music.play();
			
		this.add.button(100, 100, 'title', () => this.state.start('Play'), this);
		
 	}
}
