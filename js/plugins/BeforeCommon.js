//
//  発動前コモン ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['BeforeCommon'] = 1.00;

/*:
 * @plugindesc ver1.00/スキルやアイテムの発動前に、スキルやアイテムに設定されたコモンイベントを発生させます。
 * @author Yana
 *
 * @param IndexVariableID
 * @desc 発動者のインデックスを保存する変数IDです。
 * 発動者がエネミーの場合は値に+1000されます。
 * @default 11
 *
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 *
 * スキルやアイテムのメモ欄に
 * <発動前コモン:x>
 * または、
 * <BeforeCommon:x>
 * と記述することで、スキルやアイテムが発生する前に、
 * IDがx番のコモンイベントの実行を予約します。
 *
 * また、プラグインパラメータで指定したIDの変数に、
 * 行動者のインデックスが格納されます。
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 */


(function() {

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('BeforeCommon');
    var indexVariableId = Number(parameters['IndexVariableID']);

    ////////////////////////////////////////////////////////////////////////////////////

	DataManager.isBeforeCommon = function(item) {
		if (!item){ return false }
		if (item.meta['発動前コモン']){ return true }
		if (item.meta['BeforeCommon']){ return true }
		return false;
	};
	
	DataManager.beforeCommonEffect = function(item) {
		var effects = [];
		if (item.meta['発動前コモン']){ 
			effects = Number(item.meta['発動前コモン']);
		} else if (item.meta['BeforeCommon']) {
			effects = Number(item.meta['BeforeCommon']);
		}
		return effects;
	};

    ////////////////////////////////////////////////////////////////////////////////////
    
	var __BManager_startAction = BattleManager.startAction;
	BattleManager.startAction = function() {
		var action = this._subject.currentAction();
        if (this.checkBeforeCommon(action)) { return }
		__BManager_startAction.call(this);
        this._execBeforeCommon = false;
	};

    BattleManager.checkBeforeCommon = function(action) {
        if (action && !this._execBeforeCommon && DataManager.isBeforeCommon(action.item())){
            this._execBeforeCommon = true;
            var beforeCommon = DataManager.beforeCommonEffect(action.item());
            $gameTemp.reserveCommonEvent(beforeCommon);
            $gameVariables._data[indexVariableId] = this._subject.index();
            if (this._subject.isEnemy()){ $gameVariables._data[indexVariableId] += 1000 }
            this._phase = 'turn';
            return true;
        }
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBattler_removeCurrentAction = Game_Battler.prototype.removeCurrentAction;
    Game_Battler.prototype.removeCurrentAction = function () {
        if (!BattleManager._execBeforeCommon){
            __GBattler_removeCurrentAction.call(this);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());