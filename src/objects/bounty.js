export default class Bounty extends Phaser.State {
	
	//Creates the number used for the player's bounty and has the code to display it in the top left corner
	
	//STILL NEEDS TO BE REFERENCED IN THE PLAY STATE. Not sure how to implement that part - Spencer
	create (){
		var bounty = 0;
		var bountyText;
		bountyText = game.add.text(16, 16, '0', { fontSize: '32px', fill: '#000' });
		
	}
	
	
	
}