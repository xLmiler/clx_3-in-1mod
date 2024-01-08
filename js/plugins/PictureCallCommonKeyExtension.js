/*---------------------------------------------------------------------------*
 * 2019/03/06 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc ピクチャーボタン化プラグインをキーでも操作可能にするプラグイン
 * @author kido0617
 * @help
 * プラグインコマンド
 * ・キー操作有効化。表示中のボタンを元にキーの移動先を計算します。ボタンをあとから追加、削除したらもう一度呼び直してください
 * P_CALL_KEY_ON
 * 
 * ・初期カーソル位置を設定する場合は、ピクチャ番号を指定します。指定しない場合は画面の左上から一番近いボタンが初期カーソルになります
 * P_CALL_KEY_ON 4
 * 
 * ・カーソル移動はデフォルトではカーソル押しっぱなしで全ボタンループするようになっています。
 * 別のアルゴリズムとして一番近いボタンにカーソルを合わせるというのも用意してみました。 nearを指定します。
 * P_CALL_KEY_ON 4 near
 * P_CALL_KEY_ON near
 *   
 *
 * @param カーソル移動時に音を出すか
 * @desc マウスホバー時も音を出すなら、これを切ってホバーのコモンで音を鳴らしてください
 * @type boolean
 * @default true
 *
 * 
 */


(function(){
  
  const myParameters = PluginManager.parameters('PictureCallCommonKeyExtension');
  const needCursorSound = myParameters['カーソル移動時に音を出すか'] == 'true';

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'P_CALL_KEY_ON') {
      $gameScreen.isPCallNear = args[0] == 'near' || args[1] == 'near';
      let pid = Number(args[0]);
      $gameScreen.defaultPCallId = pid;
      $gameScreen.isPCallKeyOn = true;
      $gameScreen.isPCallImgLoaded = false;
    }else if (command === 'P_CALL_KEY_OFF') {
      $gameScreen.isPCallKeyOn = false;
    }
  };



  const Game_Screen_Update = Game_Screen.prototype.update;
  Game_Screen.prototype.update = function() {
    Game_Screen_Update.call(this);
    if(!this.isPCallKeyOn)return;
    //一旦、画像を全部ロードしてから処理する
    if(!this.isPCallImgLoaded){
      for (let key in $gameScreen._pictureCidArray) {
        if(!$gameScreen._pictureCidArray[key])continue;
        let pid = Number(key);
        let sprite = SceneManager.getPictureSprite(pid);
        if(!this.picture(pid) || !sprite)continue;
        if(!sprite.bitmap || !sprite.bitmap.isReady()) return;
      }
      this.isPCallImgLoaded = true;
      this.calcPCallCenterPosition();
      if(!this.isPCallNear)this.calcPCallXYArray();
      this.pcId = this.defaultPCallId? this.defaultPCallId : this.calcPCallLeftTopPid();
      callCommon(this.pcId, 4, true);
    }
    if(!$gameMap.isEventRunning() && SceneManager._scene.constructor == Scene_Map) this.processPictureCommonCursorMove();
  };

  //全ピクチャのピクチャの中心座標を計算
  Game_Screen.prototype.calcPCallCenterPosition = function() {
    this.pCallPositions = {};
    for (let key in this._pictureCidArray) {
      if(!this._pictureCidArray[key])continue;
      let pid = Number(key);
      if(!this.picture(pid)) continue;  //設定だけしてピクチャが表示されてない
      let sprite = SceneManager.getPictureSprite(pid);
      if(!sprite)continue;
      this.pCallPositions[pid] = {
        x: sprite._anchor._x == 0.5 ? sprite.x : sprite.x + sprite.width / 2,
        y: sprite._anchor._y == 0.5 ? sprite.y : sprite.y + sprite.height / 2,
        width: sprite.width,
        height: sprite.height
      };
    }
  };

  //カーソル移動に使うxが小さい順、yが小さい順を構築する
  Game_Screen.prototype.calcPCallXYArray = function(){
    var picInfos = [];
    for (let key in this.pCallPositions) {
      var pid = Number(key);
      if(!this.picture(pid)) continue;  //設定だけしてピクチャが表示されてない
      picInfos.push({
        id: pid,
        x: this.pCallPositions[key].x,
        y: this.pCallPositions[key].y
      });
    }
    this.xPicArray = [];
    this.yPicArray = [];
    
    var sorting = (array, first, second) => {
      array.sort((a, b) => {
        if(a[first] > b[first]) return 1;
        else if(a[first] < b[first]) return -1;
        else{
          if(a[second] > b[second]) return 1;
          else if(a[second] < b[second]) return -1;
        }
        return 0;
      });
    };

    sorting(picInfos, 'x', 'y');
    for(let i = 0 ; i < picInfos.length; i++){
      this.xPicArray.push(picInfos[i].id);
    }
    sorting(picInfos, 'y', 'x');
    for(let i = 0 ; i < picInfos.length; i++){
      this.yPicArray.push(picInfos[i].id);
    }
  };

  //左上座標から一番近いボタンを探す
  Game_Screen.prototype.calcPCallLeftTopPid = function() {
    let near = {distance: 9999999, pid: null};
    for(let key in this.pCallPositions){
      let pid = Number(key);
      let pos = this.pCallPositions[pid];
      let distance = Math.pow(pos.x, 2) + Math.pow(pos.y, 2);
      if(near.distance > distance){
        near.distance = distance;
        near.pid = pid;
      }
    }
    return near.pid;
  };

  //現在カーソルがあるボタンから押した方向の一番近いボタンを探す
  Game_Screen.prototype.getNearPictureId = function(pictureId, axis, dir) {
    let base = this.pCallPositions[pictureId];
    let near = {distance: 9999999999, pid: null};
    for(let key in this.pCallPositions){
      let pid = Number(key);
      //if(pictureId == pid)continue;
      let calcPos = {};
      let pos = this.pCallPositions[pid];
      if(axis == 'y'){
        calcPos.x = pos.x;
        if(dir * base.y < dir * pos.y) {
          calcPos.y = pos.y;
        }else{
          calcPos.y =  dir * Graphics.height + pos.y;
        }
      }else{
        calcPos.y = pos.y;
        if(dir * base.x < dir * pos.x){
          calcPos.x = pos.x;
        }else{
          calcPos.x = dir * Graphics.width + pos.x;
        }
      }
      
      let distance = Math.pow(calcPos.x - base.x, 2) + Math.pow(calcPos.y - base.y, 2);
      if(near.distance > distance){
        near.distance = distance;
        near.pid = pid;
      }
    }
    return near.pid;
  };

  function isSameAxis(base, target, dir, size){
    return (base[dir] <= target[dir] && base[dir] + base[size] >= target[dir]) ||
          (base[dir] <= target[dir] + target[size] && base[dir] + base[size] >= target[dir] + target[size]);
  }

  Game_Screen.prototype.processPictureCommonCursorMove = function() {
    if(this.hoverId){
      callCommon(this.hoverId, 4);
      this.hoverId = null;
      return;
    }

    let lastPcId = this.pcId;
    if(Input.isTriggered('ok')){
      callCommon(this.pcId, 7);
      return;
    }

    let inputs = ['down', 'up', 'left', 'right'];
    let toAxis = {down: 'y', up: 'y', left: 'x', right: 'x'};
    let toDir = {down: 1, up: -1, left: -1, right: 1};
    let targetArray = {down: this.xPicArray, up: this.xPicArray, left: this.yPicArray, right: this.yPicArray};
    for(let i = 0; i < inputs.length; i++){
      let input = inputs[i];
      if (Input.isRepeated(input)) {
        if(this.isPCallNear){
          this.pcId = this.getNearPictureId(this.pcId, toAxis[input], toDir[input]);
        }else{
          let array = targetArray[input];
          let index = array.indexOf(this.pcId);
          index += toDir[input];
          if(index < 0) index = array.length - 1;
          else if(index >= array.length) index = 0;
          this.pcId = array[index];
        }
      }
    }
    
    if (this.pcId !== lastPcId) {
      if(needCursorSound)SoundManager.playCursor();
      callCommon(lastPcId, 5);
      this.hoverId = this.pcId;
    }
  };


  function callCommon(pid, trigger, isForce){
    let common = $gameScreen._pictureCidArray[pid];
    if(isForce) $gameTemp.forceTouchPicture(common[trigger], pid);
    else $gameTemp.onTouchPicture(common[trigger], pid);
  }

  //PictureCallCommonはイベント実行中はコモンを呼ばないようになっているが、それを突破して呼びたいことがあるため
  const pcParameters = PluginManager.parameters('PictureCallCommon');
  const paramGameVariablePictNum = Number(pcParameters['ピクチャ番号の変数番号'] || 0);
  Game_Temp.prototype.forceTouchPicture = function(param, pictureId) {
    this._touchPictureParam = param;
    if (this.isTouchPictureSetSwitch()) {
      $gameSwitches.setValue(param * -1, true);
    }
    if (this.isTouchPictureCallCommon()) {
      this.setPictureCallInfo(param);
    }
    if (paramGameVariablePictNum > 0) {
      $gameVariables.setValue(paramGameVariablePictNum, pictureId);
    }
    this._touchPictureId = pictureId;
  };

  //PictureCallCommon定義のメソッドの書き換え
  Sprite_Picture.prototype.updateMouseMove = function() {
    if($gameMap.isEventRunning())return;   //イベント中にマウス移動イベントの処理をすると表示おかしくなるので
    if (this.isIncludePointer()) {
      if (!this._wasOnMouse) {
        this._onMouse    = true;
        this._wasOnMouse = true;
      }
    } else if (this._wasOnMouse) {
      this._outMouse   = true;
      this._wasOnMouse = false;
    }
  };

  //PictureCallCommonのgetPictureSpriteを上書き。pictureがSprite_Pictureでない場合が存在していて、エラーになるため
  Scene_Base.prototype.getPictureSprite = function(pictureId) {
    var result = null;
    this._spriteset.iteratePictures(function(picture) {
      if (picture instanceof Sprite_Picture && picture.isIdEquals(pictureId)) {
        result = picture;
        return false;
      }
      return true;
    });
    return result;
  };
  

})();