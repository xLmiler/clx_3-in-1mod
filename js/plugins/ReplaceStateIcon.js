/*---------------------------------------------------------------------------*
 * 2020/02/20 @kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc ステートアイコンの描画方法を変える
 * @author kido
 * 
 * 
 * @help
 *   ステートアイコンの描画方法を変える（IconSetがでかすぎると描画できなくなる)
 *
 */


(function(){


  Sprite_StateIcon.prototype.loadBitmap = function() {
    this.iconBitmap = ImageManager.loadSystem('IconSet');
    this.bitmap = new Bitmap(Sprite_StateIcon._iconWidth, Sprite_StateIcon._iconWidth);
  };

  Sprite_StateIcon.prototype.updateFrame = function() {
    if(this._tmpIconIndex != this._iconIndex){
      var pw = Sprite_StateIcon._iconWidth;
      var ph = Sprite_StateIcon._iconHeight;
      var sx = this._iconIndex % 16 * pw;
      var sy = Math.floor(this._iconIndex / 16) * ph;
      this.bitmap.clear();
      this.bitmap.blt(this.iconBitmap, sx, sy, pw, ph, 0, 0);
      this._tmpIconIndex = this._iconIndex;
    }
  };

})();