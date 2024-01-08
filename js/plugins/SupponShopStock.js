//=============================================================================
// SupponShopStock.js
//=============================================================================

/*:
 * @plugindesc 在庫システムを有するお店を設定します。version 1.03
 * @author Suppon
 * 
 * @param Label of stock Number
 * @desc 在庫数の表記を設定します
 * @default 在庫数
 * 
 * @param Label of sold out
 * @desc 売り切れの表記を設定します
 * @default 売り切れ
 * 
 * @help
 * このプラグインを使用するときは以下のようにプラグインコマンドを入力してください。
 * 
 * <ショップの作成例>
 * SupponSS makeShop 1 2
 * IDが1、ショップタイプが2のショップを作ります。IDにはabcのような文字も使えます。
 * ショップタイプ0は購買専門（売却不可）
 * ショップタイプ1は購買、売却可能
 * ショップタイプ2は購買、売却可能、全ての売却品がショップの商品に加わります。
 * ショップタイプを省略した場合は1になります。
 *
 * <アイテムの追加例>
 * SupponSS addItem 1 2 3 4
 * IDが1のショップにアイテムIDが2のアイテムを加えます。
 * 在庫数はID3の変数に割り当て、在庫を4個に設定します。
 * 3の部分を-1にすると変数は使わず、在庫は内部のデータで処理されます。
 * 最後の4の部分を省略すると現在の変数が適用されます。
 *
 * <武器の追加例>
 * SupponSS addWeapon 1 2 3 4
 *
 * <防具の追加例>
 * SupponSS addArmor 1 2 3 4
 * 
 * <アイテムの削除例>
 * SupponSS removeItem 1 2
 * IDが1のショップのアイテムIDが2のアイテムを削除します。
 *
 * <武器の削除例>
 * SupponSS removeWeapon 1 2
 *
 * <防具の削除例>
 * SupponSS removeArmor 1 2
 *
 * <ショップの起動例>
 * SupponSS openShop 1
 * IDが1のショップを起動します。
 * 
 * <ショップの削除例>
 * SupponSS deleteShop 1
 * IDが1のショップを削除します。
 *
 *
 */

(function() {
    var parameters = PluginManager.parameters('SupponShopStock');
    var StockLabel = String(parameters['Label of stock Number']||'在庫数');
    var SoldOutLabel = String(parameters['Label of sold out']||'売り切れ');
    
    var _Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command1, args) {
        _Game_Interpreter_pluginCommand.call(this, command1, args);
        args = args.filter(function(n){
            return n!=='';
        });
        if(!$gameSystem._supponSS){$gameSystem._supponSS=[]};
        if (command1 === 'SupponSS') {
            var command2 = args.shift();
            switch (command2) {
            case 'makeShop':
                $gameSystem.supponSSmakeShop(args);
                break;
            case 'addItem':
                args.splice(1,0,0);
                $gameSystem.supponSSaddGoods(args);
                break;
            case 'addWeapon':
                args.splice(1,0,1);
                $gameSystem.supponSSaddGoods(args);
                break;
            case 'addArmor':
                args.splice(1,0,2);
                $gameSystem.supponSSaddGoods(args);
                break;
            case 'removeItem':
                args.splice(1,0,0);
                $gameSystem.supponSSremoveGoods(args);
                break;
            case 'removeWeapon':
                args.splice(1,0,1);
                $gameSystem.supponSSremoveGoods(args);
                break;
            case 'removeArmor':
                args.splice(1,0,2);
                $gameSystem.supponSSremoveGoods(args);
                break;
            case 'deleteShop':
                $gameSystem.supponSSdeleteShop(args);
                break;
            case 'openShop':
                $gameSystem.supponSSopenShop(args);
                break;
            }
        }
    };
    
    
    Game_System.prototype.supponSScheckData = function(){
        this._supponSS = this._supponSS || []; 
    }

    Game_System.prototype.supponSSmakeShop = function(args){
        this.supponSScheckData();
        var redundancy = this._supponSS.some(function(element){
            return element[0] === args[0];
        })
        if(redundancy){return};
        if(!args[1]){args[1]=1};
        this._supponSS.push([args[0],[],args[1]]);//[shopid, goods, shoptype]
    }
    
    //args => [shopId, 種類, itemId, 変数id]
    //shop => [id, goods, type]
    //good => [種類, itemId, 価格指定, 価格, 変数id, 在庫数]
    Game_System.prototype.supponSSaddGoods = function(args){
        var shop = this.supponSSsearchShop(args);
        args.shift();
        args.splice(2,0,0,0);
        if(shop){
            var redundancy = false;
            shop[1].forEach(function(element){
                if(element[0]==args[0] && element[1]==args[1]){
                    element = args;
                    redundancy = true;
                }
            })
            if(args[5]){
                args[4]>0 ? $gameVariables.setValue(Number(args[4]),Number(args[5])) :0;
            } else {
                args[5] = 0;
            }
            if(!redundancy){shop[1].push(args)}
        } 
    }
    
    Game_System.prototype.supponSSremoveGoods = function(args){
        var shop = this.supponSSsearchShop(args);
        if(!shop){return};
        //shop[1] => goods
        shop[1] = shop[1].filter(function(element){
            return !(args[1]==element[0] && args[2]==element[1]);
        })
    }
    
    Game_System.prototype.supponSSsearchShop = function(args){
        this.supponSScheckData();
        var shop = null;
        this._supponSS.forEach(function(element){
            if(args[0]===element[0]){shop=element}
        })
        if(!shop){
            console.log('Not exist shop of '+args[0]+' !!');
        }
        return shop;
    }
    
    Game_System.prototype.supponSSdeleteShop = function(args){
        this._supponSS = this._supponSS.filter(function(element){
            return !(element[0]==args[0]);
        })
    }
    
    Game_System.prototype.supponSSopenShop = function(args){
        var shop = this.supponSSsearchShop(args);
        if(shop){
            SceneManager.push(Scene_supponSSshop);
            var purchaseOnly = shop[2]==0;
            SceneManager.prepareNextScene(shop, purchaseOnly);   
        }
        
    }
    
    function Scene_supponSSshop() {
        this.initialize.apply(this, arguments);
    };
    
    SceneManager.isSupponSS = function(){
        return this._scene.constructor === Scene_supponSSshop;
    }

    Scene_supponSSshop.prototype = Object.create(Scene_Shop.prototype);
    Scene_supponSSshop.prototype.constructor = Scene_supponSSshop;

    Scene_supponSSshop.prototype.initialize = function() {
        Scene_Shop.prototype.initialize.call(this);
        this._trade = '';// 'buy' or 'sell';
    };
    
    Scene_supponSSshop.prototype.prepare = function(shop, purchaseOnly) {
        this._shop = shop;
        this._goods = this._shop[1];
        this._purchaseOnly = purchaseOnly;
        this._item = null;
    };
    
    Scene_supponSSshop.prototype.commandBuy = function() {
        this._trade = 'buy';
        Scene_Shop.prototype.commandBuy.call(this);
    };
    
    Scene_supponSSshop.prototype.commandSell = function() {
        this._trade = 'sell';
        Scene_Shop.prototype.commandSell.call(this);
    };
    
    Scene_supponSSshop.prototype.stockNumber = function(){
        if (this._trade == 'buy'){
            return this._buyWindow.stockNumber();
        } else if (this._trade == 'sell'){
            var goodsElement = this.goodsElement();
            if(goodsElement){
                if(goodsElement[4] > 0){
                    return $gameVariables.value(Number(goodsElement[4]));
                } else if (goodsElement[4] == -1) {
                    return goodsElement[5];
                }
            } else {
                return null;
            }
        }
    }
    
    Scene_supponSSshop.prototype.stockId = function(){
        if (this._trade == 'buy'){
            return this._buyWindow.stockId();
        } else if (this._trade == 'sell'){
            var goodsElement = this.goodsElement()
            if (goodsElement){
                if(goodsElement[4] > 0){
                    return goodsElement[4];
                }
            }
        }
    }
    
    Scene_supponSSshop.prototype.goodsElement = function(){
        if (this._trade == 'buy'){
            return this._goods[this._buyWindow.index()];
        } else if (this._trade == 'sell'){
            return this.searchGoodsElement();
        }
    }
    
    Scene_supponSSshop.prototype.searchGoodsElement = function(){
        var type = this.itemTypeAndId()[0];
        var id = this.itemTypeAndId()[1];
        var goodsElement = null;
        this._goods.forEach(function(element){
            if(element[0]==type && element[1]==id){
                goodsElement = element;
            }
        })
        return goodsElement;
    }
    
    Scene_supponSSshop.prototype.itemTypeAndId = function(){
        if(DataManager.isItem(this._item)){
            var type = 0;
        } else if (DataManager.isWeapon(this._item)){
            var type = 1;
        } else if (DataManager.isArmor(this._item)){
            var type = 2;
        } else {
            var type = null;
        }
        return [type, (this._item ? this._item.id : null)];
    }
    
    Scene_supponSSshop.prototype.makeGoodsElement = function(){
        var type = this.itemTypeAndId()[0];
        var id = this.itemTypeAndId()[1];
        return [type, id, 0, 0, -1, 0];
    }

    Scene_supponSSshop.prototype.doBuy = function(number) {
        Scene_Shop.prototype.doBuy.call(this, number);
        this.processStockBuy(number);
        //gameVariables.setValue(this._stockId, this.itemStock()-number);
    };
    
    Scene_supponSSshop.prototype.processStockBuy = function(number){
        var element = this.goodsElement();
        if(this.stockId() > 0){
            $gameVariables.setValue(this.stockId(), this.stockNumber()-number)
        } else if (this.stockId() == -1){
            var lastStock = element[5];
            element[5] = lastStock-number;
        }
    }
    
    Scene_supponSSshop.prototype.maxBuy = function() {
        var max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
        max = Math.min(max, this.stockNumber());
        var price = this.buyingPrice();
        if (price > 0) {
            return Math.min(max, Math.floor(this.money() / price));
        } else {
            return max;
        }
    };

    Scene_supponSSshop.prototype.doSell = function(number) {
        $gameParty.gainGold(number * this.sellingPrice());
        $gameParty.loseItem(this._item, number);
        this.processStockSell(number);
    };
    
    Scene_supponSSshop.prototype.processStockSell = function(number){
        var goodsElement = this.goodsElement();
        if (goodsElement){
            if(goodsElement[4]>0){
                var lastNumber = $gameVariables.value(goodsElement[4]);
                $gameVariables.setValue(goodsElement[4],lastNumber+number);
            } else if (goodsElement[4] == -1){
                goodsElement[5] = Number(goodsElement[5])+number;
            }
        } else if (this._shop[2]==2){
            goodsElement = this.makeGoodsElement();
            goodsElement[5]=number;
            this._goods.push(goodsElement);
        }
    }
    
    Window_ShopBuy.prototype.stockId = function() {
        if (this._shopGoods.length>0){
            return this._shopGoods[this._index][4];
        } else {
            return null
        }
    };
    
    Window_ShopBuy.prototype.stockNumber = function() {
        if (this.stockId()>0){
            return $gameVariables.value(this.stockId());
        } else if (this.stockId() == -1){
            return this._shopGoods[this._index][5];
        }
    };
    
    var _Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
    Window_ShopBuy.prototype.drawItem = function(index) {
        if(!SceneManager.isSupponSS()){
            _Window_ShopBuy_drawItem.call(this, index);
            return;
        }
        var item = this._data[index];
        var rect = this.itemRect(index);
        var priceWidth = 96;
        rect.width -= this.textPadding();
        if(this._shopGoods[index][4]>0){
            var stockNumber = $gameVariables.value(this._shopGoods[index][4]);
        } else if (this._shopGoods[index][4] == -1){
            var stockNumber = this._shopGoods[index][5]
        }        
        this.changePaintOpacity(this.isEnabled(item) && stockNumber>0 );
        this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
        var text = (stockNumber>0 ? this.price(item) : SoldOutLabel);
        this.drawText(text, rect.x + rect.width - priceWidth,
                      rect.y, priceWidth, 'right');
        this.changePaintOpacity(true);
    };
    
    var _Window_ShopBuy_isCurrentItemEnabled = Window_ShopBuy.prototype.isCurrentItemEnabled;
    Window_ShopBuy.prototype.isCurrentItemEnabled = function() {
        if(SceneManager.isSupponSS()){
            return (_Window_ShopBuy_isCurrentItemEnabled.call(this) && this.stockNumber()>0)
        } else {
            return _Window_ShopBuy_isCurrentItemEnabled.call(this)
        }
    };
    
    var _Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
    Window_ShopBuy.prototype.updateHelp = function() {
        if (this._statusWindow && SceneManager.isSupponSS()) {
            this._statusWindow.setStock(this.stockNumber());
        }
        _Window_ShopBuy_updateHelp.call(this);
    };
    
    var _Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
    Window_ShopStatus.prototype.initialize = function(x, y, width, height) {
        this._stockNumber = null;
        _Window_ShopStatus_initialize.call(this, x, y, width, height);
    };
    
    Window_ShopStatus.prototype.setStock = function(number) {
        this._stockNumber = number;
    };
    
    Window_ShopStatus.prototype.stockNumber = function(){
        return SceneManager._scene.stockNumber();
    }
    
    var _Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
    Window_ShopStatus.prototype.drawPossession = function(x, y) {
        _Window_ShopStatus_drawPossession.call(this, x, y);
        if(!SceneManager.isSupponSS() || !this._stockNumber){return}
        var width = this.contents.width - this.textPadding() - x;
        var possessionWidth = this.textWidth('0000');
        this.changeTextColor(this.systemColor());
        this.drawText(StockLabel, x, y+this.lineHeight(), width - possessionWidth);
        this.resetTextColor();
        this.drawText(this._stockNumber, x, y+this.lineHeight(), width, 'right');
    };
    
    var _Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
    Scene_Shop.prototype.onSellOk = function() {
        _Scene_Shop_onSellOk.call(this);
        if (this._statusWindow && SceneManager.isSupponSS()) {
            this._statusWindow.setStock(this._statusWindow.stockNumber());
            this._statusWindow.refresh();
        }
    };
    
})();
