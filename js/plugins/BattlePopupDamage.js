/*---------------------------------------------------------------------------*
 * 2020/10/03 @kido0617
 * https://kido0617.github.io/
 *---------------------------------------------------------------------------*/
/*:
 * @plugindesc 戦闘中にダメージなどをポップアップ表示するプラグイン
 * @author kido
 *
 * @param X座標
 * @desc ポップアップ位置のX座標。
 * @type number
 * @default 0
 *
 * @param Y座標
 * @desc ポップアップ位置のY座標。
 * @type number
 * @default 0
 * 
 * @param コマンド使用時の色調
 * @desc R,G,B,Gray
 * @type string
 * @default [0, 0, 0, 0]
 * 
 * @help
 * プラグインコマンド
 * - BattlePopupDamage 表示値 Damage.pngの何行目の色を使うか 会心一击か (R G B Gray x y)
 * 例
 * - BattlePopupDamage \v[3] 0
 * - BattlePopupDamage \v[3] 1 false 255 -255 0 0
 * - BattlePopupDamage \v[3] 1 false 255 -255 0 0 100 200
 */

(function() {
  'use strict';
  const params = PluginManager.parameters('BattlePopupDamage');
  const popupX = parseInt(params['X座標']);
  const popupY = parseInt(params['Y座標']);
  const defaultTone = JSON.parse(params['コマンド使用時の色調']);

  var getArgNumber = function(text) {
    if(!text) return 0;
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    return parseInt(text);
  }

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'BattlePopupDamage') {
      var actor = $gameParty.leader();
      var tone = defaultTone;
      if(args.length > 6){
        tone = [getArgNumber(args[3]), getArgNumber(args[4]), getArgNumber(args[5]), getArgNumber(args[6])];
      }
      var x = args[7] == null ? popupX : getArgNumber(args[7]);
      var y = args[8] == null ? popupY : getArgNumber(args[8]);
      actor.setupDamagePopupFromCommand({
        value: getArgNumber(args[0]),
        row: getArgNumber(args[1]),
        isCritical: args[2] == 'true',
        tone: tone,
        x: x,
        y: y
      });
    }
		
	};

  Game_Actor.prototype.setupDamagePopupFromCommand = function(data) {
    this._popupBattleDamage = data;
  };

  Sprite_Actor.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
      var sprite = new Sprite_Damage();
      sprite.x = popupX;
      sprite.y = popupY;
      sprite.setup(this._battler);
      this._damages.push(sprite);
      this.getDamagePopupLayer().addChild(sprite);
      this._battler.clearDamagePopup();
      this._battler.clearResult();
    }else if(this._battler._popupBattleDamage){
      this.setupDamagePopupFromCommand(this._battler._popupBattleDamage)
      this._battler._popupBattleDamage = null;
    }
  };

  Sprite_Actor.prototype.setupDamagePopupFromCommand = function(data) {
    var sprite = new Sprite_Damage();
    sprite.x = data.x;
    sprite.y = data.y;
    sprite.setupFromCommand(data);
    sprite.children.forEach((child)=>{
      child.setColorTone(data.tone);
    });
    this._damages.push(sprite);
    this.getDamagePopupLayer().addChild(sprite);
  };

  Sprite_Actor.prototype.updateDamagePopup = function() {
    this.setupDamagePopup();
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; i++) {
        this._damages[i].update();
      }
      if (!this._damages[0].isPlaying()) {
        this.getDamagePopupLayer().removeChild(this._damages[0]);
        this._damages.shift();
      }
    }
  };

  Sprite_Actor.prototype.getDamagePopupLayer = function(){
    return this.parent.parent.parent;
  };

  Sprite_Damage.prototype.setupFromCommand = function(data) {
    this.createDigits(data.row, Math.abs(data.value));
    if(data.isCritical) this.setupCriticalEffect();
  };
    
})();

