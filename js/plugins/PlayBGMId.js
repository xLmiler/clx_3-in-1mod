/*---------------------------------------------------------------------------*
 * 2019/03/13 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc BGMをIdで再生するプラグイン
 * @author kido0617
 * @help
 * ・プラグインコマンド
 *   PlayBGMId id volume pitch pan
 * 
 *   例1
 *   PlayBGMId Dungeon03 100 100 0
 *
 *   volumeは省略すると90、 pitchは100、 panは0 になります
 * 
 *   例2 pan省略
 *   PlayBGMId Dungeon03 50 100
 * 
 *   例3 pan、pitch省略
 *   PlayBGMId Dungeon03 50
 * 
 *   例4 pan、volume、pitch省略
 *   PlayBGMId Dungeon03
 * 
 * 
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'PlayBGMId') {
      let id = args[0];
      var volume = Number(args[1]);
      var pitch = Number(args[2]);
      var pan = Number(args[3]);
      var index = $bgm_list.bgmID.indexOf(id);
      if(index != -1){
        var file =  $bgm_list.File[index];
        var Avolume =  Number($bgm_list.AutoVolume[index]);
        AudioManager.playBgm({
          name: file,
          volume: isNaN(Avolume) ? 90 : Avolume,
          pitch: isNaN(pitch) ? 100 : pitch,
          pan: isNaN(pan) ? 0 : pan
        });
      }else{
        console.error(id + ' は見つかりません');
      }
            
    }
  };


})();