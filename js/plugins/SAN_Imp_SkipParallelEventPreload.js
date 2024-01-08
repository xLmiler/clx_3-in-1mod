//=============================================================================
// SAN_Imp_SkipParallelEventPreload.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 Sanshiro
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
// GitHub  : https://github.com/rev2nym
// Twitter : https://twitter.com/rev2nym
//=============================================================================

/*:
 * @plugindesc 并行事件预加载跳过 1.0.0
 * 这是一个性能改进插件。
 * @author Sanshiro https://github.com/rev2nym
 * @help
 * ■概要
 * 通过在处理并行事件时跳过图像预加载请求
 * 跳过并行事件和派生公共事件的命令分析处理。
 * 我们的目标是提高处理速度。
 * 
 * ■使用条款
 * MIT 许可证允许商业使用、修改和重新分发。
 * 但是，请不要删除或更改开头的评论。
 * 对于因使用本软件而造成的任何损害，作者不承担任何责任。
 * 请不要指望任何支持。
 */

var Imported = Imported || {};
Imported.SAN_Imp_SkipParallelEventPreload = true;

var Sanshiro = Sanshiro || {};
Sanshiro.Imp_SkipParallelEventPreload =
    Sanshiro.Imp_SkipParallelEventPreload || {};
Sanshiro.Imp_SkipParallelEventPreload.version = '1.0.0';

(function() {
'use strict';

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// インタープリター

// プリロードリクエストメソッド
var _Game_Interpreter_requestImages = Game_Interpreter.requestImages;

//-----------------------------------------------------------------------------
// Game_Event
//
// イベント
// 並列イベント時の更新
var _Game_Event_updateParallel =
    Game_Event.prototype.updateParallel;
Game_Event.prototype.updateParallel = function() {
    Game_Interpreter.requestImages = function() {};
    _Game_Event_updateParallel.call(this);
    Game_Interpreter.requestImages = _Game_Interpreter_requestImages;
};

})();