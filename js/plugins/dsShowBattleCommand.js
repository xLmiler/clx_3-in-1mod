//==============================================================================
// dsShowBattleCommand.js
// Copyright (c) 2016 Douraku
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//==============================================================================

/*:
 * @plugindesc 戦闘中のコマンド表示制御プラグイン ver1.00
 * @author 道楽
 *
 * @param Show Attack Command
 * @desc 攻撃コマンドを表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Guard Command
 * @desc 防御コマンドを表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Item Command
 * @desc アイテムコマンドを表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 01
 * @desc スキルタイプ01を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 02
 * @desc スキルタイプ02を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 03
 * @desc スキルタイプ03を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 04
 * @desc スキルタイプ04を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 05
 * @desc スキルタイプ05を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 06
 * @desc スキルタイプ06を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 07
 * @desc スキルタイプ07を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 08
 * @desc スキルタイプ08を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 09
 * @desc スキルタイプ09を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 10
 * @desc スキルタイプ10を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 11
 * @desc スキルタイプ11を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 12
 * @desc スキルタイプ12を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 13
 * @desc スキルタイプ13を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 14
 * @desc スキルタイプ14を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 15
 * @desc スキルタイプ15を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 16
 * @desc スキルタイプ16を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 17
 * @desc スキルタイプ17を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 18
 * @desc スキルタイプ18を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 19
 * @desc スキルタイプ19を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 20
 * @desc スキルタイプ20を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 21
 * @desc スキルタイプ21を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 22
 * @desc スキルタイプ22を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 23
 * @desc スキルタイプ23を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 24
 * @desc スキルタイプ24を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 25
 * @desc スキルタイプ25を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 26
 * @desc スキルタイプ26を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 27
 * @desc スキルタイプ27を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 28
 * @desc スキルタイプ28を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 29
 * @desc スキルタイプ29を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @param Show Skill Type 30
 * @desc スキルタイプ30を表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 */

var Imported = Imported || {};
Imported.dsShowBattleCommand = true;

var dsShowBattleCommand = {};

(function(ns) {

	ns.Param = (function() {
		var ret = {};
		var parameters = PluginManager.parameters('dsShowBattleCommand');
		ret.ShowAttackCommand = Boolean(parameters['Show Attack Command'] === 'true' || false);
		ret.ShowGuardCommand = Boolean(parameters['Show Guard Command'] === 'true' || false);
		ret.ShowItemCommand = Boolean(parameters['Show Item Command'] === 'true' || false);
		ret.ShowSkillTypeMax = 1 + 30;
		ret.ShowSkillType = [];
		for ( var ii = 1; ii < ret.ShowSkillTypeMax; ii++ )
		{
			var paramName = 'Show Skill Type ' + ('00'+ii).slice(-2);
			ret.ShowSkillType[ii] = Boolean(parameters[paramName] === 'true' || false);
		}
		return ret;
	})();

	//--------------------------------------------------------------------------
	/** Window_ActorCommand */
	var _Window_ActorCommand_addAttackCommand = Window_ActorCommand.prototype.addAttackCommand;
	Window_ActorCommand.prototype.addAttackCommand = function()
	{
		if ( ns.Param.ShowAttackCommand )
		{
			_Window_ActorCommand_addAttackCommand.call(this);
		}
	};

	Window_ActorCommand.prototype.addSkillCommands = function()
	{
		var skillTypes = this._actor.addedSkillTypes();
		skillTypes.sort(function(a, b) {
			return a - b;
		});
		skillTypes.forEach(function(stypeId) {
			if ( this.isShowSkillType(stypeId) )
			{
				var name = $dataSystem.skillTypes[stypeId];
				this.addCommand(name, 'skill', true, stypeId);
			}
		}, this);
	};

	var _Window_ActorCommand_addGuardCommand = Window_ActorCommand.prototype.addGuardCommand;
	Window_ActorCommand.prototype.addGuardCommand = function()
	{
		if ( ns.Param.ShowGuardCommand )
		{
			_Window_ActorCommand_addGuardCommand.call(this);
		}
	};

	var _Window_ActorCommand_addItemCommand = Window_ActorCommand.prototype.addItemCommand;
	Window_ActorCommand.prototype.addItemCommand = function()
	{
		if ( ns.Param.ShowItemCommand )
		{
			_Window_ActorCommand_addItemCommand.call(this);
		}
	};

	Window_ActorCommand.prototype.isShowSkillType = function(stypeId)
	{
		if ( stypeId < ns.Param.ShowSkillTypeMax )
		{
			return ns.Param.ShowSkillType[stypeId];
		}
		return true;
	};

})(dsShowBattleCommand);

