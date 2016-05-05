'user strict';

(function(Models, Views) {
   $(document).ready(function() {
     console.log('loading...');
     var tabModel = new Models.TabModel();
     var gameModel = new Models.GameModel();
     console.log(gameModel);
     new Views.TabView(tabModel);
     var gameView = new Views.GameView(gameModel);
     console.log(gameView);


     var startbut = document.getElementById('startgamebutton');
     var howtoplaybut = document.getElementById('howtoplaybutton');
     var backbut = document.getElementById('backbutton');
     var startgamediv = document.getElementById('startgame');
     var howtoplaydiv = document.getElementById('howtoplay');
     var menudiv = document.getElementById('menu');

     startbut.addEventListener('click', function() {
       var game = document.getElementById('canvas');
       $('#canvas').fadeIn('slow');
       startgamediv.className = "hidden";
       howtoplaydiv.className = "hidden";
       game.className = "normal";
       var start = function() {
         gameModel.update();
         gameView.renderGame();

         window.requestAnimationFrame(start, canvas);
       }
       start();
     });

     howtoplaybut.addEventListener('click', function() {
       var instructions = document.getElementById('instructions');
       $('#instructions').fadeIn('slow');
       startgamediv.className = "hidden";
       howtoplaydiv.className = "hidden";
       instructions.className = "normal";
     });

     backbut.addEventListener('click', function() {
       $('#startgame').fadeIn('slow');
       $('#howtoplay').fadeIn('slow');
       instructions.className = "hidden";
       startgamediv.className = "normal";
       howtoplaydiv.className = "normal";
     });
   });
})(ModelModule, ViewModule);
