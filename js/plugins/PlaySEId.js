/*---------------------------------------------------------------------------*
 * 2019/03/13 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc SEをIdで再生するプラグイン
 * @author kido0617（改変：しもや）
 * @help
 * ・プラグインコマンド
 *   PlaySEId id volume pitch pan
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'PlaySEId') {
      var id = args[0];
      var volume = Number(args[1]);
      var pitch = Number(args[2]);
      var pan = Number(args[3]);
      var index = $se_list.seID.indexOf(id);
      if(index != -1){
        var file =  $se_list.File[index];
        AudioManager.playSe({
          name: file,
          volume: isNaN(volume) ? 90 : volume,
          pitch: isNaN(pitch) ? 100 : pitch,
          pan: isNaN(pan) ? 0 : pan
        });
      }else{
        console.error(id + ' は見つかりません');
      }
            
    }
  };


})();