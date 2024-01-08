/*---------------------------------------------------------------------------*
 * 2020 shimo8
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc パラメータチェック
 * @author しもや
 * @help
 * 主人公のパラメータ判定、上限の処理などを円滑に行う。
 * ・プラグインコマンド
 *   ParaCheck
 */

(function () {
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ParaCheck') {

            $gameVariables._data[1006] = $gameActors.actor(1).level//レベル　おそらくレベルアップメッセージに使用
            $gameVariables._data[215] = $gameParty._gold //所持金
            $gameVariables._data[722] = $gameVariables.value(1209) //衣装耐久スキル
            $gameVariables._data[1178] = $gameVariables.value(1280) / 15//魂の侵蝕
            if ($gameVariables.value(1178) > 6) { $gameVariables._data[1178] = 6 }


            if ($gameVariables.value(1178) >= 1) { $gameSwitches.setValue(1031, true) } else { $gameSwitches.setValue(1031, false) }
            if ($gameVariables.value(1178) >= 2) { $gameSwitches.setValue(1032, true) } else { $gameSwitches.setValue(1032, false) }
            if ($gameVariables.value(1178) >= 3) { $gameSwitches.setValue(1033, true) } else { $gameSwitches.setValue(1033, false) }
            if ($gameVariables.value(1178) >= 4) { $gameSwitches.setValue(1034, true) } else { $gameSwitches.setValue(1034, false) }
            if ($gameVariables.value(1178) >= 5) { $gameSwitches.setValue(1035, true) } else { $gameSwitches.setValue(1035, false) }


            if ($gameActors.actor(1).isStateAffected(53)) { $gameSwitches.setValue(295, true) } else { $gameSwitches.setValue(295, false) }

            var ClothLevel = Math.floor($gameActors.actor(1).level / 5 + 1)
            if (ClothLevel > 10) { ClothLevel = 10 }
            $gameVariables._data[3432] = ClothLevel
            if ($gameVariables.value(3431) != ClothLevel) { $gameVariables._data[3431] = ClothLevel }



            if ($gameParty.inBattle()) {
                if (!$gameActors.actor(1).hasSkill(75)) {
                    if ($gameActors.actor(1).hasSkill(77) && !(($gameActors.actor(1).isStateAffected(88) 
                        || $gameActors.actor(1).isStateAffected(382)) && ($gameActors.actor(1).isStateAffected(392)
                        || $gameActors.actor(1).isStateAffected(129)))) 
                    {
                        $gameActors.actor(1).forgetSkill(77);
                        $gameActors.actor(1).learnSkill(75);
                    }
                } else {
                    if (($gameActors.actor(1).isStateAffected(88) || $gameActors.actor(1).isStateAffected(382)) 
                        && ($gameActors.actor(1).isStateAffected(392) || $gameActors.actor(1).isStateAffected(129))) {
                        $gameActors.actor(1).forgetSkill(75);
                        $gameActors.actor(1).learnSkill(77);
                    }
                }
                if ($gameActors.actor(1)._tp <= 0) {
                    $gameActors.actor(1).addState(372);
                }
                if ($gameActors.actor(1).mp <= (-0.7 * $gameActors.actor(1).mmp)) {
                    this.setupChild($dataCommonEvents[1032].list, 0);
                } else if ($gameActors.actor(1).mp <= (-0.3 * $gameActors.actor(1).mmp)) {
                    $gameActors.actor(1).addState(40);
                }
            } else {//戦闘中以外の場合座標などをチェック
                $gameVariables._data[210] = $gameMap.mapId()
                $gameVariables._data[177] = $dataMap.meta["MapName"]
                $gameVariables._data[179] = $gamePlayer.x
                $gameVariables._data[180] = $gamePlayer.y
                $gameVariables._data[178] = $gameMap.regionId($gameVariables.value(179), $gameVariables.value(180))
            }

            //スキル入力
            //$gameVariables._data[1110] = $gameVariables.value(1271)//羞恥
            $gameVariables._data[1111] = $gameVariables.value(1272)//精液
            $gameVariables._data[1112] = $gameVariables.value(1273)//被虐
            $gameVariables._data[1113] = $gameVariables.value(1274)//奉仕
            //$gameVariables._data[1114] = $gameVariables.value(1275)//変態




            //スキルによるパラメータ上限変動
            $gameVariables._data[722] = $gameVariables.value(1209) //衣装耐久スキル
            $gameVariables._data[1034] = $gameVariables.value(1260)
            $gameVariables._data[1037] = $gameVariables.value(1259)

            //ステート
            if ($gameMap.isEventRunning()) {
            } else {
                if ($gameActors.actor(1).isStateAffected(123) && $gamePlayer._moveSpeed != $gameVariables.value(172)) {
                    $gamePlayer._moveSpeed = $gameVariables.value(172);
                } else if ($gamePlayer._moveSpeed != $gameVariables.value(173)) {
                    $gamePlayer._moveSpeed = $gameVariables.value(173);
                }
            }

            //装備情報の取得
            var ClothShame = 0;
            var ClothEqNum = 1
            if ($gameActors._data[1]._equips[ClothEqNum]._itemId >= 5) {
                var StandEqNum = $gameActors._data[1]._equips[ClothEqNum]._itemId;//衣装指定する場合はここの処理変更
                $gameVariables._data[762] = $dataArmors[StandEqNum].meta.ClothName;
                ClothShame = $dataArmors[StandEqNum].meta.Shame;
            } else {
                $gameVariables._data[762] = "Naked";
                ClothShame = 80;
            }

            //变身服状态附加
            if ([65, 67, 71, 76].includes($gameActors._data[1]._equips[1]._itemId)) {
                if (!$gameActors.actor(1).isStateAffected(251)) $gameActors.actor(1).addState(251);
            } else if ($gameActors.actor(1).isStateAffected(251)) $gameActors.actor(1).removeState(251);

            if ($gameSwitches.value(131)) {//変身中の場合
                $gameVariables._data[235] = 1//変身フラグオン
                var ClothHP = $gameVariables.value(702)//衣装耐久代入
                var ClothHPHalf = $gameVariables.value(722) / 2//衣装の半減値を代入
                if (ClothHP <= 0) {//衣装耐久ゼロの場合
                    //衣装全損
                    if ($gameActors.actor(1).isStateAffected(95)) { } else {
                        $gameActors.actor(1).removeState(94);
                        $gameActors.actor(1).addState(95);
                    }
                    ClothShame = 70;
                }
                else if (ClothHPHalf > ClothHP) {//衣装耐久が半減値以下
                    //衣装半壊
                    if ($gameActors.actor(1).isStateAffected(94)) { } else {
                        $gameActors.actor(1).removeState(95);
                        $gameActors.actor(1).addState(94);
                    }
                    ClothShame = 40;
                }
                else {
                    //衣装万全
                    if ($gameActors.actor(1).isStateAffected(94) || $gameActors.actor(1).isStateAffected(95)) {
                        $gameActors.actor(1).removeState(94);
                        $gameActors.actor(1).removeState(95);
                    }
                    ClothShame = 0;
                }
            } else {
                $gameVariables._data[235] = 0
                $gameActors.actor(1).removeState(94)
                $gameActors.actor(1).removeState(95)
            }
            //Shame补正
            if ($gameActors.actor(1).isStateAffected(55)) ClothShame = ClothShame / 2 + 40;
            if ($gameActors.actor(1).hasArmor($dataArmors[426])) ClothShame -= 200;
            if ($gameSwitches.value(2922) || $gameSwitches.value(2923)) ClothShame += 20;

            //ステルス？
            if ($gameVariables.value(1215) > 0) {
                $gameSwitches._data[162] = true;
            } else {
                $gameSwitches._data[162] = false;
            }
            //眼罩效果
            if ($gameVariables.value(1210) > 0) {
                $gameSwitches._data[2917] = true;
            } else {
                $gameSwitches._data[2917] = false;
            }

            if ($gameActors.actor(1).isStateAffected(49)) {
                $gameSwitches._data[70] = true;
            } else {
                $gameSwitches._data[70] = false;
            }


            //羞耻状态附加
            if (ClothShame > $gameVariables.value(1093)) {
                if ($gameActors.actor(1).isStateAffected(28)) {
                } else {
                    $gameActors.actor(1).addState(28)
                }
            } else if ($gameActors.actor(1).isStateAffected(28)) {
                $gameActors.actor(1).removeState(28)
            }

            if (!$gameParty.inBattle() && $gameMap.regionId(this.character(-1).x, this.character(-1).y) != 151) {
                $gameVariables._data[148] = 0;
            }


            //パラメータ上限チェック
            Sub = 1027//発情
            ParamaxEstrus(Sub)
            Sub = 1021//淫欲
            ParamaxLust(Sub)
            Sub = 1029//戦意
            Paramax0_100(Sub)
            Sub = 1030//瘴気
            ParamaxMiasma(Sub)
            Sub = 1022//侵蝕
            ParamaxErosion(Sub)
            Sub = 1025//知名度
            Paramax0_100(Sub)
            Sub = 217//魂
            Paramax0_99999(Sub)
            Sub = 1023//学園評価
            ParamaxUnder100(Sub)
            Sub = 1024//市民評価
            ParamaxUnder100(Sub)
            Sub = 212//支配度
            Paramax0_100(Sub)
            Sub = 1026//性感
            ParamaxExtasy(Sub)
            Sub = 702//衣装耐久
            ParamaxCloth(Sub)
            Sub = 202//ターン
            Paramax0_999(Sub)
            Sub = 1019//催眠
            ParamaxHyp(Sub)
            Sub = 3707//乳意
            Paramax0_100(Sub)
            Sub = 3723//精液存储
            Paramax0_100(Sub)
            Sub = 1801//媚毒上限
            ParamaxDarkDrug(Sub)
            Sub = 3715//真白饱腹值
            Paramax0_10(Sub)
            if ($gameVariables.value(1020) > 30) $gameVariables._data[1020] = 30;
        }
    }





    function ParamaxExtasy(Sub) {
        var high = $gameVariables.value(1031) + $gameActors.actor(1).isStateAffected(322) * 99999;
        var low = 0;
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high);
    }

    function ParamaxLust(Sub) {
        var high = $gameVariables.value(1034)
        var low = 0
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }
    //催眠上限
    function ParamaxHyp(Sub) {
        var high = $gameVariables.value(3142)
        var low = $gameVariables.value(3143)
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }
    function ParamaxMiasma(Sub) {
        var high = $gameVariables.value(1037)
        var low = 0
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }

    function ParamaxErosion(Sub) {//侵蝕度
        if ($gameSwitches.value(597) || $gameVariables.value(409) <= 2) {//クリア後、或いはチャプター2以下の場合、99まで？
            var high = 99
        } else {
            var high = 100
        }
        var low = $gameVariables.value(1280)
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }

    function ParamaxDarkDrug(Sub) {//媚毒上限
        if ($gameSwitches.value(1821)) {
            if (!$gameActors.actor(1).isStateAffected(321)) {
                TickerManager.show(`由于诅咒的原因，从身体内部产生了腹淫纹`);
                $gameActors.actor(1).removeState(407);
                $gameActors.actor(1).addState(321);
            }
            if (!$gameActors.actor(1).isStateAffected(322)) {
                TickerManager.show(`由于诅咒的原因，从身体内部产生了胸淫纹`);
                $gameActors.actor(1).removeState(407);
                $gameActors.actor(1).addState(322);
            }
            var high = $gameVariables.value(1802)
            var low = 0
            $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
        }
    }

    function ParamaxEstrus(Sub) {
        if ($gameActors.actor(1)._classId > 2) { $gameVariables._data[Sub] = 0; }
        else {
            var high = 200
            var low = Math.max($gameVariables.value(1801), $gameVariables.value(1282));
            $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
        }
    }

    function ParamaxCloth(Sub) {
        var high = $gameVariables.value(722)
        var low = 0
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }

    function Paramax0_999(Sub) {
        var high = 999
        var low = 0
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }

    function Paramax0_9999(Sub) {
        var high = 9999
        var low = 0
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }

    function Paramax0_99999(Sub) {
        var high = 99999
        var low = 0
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }
    function Paramax0_10(Sub) {
        var high = 10
        var low = 0
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }
    function Paramax0_100(Sub) {
        var high = 100
        var low = 0
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }

    function ParamaxUnder100(Sub) {
        var high = 100
        var low = -100
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }

    function ParamaxUnder999(Sub) {
        var high = 999
        var low = -999
        $gameVariables._data[Sub] = $gameVariables.value(Sub).clamp(low, high)
    }

})();
