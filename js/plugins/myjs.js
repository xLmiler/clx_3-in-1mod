(function () {
    var CM_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        CM_Game_Interpreter_pluginCommand.call(this, command, args);
        const actor = $gameActors.actor(1);
        //卖淫弹幕显示 (移植，原插件callps)
        if (command === 'CallProstitute') {
            var MessagePT = args[1]
            if (args[0].match(/\\v/)) {
                array = args[0].match(/[0-9]+\.?[0-9]*/g);
            }
            var arg_value = array[0];
            var PSID = 0
            if (arg_value) {
              PSID = $gameVariables.value(arg_value);
            }          
            var PSMS = $psmessage[PSID][MessagePT]
            console.log(PSMS,PSID,MessagePT,arg_value,args[0])
            if(PSMS !== "なし") TickerManager.show(`\\i[892]\\C[27]${PSMS}`);
        } 
        //停顿等待 (移植，原插件callwait)
        if (command === 'CallWait') {
            var WaitTime = Number(args[0])
            if(Input.isPressed('control')){
                //スキップ中
            }else{
                this.wait(WaitTime)
            }
        }
        //催眠范围判断
        if (command === 'CMarea') {
            var [startX, startY, endX, endY, VariableID] = args.map(Number);
            var playerX = $gamePlayer.x;
            var playerY = $gamePlayer.y;
            $gameSwitches.setValue(VariableID, playerX >= startX && playerX <= endX && playerY >= startY && playerY <= endY);
        }
        //催眠公共事件脚本
        if (command === 'CM') {
            var subCommand = args[0];
            switch (subCommand) {
                case 'A':
                    functionNameA.call(this);
                    break;
                case 'TMPL':
                    let sceneNumber = $gameVariables.value($gameVariables.value(3601));
                    let hypnosisLevel = $CM_value.get("催眠等级");
                    if (hypnosisLevel <= 0) { alert("你这个存档有问题，后面的剧情都看不了的，按下按钮重置剧情，谢谢"); break; }
                    const eventLevelRequirements = [0, 1, 2, 3, 4, 5];
                    while (sceneNumber < 6) {
                        const currentEventStage = sceneNumber % 5 + 1;
                        if (hypnosisLevel >= eventLevelRequirements[currentEventStage] && $gameVariables.value(3149) >= currentEventStage) {
                            sceneNumber++;
                            $gameVariables._data[$gameVariables.value(3601)] = sceneNumber;

                            $gameVariables._data[2503] += sceneNumber;
                            this.setupChild($dataCommonEvents[$gameVariables.value(2503)].list, 0);
                            break;
                        }
                        else {
                            $gameSwitches.setValue(1983, true);
                            $gameVariables._data[2503] += sceneNumber;
                            this.setupChild($dataCommonEvents[$gameVariables.value(2503)].list, 0);
                            break;
                        }
                    }
                    break;
                case 'lamp':
                    resetHypnosisLamp([304, 56, 62, 58, 120, 152, 55, 67, 64, 63, 61, 60, 53]);
                    SceneManager.goto(Scene_Map); break;
                case 'move':
                    Move.call(this); break;
                case 'skill':
                    skillJH.call(this);
            }
        }
        //催眠衣服相关
        if (command === 'CMcloth') {
            const armorTypeId = parseInt(args[0]);//装备栏位置
            const match = /\\cm\[(.*?)\]/i.exec(args[1]);
            let armorId = null;//护甲id
            isNaN(args[1]) ? armorId = $CM_value.get(match[1].toString()) : armorId = parseInt(args[1]);
            if (armorId === 0) {
                //脱去
                const prevArmorId = actor._equips[armorTypeId] ? actor._equips[armorTypeId]._itemId : 0;
                if (prevArmorId !== 0) {
                    $gameParty.gainItem($dataArmors[prevArmorId], 1);
                }
                if (actor._equips[armorTypeId]) {
                    actor.forceChangeEquip(armorTypeId, null);
                }
            }
            else {
                //穿上
                if (!$gameParty.hasItem($dataArmors[armorId])) {
                    console.error('护甲没有找到:', armorId);
                    return;
                }
                const prevArmorId = actor._equips[armorTypeId] ? actor._equips[armorTypeId]._itemId : 0;
                if (prevArmorId !== armorId) {
                    if (prevArmorId !== 0) {
                        $gameParty.gainItem($dataArmors[prevArmorId], 1);
                    }
                    $gameParty.loseItem($dataArmors[armorId], 1);
                }
                if (actor._equips[armorTypeId]) {
                    actor.forceChangeEquip(armorTypeId, $dataArmors[armorId]);
                }
            }
        }
        function functionNameA() {
            var skillIds = [1095, 1094, 1093, 1092, 1091];
            for (var i = 0; i < 5; i++) {
                if ($gameActors.actor(1).isLearnedSkill(skillIds[i])) {
                    $CM_value.set('催眠状态', $hypnosisbase[1]['flavor' + ('0' + (5 - i)).slice(-2)]);
                    $CM_value.set('校长看法', $hypnosisbase[2]['flavor' + ('0' + (5 - i)).slice(-2)]);
                    $CM_value.set('性看法', $hypnosisbase[3]['flavor' + ('0' + (5 - i)).slice(-2)]);
                    break;
                }
            }
            $gameVariables._data[3264] = $CM_value.get(44) >= 1 ? $hypnosisbase[44].flavor01 : 0;
        }
    
        function resetHypnosisLamp(eventIds) {
            eventIds.forEach(function (eventId) {
                $gameMap.events().forEach(function (event) {
                    $gameSelfSwitches.setValue([eventId, event.eventId(), 'C'], false);
                });
            });
        }
    
    
        function Move() {
            // 初始化事件
            var eventA = $gameMap.event(23);
            var eventB = $gameMap.event(24);
            var eventC = $gameMap.event(25);
            var eventD = $gameMap.event(26);
            var eventName1 = null;
            var eventName2 = null;
            var totalInteractions = 10;
    
            for (var i = 0; i < totalInteractions; i++) {
                // 随机选择一个事件
                var eventArray = ['A', 'B', 'C', 'D'];
                var randomEvent1 = eventArray[Math.floor(Math.random() * eventArray.length)];
                var randomEvent2 = eventArray[Math.floor(Math.random() * eventArray.length)];
                while (true) {
                    if (randomEvent1 != randomEvent2) {
                        break;
                    }
                    else {
                        randomEvent2 = eventArray[Math.floor(Math.random() * eventArray.length)];
                    }
                }
                switch (randomEvent1) {
                    case 'A': eventName1 = eventA; break;
                    case 'B': eventName1 = eventB; break;
                    case 'C': eventName1 = eventC; break;
                    case 'D': eventName1 = eventD; break;
                }
                switch (randomEvent2) {
                    case 'A': eventName2 = eventA; break;
                    case 'B': eventName2 = eventB; break;
                    case 'C': eventName2 = eventC; break;
                    case 'D': eventName2 = eventD; break;
                }
                swapEvents(eventName1, eventName2);
            }
    
            //交换事件位置
            function swapEvents(event1, event2) {
                var tempX = event1.x;
                var tempY = event1.y;
                event1.setPosition(event2.x, event2.y);
                event2.setPosition(tempX, tempY);
            }
    
        }
    };

    //战斗复活更改，如果需要此战斗不可以复活，在对应的怪备注里面加入revive
    var CM_Game_Action_prototype_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        CM_Game_Action_prototype_apply.call(this, target);
        if ($gameParty.inBattle()) {
            var reviveFlag = 0;
            var enemies = $gameTroop.members();
            for (var i = 0; i < enemies.length; i++) {
                var enemys = enemies[i];
                var enemys_meta = enemys.enemy().meta;
                if (enemys_meta.revive) {
                    var reviveFlag = 1;
                }
            }
            if (reviveFlag == 0) {
                if ($gameActors.actor(1).hp <= 0 && $CM_value.get("战斗第一次复苏") == 0 && $gameVariables._data[3723] >= 100 && $gameActors.actor(1).isStateAffected(423)) {
                    $gameActors.actor(1)._mp = $gameActors.actor(1).mmp;
                    $gameActors.actor(1)._hp = $gameActors.actor(1).mhp;
                    $gameActors.actor(1)._tp = $gameActors.actor(1).maxTp();
                    $CM_value.set("战斗第一次复苏", 1);
                    $gameVariables._data[3723] = 0;
                    $gameScreen.setupAnimation(260, 860, 520);
                    $gameTroop._interpreter.wait(120);
                    TickerManager.show(`\\i[\\V[2218]]\\c[27]\\n[1]吸收了宝石中全部的精液，完全恢复了……。\\c[0]`, false);
                }
            }
        }
    }
    CM_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        CM_BattleManager_initMembers.call(this);
        //如果装备自慰棒获得拔棒技能
        if ($gameActors.actor(1)._equips[14]._itemId === 321 && !$gameActors.actor(1).hasSkill(1161) ) 
        {
            $gameActors.actor(1).learnSkill(1161)
        }
    };

    CM_BattleManager_updateBattleEnd = BattleManager.updateBattleEnd ;
    BattleManager.updateBattleEnd = function() {
        CM_BattleManager_updateBattleEnd.call(this);
        if ($gameActors.actor(1).hasSkill(1161) ) $gameActors.actor(1).forgetSkill(1161);
        $gameVariables._data[3783] = 0;
    };
})();

