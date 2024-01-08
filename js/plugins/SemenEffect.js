(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CallSemen') {
        var SemenPart = args[0]
        if(args[2] != null){
            if (args[2].match(/\\v/)) {//変数を含む場合の処理
                array = args[2].match(/[0-9]+\.?[0-9]*/g);
                for(var i = 0; i < array.length; i++) {//戦闘の場合自動加算したい？
                    args[2] = Number(array);
                    var SemenMath = $gameVariables.value(args[2]);
                }
            }else{
                var SemenMath = Number(args[2])
            }
        }else{
            var SemenMath = 1
        }

        if(args[3] >= 1 || $gameSwitches.value(1982)){//1の場合回想
            var SemenScene = 1
        }else{
            var SemenScene = 0
        }

        //射精エフェクト
        var semenseid = args[1];
        //ランダム
        if(semenseid === "Random"){
            semenseid = "Semen01"
        }else if(semenseid === "RandomMulti"){
            semenseid = "SemenMulti01"
        }else if(semenseid === "0"){
            semenseid = "NoEffect"
        }else{}

        if(semenseid === "NoEffect"){
        }
        else if(semenseid != 0 || semenseid != null){
            
            var volume = 90;
            var pitch = 100;
            var pan = 0;
            var index = $se_list.seID.indexOf(semenseid);
            
            if(index != -1){
              var file =  $se_list.File[index];
              AudioManager.playSe({
                name: file,
                volume: isNaN(volume) ? 90 : volume,
                pitch: isNaN(pitch) ? 100 : pitch,
                pan: isNaN(pan) ? 0 : pan
              });
            }else{
              console.error(semenseid + ' は見つかりません');
            }
        }

        if(semenseid === "NoEffect"){
        }else{
            $gameScreen.startFlash([221,221,221,170], 60)
            this.wait(60)
        }
        

        //回想中分岐
        if(SemenScene == 0){
			
        }
   
    }
  };
})();