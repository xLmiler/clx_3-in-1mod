//=============================================================================
// CommonEventBeforeAfterMenu.js
//=============================================================================

/*:
 * @plugindesc メニューを開く直前、または閉じた直後に、指定したコモンイベントを実行します。
 * @author 奏ねこま（おとぶきねこま）
 *
 * @param Common Event ID (before Menu)
 * @desc メニューを開く直前に実行するコモンイベントのIDを指定してください。
 * @default 0
 *
 * @param Common Event ID (after Menu)
 * @desc メニューを閉じた直後に実行するコモンイベントのIDを指定してください。
 * @default 0
 *
 * @help
 * *このプラグインには、プラグインコマンドはありません。
 *
 * [ 利用規約 ] ................................................................
 *  ・本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  ・商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  ・利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  ・プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  ・不具合対応以外のサポートやリクエストは、基本的に受け付けておりません。
 *  ・本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [ 改訂履歴 ] ................................................................
 *   Version 1.03  2017/04/24  ウェイトを含んだコモンイベントを実行すると、
 *                             イベント後にメニューが開かない問題を修正
 *   Version 1.02  2017/02/13  メニュー後コモンイベントが、マップ以外への
 *                             シーン遷移時にも実行予約されていた問題を修正
 *   Version 1.01  2017/01/05  メニュー後コモンイベントIDを0に設定しても
 *                             コモンイベントの予約が実行されていた問題を修正
 *   Version 1.00  2016/07/21  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2017 Nekoma Otobuki
 */

(function(){
    'use strict';

    const _PNAME = 'CommonEventBeforeAfterMenu';
    const _PARAMETERS = PluginManager.parameters(_PNAME);

    //const _COMMON_EVENT_ID_BM = +_PARAMETERS['Common Event ID (before Menu)'] || 0;
    const _COMMON_EVENT_ID_AM = +_PARAMETERS['Common Event ID (after Menu)']  || 0;

    /* function _(f){ return f[_PNAME] = f[_PNAME] || {} }

    var _Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
    Scene_Map.prototype.isMenuCalled = function() {
        return _Scene_Map_isMenuCalled.call(this) || _(this).reserveCallMenu;
    };

    var _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        if (_COMMON_EVENT_ID_BM && !_(this).reserveCallMenu) {
            _(this).reserveCallMenu = true;
            $gameTemp.reserveCommonEvent(_COMMON_EVENT_ID_BM);
        } else {
            _(this).reserveCallMenu = false;
            _Scene_Map_callMenu.call(this);
        }
    }; */

    var _Scene_Menu_terminate = Scene_Menu.prototype.terminate;
    Scene_Menu.prototype.terminate = function() {
        if (_COMMON_EVENT_ID_AM && SceneManager.isNextScene(Scene_Map)) {
            $gameTemp.reserveCommonEvent(_COMMON_EVENT_ID_AM);
        }
        _Scene_Menu_terminate.call(this);
    };
}());
