/*---------------------------------------------------------------------------*
 * 2019/05/27
 * Ver.1.0
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc バトル中の会話でもステータスを開いたままにする
 * @author kido
 * @help
 */

(function(){

  var _updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;
  Scene_Battle.prototype.updateStatusWindow = function() {
    _updateStatusWindow.call(this);
    this._statusWindow.open();
  };

})();