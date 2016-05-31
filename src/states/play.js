import * as util from 'util/shortcut';
import Player from '../objects/player';
import Enemy from '../objects/enemy';
//import QuickTimeEvent from '../objects/qte';

export default class Play extends Phaser.State {

    init (config) {
        //console.log(config);
        this.moveCamera = false;
    }

    preload () {
    }

    create () {
        // start physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;

        // add tilemap
        const map = this.add.tilemap('intro');
        map.addTilesetImage('spritesheet-ground', 'ground');

        // setup ground layer and the player character
        this.backgroundLayer = map.createLayer('background');
        this.backgroundLayer.resizeWorld();
        this.groundLayer = map.createLayer('ground');
        this.enemyLayer = map.createLayer('enemies');
        this.enemyLayer.visible = false;

        // setup the tilemap collision tiles
        const collisionTiles = [];
        this.groundLayer.layer.data.forEach((dataRow) => { // find tiles used in the layer
          dataRow.forEach((tile) => {
            // check if it's a valid tile index and isn't already in the list
            if (tile.index > 0 && collisionTiles.indexOf(tile.index) === -1) {
              collisionTiles.push(tile.index);
            }
          });
        });
        map.setCollision(collisionTiles, true, 'ground');

        this.enemies = this.game.add.group();

        this.enemyLayer.layer.data.forEach((enemies) => {
            enemies.forEach((tile) => {
                //console.log(tile.index);
                if (tile.index === 126 && this.game.difficulty === tile.properties.difficulty) {
                    let enemy = new Enemy(this.game, tile.worldX, tile.worldY, 'redboy', 5, this.enemies, this.player, tile.properties);
                    enemy.addCollision(this.groundLayer);
                }
            });
        });


        this.game.player = new Player(this.game, 0, 515, 'cowboy', 0);
        this.game.player.addCollision(this.groundLayer);
        this.players = this.game.add.group();
        this.players.add(this.game.player);

        /*this.enemies = this.game.add.group();
        this.enemy = new Enemy(this.game, 600, 515, 'redboy', 5, this.enemies, this.player);
        this.enemy.addCollision(this.groundLayer);*/

        this.game.camera.follow(this.game.player);
        //setTimeout(() => { this.moveCamera = true; this.game.camera.follow(null)}, 5000);
    }

    update () {

        if (this.game.player.x > 200 && !this.moveCamera) {
            this.moveCamera = true; this.game.camera.follow(null);
        }
        if (this.moveCamera) this.game.camera.x++;

        this.game.physics.arcade.collide(
            this.players, this.enemies, 
            (obj1, obj2) => {
                console.log('collided!');
                obj2.startQTE();
            }, 
            null, 
            this
        );
    }
}

