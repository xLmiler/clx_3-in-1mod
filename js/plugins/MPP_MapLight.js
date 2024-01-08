//=============================================================================
// MPP_MapLight.js
//=============================================================================
// Copyright (c) 2018-2019 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.2】マップの明るさを設定できるようにします。
 * @author 木星ペンギン
 *
 * @help 插件命令：
 *   SetCharLight id r c o a
 *                        # 显示以角色为中心的灯光 *1
 *                          id：事件ID（0：此事件，-1：玩家）
 *   ShowMapLight id x y # 创建以坐标 (x,y) *2 为中心的光源
 *                          id：灯光ID（任意数字）
 *   MoveMapLight id r c o a
 *                        # 移动指定ID的灯光*1
 *   EraseMapLight id     # 擦除指定ID的灯光
 *   SetMapDarkness n     # 地图的暗度（指定范围为0到255/越高越暗）
 *   
 * *变量可用于插件命令中指定的值。
 *    通过编写 v[n]，您可以引用第 n 个变量的值。
 * 
 * 地图注释：
 *   <Da​​rkness:n> # 地图的暗度（指定范围为 0 到 255/越高越暗）
 *   <地图光源 ID：x、y、r、c、o、a>
 *                        # 显示以坐标 (x,y) *1 为中心的灯光
*                          id：灯光 ID（每个地图的任何数字/个人）
* 
* 关于该事件的作用的注释：
*   Light r c o a # 显示以该事件为中心的灯光 *1
* 
* *1 设置项目说明
*   r：半径（1 = 1 平方）
*   c：颜色编号（用插件参数设置/用0删除）默认
*   o：不透明度（指定为 0 到 255/未设置为 255）
*   a：闪烁幅度（指定0.0到1.0/0表示不闪烁/不设置为0）
* 
* *2 更改区域时，创建的灯光将被重置。
* 
* ==================================
* ●区域ID的数组指定
*  在数组中设置数字时，
*  您可以通过写 n-m 来指定从 n 到 m 的数字。
*  （示例：1-4,8,10-12 => 1,2,3,4,8,10,11,12）
* 
* ==================================
* ▼关于重命名命令
*  插件命令和注释中使用的命令是
*  您可以从插件参数中更改它。
*  
*  请缩短命令或用日语书写，以便您更容易使用。
*  
*  即使在更改和默认命令之后，也只有插件命令有效。
* 
* ==================================
* 制作：木星企鹅
* 网址：http://woodpenguin.blog.fc2.com/
* 
 * 
 * @param Light Colors
 * @type string[]
 * @desc 灯りの色の配列
 * (上から色番号 1,2,3... となります)
 * @default ["255,255,255","192,128,64"]
 * 
 * @param Light Level 1 Regions
 * @desc 明るさレベル1のリージョンIDの配列
 * (範囲指定可)
 * @default 1,9,17,25,33,41,49,57
 *
 * @param Light Level 2 Regions
 * @desc 明るさレベル2のリージョンIDの配列
 * (範囲指定可)
 * @default 2,10,18,26,34,42,50,58
 *
 * @param Light Level 3 Regions
 * @desc 明るさレベル3のリージョンIDの配列
 * (範囲指定可)
 * @default 3,11,19,27,35,43,51,59
 *
 * @param Light Level 4 Regions
 * @desc 明るさレベル4のリージョンIDの配列
 * (範囲指定可)
 * @default 4,12,20,28,36,44,52,60
 *
 * @param Light Level 5 Regions
 * @desc 明るさレベル5のリージョンIDの配列
 * (範囲指定可)
 * @default 5,13,21,29,37,45,53,61
 *
 * @param Light Level 6 Regions
 * @desc 明るさレベル6のリージョンIDの配列
 * (範囲指定可)
 * @default 6,14,22,30,38,46,54,62
 *
 * @param Light Level 7 Regions
 * @desc 明るさレベル7のリージョンIDの配列
 * (範囲指定可)
 * @default 7,15,23,31,39,47,55,63
 *
 *
 * @param === Command ===
 * 
 * @param Plugin Commands
 * @type struct<Plugin>
 * @desc プラグインコマンド名
 * @default {"SetCharLight":"SetCharLight","ShowMapLight":"ShowMapLight","MoveMapLight":"MoveMapLight","EraseMapLight":"EraseMapLight","SetMapDarkness":"SetMapDarkness"}
 * @parent === Command ===
 * 
 * @param Map Metadata
 * @type struct<MapMetadata>
 * @desc マップメモ欄のデータ名
 * @default {"Darkness":"Darkness","MapLight":"MapLight"}
 * @parent === Command ===
 * 
 * @param Event Comments
 * @type struct<EventComments>
 * @desc イベントメモ欄のデータ名
 * @default {"Light":"灯り"}
 * @parent === Command ===
 * 
 *
 *
 */

/*~struct~Plugin:
 * @param SetCharacterLight
 * @desc キャラクターの灯りの色
 * @default SetCharacterLight
 * 
 * @param ShowMapLight
 * @desc 座標(x,y)を中心に灯りを作成
 * @default ShowMapLight
 * 
 * @param MoveMapLight
 * @desc 指定したIDの灯りを移動
 * @default MoveMapLight
 * 
 * @param EraseMapLight
 * @desc 指定したIDの灯りを消去
 * @default EraseMapLight
 * 
 * @param SetMapDarkness
 * @desc マップ全体の暗さ
 * @default SetMapDarkness
 * 
 */

/*~struct~MapMetadata:
 * @param Darkness
 * @desc マップの暗さ
 * @default Darkness
 * 
 * @param MapLight
 * @desc 座標(x,y)を中心に灯りを表示
 * @default MapLight
 * 
 */

/*~struct~EventComments:
 * @param Light
 * @desc このイベントを中心に灯りを表示
 * @default 灯り
 */
function Game_Mpp_MapLight() {
    this.initialize.apply(this, arguments);
}

(function () {

    var MPPlugin = {};

    (function () {

        var parameters = PluginManager.parameters('MPP_MapLight');

        function convertParam(param) {
            var result = [];
            if (param) {
                var data = param.split(',');
                for (var i = 0; i < data.length; i++) {
                    if (/(\d+)\s*-\s*(\d+)/.test(data[i])) {
                        for (var n = Number(RegExp.$1); n <= Number(RegExp.$2); n++) {
                            result.push(n);
                        }
                    } else {
                        result.push(Number(data[i]));
                    }
                }
            }
            return result;
        };

        MPPlugin.LightColors = JSON.parse(parameters['Light Colors']);
        MPPlugin.LightRegions1 = convertParam(parameters['Light Level 1 Regions']);
        MPPlugin.LightRegions2 = convertParam(parameters['Light Level 2 Regions']);
        MPPlugin.LightRegions3 = convertParam(parameters['Light Level 3 Regions']);
        MPPlugin.LightRegions4 = convertParam(parameters['Light Level 4 Regions']);
        MPPlugin.LightRegions5 = convertParam(parameters['Light Level 5 Regions']);
        MPPlugin.LightRegions6 = convertParam(parameters['Light Level 6 Regions']);
        MPPlugin.LightRegions7 = convertParam(parameters['Light Level 7 Regions']);

        MPPlugin.PluginCommands = JSON.parse(parameters['Plugin Commands']);
        MPPlugin.MapMetadata = JSON.parse(parameters['Map Metadata']);
        MPPlugin.EventComments = JSON.parse(parameters['Event Comments']);

    })();

    var Alias = {};

    //-----------------------------------------------------------------------------
    // Tilemap

    Tilemap._darknessTileSize = 2;

    //4734
    Alias.Tilemap_updateTransform = Tilemap.prototype.updateTransform;
    Tilemap.prototype.updateTransform = function () {
        var ox = Math.floor(this.origin.x);
        var oy = Math.floor(this.origin.y);
        var startX = Math.floor((ox - this._margin) / this._tileWidth);
        var startY = Math.floor((oy - this._margin) / this._tileHeight);
        var needDarknessRepaint = this.needDarknessRepaint(startX, startY);
        if (needDarknessRepaint) {
            this.moveDarkness(startX * this._tileWidth - ox, startY * this._tileHeight - oy);
        }
        Alias.Tilemap_updateTransform.call(this);
        if (needDarknessRepaint) {
            this._updateDarkness(startX, startY);
            this._darknessStarted = true;
        }
    };

    Tilemap.prototype.needDarknessRepaint = function (startX, startY) {
        return (this._needsRepaint ||
            this._lastStartX !== startX || this._lastStartY !== startY ||
            !this._darknessStarted || Graphics.frameCount % 2 === 0);
    };

    Tilemap.prototype.moveDarkness = function (x, y) {
        this._darknessLayer.x = x;
        this._darknessLayer.y = y;
        this._darknessLayer.opacity = $gameMap.darknessOpacity || 0;
    };

    //4757
    Alias.Tilemap__createLayers = Tilemap.prototype._createLayers;
    Tilemap.prototype._createLayers = function () {
        Alias.Tilemap__createLayers.call(this);
        this._createDarknessLayer();
    };

    Tilemap.prototype._createDarknessLayer = function () {
        var width = this._width;
        var height = this._height;
        var margin = this._margin;
        var size = Tilemap._darknessTileSize;
        var tileCols = Math.ceil(width / this._tileWidth) + 1;
        var tileRows = Math.ceil(height / this._tileHeight) + 1;
        var layerWidth = tileCols * size;
        var layerHeight = tileRows * size;
        this._darknessBitmap = new Bitmap(tileCols, tileRows);
        this._darknessLayer = new Sprite(new Bitmap(layerWidth, layerHeight));
        this._darknessLayer.bitmap.smooth = true;
        this._darknessLayer.bitmap.context.globalCompositeOperation = 'lighter';
        this._darknessLayer.move(-margin, -margin);
        this._darknessLayer.z = 9;
        this._darknessLayer.scale.x = this._tileWidth / size;
        this._darknessLayer.scale.y = this._tileHeight / size;
        this._darknessLayer.opacity = 0;
        this._darknessLayer.blendMode = 2;
        this.addChild(this._darknessLayer);
    };

    Tilemap.prototype._updateDarkness = function (startX, startY) {
        if (this._darknessLayer.opacity > 0) {
            this._darknessLayer.bitmap.clear();
            var w = this._darknessBitmap.width;
            var h = this._darknessBitmap.height;
            this._darknessLayer.bitmap.blt(this._darknessBitmap, 0, 0, w, h, 0, 0, w * 2, h * 2);
            var sx = startX - $gameMap.displayX();
            var sy = startY - $gameMap.displayY();
            var mapLights = $gameMap.allMapLights();
            for (var i = 0; i < mapLights.length; i++) {
                var light = mapLights[i];
                if (light.isValid()) {
                    var rgb = MPPlugin.LightColors[light.colorIndex - 1];
                    if (rgb) {
                        var dx = light.scrolledX() - sx + 0.5;
                        var dy = light.scrolledY() - sy + 0.4;
                        var r = light.radius;
                        var alpha = light.opacity / 255;
                        this._drawMapLidht(dx, dy, rgb, r, alpha);
                    }
                }
            }
        }
    };

    Tilemap.prototype._drawMapLidht = function (dx, dy, rgb, r, alpha) {
        var size = Tilemap._darknessTileSize;
        dx *= size;
        dy *= size;
        r *= size;
        var bitmap = this._darknessLayer.bitmap;
        var context = bitmap.context;
        var grad = context.createRadialGradient(dx, dy, 0, dx, dy, r);
        grad.addColorStop(0, 'rgba(%1,1)'.format(rgb));
        grad.addColorStop(1, 'rgba(%1,0)'.format(rgb));
        context.globalAlpha = alpha;
        bitmap.drawCircle(dx, dy, r, grad);
        context.globalAlpha = 1;
    };

    //4842
    Alias.Tilemap__paintAllTiles = Tilemap.prototype._paintAllTiles;
    Tilemap.prototype._paintAllTiles = function (startX, startY) {
        Alias.Tilemap__paintAllTiles.call(this, startX, startY);
        this._paintAllDarkness(startX, startY);
    };

    Tilemap.prototype._paintAllDarkness = function (startX, startY) {
        this._darknessBitmap.clear();
        var tileCols = Math.ceil(this._width / this._tileWidth) + 1;
        var tileRows = Math.ceil(this._height / this._tileHeight) + 1;
        var context = this._darknessBitmap.context;
        context.save();
        context.fillStyle = 'black';
        for (var y = 0; y < tileRows; y++) {
            for (var x = 0; x < tileCols; x++) {
                this._paintDarkness(startX, startY, x, y);
            }
        }
        context.restore();
        this._darknessBitmap._setDirty();
    };

    Tilemap.prototype._paintDarkness = function (startX, startY, x, y) {
        var regionId = this._readMapData(startX + x, startY + y, 5);
        var level = 0;
        if (MPPlugin.LightRegions1.contains(regionId)) {
            level = 1;
        } else if (MPPlugin.LightRegions2.contains(regionId)) {
            level = 2;
        } else if (MPPlugin.LightRegions3.contains(regionId)) {
            level = 3;
        } else if (MPPlugin.LightRegions4.contains(regionId)) {
            level = 4;
        } else if (MPPlugin.LightRegions5.contains(regionId)) {
            level = 5;
        } else if (MPPlugin.LightRegions6.contains(regionId)) {
            level = 6;
        } else if (MPPlugin.LightRegions7.contains(regionId)) {
            level = 7;
        }
        var context = this._darknessBitmap.context;
        context.globalAlpha = 1 - level / 7;
        context.fillRect(x, y, 1, 1);
    };

    //-----------------------------------------------------------------------------
    // ShaderTilemap

    //5560
    Alias.ShaderTilemap_updateTransform = ShaderTilemap.prototype.updateTransform;
    ShaderTilemap.prototype.updateTransform = function () {
        if (this.roundPixels) {
            var ox = Math.floor(this.origin.x);
            var oy = Math.floor(this.origin.y);
        } else {
            var ox = this.origin.x;
            var oy = this.origin.y;
        }
        var startX = Math.floor((ox - this._margin) / this._tileWidth);
        var startY = Math.floor((oy - this._margin) / this._tileHeight);
        var needDarknessRepaint = this.needDarknessRepaint(startX, startY);
        if (needDarknessRepaint) {
            this.moveDarkness(startX * this._tileWidth - ox, startY * this._tileHeight - oy);
        }
        Alias.ShaderTilemap_updateTransform.call(this);
        if (needDarknessRepaint) {
            this._updateDarkness(startX, startY);
            this._darknessStarted = true;
        }
    };

    //5586
    Alias.ShaderTilemap__createLayers = ShaderTilemap.prototype._createLayers;
    ShaderTilemap.prototype._createLayers = function () {
        Alias.ShaderTilemap__createLayers.call(this);
        this._createDarknessLayer();
    };

    ShaderTilemap.prototype._createDarknessLayer = function () {
        if (!this._darknessLayer)
            Tilemap.prototype._createDarknessLayer.call(this);
    };

    //5636
    Alias.ShaderTilemap__paintAllTiles = ShaderTilemap.prototype._paintAllTiles;
    ShaderTilemap.prototype._paintAllTiles = function (startX, startY) {
        Alias.ShaderTilemap__paintAllTiles.call(this, startX, startY);
        this._paintAllDarkness(startX, startY);
    };

    //-----------------------------------------------------------------------------
    // Game_MppMapLight

    Game_Mpp_MapLight.prototype.initialize = function (subject) {
        this._subject = subject;
        this._x = 0;
        this._y = 0;
        this.color = null;
        this.radius = 0;
        this.opacity = 0;
        this._targetRadius = 0;
        this._baseOpacity = 0;
        this._targetOpacity = 0;
        this._amplitude = 0;
        this._duration = 0;
    };

    Game_Mpp_MapLight.prototype.isValid = function () {
        return this.colorIndex > 0 && this.radius > 0 && this.opacity > 0;
    };

    Game_Mpp_MapLight.prototype.setPos = function (x, y) {
        this._x = x;
        this._y = y;
    };

    Game_Mpp_MapLight.prototype.move = function (r, c, o, a) {
        this._targetRadius = r;
        this.colorIndex = c;
        this._baseOpacity = o;
        this._targetOpacity = o;
        this._amplitude = a;
        this._duration = 16;
    };

    Game_Mpp_MapLight.prototype.skip = function () {
        this.radius = this._targetRadius;
        this.opacity = this._targetOpacity;
        if (this._targetOpacity > 0 && this._amplitude > 0) {
            var o = this._baseOpacity;
            this._targetOpacity = o - Math.randomInt(o * this._amplitude);
            this._duration = 8;
        } else {
            this._duration = 0;
        }
    };

    Game_Mpp_MapLight.prototype.update = function () {
        if (this._duration > 0) {
            var d = --this._duration;
            this.radius = (this.radius * d + this._targetRadius) / (d + 1);
            this.opacity = (this.opacity * d + this._targetOpacity) / (d + 1);
            if (d === 0 && this._targetOpacity > 0 && this._amplitude > 0) {
                var o = this._baseOpacity;
                this._targetOpacity = o - Math.randomInt(o * this._amplitude);
                this._duration = 8;
            }
        }
        if (this._subject) {
            this._x = this._subject._realX;
            this._y = this._subject._realY;
        }
    };

    Game_Mpp_MapLight.prototype.scrolledX = function () {
        return $gameMap.adjustX(this._x);
    };

    Game_Mpp_MapLight.prototype.scrolledY = function () {
        return $gameMap.adjustY(this._y);
    };


    //-----------------------------------------------------------------------------
    // Game_Map

    //37
    Alias.GaMa_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        Alias.GaMa_setup.call(this, mapId);
        //this.darknessOpacity = 0;
        this._mapLights = {};
        var darkness = MPPlugin.MapMetadata.Darkness || "Darkness";
        var mapLight = MPPlugin.MapMetadata.MapLight || "MapLight";
        for (var name in $dataMap.meta) {
            if (name === darkness) {
                this.darknessOpacity = Number($dataMap.meta[name] || 0);
            } else if (name.indexOf(mapLight) === 0 && /\s(\d+)/.test(name)) {
                var id = Number(RegExp.$1);
                var data = $dataMap.meta[name].split(",").map(Number);
                if (data[4] === undefined) data[4] = 255;
                data[5] = data[5] || 0;
                var light = new Game_Mpp_MapLight();
                light.setPos(data[0], data[1]);
                light.move(data[2], data[3], data[4], data[5]);
                this._mapLights[id] = light;
            }
        }
        var allMapLights = this.allMapLights();
        for (var i = 0; i < allMapLights.length; i++) {
            allMapLights[i].skip();
        }
    };

    Game_Map.prototype.allMapLights = function () {
        var list = [];
        for (var id in this._mapLights) {
            list.push(this._mapLights[id]);
        }
        var events = this.events();
        events.push($gamePlayer);
        for (var i = 0; i < events.length; i++) {
            if (events[i].mapLight) list.push(events[i].mapLight);
        }
        return list;
    };

    Game_Map.prototype.showMapLight = function (id, x, y) {
        if (!this._mapLights[id]) this._mapLights[id] = new Game_Mpp_MapLight();
        this._mapLights[id].setPos(x, y);
    };

    Game_Map.prototype.moveMapLight = function (id, r, c, o, a) {
        if (!this._mapLights[id]) this._mapLights[id] = new Game_Mpp_MapLight();
        this._mapLights[id].move(r, c, o, a);
    };

    Game_Map.prototype.eraseMapLight = function (id) {
        delete this._mapLights[id];
    };

    //623
    Alias.GaMa_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        Alias.GaMa_update.call(this, sceneActive);
        var mapLights = this._mapLights;
        for (var id in mapLights) {
            mapLights[id].update();
        }
    };


    //-----------------------------------------------------------------------------
    // Game_CharacterBase

    //283
    Alias.GaChBa_update = Game_CharacterBase.prototype.update;
    Game_CharacterBase.prototype.update = function () {
        Alias.GaChBa_update.call(this);
        if (this.mapLight) this.mapLight.update();
    };

    Game_CharacterBase.prototype.moveLight = function (r, c, o, a) {
        if (!this.mapLight) {
            this.mapLight = new Game_Mpp_MapLight(this);
        }
        this.mapLight.move(r, c, o, a);
    };

    //-----------------------------------------------------------------------------
    // Game_Event

    //248
    Alias.GaEv_clearPageSettings = Game_Event.prototype.clearPageSettings;
    Game_Event.prototype.clearPageSettings = function () {
        Alias.GaEv_clearPageSettings.call(this);
        this.mapLight = null;
    };

    //256
    Alias.GaEv_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function () {
        Alias.GaEv_setupPageSettings.call(this);
        this.setup_MapLight();
    };

    Game_Event.prototype.setup_MapLight = function () {
        this.mapLight = null;
        var list = this.list();
        for (var i = 0; i < list.length; i++) {
            switch (list[i].code) {
                case 108:
                case 408:
                    var comment = list[i].parameters[0];
                    if (comment.indexOf(MPPlugin.EventComments.Light) === 0) {
                        var ary = comment.split(" ");
                        var r = Number(ary[1] || 0);
                        var c = Number(ary[2] || 0);
                        var o = Number(ary[3] || 255);
                        var a = Number(ary[4] || 0);
                        this.moveLight(r, c, o, a);
                    }
                    break;
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter

    //1739
    Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        Alias.GaIn_pluginCommand.call(this, command, args);
        var v = $gameVariables._data;
        switch (command) {
            case MPPlugin.PluginCommands.SetCharLight:
            case 'SetCharLight':
                var character = this.character(eval(args[0]));
                if (character) {
                    var r = eval(args[1]);
                    var c = eval(args[2]);
                    var o = eval(args[3] || "255");
                    var a = eval(args[4] || "0");
                    character.moveLight(r, c, o, a);
                }
                break;
            case MPPlugin.PluginCommands.ShowMapLight:
            case 'ShowMapLight':
                var id = eval(args[0]);
                var x = eval(args[1]);
                var y = eval(args[2]);
                $gameMap.showMapLight(id, x, y);
                break;
            case MPPlugin.PluginCommands.MoveMapLight:
            case 'MoveMapLight':
                var id = eval(args[0]);
                var r = eval(args[1]);
                var c = eval(args[2]);
                var o = eval(args[3] || "255");
                var a = eval(args[4] || "0");
                $gameMap.moveMapLight(id, r, c, o, a);
                break;
            case MPPlugin.PluginCommands.EraseMapLight:
            case 'EraseMapLight':
                var id = eval(args[0]);
                $gameMap.eraseMapLight(id);
                break;
            case MPPlugin.PluginCommands.SetMapDarkness:
            case 'SetMapDarkness':
                $gameMap.darknessOpacity = eval(args[0] || 0).clamp(0, 255);
                break;
        }
        return true;
    };








})();
