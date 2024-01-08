/*---------------------------------------------------------------------------*
 * 2021/01/22 kido0617
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc プレイヤーの位置にイベントが存在するかチェックする
 * @author kido0617
 * @help
 * プレイヤーの位置に以下の条件のイベントが存在するか返すメソッドを提供します。
 * ・プライオリティが「通常キャラの下」or「通常キャラの上」
 * ・トリガーが「プレイヤーから接触」or「イベントから接触」
 * 
 * 使用方法。同じ位置にイベントがあれば true を返します
 * existPlayerOnTileEvent()
 * 
 */


(function () {
  window.existPlayerOnTileEvent = function () {
    let exist = false;
    $gameMap.eventsXy($gamePlayer.x, $gamePlayer.y).forEach(function (event) {
      if (event.isTriggerIn([1, 2]) && event.isNormalPriority() === false) {
        exist = true;
      }
    });
    return exist;
  };

})();