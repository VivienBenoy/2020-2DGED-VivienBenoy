class SpriteData {

  //#region Sprite Data
  static RUNNER_START_POSITION = new Vector2(50, 650);
  static RUNNER_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space, Keys.Enter];
  static RUNNER_RUN_VELOCITY = 0.1;
  static RUNNER_JUMP_VELOCITY = 0.6;
  
  static RUNNER_ANIMATION_DATA = Object.freeze({
    id: "runner_animation_data",
    spriteSheet: document.getElementById("ballCrusher_player"),
    actorType: ActorType.Player,
    alpha: 1,
    takes: {  
      "run_right" :  {       
        fps: 12,
        maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
        startCellIndex: 0,
        endCellIndex: 8,
        boundingBoxDimensions: new Vector2(57, 57), //notice I choose the largest of all the widths taken from the cellData array below
        cellData: [
          new Rect(433, 123, 45, 56),
          new Rect(370, 123, 43, 57),
          new Rect(303, 123, 57, 56),
          new Rect(244, 123, 57, 51),
          new Rect(194, 123, 40, 57),
          new Rect(132, 123, 39, 57),
          new Rect(66, 123, 55, 54),
          new Rect(4, 123, 56, 53)
        
        ]
      },
      "run_left" : {     
        fps: 12,
        maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
        startCellIndex: 0,
        endCellIndex: 8,
        boundingBoxDimensions: new Vector2(61, 59), //notice I choose the largest of all the widths taken from the cellData array below
        cellData: [
          new Rect(420, 62, 47, 57),
          new Rect(365, 62, 46, 59),
          new Rect(299, 62, 61, 56),
          new Rect(239, 62, 58, 49),
          new Rect(184, 62, 48, 58),
          new Rect(129, 62, 41, 57),
          new Rect(59, 62, 55, 55),
          new Rect(1, 62, 54, 53)
      
        ]
      }
    }
  });

  static COLLECTIBLES_ANIMATION_DATA = Object.freeze({
    id: "collectibles_animation_data",
    spriteSheet: document.getElementById("ballCrusher_lives"),
    alpha: 1,
    actorType: ActorType.Pickup,
    takes: {  
      "lives" :  {
        fps: 5,
        maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
        startCellIndex: 0,
        endCellIndex: 4,
        boundingBoxDimensions: new Vector2(46, 50), 
        cellData: [
          new Rect(25, 45, 268, 229),
          new Rect(317, 45, 267, 233),
          new Rect(610, 45, 271, 236)

        ]
      },
  
   
    }
  });

  static BACKGROUND_DATA = [
    {
      id: "background",
      spriteSheet: document.getElementById("ballCrusher_background"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(430, 336),
      translation: new Vector2(0, 0),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      alpha: 1,
      actorType: ActorType.Background,
      layerDepth: 1,
      scrollSpeedMultiplier: 0.2
    }
  ];
  
  static PLATFORM_DATA = Object.freeze({
    id: "platform",
    spriteSheet: document.getElementById("ballCrusher_platform"),
    sourcePosition: new Vector2(0, 112),
    sourceDimensions: new Vector2(48, 48),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    alpha: 1,
    actorType: ActorType.Platform,
    translationArray: [
      //added spaces here so that you can easily see which grouping is which on screen
      new Vector2(0, 720),
      new Vector2(48, 720),
      new Vector2(96, 720),
      new Vector2(144, 720),
      new Vector2(192, 720),
      new Vector2(240, 720),
      new Vector2(288, 720),
      new Vector2(336, 720),
      new Vector2(384, 720),
      new Vector2(432, 720),
      new Vector2(480, 720),
      new Vector2(528, 720),
      new Vector2(576, 720),
      new Vector2(624, 720),
      new Vector2(672, 720),
      new Vector2(720, 720),
      new Vector2(768, 720),
      new Vector2(816, 720),
      new Vector2(864, 720),
      new Vector2(912, 720),
      new Vector2(960, 720),
      new Vector2(1008, 720),
      new Vector2(1056, 720)
 
    ]
  });
  
  
  
  }