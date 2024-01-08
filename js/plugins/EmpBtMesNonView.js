//=============================================================================
// EmpBtMesNonView.js
//=============================================================================
// Copyright (c) 2015 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【MMP ver.1.1】戦闘メッセージが空の場合、表示しないようにします。
 * @author 木星ペンギン
 *
 * @help ●対応しているメッセージ一覧
 * 出現
 * 先制攻撃
 * 不意打ち
 * 逃走開始
 * 逃走失敗
 * 勝利
 * 敗北
 * 経験値獲得
 * お金獲得
 * アイテム獲得
 * レベルアップ
 * スキル習得
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 */

(function() {
    
    //-------------------------------------------------------------------------
    // BattleManager
    
    BattleManager.displayStartMessages = function() {
        if (TextManager.emerge.length > 0) {
            $gameTroop.enemyNames().forEach(function(name) {
                $gameMessage.add(TextManager.emerge.format(name));
            });
        };
        if (this._preemptive && TextManager.preemptive.length > 0) {
            $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
        } else if (this._surprise && TextManager.surprise.length > 0) {
            $gameMessage.add(TextManager.surprise.format($gameParty.name()));
        }
    };

    BattleManager.displayVictoryMessage = function() {
        if (TextManager.victory.length > 0) {
            $gameMessage.add(TextManager.victory.format($gameParty.name()));
        };
    };

    BattleManager.displayDefeatMessage = function() {
        if (TextManager.defeat.length > 0) {
            $gameMessage.add(TextManager.defeat.format($gameParty.name()));
        };
    };

    BattleManager.displayEscapeSuccessMessage = function() {
        if (TextManager.escapeStart.length > 0) {
            $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
        };
    };

    BattleManager.displayEscapeFailureMessage = function() {
        if (TextManager.escapeStart.length > 0) {
            $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
        };
        if (TextManager.escapeFailure.length > 0) {
            $gameMessage.add('\\.' + TextManager.escapeFailure);
        };
    };
    
    var _BattleManager_displayExp = BattleManager.displayExp;
    BattleManager.displayExp = function() {
        if (TextManager.escapeStart.length > 0) {
            _BattleManager_displayExp.call(this);
        };
    };

    var _BattleManager_displayGold = BattleManager.displayGold;
    BattleManager.displayGold = function() {
        if (TextManager.obtainGold.length > 0) {
            _BattleManager_displayGold.call(this);
        };
    };

    var _BattleManager_displayDropItems = BattleManager.displayDropItems;
    BattleManager.displayDropItems = function() {
        if (TextManager.obtainItem.length > 0) {
            _BattleManager_displayDropItems.call(this);
        };
    };

    //-------------------------------------------------------------------------
    // BattleManager
    
    Game_Actor.prototype.displayLevelUp = function(newSkills) {
        if (TextManager.levelUp.length > 0) {
            var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
            $gameMessage.newPage();
            $gameMessage.add(text);
        };
        if (TextManager.obtainSkill.length > 0) {
            newSkills.forEach(function(skill) {
                $gameMessage.add(TextManager.obtainSkill.format(skill.name));
            });
        };
    };
    
})();
