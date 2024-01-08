//=============================================================================
// アイテム最大所持個数指定プラグイン
// setItemMax.js
// Copyright (c) 2018 村人Ａ
//=============================================================================

/*:ja
 * @plugindesc アイテムの最大所持個数をアイテムIdごとに指定できます。
 * @author 村人A
 *
 * @help
 *
 *  アイテムのメモ欄に「itemMaxNum:個数」と入力することによりそのアイテムのデフォルトの最大所持数を設定することが出来ます。
 *  コマンド例
 *  itemMaxNum:1010  #入力したアイテムの最大所持数を1010個に設定
 *
 *  アイテムの所持上限数をゲーム中に変更したい場合は「アイテム上限設定変更」とプラグインコマンドを入力後、指定したいアイテムidと最大所持数を入力
 *  別のアイテムも変更したい場合続けて入力してください
 *  デフォルトの最大所持数（９９個）を変更したい場合はidを0と入力し、その後に個数を指定してください。
 *
 * プラグインコマンド例:
 *   アイテム上限設定変更 3 35 
 *   #アイテムidが3のアイテムの最大所持数を35個に設定
 *   アイテム上限設定変更 1 20 4 8 7 15 9 100 0 200
 *   #idが1のアイテムの最大個数を20個に、idが4のアイテムの最大個数を8個に以下、7を15、9を100、デフォルトの最大個数を200個に変更
 *
 *  変更したときにアイテムの所持数が指定した最大所持数より多かった場合、自動的に最大所数に直されます。
 *
 *  値の優先度としては
 *  プラグインコマンドによる変更　＞　データベースでの指定　＞　変更したデフォルトの最大個数　＞　デフォルトの最大個数（９９個）
 *  となります。
 */

(function() {
	villaA_itemIdMaxArray = [];
	villaA_itemSeachNum = 1;
	villaA_itemMaxNum = 2;
	
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'アイテム上限設定変更') {
			for(var i = 0; i < args.length; i += 2){
				villaA_itemIdMaxArray.push([args[i], args[i+1]]);
				if(String(args[i+1]).length > villaA_itemMaxNum){
					villaA_itemMaxNum = String(args[i+1]).length;
				}
			}
		
			for(var i = 1; i < $dataItems.length; i++){
				if(villaA_itemSeachNum < String($gameParty.maxItems($dataItems[i])).length){
					villaA_itemSeachNum = String($gameParty.maxItems($dataItems[i])).length;
				}
			}
			villaA_itemMaxNum = villaA_itemSeachNum;
			villaA_itemSeachNum = 1;
			
			for(var i = 1; i < $dataItems.length; i++){
				if($gameParty.numItems($dataItems[i]) > $gameParty.maxItems($dataItems[i])){
					$gameParty.loseItem($dataItems[i], $gameParty.numItems($dataItems[i]))
					$gameParty.gainItem($dataItems[i], parseInt($gameParty.maxItems($dataItems[i])))
				}
				
				if(villaA_itemIdMaxArray[villaA_itemIdMaxArray.length-1][0] == 0){
					if($gameParty.numItems($dataItems[i]) > villaA_itemIdMaxArray[villaA_itemIdMaxArray.length-1][1]){
						$gameParty.loseItem($dataItems[i], $gameParty.numItems($dataItems[i]))
						$gameParty.gainItem($dataItems[i], parseInt($gameParty.maxItems($dataItems[i])))
					}
				}
			}
		}
	}
	
	var _Game_Party_gainItem = Game_Party.prototype.gainItem;
	Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
		_Game_Party_gainItem.call(this, item, amount, includeEquip);
		// for(var i = 1; i < $dataItems.length; i++){
		// 	if(villaA_itemSeachNum < String(this.maxItems($dataItems[i])).length){
		// 		villaA_itemSeachNum = String(this.maxItems($dataItems[i])).length;
		// 	}
		// }
		for (var i = 1; i < $dataItems.length; i++) {
			var currentItemLength = String(this.maxItems($dataItems[i])).length;
			if (villaA_itemSeachNum < currentItemLength) {
				villaA_itemSeachNum = currentItemLength;
			}
		}
		villaA_itemMaxNum = villaA_itemSeachNum;
		villaA_itemSeachNum = 1;
	};

	Game_Party.prototype.maxItems = function(item) {
		for(var i = 0; i < villaA_itemIdMaxArray.length; i++){
			if(villaA_itemIdMaxArray[i][0] == item.id){
				return villaA_itemIdMaxArray[i][1]
			}
		}
		
		if(item.note != ""){
			var itemNoteArray = []
			itemNoteArray = item.note.split(/\r\n|\r|\n/);
			
			for(var i = 0 ; i < itemNoteArray.length; i++){
				if(itemNoteArray[i].indexOf('itemMaxNum') != -1){
					var MaxNum = itemNoteArray[i].split(":");
					return parseInt(MaxNum[1]);
				}
			}
		}
		
		for(var i = 0; i < villaA_itemIdMaxArray.length; i++){
			if(villaA_itemIdMaxArray[i][0] == 0){
				return villaA_itemIdMaxArray[i][1]
			}
		}
		
		return 99;
	};
	
	Window_ItemList.prototype.drawItem = function(index) {
		var item = this._data[index];
		if (item) {
			var textWid1 = "0";
			var textWid2 = "";
			for(var i = 1; i <= villaA_itemMaxNum; i++){
				textWid1 += 0;
				textWid2 += 0;
			}
		
			var numberWidth = this.numberWidth(textWid1);
			var rect = this.itemRect(index);
			rect.width -= this.textPadding();
			this.changePaintOpacity(this.isEnabled(item));
			this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
			this.drawItemNumber(item, rect.x, rect.y, rect.width, textWid2);
			this.changePaintOpacity(1);
		}
	};

	Window_ItemList.prototype.numberWidth = function(textWid) {
		return this.textWidth(textWid);
	};

	Window_ItemList.prototype.drawItemNumber = function(item, x, y, width, textWid) {
		if (this.needsNumber()) {
			this.drawText(':', x, y, width - this.textWidth(textWid), 'right');
			this.drawText($gameParty.numItems(item), x, y, width, 'right');
		}
	};
})();