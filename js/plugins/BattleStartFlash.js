/*---------------------------------------------------------------------------*
 * 2018/09/04
 * Ver.1.0
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc バトル開始のフラッシュを変えるプラグイン
 * @author kido
 * @help
 *  プラグインパラメータのデフォルト値はMVの戦闘前のフラッシュのデフォルト値です
 * 
 * 
 * @param flashTime
 * @desc フラッシュ時間(フレーム)
 * @default 30
 * 
 * @param flashCount
 * @desc フラッシュの回数(0～2)
 * @default 2
 * 
 * @param flashColorR
 * @desc フラッシュの色 R (0～255)
 * @default 255
 * 
 * @param flashColorG
 * @desc フラッシュの色 G (0～255)
 * @default 255
 * 
 * @param flashColorB
 * @desc フラッシュの色 B (0～255)
 * @default 255
 * 
 * @param flashColorA
 * @desc フラッシュの色 A (0～255)
 * @default 255
 */


(function(){

  const parameters = PluginManager.parameters('BattleStartFlash');
  const flashTime = Number(parameters['flashTime'] || 30);
  const flashCount = Number(parameters['flashCount'] || 2);
  const flashColorR = Number(parameters['flashColorR'] || 255);
  const flashColorG = Number(parameters['flashColorG'] || 255);
  const flashColorB = Number(parameters['flashColorB'] || 255);
  const flashColorA = Number(parameters['flashColorA'] || 255);

  const startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
  Scene_Map.prototype.startEncounterEffect = function() {
    startEncounterEffect.call(this);
    this.kdFlashCount = 0;
  };

  Scene_Map.prototype.startFlashForEncounter = function(duration) {
    if(this.kdFlashCount >= flashCount) return;
    this.kdFlashCount++;
    var color = [flashColorR, flashColorG, flashColorB, flashColorA];
    $gameScreen.startFlash(color, flashTime);
  };
})();
