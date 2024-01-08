﻿//=============================================================================
// Yanfly Engine Plugins - Instant Cast
// YEP_InstantCast.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_InstantCast = true;

var Yanfly = Yanfly || {};
Yanfly.Instant = Yanfly.Instant || {};
Yanfly.Instant.version = 1.09;

//=============================================================================
 /*:
 * @plugindesc v1.09 立即释放
 * @author Yanfly Engine Plugins
 *
 * @param Instant Icon
 * @desc Marks instant cast skills with this icon overlay.
 * Use 0 if you wish to use no icon.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 来自RPG Maker VX 和VX ACE软件的非常受欢迎的需求。立即释放带给MV插件很多
 * 特点。立即释放允许技能或者物品可以立即使用而不需要浪费玩家回合
 * 
 * 当行动拥有立即释放特性时，这个行动将会在这个点立即使用而不用等待回合来开
 * 始。使用完后，玩家可以继续使用其他行动。这就可以让你的战斗更加有深度。如
 * 果你的角色有多个行动，立即释放这个行动必须是第一个技能并且不在战斗序列内。
 *
 * 在事件中，如果敌方使用立即释放技能，一旦敌方回合开始，它会立即释放并且
 * 后开始其他技能
 *
 * 这个插件通常用来开启技能限制
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 下面标签你可以用来设置立即释放特性.
 *
 * Skill and Item Notetags:
 *   <Instant>
 *   <Instant Cast>
 *   这2个标签是一样的。可以让第一个行动使用时是立即释放，当敌方使用时，这将
 *   会让敌方可以继续开始下一个行动。
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *   <Instant Skill: x>
 *   <Instant Skill: x, x, x>
 *   <Instant Skill: x to y>
 *   T如果特定角色、敌方、职业或者装备特点武器等，甚至特点状态，这个技能就会被
 *   立即释放
 *
 *   <Instant Item: x>
 *   <Instant Item: x, x, x>
 *   <Instant Item: x to y>
 *   如果特定角色、敌方、职业或者装备特点武器等，甚至特点状态，这个物品使用就
 *   会被立即释放
 *
 *   <Cancel Instant Skill: x>
 *   <Cancel Instant Skill: x, x, x>
 *   <Cancel Instant Skill: x to y>
 *   如果特定角色、敌方、职业或者装备特点武器等，甚至特点状态，这个技能立即释
 *   放特性被取消
 *
 *   <Cancel Instant Item: x>
 *   <Cancel Instant Item: x, x, x>
 *   <Cancel Instant item: x to y>
 *   如果特定角色、敌方、职业或者装备特点武器等，甚至特点状态，这个物品立即释
 *   放特性被取消
 *
 * ============================================================================
 * Lunatic Mode - Conditional Instants
 * ============================================================================
 *
 * In the event you wish to have an action be dynamic in whether or not it is
 * an instant cast, you can use this notetag setup:
 *
 * Skill and Item Notetags:
 *   <Instant Eval>
 *    code
 *    code
 *   </Instant Eval>
 *   The code can be anything. However, what you want to define is the variable
 *   'instant' to be true or false. 'instant = true' means the action will be
 *   instant cast while 'instant = false' means the action will not. If the
 *   variable 'instant' comes to no conclusion, it will resume like normal to
 *   determine instant properties via other modifiers. It is recommended to use
 *   an if/else statement with this notetag.
 *
 *   *Note: This will take priority over <Cancel Instant> notetags. This is the
 *   only exception to the rule, but only because it can function as its own
 *   <Cancel Instant> if done in such a way.
 *
 * Example:
 *   <Instant Eval>
 *   if (user.atk >= 300) instant = true;
 *   </Instant Eval>
 *
 * In the above example, if the user's ATK value is equal to or greater than
 * the value of 300, the action with this notetag will be considered to have
 * instant cast properties.
 *
 * ============================================================================
 * Instant Cast Priority Settings
 * ============================================================================
 *
 * Since there are a lot of properties now that determine if a skill or item
 * will have instant cast properties, here's the priority order:
 *
 * 1. Instant Eval Notetags
 * If a skill/item's <Instant Eval> notetag dictates 'instant = true' or
 * 'instant = false', that setting will take priority over everything else.
 *
 * 2. Cancel Instant Notetags
 * If there's a property that will cancel out instant casting on the actor,
 * class, enemy, weapon, armor, or state, this will take priority over all
 * except for anything dictated by the Instant Eval notetag.
 *
 * 3. Instant Skill/Item Granting Notetags
 * The actor, class, enemy, weapon, armor, and state notetags that grant
 * Instant Cast properties to skills and items will take priority over all
 * except those shown above in this list.
 *
 * 4. Inherent Instant Cast Property
 * If nothing above is used or applied, whether or not a skill or item will
 * have an Instant Cast property will be determined by it having <Instant Cast>
 * in its notebox.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.08:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.07b:
 * - Optimized to fit Tick-Based Battle Systems better.
 * - Fixed a bug where if the user uses an instant action self-berserks itself,
 * the user will still be able to input an action.
 * - Added failsafes for those using independent items and then adding this
 * plugin later. Effects are not applied retroactively.
 *
 * Version 1.06c:
 * - Fixed a bug if instant casting a skill that would make an opponent battler
 * to force an action to end incorrectly. Thanks to DoubleX for the fix.
 * - Added a more consistent window refresh upon using instant actions.
 * - Instant icons are now shown outside of battle.
 *
 * Version 1.05:
 * - Added a fail safe to keep an action that once it's being used, it will
 * maintain its current status of being an instant or non-instant until the
 * action is finished to prevent inconsistencies if a skill were to change
 * mid-action from instant to non-instant or vice versa.
 *
 * Version 1.04:
 * - Fixed a bug that would cause the game to lock up if using an Instant
 * action after a common event that would jump labels.
 *
 * Version 1.03:
 * - Fixed a bug with Forced Actions locking out the battle.
 *
 * Version 1.02:
 * - Fixed a bug that caused common events after a forced action to interrupt.
 *
 * Version 1.01:
 * - Compatibility update with ChangeWeaponOnBattle.js.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_InstantCast');
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Icon.Instant = Number(Yanfly.Parameters['Instant Icon']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Instant.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Instant.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_InstantCast) {
  	DataManager.processInstantNotetags1($dataSkills);
    DataManager.processInstantNotetags1($dataItems);
    DataManager.processInstantNotetags2($dataActors);
    DataManager.processInstantNotetags2($dataClasses);
    DataManager.processInstantNotetags2($dataEnemies);
    DataManager.processInstantNotetags2($dataWeapons);
    DataManager.processInstantNotetags2($dataArmors);
    DataManager.processInstantNotetags2($dataStates);
    Yanfly._loaded_YEP_InstantCast = true;
  }
	return true;
};

DataManager.processInstantNotetags1 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.instantCast = false;
    obj.instantEval = '';
    var evalMode = 'none';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:INSTANT|instant cast)>/i)) {
				obj.instantCast = true;
			} else if (line.match(/<(?:INSTANT EVAL)>/i)) {
        evalMode = 'instant';
      } else if (line.match(/<\/(?:INSTANT EVAL)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'instant') {
        obj.instantEval = obj.instantEval + line + '\n';
      }
		}
	}
};

DataManager.processInstantNotetags2 = function(group) {
  var note1 = /<(?:INSTANT SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(?:INSTANT SKILL):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note3 = /<(?:INSTANT ITEM):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4 = /<(?:INSTANT ITEM):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note5 = /<(?:CANCEL INSTANT SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6 = /<(?:CANCEL INSTANT SKILL):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note7 = /<(?:CANCEL INSTANT ITEM):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note8 = /<(?:CANCEL INSTANT ITEM):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.instantSkill = [];
    obj.instantItem = [];
    obj.cancelInstantSkill = [];
    obj.cancelInstantItem = [];

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.instantSkill = obj.instantSkill.concat(array);
			} else if (line.match(note2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
					parseInt(RegExp.$2));
        obj.instantSkill = obj.instantSkill.concat(range);
			} else if (line.match(note3)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.instantItem = obj.instantItem.concat(array);
			} else if (line.match(note4)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
					parseInt(RegExp.$2));
        obj.instantItem = obj.instantItem.concat(range);
			} else if (line.match(note5)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.cancelInstantSkill = obj.cancelInstantSkill.concat(array);
			} else if (line.match(note6)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
					parseInt(RegExp.$2));
        obj.cancelInstantSkill = obj.cancelInstantSkill.concat(range);
			} else if (line.match(note7)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.cancelInstantItem = obj.cancelInstantItem.concat(array);
			} else if (line.match(note8)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
					parseInt(RegExp.$2));
        obj.cancelInstantItem = obj.cancelInstantItem.concat(range);
			}
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Instant.BattleManager_isInputting = BattleManager.isInputting;
BattleManager.isInputting = function() {
    if (this._instantCasting) return false;
    return Yanfly.Instant.BattleManager_isInputting.call(this);
};

BattleManager.performInstantCast = function() {
    if (Imported.YEP_BattleEngineCore) {
      this.stopAllSelection();
      this.resetSelection();
    }
    this._subject = BattleManager.actor();
    this._instantCasting = true;
    this.startAction();
};

Yanfly.Instant.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    this._startedInstantCasting = true;
    Yanfly.Instant.BattleManager_startAction.call(this);
};

Yanfly.Instant.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this._instantCasting) {
      this.endActorInstantCast();
    } else {
      this.endEnemyInstantCastAction();
      Yanfly.Instant.BattleManager_endAction.call(this);
    }
    this._startedInstantCasting = false;
};

BattleManager.endActorInstantCast = function() {
    var user = this._subject;
    if (Imported.YEP_BattleEngineCore) {
      if (this._processingForcedAction) this._phase = this._preForcePhase;
      this._processingForcedAction = false;
    }
    if (this.updateEventMain()) return;
    Yanfly.Instant.BattleManager_endAction.call(this);
    this._subject = user;
    this._instantCasting = undefined;
    user.makeActions();
    if (this.checkBattleEnd()) return;
    this._phase = 'input';
    if (user.canMove() && user.canInput()) {
      user.endInstantCast();
    } else {
      user.makeActions();
      this.selectNextCommand();
    }
    this.refreshStatus()
};

BattleManager.endEnemyInstantCastAction = function() {
    var battler = this._subject;
    if (!battler) return;
    if (battler.isActor()) return;
    var action = this._action;
    if (!action) return;
    var item = action.item();
    if (!item) return;
    if (battler.isInstantCast(item)) this.addInstantCastAction(battler);
};

BattleManager.addInstantCastAction = function(battler) {
    if (Imported.YEP_X_BattleSysATB && this.isATB()) return;
    if (Imported.YEP_X_BattleSysCTB && this.isCTB()) return;
    var action = new Game_Action(battler);
    battler._actions.push(action);
    battler.makeActions();
    this.makeActionOrders();
};

if (Imported.YEP_BattleEngineCore) {

Yanfly.Instant.BattleManager_savePreForceActionSettings =
    BattleManager.savePreForceActionSettings;
BattleManager.savePreForceActionSettings = function() {
    Yanfly.Instant.BattleManager_savePreForceActionSettings.call(this);
    this._instantCasting = false;
};

Yanfly.Instant.BattleManager_setPreForceActionSettings =
BattleManager.setPreForceActionSettings;
BattleManager.setPreForceActionSettings = function() {
    var settings =
      Yanfly.Instant.BattleManager_setPreForceActionSettings.call(this);
    settings['instantCasting'] = this._instantCasting;
    return settings;
};

Yanfly.Instant.BattleManager_resetPreForceActionSettings =
BattleManager.resetPreForceActionSettings;
BattleManager.resetPreForceActionSettings = function(settings) {
    Yanfly.Instant.BattleManager_resetPreForceActionSettings.call(this,
      settings);
    this._instantCasting = settings['instantCasting'];
};

} // Imported.YEP_BattleEngineCore

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.isInstantCast = function(item) {
    if (!item) return false;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (this.checkInstantCast(state, item)) return true;
    }
    return item.instantCast;
};

Game_Battler.prototype.performInstantEval = function(item) {
    var instant = undefined;
    var skill = item;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.instantEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM INSTANT CAST ERROR');
    }
    return instant;
};

Game_Battler.prototype.isCancelInstantCast = function(item) {
    if (!item) return false;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (this.checkCancelInstantCast(state, item)) return true;
    }
    return false;
};

Game_Battler.prototype.checkInstantCast = function(obj, item) {
    var id = item.id;
    if (!obj) return false;
    if (DataManager.isSkill(item)) {
      if (!obj.instantSkill) return false;
      if (obj.instantSkill.contains(id)) return true;
    } else if (DataManager.isItem(item)) {
      if (!obj.instantItem) return false;
      if (obj.instantItem.contains(id)) return true;
    }
    return false;
};

Game_Battler.prototype.checkCancelInstantCast = function(obj, item) {
    var id = item.id;
    if (!obj) return false;
    if (DataManager.isSkill(item)) {
      if (!obj.cancelInstantSkill) return false;
      if (obj.cancelInstantSkill.contains(id)) return true;
    } else if (DataManager.isItem(item)) {
      if (!obj.cancelInstantItem) return false;
      if (obj.cancelInstantItem.contains(id)) return true;
    }
    return false;
};

Yanfly.Instant.Game_Battler_onRestrict = Game_Battler.prototype.onRestrict;
Game_Battler.prototype.onRestrict = function() {
    var instant = false;
    if ($gameParty.inBattle()) {
      if (BattleManager._subject === this && BattleManager._instantCasting) {
        instant = true;
        var currentAction = this.currentAction();
      }
    }
    Yanfly.Instant.Game_Battler_onRestrict.call(this);
    if (instant) {
      this.setAction(0, currentAction);
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.endInstantCast = function() {
    if (Imported.YEP_BattleEngineCore) {
      this.spriteStepForward();
      $gameParty.requestMotionRefresh();
      this.requestMotion('walk');
    } else {
      this.setActionState('inputting');
    }
};

Game_Actor.prototype.isInstantCast = function(item) {
    if (!item) return false;
    if ($gameParty.inBattle() && BattleManager._startedInstantCasting) {
      return BattleManager._instantCasting;
    }
    if (item.instantEval.length > 0) {
      var outcome = this.performInstantEval(item);
      if (outcome === true || outcome === false) return outcome;
    }
    if (this.isCancelInstantCast(item)) return false;
    if (this.checkInstantCast(this.actor(), item)) return true;
    if (this.checkInstantCast(this.currentClass(), item)) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (this.checkInstantCast(equip, item)) return true;
    }
    return Game_Battler.prototype.isInstantCast.call(this, item);
};

Game_Actor.prototype.isCancelInstantCast = function(item) {
    if (!item) return false;
    if (this.checkCancelInstantCast(this.actor(), item)) return true;
    if (this.checkCancelInstantCast(this.currentClass(), item)) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (this.checkCancelInstantCast(equip, item)) return true;
    }
    return Game_Battler.prototype.isCancelInstantCast.call(this, item);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.isInstantCast = function(item) {
    if (!item) return false;
    if (item.instantEval.length > 0) {
      var outcome = this.performInstantEval(item);
      if (outcome === true || outcome === false) return outcome;
    }
    if (this.isCancelInstantCast(item)) return false;
    if (this.checkInstantCast(this.enemy(), item)) return true;
    return Game_Battler.prototype.isInstantCast.call(this, item);
};

Game_Enemy.prototype.isCancelInstantCast = function(item) {
    if (!item) return false;
    if (this.checkCancelInstantCast(this.enemy(), item)) return true;
    return Game_Battler.prototype.isCancelInstantCast.call(this, item);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Instant.Scene_Battle_selectNextCommand =
    Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
    if (this.isInstantCast()) {
      this.instantCastStart();
      BattleManager.performInstantCast();
    } else {
      Yanfly.Instant.Scene_Battle_selectNextCommand.call(this);
    }
};

Scene_Battle.prototype.instantCastStart = function() {
    this._enemyWindow.hide();
    this._actorWindow.hide();
    this._skillWindow.hide();
    this._itemWindow.hide();
};

Scene_Battle.prototype.isInstantCast = function() {
    var actor = BattleManager.actor();
    if (!actor) return false;
    var action = BattleManager.inputtingAction();
    if (!action) return false;
    if (action !== actor.action(0)) return false;
    var item = action.item();
    return actor.isInstantCast(item);
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Instant.Window_Base_drawItemName =
    Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, wx, wy, ww) {
    Yanfly.Instant.Window_Base_drawItemName.call(this, item, wx, wy, ww)
    ww = ww || 312;
    this.drawInstantIcon(item, wx, wy, ww);
};

Window_Base.prototype.drawInstantIcon = function(item, wx, wy, ww) {
    var icon = Yanfly.Icon.Instant;
    if (icon <= 0) return;
    if (!item) return;
    if (!DataManager.isItem(item) && !DataManager.isSkill(item)) return;
    var actor = this._actor;
    if (!actor) return;
    if (!actor.isInstantCast(item)) return;
    this.drawIcon(icon, wx + 2, wy + 2);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
