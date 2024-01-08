(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CallAM') {
        var AMID = args[0];
        var ParaID = args[1];
        var MessageType = args[2];
        var AMTicker = AMID
        var AMType = 0
        var AMLV = $battle_message[AMID].AMLV
        var ELV = $battle_message[AMID].ELV

        //淫乱レベル
        //console.error(AMLV)
        if(AMLV == 'TRUE'){
            
            var LustLV = $gameVariables.value(1033)
            if(LustLV >= 3){var AMLustLV = 'L3'}
            else if(LustLV >= 2){var AMLustLV = 'L2'}
            else{var AMLustLV = 'L1'}

            AMTicker += AMLustLV
        }


        if(ELV == 'TRUE'){
            //基礎パラ
            if(ParaID == "Mouth"){ParaBase = $gameVariables.value(1102);AMType = 1}
            else if(ParaID == "Nipple"){ParaBase = $gameVariables.value(1103);AMType = 1}
            else if(ParaID == "Clit"){ParaBase = $gameVariables.value(1104);AMType = 1}
            else if(ParaID == "Vagina"){ParaBase = $gameVariables.value(1106);AMType = 1}
            else if(ParaID == "Anus"){ParaBase = $gameVariables.value(1105);AMType = 1}
            else if(ParaID == "Shame"){ParaBase = $gameVariables.value(1093);AMType = 5}
            else if(ParaID == "Semen"){ParaBase = $gameVariables.value(1272);AMType = 1}
            else if(ParaID == "Maso"){ParaBase = $gameVariables.value(1273);AMType = 1}
            else if(ParaID == "Service"){ParaBase = $gameVariables.value(1274);AMType = 1}
            //else if(ParaID == "Pervert"){ParaBase = $gameVariables.value(1275);AMType = 1}

            //性感や発情
            else if(ParaID == "Estrus"){ParaBase = $gameVariables.value(1027);AMType = 2}
            else if(ParaID == "Extasy"){ParaBase = $gameVariables.value(1026);AMType = 3}
            else if(ParaID == "BindEX"){ParaBase = $gameVariables.value(414);AMType = 4}
            else{ParaBase = 0;AMType = 1}

            //段階判定基準値
            if(AMType == 1){var E1 = 0; var E2 = 2; var E3 = 4}//開発度
            else if(AMType == 2){var E1 = 0; var E2 = 50; var E3 = 100}//発情
            else if(AMType == 3){var E1 = 0; var E2 = 400; var E3 = 800}//快感度
            else if(AMType == 4){var E1 = 500; var E2 = 1000; var E3 = 2000}//拘束中快感
			else if(AMType == 5){var E1 = 0; var E2 = 50; var E3 = 100}//羞耻度

            if(ParaBase >= E3){var AMParaLV = 'E3'}
            else if(ParaBase >= E2){var AMParaLV = 'E2'}
            else{var AMParaLV = 'E1'}

            AMTicker += AMParaLV
        }



        //パターン
        var AMRandom = Math.floor( Math.random() * 3) + 1
        var Pattern =  'N' + AMRandom
        var ActorID = 1

        //console.error(AMTicker)

        if(MessageType == '0' || MessageType == null){
            var ACMS = $battle_message[AMTicker][Pattern]
            if(ACMS) TickerManager.show(`\\i[906]\\c[4]\\n[${ActorID}] : ${ACMS}`);
        }else{
            var ACMS = $battle_message[AMTicker].F1;
            if(ACMS && ACMS != 'N/A') TickerManager.show(`\\i[\\V[2868]]\\c[\\V[2869]]${ACMS}`,false);
        }

      } 
    }
  })();