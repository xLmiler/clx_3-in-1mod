/*:
 * @plugindesc スキップ機能付き可変ウェイト
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CallWait [time]
 */



// (function(){
//   const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
//   Game_Interpreter.prototype.pluginCommand = function(command, args) {
//     _Game_Interpreter_pluginCommand.call(this, command, args);
//     if (command === 'CallWait') {

//         var WaitTime = Number(args[0])
//         if(Input.isPressed('control')){
//             //スキップ中
//         }else{
//             this.wait(WaitTime)
//         }
//     }
//   };
// })()