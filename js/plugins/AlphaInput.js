/*---------------------------------------------------------------------------*
 * 2020/11/27 @kido0617
 * https://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 英大文字だけ名前入力できるようにする
 * @author kido0617
 * @help
 *  名前入力処理の前にスクリプトコマンドで以下のようにしてください
 *  $gameTemp.nameInputAlphaOnly = true
 * 
 *  設定が残るので日本語入力したい場合はfalseにしてください（セーブデータには含まれません）
 *  $gameTemp.nameInputAlphaOnly = false
 * 
 * 
 */

(function(){

    var alphaOnlys =
        [ 'Ａ','Ｂ','Ｃ','Ｄ','Ｅ',  '','','','','',
          'Ｆ','Ｇ','Ｈ','Ｉ','Ｊ',  '','','','','',
          'Ｋ','Ｌ','Ｍ','Ｎ','Ｏ',  '','','','','',
          'Ｐ','Ｑ','Ｒ','Ｓ','Ｔ',  '','','','','',
          'Ｕ','Ｖ','Ｗ','Ｘ','Ｙ',  '','','','','',
          'Ｚ','［','］','＾','＿',  '','','','','',
          '０','１','２','３','４',  '','','','','',
          '５','６','７','８','９',  '','','','','',
          '／','＝','＠','＜','＞',  '','','','','OK'];

    Window_NameInput.prototype.table = function() {
        if($gameTemp.nameInputAlphaOnly){
            return [alphaOnlys];
        }

        if ($gameSystem.isJapanese()) {
            return [Window_NameInput.JAPAN1,
                    Window_NameInput.JAPAN2,
                    Window_NameInput.JAPAN3];
        } else if ($gameSystem.isRussian()) {
            return [Window_NameInput.RUSSIA];
        } else {
            return [Window_NameInput.LATIN1,
                    Window_NameInput.LATIN2];
        }
    };
  
})();