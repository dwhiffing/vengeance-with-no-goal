/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _boot = __webpack_require__(1);

	var _boot2 = _interopRequireDefault(_boot);

	var _load = __webpack_require__(2);

	var _load2 = _interopRequireDefault(_load);

	var _menu = __webpack_require__(3);

	var _menu2 = _interopRequireDefault(_menu);

	var _gameover = __webpack_require__(4);

	var _gameover2 = _interopRequireDefault(_gameover);

	var _credits = __webpack_require__(5);

	var _credits2 = _interopRequireDefault(_credits);

	var _play = __webpack_require__(6);

	var _play2 = _interopRequireDefault(_play);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	  var game = new Phaser.Game(773, 435, Phaser.AUTO, 'app');

	  game.state.add('boot', _boot2.default);
	  game.state.add('load', _load2.default);
	  game.state.add('play', _play2.default);
	  game.state.add('menu', _menu2.default);
	  game.state.add('gameover', _gameover2.default);
	  game.state.add('credits', _credits2.default);
	  game.state.start('boot');
	})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  create: function create(game) {
	    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.game.state.start('load', true, false);
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  preload: function preload() {
	    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

	    this.load.audio('block', 'audio/block.mp3');
	    this.load.audio('cancel', 'audio/cancel.mp3');
	    this.load.audio('confirm', 'audio/confirm.mp3');
	    this.load.audio('crit', 'audio/crit.mp3');
	    this.load.audio('gameover', 'audio/gameover.mp3');
	    this.load.audio('heal', 'audio/heal.mp3');
	    this.load.audio('hit', 'audio/hit.mp3');
	    this.load.audio('parry', 'audio/parry.mp3');
	    this.load.audio('select', 'audio/select.mp3');
	    this.load.audio('spawn', 'audio/spawn.mp3');
	    this.load.audio('death', 'audio/zerohealth.mp3');
	    this.load.audio('kill', 'audio/zerohealthexplode.mp3');
	    this.load.image('full', 'images/fullscreen.png');
	    this.load.image('title', 'images/title.png');

	    this.load.audio('music', 'audio/battle-music.ogg');

	    this.load.image('bit', 'images/bit.png');
	    this.load.image('ball', 'images/ball.png');
	    this.load.image('select', 'images/select.png');
	    this.load.image('attack-icon', 'images/attack-icon.png');
	    this.load.image('counter-icon', 'images/counter-icon.png');
	    this.load.image('assist-icon', 'images/assist-icon.png');
	    this.load.image('confirm', 'images/confirm.png');
	    this.load.image('cancel', 'images/cancel.png');
	    this.load.image('arrow', 'images/arrow.png');
	    this.load.image('rightarrow', 'images/rightarrow.png');
	    this.load.image('bg', 'images/bg.png');
	    this.load.spritesheet('bar', 'images/bar.png', 150, 20);

	    this.load.spritesheet('player-melee', 'images/player-melee.png', 200, 200);
	    this.load.spritesheet('player-sword', 'images/player-sword.png', 200, 200);
	    this.load.spritesheet('player-bow', 'images/player-bow.png', 200, 200);
	    this.load.spritesheet('enemy-melee', 'images/enemy-melee.png', 200, 200);
	    this.load.spritesheet('enemy-sword', 'images/enemy-sword.png', 200, 200);
	    this.load.spritesheet('enemy-bow', 'images/enemy-bow.png', 200, 200);
	  },
	  onLoadComplete: function onLoadComplete() {
	    // TODO: make me menu
	    this.game.state.start('menu', true, false, { score: 5000 });
	  }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var spaceKey = void 0,
	    leftKey = void 0,
	    rightKey = void 0,
	    downKey = void 0,
	    upKey = void 0;

	exports.default = {
	  create: function create(game) {
	    this.game = game;
	    game.stage.backgroundColor = '#000000';
	    var image = this.game.add.image(0, 0, 'title');
	    image.width = this.game.width;
	    image.height = this.game.height;
	    this.startText = game.add.text(70, this.game.height - 55, "Start", { font: "bold 32px Arial", fill: "#fff" });
	    this.startText.anchor.setTo(0.5);
	    this.creditsText = game.add.text(70, this.game.height - 20, "Credits", { font: "28px Arial", fill: "#fff" });
	    this.creditsText.anchor.setTo(0.5);
	    this.index = 0;

	    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	    leftKey.onDown.add(this.move.bind(this, -1));
	    rightKey.onDown.add(this.move.bind(this, 1));
	    upKey.onDown.add(this.move.bind(this, 1));
	    downKey.onDown.add(this.move.bind(this, -1));
	    spaceKey.onDown.add(this.start.bind(this));
	    game.input.onDown.add(this.start.bind(this));
	  },
	  move: function move(dir) {
	    this.index = this.index === 0 ? 1 : 0;
	    if (this.index === 0) {
	      this.startText.setStyle({ font: "bold 32px Arial", fill: "#fff" });
	      this.creditsText.setStyle({ font: "28px Arial", fill: "#fff" });
	    } else {
	      this.startText.setStyle({ font: "28px Arial", fill: "#fff" });
	      this.creditsText.setStyle({ font: "bold 32px Arial", fill: "#fff" });
	    }
	  },
	  start: function start() {
	    if (this.index === 0) {
	      this.game.state.start('play', true, false);
	    } else {
	      this.game.state.start('credits', true, false);
	    }
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getStyle = function getStyle(size, bold) {
	  return {
	    font: '' + (bold ? 'bold ' : '') + size + 'px Arial',
	    fill: "#fff"
	  };
	};
	var score = 0;
	var spaceKey = void 0;

	exports.default = {
	  init: function init() {
	    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    score = args.score || 0;
	  },
	  create: function create(game) {
	    this.game = game;
	    game.stage.backgroundColor = '#000000';

	    var x = this.game.world.centerX;
	    var y = this.game.world.centerY;
	    var titleText = game.add.text(x, 80, "Game Over", getStyle(48, true));
	    var scoreText = game.add.text(x, 200, "Final Score:", getStyle(34, true));
	    var scoreText2 = game.add.text(x, 250, score.toString(), getStyle(28));
	    var startText = game.add.text(x, this.game.height - 80, "Try again", getStyle(32));

	    titleText.anchor.setTo(0.5);
	    scoreText.anchor.setTo(0.5);
	    scoreText2.anchor.setTo(0.5);
	    startText.anchor.setTo(0.5);

	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    var start = function start() {
	      game.state.start('menu', true, false);
	    };
	    spaceKey.onDown.add(start);
	    game.input.onDown.add(start);
	  }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var spaceKey = void 0;
	var getStyle = function getStyle(size, bold) {
	  return {
	    font: '' + (bold ? 'bold ' : '') + size + 'px Arial',
	    fill: "#fff"
	  };
	};

	exports.default = {
	  create: function create(game) {
	    this.game = game;
	    game.stage.backgroundColor = '#000000';
	    var x = this.game.world.centerX;
	    var y = this.game.world.centerY;
	    var titleText = game.add.text(x, 50, "Vengeance With no Goal", getStyle(42, true));
	    var twins = game.add.text(x, 120, "Art", getStyle(28, true));
	    var twins2 = game.add.text(x, 150, "Steph & Sam Braithwaite", getStyle(18));
	    var daniel = game.add.text(x, 200, "Coding", getStyle(28, true));
	    var daniel2 = game.add.text(x, 230, "Daniel Whiffing", getStyle(18));
	    var john = game.add.text(x, 280, "Music", getStyle(28, true));
	    var john2 = game.add.text(x, 310, "John Hagley", getStyle(18));
	    var startText = game.add.text(x, this.game.height - 40, "Back to menu", getStyle(16));

	    titleText.anchor.setTo(0.5);
	    daniel.anchor.setTo(0.5);
	    daniel2.anchor.setTo(0.5);
	    twins.anchor.setTo(0.5);
	    twins2.anchor.setTo(0.5);
	    john.anchor.setTo(0.5);
	    john2.anchor.setTo(0.5);
	    startText.anchor.setTo(0.5);
	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    var start = function start() {
	      game.state.start('menu', true, false);
	    };
	    spaceKey.onDown.add(start);
	    game.input.onDown.add(start);
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ui = __webpack_require__(7);

	var _ui2 = _interopRequireDefault(_ui);

	var _EntityManager = __webpack_require__(8);

	var _EntityManager2 = _interopRequireDefault(_EntityManager);

	var _particles = __webpack_require__(13);

	var _particles2 = _interopRequireDefault(_particles);

	var _textManager = __webpack_require__(14);

	var _textManager2 = _interopRequireDefault(_textManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  create: function create(game) {
	    var _this = this;

	    this.game = game;
	    game.stage.backgroundColor = '#333';
	    this.game.bg = this.game.add.image(0, 0, 'bg');
	    this.game.bg.scale.x = 0.5;
	    this.game.bg.scale.y = 0.5;

	    this.game.score = 0;
	    this.game.music = this.game.add.audio('music', 0.5);
	    this.game.music.loop = true;
	    this.game.music.play();

	    this.game.selectSound = game.add.audio('select');
	    this.game.confirmSound = game.add.audio('confirm', 0.5);
	    this.game.cancelSound = game.add.audio('cancel');

	    this.game.blockSound = game.add.audio('block');
	    this.game.hitSound = game.add.audio('hit');
	    this.game.critHitSound = game.add.audio('crit');

	    this.game.healSound = game.add.audio('heal');
	    this.game.deathSound = game.add.audio('death', 0.8);
	    this.game.killSound = game.add.audio('kill', 0.8);

	    this.game.reviveSound = game.add.audio('spawn', 2);
	    this.game.gameoverSound = game.add.audio('gameover');
	    this.game.parrySound = game.add.audio('parry', 0.5);

	    this.game.entityManager = new _EntityManager2.default(game);
	    this.game.textManager = new _textManager2.default(game);
	    this.game.ui = new _ui2.default(game);
	    this.game.particleManager = new _particles2.default(game);

	    this.game.entityManager.nextWave();
	    this.game.ui.setTarget();
	    this.game.ui.hideTarget();
	    this.game.ui.allowAction = false;
	    this.game.textManager.display('');

	    this.game.camera.bounds = null;
	    this._shakeWorldTime = 0;
	    this._shakeWorldMax = 20;
	    this.game.shake = function (duration, strength) {
	      _this._shakeWorldTime = duration || 20;
	      _this._shakeWorldMax = strength || 20;
	    };
	  },
	  update: function update() {
	    this.game.particleManager.update();
	    this.game.textManager.update();

	    if (this._shakeWorldTime > 0) {
	      var magnitude = this._shakeWorldTime / this._shakeWorldMax * this._shakeWorldMax;
	      var x = this.game.rnd.integerInRange(-magnitude, magnitude);
	      var y = this.game.rnd.integerInRange(-magnitude, magnitude);

	      this.game.camera.x = x;
	      this.game.camera.y = y;
	      this._shakeWorldTime--;
	    }
	  }
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dot = function Dot(game, group, x, y, key) {
	  _classCallCheck(this, Dot);

	  this.sprite = game.add.sprite(x, y, key);
	  this.sprite.anchor.x = 0.5;
	  this.sprite.anchor.y = 0.5;
	  if (group) {
	    group.add(this.sprite);
	  }
	};

	var buffer = 60,
	    uiMode = void 0;
	var entities = void 0,
	    enemies = void 0,
	    players = void 0,
	    targetting = void 0;
	var actionGroup = void 0,
	    actionDot = void 0,
	    actionIndex = void 0,
	    targetDot = void 0,
	    targetIndex = void 0;
	var attack = void 0,
	    defend = void 0,
	    assistButton = void 0,
	    allowAssist = void 0;
	var leftKey = void 0,
	    rightKey = void 0,
	    upKey = void 0,
	    downKey = void 0,
	    spaceKey = void 0,
	    escKey = void 0;

	var actions = ['attack', 'defend'];
	var buttons = void 0;
	var assist = ['boost', 'protect', 'heal'];

	var loop = function loop(val, min, max) {
	  if (val < min) {
	    return max;
	  } else if (val > max) {
	    return min;
	  }
	  return val;
	};

	var UserInterface = function () {
	  function UserInterface(game) {
	    _classCallCheck(this, UserInterface);

	    this.game = game;

	    actionGroup = game.add.group();
	    uiMode = 'action';

	    attack = new Dot(game, actionGroup, -buffer, 40, 'attack-icon');
	    defend = new Dot(game, actionGroup, 0, 20, 'counter-icon');
	    assistButton = new Dot(game, actionGroup, buffer, 40, 'assist-icon');
	    buttons = [attack, defend, assistButton];

	    entities = this.game.entities;
	    enemies = this.game.enemies;
	    players = this.game.players;
	    targetting = enemies;

	    actionIndex = 0;
	    targetIndex = 0;
	    targetDot = new Dot(game, null, -buffer, 20, 'select');
	    targetDot.sprite.anchor.setTo(0.5);
	    var targetDotTween = this.game.add.tween(targetDot.sprite).to({ angle: 360 }, 10000).loop().start();

	    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

	    leftKey.onDown.add(this.move.bind(this, -1));
	    rightKey.onDown.add(this.move.bind(this, 1));
	    upKey.onDown.add(this.move.bind(this, 1));
	    downKey.onDown.add(this.move.bind(this, -1));
	    spaceKey.onDown.add(this.hitSpace.bind(this));
	    escKey.onDown.add(this.hitEsc.bind(this));

	    if (!this.game.device.desktop) {
	      var leftArrow = game.add.button(10, game.height - 55, 'arrow', this.move.bind(this, -1));
	      var rightArrow = game.add.button(75, game.height - 55, 'rightarrow', this.move.bind(this, 1));
	      var confirm = game.add.button(game.width - 60, game.height - 60, 'confirm', this.hitSpace.bind(this));
	      var cancel = game.add.button(game.width - 110, game.height - 40, 'cancel', this.hitEsc.bind(this));
	      confirm.width = 50;
	      confirm.height = 50;
	      leftArrow.width = 50;
	      leftArrow.height = 50;
	      rightArrow.scale.x = -1;
	      rightArrow.width = 50;
	      rightArrow.height = 50;
	      cancel.width = 30;
	      cancel.height = 30;
	    }
	  }

	  _createClass(UserInterface, [{
	    key: 'hitSpace',
	    value: function hitSpace() {
	      this.allowAction ? this.doSelectedAction() : this.game.doAction('timing');
	    }
	  }, {
	    key: 'hitEsc',
	    value: function hitEsc() {
	      if (uiMode === 'target') {
	        uiMode = 'action';
	        actionGroup.alpha = 1;
	        this.hideTarget();
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move(amount) {
	      this.game.selectSound.play();
	      uiMode === 'action' ? this.moveActionIndex(amount) : this.moveTargetIndex(amount);
	    }
	  }, {
	    key: 'moveActionIndex',
	    value: function moveActionIndex(amount) {
	      actionIndex += amount;
	      actionIndex = loop(actionIndex, 0, 2);
	      buttons.forEach(function (b) {
	        b.sprite.scale.setTo(1);
	        b.sprite.tint = 0x555555;
	      });
	      buttons[actionIndex].sprite.scale.setTo(1.2);
	      buttons[actionIndex].sprite.tint = 0xffffff;
	      this.game.textManager.display(this.getActionName());
	    }
	  }, {
	    key: 'getActionName',
	    value: function getActionName() {
	      if (actionIndex === 2) {
	        if (allowAssist) {
	          return assist[this.game.nextToMove.job];
	        } else {
	          return 'No free target to assist';
	        }
	      }
	      return actions[actionIndex];
	    }
	  }, {
	    key: 'moveTargetIndex',
	    value: function moveTargetIndex(amount) {
	      var target = void 0;
	      var nextToMove = this.game.nextToMove || this.game.players[0];
	      do {
	        targetIndex += amount;
	        targetIndex = loop(targetIndex, 0, targetting.length - 1);
	        target = targetting[targetIndex];
	        if (target === nextToMove && target.job !== 2 || nextToMove.job !== 2 && target.isAssisting || nextToMove.job !== 2 && target.isAssisted) {
	          target = null;
	        }
	      } while (!target || !target.alive);

	      targetDot.sprite.x = target.sprite.x;
	      targetDot.sprite.y = target.sprite.y;

	      var verb = targetting === this.game.players ? 'Assist' : 'Attack';

	      this.game.textManager.display(verb + ' ' + target.jobName);
	    }
	  }, {
	    key: 'setActionMenuPosition',
	    value: function setActionMenuPosition(target) {
	      if (!target) {
	        actionIndex = 1;
	        this.moveActionIndex(-1);
	        target = players[actionIndex];
	      }
	      actionIndex = 0;
	      this.moveActionIndex(1);
	      this.moveActionIndex(-1);

	      actionGroup.alpha = 1;
	      actionGroup.x = target.x;
	      actionGroup.y = target.y - 120;
	      targetDot.sprite.alpha = 0;

	      var melee = this.game.players[0];
	      var sword = this.game.players[1];
	      var bow = this.game.players[2];

	      allowAssist = true;
	      if (this.game.nextToMove === melee && sword.isAssisting || this.game.nextToMove === sword && melee.isAssisting || this.game.nextToMove === sword && !bow.alive && !melee.alive || this.game.nextToMove === melee && !bow.alive && !sword.alive) {
	        allowAssist = false;
	      }
	      assistButton.sprite.tint = allowAssist ? 0xffffff : 0x222222;
	      this.allowAction = true;

	      buttons.forEach(function (b) {
	        b.sprite.scale.setTo(1);
	        b.sprite.tint = 0x555555;
	      });
	      buttons[0].sprite.tint = 0xffffff;

	      this.game.players.forEach(function (p) {
	        return p.sprite.tint = 0x666666;
	      });
	      target.sprite.tint = 0xffffff;
	      this.game.textManager.display(this.getActionName());
	    }
	  }, {
	    key: 'setTarget',
	    value: function setTarget() {
	      targetIndex = 1;
	      this.moveTargetIndex(-1);
	      var target = targetting[targetIndex];
	      actionGroup.alpha = 0;
	      this.allowAction = true;
	      targetDot.sprite.x = target.sprite.x;
	      targetDot.sprite.y = target.sprite.y;
	      targetDot.sprite.alpha = 0.5;
	    }
	  }, {
	    key: 'hideTarget',
	    value: function hideTarget() {
	      targetDot.sprite.alpha = 0;
	    }
	  }, {
	    key: 'toggleActionMenu',
	    value: function toggleActionMenu() {
	      var thing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      if (thing === 0) {
	        actionGroup.alpha = actionGroup.alpha === 0 ? 1 : 0;
	      } else {
	        actionGroup.alpha = thing ? 1 : 0;
	      }
	    }
	  }, {
	    key: 'toggleTargetMode',
	    value: function toggleTargetMode() {
	      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'attack';
	      var undo = arguments[1];

	      if (uiMode === 'action') {
	        uiMode = 'target';
	        // move attack target to first targettable enemy
	        targetting = type === 'attack' ? enemies : players;
	        this.setTarget();
	      } else {
	        uiMode = 'action';
	        this.hideTarget();
	        this.game.doAction(type, targetting[targetIndex]);
	      }
	    }
	  }, {
	    key: 'doSelectedAction',
	    value: function doSelectedAction() {
	      if (!this.allowAction || this.game.turn === 'enemy') {
	        if (this.game.turn !== 'enemy') {
	          this.game.cancelSound.play();
	        }
	        return;
	      }
	      this.game.confirmSound.play();
	      switch (actionIndex) {
	        case 0:
	          {
	            this.allowAction = false;
	            this.toggleTargetMode();
	            break;
	          }
	        case 2:
	          {
	            if (allowAssist) {
	              this.allowAction = false;
	              this.toggleTargetMode(this.getActionName());
	            }
	            break;
	          }
	        default:
	          {
	            this.game.doAction(this.getActionName());
	            break;
	          }
	      }
	    }
	  }]);

	  return UserInterface;
	}();

	exports.default = UserInterface;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _enemy = __webpack_require__(9);

	var _enemy2 = _interopRequireDefault(_enemy);

	var _player = __webpack_require__(12);

	var _player2 = _interopRequireDefault(_player);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var playerCount = [0, 1, 2];
	var enemyCount = [0, 1, 2, 3, 4];

	var xBuffer = 150;
	var yBuffer = 150;
	var enemyXBuffer = 145;
	var playerYBuffer = 80;
	var enemyYBuffer = 85;

	var waves = [[0, 1, 2], [0, 0, 1], [1, 1, 2], [2, 2, 0], [0, 0, 1, 1], [1, 1, 2, 2], [2, 2, 0, 0], [0, 0, 1, 1, 2], [1, 1, 2, 2, 0], [2, 2, 0, 0, 1], [0, 1, 0, 1, 2], [2, 1, 1, 2, 0], [2, 0, 2, 0, 1]];
	var finalWaves = [[0, 0, 0, 1, 2], [1, 1, 1, 2, 0], [2, 2, 2, 0, 1], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [2, 2, 2, 2, 2]];

	var entities = void 0,
	    enemies = void 0,
	    players = void 0;

	var EntityManager = function () {
	  function EntityManager(game) {
	    var _this = this;

	    _classCallCheck(this, EntityManager);

	    this.game = game;
	    this.turnIndex = -1;
	    this.game.entities = [];
	    this.game.turn = 'player';
	    this.game.waveNum = 0;
	    this.group = game.add.group();

	    playerCount.forEach(function (pos, index) {
	      var x = index === 1 ? xBuffer + 60 : xBuffer;
	      var y = index % 3 * playerYBuffer + yBuffer;
	      var player = new _player2.default(game, x, y, index);
	      _this.game.entities.push(player);
	      _this.group.add(player.sprite);
	    });

	    enemyCount.forEach(function (pos, index) {
	      var x2 = game.width - enemyXBuffer;
	      var x = index < 3 ? x2 - enemyXBuffer * 1.35 : x2;
	      var y1 = index % 3 * enemyYBuffer + yBuffer;
	      var y = index < 3 ? y1 : y1 + enemyYBuffer / 2;
	      var enemy = new _enemy2.default(game, x, y, game.rnd.integerInRange(0, 2));
	      _this.game.entities.push(enemy);
	      _this.group.add(enemy.sprite);
	    });

	    this.game.enemies = this.game.entities.filter(function (ent) {
	      return ent.type === 'enemy';
	    }).sort(function (a, b) {
	      return a.sprite.y > b.sprite.y ? 1 : -1;
	    });

	    this.game.players = this.game.entities.filter(function (ent) {
	      return ent.type === 'player';
	    });

	    entities = this.game.entities;
	    enemies = this.game.enemies;
	    players = this.game.players;

	    this.game.doAction = this.doAction.bind(this);
	    this._nextTurn = this._nextTurn.bind(this);
	  }

	  _createClass(EntityManager, [{
	    key: 'doAction',
	    value: function doAction(action, target) {
	      var current = this.game.entities[this.turnIndex];
	      if (!current) return;
	      this.game.ui.toggleActionMenu(false);
	      switch (action) {
	        case 'timing':
	          {
	            current.timingAttackTrigger();
	            break;
	          }
	        case 'attack':
	          {

	            current.attack(target, this._nextTurn);
	            break;
	          }
	        case 'defend':
	          {
	            current.defend(this._nextTurn);
	            break;
	          }
	        case 'boost':case 'heal':case 'protect':
	          {
	            current.pickPlayer(target, action, this._nextTurn);
	            break;
	          }
	      }
	    }
	  }, {
	    key: 'checkWinLoseCondition',
	    value: function checkWinLoseCondition() {
	      var alivePlayers = players.filter(function (p) {
	        return !!p.alive;
	      });
	      var aliveEnemies = enemies.filter(function (p) {
	        return !!p.alive;
	      });
	      if (alivePlayers.length === 0 || aliveEnemies.length === 0) {
	        return true;
	      }
	    }
	  }, {
	    key: 'triggerWinLoseCondition',
	    value: function triggerWinLoseCondition() {
	      var alivePlayers = players.filter(function (p) {
	        return !!p.alive;
	      });
	      var aliveEnemies = enemies.filter(function (p) {
	        return !!p.alive;
	      });
	      if (alivePlayers.length === 0) {
	        this.game.ui.toggleActionMenu(false);
	        this.game.textManager.display('Game over...');
	        setTimeout(this.triggerGameOver.bind(this), 1500);
	      }
	      if (aliveEnemies.length === 0) {
	        this.game.ui.toggleActionMenu(false);
	        this.game.textManager.display('You win!');
	        setTimeout(this.nextWave.bind(this), 1500);
	      }
	    }
	  }, {
	    key: 'triggerGameOver',
	    value: function triggerGameOver() {
	      this.game.state.start('gameover', true, false, { score: Math.round(this.game.score) });
	    }
	  }, {
	    key: 'nextWave',
	    value: function nextWave() {
	      var _this2 = this;

	      this.game.ui.allowAction = true;
	      this.game.waveNum++;
	      this.game.textManager.updateWave(this.game.waveNum);
	      var waveLayout = void 0;
	      if (this.game.waveNum <= waves.length) {
	        waveLayout = waves[this.game.waveNum - 1];
	      } else {
	        waveLayout = finalWaves[this.game.rnd.integerInRange(0, finalWaves.length)];
	      }

	      var waveSize = waveLayout.length;

	      enemies.forEach(function (enemy, index) {
	        if (waveSize <= index) return;
	        enemy.job = waveLayout[index];
	        enemy.spawn();
	      });

	      this.resetPlayers(true);
	      players.forEach(function (player) {
	        player.heal(0.25, false);
	      });

	      setTimeout(function () {
	        _this2.turnIndex = -1;
	        _this2.game.ui.allowAction = false;
	        _this2.game.ui.toggleActionMenu(true);
	        _this2.game.textManager.clear;
	        _this2._nextTurn();
	      }, 1500);
	    }
	  }, {
	    key: 'resetPlayers',
	    value: function resetPlayers(thing) {
	      players.forEach(function (player) {
	        player.reset(thing);
	      });
	    }
	  }, {
	    key: '_getUnitForNextTurn',
	    value: function _getUnitForNextTurn() {
	      var target = void 0;
	      do {
	        this.turnIndex++;
	        if (this.turnIndex > this.game.entities.length - 1) {
	          this.turnIndex = 0;
	        }
	        target = this.game.entities[this.turnIndex];
	      } while (!target.alive);

	      return target;
	    }
	  }, {
	    key: '_nextTurn',
	    value: function _nextTurn() {
	      this.game.nextToMove = this._getUnitForNextTurn();

	      if (this.checkWinLoseCondition()) {
	        return;
	      }
	      var lastTurn = this.game.turn;
	      this.game.turn = this.turnIndex > 2 ? 'enemy' : 'player';

	      if (lastTurn === 'enemy' && this.game.turn === 'player') {
	        this.resetPlayers();
	      }
	      if (lastTurn === 'player' && this.game.turn === 'enemy') {
	        this.game.players.forEach(function (p) {
	          return p.sprite.tint = 0xffffff;
	        });
	        this.game.ui.allowAction = false;
	      }

	      if (this.game.turn === 'player') {
	        this._performPlayerMove(this.game.nextToMove);
	      } else {
	        this.game.ui.hideTarget();
	        this.game.textManager.clear();
	        setTimeout(this._performEnemyMove.bind(this, this.game.nextToMove), 500);
	      }
	    }
	  }, {
	    key: '_performPlayerMove',
	    value: function _performPlayerMove(player) {
	      this.game.ui.setActionMenuPosition(player);
	      player.stopDefendingOrAssisting();
	    }
	  }, {
	    key: '_performEnemyMove',
	    value: function _performEnemyMove(enemy) {
	      // TODO: enemy should target thing they are strong against or weak player
	      enemy.attackBestTarget(players, this._nextTurn);
	    }
	  }]);

	  return EntityManager;
	}();

	exports.default = EntityManager;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _entity = __webpack_require__(10);

	var _entity2 = _interopRequireDefault(_entity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Enemy = function (_Entity) {
	  _inherits(Enemy, _Entity);

	  function Enemy(game, x, y, job) {
	    _classCallCheck(this, Enemy);

	    return _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, game, x, y, 'enemy', job));
	  }

	  _createClass(Enemy, [{
	    key: 'attackBestTarget',
	    value: function attackBestTarget(players, callback) {
	      var _this2 = this;

	      var bestTarget = players.filter(function (p) {
	        return p.alive && p.job === _this2.strongAgainst && !p.isAssisting;
	      })[0];
	      bestTarget = bestTarget || players.filter(function (p) {
	        return p.alive && p.job !== _this2.weakAgainst && !p.isAssisting;
	      })[0];
	      bestTarget = bestTarget || players.filter(function (p) {
	        return p.alive && p.job === _this2.weakAgainst && !p.isAssisting;
	      })[0];
	      if (bestTarget) {
	        this.attack(bestTarget, callback);
	      }
	    }
	  }]);

	  return Enemy;
	}(_entity2.default);

	exports.default = Enemy;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _text = __webpack_require__(11);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var sprites = ['ball', 'square', 'triangle'];
	var spriteNames = ['sword', 'melee', 'bow'];
	var jobNames = ['Papier', 'Rok', 'Sizzorix'];
	var jobNamesEnemy = ['P-Wing', 'Rit-Rat', 'Slippy'];
	var jobColors = [0x22dd22, 0xdd0000, 0x4422dd];
	var baseStats = [{
	  hp: 100,
	  power: 25
	}, {
	  hp: 200,
	  power: 25
	}, {
	  hp: 80,
	  power: 25
	}];

	var attackTween = void 0,
	    backTween = void 0,
	    jumpTween = void 0,
	    damageTween = void 0,
	    pulseTween = void 0;
	var ease = void 0;
	var idleAnim = void 0,
	    attackAnim = void 0,
	    hitAnim = void 0,
	    deadAnim = void 0,
	    defendAnim = void 0;

	var Entity = function () {
	  function Entity(game, x, y, type, job) {
	    _classCallCheck(this, Entity);

	    this.sprite = game.add.sprite(x, y, type + '-' + spriteNames[job]);
	    this.sprite.anchor.setTo(0.5, 0.7);
	    this.x = this.sprite.x;
	    this.y = this.sprite.y;
	    ease = Phaser.Easing;

	    this.game = game;
	    this.type = type;
	    this.job = job;

	    this.setStats();

	    this.facing = type === 'player' ? 1 : -1;
	    this.alive = true;

	    this.strongAgainst = this.job + 1 > 2 ? 0 : this.job + 1;
	    this.weakAgainst = this.job - 1 < 0 ? 2 : this.job - 1;

	    idleAnim = this.sprite.animations.add('idle', [0, 1]);
	    attackAnim = this.sprite.animations.add('attack', [2, 3]);
	    hitAnim = this.sprite.animations.add('hit', [4]);
	    deadAnim = this.sprite.animations.add('dead', [5]);
	    defendAnim = this.sprite.animations.add('defend', [6]);

	    this.lifeBarWidth = this.sprite.width / 4;
	    var lifeBarY = this.sprite.y;

	    this.lifebarSpacing = 0;
	    if (this.type === 'player') {
	      this.lifebarSpacing = 60;
	      this.lifebarSpacing += this.job === 1 ? 20 : 0;
	      this.lifebarSpacing += this.job === 2 ? -40 : 0;
	    }
	    var lifeBarX = this.sprite.x - this.facing * 70 - this.lifebarSpacing;

	    this.lifeBar = new _text2.default(game, lifeBarX, lifeBarY, this.life);
	    this.updateLifeBar();
	    this.revive();

	    if (this.type !== 'player') {
	      this.alive = false;
	      this.sprite.alpha = 0;
	      this.lifeBar.kill();
	    }

	    this.idle();
	  }

	  _createClass(Entity, [{
	    key: 'idle',
	    value: function idle() {
	      var _this = this;

	      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

	      setTimeout(function () {
	        _this.sprite.animations.play('idle', 1, true);
	        pulseTween = _this.game.add.tween(_this.sprite.scale).to({ x: 1.03, y: 1.04 }, 1000, Phaser.Easing.Quadratic.InOut).yoyo(true).loop(true).start();
	      }, this.game.rnd.integerInRange(0, delay));
	    }
	  }, {
	    key: 'attack',
	    value: function attack(target) {
	      var _this2 = this;

	      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	      var effectiveness = arguments[2];

	      if (!this.sprite.alive || !target.sprite.alive) return;
	      this.timingAttackTriggered = false;
	      this.alreadyTriggered = false;
	      this.inTimingWindow = false;

	      var timing = this.type === 'player' ? 1500 : 800;
	      var jumpDist = 20;

	      var dist = void 0;
	      var angle = 1;
	      var damageDelay = 0;
	      if (this.job < 2) {
	        dist = 70;
	      } else {
	        dist = -50;
	        angle = -1;
	        damageDelay = 500;
	      }

	      this.sprite.animations.play('attack', 2);

	      if (!effectiveness) {
	        effectiveness = 1;
	        if (this.strongAgainst === target.job) {
	          effectiveness = 2;
	        } else if (this.weakAgainst === target.job) {
	          effectiveness = 0.2;
	        }
	      }

	      jumpTween = this.game.add.tween(this.sprite).to({ y: this.sprite.y - jumpDist }, timing / 15).yoyo(true).start();

	      attackTween = this.game.add.tween(this.sprite).to({
	        x: this.sprite.x + dist * this.facing,
	        angle: 20 * this.facing * angle
	      }, timing, ease.Elastic.Out);
	      attackTween.onComplete.add(function () {
	        backTween = _this2.game.add.tween(_this2.sprite).to({
	          x: _this2.sprite.x - dist * _this2.facing,
	          angle: 0
	        }, timing / 6, ease.Quadratic.Out);

	        // prevent player from attacking before tweens end
	        backTween.onComplete.add(function () {
	          _this2.sprite.animations.play('idle', 1, true);
	          callback();
	        });
	        backTween.start();
	      });
	      attackTween.start();

	      var damage = this.type === 'enemy' ? this.power * (this.life / this.maxLife) : this.power;

	      setTimeout(function () {
	        _this2.inTimingWindow = true;
	        _this2.sprite.tint = 0xffff00;
	        setTimeout(function () {
	          _this2.sprite.tint = 0xffffff;
	          _this2.inTimingWindow = false;
	        }, timing / 3);
	      }, timing / 14);

	      setTimeout(function () {
	        // if defending, reverse effectiveness
	        if (target.isDefending && effectiveness !== 1) {
	          effectiveness *= effectiveness < 1 ? 2 : 0.5;
	        }
	        var sword = _this2.game.players[0];
	        var melee = _this2.game.players[1];
	        if (sword.isAssisting && sword.assistTarget === target && _this2.type === 'enemy') {
	          // this should respect effectiveness rules for sword instead
	          // GAAAH STUPID BUG
	          // sword.attack(this, () => {}, 2)
	          _this2.takeDamage(sword.power);
	          sword.getHit(damage, 0.2, _this2.timingAttackTriggered);
	        } else if (melee.isAssisting && melee.assistTarget === target && _this2.type === 'enemy') {
	          // this should respect effectiveness rules for melee insetad
	          melee.getHit(damage, 0.5, _this2.timingAttackTriggered);
	        } else {
	          target.getHit(damage, effectiveness, _this2.timingAttackTriggered);
	        }
	      }, timing / 6 + damageDelay);
	    }
	  }, {
	    key: 'takeDamage',
	    value: function takeDamage() {
	      var damage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var effectiveness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	      var isCritHit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      var spacing = this.type === 'player' ? 60 : 80;
	      this.game.textManager.floatText(this.sprite.x - (spacing + this.lifebarSpacing) * this.facing, this.y - 50, damage, isCritHit);
	      this.life -= Math.round(damage);
	      if (this.life < 0) {
	        this.game.deathSound.play();
	        this.alive = false;
	        this.life = 0;
	      }
	      this.updateLifeBar(true);

	      // launch particles
	      var particleAmount = effectiveness;
	      if (effectiveness < 1) {
	        this.game.particleManager.block(this.sprite.x, this.sprite.y, this.facing, particleAmount);
	      } else {
	        this.game.particleManager.burst(this.sprite.x, this.sprite.y, this.facing, particleAmount);
	      }

	      if (this.type === 'enemy') {
	        this.game.textManager.addScore(damage);
	      }
	    }
	  }, {
	    key: 'getHit',
	    value: function getHit(damage, effectiveness, timingAttackTriggered) {
	      var _this3 = this;

	      var critMulti = 1;
	      if (timingAttackTriggered) {
	        critMulti = this.type === 'enemy' ? 2 : 0.2;
	      }
	      effectiveness *= critMulti;

	      var damageAmount = Math.round(damage * effectiveness);
	      var isCritHit = timingAttackTriggered && this.type === 'enemy';

	      this.takeDamage(damageAmount, effectiveness, isCritHit);

	      var timing = 250;
	      var dist = void 0,
	          angle = void 0;
	      // vary the tween based on how effective the hit was
	      if (effectiveness === 0.2) {
	        dist = 3;
	        angle = 2;
	      } else if (effectiveness === 1) {
	        dist = 7;
	        angle = 5;
	      } else {
	        dist = 10;
	        angle = 15;
	      }

	      // just defended
	      if (this.type === 'player' && timingAttackTriggered) {
	        dist = 5;
	        angle = 2;
	      } else if (!this.isDefending && effectiveness >= 1) {
	        this.sprite.animations.play('hit');
	        setTimeout(function () {
	          _this3.sprite.animations.play('idle', 1, true);
	        }, 500);
	      }

	      if (isCritHit) {
	        var shakeAmount = damageAmount / 2;
	        if (shakeAmount > 40) shakeAmount = 40;
	        this.game.shake(shakeAmount, 100);
	        dist *= 4;
	        angle *= 2;
	        this.game.critHitSound.play();
	      } else if (effectiveness > 0.2) {
	        this.game.hitSound.play();
	      } else {
	        this.game.blockSound.play();
	      }

	      attackTween = this.game.add.tween(this.sprite).to({
	        x: this.sprite.x - dist * this.facing,
	        angle: -angle * this.facing
	      }, timing, ease.Bounce.Out).yoyo(true, timing);

	      setTimeout(function () {
	        if (_this3.life === 0) {
	          _this3.kill();
	        } else if (!_this3.isDefending || _this3.type === 'enemy') {
	          _this3.sprite.animations.play('idle', 1, true);
	        }
	      }, 500);

	      attackTween.start();
	    }
	  }, {
	    key: 'kill',
	    value: function kill() {
	      var _this4 = this;

	      var alpha = this.type === 'enemy' ? 0.2 : 1;
	      attackTween = this.game.add.tween(this.sprite).to({ alpha: alpha }, 800, Phaser.Easing.Quadratic.Out);
	      this.stopDefendingOrAssisting && this.stopDefendingOrAssisting();

	      this.sprite.animations.play('dead');
	      this.alive = false;

	      this.game.entityManager.checkWinLoseCondition();
	      attackTween.onComplete.add(function () {
	        if (_this4.type === 'enemy') {
	          _this4.sprite.alpha = 0;
	          _this4.lifeBar.kill();
	          _this4.sprite.animations.play('idle', 1, true);
	          _this4.game.killSound.play();
	          _this4.game.particleManager.burst(_this4.sprite.x, _this4.sprite.y, 0, 1.5, 1500);
	        } else {
	          pulseTween.stop();
	        }
	        _this4.game.entityManager.triggerWinLoseCondition();
	      });
	      attackTween.start();
	    }
	  }, {
	    key: 'setStats',
	    value: function setStats() {
	      var modifier = 1;
	      this.maxLife = baseStats[this.job].hp;
	      this.power = baseStats[this.job].power;
	      modifier += (this.game.waveNum - 1) / 10;
	      if (this.type === 'enemy') {
	        this.maxLife = Math.round(100 * modifier);
	        this.power *= modifier;
	        this.power = Math.round(this.power);
	        this.sprite.loadTexture(this.type + '-' + spriteNames[this.job]);
	        this.strongAgainst = this.job + 1 > 2 ? 0 : this.job + 1;
	        this.weakAgainst = this.job - 1 < 0 ? 2 : this.job - 1;
	      }
	      this.jobName = this.type === 'enemy' ? jobNamesEnemy[this.job] : jobNames[this.job];
	      this.life = this.maxLife;
	    }
	  }, {
	    key: 'revive',
	    value: function revive() {
	      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	      this.alive = true;
	      this.life = this.maxLife * amount;
	      this.updateLifeBar();
	      this.lifeBar.spawn();
	      this.game.reviveSound.play();
	    }
	  }, {
	    key: 'spawn',
	    value: function spawn() {
	      this.setStats();
	      this.sprite.animations.play('idle', 1, true);
	      attackTween = this.game.add.tween(this.sprite.scale).to({
	        x: 1,
	        y: 1
	      }, 1000, ease.Quadratic.Out).start();
	      backTween = this.game.add.tween(this.sprite).to({
	        alpha: 1
	      }, 1000, ease.Quadratic.Out).start();

	      this.revive();
	    }
	  }, {
	    key: 'updateLifeBar',
	    value: function updateLifeBar(animate) {
	      var hue = 0.3334 - (this.maxLife - this.life) / (3 * this.maxLife);
	      var rgb = Phaser.Color.HSLtoRGB(hue, 1, 0.5);
	      this.color = Phaser.Color.getColor(rgb.r, rgb.g, rgb.b);
	      this.lifeBar.fullAmount = this.maxLife;
	      this.lifeBar.update(this.life, this.color, animate);
	    }
	  }, {
	    key: 'timingAttackTrigger',
	    value: function timingAttackTrigger() {
	      if (this.alreadyTriggered) return;
	      this.alreadyTriggered = true;
	      if (this.inTimingWindow) {
	        this.game.parrySound.play();
	        this.timingAttackTriggered = true;
	      } else {
	        this.timingAttackTriggered = false;
	      }
	    }
	  }]);

	  return Entity;
	}();

	exports.default = Entity;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var style = {
	  font: "bold 16px Arial",
	  fill: "#fff"
	};

	var HealthText = function () {
	  function HealthText(game, x, y) {
	    var amount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

	    _classCallCheck(this, HealthText);

	    this.game = game;
	    this.fullAmount = amount;
	    this.amount = amount;
	    this.text = this.game.add.text(x, y, '', style);
	    this.text.setShadow(1, 1, 'rgba(0,0,0,0.8)', 1);
	    this.text.anchor.setTo(0, 0.5);

	    this.update(amount);
	  }

	  _createClass(HealthText, [{
	    key: "update",
	    value: function update(amount, hue, animate) {
	      this.amount = amount;
	      this.text.text = this.amount + "/" + this.fullAmount;
	      if (hue) {
	        this.text.tint = hue;
	      }
	      if (animate) {
	        var tween = this.game.add.tween(this.text.scale).to({ x: 1.7, y: 1.7 }, 250, Phaser.Easing.Bounce.Out).yoyo(true).start();
	      }
	    }
	  }, {
	    key: "kill",
	    value: function kill() {
	      this.text.alpha = 0;
	    }
	  }, {
	    key: "spawn",
	    value: function spawn() {
	      this.text.alpha = 1;
	    }
	  }]);

	  return HealthText;
	}();

	exports.default = HealthText;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _entity = __webpack_require__(10);

	var _entity2 = _interopRequireDefault(_entity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defenseTween = void 0,
	    tintTween = void 0;

	var Player = function (_Entity) {
	  _inherits(Player, _Entity);

	  function Player(game, x, y, job) {
	    _classCallCheck(this, Player);

	    return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, 'player', job));
	  }

	  _createClass(Player, [{
	    key: 'defend',
	    value: function defend(callback) {
	      this.isDefending = true;
	      this.sprite.animations.play('defend');
	      callback();
	    }
	  }, {
	    key: 'stopDefendingOrAssisting',
	    value: function stopDefendingOrAssisting() {
	      var opts = { x: this.x, y: this.y };
	      if (this.isDefending || this.isAssisting || this.isAssisted) {

	        this.isDefending = false;
	        this.isAssisting = false;
	        this.isAssisted = false;
	        this.sprite.tint = 0xffffff;
	        this.sprite.animations.play('idle');
	        this.game.players[0].sprite.z = 0;
	        this.game.players[1].sprite.z = 1;
	        this.game.players[2].sprite.z = 2;
	        this.game.entityManager.group.sort('z', Phaser.Group.SORT_ASCENDING);
	        defenseTween = this.game.add.tween(this.sprite).to(opts, 200).start();
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset(revive) {
	      this.stopDefendingOrAssisting();
	      if (revive && !this.alive) {
	        this.revive(0.25);
	      }
	    }
	  }, {
	    key: 'revive',
	    value: function revive(amount) {
	      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'revive', this).call(this, amount);
	      this.idle();
	    }
	  }, {
	    key: 'pickPlayer',
	    value: function pickPlayer(target, action, callback) {
	      var _this2 = this;

	      if (action === 'heal') {
	        // needs animation for healing
	        defenseTween = this.game.add.tween(this.sprite.scale).to({ x: 0.85, y: 1.5 }, 250).yoyo(true);
	        this.sprite.tint = 0x9999ff;
	        setTimeout(function () {
	          return _this2.sprite.tint = 0xffffff;
	        }, 500);
	        defenseTween.onComplete.add(function () {
	          target.heal(0.5);
	          callback();
	        });
	        defenseTween.start();
	      } else if (action === 'boost') {
	        this.isAssisting = true;
	        this.assistTarget = target;
	        this.sprite.animations.play('defend');
	        this.sprite.z = 10;
	        this.sprite.tint = 0x9999ff;

	        defenseTween = this.game.add.tween(this.sprite).to({
	          y: target.sprite.y,
	          x: target.sprite.x + 100
	        }, 200);
	        defenseTween.onComplete.add(callback);
	        defenseTween.start();
	      } else if (action === 'protect') {
	        this.isAssisting = true;
	        this.isDefending = true;
	        target.isAssisted = true;
	        this.assistTarget = target;
	        this.sprite.animations.play('defend');
	        this.sprite.z = 10;
	        this.sprite.tint = 0x9999ff;

	        defenseTween = this.game.add.tween(this.sprite).to({
	          y: target.sprite.y,
	          x: target.sprite.x + 100
	        }, 200);
	        defenseTween.onComplete.add(callback);
	        defenseTween.start();
	      }
	      setTimeout(function () {
	        _this2.game.entityManager.group.sort('z', Phaser.Group.SORT_ASCENDING);
	      }, 20);
	    }
	  }, {
	    key: 'heal',
	    value: function heal() {
	      var _this3 = this;

	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.25;
	      var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      if (this.life === this.maxLife || !this.alive) return;
	      var amount = this.maxLife * value;
	      this.life += amount;
	      if (this.life > this.maxLife) {
	        this.life = this.maxLife;
	      }
	      this.updateLifeBar(true);

	      this.game.textManager.floatText(this.sprite.x - (50 + this.lifebarSpacing) * this.facing, this.y - 50, amount, false, '#0f0');

	      var lastTint = this.sprite.tint;
	      this.game.healSound.play();
	      if (animate) {
	        defenseTween = this.game.add.tween(this.sprite.scale).to({ x: 0.5, y: 1.5 }, 250).yoyo(true);
	        defenseTween.start();
	      }
	      this.sprite.tint = 0x00ff00;
	      setTimeout(function () {
	        return _this3.sprite.tint = lastTint;
	      }, 500);
	    }
	  }]);

	  return Player;
	}(_entity2.default);

	exports.default = Player;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var burstEmitter = void 0,
	    blockEmitter = void 0;

	var ParticleManager = function () {
	  function ParticleManager(game) {
	    _classCallCheck(this, ParticleManager);

	    this.game = game;

	    burstEmitter = game.add.emitter(0, 0);
	    burstEmitter.makeParticles('bit');
	    burstEmitter.setRotation(200, 600);
	    burstEmitter.gravity = 350;
	    burstEmitter.forEach(function (particle) {
	      particle.tint = 0xff0000;
	    });

	    blockEmitter = game.add.emitter(0, 0);
	    blockEmitter.makeParticles('bit');
	    blockEmitter.setRotation(200, 600);
	    blockEmitter.gravity = 350;
	    blockEmitter.forEach(function (particle) {
	      particle.tint = 0x999999;
	    });
	  }

	  _createClass(ParticleManager, [{
	    key: 'burst',
	    value: function burst(x, y) {
	      var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	      var amount = arguments[3];
	      var lifespan = arguments[4];

	      this.doBurst(burstEmitter, x, y, direction, amount, lifespan);
	    }
	  }, {
	    key: 'block',
	    value: function block(x, y) {
	      var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	      var amount = arguments[3];
	      var lifespan = arguments[4];

	      this.doBurst(blockEmitter, x, y, direction, amount, lifespan);
	    }
	  }, {
	    key: 'doBurst',
	    value: function doBurst(emitter, x, y, direction, amount) {
	      var lifespan = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 700;

	      emitter.x = x;
	      emitter.y = y;

	      emitter.minParticleScale = 0.1 * amount;
	      emitter.maxParticleScale = 0.4 * amount;

	      if (emitter.minParticleScale < 0.2) {
	        emitter.minParticleScale = 0.2;
	      }
	      if (emitter.maxParticleScale > 0.5) {
	        emitter.maxParticleScale = 0.5;
	      }

	      var num = Math.floor(10 * amount);
	      var speed = 180 * amount;

	      if (direction === 0) {
	        emitter.setXSpeed(-speed, speed);
	      } else {
	        emitter.setXSpeed(-speed / 2 * direction, -speed * 2 * direction);
	      }

	      emitter.setYSpeed(-speed * 0.5, -speed * 1.3);
	      emitter.start(true, lifespan, null, num);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      burstEmitter.forEachAlive(function (p) {
	        p.alpha = p.lifespan / burstEmitter.lifespan;
	      });
	      blockEmitter.forEachAlive(function (p) {
	        p.alpha = p.lifespan / blockEmitter.lifespan;
	      });
	    }
	  }]);

	  return ParticleManager;
	}();

	exports.default = ParticleManager;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var textObj = void 0,
	    scoreText = void 0,
	    targetScore = void 0,
	    waveText = void 0;
	var style = {
	  font: "18px Arial",
	  fill: "#fff",
	  boundsAlignH: "center",
	  boundsAlignV: "middle"
	};

	var messages = {
	  attack: 'Pick a target enemy to attack, hit again on impact for critical',
	  defend: 'Enter defense mode, swapping your strengths and weaknesses',
	  heal: 'Restore a target ally\'s health',
	  boost: 'Counter for target ally if they are attacked this round',
	  protect: 'Protect a target ally from any attack this round'
	};

	var tween = void 0,
	    tween2 = void 0;

	var TextManager = function () {
	  function TextManager(game) {
	    _classCallCheck(this, TextManager);

	    this.game = game;
	    var y = game.height - 30;

	    targetScore = 0;

	    scoreText = game.add.text(this.game.width - 160, 5, 'score: 0', style);
	    waveText = game.add.text(this.game.width - 160, 30, 'wave: 0', style);

	    textObj = game.add.text(0, y, '', style);
	    textObj.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	    textObj.setTextBounds(0, 10, game.width, 10);

	    game.fullscreenButton = game.add.button(10, 10, 'full', function () {
	      if (game.scale.isFullScreen) {
	        game.scale.stopFullScreen();
	      } else {
	        game.scale.startFullScreen(false);
	      }
	    });
	    game.fullscreenButton.width = 30;
	    game.fullscreenButton.height = 32;
	  }

	  _createClass(TextManager, [{
	    key: "addScore",
	    value: function addScore(score) {
	      targetScore += score;
	    }
	  }, {
	    key: "updateWave",
	    value: function updateWave(amount) {
	      waveText.text = "wave: " + amount;
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      if (this.game.score < targetScore) {
	        this.game.score++;
	      }
	      scoreText.text = "score: " + this.game.score;
	    }
	  }, {
	    key: "display",
	    value: function display(val) {
	      var _this = this;

	      tween = this.game.add.tween(textObj).to({ alpha: 0 }, 100);
	      tween.onComplete.add(function () {
	        tween2 = _this.game.add.tween(textObj).to({ alpha: 1 }, 100).start();
	        if (val in messages) {
	          val = messages[val];
	        }
	        textObj.text = val;
	      });
	      tween.start();
	    }
	  }, {
	    key: "floatText",
	    value: function floatText(x, y, val, crit) {
	      var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#fff';

	      var fontSize = val;
	      if (fontSize < 15) fontSize = 15;
	      if (fontSize > 40) fontSize = 40;
	      var bold = '';
	      if (crit) {
	        bold = 'bold ';
	        fontSize *= 1.5;
	      }
	      fontSize = Math.round(fontSize);

	      var floatText = this.game.add.text(x, y, val, {
	        font: bold + fontSize + 'px Arial',
	        fill: color,
	        boundsAlignH: "center",
	        boundsAlignV: "middle"
	      });
	      floatText.setShadow(1, 1, 'rgba(0,0,0,1)', 0);

	      tween = this.game.add.tween(floatText).to({ y: y - 100, alpha: 0 }, 2000);
	      tween.onComplete.add(function () {
	        floatText.kill();
	      });
	      tween.start();
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.display('');
	    }
	  }]);

	  return TextManager;
	}();

	exports.default = TextManager;

/***/ })
/******/ ]);