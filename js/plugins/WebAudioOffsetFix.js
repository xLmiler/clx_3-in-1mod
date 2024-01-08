/*:ja
 * @plugindesc bgmやbgsで再生位置がマイナスのときエラーになるのを防止する
 * @author kido
 *
 * @help 
 */

(function(){

  WebAudio.prototype._startPlaying = function(loop, offset) {
    if (this._loopLength > 0) {
      while (offset >= this._loopStart + this._loopLength) {
        offset -= this._loopLength;
      }
    }
    this._removeEndTimer();
    this._removeNodes();
    this._createNodes();
    this._connectNodes();
    this._sourceNode.loop = loop;
    if(offset < 0) offset = 0;
    this._sourceNode.start(0, offset);
    this._startTime = WebAudio._context.currentTime - offset / this._pitch;
    this._createEndTimer();
  };

})();