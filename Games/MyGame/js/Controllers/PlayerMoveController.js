class PlayerMoveController{

    constructor(moveKeys, runVelocity, jumpVelocity) {
        this.moveKeys = moveKeys;
        this.runVelocity = runVelocity;
        this.jumpVelocity = jumpVelocity;
      }
    
      //#region Core Methods - doesnt need to change
      Execute(gameTime, parent) {
        this.HandleInput(gameTime, parent);
        this.ApplyForces(parent);
        this.CheckCollisions(parent);
        this.ApplyInput(parent);
      }
    
      HandleInput(gameTime, parent) {
        this.HandleMove(gameTime, parent);
        this.HandleJump(gameTime, parent);
        this.HandleMouse(gameTime, parent);
        this.HandleKeyboard(gameTime, parent);
      }
    
      ApplyForces(parent) {
        parent.Body.ApplyGravity();
        parent.Body.ApplyFriction();
      }
    
      CheckCollisions(parent) {
        parent.Body.IsOnGround = false;
        this.HandlePlatformCollision(parent);
        this.HandleEnemyCollision(parent);
        this.HandlePickupCollision(parent);
      }
    
      ApplyInput(parent) {
        //if on the ground then dont apply any Y velocity
        if (parent.Body.IsOnGround) {
          parent.Body.SetVelocityY(0);
        }
    
        //if we have small left over velocity values then set to zero
        if (Math.abs(parent.Body.velocityX) <= Body.MIN_SPEED)
          parent.Body.velocityX = 0;
        if (Math.abs(parent.Body.velocityY) <= Body.MIN_SPEED)
          parent.Body.velocityY = 0;
    
        //apply velocity to (x,y) of the parent's translation
        parent.Transform2D.TranslateBy(
          new Vector2(parent.Body.velocityX, parent.Body.velocityY)
        );
    
        //update the bounding surface when the player moves
        parent.collisionPrimitive.Move(
          parent.Body.velocityX,
          parent.Body.velocityY
        );
      }
    
      HandlePlatformCollision(parent) {
        let sprites = objectManager.Find(ActorType.Platform);
    
        if (sprites) {
          for (let i = 0; i < sprites.length; i++) {
            let sprite = sprites[i];
    
            let collisionLocationType = Collision.GetIntersectsLocation(
              parent,
              sprite
            );
    
            if (
              collisionLocationType === CollisionLocationType.Left ||
              collisionLocationType === CollisionLocationType.Right
            ) {
              parent.Body.SetVelocityX(0);
            } else if (collisionLocationType === CollisionLocationType.Bottom) {
              parent.Body.IsOnGround = true;
              parent.Body.IsJumping = false;
            } else if (collisionLocationType === CollisionLocationType.Top) {
              parent.Body.SetVelocityY(1);
            }
          }
        }
      }
   
    
      /**
       * Add code in the method to listen for mouse input and do something in the game
       *
       * @param {*} gameTime
       * @param {*} parent
       * @memberof PlayerController
       */
      HandleMouse(gameTime, parent) {}
    
        /**
       * Add code in the method to listen for keyboard input and do something in the game
       *
       * @param {*} gameTime
       * @param {*} parent
       * @memberof PlayerController
       */
      HandleKeyboard(gameTime, parent) {
      
      }
    
      /**
       * 
       *
       * @param {*} gameTime
       * @param {*} parent
       * @memberof PlayerController
       */
      HandleMove(gameTime, parent) {
        //if left or right key pressed and player is on the ground then add/remove move velocity
        if (keyboardManager.IsKeyDown(this.moveKeys[0])) {
          parent.Body.AddVelocityX(-this.runVelocity * gameTime.ElapsedTimeInMs);
          //add your code here...
          parent.Artist.SetTake("run_left");
        } else if (keyboardManager.IsKeyDown(this.moveKeys[1])) {
          parent.Body.AddVelocityX(this.runVelocity * gameTime.ElapsedTimeInMs);
          //add your code here...
          parent.Artist.SetTake("run_right");
        }
      }
    
      /**
       * 
       * code to make player jump
       *
       * @param {*} gameTime
       * @param {*} parent
       * @memberof PlayerController
       */
      HandleJump(gameTime, parent) {
        //if jump key is pressed and player is not jumping and on the ground then jump
        if (
          keyboardManager.IsKeyDown(this.moveKeys[2]) &&
          !parent.Body.IsJumping &&
          parent.Body.IsOnGround
        ) {
          parent.Body.IsJumping = true;
          parent.Body.IsOnGround = false;
          parent.Body.SetVelocityY(-this.jumpVelocity * gameTime.ElapsedTimeInMs);
          soundManager.Play("Jump");
        
        }
      }
    
      /**
       * code to handle collsion with coins and to increase score on pickup
       * 
       * 
       *
       * @param {*} gameTime
       * @param {*} parent
       * @memberof PlayerController
       */
      HandlePickupCollision(parent) {
        let sprites = objectManager.Find(ActorType.Pickup);
    
        if (sprites) {
          for (let i = 0; i < sprites.length; i++) {
            let sprite = sprites[i];
    
            if (Collision.Intersects(parent, sprite)) {
            
              score += 10;
    
              soundManager.Play("coin");
    
              //remove the pickup
              objectManager.Remove(sprite);
            }
          }
        }
      }
    
      /**
       *Checks collision with enemy spikes and reduces number of lives
       *
       * @param {*} parent
       * @memberof PlayerMoveController
       */
      HandleEnemyCollision(parent) {
        let sprites = objectManager.Find(ActorType.Enemy);
    
        if (sprites) {
          for (let i = 0; i < sprites.length; i++) {
            let sprite = sprites[i];
    
            if (Collision.Intersects(parent, sprite)) {
              lives-=1;

              parent.Transform2D.SetTranslation(new Vector2(500,650));
             
              parent.collisionPrimitive = new RectCollisionPrimitive(
              parent.Transform2D,
              0
            );
              
              soundManager.Play("death");
            }
          }
        }

      }
}