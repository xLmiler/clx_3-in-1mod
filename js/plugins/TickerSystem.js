/*---------------------------------------------------------------------------*
 * 2019/03/13 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc Tickerでシステムメッセージを表示するプラグイン
 * @author kido0617（改変：しもや）
 * @help
 * ・プラグインコマンド
 *   TickerSys ID
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'TickerSys') {
        var id = args[0];
        var set = $system_message[id];
        if(set) TickerManager.show(`\\i[${set.icon}]${set.name}`);
      } 
    }
  })();