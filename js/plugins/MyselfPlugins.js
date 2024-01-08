//Game_Action.prototype.executeHpDamage 被虐 伤痕
//Game_Action.prototype.needsSelection 眼罩致盲
//Game_Action.prototype.itemHit
//Window_BattleLog.prototype.push 眼罩真实视觉
//Spriteset_Battle.prototype.createLowerLayer
//Game_Interpreter.prototype.command321 更换职业取血魔占比
//Game_BattlerBase.prototype.refresh 负法力
//Game_BattlerBase.prototype.initMembers
//Window_Base.prototype.drawActorMp
//Game_BattlerBase.prototype.canPaySkillCost
//Game_Action.prototype.executeMpDamage
//Game_Actor.prototype.isEquipChangeOk 解咒灵水
//Window_Base.prototype.drawGauge 瘴气值BB_DrawGauge.js
//Window_Base.prototype.drawActorTp  YEP_CoreEngine.js
//BattleManager.checkBattleEnd 负生命
//Game_Battler.prototype.refresh
//Window_Base.prototype.drawActorHp
//Game_Action.prototype.executeHpDamage
//Sprite_Character.prototype.updateVisibility 视距
//Game_Event.prototype.activateAlert  YEP_EventChasePlayer.js
//Game_BattlerBase.prototype.die 战败状态修复
//SceneManager.updateMain 锁60FPS
//Scene_Equip.prototype.onItemOk 脱内衣
//BattleManager.makeEscapeRatio 逃跑率
//BattleManager.processEscape  YEP_BattleEngineCore.js
//Window_Options.prototype.addGeneralOptions 设置增加选项
//ConfigManager.makeData
//ConfigManager.applyData
//Sprite.prototype._executeTint 染色
//Window_ItemList.prototype.includes 物品栏
//Window_ItemCategory.prototype.makeCommandList
//Game_BattlerBase.prototype.attackSkillId 修复混乱
//Game_Battler.prototype.onRestrict
//Game_Action.prototype.evcVariablesChange FTKR_ExVariablesChange.js
//Game_Event.prototype.initialize  TemplateEvent.js  随机位置刷新
(function(){  
  Spriteset_Battle.prototype.removeEnemies = function() {
    var sprites = this._enemySprites;
    for (var i = 0; i < sprites.length; i++) {
      this._battleField.removeChild(sprites[i]);
    }
  }  
	
  var My_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command === "Dforce") {
		if(args[0] == '$gameActors.actor(1).abu.chooseSk') args[0] = $gameActors.actor(1).abu.chooseSk;
		if(args[1] === null){
			BattleManager._subject.forceAction(args[0],-1);
		}else{
			BattleManager._subject.forceAction(args[0],args[1]);
		}
		BattleManager.forceAction(this._subject);
    }	
	else if (command === 'ExtasySemen'){
		var ExtasyPointTotal = 0
		var CulExtasyPoint = 0;
		if($gameVariables.value(1238) > 0){
			CulExtasyPoint = (2 * Math.random() + 1 + $gameVariables.value(4878)) * $gameVariables.value(1238);
			CulExtasyPoint *= ($gameVariables.value(1027) + 100) / 100;
			if(Math.random() < 0.05 + $gameActors.actor(1).isLearnedSkill(960) * 0.5){
				TickerManager.show(`\\i[892]\\c[27]会心一击`);
                $gameScreen.startFlash([255,255,255,100], 20);
				CulExtasyPoint *= 1.5;}
			ExtasyPointTotal = Math.floor(CulExtasyPoint - CulExtasyPoint * $gameVariables.value(1098) / 100)
			$gameVariables._data[1026] += ExtasyPointTotal
            $gameVariables._data[4992] = ExtasyPointTotal
			$gameVariables._data[411] -= ExtasyPointTotal / 2
			if(ExtasyPointTotal > 0) TickerManager.show(`\\i[3582]\\c[27]快感值 \\V[4992]`);
			this.setupChild($dataCommonEvents[167].list, 0)
		}
	}
	else if(command.toLowerCase() === "add_abu_enemy") {
		var EnemyList = [];
		EnemyList = $gameActors.actor(1).abu.enemyList;
		if(EnemyList.length < 1)	return;
		var EnemyID = EnemyList[Math.randomInt(EnemyList.length)];
		var x = 300 + Math.randomInt(300);
		var y = 300 + Math.randomInt(200);
		var enemy = new Game_Enemy(EnemyID, x, y);
		$gameTroop._enemies.push(enemy);
		enemy.addState(3);
		enemy.addRandomBuff();
		var kindState = ['demon','daimaoabu','slime','renegade','human','tentacle','variant','imitator','aquatic','slaver','insect','machine','plant','succubus','abadoncore','worm','boss','demidemon','hybrid']
		for(var i = 0; i < kindState.length; i++){
			if($dataEnemies[EnemyID].meta[kindState[i]+'']) enemy.addState(352 + i);
		}
		if($dataEnemies[EnemyID].meta['BindSkill']) enemy.addState(203);
		BattleManager._spriteset.removeEnemies();
		BattleManager._spriteset.createEnemies();
		$gameTroop.makeUniqueNames();
	}
	else if(command.toLowerCase() === "clear_abu_enemy"){
		for(var index = 0;index < $gameTroop._enemies.length;index++){
			if(!$dataEnemies[$gameTroop._enemies[index]._enemyId].meta['BindSkill'] && !$dataEnemies[$gameTroop._enemies[index]._enemyId].meta['noMine']){//noMine指定不可退场怪人
				$gameTroop._enemies.splice(index,1);
				BattleManager._spriteset.removeEnemies();
				BattleManager._spriteset.createEnemies();
				AudioManager.playSe({name: 'Move1', pan: 0, pitch: 100, volume: 100});
				break;}}
	}
	else if (command.toLowerCase() === "add_enemy_troop") {
		 for(var i = 0;i < $gameActors.actor(1).jumpEnemy.length;i++){
			var troop = $dataTroops[$gameActors.actor(1).jumpEnemy[i]];
			for (var k = 0; k < troop.members.length; k++) {
				var member = troop.members[k];
				if ($dataEnemies[member.enemyId]) {
					var x = 300 + Math.randomInt(300);
					var y = 300 + Math.randomInt(200);
					var enemy = new Game_Enemy(member.enemyId, x, y);
					$gameTroop._enemies.push(enemy);
				}   
			}
			BattleManager._spriteset.removeEnemies();
			BattleManager._spriteset.createEnemies();
			$gameTroop.makeUniqueNames();
		}
    }
	else {
      My_Game_Interpreter_pluginCommand.call(this, command, args);
    }
  };
  
})();


Game_Enemy.prototype.originalName = function() {
	var add = '';
	for(var i = 0; i < this._states.length; i++){
		if($dataStates[this._states[i]].meta.nameDisplay) add += $dataStates[this._states[i]].name;
	}
    return add + this.enemy().name;
};

Game_Enemy.prototype.addRandomBuff = function(){
	if(this.enemy().meta.noMine) return;
	var r;
	var p1 = 0.15;
	var p2 = 0.05;
	if(this.enemy().meta.BindSkill){
		r = Math.random();
		for(var n = 1; n < 5; n++){
			if(r < p1 * n){this.addState(256+n); break;}}
		r = Math.random();
		if(r < 0.2) this.addState(270);
	}
	if($gameVariables.value(4980) >= 4){
		r = Math.random();
		for(var m = 1; m < 10; m++){
			if(r < p2 * m){this.addState(260+m); break;}}
	}
}

Game_BattlerBase.prototype.hasStateArray = function(array){
	for(var i = 0; i < array.length; i++){
		if(this.isStateAffected(array[i])) return true;
	}
	return false;
}

Game_Actor.prototype.hasSword = function() {
    return this.weapons().length > 0;
};

BattleManager.canEscape = function() {
    return this._canEscape && $gameActors.actor(1)._tp >= 10;
};

BattleManager.checkSubstitute = function(target) {
    return !this._action.isCertainHit() && this._action.isForOpponent();
};

Game_Actor.prototype.addKey = function(keyId){
var slotId = $dataItems[keyId].meta.body;
var Id = $gameVariables.value(312);
var n = $dataItems[keyId].meta.from;
var actor = $gameActors.actor(1);
if(!$gameParty.inBattle() && !$gameSwitches.value(180)){
n = $dataItems[keyId].meta.to; keyId = 0; Id = 0;}
$gameParty.gainItem($dataArmors[n],1);
actor.changeEquip(slotId,$dataArmors[n]);
actor.save.key[slotId] = keyId;
actor.save.keyTroop[slotId] = Id;
if(Id > 0) $gameActors.actor(370+slotId).setName($dataTroops[Id].name);
if($gameParty.inBattle()) keyList.push(keyId);
};

Game_Action.prototype.executeHpDamage = function(target, value) {
    this.makeSuccess(target);
	if(target.isActor()){
		if(value >= target.hp && target.isStateAffected(391)){
			value = 0;
			$gameScreen.setupAnimation(142, $gameVariables.value(905), $gameVariables.value(906));
			target.removeState(391);
		}
		if(target.tp <= 0 && target._equips[0]._itemId >= 5 && value > 0){//武器掉落
			AudioManager.playSe({name: 'chari07', pan: 0, pitch: 100, volume: 100});
			$gameVariables._data[4849] = target._equips[0]._itemId;
			target.changeEquip(0,null);
		}
		var rate = value / target.mhp;
		if(this.isPhysical()){//伤痕
			if(!target.isStateAffected(320) && rate > Math.random()) target.addState(320);
			if(target.isStateAffected(320) && Math.randomInt(20) < $gameVariables.value(1112)){
				var a = Math.round($gameVariables.value(1112) * 160 * rate);
				target.gainSilentTp(Math.round(40 * rate));
				$gameVariables._data[1026] += a;
				$gameVariables._data[4992] = a;
				$gameTemp.reserveCommonEvent(167);
			}
		}
		if(!target.isStateAffected(252)) target.gainSilentTp(Math.round(-30 * rate));
	}
	target.gainHp(-value);
	if(value > 0) target.onDamage(value);
	this.gainDrainedHp(value);
};

_BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
	if(this._subject.isActor()){
		var og = this._subject.mp;
		_BattleManager_startAction.call(this);
		if(og != this._subject.mp) window.weaponEffect = true;
	}else{
		_BattleManager_startAction.call(this);
	}
};

_BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {//武器特效关闭
    _BattleManager_endAction.call(this);
	window.weaponEffect = false;
	var actor = $gameActors.actor(1)
  if(actor.tp <= 0){
      if(!actor.isStateAffected(372)) actor.addState(372);
  }
  if(actor.mp <= (-0.7 * actor.mmp)) {
      $gameTemp.reserveCommonEvent(1032);
  }else if(actor.mp <= (-0.3 * actor.mmp)) {
    if(!actor.isStateAffected(40)) actor.addState(40);  
  }
};

var newtitle = '\u9b54\u6cd5\u5c11\u5973\u82cd\u84dd\u661f★\u6539 by\u5446\u6bdb\u963f\u535c';
Scene_Boot.prototype.updateDocumentTitle = function() {
    document.title = newtitle;
};

DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
    info.title      = newtitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
    return info;
};

DataManager.isThisGameFile = function(savefileId) {
    var globalInfo = this.loadGlobalInfo();
    if (globalInfo && globalInfo[savefileId]) {
        if (StorageManager.isLocalMode()) {
            return true;
        } else {
            var savefile = globalInfo[savefileId];
            return (savefile.globalId === this._globalId &&
                    savefile.title === newtitle);
        }
    } else {
        return false;
    }
};

BattleManager.earphone = function(){//耳机
	var index = earphoneIndex();
	if(!index){AudioManager.stopBgs(); return;}
	if(AudioManager._currentBgs && index[0] == AudioManager._currentBgs.name.slice(0,-2)) return;
	
	FileName = index[0] + (Math.randomInt(index[1])+1);
	AudioManager.playBgs({name: FileName, pan: 0, pitch: 100, volume: 100});
};

var earphoneIndex = function(){
	if(!$gameActors.actor(1).hasArmor($dataArmors[294])) return;
	if(!$gameSwitches.value(40)) return;
	var index;
	if($gameVariables.value(351) > 0 || $gameVariables.value(1212) > 0) return ['HoneyDrop_h_mouth',4];
	if($gameSwitches.value(190)){
		if($gameTroop.aliveMembers().length <= 0) return ['Honeydrop_breathextasy',1];
		else{
			var index = 'Honeydrop_';
			switch($gameVariables.value(1033)){
				case 3:
					index += 'o';
					break;
				case 2:
					index += 'i';
					break;
				default:
					index += 'b';
			}
			if($gameVariables.value(4762) >= 360) index += '_aegisoft';
			else if($gameVariables.value(616) > 0) index += '_aegihard';
			else index += '_aegi';
			return [index,3];
		}
	}
	if($gameActors.actor(1).isStateAffected(316) || $gameActors.actor(1).isStateAffected(330)) return ['Honeydrop_breath',3];
	return;
};

Game_Actor.prototype.biriSocks = function(){//丝袜破损
	if($gameSwitches.value(131)) return;
	var index = this._equips[7]._itemId;
	if(index > 0 && $dataArmors[index].meta.biriTo) this.forceChangeEquip(7,$dataArmors[$dataArmors[index].meta.biriTo]);
}

Scene_Menu.prototype.commandItem = function() {
    for(var i = 81; i <= 89; i++){$gameScreen.erasePicture(i);}
	SceneManager.push(Scene_Item);
};

var _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
	for(var i = 81; i <= 89; i++){$gameScreen.erasePicture(i);}
	_Scene_Menu_onPersonalOk.call(this);
};
