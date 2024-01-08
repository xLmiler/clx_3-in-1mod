/*---------------------------------------------------------------------------*
 * 2020/08/26 shimo8
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc ガチャプラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   Gacha リスト
 * 
 * 
 */

(function(){
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === 'Gacha') {
          var ListType = args[0];
          if(ListType == "PSkillG1"){
              var GachaList = new Gacha([[0, 75], [34, 10], [35, 10], [36 , 5]])
            }else if(ListType == "PSkillG2"){
                var GachaList = new Gacha([[0, 80], [42, 10], [43, 10]])
            }else if(ListType == "PSkillG3"){
                var GachaList = new Gacha([[0, 85], [49, 10], [50, 5]])
            }else if(ListType == "PSkillG4"){
                var GachaList = new Gacha([[0, 52], [56, 8], [57, 8], [58, 8], [59, 8] ,[60, 8]]);
            }else if(ListType == "PSkillG5"){
                var GachaList = new Gacha([[0, 65], [64, 7], [65, 7], [66, 7], [67, 7], [68, 7]]);
            }else if(ListType == "PSkillG6"){
                var GachaList = new Gacha([[0, 65], [73, 7], [74, 7], [75, 7], [76, 7],[77, 7]]);
            }else{
                var GachaList = new Gacha([[0,100],[0,100]])
                console.error('Gachaのリストタイプが不明')
            }
    
            var Output = GachaList.gacha();
            $gameVariables._data[3340] = Output

      }
    }
})();


var Gacha = function(gachalist) {
	var self = this;
	self.lists = gachalist;
	self.totalWeight = (function() {
		var sum = 0;
		self.lists.forEach(function(list) {
			sum += list[1];
		});
		return sum;
	}());
}


Gacha.prototype.gacha = function() {
	var r = Math.random() * this.totalWeight;
	var s = 0.0;
	for (list in this.lists) {
		s += this.lists[list][1];
		if (r < s) {
			return this.lists[list][0];
		}
	}
}
