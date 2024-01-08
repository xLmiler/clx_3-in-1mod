/*:
 * @plugindesc 战斗反击
 * @author 夜末寂然
 * @help
 * 在武器的备注栏备注<counterattack:技能id>
 * 如<counterattack:1>
 * 即可在反击时触发技能1对应的技能效果
 * 
 * 在技能备注<repeats:连击次数>可以触发连击
 * 如<repeats:2>，当反击的技能id含有这个时，连续反击次数为2
 * 
 * 在技能备注<status1:状态id,概率>可以添加状态
 * 如加入<status1:1,0.5>，当角色反击时，会有50%的概率给敌人增加1号状态
 * <status2:状态id,概率>同上
 * 
 * 插件仅限自用，完全覆盖BattleManager.invokeCounterAttack
 */

BattleManager.invokeCounterAttack = function (subject, target) {
    //var actorSubject = target.isActor() ? target : subject;
    if (target.isActor()) {
        var weapon = $gameActors.actor(1).equips()[0];
        var skillId = weapon ? parseInt(weapon.meta.counterattack) || 1 : 21;
        var skill = $dataSkills[skillId];
        var skillRepeats = parseInt(skill.meta.repeats) || 1;
        var isSingleTarget = skill.scope === 1;

        var performCounterAttack = function (counterTarget) {
            for (var j = 0; j < skillRepeats; j++) {
                var action = new Game_Action(target);
                action.setSkill(skillId);
                counterTarget.startAnimation(skill.animationId, false, 0);
                action.apply(counterTarget);
                applyStatusEffects(skill, counterTarget);
                this._logWindow.displayCounter(target);
                this._logWindow.displayActionResults(target, counterTarget);
                if (counterTarget.isDead()) counterTarget.performCollapse();
            }
        }.bind(this);

        var targets = isSingleTarget
            ? [target.opponentsUnit().aliveMembers().randomElement()]
            : target.opponentsUnit().aliveMembers();

        targets.forEach(performCounterAttack);
    }
    else {
        var action = new Game_Action(target);
        this._logWindow.displayCounter(target);
        action.setAttack();
        action.apply(subject);
        this._logWindow.displayActionResults(target, subject);
        if (subject.isDead()) subject.performCollapse();
    }
};

function applyStatusEffects(skill, target) {
    for (var i = 1; true; i++) {
        var statusMeta = skill.meta['status' + i];
        if (!statusMeta) break;
        var statusData = statusMeta.split(',');
        if (statusData.length === 2) {
            var statusId = parseInt(statusData[0]);
            var statusChance = parseFloat(statusData[1]);
            if (Math.random() < statusChance) {
                target.addState(statusId);
            }
        }
    }
}

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
};