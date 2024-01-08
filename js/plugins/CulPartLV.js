/*:
 * @plugindesc 開発度LVアップ計算
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CulPartLV 部位変数番号 最大レベル
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CulPartLV') {


        var PartVar = Number(args[0])//部位変数番号
        var NowLV = $gameVariables.value(PartVar) //現在の部位レベル
        var MAXLV = Number(args[1]) //開発度最大レベル

        //経験値計算用
        var NextEXP = 0
        var EXPBASE = 33 //基本値
        var EXPPER = 1.1 //倍率
        var EXPADD = NowLV + 1 //加算値
        //EXPADD * 30 //現在のレベルのn倍
        //NextEXP = EXPBASE + (EXPADD * EXPPER)
        //計算式
        NextEXP = 33 + 44 * NowLV;
        

        NextEXP = Math.floor(NextEXP)//小数点を消す


        //経験値加算用(変数番号+20)
        var NowEXP = PartVar + 20

        //加算演出用(変数番号+1000)
        var DisplayLVUP = PartVar + 1000

        //加算処理
        if($gameVariables.value(PartVar) < $gameVariables.value(MAXLV) && $gameVariables.value(NowEXP) >= NextEXP){
            $gameVariables._data[NowEXP] = $gameVariables.value(NowEXP) - NextEXP //現在経験値からレベルアップ分マイナス
            $gameVariables._data[DisplayLVUP] = $gameVariables.value(DisplayLVUP) + 1 //レベル加算演出用
            
        }else if($gameVariables.value(PartVar) >= $gameVariables.value(MAXLV)){//最大値の場合経験値リセット
            $gameVariables._data[NowEXP] = 0
        }else{}


    }
    if (command === 'CulLustLV') {
        var LustEXP = $gameVariables.value(1140)    
        if($gameVariables.value(1021) >= $gameVariables.value(1034)){
            $gameVariables._data[1140] = 0
        }
        
        if(LustEXP >= 100){
            var AddLust = LustEXP / 100
            AddLust = Math.floor(AddLust)
            $gameVariables._data[2021] = $gameVariables.value(2021) + AddLust
            $gameVariables._data[1140] = $gameVariables.value(1140) - AddLust * 100
        }
    }
    if (command === 'CulMiasmaLV') {
        var MiasmaEXP = $gameVariables.value(1139)    
        if($gameVariables.value(1030) >= $gameVariables.value(1037)){
            $gameVariables._data[1139] = 0
        }
        
        if(MiasmaEXP >= 100){
            var AddMiasma = MiasmaEXP / 100
            AddMiasma = Math.floor(AddMiasma)
            $gameVariables._data[2030] = $gameVariables.value(2030) + AddMiasma
            $gameVariables._data[1139] = $gameVariables.value(1139) - AddMiasma * 100
        }
    }
  };
})()


