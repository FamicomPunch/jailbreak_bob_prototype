export default class Bounty {
	constructor (game)
	{
		this.game = game;
		var bounty = 0;
		var bountyText;
		var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 100, align: "center", backgroundColor: "#000000" };
		bountyText = this.game.add.text(50, 25, 'bounty', style); //{ fontSize: '32px Arial', fill: '#0000ff' });
		bountyText.anchor.set(0.5);
		bountyText.fixedToCamera = true;
		console.log("fak");
		
	}
	//Creates the number used for the player's bounty and has the code to display it in the top left corner
	
	
	
}