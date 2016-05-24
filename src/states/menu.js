export default class Menu extends Phaser.State {

preload (){
		
		this.load.image('title', '/assets/bobpage.png');
	}
	
 	create () {

		this.add.button(100, 100, 'title', this.startGame, this);
		
 	}
 
	startGame (){
		
		this.state.start('Play'); 
	}
	
 }