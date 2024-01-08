/*---------------------------------------------------------------------------*
 * 2020/06/01 kido
 * https://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 配信風のコメント表示プラグイン
 * @author kido0617
 * @help
 * 
 *  LiveCommentManager(LCM)
 * 
 * ・初期化
 *  LCM.init(x, y, width, height);
 * 
 * ・表示(透明背景)
 *  LCM.show('テキスト');
 * 
 * ・表示(背景色あり。プラグインパラメータで色を定義して使います)
 *  LCM.show('テキスト', 1);
 * 
 * ・表示(制御文字あり)
 *  LCM.show('\\I[82]\\C[2]ジョン:\\C[0]改行してみる\nあいうえおー');
 * 
 * ・非表示状態にする
 *  LCM.setVisible(false);
 * 
 * ・表示状態にする
 *  LCM.setVisible(true);
 * 
 * ・コメント消去(showすればまた1から追加できる)
 *  LCM.clear();
 * 
 * ・撤去(完全に消えます。再度 initしてください)
 *  LCM.remove();
 * 
 * initしたマップでのみ有効。マップ遷移したら自動的に消えます。
 * 
 * @param 1行の高さ
 * @desc 基本的に フォントサイズ+α です。
 * @type number
 * @default 36
 * 
 * @param フォントサイズ
 * @desc フォントサイズです
 * @type number
 * @default 28
 * 
 * @param アイコンサイズ
 * @desc アイコンサイズです
 * @type number
 * @default 32
 * 
 * @param スクロールスピード
 * @desc コメントが上にスクロールするスピード[pixel/frame]
 * @type number
 * @default 4
 * 
 * @param テキストパディング
 * @desc テキストの左端のパディング[pixel]
 * @type number
 * @default 6
 * 
 * @param 文字のアウトラインを消す
 * @desc 消したいときはtrue
 * @type boolean
 * @default true
 * 
 * @param デフォルトフォントカラー
 * @desc 白文字以外の場合は変える(ツクールのシステムの色番号 例:14)
 * @type number
 * @default 0
 * 
 * @param 背景色定義
 * @desc rgb(255, 0, 0) の形式で指定。使うときは番号(1～)で指定
 * @type string[]
 * @default []
 * 
 */
 
(function () {

  const params = PluginManager.parameters('LiveComment');
  const lineHeight = parseInt(params['1行の高さ']);
  const fontSize = parseInt(params['フォントサイズ']);
  const iconSize = parseInt(params['アイコンサイズ']);
  const scrollSpeed = parseInt(params['スクロールスピード']);
  const textPadding = parseInt(params['テキストパディング']);
  const outlineDisabled = params['文字のアウトラインを消す'] == 'true';
  const defaultFontColor = parseInt(params['デフォルトフォントカラー']);
  const colors = JSON.parse(params['背景色定義']);

  window.LCM = function () { };

  function getLiveCommentContainer(){
    let lc = SceneManager._scene._liveCommentContainer;
    if(!lc){
      //console.error('initしてません！');
    }
    return lc;
  }

  LCM.init = function (x, y, width, height) {
    if(SceneManager._scene._liveCommentContainer){
      console.error('すでにinitされてあります');
      return;
    }
    let lc = new LiveCommentContainer(x, y, width, height);
    var spriteSetMap = null;
    for(var i = 0 ; SceneManager._scene.children.length; i++){
      if(SceneManager._scene.children[i] instanceof Spriteset_Map){
        spriteSetMap = SceneManager._scene.children[i];
        break;
      }
    }
    if(spriteSetMap){
      //ピクチャの上、フェードの下に位置したい
      for(var i = 0 ; i < spriteSetMap.children.length; i++){
        if(spriteSetMap.children[i] instanceof Sprite_Timer) {
          spriteSetMap.addChildAt(lc, i);
          break;
        }
      }
    }else{
      SceneManager._scene.addChild(lc);
    }
    
    
    SceneManager._scene._liveCommentContainer = lc;
  };

  LCM.show = function (text, backgroundColor) {
    let lc = getLiveCommentContainer();
    if(lc) lc.show(text, backgroundColor);
  };

  LCM.setVisible = function(toggle){
    let lc = getLiveCommentContainer();
    if(lc) lc.visible = toggle;
  };

  LCM.remove = function(){
    let lc = getLiveCommentContainer();
    if(!lc) return;
    lc.parent.removeChild(lc);
    SceneManager._scene._liveCommentContainer = null;
  };

  LCM.clear = function(){
    let lc =  getLiveCommentContainer();
    if(lc) lc.clear();
  };

  function LiveCommentContainer(x, y, width, height) {
    PIXI.Container.call(this);
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
    this.yPos = 0;
    this.mask = new PIXI.Graphics();
    this.mask.beginFill(); 
    this.mask.drawRect(x, y, width, height);
    this.mask.endFill();
  }

  LiveCommentContainer.prototype = Object.create(PIXI.Container.prototype);
  LiveCommentContainer.prototype.constructor = LiveCommentContainer;

  LiveCommentContainer.prototype.update = function () {
    let moveY = 0;
    //最後に追加したコメントが枠外だったらスクロール開始するので移動量算出
    if(this.children.length > 0){
      let last = this.children[this.children.length - 1];
      let bottom = last.y + last.height;
      let diff = bottom - this._height;
      if(diff > 0 ) moveY = diff > scrollSpeed ? scrollSpeed : diff;
    }

    for (let i = 0; i < this.children.length; i++){
      this.children[i].update();
      this.children[i].y -= moveY;
    }
    this.yPos -= moveY;

    //画面外にスクロールしたコメントを消す
    if (this.children[0] && this.children[0].y + this.children[0].height <= 0) {
      this.removeChildAt(0);
    }
  };

  
  LiveCommentContainer.prototype.show = function (text, backgroundColor) {
    let lcw = new Window_LiveComment(this.yPos, this._width, text, backgroundColor);
    this.yPos += lcw.height;
    this.addChild(lcw);
  };
 
  LiveCommentContainer.prototype.clear = function () {
    this.removeChildren();
    this.yPos = 0;
  };

  function Window_LiveComment() {
    this.initialize.apply(this, arguments);
  }

  Window_LiveComment.prototype = Object.create(Window_Base.prototype);
  Window_LiveComment.prototype.constructor = Window_LiveComment;


  Window_LiveComment.prototype.initialize = function (y, width, text, backgroundColor) {
    let line = (text.match(/\n/g ) || [] ).length + 1;
    Window_Base.prototype.initialize.call(this, 0, y, width, line * this.lineHeight());
  
    this.text = text;
    if(backgroundColor) this.createBackground(colors[backgroundColor - 1]);
    
    this.opacity = 0;
    let outlineFunc;
    if(outlineDisabled) {
      outlineFunc = Bitmap.prototype._drawTextOutline;
      Bitmap.prototype._drawTextOutline = function(){};
    }
    this.drawTextEx(text, textPadding, this.lineHeight() / 2 - this.standardFontSize() / 2 - 4);
    if(outlineDisabled) Bitmap.prototype._drawTextOutline = outlineFunc;
  };

  Window_LiveComment.prototype.createBackground = function (backgroundColor) {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = new Bitmap(this._width, this._height);
    this._backSprite.bitmap.fillAll(backgroundColor);
    this.addChildToBack(this._backSprite);
  };

  Window_LiveComment.prototype.normalColor = function() {
    if(defaultFontColor) return this.textColor(defaultFontColor);
    
    return this.textColor(0);
  };
 
  Window_LiveComment.prototype.lineHeight = function () {
    return lineHeight;
  };

  Window_LiveComment.prototype.standardPadding = function () {
    return 0;
  };

  Window_LiveComment.prototype.standardFontSize = function () {
    return fontSize;
  };

  Window_LiveComment.prototype.processDrawIcon = function(iconIndex, textState) {
    var size = this.getIconSize();
    var y = (this.lineHeight() - size) / 2;
    this.drawIcon(iconIndex, textState.x + 2, y);
    textState.x += size + 4;
  };

  Window_LiveComment.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var size = this.getIconSize();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
  };

  Window_LiveComment.prototype.getIconSize = function() {
    return iconSize;
  };


})();
