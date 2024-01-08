/*:ja
 * @plugindesc 放置していると画面がフリーズするのを修正
 * @author kido
 *
 * @help 
 * このコアスクリプトの修正を取り込みます
 * https://github.com/rpgtkoolmv/corescript/pull/191
 */


// Graphics.render = function(stage) {
//   if (this._skipCount <= 0) {
//       var startTime = Date.now();
//       if (stage) {
//           this._renderer.render(stage);
//           if (this._renderer.gl && this._renderer.gl.flush) {
//               this._renderer.gl.flush();
//           }
//       }
//       var endTime = Date.now();
//       var elapsed = endTime - startTime;
//       this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
//       this._rendered = true;
//   } else {
//       this._skipCount--;
//       this._rendered = false;
//   }
//   this.frameCount++;
// };

