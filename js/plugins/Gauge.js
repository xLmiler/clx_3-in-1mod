/*---------------------------------------------------------------------------*
 * 2019/10/16 @kido0617
 * https://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc ピクチャをゲージ化するプラグイン
 * @author kido0617
 * @help
 * プラグインコマンド
 *
 *  SetGauge ピクチャ番号 現在値格納の変数番号 最大値格納の変数番号 ゲージスピード
 *  
 *  横方向ゲージの場合
 *  SetGauge 1 10 11 0.5
 * 
 *  縦方向ゲージの場合
 *  SetGauge 1 10 11 0.5 Vertical
 * 
 *  横も縦も逆方向のゲージにしたい場合はピクチャの表示で拡大を-100%にして反転させてください
 * 
 *  円形ゲージの場合
 *  SetGauge 1 10 11 0.5 Circle
 *  開始角度と終了角度の指定。単位は度。デフォルトは0から360度。0度は時計の3時の方向
 *  SetGauge 1 10 11 0.5 Circle 40 180
 *  反時計回りの場合は開始と終了を逆にしてください
 *  SetGauge 1 10 11 0.5 Circle 180 40
 * 
 *  色の変更
 *  SetGaugeColor ピクチャ番号 色変更方法 色調変更開始割合 R G B Gray
 *  
 *  例: 0.3(30%)以下になったら、ツクールの色調変更を使って色を徐々に変更する
 *  SetGaugeColor 1 tone 0.3 255 0 0 0
 * 
 *  例: 0.3(30%)以下になったら、赤色を徐々に加える。tintの場合、Grayはいりません
 *  SetGaugeColor 1 tint 0.3 255 0 0
 * 
 *  ツクールの色調変更は白色には何も影響されないが、tintは色を加えるので白色に着色できる。
 *  一方ツクールは黒色を変更できるが、tintは黒色は変更できない
 * 
 */

 (function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'SetGauge') {
      if(args.length < 4){
        console.error('Gaugeコマンドが足りません');
        return;
      }
      var id = parseInt(args[0]);
      var varId = parseInt(args[1]);
      var maxVarId = parseInt(args[2]);
      var speed = parseFloat(args[3]);
      var direction = args[4] ? args[4] : 'Horizontal';
      if(!id || !varId || !maxVarId || !speed){
        console.error('Gaugeコマンドが正しくありません');
        return;
      }
      if(direction != 'Horizontal' && direction != 'Vertical' && direction != 'Circle'){
        console.error('Gaugeの方向が正しくありません。Horizontal or Vertical or Circle');
        return;
      }
      var picture = $gameScreen.picture(id);
      if(!picture){
        console.error(id + '番目のピクチャは存在しません');
        return;
      }
      if(direction == 'Circle'){
        var startAngle = parseInt(args[5]) / 180 * Math.PI;
        var endAngle = parseInt(args[6]) / 180 * Math.PI;
        if(isNaN(startAngle)) startAngle = 0;
        if(isNaN(endAngle)) endAngle = 2 * Math.PI;
        var isClockwise = startAngle < endAngle;
      }
      picture.setGaugeSetting({
        varId: varId,
        maxVarId: maxVarId,
        speed: speed,
        direction: direction,
        startAngle: startAngle,
        endAngle: endAngle,
        isClockwise: isClockwise
      });
    }else if (command === 'SetGaugeColor') {
      if(args.length < 5){
        console.error('Gaugeカラーコマンドが足りません');
        return;
      }
      var id = parseInt(args[0]);
      var type = args[1];
      var rate = parseFloat(args[2]);
      var r = parseInt(args[3]);
      var g = parseFloat(args[4]);
      var b = parseFloat(args[5]);
      var gray = parseFloat(args[6]);
      var picture = $gameScreen.picture(id);
      if(!picture){
        console.error(id + '番目のピクチャは存在しません');
        return;
      }
      if(type != 'tone' && type != 'tint'){
        console.error('tintかtoneを指定してください');
        return;
      }
      if(isNaN(rate) || isNaN(r) || isNaN(g) || isNaN(b) || (type == 'tone' && isNaN(gray))){
        console.error('コマンドが不正です');
        return;
      }
      picture.setGaugeColor({
        rate: rate,
        type: type,
        r: r,
        g: g,
        b: b,
        gray: gray
      });
    }
  };

  Game_Picture.prototype.initGauge = function() {
    this._nowGauge = null;
    this.gaugeSetting = null;
    this.gaugeColorSetting = null;
  };

  Game_Picture.prototype.setGaugeSetting = function(gaugeSetting) {
    this._nowGauge = $gameVariables.value(gaugeSetting.varId);
    this.gaugeSetting = gaugeSetting;
  };
  Game_Picture.prototype.setGaugeColor = function(gaugeColorSetting) {
    this.gaugeColorSetting = gaugeColorSetting;
  };
  
  const _gamePictureUpdate = Game_Picture.prototype.update;
  Game_Picture.prototype.update = function() {
    _gamePictureUpdate.call(this);
    if(!this.gaugeSetting) return;

    var value = $gameVariables.value(this.gaugeSetting.varId);
    if(value > this._nowGauge) this._nowGauge = Math.min(this._nowGauge + this.gaugeSetting.speed, value);
    else if(value < this._nowGauge) this._nowGauge = Math.max(value, this._nowGauge - this.gaugeSetting.speed);

    if(this.gaugeColorSetting && this.gaugeColorSetting.type == 'tone'){
      var gcs = this.gaugeColorSetting;
      var rate = this.getGaugeRate();
      if(rate >= gcs.rate){
        this.initTone();
      }else{
        var colorRate = 1 - rate / gcs.rate;
        
        this.tint([
          Math.floor(gcs.r * colorRate),
          Math.floor(gcs.g * colorRate),
          Math.floor(gcs.b * colorRate),
          Math.floor(gcs.gray * colorRate),
        ], 1);
      }
    }
    
  };

  Game_Picture.prototype.getGaugeRate = function() {
    if(!this.gaugeSetting) return null;
    return this._nowGauge / $gameVariables.value(this.gaugeSetting.maxVarId);
  };

  Game_Picture.prototype.getGaugeColorTintHex = function() {
    if(!this.gaugeColorSetting || this.gaugeColorSetting.type != 'tint') return 0xFFFFFF;
    var gaugeRate = this.getGaugeRate();
    if(gaugeRate >= this.gaugeColorSetting.rate) return 0xFFFFFF;
    var colorRate = 1 - gaugeRate / this.gaugeColorSetting.rate;
    var r = Math.floor(0xFF - (0xFF - this.gaugeColorSetting.r) * colorRate);
    var g = Math.floor(0xFF - (0xFF - this.gaugeColorSetting.g) * colorRate);
    var b = Math.floor(0xFF - (0xFF - this.gaugeColorSetting.b) * colorRate);
    return (r << 16) + (g << 8) + b;
  };

  var _gamePictureErase = Game_Picture.prototype.erase;
  Game_Picture.prototype.erase = function() {
    _gamePictureErase.call(this);
    this.initGauge();
  };

  var _gamePictureShow = Game_Picture.prototype.show;
  Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
    _gamePictureShow.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    this.initGauge();
  };


  const _spriteUpdate = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    _spriteUpdate.call(this);
    if (this.visible) {
      this.updateGauge();
    }
  };

  Sprite_Picture.prototype.updateGauge = function() {
    var rate = this.picture().getGaugeRate();
    if (rate !== null) {
      var setting = this.picture().gaugeSetting;
      switch(setting.direction){
      case 'Horizontal':
        this.setFrame(0, 0, this.bitmap.width * rate, this.bitmap.height);
        break;
      case 'Vertical':
        this.setFrame(0, 0, this.bitmap.width, this.bitmap.height * rate);
        break;
      case 'Circle':
        if(!this._gaugeMask){
          this._gaugeMask = new PIXI.Graphics();
        }
        this.mask = this._gaugeMask;
        this._gaugeMask.clear ();
        this._gaugeMask.beginFill(0xffffff, 1);
        var centerX = this.x + this.bitmap.width / 2;
        var centerY = this.y + this.bitmap.height / 2;
        this._gaugeMask.moveTo(centerX, centerY);
        var start = setting.startAngle, end = setting.endAngle;
        if(setting.isClockwise) this._gaugeMask.arc(centerX, centerY, this.bitmap.width / 2, start, start + (end - start) * rate); 
        else this._gaugeMask.arc(centerX, centerY, this.bitmap.width / 2, start, start - (start - end) * rate, true); 
        this._gaugeMask.endFill();
        break;
      }
      this.tint = this.picture().getGaugeColorTintHex();
    }else{
      this.tint = 0xFFFFFF;
      if(this.mask && this.mask == this._gaugeMask) this.mask = null;
    }
  };

})();