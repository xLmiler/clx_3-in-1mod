/*---------------------------------------------------------------------------*
 * 2020/01/7 shimo8
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc カットイン表示プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   callcutin ID アニメX アニメY SE(1以上でオン) BGS(1以上でオン)
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CallCutin') {
    //プラグインコマンド


    if (args[0].match(/\\v/)) {//変数を含む場合の処理
      array = args[0].match(/[0-9]+\.?[0-9]*/g);
      for(var i = 0; i < array.length; i++) {//戦闘の場合自動加算したい？
          args[0] = array;
          var EroCutinAddID = $gameVariables.value(args[0]);//カットイン名
      }
    }else{
      var EroCutinAddID = args[0]//カットイン名
    }

if(args[1] != null){var AnimeX = Number(args[1])}else{var AnimeX = 0};//アニメーション座標X
if(args[2] != null){var AnimeY = Number(args[2])}else{var AnimeY = 0};//アニメーション座標Y
if(args[3] != null){var CutinSE = args[3]}else{var CutinSE = 0};//SEフラグ
if(args[4] != null){var CutinBGS = args[4]}else{var CutinBGS = 0};//BGSフラグ

//ゲーム中の装備番号
var EqCloth = 1
var EqLeg =7


//表示中
$gameSwitches.setValue(155,true)

//呼び出しファイル名入力用
var Dif2ID = "なし"
var DifID = "なし"
var DifSE = "なし"
var DifSemen = "なし"
var Dif3ID = "なし"
var DifBGS = "なし"//未使用

//座標
var Cutin1X = 240
var Cutin1Y = 256

var user = $gameActors.actor(1);
var StandPoseID = 1;
//着用中衣装パラメータ
var EqNum = 0;
var Nipple = true;
var FileNameCloth = 0;
if($gameActors._data[1]._equips[EqCloth]._itemId >= 5){
	EqNum = $gameActors._data[1]._equips[EqCloth]._itemId;
	var CLOTHTAG = $dataArmors[EqNum].meta.ClothName;
  if(EqNum == 65 && user.isStateAffected(94)) EqNum = 61
  if(EqNum == 65 && user.isStateAffected(95)) EqNum = 62
	if(EqNum == 67 && user.isStateAffected(94)) EqNum = 68
  if(EqNum == 67 && user.isStateAffected(95)) EqNum = 69
	if(EqNum == 71 && user.isStateAffected(94)) EqNum = 72;
	if(EqNum == 71 && user.isStateAffected(95)) EqNum = 73;
  if(EqNum == 76 && user.isStateAffected(94)) EqNum = 63;
	if(EqNum == 76 && user.isStateAffected(95)) EqNum = 64;
	/*if(EqNum == 77 && $gameActors.actor(1).isStateAffected(95)) EqNum = 78;*/
	var UNDERFLAG = Number($dataArmors[EqNum].meta.ClothUnderFlag); //下着
	FileNameCloth = $dataArmors[EqNum].meta.PID;
if([65,61,62].includes(EqNum) && user.isStateAffected(88)) FileNameCloth += 'b';
	if(!$dataArmors[EqNum].meta["CutinNipple"]) Nipple = false;
}else{
	var CLOTHTAG = 'Naked';
	var UNDERFLAG = 1;
}

//変身中か否か
if($gameSwitches.value(131)){
  var ChangeFlag = true
}else{
  var ChangeFlag = false
}

//下着つけていない、かつ下着フラグオンの時
if($gameActors._data[1]._equips[12]){
	var k = $gameActors._data[1]._equips[12]._itemId;
	if(k >= 5){
		if($dataArmors[k].meta.ForceDisplay)  UNDERFLAG = 1;
		if(UNDERFLAG >= 1 && Nipple && !$dataArmors[k].meta["CutinNipple"]) Nipple = false;
	}else{
		UNDERFLAG = 0;
	}
}else{UNDERFLAG = 0;}

    
//定義
var CUTINBASENUM = 0//部位ベース名
var CUTINFILENUM = 0//ファイル名末尾の番号
var CUTINCLOTHFLAG = 0//衣装反映の有無
var CUTINTITESFLAG = 0//タイツ反映
var CUTINOPTIONFLAG = 0//下着反映(タイツが優先)
var CUTINALTFLAG = 0//変身差分(ベース番号に加算)
var nocloth = 0

//相手タイプ
//胸
if(EroCutinAddID == "乳首弄り"){
  var Dif2ID = "なし"
  var DifID = "finger_0001"
  var DifSE = "Knead01"//SE
  CUTINBASENUM = "breast"
  CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸揉み前"){
    var Dif2ID = "なし"
    var DifID = "knead_0001"
    var DifSE = "Knead01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸揉み後ろ"){
    var Dif2ID = "なし"
    var DifID = "knead_0002"
    var DifSE = "Knead01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "花弁触手_胸"){
    var Dif2ID = "なし"
    var DifID = "tentacle_0001"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "繊毛触手_胸"){
    var Dif2ID = "なし"
    var DifID = "tentacle_0002"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "怪魔舌_胸"){
    var Dif2ID = "なし"
    var DifID = "tongue_0001"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "舔胸"){
    var Dif2ID = "なし"
    var DifID = "tongue_0002"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "スライム_胸"){
    var Dif2ID = "なし"
    var DifID = "slime_0001"
    var DifSE = "Slime01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "噴乳"){
    var Dif2ID = "なし"
    var DifID = "milk"
    var DifSE = "Splash01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸撮影"){
    var Dif2ID = "なし"
    var DifID = "なし"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸注射动_1"){
    var Dif2ID = "なし"
    var DifID = "needle_0001"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸注射动_2"){
    var Dif2ID = "なし"
    var DifID = "needle_0002"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸注射动_3"){
    var Dif2ID = "なし"
    var DifID = "needle_0003"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸注射动_4"){
    var Dif2ID = "なし"
    var DifID = "needle_0004"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if (EroCutinAddID == "胸注射动_5"){
    var Dif2ID = "なし"
    var DifID = "needle_0005"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if (EroCutinAddID == "胸刺环_1"){
    var Dif2ID = "なし"
    var DifID = "なし"
    var DifSE = "なし"//SE
    CUTINBASENUM = "acme"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if (EroCutinAddID == "胸刺环_2"){
    var Dif2ID = "なし"
    var DifID = "continuous"
    var DifSE = "なし"//SE
    CUTINBASENUM = "acme"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if (EroCutinAddID == "鼻刺环_1"){
    var Dif2ID = "なし"
    var DifID = "なし"
    var DifSE = "なし"//SE
    CUTINBASENUM = "kiss"
    CUTINFILENUM = 1//ベースファイル開始番号

  }
  else if (EroCutinAddID == "鼻刺环_2"){
    var Dif2ID = "なし"
    var DifID = "continuous"
    var DifSE = "なし"//SE
    CUTINBASENUM = "kiss"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "乳交_1"){
    var Dif2ID = "なし"
    var DifID = "なし"
    var Dif3ID = "sex01"
    var DifSE = "Knead01"//SE
    CUTINBASENUM = "breast"
    nocloth = 1
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "乳交_2"){
    var Dif2ID = "なし"
    var Dif2ID = "なし"
    var Dif3ID = "sex02"
    var DifSE = "Knead01"//SE
    CUTINBASENUM = "breast"
    nocloth = 1
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "乳交_射精"){
    var Dif2ID = "なし"
    var Dif2ID = "なし"
    var DifSemen = "Semen_0001"
    var DifSE = "Knead01"//SE
    CUTINBASENUM = "breast"
    nocloth = 1
    CUTINFILENUM = 1//ベースファイル開始番号
  }
//あそこ
  else if(EroCutinAddID == "膣触り"){
    var Dif2ID = "なし"
    var DifID = "0001"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "手マン"){
    var Dif2ID = "なし"
    var DifID = "0002"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "手マン潮吹き"){
    var Dif2ID = "なし"
    var DifID = "0003"
    var DifSE = "Spouts01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "抚摸阴部"){
    var Dif2ID = "なし"
    var DifID = "0017"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }  
  else if(EroCutinAddID == "繊毛触手_膣"){
    var Dif2ID = "なし"
    var DifID = "0011"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "イソギンチャク触手_膣"){
    var Dif2ID = "なし"
    var DifID = "0012"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "イソギンチャク触手_膣内"){
    var Dif2ID = "なし"
    var DifID = "0013"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "デモンハンド膣"){
    var Dif2ID = "なし"
    var DifID = "0016"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "綱渡り"){
    var Dif2ID = "なし"
    var DifID = "0005"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "電マ"){
    var Dif2ID = "なし"
    var DifID = "0004"
    var DifSE = "Vibe01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "舔逼"){
    var Dif2ID = "なし"
    var DifID = "tongue_0002"
    var DifSE = "なし"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }

  else if(EroCutinAddID == "タイツ"){
    var Dif2ID = "なし"
    var DifID = "なし"
    var DifSE = "Rustle01"//SE
    CUTINBASENUM = "tites"
    CUTINFILENUM = 1//ベースファイル開始番号
  }

//尻
else if(EroCutinAddID == "舔屁股"){
    var Dif2ID = "なし"
    var DifID = "tongue_0002"
    var DifSE = "なし"//SE
    CUTINBASENUM = "hip"
    CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "尻覗かれ"){
  var Dif2ID = "なし"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "尻触り"){
  var Dif2ID = "なし"
  var DifID = "handL"
  var DifSE = "HardTouch01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "尻触りダブル"){
  var Dif2ID = "なし"
  var DifID = "handLR"
  var DifSE = "HardTouch01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "尻穴責め"){
  var Dif2ID = "なし"
  var DifID = "handanus"
  var DifSE = "TouchAnus01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "イボ触手_尻"){
  var Dif2ID = "なし"
  var DifID = "tentacle_0001"
  var DifSE = "Tentacle01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "素股"){
  var Dif2ID = "なし"
  var DifID = "penis_0001"
  var DifSE = "Knead01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "ローター"){
  var Dif2ID = "なし"
  var DifID = "rotor_0001"
  var DifSE = "なし"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}

//キス
else if(EroCutinAddID == "キス_人間" || EroCutinAddID == "キス"){
  var Dif2ID = "なし" 
  var DifID = "0001"
  var DifSE = "Kiss01"//SE
  CUTINBASENUM = "kiss"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "ベロチュー_人間" || EroCutinAddID == "キス"){
  var Dif2ID = "なし" 
  var DifID = "0003"
  var DifSE = "Kiss01"//SE
  CUTINBASENUM = "kiss"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "キス_人間_事後" || EroCutinAddID == "キス_事後"){
  var Dif2ID = "なし"
  var DifID = "0002"
  var DifSE = "なし"//SE
  CUTINBASENUM = "kiss"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "トマト"){
  var Dif2ID = "なし"
  var DifID = "0004"
  var DifSE = "なし"//SE
  CUTINBASENUM = "kiss"
  CUTINFILENUM = 4//ベースファイル開始番号
}

//手奉仕
else if(EroCutinAddID == "手奉仕_ペニスのみ"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 91//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_人間_浅"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_人間_中"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_人間_深"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_人間_射精"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_怪魔_浅"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_怪魔_中"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_怪魔_深"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_怪魔_射精"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}

else if(EroCutinAddID == "手奉仕_触手_浅"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_触手_中"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_触手_深"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_触手_射精"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}

//口奉仕

else if(EroCutinAddID == "口奉仕_人間_浅"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_人間_中"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_人間_深"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_人間_射精"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_怪魔_浅"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_怪魔_中"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_怪魔_深"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_怪魔_射精"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_触手_浅"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_触手_中"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_触手_深"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_触手_射精"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}

//アクメ
else if(EroCutinAddID == "絶頂"){
  var Dif2ID = "なし"
  var DifID = "なし"
  var DifSE = "Spouts01"//SE
  CUTINBASENUM = "acme"
  CUTINFILENUM = 1//ベースファイル開始番号
}

//なしの場合
  else if(EroCutinAddID == "なし"){
    var Dif2ID = "なし"
    var DifID = "なし"
  }
  else{
    var DifID = "なし"
  }



//ベースファイル指定
var EyeFlag = 0;  //Expand2 k
var HairFlag = 0; //Expand5 k bl a
var BYTFlag = 0;  //Expand5 v h
var RingFlag = 0; //Expand2 b a
var ScarFlag = 0; //Expand1 k b v h a
var PaintFlag = 0;//Expand3 b v h a
var EroFlag = 0;  //Expand4 k b v h a
var SemenFlag = 0;//Cutin1Semen1
var BlackenFlag = 0;//Blacken
var ClitFlag = 0; //Expand2 v
  if(CUTINBASENUM == "kiss")
  {
  CUTINCLOTHFLAG = 0//衣装差分の有無
  CUTINTITESFLAG = 0//タイツ差分の有無
  CUTINOPTIONFLAG = 0//オプション差分の有無
  CUTINALTFLAG = 1//変身差分の有無
  ScarFlag = 1;
  EroFlag = 1;
  if($gameActors._data[1]._equips[9] && $gameActors._data[1]._equips[9]._itemId >= 5) EyeFlag = 1;
  if($gameActors._data[1]._equips[10] && $gameActors._data[1]._equips[10]._itemId == 235) RingFlag = 1;//奶牛乳环的鼻环
  HairFlag = 1;
  }
  else if(CUTINBASENUM == "breast")
  {
  CUTINCLOTHFLAG = 1;
  if(nocloth == 1) {CUTINCLOTHFLAG = 0; SemenFlag = 1;}
  if($gameActors._data[1]._equips[7]._itemId == 301) CUTINTITESFLAG = 1;
  else CUTINTITESFLAG = 0;
  CUTINOPTIONFLAG = 1
  PaintFlag = 1;
  ScarFlag = 1;
  EroFlag = 1;
  BlackenFlag = 1;
  RingFlag = 1;
  }
  else if(CUTINBASENUM == "vagina")
  {
  CUTINCLOTHFLAG = 1
  CUTINTITESFLAG = 1
  CUTINOPTIONFLAG = 1
  PaintFlag = 1;
  ScarFlag = 1;
  EroFlag = 1;
  SemenFlag = 1;
  BYTFlag = 1;
  ClitFlag = 1;
  }
  else if(CUTINBASENUM ==  "hip")
  {
  CUTINCLOTHFLAG = 1
  CUTINTITESFLAG = 1
  CUTINOPTIONFLAG = 1
  PaintFlag = 1;
  ScarFlag = 1;
  EroFlag = 1;
  SemenFlag = 1;
  BYTFlag = 1;
  }
  else if(CUTINBASENUM == "handjob")
  {
  CUTINCLOTHFLAG = 0
  CUTINTITESFLAG = 0
  CUTINOPTIONFLAG = 0
  CUTINALTFLAG = 1
  }
  else if(CUTINBASENUM == "tites")
  {
  CUTINCLOTHFLAG = 0
  CUTINTITESFLAG = 0
  CUTINOPTIONFLAG = 0
  }
  else if(CUTINBASENUM == "blowjob")
  {
  CUTINCLOTHFLAG = 0
  CUTINTITESFLAG = 0
  CUTINOPTIONFLAG = 0
  HairFlag = 1
  CUTINALTFLAG = 1
  }
  else if(CUTINBASENUM == "acme")
  {
  CUTINCLOTHFLAG = 0
  CUTINTITESFLAG = 0
  CUTINOPTIONFLAG = 1
  CUTINALTFLAG = 1
  PaintFlag = 1;
  ScarFlag = 1;
  EroFlag = 1;
  HairFlag = 1;
  BlackenFlag = 1;
  RingFlag = 1;
  }
  else{{console.error(CUTINBASENUM + 'ベースファイル名未指定');}}; 
//SE演奏
  if (CutinSE == 1 && DifSE != "なし"){
    var seindex = $se_list.seID.indexOf(DifSE);
    if(seindex != -1){
      var file =  $se_list.File[seindex];
      AudioManager.playSe({name: file,volume: 90, pitch: 100, pan: 0})
    }else{}
  }

  EraceCutinTotal();

// 创建一个新的Sprite对象
var total = new Sprite();
// 将新创建的Sprite对象添加到SceneManager._scene._spriteset中
SceneManager._scene._spriteset.addChild(total)
// 设置新创建的Sprite对象的x坐标和y坐标
total.x = Cutin1X; total.y = Cutin1Y;
// 将新创建的Sprite对象赋值给SceneManager._scene.total
SceneManager._scene.total = total;

//後ろ(Dif2)
if(Dif2ID != "なし"){
  FILENAME = "actor01_cutin_" + CUTINBASENUM + "_h_" + Dif2ID
  var bitmap = ImageManager.loadPicture(FILENAME);
  var s = new Sprite(bitmap);
  SceneManager._scene.total.addChild(s);  
  SceneManager._scene.total.Cutin1Dif2 = s;
}

//素体表示
if(CLOTHTAG == "Change" && CUTINALTFLAG >= 1){//変身中は素体ナンバー+1
  CUTINFILENUM += 1
};
if(CLOTHTAG == "DarkChange" && CUTINALTFLAG >= 1){
  CUTINFILENUM += 2
};
//如果是奈落的堕灵魔衣
if(CLOTHTAG == "EvilChange" && CUTINALTFLAG >= 1){
  CUTINFILENUM += 2
  CUTINFILENUM = CUTINFILENUM + "b"
};
if(CUTINFILENUM >= 10){
  FILENAME = "actor01_cutin_" + CUTINBASENUM + "_00" + CUTINFILENUM
}else{
  FILENAME = "actor01_cutin_" + CUTINBASENUM + "_000" + CUTINFILENUM
}

if(CUTINFILENUM >= 10){
    FILENAME2 = "actor04_cutin_" + CUTINBASENUM + "_00" + CUTINFILENUM
}else{
    FILENAME2 = "actor04_cutin_" + CUTINBASENUM + "_000" + CUTINFILENUM
}
//如果黑皮但是魔人皮肤
if($gameSwitches.value(3001) == true && CLOTHTAG === "EvilChange"){
  var bitmap = ImageManager.loadPicture(FILENAME);
}
else if ($gameSwitches.value(3001) == true && CLOTHTAG !== "EvilChange"){
  var bitmap = ImageManager.loadPicture(FILENAME2);
}
else
{
  var bitmap = ImageManager.loadPicture(FILENAME);
}
var s = new Sprite(bitmap);
SceneManager._scene.total.addChild(s);  
SceneManager._scene.total.Cutin1Base = s;

//性器变黑
if(BlackenFlag >= 1 && !ConfigManager.noBlacken){
  FILENAME = "organ/" + CUTINBASENUM + "_" + "b"
  var bitmap = ImageManager.loadPicture(FILENAME);
  var s = new Sprite(bitmap);
  SceneManager._scene.total.addChild(s);  
  s.opacity = (($gameVariables.value(1103)+$gameVariables.value(1074))/20*255).clamp(0,255);
  SceneManager._scene.total.Blacken = s;
}

//扩展
if(ScarFlag >= 1 && $gameActors.actor(1).isStateAffected(320)){//伤痕
   FILENAME = 'mark/' + CUTINBASENUM + "_8";
   var bitmap = ImageManager.loadPicture(FILENAME);
   var s = new Sprite(bitmap);
   SceneManager._scene.total.addChild(s);  
   SceneManager._scene.total.Cutin1Expand1 = s;
}
if(ClitFlag >= 1 && $gameActors._data[1]._equips[14]._itemId > 5){//阴蒂环
	FILENAME = 'clit/' + CUTINBASENUM + "_" + eval($dataArmors[$gameActors._data[1]._equips[14]._itemId].meta.PID);
	var bitmap = ImageManager.loadPicture(FILENAME);
	var s = new Sprite(bitmap);
	SceneManager._scene.total.addChild(s);  
	SceneManager._scene.total.Cutin1Expand2 = s;
}

if(!Nipple && RingFlag >= 1 && $gameActors._data[1]._equips[10]._itemId > 5){//物件乳环
	FILENAME = 'nipple/' + CUTINBASENUM + "_" + eval($dataArmors[$gameActors._data[1]._equips[10]._itemId].meta.PID);
  if(DifID == 'continuous') FILENAME += 'b';
	var bitmap = ImageManager.loadPicture(FILENAME);
	var s = new Sprite(bitmap);
	SceneManager._scene.total.addChild(s);  
	SceneManager._scene.total.Cutin1Expand2 = s;
}
if(EyeFlag >= 1 && $gameActors._data[1]._equips[9]._itemId > 5){//眼罩
	FILENAME = 'eye/' + CUTINBASENUM + "_" + eval($dataArmors[$gameActors._data[1]._equips[9]._itemId].meta.PID);
	var bitmap = ImageManager.loadPicture(FILENAME);
	var s = new Sprite(bitmap);
	SceneManager._scene.total.addChild(s);  
	SceneManager._scene.total.Cutin1Expand2 = s;
}
if(PaintFlag >= 1 && $gameVariables.value(4900) > 0){//涂鸦
	if($gameVariables.value(4900) <= 1){var PaintIndex = "11"}
	else if($gameVariables.value(4900) <= 2){var PaintIndex = "12"}
	else{var PaintIndex = "13"}
	FILENAME = 'mark/' + CUTINBASENUM + "_" + PaintIndex;
	var bitmap = ImageManager.loadPicture(FILENAME);
	var s = new Sprite(bitmap);
	SceneManager._scene.total.addChild(s);  
	SceneManager._scene.total.Cutin1Expand3 = s;
}
if(EroFlag >= 1 && $gameVariables.value(1030) > 45 && ConfigManager.Erode){//侵蚀
   FILENAME = 'mark/' + CUTINBASENUM + "_9";
   var bitmap = ImageManager.loadPicture(FILENAME);
   var s = new Sprite(bitmap);
   SceneManager._scene.total.addChild(s);  
   s.opacity = Math.min(($gameVariables.value(1030) - 45)*5,255);
   SceneManager._scene.total.Cutin1Expand4 = s;
}
if(HairFlag >= 1){//头发换色
	if(CUTINFILENUM >= 10) FILENAME = 'hair/' + CUTINBASENUM + "_" + CUTINFILENUM;
    else FILENAME = 'hair/' + CUTINBASENUM + "_" + CUTINFILENUM;
  if(CLOTHTAG === "EvilChange")FILENAME = "actor01_cutin_" + CUTINBASENUM + "_000" + CUTINFILENUM;
	var bitmap = ImageManager.loadPicture(FILENAME);
	var s = new Sprite(bitmap);
	SceneManager._scene.total.addChild(s);  
	if(CLOTHTAG == "Change" && CUTINALTFLAG >= 1) s.setColorTone($gameActors.actor(1).hairToneb);
	else s.setColorTone($gameActors.actor(1).hairTone);
	SceneManager._scene.total.Cutin1Expand5 = s;
}

if(Dif3ID != "なし"){//乳交
  FILENAME = 'hyp/' + CUTINBASENUM + "_" + Dif3ID
  var bitmap = ImageManager.loadPicture(FILENAME);
  var s = new Sprite(bitmap);
  SceneManager._scene.total.addChild(s);  
  SceneManager._scene.total.Cutin1Expand6 = s;
}
  //オプション
if(CUTINOPTIONFLAG >= 1 && UNDERFLAG >= 1 && $gameActors._data[1]._equips[12]._itemId > 5){//タイツオフ、下着オンかつ未返信
  var FILENAME = 'under/' + CUTINBASENUM + "_" + eval($dataArmors[$gameActors._data[1]._equips[12]._itemId].meta.PID);
  var bitmap = ImageManager.loadPicture(FILENAME);
  var s = new Sprite(bitmap);
  SceneManager._scene.total.addChild(s);  
  if($gameActors.actor(2).toneArray[k]) s.setColorTone($gameActors.actor(2).toneArray[k]);
  SceneManager._scene.total.Cutin1Option = s;
}

//タイツ・足装備
if(CUTINTITESFLAG >= 1 && [300,301,307,309,310].includes($gameActors._data[1]._equips[EqLeg]._itemId) && ChangeFlag == false){//タイツフラグonかつ足装備ID300かつ未変身
  var LEGEQNUM = $gameActors._data[1]._equips[EqLeg]._itemId//足装備番号代入//黒タイツ以外たぶん落ちるので暫定的に↑でID300の場合のみにした
  var FileNameLeg = $dataArmors[LEGEQNUM].meta.PID;
  var FILENAME = "actor01_cutin_" + CUTINBASENUM + "_option_" + "00" + (FileNameLeg.replace(/\D/g, '').length > 1 ? "" : "0") + FileNameLeg
  var bitmap = ImageManager.loadPicture(FILENAME);
  var s = new Sprite(bitmap);
  SceneManager._scene.total.addChild(s);  
  s.opacity = 230;
  if($gameActors.actor(2).toneArray[LEGEQNUM]) s.setColorTone($gameActors.actor(2).toneArray[LEGEQNUM]);
  SceneManager._scene.total.Cutin1Tites = s;
}

  //衣装表示
if(EqNum >= 5 && CUTINCLOTHFLAG >= 1){//衣装フラグオンかつ5以上
  var FILENAME = "actor01_cutin_" + CUTINBASENUM + "_cloth_" + "00" + (FileNameCloth.replace(/\D/g, '').length > 1 ? "" : "0") + FileNameCloth
  var bitmap = ImageManager.loadPicture(FILENAME);
  var s = new Sprite(bitmap);
  SceneManager._scene.total.addChild(s);  
  s.opacity = $gameVariables.value(4964);
  if($gameActors.actor(2).toneArray[EqNum]) s.setColorTone($gameActors.actor(2).toneArray[EqNum]);
  SceneManager._scene.total.Cutin1Cloth = s;
}

if(Nipple && RingFlag >= 1 && $gameActors._data[1]._equips[10]._itemId > 5){//物件乳环
	FILENAME = 'nipple/' + CUTINBASENUM + "_" + eval($dataArmors[$gameActors._data[1]._equips[10]._itemId].meta.PID) + 'b';
  if(DifID != 'continuous') FILENAME = FILENAME.slice(0, -1);
	var bitmap = ImageManager.loadPicture(FILENAME);
	var s = new Sprite(bitmap);
	SceneManager._scene.total.addChild(s);  
	SceneManager._scene.total.Cutin1Expand2 = s;
}

if(BYTFlag >= 1 && $gameSwitches.value(2910)){//避孕套
	FILENAME = 'BYT/' + CUTINBASENUM + "_" + $gameVariables.value(4888);
	var bitmap = ImageManager.loadPicture(FILENAME);
	var s = new Sprite(bitmap);
	SceneManager._scene.total.addChild(s);  
	SceneManager._scene.total.Cutin1Expand5 = s;
}

//身上带的精液 
if(SemenFlag >= 1 && $gameVariables.value(942) > 0){
  FILENAME = "actor01_cutin_" + CUTINBASENUM + "_" + "Semen_0001"
  var bitmap = ImageManager.loadPicture(FILENAME);
  var s = new Sprite(bitmap);
  SceneManager._scene.total.addChild(s);  
  SceneManager._scene.total.Cutin1Semen1 = s;
}

//前
if(DifID != "なし" && DifID != 'continuous'){
    FILENAME = "actor01_cutin_" + CUTINBASENUM + "_h_" + DifID
    var bitmap = ImageManager.loadPicture(FILENAME);
    var s = new Sprite(bitmap);
    SceneManager._scene.total.addChild(s);  
    SceneManager._scene.total.Cutin1Dif1 = s;
};
//发射的精液
if(DifSemen != "なし"){
  FILENAME = "actor01_cutin_" + CUTINBASENUM + "_" + DifSemen
  var bitmap = ImageManager.loadPicture(FILENAME);
  var s = new Sprite(bitmap);
  SceneManager._scene.total.addChild(s);  
  SceneManager._scene.total.Cutin1Semen1 = s;
}
	
//アニメーション座標
var CutinAnimeX = 0 + Cutin1X
var CutinAnimeY = 0 + Cutin1Y
if (AnimeX != 0) CutinAnimeX += AnimeX;
if (AnimeY != 0) CutinAnimeY += AnimeY;

if (AnimeX != 0 || AnimeY != 0){

//番号、原点、X,Y,拡大、不透明、合成、移動ウェイト
//アニメウェイト
	var AnimeWait = 6;

//動かす処理、スプライトに置き換える場合上部の処理変更
    if(SceneManager._scene.total){
      Torigoya.Tween.create(SceneManager._scene.total)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
    }
	
}

//ライン2

$gameVariables._data[4869] = 0;
$gameSwitches._data[2919] = true;
this.wait(5);

//おわり
};





	if (command === 'EraceCutinAll' || command ==='eracecutinall' || command === 'EraceCutin1' || command === 'eracecutin1') {//全消去
		EraceCutinTotal()
	}
};



//消去用関数
function EraceCutinTotal() {
  if(SceneManager._scene.total) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.total)//シーン名変更
    SceneManager._scene.total = null;//シーン名変更
  }
};


})();