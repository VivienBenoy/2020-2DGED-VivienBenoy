class SpriteData {

  //#region Sprite Data
  static RUNNER_START_POSITION = new Vector2(500, 650);
  static RUNNER_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space, Keys.Enter,Keys.P];
  static RUNNER_RUN_VELOCITY = 0.3;
  static RUNNER_JUMP_VELOCITY = 0.8;
  
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
        fps: 20,
        maxLoopCount: -1, 
        startCellIndex: 0,
        endCellIndex: 8,
        boundingBoxDimensions: new Vector2(61, 59), 
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
    spriteSheet: document.getElementById("ballCrusher_coins"),
    alpha: 1,
    actorType: ActorType.Pickup,
    takes: {  
      "coins" :  {
        fps: 5,
        maxLoopCount: -1, 
        startCellIndex: 0,
        endCellIndex: 4,
        boundingBoxDimensions: new Vector2(25, 27), 
        cellData: [
          new Rect(1, 53, 35, 35),
          new Rect(39, 53, 23, 27),
          new Rect(80, 53, 15, 27),
          new Rect(119, 53, 7, 28),
        

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
      new Vector2(1056, 720),


      new Vector2(0,672),
      new Vector2(0,624),
      new Vector2(0,576),

      new Vector2(976,672),
      new Vector2(976,624),
      new Vector2(976,576),

      //starting point
      new Vector2(75,624),
      new Vector2(123,624),
      new Vector2(171,624),
      new Vector2(219,624),

      //2nd level
      new Vector2(250,480),
      new Vector2(298,480),
      new Vector2(346,480),
      new Vector2(394,480),
      new Vector2(442,480),
      new Vector2(490,480),
      new Vector2(538,480),

      //3rd level
      new Vector2(590,400),
      new Vector2(638,400),
      new Vector2(686,400),
      new Vector2(734,400),
      new Vector2(782,400),
      new Vector2(830,400),
      new Vector2(878,400),
      new Vector2(926,400),
      new Vector2(974,400),
      new Vector2(974,352),
      new Vector2(974,304),

      //4th level
     
      new Vector2(832,250),
      new Vector2(784,250),
      new Vector2(784,202),
      new Vector2(736,202),
      new Vector2(736,154),
      new Vector2(688,154),
      new Vector2(640,154),
      new Vector2(592,154),
      new Vector2(544,154),
      new Vector2(544,106),
      new Vector2(496,106),
      new Vector2(496,154),
      new Vector2(496,202),
      new Vector2(496,202),
      new Vector2(448,202),
      new Vector2(400,202),
      new Vector2(352,202),
      new Vector2(304,202),
      new Vector2(256,202),
      new Vector2(208,202),
      new Vector2(160,202),
      new Vector2(20,180),


 
    ]
  });
  static SPIKE_DATA = Object.freeze({
    id: "spike",
    spriteSheet: document.getElementById("ballCrusher_spike"),
    sourcePosition: new Vector2(12, 5),
    sourceDimensions: new Vector2(43, 38),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    alpha: 1,
    actorType: ActorType.Enemy,
    translationArray: [
      new Vector2(688, 360),
      new Vector2(0,540),
      new Vector2(397,445),
      new Vector2(452,165),
      new Vector2(405,165),


 
    ]
  });

  }