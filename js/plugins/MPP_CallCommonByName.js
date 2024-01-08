//=============================================================================
// MPP_CallCommonByName.js
//=============================================================================
// Copyright (c) 2018 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.2.1】コモンイベントを名前で呼び出します。
 * @author 木星ペンギン
 *
 * @help プラグインコマンド:
 *   CallCommon name       # コモンイベント名 name を呼び出す
 *   CCT str               # コモンイベント名が str で始まるものを呼び出す
 * 
 * ================================================================
 * ▼ プラグインコマンド 詳細
 * --------------------------------
 *  〇 コモンイベントを名前で呼び出すため、IDが変わっても修正の必要がありません。
 * 
 *  〇 一致する名前のコモンイベントが複数ある場合、後のものが呼び出されます。
 *    これにより前のコモンイベントを消去しなくとも、
 *    同じ名前で新たにコモンイベントを作成すれば、上書きができます。
 * 
 * ================================================================
 * ▼ プラグインパラメータ 詳細
 * --------------------------------
 *  〇 Plugin Commands (プラグインコマンド名)
 * 
 *   プラグインコマンド名を変更できます。
 *   コマンドを短くしたり日本語化等が可能です。
 *   
 *   コマンド名を変更しても、デフォルトのコマンドは使用できます。
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Plugin Commands
 * @type struct<Plugin>
 * @desc プラグインコマンド名
 * @default {"CallCommon":"CallCommon","CCT":"CCT"}
 *
 *
 *
 */

/*~struct~Plugin:
 * @param CallCommon
 * @desc コモンイベント名 name を呼び出す
 * @default CallCommon
 *
 * @param CCT
 * @desc コモンイベント名が str で始まるものを呼び出す
 * @default CCT
 *
 */

(function() {

var MPPlugin = {};

(function() {
    
    var parameters = PluginManager.parameters('MPP_CallCommonByName');
    
    MPPlugin.PluginCommands = JSON.parse(parameters['Plugin Commands']);

})();

//-----------------------------------------------------------------------------
// Game_Interpreter

var _GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _GaIn_pluginCommand.call(this, command, args);
    switch (command) {
        case MPPlugin.PluginCommands.CallCommon:
        case 'CallCommon':
            for (var i = $dataCommonEvents.length - 1; i > 0; i--) {
                var event = $dataCommonEvents[i];
                if (event.name === args[0]) {
                    var eventId = this.isOnCurrentMap() ? this._eventId : 0;
                    this.setupChild(event.list, eventId);
                    break;
                }
            }
        case MPPlugin.PluginCommands.CCT:
        case 'CCT':
            for (var i = $dataCommonEvents.length - 1; i > 0; i--) {
                var event = $dataCommonEvents[i];
                if (event.name.indexOf(args[0]) === 0) {
                    var eventId = this.isOnCurrentMap() ? this._eventId : 0;
                    this.setupChild(event.list, eventId);
                    break;
                }
            }
    }
};



})();
