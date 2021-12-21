var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImg;
var obstacle, Obs1, Obs2, Obs3, Obs4, Obs5,Obs6;
var bird, birdImg1, birdImg2, bird_stop;
var PLAY = 1, END = 0;
var gameState = PLAY;

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudImg = loadImage ("cloud.png");
    Obs1 = loadImage ("sprites/obstacle1.png");
    Obs2 = loadImage ("sprites/obstacle2.png");
    Obs3 = loadImage ("sprites/obstacle3.png");
    Obs4 = loadImage ("sprites/obstacle4.png");
    Obs5 = loadImage ("sprites/obstacle5.png");
    Obs6 = loadImage ("sprites/obstacle6.png");
    birdImg1 = loadAnimation ("sprites/bird1.png","sprites/bird2.png");
    birdIng2 = loadAnimation ("sprites/bird2.png","sprites/bird1.png");
    bird_stop = loadAnimation ("sprites/bird1.png");
    


}

function setup() {
    createCanvas(600, 200);
    
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
   
    //create a ground sprite
    ground = createSprite(200,175,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    //Creating invisible ground
    invisibleGround = createSprite (200, 190, 400, 10);
    invisibleGround. visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();
}
function draw() {
    background(180);

    if (gameState === PLAY){
     //jump when the space button is pressed
     if (keyDown("space") && trex.y > 150) {
        trex.velocityY = -10;
        }  
        // adding gravity to the Trex
    trex.velocityY = trex.velocityY + 0.8
    // code for the infinite background
    if (ground.x < 0) {
    ground.x = ground.width / 2;
    }
    spawnClouds();
    spawnObstacles();
    flyingBirds();



    }else if (gameState === END) {



    }
   

    //console.log (Math. round (random (30,100) ));
   // console.log ( frameCount);
    
  
    
    // To make sure the Trex doesn't go below the ground
    trex.collide(invisibleGround);
    
   drawSprites ();
}


function spawnClouds () {
    if (frameCount % 60 === 0) {
        cloud = createSprite (600,60,30,10);
        cloud.y = Math.round (random(20,80));
        cloud.addImage (cloudImg);
        cloud.scale = 0.15;
        cloud.velocityX = -3;
        trex.depth = cloud.depth + 1;
       
        cloud.lifetime = 200;
        cloudsGroup.add(cloud);


    }

}
 
function spawnObstacles () {
    if (frameCount % 85 === 0) {
        obstacle = createSprite (600,160,10,10);
        obstacle.velocityX = -4;
        obstacle.scale = 0.4;
        var r = Math.round (random(1,6));
        
        switch (r) {
        case 1: obstacle.addImage (Obs1);
               break;
        case 2: obstacle.addImage (Obs2);
               break;
        case 3: obstacle.addImage (Obs3)
               break;
        case 4: obstacle.addImage (Obs4)
               break;
         case 5: obstacle.addImage (Obs5)
               break;
        case 6: obstacle.addImage (Obs6)
               break;
        default: break;

        }

    obstacle.lifetime = 155;
    obstaclesGroup.add(obstacle);

    }



}

function flyingBirds(){
    if (frameCount % 65 === 0) {
        bird = createSprite (600, 50, 10, 10);
        bird.velocityX = -4;
        bird.scale = 0.2;
        var num = Math.round(random(1,2));

        switch (num) {
    case 1: bird.addAnimation("flying_bird1", birdImg1);
            break;
    case 2: bird.addAnimation("flying_bird1", birdImg2);
            break;
     default: break;    

        }
    bird.y = Math.round(random(25,70));
    bird.depth = trex.depth;
    trex.depth = trex.depth + 1;
    bird.lifetime = 150;


    }


}