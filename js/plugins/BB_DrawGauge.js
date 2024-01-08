//=============================================================================
// BB_DrawGauge.js
// Copyright (c) 2016 BB ENTERTAINMENT
//=============================================================================

/*:
 * @plugindesc ゲージ改造プラグイン
 * @author ビービー
 * 
 * @param GaugeFrameColor
 * @desc ゲージ枠色指定
 * デフォルト：0（白）
 * @default 0
 * 

 * @param GaugeHPColor1
 * @desc HPゲージ色指定1
 * デフォルト：20
 * @default 20
 * 
 * @param GaugeHPColor2
 * @desc HPゲージ色指定2
 * デフォルト：21
 * @default 21
 * 
 * @param GaugeMPColor1
 * @desc MPゲージ色指定1
 * デフォルト：22
 * @default 22
 * 
 * @param GaugeMPColor2
 * @desc MPゲージ色指定2
 * デフォルト：23
 * @default 23
 * 
 * @param GaugeTPColor1
 * @desc TPゲージ色指定1
 * デフォルト：28
 * @default 28
 * 
 * @param GaugeTPColor2
 * @desc TPゲージ色指定2
 * デフォルト：29
 * @default 29
 * 
 * @param GaugeBackColor
 * @desc ゲージ背景色指定
 * デフォルト：19（黒）
 * @default 19
 * 
 * @help ゲージをカスタマイズする事ができるプラグインです。
 * 
 * パラメータで枠の色を指定できます。
 * 
 * GaugeFrameColor：指定できる色はテキストカラーと同じです。
 * テキストカラーと同じ数字で指定してください。
 * 
 * もし枠を太くしたい場合はこのファイルをテキストエディターなどで開き以下の部分を消し
 *     var gaugeBB = y + this.lineHeight() - 9;
 *     this.contents.fillRect(x - 1, gaugeBB - 1, width + 2, 8, this.textColor(BB_GFC));
 *     this.contents.fillRect(x, gaugeY - 1, width, 6, this.gaugeBackColor());
 *     this.contents.gradientFillRect(x, gaugeY - 1, fillW, 6, color1, color2);
 * 以下のようにすることで倍の太さに変える事ができます。
 *     var gaugeBB = y + this.lineHeight() - 10;
 *     this.contents.fillRect(x - 2, gaugeBB - 2, width + 4, 10, this.textColor(BB_GFC));
 *     this.contents.fillRect(x, gaugeY - 2, width, 6, this.gaugeBackColor());
 *     this.contents.gradientFillRect(x, gaugeY - 2, fillW, 6, color1, color2);
 * 
 * パラメータでゲージの色を指定できます。
 * テキストカラーと同じ数字で指定してください。
 * HPゲージなど二色指定できるゲージはグラデーションで表示されます。
 * 同じ色にすることで単色にすることもできます。
 * 
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 * 
 * BLOG:http://bb-entertainment-blog.blogspot.jp/
 */

(function() {

// プラグインパラメータ管理
var parameters = PluginManager.parameters('BB_DrawGauge');
var BB_GFC = Number(parameters['GaugeFrameColor']);
var BB_GBC = Number(parameters['GaugeBackColor']);
var BB_GHC1 = Number(parameters['GaugeHPColor1']);
var BB_GHC2 = Number(parameters['GaugeHPColor2']);
var BB_GMC1 = Number(parameters['GaugeMPColor1']);
var BB_GMC2 = Number(parameters['GaugeMPColor2']);
var BB_GTC1 = Number(parameters['GaugeTPColor1']);
var BB_GTC2 = Number(parameters['GaugeTPColor2']);


// カラー変更
var _Window_Base_prototype_gaugeBackColor = Window_Base.prototype.gaugeBackColor;
Window_Base.prototype.gaugeBackColor = function() {
    return this.textColor(BB_GBC);
};

var _Window_Base_prototype_hpGaugeColor1 = Window_Base.prototype.hpGaugeColor1;
Window_Base.prototype.hpGaugeColor1 = function() {
    return this.textColor(BB_GHC1);
};

var _Window_Base_prototype_hpGaugeColor2 = Window_Base.prototype.hpGaugeColor2;
Window_Base.prototype.hpGaugeColor2 = function() {
    return this.textColor(BB_GHC2);
};

var _Window_Base_prototype_mpGaugeColor1 = Window_Base.prototype.mpGaugeColor1;
Window_Base.prototype.mpGaugeColor1 = function() {
    return this.textColor(BB_GMC1);
};

var _Window_Base_prototype_mpGaugeColor2 = Window_Base.prototype.mpGaugeColor2;
Window_Base.prototype.mpGaugeColor2 = function() {
    return this.textColor(BB_GMC2);
};

var _Window_Base_prototype_tpGaugeColor1 = Window_Base.prototype.tpGaugeColor1;
Window_Base.prototype.tpGaugeColor1 = function() {
    return this.textColor(BB_GTC1);
};

var _Window_Base_prototype_tpGaugeColor2 = Window_Base.prototype.tpGaugeColor2;
Window_Base.prototype.tpGaugeColor2 = function() {
    return this.textColor(BB_GTC2);
};

// 枠の描画
var _Window_Base_prototype_drawGauge = Window_Base.prototype.drawGauge;
Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2, isMia) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    var gaugeBB = y + this.lineHeight() - 9;
    this.contents.fillRect(x - 1, gaugeBB - 1, width + 2, 8, this.textColor(BB_GFC));
    this.contents.fillRect(x, gaugeY - 1, width, 6, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY - 1, fillW, 6, color1, color2);
	if(isMia){
		var ZX = ($gameVariables.value(1259) - $gameVariables.value(1030)) / 100 * width;
		this.contents.gradientFillRect(x + ZX, gaugeY - 1, width - ZX, 6, 'rgba(255,42,242,1)', 'rgba(190,30,180,1)');
	}
};


})();