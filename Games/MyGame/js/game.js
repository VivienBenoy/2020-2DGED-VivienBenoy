//"use strict"; //throw an exception if a variable is used without being declared

window.addEventListener("load", Start);

/********************************* Game Engine Core Variables & Functions (Do Not Change in Your Game) *********************************/

//#region Core Variables [DO NOT CHANGE]
//get a handle to the canvas
var cvs = document.getElementById("main_canvas");

//get a handle to the 2D context of the canvas
var ctx = cvs.getContext("2d");

//stores elapsed and total game time
var gameTime = null;

//managers
var objectManager = null;
var keyboardManager = null;

//debug
var debugDrawer = null;

//#endregion

//#region Functions

//#region Start & Animate
function Start() {
  //instanticate GameTime
  gameTime = new GameTime();

  //load managers
  LoadManagers();

  //Initialize all assets (sound, textures), load all sprites, load all managers
  Initialize();

  //start Update/Draw cycle i.e. start the game
  
     window.requestAnimationFrame(Animate);
  
 
}

function Animate(now) {
  //update game time
  gameTime.Update(now);

  //update all sprites whose state can change over time
  Update(gameTime);

  //draw all sprite
  Draw(gameTime);

  ;
  //request the next frame to repeat the update/draw cycle
  //pause game if p is pressed
 
    window.requestAnimationFrame(Animate);   
    
  
  
  
  
  
  
}

/**
 * Loads the code managers used by the game (object, keyboard, sound)
 */
function LoadManagers() {
  objectManager = new ObjectManager(ctx, StatusType.Drawn);
  keyboardManager = new KeyboardManager();
  soundManager = new SoundManager(cueArray);
}

//#endregion

//#region Update, Draw & Clear
function Update(gameTime) {
  //call object manager to update all sprites
  objectManager.Update(gameTime);

  //Check for menu, win/lose, sound events
  HandleInput(gameTime);
  
  //update scores on the UI
  UpdateGameState(gameTime);
}

function Draw(gameTime) {
  //if we add a pattern or animate the canvas then we shouldnt clear the background
  ClearCanvas(Color.White);

  //call object manager to draw all sprites
  objectManager.Draw(gameTime);

  if (debugDrawer) debugDrawer.Draw(gameTime);
}

function ClearCanvas(color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cvs.clientWidth, cvs.clientHeight);
  ctx.restore();
}

function LoadDebug(bDebugEnabled) {
  if (bDebugEnabled)
    debugDrawer = new DebugDrawer(
      "shows debug info",
      StatusType.Update | StatusType.Drawn,
      ctx,
      objectManager
    );
}
//#endregion

//#endregion

/********************************* Game-Specific Variables & Functions (Change in Your Game) *********************************/
//#region Game Specific Variables [CHANGE FOR YOUR GAME]
//stores object manager which holds all sprites
var lives = 1;
var score = 0;
var bpause=false;

const cueArray = [
  new AudioCue("background", 0.6, 1, true, 0),
  new AudioCue("coin",1,1,false,1),
  new AudioCue("death",1,0.5,false,1),
  new AudioCue("Winner",1,1,false,1),
  new AudioCue("Loser",1,0.8,false,0)


];
//#endregion

function Initialize() {
  //debug drawer to show bounding rect or circle around collidable sprites
  LoadDebug(true);

  //load sprites
  LoadSprites();
}

function UpdateGameState(gameTime) {

  var scoreElement = document.getElementById("ui_score");
  if (scoreElement) {
    scoreElement.style.display = "block";
    scoreElement.innerHTML = "Score = "+score;
  }
  var livesElement = document.getElementById("ui_lives");
  if (scoreElement) {
    livesElement.style.display = "block";
    livesElement.innerHTML = "Lives = "+lives;
  }
  if(keyboardManager.IsKeyDown(Keys.P))
  {
    objectManager.StatusType=StatusType.Off;
    bpause=true; 
  }
  // if(bpause)
  // {
  //   keyboardManager.IsKeyDown(Keys.R)
  //   {
  //     objectManager.StatusType = StatusType.Drawn | StatusType.Updated;
  //     bpause=false;
  //   }
  // }
  endGame();

}

function endGame(){
  if(score===30 )
  {
    objectManager.StatusType=StatusType.Off;
    document.getElementById("Winner").style.display="block";
    document.getElementById("ui_lives").style.display="none";
    document.getElementById("ui_score").style.display="none";
    soundManager.Play("Winner");
    soundManager.Pause("background");

    document.getElementById("Winner").style.display="block";
  }
  if(lives===0 )
  {
    document.getElementById("ui_lives").style.display="none";
    document.getElementById("ui_score").style.display="none";
    objectManager.StatusType=StatusType.Off;
    document.getElementById("Loser").style.display="block";
    soundManager.Play("Loser");
    soundManager.Pause("background");
    document.getElementById("Loser").style.display="block";
  }

}

/**
 * Use this function to check for keyboard or mouse input and start the game, mute sounds,
 * show/hide UI elements
 *
 * @param {*} gameTime
 */
function HandleInput(gameTime) {
  //game starts if enter key is pressed
  if (keyboardManager.IsKeyDown(Keys.Enter)) {
    StartGame(gameTime);  
    
  }
 

}

function StartGame(gameTime) {
  var livesElement = document.getElementById("ui_lives");
  livesElement.style.display = "block";
  livesElement.innerHTML =  "Lives = "+lives;

  var scoreElement = document.getElementById("ui_score");
  scoreElement.style.display = "block";
  scoreElement.innerHTML = score;

  //Hide "Press Enter"
  document.getElementById("menu_opening").style.display = "none";
  document.getElementById("assets").style.display = "block";
  //unpause game
  objectManager.StatusType = StatusType.Drawn | StatusType.Updated;
  soundManager.Play("background");




}

function LoadSprites() {
  LoadPlayerSprite();
  LoadPickupSprites();
  LoadPlatformSprites();
  LoadBackground();
  LoadSpikeSprites();
  //LoadEnemySprite();


}

function LoadPlayerSprite() {
  //create AnimatedSpriteArtist
  var takeName = "run_right";
  var artist = new AnimatedSpriteArtist(ctx, SpriteData.RUNNER_ANIMATION_DATA);

  //set initial take
  artist.SetTake(takeName);

  //creating the transform
  let transform = new Transform2D(
    SpriteData.RUNNER_START_POSITION,
    0,
    Vector2.One,
    Vector2.Zero,
    artist.GetSingleFrameDimensions("run_right"),
    0
  );

  //making the player sprite a collidable sprite
  let playerSprite = new CollidableSprite(
    "player",
    ActorType.Player,
    StatusType.Updated | StatusType.Drawn,
    transform,
    artist,
    1
  );

  //player details
  playerSprite.Body.MaximumSpeed = 6;
  playerSprite.Body.Friction = FrictionType.Normal;
  playerSprite.Body.Gravity = GravityType.Normal;

  //adding collision  
  playerSprite.collisionPrimitive = new RectCollisionPrimitive(
    playerSprite.Transform2D,
    0
  );

  //attach movememnt to the sprite
  playerSprite.AttachController(
    new PlayerMoveController(
      SpriteData.RUNNER_MOVE_KEYS,
      SpriteData.RUNNER_RUN_VELOCITY,
      SpriteData.RUNNER_JUMP_VELOCITY
    )
  );

  //add to object manager to draw image
  objectManager.Add(playerSprite); //add player sprite
}
function LoadPickupSprites() {
  //location of pickup coins
  let pickTranslationArray = [
    new Vector2(920, 700),
    new Vector2(538,450),
    new Vector2(974,280),

  ];

  //set the take name for the animation - we could change to "gold_glint" easily
  var takeName = "coins";

  //loop through the translation array
  for (var translation of pickTranslationArray) {
    //create an animated artist
    let spriteArtist = new AnimatedSpriteArtist(
      ctx,
      SpriteData.COLLECTIBLES_ANIMATION_DATA
    );

    //set the take
    spriteArtist.SetTake(takeName);

    //retrieve the dimensions of a single frame of the animation for the bounding box
    var frameDimensions = spriteArtist.GetSingleFrameDimensions(takeName);

    //set the origin so that the collision surface is in the center of the sprite
    var origin = Vector2.DivideScalar(frameDimensions, 2);

    //create a transform to position the pickup
    let transform = new Transform2D(
      translation,
      0,
      Vector2.One,
      origin,
      frameDimensions
    );

    //create the sprite and give it type "Pickup"
    let pickupSprite = new Sprite(
      "gold",
      ActorType.Pickup,
      StatusType.Updated | StatusType.Drawn,
      transform,
      spriteArtist,
      1
    );

    // add the collision surface to test for collisions against
    pickupSprite.collisionPrimitive = new CircleCollisionPrimitive(
      pickupSprite.Transform2D,
      15
    );
     
    //add to the object manager
    objectManager.Add(pickupSprite);
  }
}


function LoadPlatformSprites() {
  //access the data
  var platformData = SpriteData.PLATFORM_DATA;

  //create tha artist
  let spriteArtist = new SpriteArtist(
    ctx,
    platformData.spriteSheet,
    platformData.alpha,
    platformData.sourcePosition,
    platformData.sourceDimensions
  );

  //create the transform
  let transform = new Transform2D(
    platformData.translationArray[0],
    platformData.rotation,
    platformData.scale,
    platformData.origin,
    platformData.sourceDimensions
  );
    //code borrowed from platform panic
  //create a single archetypal platform sprite
  let archetypeSprite = new Sprite(
    platformData.id,
    platformData.actorType,
    StatusType.Updated | StatusType.Drawn,
    transform,
    spriteArtist
  );

  //now clone the archetype
  let clone = null;
  for (let i = 0; i < platformData.translationArray.length; i++) {
    clone = archetypeSprite.Clone();
    clone.Transform2D.Translation = platformData.translationArray[i];
    clone.collisionPrimitive = new RectCollisionPrimitive(clone.Transform2D, 0);
    //add to the manager
    objectManager.Add(clone);
  }
}


function LoadSpikeSprites() {
  //access the data
  var spikeData = SpriteData.SPIKE_DATA;

  //create tha artist
  let spriteArtist = new SpriteArtist(
    ctx,
    spikeData.spriteSheet,
    spikeData.alpha,
    spikeData.sourcePosition,
    spikeData.sourceDimensions
  );

  //create the transform
  let transform = new Transform2D(
    spikeData.translationArray[0],
    spikeData.rotation,
    spikeData.scale,
    spikeData.origin,
    spikeData.sourceDimensions
  );
    //code borrowed from platform panic
  //create a single archetypal platform sprite
  let archetypeSprite = new Sprite(
    spikeData.id,
    spikeData.actorType,
    StatusType.Updated | StatusType.Drawn,
    transform,
    spriteArtist
  );

  //now clone the archetype
  let clone = null;
  for (let i = 0; i < spikeData.translationArray.length; i++) {
    clone = archetypeSprite.Clone();
    clone.Transform2D.Translation = spikeData.translationArray[i];
    clone.collisionPrimitive = new RectCollisionPrimitive(clone.Transform2D, 0);
    //add to the manager
    objectManager.Add(clone);
  }
}


function LoadBackground() {
  var backgroundData = SpriteData.BACKGROUND_DATA;

  for (let i = 0; i < backgroundData.length; i++) {
    //create tha artist
    let spriteArtist = new SpriteArtist(
      ctx,
      backgroundData[i].spriteSheet,
      backgroundData[i].alpha,
      backgroundData[i].sourcePosition,
      backgroundData[i].sourceDimensions
    );
    //create the transform
    let transform = new Transform2D(
      backgroundData[i].translation,
      backgroundData[i].rotation,
      backgroundData[i].scale,
      backgroundData[i].origin,
      new Vector2(cvs.clientWidth, cvs.clientHeight)
    );

    //create a sprite and add to the manager
    objectManager.Add(
      new Sprite(
        backgroundData[i].id,
        backgroundData[i].actorType,
        StatusType.Updated | StatusType.Drawn,
        transform,
        spriteArtist,
        backgroundData[i].layerDepth
      )
    );
  }
  

  



}


  