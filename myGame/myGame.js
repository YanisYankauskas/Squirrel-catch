/* global Phaser */
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var platforms;
var player;
var player1;
var cursors;
var stars;
var score = 0;
var scoreText;
//var loseText;
//var score1Text;
var star;
var nut;
var nuts;
var scoreNut = 0;
var gameKey1; 
var gameKey2; 
var gameKey3;
var dkey;
var Dkey;
var ddkey
if (score === -100) {
    player.kill;
}

//function render() {
//
//    game.debug.cameraInfo(game.camera, 32, 32);
//    game.debug.spriteCoords(player, 32, 500);
//
//}

function spawnStar() {
    star = stars.create(Math.random(0) * 800, 0, 'squirrel');
    star.body.gravity.y = 100;
}
setInterval(function() {
    for (var i = 0; i < 3; i++) {
        nut = nuts.create(Math.random(0) * 800, 0, 'nut');
        nut.body.gravity.y = 100;
    }
}, 1555);

setInterval(function() {
    for (var i = 0; i < 2; i++) {
        star = stars.create(Math.random(0) * 800, 0, 'squirrel');
        star.body.gravity.y = 100;
    }
}, 5000);
function dieNut(nut, platforms) {
    nut.kill();
}

function dieStar(star, platforms) {
    star.kill();
}

function collectNut(player, nut) {
    scoreNut++;
    score = score - 5;
    nut.kill();
    for (var i = 0; i <= 1; i++) {
        nut = nuts.create(Math.random(0) * 800, 0, 'nut');
        nut.body.gravity.y = 100;
    }
}
function collectNut1(player1, nut) {
    scoreNut++;
    score = score - 2;
    nut.kill();
    for (var i = 0; i <= 1; i++) {
        nut = nuts.create(Math.random(0) * 800, 0, 'nut');
        nut.body.gravity.y = 100;
    }
}

function collectStar(player, star) {
    var i = 0;
    score++;
    star.kill();
    for (i = 0; i < 3; i++) {
        star = stars.create(Math.random(0) * 800, 0, 'squirrel');
        star.body.gravity.y = 200;
    }

}
function collectStar1(player1, star) {
    var i = 0;
    score++;
    star.kill();
    for (i = 0; i < 3; i++) {
        star = stars.create(Math.random(0) * 800, 0, 'squirrel');
        star.body.gravity.y = 200;
    }

}

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('squirrel', 'assets/squirrel.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 32);
    game.load.image('nut', 'assets/nut.png');
}

function create() {
    game.camera.follow(player);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'star');
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    var ledge = platforms.create(0, 400, 'ground');
    var ledge1 = platforms.create(300, 300, 'ground');
    var ledge2 = platforms.create(600, 400, 'ground');
    ground.body.immovable = true;
    ledge.body.immovable = true;
    ledge1.body.immovable = true;
    ledge2.body.immovable = true;
    player = game.add.sprite(700, game.world.height - 111, 'dude');
    player1 = game.add.sprite(0, game.world.height - 111, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0;
    player.body.gravity.y = 450;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [3, 4], 10, true);
    
    //Player One Keys
    gameKey1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
    gameKey2 = game.input.keyboard.addKey(Phaser.Keyboard.D);
    gameKey3 = game.input.keyboard.addKey(Phaser.Keyboard.W);
    dkey = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    Dkey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    ddkey = game.input.keyboard.addKey(Phaser.Keyboard.K);
    // Player one Code
    game.physics.arcade.enable(player1);
    player1.body.bounce.y = 0;
    player1.body.gravity.y = 450;
    player1.body.collideWorldBounds = true;
    player1.animations.add('left', [0, 1], 10, true);
    player1.animations.add('right', [3, 4], 10, true);
    
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    nuts = game.add.group();
    stars.enableBody = true;
    nuts.enableBody = true;
    for (var i = 0; i < 5; i++) {
        star = stars.create(Math.random(0) * 800, 0, 'squirrel');
        star.body.gravity.y = 10;
    }
    for (var i = 0; i < 2; i++) {
        nut = nuts.create(Math.random(0) * 800, 0, 'nut');
        nut.body.gravity.y = 10;
    }
    for (var i = 0; i < 5; i++)
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
     } */
     var hitPlatform1 = game.physics.arcade.collide(player1, platforms);
     player1.body.velocity.x = 0;

     if (gameKey1.isDown) {
         player1.body.velocity.x = -250;
         player1.animations.play('left');
     }
     else if (gameKey2.isDown) {
         player1.body.velocity.x = 250;
         player1.animations.play('right');
     }
     else {
         player1.animations.stop();
         player1.frame = 2;
     }
      if (gameKey3.isDown && player1.body.touching.down && hitPlatform1) {
          player1.body.velocity.y = -350;
      }
     
     
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -250;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 250;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 2;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
    if (score === 25) {
        for (var i = 0; i < 50; i++) {
            nut = nuts.create(Math.random(0) * 800, 0, 'nut');
            nut.body.gravity.y = 100;
        }
        spawnStar();
    }
    if (score === 50) {
        for (var i = 0; i < 50; i++) {
            nut = nuts.create(Math.random(0) * 800, 0, 'nut');
            nut.body.gravity.y = 100;
        }
        spawnStar();
    }
    if (score === 75) {
        for (var i = 0; i < 50; i++) {
            nut = nuts.create(Math.random(0) * 800, 0, 'nut');
            nut.body.gravity.y = 100;
        }
        spawnStar();
    }if (score === 100) {
        for (var i = 0; i < 50; i++) {
            nut = nuts.create(Math.random(0) * 800, 0, 'nut');
            nut.body.gravity.y = 100;
        }
        spawnStar();
    }if (score === 125) {
        for (var i = 0; i < 50; i++) {
            nut = nuts.create(Math.random(0) * 800, 0, 'nut');
            nut.body.gravity.y = 100;
        }
        spawnStar();
    }if (score === 126) {
        for (var i = 0; i < 50; i++) {
            nut = nuts.create(Math.random(0) * 800, 0, 'nut');
            nut.body.gravity.y = 100;
        }
        spawnStar();
    }
    if (score === 127) {
        for (var i = 0; i < 50; i++) {
            nut = nuts.create(Math.random(0) * 800, 0, 'nut');
            nut.body.gravity.y = 100;
        }
        spawnStar();
    }
    if (score >= 150) {
    setInterval(function() {for (var i = 0; i < 50; i++) {
            nut = nuts.create(Math.random(0) * 800, 0, 'nut');
            nut.body.gravity.y = 100;
        }
        spawnStar();
    }, 3000);
}
if (dkey.isDown && Dkey.isDown && ddkey.isDown){
    nuts.callAll('kill');
}
    game.physics.arcade.overlap(stars, platforms, dieStar, null, this);
    game.physics.arcade.overlap(nuts, platforms, dieNut, null, this);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, nuts, collectNut, null, this);
    game.physics.arcade.overlap(player1, stars, collectStar1, null, this);
    game.physics.arcade.overlap(player1, nuts, collectNut1, null, this);
    scoreText.text = "Squirrels Caught: " + score;
}
