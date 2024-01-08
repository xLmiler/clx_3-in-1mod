/*---------------------------------------------------------------------------*
 * 2019/03/13 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc BGSをIdで再生するプラグイン
 * @author kido0617（改変：しもや）
 * @help
 * ・プラグインコマンド
 *   PlayBGSId id volume pitch pan
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'PlayBGSId') {
      var id = args[0];
      var volume = Number(args[1]);
      var pitch = Number(args[2]);
      var pan = Number(args[3]);
      var index = $bgs_list.bgsID.indexOf(id);
      if(index != -1){
        var file =  $bgs_list.File[index];
        AudioManager.playBgs({
          name: file,
          volume: isNaN(volume) ? 90 : volume,
          pitch: isNaN(pitch) ? 100 : pitch,
          pan: isNaN(pan) ? 0 : pan
        });
      }else{
        console.error(id + ' は見つかりません');
      }
            
    }
    if (command === 'PlayBGVId') {
      if($gameSwitches.value(40)){
        this.pluginCommand("PB_BGS_CHANGE_LINE", ['5'])
        var id = args[0];
        var ReturnLine = "2"
        var index = $bgs_list.bgsID.indexOf(id);

        if(index != -1){
          var file =  $bgs_list.File[index];
          AudioManager.playBgs({
            name: file,
            volume: 90,
            pitch: 100,
            pan: 0
          });
        }else{
          console.error(id + ' は見つかりません');
        }
        if(ReturnLine != null){this.pluginCommand("PB_BGS_CHANGE_LINE", [ReturnLine])}

      }else{console.log('BGVオフ');}
            
    }
    if (command === 'StopBGV') {
      if($gameSwitches.value(40)){
        this.pluginCommand("PB_BGS_CHANGE_LINE", ['5'])
        var ReturnLine = args[0];
        AudioManager.playBgs({name: ''});
        if(ReturnLine != null){this.pluginCommand("PB_BGS_CHANGE_LINE", [ReturnLine])}

      }
            
    }
    if (command === 'StopBGS') {
        this.pluginCommand("PB_BGS_CHANGE_LINE", ['2'])
        var ReturnLine = args[0];
        AudioManager.playBgs({name: ''});
        if(ReturnLine != null){this.pluginCommand("PB_BGS_CHANGE_LINE", [ReturnLine])}
            
    }
  };


})();