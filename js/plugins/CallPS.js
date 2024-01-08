// (function(){
//   const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
//   Game_Interpreter.prototype.pluginCommand = function(command, args) {
//     _Game_Interpreter_pluginCommand.call(this, command, args);
//     if (command === 'CallProstitute') {
//       var MessagePT = args[1]
//       var arg_value = Number(args[0].match(/\\v\[(\d+)\]/))
//       var PSID = 0
//       if (arg_value) {
//         PSID = $gameVariables.value(arg_value);
//       }          
//       var PSMS = $psmessage[PSID][MessagePT]
        
//         if(PSMS == "なし"){} else
//         {
//           TickerManager.show(`\\i[892]\\C[27]${PSMS}`)
//         }
//       } 
//     }
//   })();