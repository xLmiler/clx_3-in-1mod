//=============================================================================
// - BattleParallelEvent
// BattleParallelEvent.js
//=============================================================================

//=============================================================================
/*:
 * @plugindesc 戦闘中でも「並列処理」のコモンイベントを実行する為のプラグインです。
 * @author 名無し蛙,  改変 kido
 *
 * @help
 * Version 1.0:
 * 2016/06/29 - リリース
 *
 * Version 2.0:
 * 2019/05/28
 * 戦闘でのみ呼び出す並列コモンの最初に注釈コマンドで「戦闘時のみ」と入れてください。
 * マップでは呼ばれません。
 * 
 * マップでも戦闘でも呼び出したい場合は最初の注釈コマンドに「戦闘・マップ」と入れてください。
 *
*/
//=============================================================================

(function() {

  const BATTLE_ONLY = '戦闘時のみ';
  const BOTH = '戦闘・マップ';

  var _Game_Switches_onChange = Game_Switches.prototype.onChange;
  Game_Switches.prototype.onChange = function() {
    _Game_Switches_onChange.call(this);
    if ($gameParty.inBattle()) {
      $gameTroop.refreshCommonEvents();
    }
  };

  var _Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function(troopId) {
    _Game_Troop_setup.call(this, troopId);
    this._commonEvents = this.parallelCommonEvents().map(function(commonEvent) {
      return new Game_CommonEvent(commonEvent.id);
    });
  };

  Game_Troop.prototype.parallelCommonEvents = function() {
    return $dataCommonEvents.filter(function(commonEvent) {
      return commonEvent && commonEvent.trigger === 2 && 
       commonEvent.list[0].code == 108 && (
        commonEvent.list[0].parameters[0] == BATTLE_ONLY ||
        commonEvent.list[0].parameters[0] == BOTH);
    });
  };


  Game_Troop.prototype.refreshCommonEvents = function() {
    this._commonEvents.forEach(function(event) {
      event.refresh();
    });
  };

  Game_Troop.prototype.updateCommonEvents = function() {
    this._commonEvents.forEach(function(event) {
      event.update();
    });
  };

  var _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function() {
    $gameTroop.updateCommonEvents();
    _Scene_Battle_update.call(this);
  };

  var _parallelCommonEvents = Game_Map.prototype.parallelCommonEvents;
  Game_Map.prototype.parallelCommonEvents = function() {
    var commonEvents = _parallelCommonEvents.call(this);
    return commonEvents.filter(function(commonEvent) {
      return !(commonEvent.list[0].code == 108 && commonEvent.list[0].parameters[0] == BATTLE_ONLY);
    });
  };
})();
