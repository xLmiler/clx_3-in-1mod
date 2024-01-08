//=============================================================================
// Trb_VisualizationPassable.js
//=============================================================================
//Copyright (c) 2016 Trb
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//twitter https://twitter.com/Trb_surasura
/*:
 * @plugindesc テストプレイ用・マップの通行判定を可視化するプラグイン
 * @author Trb
 * @version 1.00 2016/10/23 初版
 *          1.01 2016/10/24 フィルターの色を変更できるようにしました。
 * 
 * @help このプラグインをオンにすると、マップの通行不可能な部分に赤いフィルターが掛かります。
 * マップの通行判定にミスがないかチェックする時に使用してください。
 * ctrlキーを押すと、表示/非表示を切り替えることができます。
 * また、1キー、2キーでフィルターの色を変更することができます。
 * 使う色はプラグインのパラメータで設定できます。(書き方は後述)
 * 
 * テストプレイ用のプラグインなので、ゲームが完成して公開する際には必ず外すようにして下さい。
 * 
 * 
 * <パラメータについて>
 * パラメータのcolor1,color2でフィルターの色を設定します。
 * 書き方は3種類あります。
 * 
 * 書き方1
 * red blue white yellow など、英語の色名で指定できます。
 * 使える色名の種類はネットで『色コード』などで検索して下さい。
 * 
 * 書き方2
 * #00ffff #808000 など、# + 16進数の値で指定できます。
 * この書き方も『色コード』で検索して出てきたサイトに載っていると思います。
 * 
 * 書き方3
 * rgb(10,255,0) rgb(255,0,0) など、rgb関数でも指定できます。
 * 
 * 
 * @param color1
 * @desc フィルターの色 1
 * @default red
 * 
 * @param color2
 * @desc フィルターの色 2
 * @default blue
 */

(function () {
var parameter = PluginManager.parameters('Trb_VisualizationPassable');
var fillColor1 = parameter['color1'];
var fillColor2 = parameter['color2'];
var show = true;//表示のON.OFFフラグ

//使用できるキーを追加
Input.keyMapper[49] = '1';
Input.keyMapper[50] = '2';

//通行判定を描画するためのレイヤーを追加。
var ShaderTilemap_createLayers = ShaderTilemap.prototype._createLayers;
ShaderTilemap.prototype._createLayers = function() {
    ShaderTilemap_createLayers.apply(this,arguments);
    this._passableLayer = new Sprite();
    this._passableLayer.z = 5;
    this._passableLayer.opacity = 120;
    this._passableBitmap = new Bitmap(this._layerWidth, this._layerHeight);
    this._passableLayer.bitmap = this._passableBitmap;
    this._passableLayer.color = fillColor1;
    this.addChild(this._passableLayer);
};

//レイヤーの位置更新
var ShaderTilemap_updateLayerPositions = ShaderTilemap.prototype._updateLayerPositions;
ShaderTilemap.prototype._updateLayerPositions = function(startX, startY) {
    ShaderTilemap_updateLayerPositions.apply(this,arguments);
    this._passableLayer.x = this.lowerZLayer.position.x;
    this._passableLayer.y = this.lowerZLayer.position.y;

    this._updateVP();
};

//表示の切り替え,フィルター色の変更
ShaderTilemap.prototype._updateVP = function() {

    //表示の切り替え（不透明度を操作して切り替える）
    if(Input.isTriggered('control')){
        show = !show;
    }
    this._passableLayer.opacity = show ? 120 : 0;

    //色の変更
    var tilemap = SceneManager._scene._spriteset._tilemap;
    if(Input.isTriggered('1') && this._passableLayer.color == fillColor2){
        this._passableLayer.color = fillColor1;
        tilemap._lastTiles[2] = [];
        tilemap.refresh();
    }
    if(Input.isTriggered('2') && this._passableLayer.color == fillColor1){
        this._passableLayer.color = fillColor2;
        tilemap._lastTiles[2] = [];
        tilemap.refresh();
    }
};

//通行不可なマスの描画
var ShaderTilemap_paintTiles = ShaderTilemap.prototype._paintTiles;
ShaderTilemap.prototype._paintTiles = function(startX, startY, x, y) {
    ShaderTilemap_paintTiles.apply(this,arguments);
    var mx = startX + x;
    var my = startY + y;
    var dx = ((x) * this._tileWidth).mod(this._layerWidth);
    var dy = ((y) * this._tileHeight).mod(this._layerHeight);
    var lx = dx / this._tileWidth;
    var ly = dy / this._tileHeight;
    var p2 = $gameMap.isPassable(mx, my, 2);//isPassableで通行判定を取得する
    var p4 = $gameMap.isPassable(mx, my, 4);
    var p6 = $gameMap.isPassable(mx, my, 6);
    var p8 = $gameMap.isPassable(mx, my, 8);
    var p_all = (p2 || p4 || p6 || p8);
    var passables = [p2,p4,p6,p8,p_all];
    var lastPassables = this._readLastTiles(2, lx, ly);
    if (!passables.equals(lastPassables)) {
        this._passableBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
        for (var i = 0; i < passables.length; i++) {
            var p = passables[i];
            if (!p) {
                this._drawFill(i,dx,dy);
            }
        }
        this._writeLastTiles(2, lx, ly, passables);
    }
};

Tilemap.prototype._drawFill = function(direction,dx,dy){
    var bitmap = this._passableBitmap;
    direction = (direction + 1) * 2;
    var sx = direction == 6 ? dx + this._tileWidth - 4 : dx;
    var sy = direction == 2 ? dy + this._tileHeight - 4 : dy;
    var w = direction == 4 || direction == 6 ? 4 : this._tileWidth;
    var h = direction == 2 || direction == 8 ? 4 : this._tileHeight;
    bitmap.fillRect(sx,sy,w,h,this._passableLayer.color);
};


})();