/*---------------------------------------------------------------------------*
 * 2019/03/13 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc Tickerでバトルメッセージを表示するプラグイン
 * @author kido0617（改変：しもや）
 * @help
 * ・プラグインコマンド
 *   TickerBTM ID
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'TickerBTM') {
        var BTMid = args[0];
        var Pattern = args[1];
        var ActorID = args[2];
        var BTM = $battle_message[BTMid][Pattern];
        if(BTM) TickerManager.show(`\\i[906]\\c[4]\\n[${ActorID}] : ${BTM}`);
      } 
    if (command === 'TickerBTMFL') {
        var BTMid = args[0];
        var Pattern = args[1];
        var BTM = $battle_message[BTMid][Pattern];
        if(BTM) TickerManager.show(`\\i[\\V[2868]]\\c[\\V[2869]]${BTM}`,false);
      } 
    }
  })();