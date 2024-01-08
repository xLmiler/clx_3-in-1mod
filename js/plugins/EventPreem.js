//=============================================================================
// EventPreem.js
//=============================================================================

/*:ja
 * @plugindesc ver1.01 イベントコマンドの「戦闘の処理」の先制攻撃実装。
 * @author まっつＵＰ
 *
 * @param preemptive
 * @desc このIDの変数の値を百分率で
 * 先制攻撃の確率として評価します。
 * @default 10
 * 
 * @param surprise
 * @desc このIDの変数の値を百分率で
 * 不意打ちの確率として評価します。
 * @default 11
 * 
 * @param able
 * @desc このIDのスイッチがオフの時のみ
 * イベント時の先制攻撃等が起こります。
 * @default 10
 * 
 * @param ability
 * @desc このIDのスイッチがオフの時のみ
 * 先制攻撃等の確率の計算時にパーティ能力の評価をします。
 * @default 11
 * 
 * @param speedrate
 * @desc 先制攻撃等で有利なユニットの平均AGIが
 * 不利なユニットの平均AGIより大きい場合に評価する。
 * @default 0
 * 
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * イベントコマンド「戦闘の処理」向けの機能ですが
 * 元々のランダムエンカウントの機能を使う場合でも
 * 先制攻撃等の確率の操作は可能です。
 * 
 * ※パラメータの説明
 * preemptiveのIDの変数の値が0以下の時は先制攻撃の確率を
 * デフォルトの仕様で計算します。
 * surpriseのIDの変数の値が0以下の時は不意打ちの確率を
 * デフォルトの仕様で計算します。
 * surpriseの値はそれぞれの状況が起こる確率に乗算します。
 * surpriseの値が0以下の場合は乗算しません。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 * 
 * ver1.01 パーティ能力の効果についてパラメータ追加。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
var parameters = PluginManager.parameters('EventPreem');
var EPpreemptive = Number(parameters['preemptive'] || 10);
var EPsurprise = Number(parameters['surprise'] || 11);
var EPable = Number(parameters['able'] || 10);
var EPability = Number(parameters['ability'] || 11);
var EPspeedrate = Number(parameters['speedrate'] || 0);

var _BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
    _BattleManager_makeEscapeRatio.call(this);
    if(!$gameSwitches.value(EPable)) this.onEncounter();
};

var _Game_Party_ratePreemptive = Game_Party.prototype.ratePreemptive;
Game_Party.prototype.ratePreemptive = function(troopAgi) {
    if($gameVariables.value(EPpreemptive) > 0){
        var rate = $gameVariables.value(EPpreemptive) / 100;
        if(this.agility() > troopAgi && EPspeedrate > 0) rate *= EPspeedrate;
        if(this.hasRaisePreemptive() && !$gameSwitches.value(EPability)) rate *= 2;
        return rate;
    }
    return _Game_Party_ratePreemptive.call(this, troopAgi);
};

var _Game_Party_rateSurprise = Game_Party.prototype.rateSurprise;
Game_Party.prototype.rateSurprise = function(troopAgi) {
    if($gameVariables.value(EPsurprise) > 0){
        var rate = $gameVariables.value(EPsurprise) / 100;
        if(this.agility() < troopAgi && EPspeedrate > 0) rate *= EPspeedrate;
        if(this.hasCancelSurprise() && !$gameSwitches.value(EPability)) rate = 0;
        return rate;
    }
    return _Game_Party_rateSurprise.call(this, troopAgi);
};
 
})();
