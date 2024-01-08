/*---------------------------------------------------------------------------*
 * 2019/05/26
 * Ver.1.0
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 好きな座標にアニメーションを表示する（マップ・戦闘）
 * @author kido
 * @help
 * 
 * TkoolMV_PluginCommandBook.js の改良
 * https://github.com/AlecYawata/TkoolMV_PluginCommandBook
 * 
 *  ShowAnimation id x y wait
 * 
 * 使用例
 *  アニメーション完了までウェイトなし
 *  ShowAnimation 1 100 200
 * 
 *  アニメーション完了までウェイトあり
 *  ShowAnimation 1 100 200 wait
 * 
 *  変数使用
 *  ShowAnimation \V[10] \V[11] \V[12]
 * 
 *  
 */


(function(){

  function convertEscapeCharacter(text){
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    return text;
  }

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'ShowAnimation') {
      var id = Number(convertEscapeCharacter(args[0]));
      if(!$dataAnimations[id]){
        console.error('id ' + id + ' のアニメーションは存在しません');
        return;
      }
      var x = Number(convertEscapeCharacter(args[1]));
      var y = Number(convertEscapeCharacter(args[2]));
      var wait = args[3] == 'wait';
      $gameScreen.setupAnimation(id, x, y);
      if (wait) this.setWaitMode('freePointAnimation');
    }
  };

  var _updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    var waiting = false;
    if(this._waitMode == 'freePointAnimation'){
      waiting = $gameScreen.isAnimationPlaying();
      if (!waiting) {
        this._waitMode = '';
      }
    }else{
      waiting = _updateWaitMode.call(this);
    }
    return waiting;
  };


  //シーン切替時にクリアしないと、アニメーションプレイ中のフラグが立ったままになるので
  var _terminate = Scene_Base.prototype.terminate;
  Scene_Base.prototype.terminate = function(){
    _terminate.call(this);
    $gameScreen.clearAnimation();
  };

  Game_Screen.prototype.setupAnimation = function(id, x, y) {
    this._animationId = id;
    this._animationContainerX = x;
    this._animationContainerY = y;
  };

  Game_Screen.prototype.clearAnimation = function() {
    this._animationContainerX = 0;
    this._animationContainerY = 0;
    this._animationId = 0;
    this._animationPlaying = false;
  };

  Game_Screen.prototype.startAnimation = function() {
    this._animationId = 0;
    this._animationPlaying = true;
  };

  Game_Screen.prototype.endAnimation = function() {
    this._animationPlaying = false;
  };

  Game_Screen.prototype.isAnimationPlaying = function() {
    return this._animationId > 0 ||  this._animationPlaying;
  };


  var _Game_Screen_clear = Game_Screen.prototype.clear;
  Game_Screen.prototype.clear = function() {
    _Game_Screen_clear.apply(this, arguments);
    this.clearAnimation();
  };

  var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
  Spriteset_Base.prototype.createUpperLayer = function() {
    _Spriteset_Base_createUpperLayer.apply(this, arguments);
    this.createAnimationContainer();
  };

  Spriteset_Base.prototype.createAnimationContainer = function() {
    this._animationContainer = new Sprite_Base();
    this._animationId = 0;
    this.addChild(this._animationContainer);
  };

  var _Spriteset_Base_update = Spriteset_Base.prototype.update;
  Spriteset_Base.prototype.update = function() {
    _Spriteset_Base_update.call(this);
    if(this._animationContainer)this.updateAnimationContainer();
  };

  Spriteset_Base.prototype.updateAnimationContainer = function() {
    var id = $gameScreen._animationId;
    if (id > 0 && id < $dataAnimations.length) {
      this._animationContainer.x = $gameScreen._animationContainerX;
      this._animationContainer.y = $gameScreen._animationContainerY;
      this._animationContainer.startAnimation($dataAnimations[id], false, 0);
      this._animationId = id;
      $gameScreen.startAnimation();
    }
    if (!this._animationContainer.isAnimationPlaying() && this._animationId > 0) {
      this._animationId = 0;
      $gameScreen.endAnimation();
    }
  };
})();
