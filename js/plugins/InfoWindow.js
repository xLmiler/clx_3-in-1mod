//=============================================================================
// InfoWindow.js
//=============================================================================

/*:
 * @plugindesc 情報表示ウィンドウをメニュー画面に追加するプラグイン
 * @author Me
 *
 * @help 情報表示ウィンドウをメニュー画面上に追加します。
 *
 */

(function() {
	// マップ上にウィンドウ表示するよ宣言
	var Scene_map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		Scene_map_start.call(this);
	    this._InfoWindow = new Window_Info();
	    this.addWindow(this._InfoWindow);
	};
    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
		this._InfoWindow.setText();

//----ここから
if($gameSwitches.value(86)){
	this._InfoWindow.show();
}else{
	this._InfoWindow.hide();
}
//----ここまで追加
    };
	
	// ここからメニューウィンドウ作り始まります。
	function Window_Info() {
	    this.initialize.apply(this, arguments);
	}

	Window_Info.prototype = Object.create(Window_Base.prototype);
	Window_Info.prototype.constructor = Window_Info;
	Window_Info.prototype.initialize = function() {
		var x = 0;
		var y = 0;
		var width = 254;
	    var height = 64;
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	};

	Window_Info.prototype.setText = function(str) {
		this._text = str;
		this.refresh();
	};
	
	// ウィンドウに載せる内容
	Window_Info.prototype.refresh = function() {
	    this.contents.clear();
		this.changeTextColor(this.textColor(16));
		if($gameVariables.value(206) >= 5){this.drawIcon(850, 1, 1);}
		if($gameVariables.value(206) == 4){this.drawIcon(2380, 1, 1);}
		if($gameVariables.value(206) <= 3){this.drawIcon(2204, 1, 1);}
		this.drawText($gameVariables.value(202) + " 日目" + "(" + $gameVariables.value(4965) + ")",36, 1);
		this.resetTextColor();
		this.drawText($gameVariables.value(211),170,1);
	};
	
	// フォントサイズ
	Window_Info.prototype.standardFontSize = function() {
    	return 20;
    };
	// ウィンドウの透明度
	Window_Info.prototype.standardBackOpacity = function() {
    	return 200;
	};
    // ウィンドウの余白
	Window_Info.prototype.standardPadding = function() {
    	return 18;
	};
}
)();