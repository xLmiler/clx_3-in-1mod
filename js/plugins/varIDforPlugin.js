//=============================================================================
// varIDforPlugin（プラグインコマンドの引数に変数の値を採用するプラグイン）
// by フェルミウム湾
//=============================================================================

/*:
 * @plugindesc 【末尾に導入】
 * プラグイン引数に変数の値を採用
 * @author フェルミウム湾
 * 
 * @help プラグインコマンドの引数の数値を変数の値に変更するプラグインです。
 * 利用するにはコマンド名の末尾に「_varID」を付けてください。
 * 変更する引数の箇所に、値を代入したい変数の番号を入力します。
 * さらにスペースおかず直後に[]を付けると変更する引数を指定することが出来ます。
 * かっこ内に変更する引数の番号（1～）を,区切りで入力してください。
 * 指定しない場合はすべての引数が変更されます。
 * 
 * 注意）このプラグインはすべてのプラグインの最後（末尾）に導入してください。
 * このプラグイン導入以後に導入されたプラグインには
 * 本プラグインの効果がありません。
 * 
 * 
 * 【例】
 * 以下はコマンド名「func」のプラグインを呼び出すコマンドです。
 * 引数は12, 34, 56の3個となっています。
 * 
 * ◆プラグインコマンド：func 12 34 56
 * 
 * ↓この「func」を「func_varID」にすることにより、3個の引数はそれぞれ
 * 変数12番, 変数34番, 変数56番の値が採用されます。
 * 
 * ◆プラグインコマンド：func_varID 12 34 56
 * 
 * すなわち、変数12番＝-111, 変数34番＝-222, 変数56番＝-333 のときは
 * 以下の二つが同じになるということです。
 * 
 * ◆プラグインコマンド：func_varID 12 34 56
 * ◆プラグインコマンド：func -111 -222 -333
 * 
 * 1番目と3番目の引数のみを変更する場合は、次のように指定します。
 * このとき、以下の二つが同じになります。（変数の各値は同上）
 * 
 * ◆プラグインコマンド：func_varID[1,3] 12 -222 56
 * ◆プラグインコマンド：func -111 -222 -333
 * 
 * varIDの直後に[]を付け、内部に,区切りで半角数値で変更する引数の番号を
 * 入力してください。途中、スペースは入れないようにしてください。
 * （[1,3]を引数にするのではなく、
 * 　func_varID[1,3]までをコマンド名と認識させるためです）
 * 
 * 
 * 【利用規約】
 *  どうでもいいです。著作権を放棄するので勝手にぐちゃぐちゃにしてください。
 *  改変も再配布も、アダルト利用も構いません。連絡も不要です。
 * 
 */

(function() {
	var varIDtag = "_varID";

	var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		var found = command.match(new RegExp(varIDtag + "(\[[0-9]+(,[0-9]+)*\])?$"));
		if (found){
			var varIDstr = command.slice(found.index, command.length);
			command = command.slice(0, found.index);
			var convertID = new Array();
			if(varIDstr === varIDtag){
				// 全部変換
				for(var i = 0; i < args.length; i++){
					convertID[convertID.length] = i;
				}
			}else{
				// 一部変換
				varIDstr = varIDstr.slice(varIDtag.length + 1, varIDstr.length - 1);
				varID = varIDstr.split(",");
				for(var i = 0; i < varID.length; i++){
					convertID[convertID.length] = Number(varID[i]) - 1;
				}
			}
			for(var i = 0; i < convertID.length; i++){
				var id = convertID[i];
				if(!args[id].match(new RegExp("[0-9]"))) continue;
				args[id] = String($gameVariables.value(args[id]));
			}
		}
		_Game_Interpreter_pluginCommand.call(this, command, args);
	};
})();
