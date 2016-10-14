var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var platforms;
var player;
//var player1;
var cursors;
var stars;
var score = 0;
var scoreText
var loseText;
//var score1Text;
var ledge;
var ledge1;
var star;

//var gameKey1 = game.input.keyboard.addKey(Phaser.Keyboard.a);
//var gameKey2 = game.input.keyboard.addKey(Phaser.Keyboard.d);
function dieStar(star, platforms) {
    star.kill();
}

function collectStar(player, star) {
    var i = 0
    score++;
    star.kill();
    for (i = 0; i <= 3; i++) {
        star = stars.create(Math.random(0) * 800, 0, 'squirrel');
        star.body.gravity.y = 200;
    }

}

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('squirrel', 'assets/squirrel.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'star');
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    var ledge = platforms.create(0, 400, 'ground');
    var ledge1 = platforms.create(300, 300, 'ground');
    var ledge2 = platforms.create(300, 500, 'ground');
    ground.body.immovable = true;
    ledge.body.immovable = true;
    ledge1.body.immovable = true;
    ledge2.body.immovable = true;
    player = game.add.sprite(0, game.world.height - 111, 'dude');
 //   player1 = game.add.sprite(700, game.world.height - 111, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0;
    player.body.gravity.y = 450;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
//    game.physics.arcade.enable(player1);
   // player1.body.bounce.y = 0;
    //player1.body.gravity.y = 450;
    //player1.body.collideWorldBounds = true;
//    player1.animations.add('left', [0, 1, 2, 3], 10, true);
//    player1.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 5; i++) {
        star = stars.create(Math.random(0) * 800, 0, 'squirrel');
        star.body.gravity.y = 10;
    }
    scoreText = game.add.text(16, 16, 'Squirrels Caught:', {
        fontSize: '32px',
        fill: '#000'
    });


}

function update() {
   /* var starNum = 0;
    game.world.forEach(function(item) {
        console.log(item);
        starNum++;
    })
    if (starNum === 0) {
        loseText = game.add.text(50, 50, 'You Lose!', {
            fontSize: '1000px',
            fill: '#000'
        });
    }

      var gameWon = false;
   if (score === 2 && !gameWon) {
        game.add.text(50, 50, 'You saved all the Squirrels!', {
           fontSize: '1000px',
            fill: '#000'
        });
      gameWon = true;
    } 
    var hitPlatform = game.physics.arcade.collide(player1, platforms);
    player1.body.velocity.x = 0;

    if (gameKey1.isDown) {
        player1.body.velocity.x = -150;
        player1.animations.play('left');
    }
    else if (gameKey2.isDown) {
        player1.body.velocity.x = 150;
        player1.animations.play('right');
    }
    else {
        player1.animations.stop();
        player1.frame = 4;
    }
    if (cursors.up.isDown && player1.body.touching.down && hitPlatform) {
        player1.body.velocity.y = -350;
    }
    
    */
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
    game.physics.arcade.overlap(stars, platforms, dieStar, null, this)
    game.physics.arcade.overlap(player, stars, collectStar, null, this)
    scoreText.text = "Squirrels Caught: " + score;
}
