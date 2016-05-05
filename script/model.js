'user strict';

var ModelModule = (function() {

  var TAB_SELECTED_EVENT = 'TAB_SELECTED_EVENT';

  var AbstractModel = function() {
    this.listeners = [];
  };


  _.extend(AbstractModel.prototype, {
    addListener: function(listener) {
      this.listeners.push(listener);
    },

    removeListener: function(listener) {
      var index = this.listeners.indexOf(listener);
        if (index !== -1) {
          this.listeners.splice(index, 1);
        }
    },

    notify: function(event) {
      _.each(this.listeners,
                function(listener) {
                  listener.update(event);
                }
                );
    },

    update: function(event) {
      console.log('updating AbstractModel' + event);
    }
  });

  var TabModel = function() {
  	AbstractModel.apply(this, arguments);
	  this.tabNames = [
		  'home',
		  'blog',
		  'aboutme',
      'contact',
      'comment'
	  ];
	  this.currentTab = this.tabNames[0];
  };

  _.extend(TabModel.prototype, AbstractModel.prototype, {
	  getCurrentTab: function() {
  		var self = this;
  		return self.currentTab;
  	},  

  	setCurrentTab: function(tab) {
  		var self = this;
  		self.notify(TAB_SELECTED_EVENT, tab);
  		self.currentTab = tab;
  	},  

  	notify: function(eventType, tabName) {
  		var self = this;
  		_.each(self.listeners, function(listener) {
            listener.update(eventType, tabName);
  		});
  	},  

  	update: function(eventType, tabName) {
  		var self = this;
  		console.log(eventType);
  	}
  });
  
  var GameModel = function() {
    AbstractModel.apply(this, arguments);
    this.width = 38;
    this.height = 30;
    this.score = 0;
    this.grid = [];

    this.snake = [];
    this.snake.push({x:19, y:15});
    this.currentDirection = "up";
    this.snakeLength = 1;

    this.gameSpeed = 0;

    this.gameOver = false;
    
    this.restart();
  };

  _.extend(GameModel.prototype, AbstractModel.prototype, {
    restart: function() {
      var self = this;
      self.score = 0;
      self.snake = [];
      self.snake.push({x:19, y:15});
      self.currentDirection = "up";
      self.snakeLength = 1;  

      self.grid = [];
      
      console.log("restarting");
      console.log(self.width);
      console.log(self.height);
      for(var i = 0; i < self.width; i++) {
        console.log("init grid");
        self.grid.push([]);
        for(var j = 0; j < self.height; j++) {
          self.grid[i][j] = 0;
          //init snake
          if(i == 19 && j == 15) {
            self.grid[i][j] = 1;
          }
        }
      }  

      //init food
      self.newFood();
    },

    getScore: function() {
      var self = this;
      return self.score;
    },

    setScore: function(newScore) {
      var self = this;
      self.score = newScore;
    },

    getGameOver: function() {
      var self = this;
      return self.gameOver;
    },

    setGameOver: function(gameOver) {
      var self = this;
      self.gameOver = gameOver;
    },

    getSingleGrid: function(x, y) {
      var self = this;
      return self.grid[x][y]; 
    },

    setSingleGrid: function(x, y, newValue) {
      var self = this;
      self.grid[x][y] = newValue; 
    },

    insertSnake: function(x, y) {
      var self = this;
      self.snake.unshift({x:x,y:y});
      console.log(self.snake);
    },

    removeSnake: function() {
      var self = this;
      var removedElement = self.snake.pop();
      return removedElement;
    },

    newFood: function() {
      var self = this;
      var foodX = -1;
      var foodY = -1;
 
      while(true) {
        foodX = Math.round(Math.random() * 35);
        foodY = Math.round(Math.random() * 25);
        var gridType = self.grid[foodX][foodY];

        if(gridType == 0) {
          break;
        }
      }

      self.grid[foodX][foodY] = 2;
    },

    notify: function(eventType) {
      console.log("view notify eventType: " + eventType);
      var self = this;
      _.each(self.listeners, function(listener) {
            listener.update(eventType);
      });
    },  

    update: function(eventType) {
      console.log("view update eventType: " + eventType);
      var self = this;
      self.gameSpeed ++;
      var headX = self.snake[0].x;
      var headY = self.snake[0].y;

      if(eventType == "leftkey" && self.currentDirection != "right") {
        self.currentDirection = "left";
      } 
      else if(eventType == "rightkey" && self.currentDirection != "left") {
        self.currentDirection = "right";
      } 
      else if(eventType == "upkey" && self.currentDirection != "down") {
        self.currentDirection = "up";
      } 
      else if(eventType == "downkey" && self.currentDirection != "up") {
        self.currentDirection = "down";
      } 

      if(self.gameSpeed % 5 == 0) {
        switch(self.currentDirection) {
          case "left":
            headX --;
            break;
          case "up":
            headY --;
            break;
          case "right":
            headX ++;
            break;
          case "down":
            headY ++;
            break;
        }  

        console.log("newHeadX: " + headX + " newHeadY: " + headY);  

        console.log("new grid type: " + item);  

        if(0 > headX || headX > self.width - 1  ||
           0 > headY || headY > self.height - 1 ||
          self.getSingleGrid(headX, headY) == 1) {
          var yourscorediv = document.getElementById('yourscore');
          var yourscoretextdiv = document.getElementById('yourscoretext');
          var playagainbut = document.getElementById('playagainbutton');
          var howtoplaybut2 = document.getElementById('howtoplaybutton2');
          var gameoverdiv = document.getElementById('gameover');
          var backbut = document.getElementById('backbutton2');
          var playagaindiv = document.getElementById('playagain');
          var howtoplaydiv = document.getElementById('howtoplay2');
          var canvas = document.getElementById('canvas');


          var isGameOver = self.getGameOver();
          if(!isGameOver) {
            self.setGameOver(true);
            canvas.className = "hidden";
            yourscorediv.className = "normal";
            yourscoretextdiv.className = "normal";
            gameoverdiv.className = "normal";
            howtoplaybut2.className = "normal";
            playagainbut.className = "normal";
            yourscoretextdiv.innerHTML = "Your Socre: " + self.getScore();
          } 

          playagainbut.addEventListener('click', function() {
            $('#canvas').fadeIn('slow');
            gameoverdiv.className = "hidden";
            yourscorediv.className = "hidden";
            yourscoretextdiv.className = "hidden";
            playagainbut.className = "hidden";
            howtoplaybut2.className = "hidden"; 
            canvas.className = "normal";
            self.setGameOver(false); 
            self.restart();
          });

          howtoplaybut2.addEventListener('click', function() {
            var instructions2 = document.getElementById('instructions2');
            $('#instructions2').fadeIn('slow');
            gameoverdiv.className = "hidden";
            yourscoretextdiv.className = "hidden";
            playagaindiv.className = "hidden";
            howtoplaydiv.className = "hidden";
            yourscorediv.className = "hidden";
            instructions2.className = "normal";
          });

          backbut.addEventListener('click', function() {
           $('#playagain').fadeIn('slow');
           $('#howtoplay2').fadeIn('slow');
           yourscorediv.className = "normal";
           yourscoretextdiv.className = "normal";
           gameoverdiv.className = "normal";
           instructions2.className = "hidden";
           playagaindiv.className = "normal";
           howtoplaydiv.className = "normal";
         });
         return;
        }

        var item = self.getSingleGrid(headX, headY);
        if(item == 2) {
            self.newFood();
            self.snakeLength ++;
            self.score += 100;
        }
        else {
          var tail = self.removeSnake();
          console.log("old tailx: " + tail.x + " old taily: " + tail.y);
          self.setSingleGrid(tail.x, tail.y, 0);
        }
   
        self.setSingleGrid(headX, headY, 1);
        self.insertSnake(headX, headY);
        self.notify(eventType);
      }
    }
  });

  return {
  	TAB_SELECTED_EVENT: TAB_SELECTED_EVENT,
  	TabModel: TabModel,
    GameModel: GameModel
  };
})();