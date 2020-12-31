class SpriteData {

  //#region Sprite Data
  static RUNNER_START_POSITION = new Vector2(100, 575);
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
          new Rect(4, 123, 56, 53),
        
        ]
      },
      "run_left" : {     
        fps: 12,
        maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
        startCellIndex: 0,
        endCellIndex: 8,
        boundingBoxDimensions: new Vector2(49, 54), //notice I choose the largest of all the widths taken from the cellData array below
        cellData: [
          new Rect(420, 62, 47, 57),
          new Rect(365, 62, 46, 59),
          new Rect(299, 62, 61, 56),
          new Rect(239, 62, 58, 49),
          new Rect(184, 62, 48, 58),
          new Rect(129, 62, 41, 57),
          new Rect(59, 62, 55, 55),
          new Rect(1, 62, 54, 53),
      
        ]
      }
    }
  });
  
  
  
  
  
  }