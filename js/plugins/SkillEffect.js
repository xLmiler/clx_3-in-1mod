

(function(){
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        var ActorID = 1

        if (command === 'SkillSemenDrunker') {
            var SkillLV = $gameVariables.value(1240)
            if(SkillLV != 0){
                $gameVariables._data[2027] = $gameVariables.value(2027) + SkillLV
            }//飲精スキル
        }


        if (command === 'SkillSexualAppeal') {
            var SkillLV = $gameVariables.value(1200) 
            if(SkillLV != 0){
                $gameVariables._data[1502] = $gameVariables.value(1502) + SkillLV//痴漢
                //その他変質者
            }//痴漢遭遇率など
        }

    
    };          
})();