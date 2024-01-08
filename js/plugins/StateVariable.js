/*---------------------------------------------------------------------------*
 * 2020/02/10 @kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 最後にアクターにかかったor解除されたステートIDを変数に保存する
 * @author kido
 * @help

 * 
 * @param 保存する変数番号
 * @desc 保存する変数番号
 * @type variable
 * @default 0
 * 
 */


(function () {

  const parameters = PluginManager.parameters('StateVariable');
  const vNum = Number(parameters['保存する変数番号'] || 0);

  var _Game_BattlerBase_addNewState      = Game_BattlerBase.prototype.addNewState;
  Game_BattlerBase.prototype.addNewState = function(stateId) {
    if (this instanceof Game_Actor && !this._states.contains(stateId)) {
      $gameVariables.setValue(vNum, stateId);
    }
    _Game_BattlerBase_addNewState.apply(this, arguments);
  };

  var _Game_BattlerBase_eraseState      = Game_BattlerBase.prototype.eraseState;
  Game_BattlerBase.prototype.eraseState = function(stateId) {
    if (this instanceof Game_Actor && this._states.contains(stateId)) {
      $gameVariables.setValue(vNum, stateId);
    }
    _Game_BattlerBase_eraseState.apply(this, arguments);
  };

  var _Game_BattlerBase_clearStates      = Game_BattlerBase.prototype.clearStates;
  Game_BattlerBase.prototype.clearStates = function() {
    if (this instanceof Game_Actor && this._states) {
      this._states.forEach(function(stateId) {
        $gameVariables.setValue(vNum, stateId);
      }.bind(this));
    }
    _Game_BattlerBase_clearStates.apply(this, arguments);
  };

})();
