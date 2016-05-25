export default class Menu extends Phaser.State {

preload (){
		
		this.load.image('title', '/assets/bobpage.png');
	}
	
 	create () {
		//adds BGM track
	var music;
	music = this.game.add.audio('tumbleweed');
	music.play();
		
		//Creates a button over the entire screen to start the game
		this.add.button(100, 100, 'title', this.startGame, this);
		
 	}
 
	startGame (){
		
		this.state.start('Play'); 
	}
	
 }