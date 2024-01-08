/*---------------------------------------------------------------------------*
 * 2019/03/13 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc いろんなこまんど
 * @author kido0617（改変：しもや）
 * @help
 * ・プラグインコマンド
 *   ParaAdd name num
 */



(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'EracePic') {//ピクチャ消去
      var EraceType = args[0];
      if(EraceType === "BG"){var EracePicNum = [5,6,7,8]}//背景
      if(EraceType === "LEFT"){var EracePicNum = [31,32,33,34]}//左立ち絵
      EracePicNum.forEach(function(value){
        $gameScreen.erasePicture(value)
        });
      }
    if (command === 'FaceId') {//表情表示用
        if(args[0] == "アマネ"){args[0] = 1}
        if(args[0] == "メモリア"){args[0] = 2}
        if(args[0] == "ハヅキ"){args[0] = 3}
        if(args[0] == "ハヅキ競泳"){args[0] = 4}
        if(args[0] == "リトルメモリアおさげ"){args[0] = 8}
        if(args[0] == "リトルメモリアボブ"){args[0] = 9}
        if(args[0] == "リトルメモリアポニテ"){args[0] = 10}
        if(args[0] == "ハルカ"){args[0] = 15}
        if(args[0] == "偽セレスフォニア"){args[0] = 20}
        if(args[0] == "ナツ"){args[0] = 11}
        if(args[1] == "微笑"){args[1] = 1}
        if(args[1] == "無表情"){args[1] = 2}
        if(args[1] == "口開き"){args[1] = 3}
        if(args[1] == "不安"){args[1] = 4}
        if(args[1] == "喜び"){args[1] = 5}
        if(args[1] == "驚き"){args[1] = 6}
        if(args[1] == "真顔"){args[1] = 7}
        if(args[1] == "焦り"){args[1] = 8}
        if(args[1] == "疲れ"){args[1] = 9}
        if(args[1] == "恐縮"){args[1] = 10}
        if(args[1] == "困り笑顔"){args[1] = 11}
        if(args[1] == "目閉じ"){args[1] = 12}
        if(args[1] == "戦い"){args[1] = 13}
        if(args[1] == "落ち込み"){args[1] = 14}
        if(args[1] == "ダメージ"){args[1] = 15}
        if(args[1] == "ドヤ顔"){args[1] = 16}
        if(args[1] == "じとー"){args[1] = 17}
        if(args[1] == "目が点"){args[1] = 18}
        if(args[1] == "ドン引き"){args[1] = 19}
        if(args[1] == "おこ"){args[1] = 20}
        if(args[1] == "ハート"){args[1] = 21}
        if(args[1] == "未設定"){args[1] = 22}
        if(args[1] == "未設定"){args[1] = 23}
        if(args[1] == "未設定"){args[1] = 24}
        if(args[1] == "奉仕"){args[1] = 25}
        if(args[1] == "奉仕淫"){args[1] = 26}
        if(args[1] == "未設定"){args[1] = 27}
        if(args[1] == "未設定"){args[1] = 29}
        if(args[1] == "驚き赤面"){args[1] = 30}
        if(args[1] == "羞恥"){args[1] = 31}
        if(args[1] == "羞恥困り"){args[1] = 32}
        if(args[1] == "羞恥笑顔"){args[1] = 33}
        if(args[1] == "興奮"){args[1] = 34}
        if(args[1] == "発情"){args[1] = 35}
        if(args[1] == "絶頂"){args[1] = 36}
        if(args[1] == "放心"){args[1] = 37}
        if(args[1] == "催眠"){args[1] = 38}
        if(args[1] == "淫乱"){args[1] = 39}
        if(args[1] == "誘惑"){args[1] = 40}
        var charaid = args[0];
        var facenum = args[1];
        if(charaid >= 2){$gameVariables._data[780] = facenum
          $gameSwitches._data[119] = true
          $gameVariables._data[884] = Number(args[0])
        };
        if(charaid <= 1){$gameVariables._data[895] = facenum};              
      }
      if (command === 'TMng') {//ティッカー表示形式指定
        var TickerVarID = 0
        if(args[0] == "Search"){TickerVarID = 2947}
        if(args[0] == "Talk"){TickerVarID = 2944}
        if(args[0] == "Noicon"){TickerVarID = 2950}
        if(args[0] == "!!"){TickerVarID = 2953}
        if(args[0] == "HeroineTalk"){TickerVarID = 2957}
        if(args[0] == "Trap"){TickerVarID = 2961}
        if(args[0] == "Star"){TickerVarID = 2964}
        if(args[0] == "Trophie"){TickerVarID = 2966}
        if(args[0] == "Change"){TickerVarID = 2968}
        if(args[0] == "Alert"){TickerVarID = 2970}
        if(args[0] == "Flash"){TickerVarID = 2972}
        if(args[0] == "Time"){TickerVarID = 2974}
        if(args[0] == "Gear"){TickerVarID = 2976}
        if(args[0] == "Heart"){TickerVarID = 2980}
        if(args[0] == "Dice"){TickerVarID = 2981}
        if(args[0] == "Sleep"){TickerVarID = 2983}
        if(args[0] == "Note"){TickerVarID = 2984}
        if(args[0] == "BadTrophie"){TickerVarID = 2986}
        if(args[0] == "Lvup"){TickerVarID = 2988}
        if(args[0] == "Location"){TickerVarID = 2989}
        if(args[0] == "Error"){TickerVarID = 2990}
        if(args[0] == "Comment"){TickerVarID = 2991}
        if(args[0] == "Mission"){TickerVarID = 2993}
        if(args[0] == "EXP"){TickerVarID = 2994}
        var TickerMessage = args[1];
        TickerMessage = TickerMessage.replace(/\\/g,'\x1b');
        if(TickerVarID == 0){console.error(args[0] + 'パラメータ名が不正');}//0の時はエラー};
        if(TickerVarID != 0){
          $gameVariables._data[TickerVarID] = TickerMessage
          $gameSwitches._data[91] = true;}           
      }
      if (command === 'CallPurpose') {
        var Pur = args[1];
        var PurNum =  Number(args[0]);
        if(PurNum <= 1){var ActorID = 76
          $gameActors.actor(76).setName("")
          $gameActors.actor(77).setName("")
          $gameActors.actor(78).setName("")}
        else if(PurNum == 2){var ActorID = 77}
        else if(PurNum == 3){var ActorID = 78}
        else{console.error('引数エラー');}
        $gameActors.actor(ActorID).setName(Pur)
        if(PurNum <= 1){
          $gameVariables._data[2953] = '目的已经更新了。'
          this.setupChild($dataCommonEvents[97].list, 0)
        }
        //暂存当前目的
        $gameVariables._data[3729] = $gameActors.actor(76)._name
        $gameVariables._data[3730] = $gameActors.actor(77)._name
        $gameVariables._data[3731] = $gameActors.actor(78)._name
        //返回当前目的
        $gameActors.actor(76).setName($gameVariables._data[3729])
        $gameActors.actor(77).setName($gameVariables._data[3730])
        $gameActors.actor(78).setName($gameVariables._data[3731])
        $gameVariables._data[2953] = '目的已经更新了。'
      }
      if (command === 'MissionFlag') {
        var MissionID = Number(args[0]);
        var MissionFlagSwitch = args[1];
        MissionID += 3000
        if(MissionFlagSwitch == "true" || MissionFlagSwitch == "on"){
          if($gameVariables.value(MissionID) < 1){$gameVariables._data[MissionID] = $gameVariables.value(MissionID) + 1;}}
        else if(MissionFlagSwitch == "false" || MissionFlagSwitch == "off"){$gameVariables._data[MissionID] = 0;}
        else{console.error('フラグが指定されていません');}
      }
      if (command === 'EquipChange') {
        $gameVariables._data[2703] = 0
        $gameVariables._data[2701] = 0
        var EquipType = args[0];

        if (args[1].match(/\\v/)) {
          //args[1]に\vを含む場合の処理
          array = args[1].match(/[0-9]+\.?[0-9]*/g);
          for(var i = 0; i < array.length; i++) {
            args[1] = Number(array);
            var EquipID = $gameVariables.value(args[1]);
            }
          }else{var EquipID = Number(args[1])}
            
        var ETypeID = 0
        if(EquipType == "Weapon" || EquipType == "武装" || EquipType == "0"){ETypeID = 0};
        if(EquipType == "Cloth" || EquipType == "衣装" || EquipType == "1"){ETypeID = 1};
        if(EquipType == "ClothOption" || EquipType == "衣装オプション" || EquipType == "2"){ETypeID = 2};
        if(EquipType == "Option" || EquipType == "追加外装" || EquipType == "3"){ETypeID = 3};
        if(EquipType == "Other" || EquipType == "その他" || EquipType == "4"){ETypeID = 4};
        if(EquipType == "Other2" || EquipType == "その他2" || EquipType == "5"){ETypeID = 5};
        if(EquipType == "Special" || EquipType == "特殊" || EquipType == "6"){ETypeID = 6};
        if(EquipType == "Leg" || EquipType == "脚" || EquipType == "7"){ETypeID = 7};
		if(EquipType == "Special1" || EquipType == "13"){ETypeID = 8};  //颈
		if(EquipType == "Special2" || EquipType == "14"){ETypeID = 9};  //眼部
		if(EquipType == "Special3" || EquipType == "15"){ETypeID = 10}; //穿环
		if(EquipType == "Special4" || EquipType == "16"){ETypeID = 11}; //口部
		if(EquipType == "Special5" || EquipType == "17"){ETypeID = 12}; //下着
		if(EquipType == "Special6" || EquipType == "18"){ETypeID = 13}; //耳朵
		if(EquipType == "Special7" || EquipType == "19"){ETypeID = 14}; //耳朵
		
		//防止缺少装备崩溃
		if(EquipID != 0){
			if(ETypeID == 0){
				if(!$gameParty.hasItem($dataWeapons[EquipID])) return;
			}else{
				if(!$gameParty.hasItem($dataArmors[EquipID])) return;
		}}
		
        $gameVariables._data[2701] = $gameVariables.value(2701) + ETypeID
        $gameVariables._data[2703] = $gameVariables.value(2703) + Number(EquipID)
        this.setupChild($dataCommonEvents[838].list, 0);
      }
      
      if (command === 'LocationFlag') {//場所出現用。変数501-540までのフラグをオンにする
        var LocationID = args[0];
        var LocationVar = 0
        var LocationName = 0
        if(LocationID == "学園" || LocationID == "私立エチノミヤ学園"){
          LocationVar = 512
          LocationName = "私立二宫市学校"
          };
        if(LocationID == "未定"){
          LocationVar = 513
          LocationName = "未定"
          };
        if(LocationID == "マカイ地区" || LocationID == "マカイ"){
          LocationVar = 514
          LocationName = "无法地区"
          };
        if(LocationID == "廃工場"){
          LocationVar = 502
          LocationName = "废弃工厂"
          };
        if(LocationID == "マッサージ店" || LocationID == "マジック★サルヴ" ){
          LocationVar = 517
          LocationName = "魔法★按摩店"
          };
        if(LocationID == "住宅地"){
          LocationVar = 519
          LocationName = "住宅区"
          };
        if(LocationID == "ハヅキの家" || LocationID == "皆川家"){
          LocationVar = 520
          LocationName = "杨羽的家"
          };
        if(LocationID == "銭湯" || LocationID == "おあしすの湯"){
          LocationVar = 518
          LocationName = "澡堂"
          };
        if(LocationID == "市街地" || LocationID == "エチノミヤ市街地"){
          LocationVar = 515
          LocationName = "二宫市市区"
          };
        if(LocationID == "駅前" || LocationID == "エチノミヤ駅前"){
          LocationVar = 511
          LocationName = "二宫市车站前"
          };
        if(LocationID == "総合病院"){
          LocationVar = 521
          LocationName = "综合医院"
          };
        if(LocationID == "繁華街"){
            LocationVar = 522
            LocationName = "二宫市繁华街"
            };
        if(LocationID == "下水道" || LocationID == "下水道"){
          LocationVar = 503
          LocationName = "下水道"
          };
        if(LocationID == "レネゲードの拠点" || LocationID == "レネゲードのアジト"){
          LocationVar = 504
          LocationName = "变节者据点"
          };
        if(LocationID == "封鎖市街"){
            LocationVar = 505
            LocationName = "封锁市区"
          };
        if(LocationID == "異界化学園地下"){
            LocationVar = 506
            LocationName = "异界化学校地下"
          };
        if(LocationID == "秘密クラブ跡"){
            LocationVar = 507
            LocationName = "秘密俱乐部"
          };
        if(LocationID == "侵蝕病棟"){
            LocationVar = 508
            LocationName = "被侵蚀的医院"
          };
        if(LocationID == "テレビ局"){
            LocationVar = 509
            LocationName = "电视台"
          };
        if(LocationID == "ドクターのラボ"){
            LocationVar = 510
            LocationName = "博士的实验室"
          };
        if(LocationID == "アンダーベース"){
            LocationVar = 535
            LocationName = "地下基地"
          };
        if(LocationID == "ダークプリズン"){
            LocationVar = 536
            LocationName = "黑暗牢笼"
          };
        if(LocationID == "グレートリベリオン"){
            LocationVar = 538
            LocationName = "古兰克"
          };
        if(LocationID == "崩壊暗域"){
            LocationVar = 539
            LocationName = "崩坏暗域"
          };
        if(LocationID == "幼魔の巣"){
            LocationVar = 540
            LocationName = "幼魔巢穴"
          };                             
        if(LocationID == "薬の取引場所"){
            LocationVar = 531
            LocationName = "药品交易处"
          };
        if(LocationID == "ビーチ"){
            LocationVar = 523
            LocationName = "二宫市沙滩"
          };
        if(LocationID == "市民公園"){
            LocationVar = 524
            LocationName = "市民公园"
          };
        if(LocationID == "駅・乗り場"){
            LocationVar = 530
            LocationName = "站台"
          };
        if(LocationID == "市街のどこか"){
           LocationVar = 537
           LocationName = "市区某处"
          };
        if(LocationVar >= 1){
          if($gameVariables.value(LocationVar) == 0){
            $gameVariables._data[LocationVar] = 1
            AudioManager.playSe({"name":"LNSM_SE02_Sense2","volume":90,"pitch":100,"pan":0})
            TickerManager.show(`\\i[1345]\\c[10]${LocationName}\\c[0]在地图上出现了。`,false)
            }else{};
        }else{
          {console.error('ロケーション名指定ミス？');}//0の時はエラー};
        }
      }
      if (command === 'TMob') {//ティッカー会話分岐用
        var TalkID = 0
        if(args[0] == "Normal"){TalkID = 151}
        if(args[0] == "Uniform"){TalkID = 151}
        if(args[0] == "Private"){TalkID = 151}
        if(args[0] == "UniformAlt"){TalkID = 177}
        if(args[0] == "Bitch"){TalkID = 187}
        if(args[0] == "Jogging"){TalkID = 151}
        if(args[0] == "Bloomer"){TalkID = 179}
        if(args[0] == "SchoolSwimWearNavy"){TalkID = 181}
        if(args[0] == "SchoolSwimWearWhite"){TalkID = 181}
        if(args[0] == "SwimWearSports"){TalkID = 182}
        if(args[0] == "MicroBikini"){TalkID = 189}
        if(args[0] == "Bunny"){TalkID = 191}
        if(args[0] == "Cheer"){TalkID = 193}
        if(args[0] == "Change"){TalkID = 160}
        if(args[0] == "ChangeEXA"){TalkID = 164}
        if(args[0] == "ChangeEXB"){TalkID = 166}
        if(args[0] == "ChangeFamous"){TalkID = 158}
        if(args[0] == "ChangeInfamous"){TalkID = 162}
        if(args[0] == "DarkChange"){TalkID = 168}
        if(args[0] == "SemenA"){TalkID = 154}
        if(args[0] == "SemenB"){TalkID = 156}
        if(args[0] == "Naked"){TalkID = 175}
        if(args[0] == "ExCommonA"){TalkID = 171}
        if(args[0] == "ExCommonB"){TalkID = 173}
        if(TalkID == 0){console.error(args[0] + 'パラメータ名が不正');}//0の時はエラー};
        else{
          $gameVariables._data[456] = 0 + TalkID
          $gameVariables._data[453] = $gameActors.actor($gameVariables.value(456)).name()
          if($gameVariables.value(453) != ""){
            $gameVariables._data[457] = $gameActors.actor($gameVariables.value(456)).name()  
            if($gameSwitches.value(29) == false){TickerManager.show(`\\i[\\v[2802]]\\n[221] : \\v[457]`,false)};
            $gameVariables._data[456] = $gameVariables.value(456) + 1
            $gameVariables._data[453] = $gameActors.actor($gameVariables.value(456)).name()
            $gameSwitches.setValue(32,true)//会話判定オン
            }
          if($gameVariables.value(453) != ""){
            this.wait(10)
            $gameVariables._data[458] = $gameActors.actor($gameVariables.value(456)).name()         
            if($gameSwitches.value(29) == false){TickerManager.show(`\\i[\\v[2802]]\\n[221] : \\v[458]`,false)};
            }else{$gameVariables._data[458] = " "}//ない場合
          if($gameSwitches.value(29)){
              $gameMessage.show(this, '\\n<\\n[221]>\\v[457]\n\\v[458]')}  
      }
    }
        if (command === 'AddPer') {//割合加算
          var VarID = Number(args[0])
          if (args[1].match(/\\v/)) {
          //args[1]に\vを含む場合の処理
          array = args[1].match(/[0-9]+\.?[0-9]*/g);
          for(var i = 0; i < array.length; i++) {
          args[1] = Number(array);
          var Var2ID = $gameVariables.value(args[1]);
            }
          }else{var Var2ID = Number(args[1])
            }
          var BaseNum = $gameVariables.value(VarID)
          var AltNum2 = Var2ID
          var Cul = 0
          BaseNum *= AltNum2
          BaseNum /= 100
          Cul += BaseNum //加算
          $gameVariables._data[VarID] += Math.floor(Cul)
        }
        
        if (command === 'SubPer') {//割合減算
          var VarID = Number(args[0])
          if (args[1].match(/\\v/)) {
          //args[1]に\vを含む場合の処理
          array = args[1].match(/[0-9]+\.?[0-9]*/g);
          for(var i = 0; i < array.length; i++) {
          args[1] = Number(array);
          var Var2ID = $gameVariables.value(args[1]);
            }
          }else{var Var2ID = Number(args[1])
            }
          var BaseNum = $gameVariables.value(VarID)
          var AltNum2 = Var2ID
          var Cul = 0
          BaseNum *= AltNum2
          BaseNum /= 100
          Cul -= BaseNum //減算
          $gameVariables._data[VarID] += Math.floor(Cul)
        }
        if (command === 'CulPer') {//割合算出
          var VarID = Number(args[0])
          if (args[1].match(/\\v/)) {
          //args[1]に\vを含む場合の処理
          array = args[1].match(/[0-9]+\.?[0-9]*/g);
          for(var i = 0; i < array.length; i++) {
          args[1] = Number(array);
          var Var2ID = $gameVariables.value(args[1]);
            }
          }else{var Var2ID = Number(args[1])
            }
          var BaseNum = $gameVariables.value(VarID)
          var PerNum = Var2ID
          var Cul = 0
          BaseNum *= PerNum
          BaseNum /= 100
          Cul = BaseNum //減算
          $gameVariables._data[VarID] = Math.floor(Cul)
        }
        if (command === 'CallRandom') {//範囲内でランダム
          var RandomRange = Number(args[0])
          var ReturnRandom = 0
          ReturnRandom = Math.floor(Math.random() * RandomRange) + 1;
          $gameVariables._data[4985] = ReturnRandom
        }
        if (command === 'MessageRandom3') {//範囲内でランダム
          var Message1 = args[0]
          var Message2 = args[1]
          var Message3 = args[2]

          var rand = Math.floor( Math.random() * 100)
          var msg = Message1;if (rand < 67){msg = Message2};if (rand < 33){msg = Message3};

          $gameMessage.show(this, msg)
        }
        if (command === 'RangeRandom') {//範囲内でランダム
          var VarID = Number(args[0])
          if (args[1].match(/\\v/)) {
          //args[1]に\vを含む場合の処理
          array = args[1].match(/[0-9]+\.?[0-9]*/g);
          for(var i = 0; i < array.length; i++) {
          args[1] = Number(array);
          var Var2ID = $gameVariables.value(args[1]);
            }
          }else{var Var2ID = Number(args[1])
            }
          var BaseNum = $gameVariables.value(VarID)
          var RangeNum = Var2ID
          var Cul = 0
          BaseNum *= RangeNum
          BaseNum /= 100
          max = BaseNum;
          var random = Math.floor( Math.random() * max ) ;
          Cul = random
          if (Math.random() > 0.5){
            $gameVariables._data[VarID] += Math.floor(Cul);
          }
          else{
            $gameVariables._data[VarID] -= Math.floor(Cul);
          }
        }  
        if (command === 'VarMaximize') {//最大値処理
          var VarID = Number(args[0])
          if (args[1].match(/\\v/)) {
            //args[1]に\vを含む場合の処理
            array = args[1].match(/[0-9]+\.?[0-9]*/g);
            for(var i = 0; i < array.length; i++) {
            args[1] = Number(array);
            var MaxVar = $gameVariables.value(args[1]);
              }
            }else{var MaxVar = Number(args[1])
              }
          if ($gameVariables.value(VarID) > MaxVar){
            $gameVariables._data[VarID] = MaxVar;
          }
          else{
          }
        }                              
    if (command === 'DspBGId') {
        var bgid = args[0];
        if($gameVariables.value(206) <= 0 || $gameVariables.value(206) >= 6){var CurrentTime = 'Midnight'};
        if($gameVariables.value(206) >= 1 && $gameVariables.value(206) < 4){var CurrentTime = 'Morning'};
        if($gameVariables.value(206) == 4){var CurrentTime = 'Evening'};
        if($gameVariables.value(206) == 5){var CurrentTime = 'Night'};
        if(bgid != -1){
          var bgfile =  $backgrounds[bgid][CurrentTime];
          $gameScreen.showPicture(5,bgfile,0,0,0,100,100,255,0);
        }else{
          console.error(id + ' は見つかりません');
        }        
      }
      if (command === 'BattleBackId') {
        var bbgid = args[0];
        if($gameVariables.value(206) <= 0 || $gameVariables.value(206) >= 6){var CurrentTime = 'Midnight'};
        if($gameVariables.value(206) >= 1 && $gameVariables.value(206) < 4){var CurrentTime = 'Morning'};
        if($gameVariables.value(206) == 4){var CurrentTime = 'Evening'};
        if($gameVariables.value(206) == 5){var CurrentTime = 'Night'};
        
        if(bbgid != -1){
          var bgfile =  $battleback[bbgid][CurrentTime];
          $gameMap.changeBattleback(bgfile, "frame")
          //console.log(bgfile)
        }else{
          console.error(id + ' は見つかりません');
        }        
      }
      if (command === 'PlayLog') {//最後のプレイ相手}
        var PlayPart = args[0];
        var Name = args[1];
        if($gameSwitches.value(1982) === false){//回想中はオフ
          if(PlayPart === '膣' || PlayPart ==='Vagina'){$gameVariables._data[2824] = Name}
          else if(PlayPart === '尻' || PlayPart ==='Anus'){$gameVariables._data[2825] = Name}
          else if(PlayPart === '口' || PlayPart ==='Mouth'){$gameVariables._data[2826] = Name}
          else{console.error(PlayPart + ' は見つかりません');}
        }else{}        
      }
      if (command === 'EVPic') {//ピクチャ表示}
        var CGNumber = args[0];
        if (args[1].match(/\\v/)) {
          //args[1]に\vを含む場合の処理
          array = args[1].match(/[0-9]+\.?[0-9]*/g);
          for(var i = 0; i < array.length; i++) {
          args[1] = Number(array);
          var PicNumber = $gameVariables.value(args[1]);
            }
          }else{var PicNumber = Number(args[1])
            }
        var Picture = "Eve_" + CGNumber + "_"
        PicNumber = ( '0000' + PicNumber ).slice( -4 );//ゼロ埋め
        Picture += PicNumber
        $gameScreen.showPicture(60,Picture,0,0,0,100,100,255,0)
      
      }
      if (command === 'RandomArray') {//重複のないランダム配列の出力
      var randoms = [];
      var min = Number(args[0]), max = Number(args[1]);
      for(i = min; i <= max; i++){
        while(true){
          var tmp = intRandom(min, max);
          if(!randoms.includes(tmp)){
            randoms.push(tmp);
            break;}}}
            $gameVariables._data[4975] = randoms
            
            function intRandom(min, max){
              return Math.floor( Math.random() * (max - min + 1)) + min;
            }
          }
      if (command === 'PlayLogTxt') {//最後のプレイ内容
        var TxtNum = Number(args[0]);
        var Txt = args[1];
        if($gameSwitches.value(1982) === false){//回想中はオフ
          if(TxtNum === 1){
            $gameVariables._data[2827] = ' '
            $gameVariables._data[2828] = ' '
            $gameVariables._data[2827] = Txt}
          else if(TxtNum === 2){$gameVariables._data[2828] = Txt}
          else{console.error(TxtNum + ' は見つかりません');}   
        }else{}      
      }
      if (command === 'GetMoney') {//お金入手

        if (args[0].match(/\\v/)) {
          //args[1]に\vを含む場合の処理
          array = args[0].match(/[0-9]+\.?[0-9]*/g);
          for(var i = 0; i < array.length; i++) {
          args[0] = Number(array);
          $gameVariables._data[436] = $gameVariables.value(args[0]);
            }
          }else{$gameVariables._data[436] = Number(args[0])}
        var RewardType = args[1];
        if(RewardType === '売春' || RewardType === 'prostitute'){//売春の場合
          var args = new Array("436","\\v[1245]")
          this.pluginCommand("AddPer", args) 
        }else{}
        if($gameVariables.value(436) >= 1){$gameSwitches.setValue(100,true)}else{}

      }
      if (command === 'EroStage') {//変数496に返す
        var EroPart = args[0];
        var EroStage = 0
        var PartStage = 0
        var Stage1 = 0
        var Stage2 = 2
        var Stage3 = 4
        if(EroPart == '口' || EroPart == 'Mouth'){PartStage = 1102}
        else if(EroPart == '乳首' || EroPart == 'Nipple'){PartStage = 1103}
        else if(EroPart == '陰核' || EroPart == 'Clit'){PartStage = 1104}
        else if(EroPart == '膣' || EroPart == 'Vagina'){PartStage = 1106}
        else if(EroPart == '肛穴' || EroPart == 'Anus'){PartStage = 1105}
		else if(EroPart == '精液' || EroPart == 'Semen'){PartStage = 1111}
        /* else if(EroPart == '羞恥' || EroPart == 'Shame'){PartStage = 1110}
        else if(EroPart == '被虐' || EroPart == 'Maso'){PartStage = 1112}
        else if(EroPart == '奉仕' || EroPart == 'Service'){PartStage = 1113} */
        else{$gameVariables._data[496] = 0;return;}
        if($gameVariables.value(PartStage) >= Stage3){EroStage = 3}
        else if($gameVariables.value(PartStage) >= Stage2){EroStage = 2}
        else {EroStage = 1}

        $gameVariables._data[496] = EroStage;
      }

  };
})();

Game_Message.prototype.show = function(it, Message) {
  $gameMessage.newPage()
  $gameMessage.add(Message)
  it.setWaitMode('message')
};

//透明化
var _updateEffect = Sprite_Enemy.prototype.updateEffect;
Sprite_Enemy.prototype.updateEffect = function() {
    if(this._enemy.isStateAffected(141) || this._enemy.isStateAffected(142) || this._enemy.isStateAffected(143)){
        this.opacity = 50;
    }
    _updateEffect.call(this);
};

var _Sprite_StateIcon_updateTransform = Sprite_StateIcon.prototype.updateTransform;
Sprite_StateIcon.prototype.updateTransform = function updateTransform() {
    _Sprite_StateIcon_updateTransform.apply(this, arguments);
    this.worldAlpha = this.alpha;
};


