//=============================================================================
// MPP_DeleteSelfSwitch.js
//=============================================================================
// Copyright (c) 2016 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.0】場所移動した際に、指定したマップIDにあるすべてのイベントの指定したセルフスイッチをOFFにします。
 * @author 木星ペンギン
 *
 * @help プラグインコマンド:
 *   DeleteSelfSwitch n sw      # n  : マップID
 *                              # sw : OFFにするセルフスイッチ
 * 
 * ●プラグインコマンド[DeleteSelfSwitch]の例
 *  [OFFにするセルフスイッチ]は空白を入れずに指定してください。
 *  
 *  ・マップID 1 番のセルフスイッチ A をOFFにしたい場合
 *    
 *    DeleteSelfSwitch 1 A
 *    
 *  ・マップID 13 番のセルフスイッチ B,C,D をOFFにしたい場合
 * 
 *    DeleteSelfSwitch 13 BCD
 *    
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Map IDs
 * @desc セルフスイッチをOFFにするマップIDの配列
 * (空の場合はすべてのマップ)
 * 
 * @param Self Switches
 * @desc OFFにするセルフスイッチ
 * @default ABCD
 *
 */

(function() {

var MPPlugin = {};
MPPlugin.params = PluginManager.parameters('MPP_DeleteSelfSwitch');

MPPlugin.MapIDs = eval('[' + MPPlugin.params['Map IDs'] + ']');
MPPlugin.SelfSwitches = MPPlugin.params['Self Switches'];

var Alias = {};

//-----------------------------------------------------------------------------
// Game_SelfSwitches

Game_SelfSwitches.prototype.delete = function(mapId, switchs) {
    var re = new RegExp(mapId + ',\\d+,[' + switchs + ']');
    for (var key in this._data) {
        if (re.test(key)) {
            delete this._data[key];
        }
    }
    this.onChange();
};

//-----------------------------------------------------------------------------
// Game_Map

//37
Alias.GaMa_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    if (this._mapId !== mapId && (MPPlugin.MapIDs.length === 0 ||
            MPPlugin.MapIDs.contains(this._mapId))) {
        $gameSelfSwitches.delete(this._mapId, MPPlugin.SelfSwitches);
    }
    Alias.GaMa_setup.call(this, mapId);
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//1722
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.call(this, command, args);
    if (command === 'DeleteSelfSwitch') {
        $gameSelfSwitches.delete(Number(args[0]), args[1]);
    }
};



})();
