

/*---------------------------------------------------------------------------*
 * 2019/03/13 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 汎用経験呼び出し
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CommonEXP 内容 状況 回数
 */



(function(){
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);
      const actor = $gameActors.actor(1)
      if (command === 'CommonEXP') {
		var CallSemen = false;
		var Orgasm = 0;
        var PlayID = args[0]
        if(args[1] != null){
              var PlayType = args[1]//特殊なプレイなどに。0の場合は特になし
        }else{var PlayType = "なし"}
        if(args[2] != null){
            var PlayNum = Number(args[2])//プレイ回数(輪姦などは1回固定)
        }else{var PlayNum = 1}
        var Randomize = 0
        var PlayTypeArray = 0
        if(Number(args[3]) >= 1){
            Randomize = Number(args[3])//ランダム化,入力した値まで
            }
            var PlayArray = 0
            if(Randomize >= 1){
                randomNum = Math.randomInt(Randomize) + 1
            }else{
                randomNum = 0
            }

            //プレイ内容判定
            if(PlayID == "なし"){
                PlayArray = ["なし"]
            }
            else if(PlayID == "胸揉みセルフ"){
                PlayArray = ["乳首開発EXP"];
            }
            else if(PlayID == "乳首責めセルフ"){
                PlayArray = ["乳首開発EXP"];
            }
            else if(PlayID == "膣責めセルフ"){
                PlayArray = ["膣開発EXP"];
            }
            else if(PlayID == "肛穴責めセルフ"){
                PlayArray = ["肛穴開発EXP"];
            }
            else if(PlayID == "クリ責めセルフ"){
                PlayArray = ["陰核開発EXP"];
            }
            else if(PlayID == "胸揉み"){
                PlayArray = ["乳首開発EXP"];
            }
            else if(PlayID == "乳首責め"){
                PlayArray = ["乳首開発EXP"];
            }
			else if(PlayID == "口責め"){
                PlayArray = ["口開発EXP"];
            }
            else if(PlayID == "膣責め"){
                PlayArray = ["膣開発EXP"];
            }
            else if(PlayID == "肛穴責め"){
                PlayArray = ["肛穴開発EXP"];
            }
            else if(PlayID == "クリ責め"){
                PlayArray = ["陰核開発EXP"];
            }
            else if(PlayID == "視姦"){
                PlayArray = ["羞恥経験","羞恥EXP"];
            }
            else if(PlayID == "恥辱"){
                PlayArray = ["羞恥経験","羞恥EXP"];
            }
            else if(PlayID == "衣装破損"){
                PlayArray = ["羞恥経験","羞恥EXP"];
            }
            else if(PlayID == "屋外プレイ"){
                PlayArray = ["露出経験","羞恥EXP"];
            }
            else if(PlayID == "露出プレイ"){
                PlayArray = ["露出経験","羞恥EXP"];
            }
            else if(PlayID == "キス"){
                PlayArray = ["キス経験","口開発EXP"];
            }
            else if(PlayID == "ディープキス"){
                PlayArray = ["キス経験","口開発EXP"];
            }
            else if(PlayID == "セックス"){
                PlayArray = ["セックス経験","膣開発EXP"];
            }  
            else if(PlayID == "アナルセックス"){
                PlayArray = ["アナルセックス経験","肛穴開発EXP"];
            }
            else if(PlayID == "手コキ"){
                PlayArray = ["奉仕経験","奉仕EXP"];
            }
            else if(PlayID == "フェラチオ"){
                PlayArray = ["奉仕経験","奉仕EXP"];
            }
            else if(PlayID == "パイズリ"){
                PlayArray = ["奉仕経験","奉仕EXP"];
            }
            else if(PlayID == "イラマチオ"){
                PlayArray = ["奉仕経験","奉仕EXP","被虐経験","被虐EXP"];
            }
            else if(PlayID == "素股"){
                PlayArray = ["特殊奉仕経験","奉仕EXP","陰核開発EXP"];
            }
            else if(PlayID == "尻コキ"){
                PlayArray = ["肛穴開発EXP"];
            }
            else if(PlayID == "淫語"){
                PlayArray = ["淫語経験"];
            }
            else if(PlayID == "覗かれ"){
                PlayArray = ["露出経験","羞恥EXP"];
            }
            else if(PlayID == "被虐"){
                PlayArray = ["被虐経験","被虐EXP"];
            }
            else if(PlayID == "両穴セックス"){
                PlayArray = ["セックス経験","膣開発EXP","アナルセックス経験","肛穴開発EXP"];
            }
            else if(PlayID == "三穴セックス"){
                PlayArray = ["奉仕経験","奉仕EXP","セックス経験","膣開発EXP","アナルセックス経験","肛穴開発EXP"];
            }
			else if(PlayID == "ぶっかけ颜"){
                PlayArray = ["浴精経験","精液経験","精液EXP"];
				CallSemen = true;
            }
            else if(PlayID == "ぶっかけ"){
                PlayArray = ["浴精経験","精液経験","精液EXP"];
				CallSemen = true;
            }
            else if(PlayID == "膣内射精"){
                PlayArray = ["精液経験","膣内射精経験","精液EXP"];
				CallSemen = true;
            }
            else if(PlayID == "肛内射精"){
                PlayArray = ["精液経験","肛内射精経験","精液EXP"];
				CallSemen = true;
            }
            else if(PlayID == "口内射精"){
                PlayArray = ["精液経験","飲精経験","精液EXP"];
				CallSemen = true;
            }
            else if(PlayID == "絶頂" || PlayID == "絶頂経験"){
                PlayArray = ["絶頂経験"];
				Orgasm = 1;
            }
            else if(PlayID == "強絶頂"){
                PlayArray = ["強絶頂経験"];
				Orgasm = 2;
            }
            else if(PlayID == "絶頂失神"){
                PlayArray = ["絶頂失神経験"];
            }
            else if(PlayID == "特殊絶頂"){
                PlayArray = ["特殊絶頂経験"];
            }
            else{
                PlayArray = ["なし"];
                {console.error(PlayArray + 'コマンド名指定ミス');}
            }

            //プレイタイプ、シチュエーションなど
            if(PlayType == "ノーマル" || PlayType == "合意" || PlayType == "和姦" ){
                PlayTypeArray = ["なし"];
            }
            else if(PlayType == "なし"){
                PlayTypeArray = ["なし"];
            }
            else if(PlayType == "愛撫"){
                PlayTypeArray = ["愛撫経験"];
            }
            else if(PlayType == "オナニー"){
                PlayTypeArray = ["自慰経験"];
            }
            else if(PlayType == "レイプ"){
                PlayTypeArray = ["凌辱経験"];
            }
            else if(PlayType == "敗北凌辱"){
                PlayTypeArray = ["敗北凌辱経験"];
            }
            else if(PlayType == "痴漢"){
                PlayTypeArray = ["痴漢経験"];
            }
            else if(PlayType == "セクハラ"){
                PlayTypeArray = ["セクハラ経験"];
            }
            else if(PlayType == "触手"){
                PlayTypeArray = ["触手経験"];
            }
            else if(PlayType == "怪魔接触" || PlayType == "怪魔"){
                PlayTypeArray = ["怪魔接触経験"];
            }
            else if(PlayType == "輪姦"){
                PlayTypeArray = ["輪姦経験"];
            }
            else if(PlayType == "肉便器"){
                PlayTypeArray = ["便器経験"];
            }
            else if(PlayType == "催眠"){
                PlayTypeArray = ["催眠経験"];
            }
            else if(PlayType == "洗脳"){
                PlayTypeArray = ["洗脳経験"];
            }
            else if(PlayType == "売春"){
                PlayTypeArray = ["売春経験"];
            }
            else if(PlayType == "敗北監禁"){
                PlayTypeArray = ["監禁経験"];
            }
            else if(PlayType == "学園淫行"){
                PlayTypeArray = ["学園淫行経験"];
            }
            else if(PlayType == "マッサージ"){
                PlayTypeArray = ["マッサージ経験"];
            }
            else if(PlayType == "水泳"){
                PlayTypeArray = ["水泳経験"];
            }
            else if(PlayType == "運動"){
                PlayTypeArray = ["運動経験"];
            }
            else if(PlayType == "授業"){
                PlayTypeArray = ["授業経験"];
            }
            else if(PlayType == "読書"){
                PlayTypeArray = ["読書経験"];
            }
            else if(PlayType == "ポルノ視聴"){
                PlayTypeArray = ["ポルノ視聴経験","読書経験"];
            }
            else if(PlayType == "公開凌辱"){
                PlayTypeArray = ["公開凌辱経験"];
            }
            else if(PlayType == "寄生"){
                PlayTypeArray = ["寄生経験"];
            }
            else if(PlayType == "撮影"){
                PlayTypeArray = ["撮影経験"];
            }
            else if(PlayType == "呪刻"){
                PlayTypeArray = ["呪刻経験"];
            }
            else if(PlayType == "妊娠"){
                PlayTypeArray = ["妊娠経験"];
            }
            else if(PlayType == "誘惑"){
                PlayTypeArray = ["誘惑経験"];
            }
            else if(PlayType == "食事"){
                PlayTypeArray = ["食事経験"];
            //すべてあてはまらない
            }else{
                PlayTypeArray = ["なし"];
                {console.error(PlayTypeArray + 'コマンド名指定ミス');}
            }
		
		if(Orgasm > 0){
			//1033为淫欲阶段
			if(Orgasm > 1) var b = (-$gameVariables.value(1033) + 7) / 2;
			else var b = -$gameVariables.value(1033) + 5;
			Orgasm += PlayNum + randomNum - 1;
			//快感发情处理
			$gameVariables._data[1026] *= ((0.8 - Orgasm * 0.4) + (0.2 + Orgasm * 0.4) * $gameVariables.value(1243) / 100).clamp(0,0.9);
			$gameVariables._data[1027] -= Math.max(b * 5 * Orgasm - 5 + Math.randomInt(11),1);
			//高潮扣血蓝处理
			Orgasm *= (100 - $gameVariables.value(1281)) / 100;
			if($gameParty.inBattle()){
				actor.gainHp(-Math.round(actor.mhp * Orgasm / 20));
			}else{
				actor.gainHp(-Math.round(Math.min(actor.mhp * Orgasm / 20,actor.hp - 1)));
			}
			var a = actor.mmp * Orgasm / 30;
			if(actor.mp > -actor.mmp){//触手吸收
				$gameSwitches._data[2916] = true;
				$gameVariables._data[4893] = Math.min(actor.mp,a) * 4;
			}else{
				$gameSwitches._data[2916] = false;
			}
			actor.gainMp(-a);
			actor.gainSilentTp(-Math.round(16 * Orgasm));
			//事件附加余韵
			if($gameVariables.value(4762) > 0 || !$gameSwitches.value(2915)){
			   $gameVariables._data[4762] = Math.min($gameVariables.value(4762),0);
			   $gameSwitches._data[2915] = true;
			}
		}
		
		if(CallSemen){
			if(PlayID == "ぶっかけ颜"){
                $gameVariables._data[941] = $gameVariables.value(941) + PlayNum + randomNum
                $gameVariables._data[2020] = $gameVariables.value(2020) + PlayNum + randomNum//ぶっかけ値
            }
            else if(PlayID == "ぶっかけ"){
                $gameVariables._data[942] = $gameVariables.value(942) + PlayNum + randomNum
                $gameVariables._data[2020] = $gameVariables.value(2020) + PlayNum + randomNum//ぶっかけ値
            }
            else{
			if(actor._classId > 2){
				actor.gainMp((PlayNum + randomNum) * actor.mmp * 0.1);
				actor.gainHp((PlayNum + randomNum) * actor.mhp * 0.15);
				actor.gainSilentTp((PlayNum + randomNum) * 10);
			}
			if(PlayID == "膣内射精"){
                $gameVariables._data[944] = $gameVariables.value(944) + PlayNum + randomNum
                actor.addState(37)
				if($gameVariables.value(944) > 1){
					$gameVariables._data[942] = $gameVariables.value(942) + PlayNum + randomNum
					$gameVariables._data[2020] = $gameVariables.value(2020) + PlayNum + randomNum		
				}					
				this.pluginCommand('ExtasySemen',[0]);
				if(actor.isLearnedSkill(960)){
					if(actor.isStateAffected(96)){
						actor.save.luna += 1;
						this.setupChild($dataCommonEvents[1046].list, 0)
					}	
				}
            }
            else if(PlayID == "肛内射精"){
                $gameVariables._data[945] = $gameVariables.value(945) + PlayNum + randomNum
                actor.addState(38)
				if($gameVariables.value(945) > 1){
					$gameVariables._data[942] = $gameVariables.value(942) + PlayNum + randomNum
					$gameVariables._data[2020] = $gameVariables.value(2020) + PlayNum + randomNum		
				}				
            }
            else if(PlayID == "口内射精"){
                $gameVariables._data[943] = $gameVariables.value(943) + PlayNum + randomNum
                actor.addState(39)
				if($gameVariables.value(943) > 1){
					$gameVariables._data[941] = $gameVariables.value(941) + PlayNum + randomNum
					$gameVariables._data[2020] = $gameVariables.value(2020) + PlayNum + randomNum		
				}
                this.pluginCommand('SkillSemenDrunker',[0]);//飲精スキル
            }
			}


            $gameVariables._data[360] = 0;
	    }

        if(PlayArray[0] != 0){
            for(var i = 0; i < PlayArray.length; i++){
                if(PlayArray[i] == "なし"){}
                if(PlayArray[i] == "キス経験"){$gameVariables._data[2042] += PlayNum + randomNum}
                if(PlayArray[i] == "奉仕経験"){$gameVariables._data[2051] += PlayNum + randomNum}
                if(PlayArray[i] == "特殊奉仕経験"){$gameVariables._data[2052] += PlayNum + randomNum}
                if(PlayArray[i] == "淫語経験"){$gameVariables._data[2161] += PlayNum + randomNum}
                if(PlayArray[i] == "露出経験"){$gameVariables._data[2149] += PlayNum + randomNum}
                if(PlayArray[i] == "被虐経験"){$gameVariables._data[2076] += PlayNum + randomNum}
                if(PlayArray[i] == "羞恥経験"){$gameVariables._data[2062] += PlayNum + randomNum}
                if(PlayArray[i] == "セックス経験"){
					$gameVariables._data[2045] += PlayNum + randomNum;
					$gameVariables._data[4875] -= Math.min((PlayNum + randomNum)*500,$gameVariables.value(4875));
					actor.biriSocks();
				}
                if(PlayArray[i] == "アナルセックス経験"){
					$gameVariables._data[2046] += PlayNum + randomNum
					actor.biriSocks();
				}
                if(PlayArray[i] == "人外セックス経験"){$gameVariables._data[2047] += PlayNum + randomNum}
                if(PlayArray[i] == "人外アナルセックス経験"){$gameVariables._data[2048] += PlayNum + randomNum}
                if(PlayArray[i] == "浴精経験"){$gameVariables._data[2054] += PlayNum + randomNum}
                if(PlayArray[i] == "膣内射精経験"){$gameVariables._data[2053] += PlayNum + randomNum}
                if(PlayArray[i] == "肛内射精経験"){$gameVariables._data[2056] += PlayNum + randomNum}
                if(PlayArray[i] == "飲精経験"){
					$gameVariables._data[2055] += PlayNum + randomNum;
					$gameVariables._data[4876] -= Math.min((PlayNum + randomNum)*500,$gameVariables.value(4876));
				}
                if(PlayArray[i] == "絶頂経験"){$gameVariables._data[2057] += PlayNum + randomNum}
                if(PlayArray[i] == "強絶頂経験"){$gameVariables._data[2058] += PlayNum + randomNum}
                if(PlayArray[i] == "絶頂失神経験"){$gameVariables._data[2059] += PlayNum + randomNum}
                if(PlayArray[i] == "特殊絶頂経験"){$gameVariables._data[2060] += PlayNum + randomNum}
                if(PlayArray[i] == "口開発EXP"){$gameVariables._data[2122] += PlayNum + randomNum}
                if(PlayArray[i] == "乳首開発EXP"){$gameVariables._data[2123] += PlayNum + randomNum}
                if(PlayArray[i] == "陰核開発EXP"){$gameVariables._data[2124] += PlayNum + randomNum}
                if(PlayArray[i] == "膣開発EXP"){$gameVariables._data[2126] += PlayNum + randomNum}
                if(PlayArray[i] == "肛穴開発EXP"){$gameVariables._data[2125] += PlayNum + randomNum}
            }
        }
        if(PlayTypeArray[0] != 0){
            for(var i = 0; i < PlayTypeArray.length; i++){
                if(PlayTypeArray[i] == "なし"){}
                if(PlayTypeArray[i] == "愛撫経験"){$gameVariables._data[2041] += PlayNum}
                if(PlayTypeArray[i] == "凌辱経験"){$gameVariables._data[2061] += PlayNum}
                if(PlayTypeArray[i] == "敗北凌辱経験"){
					$gameVariables._data[2070] += PlayNum;
					if(!ConfigManager.noPaint) $gameVariables._data[4900] += 1;
				}
                if(PlayTypeArray[i] == "痴漢経験"){$gameVariables._data[2063] += PlayNum}
                if(PlayTypeArray[i] == "自慰経験"){$gameVariables._data[2043] += PlayNum}
                if(PlayTypeArray[i] == "セクハラ経験"){$gameVariables._data[2152] += PlayNum}
                if(PlayTypeArray[i] == "触手経験"){$gameVariables._data[2156] += PlayNum}
                if(PlayTypeArray[i] == "怪魔接触経験"){$gameVariables._data[2155] += PlayNum}
                if(PlayTypeArray[i] == "輪姦経験"){$gameVariables._data[2065] += PlayNum}
                if(PlayTypeArray[i] == "便器経験"){
					$gameVariables._data[2066] += PlayNum;
					if(!ConfigManager.noPaint) $gameVariables._data[4900] += 1;
				}
                if(PlayTypeArray[i] == "催眠経験"){$gameVariables._data[2067] += PlayNum}
                if(PlayTypeArray[i] == "洗脳経験"){$gameVariables._data[2068] += PlayNum}
                if(PlayTypeArray[i] == "売春経験"){$gameVariables._data[2069] += PlayNum}
                if(PlayTypeArray[i] == "監禁経験"){$gameVariables._data[2071] += PlayNum}
                if(PlayTypeArray[i] == "妊娠経験"){$gameVariables._data[2072] += PlayNum}
                if(PlayTypeArray[i] == "学園淫行経験"){$gameVariables._data[2175] += PlayNum}
                if(PlayTypeArray[i] == "マッサージ経験"){$gameVariables._data[2142] += PlayNum}
                if(PlayTypeArray[i] == "水泳経験"){$gameVariables._data[2141] += PlayNum}
                if(PlayTypeArray[i] == "運動経験"){$gameVariables._data[2143] += PlayNum}
                if(PlayTypeArray[i] == "授業経験"){$gameVariables._data[2144] += PlayNum}
                if(PlayTypeArray[i] == "読書経験"){$gameVariables._data[2145] += PlayNum}
                if(PlayTypeArray[i] == "ポルノ視聴経験"){$gameVariables._data[2150] += PlayNum}
                if(PlayTypeArray[i] == "公開凌辱経験"){$gameVariables._data[2078] += PlayNum}
                if(PlayTypeArray[i] == "食事経験"){$gameVariables._data[2146] += PlayNum}
                if(PlayTypeArray[i] == "撮影経験"){$gameVariables._data[2064] += PlayNum}
                if(PlayTypeArray[i] == "呪刻経験"){$gameVariables._data[2075] += PlayNum}
                if(PlayTypeArray[i] == "寄生経験"){$gameVariables._data[2073] += PlayNum}
                if(PlayTypeArray[i] == "誘惑経験"){$gameVariables._data[2151] += PlayNum}
            }
        }
    }
};
})();












