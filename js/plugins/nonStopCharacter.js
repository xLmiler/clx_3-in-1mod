//=============================================================================
// マップ外イベントノンストッププラグイン
// nonStopCharacter.js
// Copyright (c) 2018 村人Ａ
// 改変 kido
//=============================================================================

/*:ja
 * @plugindesc 画面外に出たマップイベントの動きを停止しないようにするプラグインです。
 * @author 村人A
 *
 * @help
 * 画面外に出たマップイベントの動きを停止しないようにするプラグインです。
 *
 */
(function () {

	var isNearTheScreen = Game_CharacterBase.prototype.isNearTheScreen;
	Game_CharacterBase.prototype.isNearTheScreen = function () {
		if ($dataMap && $dataMap.meta && $dataMap.meta.nonStopCharacter == "true") return true;
		return isNearTheScreen.call(this);
	};
})();