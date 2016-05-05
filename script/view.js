'user strict';

var ViewModule = (function(TabModel, GameModel) {
  var AbstractView = function(model) {
    this.model = model;
    this.model.addListener(this);
  };

  _.extend(AbstractView.prototype, {
    init: function() {
      console.log('init AbstractView');
    }, 

    update: function(eventType, tabName) {
      console.log('update AbstractView ' + event);
    },
  });

  var TabView = function(model) {
  	AbstractView.apply(this, arguments);
    this.init();
  };

  _.extend(TabView.prototype, AbstractView.prototype, {
    init: function() {
      var self = this;
      self.nav_home_tab = document.getElementById('nav-home-tab');
      self.home_div = document.getElementById('home-div');

      self.nav_about_tab = document.getElementById('nav-about-tab');
      self.about_div = document.getElementById('about-div');

      self.nav_blog_tab = document.getElementById('nav-blog-tab');
      self.blog_div = document.getElementById('blog-div');

      self.nav_contact_tab = document.getElementById('nav-contact-tab');
      self.contact_div = document.getElementById('contact-div');

      self.nav_comment_tab = document.getElementById('nav-comment-tab');
      self.comment_div = document.getElementById('comment-div');

      self.posttitle = document.getElementById('posttitle');
      self.first_post_content = document.getElementById('firstpostcontent');
      self.title1 = document.getElementById('title1');

      self.img = document.getElementById('background-img');
      self.video = document.getElementById('video');
      self.welcome = document.getElementById('welcome');

      self.nav_home_tab.addEventListener('click', function() {
        $('#home-div').fadeIn('slow');
        $('#background-img').fadeIn('slow');
        $('#welcome').fadeIn('slow');
        self.img.className = "normal";
        self.welcome.className = "normal"
        self.video.className = "hidden";
        self.model.setCurrentTab('home');
      });

      self.nav_blog_tab.addEventListener('click', function() {
      	$('#blog-div').fadeIn('slow');
        $('#posttitle').fadeIn('slow');
        self.posttitle.className = "normal";
        self.first_post_content.className = "hidden";
        self.model.setCurrentTab('blog');
      });

      self.nav_about_tab.addEventListener('click', function() {
        $('#about-div').fadeIn('slow');
        self.model.setCurrentTab('aboutme');
      });

      self.nav_contact_tab.addEventListener('click', function() {
      	$('#contact-div').fadeIn('slow');
        self.model.setCurrentTab('contact');
      });

      self.nav_comment_tab.addEventListener('click', function() {
      	$('#comment-div').fadeIn('slow');
        self.model.setCurrentTab('comment');
      });

      self.title1.addEventListener('click', function() {
        $('#firstpostcontent').fadeIn('slow');
        self.posttitle.className = "hidden";
        self.first_post_content.className = "normal";
      });

      self.img.addEventListener('click', function() {
        $('#video').fadeIn('slow');
        self.img.className = "hidden";
        self.video.className = "videoclass";
        self.welcome.className = "hidden"
      });
    },

    update: function(eventType, tabName) {
    	var self = this;
      if (eventType === 'TAB_SELECTED_EVENT') {
        switch(tabName) {
        	case 'home':
              self.nav_home_tab.className = 'cbtn active';
              self.nav_about_tab.className = 'cbtn';
              self.nav_blog_tab.className = 'cbtn';
              self.nav_contact_tab.className = 'cbtn';
              self.nav_comment_tab.className = 'cbtn';

              self.home_div.className = 'col-sm-8 col-sm-offset-2';
              self.about_div.className = 'hidden';
              self.blog_div.className = 'hidden';
              self.contact_div.className = 'hidden';
              self.comment_div.className = 'hidden';
        	  break;
        	case 'aboutme':
              self.nav_home_tab.className = 'cbtn';
              self.nav_about_tab.className = 'cbtn active';
              self.nav_blog_tab.className = 'cbtn';
              self.nav_contact_tab.className = 'cbtn';
              self.nav_comment_tab.className = 'cbtn';

              self.home_div.className = 'hidden';
              self.about_div.className = 'col-sm-8 col-sm-offset-2';
              self.blog_div.className = 'hidden';
              self.contact_div.className = 'hidden';
              self.comment_div.className = 'hidden';
        	  break;
        	case 'blog':
              self.nav_home_tab.className = 'cbtn';
              self.nav_about_tab.className = 'cbtn';
              self.nav_blog_tab.className = 'cbtn active';
              self.nav_contact_tab.className = 'cbtn';
              self.nav_comment_tab.className = 'cbtn';

              self.home_div.className = 'hidden';
              self.about_div.className = 'hidden';
              self.blog_div.className = '';
              self.contact_div.className = 'hidden';
              self.comment_div.className = 'hidden';
        	  break;
        	case 'contact':
              self.nav_home_tab.className = 'cbtn';
              self.nav_about_tab.className = 'cbtn';
              self.nav_blog_tab.className = 'cbtn';
              self.nav_contact_tab.className = 'cbtn active';
              self.nav_comment_tab.className = 'cbtn';

              self.home_div.className = 'hidden';
              self.about_div.className = 'hidden';
              self.blog_div.className = 'hidden';
              self.contact_div.className = 'col-sm-8 col-sm-offset-2';
              self.comment_div.className = 'hidden';
        	  break;
        	case 'comment':
              self.nav_home_tab.className = 'cbtn';
              self.nav_about_tab.className = 'cbtn';
              self.nav_blog_tab.className = 'cbtn';
              self.nav_contact_tab.className = 'cbtn';
              self.nav_comment_tab.className = 'cbtn active';

              self.home_div.className = 'hidden';
              self.about_div.className = 'hidden';
              self.blog_div.className = 'hidden';
              self.contact_div.className = 'hidden';
              self.comment_div.className = '';
        	  break;
        }
      }
    }
  });

  var GameView = function(model) {
    AbstractView.apply(this, arguments);
    this.init();
  };
  
  _.extend(GameView.prototype, AbstractView.prototype, {
    init: function() {
      var self = this;
      self.canvas = document.getElementById('canvas');
      self.context = self.canvas.getContext("2d");
      self.pixelWidth = 20;
      self.pixelHeight = 20;
      self.inputState = {};

      document.addEventListener('keydown', function(e) {
        console.log("keydown event");
        self.inputState[e.keyCode] = true;
      });

      document.addEventListener('keyup', function(e) {
        console.log("keyup event");
        self.inputState[e.keyCode] = false;
        switch(e.keyCode) {
          case 37:
            self.model.update("leftkey");
            break;
          case 38:
            self.model.update("upkey");
            break;
          case 39:
            self.model.update("rightkey");
            break;
          case 40:
            self.model.update("downkey");
            break;
        }
      });

      self.renderGame();
    },

    renderGame: function() {
      var self = this;
      var pixelWidth = self.pixelWidth;
      var pixelHeight = self.pixelHeight;
      console.log(self.model);
      for(var x = 0; x < 38; x++) {
        for(var y = 0; y < 30; y++) {
          var state = self.model.getSingleGrid(x,y);
          switch(state) {
            case 0:
              self.context.fillStyle = "#fff";
              break;
            case 1:
              self.context.fillStyle = "#000000";
              break;
            case 2:
              self.context.fillStyle = "#F3CF1B";
              break;
          }
          var coorX = x * pixelWidth;
          var coorY = y * pixelHeight;
          self.context.fillRect(coorX,coorY,pixelWidth,pixelHeight);
        }
      }

      self.context.fillStyle = "#000";
      self.context.font = "15px Arial";
      self.context.fillText("socre: " + self.model.getScore(), 10, 20);
    },

    update: function(eventType) {
      console.log("model update eventType: " + eventType);
      var self = this;
      self.renderGame();
    }
  });

  return {
  	TabView: TabView,
    GameView: GameView
  };

})(ModelModule.TabModel, ModelModule.GameModel);