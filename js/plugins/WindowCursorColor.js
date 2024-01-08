/*---------------------------------------------------------------------------*
 * 2019/10/31 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc ウィンドウのカーソルの色を変えるプラグイン
 * @author kido0617
 * @help
 *   パラメータにF0F0F0の形式で色を指定してください
 * 
 * 
 * @param カーソルの色
 * @desc カーソルの色です。F0F0F0の形式で入力してください。デフォは白のFFFFFF
 * @type string
 * @default FFFFFF
 * 
 * @param グラデーションスタート
 * @desc カーソルの右端を透明にフェードし始める位置(0～1)。フェードしないなら1
 * @type string
 * @default 0.5
 * 
 * @param スキンの影響
 * @desc デフォルトだとウィンドウのスキンの影響を受けます
 * @type boolean
 * @default false
 * 
 */



(function () {

  const parameters = PluginManager.parameters('WindowCursorColor');
  const color = parseInt("0x" + parameters['カーソルの色']);
  if(isNaN(color))console.error("カーソルの色の指定が間違っています");
  const gradationStart = parseFloat(parameters['グラデーションスタート']);
  const useSkin = parameters['スキンの影響'] == "true";

  const _createAllParts = Window.prototype._createAllParts;
  Window.prototype._createAllParts = function() {
    _createAllParts.call(this);
    this._windowCursorSprite.tint = color;
  };

  Window.prototype._refreshCursor = function() {
    var pad = this._padding;
    var x = this._cursorRect.x + pad - this.origin.x;
    var y = this._cursorRect.y + pad - this.origin.y;
    var w = this._cursorRect.width;
    var h = this._cursorRect.height;
    var m = 4;
    var x2 = Math.max(x, pad);
    var y2 = Math.max(y, pad);
    var ox = x - x2;
    var oy = y - y2;
    var w2 = Math.min(w, this._width - pad - x2);
    var h2 = Math.min(h, this._height - pad - y2);
    var bitmap = new Bitmap(w2, h2);

    this._windowCursorSprite.bitmap = bitmap;
    this._windowCursorSprite.setFrame(0, 0, w2, h2);
    this._windowCursorSprite.move(x2, y2);


    if(useSkin){
      if (w > 0 && h > 0 && this._windowskin) {
        var skin = this._windowskin;
        var p = 96;
        var q = 48;
        bitmap.blt(skin, p+m, p+m, q-m*2, q-m*2, ox+m, oy+m, w-m*2, h-m*2);
        bitmap.blt(skin, p+m, p+0, q-m*2, m, ox+m, oy+0, w-m*2, m);
        bitmap.blt(skin, p+m, p+q-m, q-m*2, m, ox+m, oy+h-m, w-m*2, m);
        bitmap.blt(skin, p+0, p+m, m, q-m*2, ox+0, oy+m, m, h-m*2);
        bitmap.blt(skin, p+q-m, p+m, m, q-m*2, ox+w-m, oy+m, m, h-m*2);
        bitmap.blt(skin, p+0, p+0, m, m, ox+0, oy+0, m, m);
        bitmap.blt(skin, p+q-m, p+0, m, m, ox+w-m, oy+0, m, m);
        bitmap.blt(skin, p+0, p+q-m, m, m, ox+0, oy+h-m, m, m);
        bitmap.blt(skin, p+q-m, p+q-m, m, m, ox+w-m, oy+h-m, m, m);
      }
    }else{
      bitmap.gradientFillForCursor(gradationStart);
    }
  };

  Bitmap.prototype.gradientFillForCursor = function(rate) {
    var context = this._context;
    var grad;
    var x = 0, y = 0;
    var color1 = '#FFFFFF', color2 = 'rgba(255,255,255,0)';
    grad = context.createLinearGradient(x, y, x + this.width, y);
    grad.addColorStop(0, color1);
    grad.addColorStop(rate, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.fillRect(x, y, this.width, this.height);
    context.restore();
    this._setDirty();
  };

})();