/*---------------------------------------------------------------------------*
 * 2019/03/06 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc ティッカープラグイン
 * @author kido0617
 * @help
 *   簡易メッセージを表示するプラグインです
 *   使用方法: 
 *   TickerManager.show('\\I[5]あいうえお');
 *   
 *   ・変数はプラスなら自動的に+が付きます
 *   TickerManager.show('\\V[5]');
 * 
 *   ・ +をつけたくない場合は以下のように、falseを指定してください
 *   TickerManager.show('\\V[5]', false);
 * 
 *   ・全部いっきに消したい場合は以下のようにしてください
 *   TickerManager.hideAll();
 *
 *   ・アイテム・武器・防具のメモ欄
 *   <ticker:あいうえお> : アイテムの説明として入手/消失時に表示されます。ない場合はアイテムの説明の1行目を表示
 *    
 *   ・ログをクリア
 *    TickerManager.clearAllLog();
 * 
 *   ・古いログを１個クリア
 *    TickerManager.clearOldestLog();
 * 
 *
 * @param Opacity
 * @desc 背景の透明度(0 - 255)
 * @type number
 * @min 0
 * @max 255
 * @default 127
 *
 * @param DisplayDuration
 * @desc 表示時間[frame]
 * @type number
 * @default 180
 *
 * @param ToggleDuration
 * @desc 表示、消去にかける時間[frame]
 * @type number
 * @default 30
 * 
 * @param y位置
 * @desc y位置のずらし(pixel) 10と入力すると10ピクセルずれます
 * @type number
 * @default 0
 * 
 * @param x位置
 * @desc x位置のずらし(pixel) 10と入力すると10ピクセルずれます
 * @type number
 * @default 0
 * 
 * @param スライドアニメーション開始位置
 * @desc 左から何ピクセルの位置からスライドしていくか
 * @type number
 * @default 100
 * 
 * @param スライドアニメーション終了位置
 * @desc 左から何ピクセルの位置に向けてスライドしていくか
 * @type number
 * @default 0
 * 
 * @param y位置合わせスピード
 * @desc 2つ以上あるときに最初のが消えた際にy位置を調整するときのアニメーションスピード[pixel/frame]
 * @type number
 * @default 5
 * 
 * @param 上か下か
 * @desc 画面の上に表示するか下に表示するか
 * @default 上
 * @type select
 * @option 上
 * @option 下
 * 
 * @param ティッカー高さ
 * @desc ティッカーの高さです
 * @type number
 * @default 36
 * 
 * @param フォントサイズ
 * @desc フォントサイズです
 * @type number
 * @default 28
 * 
 * @param アイコンサイズ
 * @desc アイコンサイズです
 * @type number
 * @default 32
 * 
 * @param 背景画像
 * @desc 背景画像
 * @default 
 * @type file
 * @dir img/pictures/
 * 
 * @param 最大表示個数
 * @desc 表示できる個数です。オーバーすると古いのが消えます
 * @type number
 * @min 1
 * @max 100
 * @default 10
 * 
 * @param ログ機能ONスイッチ
 * @desc ONのとき消去せずログとして残しておくためのスイッチです
 * @type switch
 * @default 0
 * 
 * @param イージング
 * @desc スライドアニメーションのイージングを変えます
 * @default easeOutSine
 * @type select
 * @option linear
 * @option swingFromTo
 * @option swingFrom
 * @option swingTo
 * @option easeFromTo
 * @option easeFrom
 * @option easeTo
 * @option easeInQuad
 * @option easeOutQuad
 * @option easeInOutQuad
 * @option easeInCubic
 * @option easeOutCubic
 * @option easeInOutCubic
 * @option easeInQuart
 * @option easeOutQuart
 * @option easeInOutQuart
 * @option easeInQuint
 * @option easeOutQuint
 * @option easeInOutQuint
 * @option easeInSine
 * @option easeOutSine
 * @option easeInOutSine
 * @option easeInExpo
 * @option easeOutExpo
 * @option easeInOutExpo
 * @option easeInCirc
 * @option easeOutCirc
 * @option easeInOutCirc
 * @option easeOutBounce
 * @option easeInBack
 * @option easeOutBack
 * @option easeInOutBack
 * @option bounce
 * @option bouncePast
 * @option elastic
 * 
 * @param ステート自動表示スイッチ
 * @desc ここで指定したスイッチがONの時、ステート変化時に自動的にティッカーを表示します
 * @type switch
 * @default 0
 * 
 * @param アイテム・お金自動表示スイッチ
 * @desc ここで指定したスイッチがONの時、アイテム・武器防具・お金増減時に自動的にティッカーを表示します
 * @type switch
 * @default 0
 * 
 * @param 消失時にティッカーを表示
 * @desc アイテム・武器防具・ゴールド消失時にウィンドウを表示するか
 * @type boolean
 * @default true
 * 
 * @param アイテム・武器防具入手時テキスト
 * @desc アイテム・武器防具を入手したときのテキストです
 * %1がアイコン、%2がアイテム名、%3が個数、%4が説明に変わります。
 * メッセージウィンドウの制御コマンドが使えます。
 * @default %1 %2 x %3 GET %4
 *
 * @param アイテム・武器防具消失時テキスト
 * @desc アイテム・武器防具を消失した時に表示するテキストです。
 * %1がアイコン、%2がアイテム名、%3が個数、%4が説明に変わります。
 * メッセージウィンドウの制御コマンドが使えます。
 * @default %1 %2 x %3 消失 %4
 * 
 * @param お金入手時テキスト
 * @desc お金を入手したときのテキストです
 * %1がアイコン、%2が金額、%3が通貨単位に変わります。
 * メッセージウィンドウの制御コマンドが使えます。
 * @default %1 %2%3入手!
 *
 * @param お金消失時テキスト
 * @desc お金をなくしたしたときのテキストです
 * %1がアイコン、%2が金額、%3が通貨単位に変わります。
 * メッセージウィンドウの制御コマンドが使えます。
 * @default %1 %2%3消失!
 *
 * @param お金アイコン
 * @desc お金入手/消失時に表示するアイコン番号です
 * @default 1
 * @type number
 * 
 * 
 * @param アイテム・武器・防具入手時SE
 * @desc アイテム・武器・防具入手時SE
 * @type struct<seSetting>
 * 
 * @param アイテム・武器・防具消失時SE
 * @desc アイテム・武器・防具消失時SE
 * @type struct<seSetting>
 * 
 * @param お金入手時SE
 * @desc お金入手時SE
 * @type struct<seSetting>
 * 
 * @param お金消失時SE
 * @desc お金消失時SE
 * @type struct<seSetting>
 * 
 */

/*~struct~seSetting:
 *
 * @param name
 * @desc ファイル名
 * @default 
 * @dir audio/se/
 * @type file
 *
 * @param volume
 * @desc ボリューム
 * @default 90
 * @type number
 * 
 * @param pitch
 * @desc ピッチ
 * @default 100
 * @type number
 * 
 * @param pan
 * @desc パン
 * @default 0
 * @type number
 */


(function () {

  const parameters = PluginManager.parameters('Ticker');
  let defaultTickerSetting = {
    maxDisplay: Number(parameters['最大表示個数'] || 10),
    backgroundOpacity: Number(parameters['Opacity'] || 127),
    displayDuration: Number(parameters['DisplayDuration'] || 3 * 60),
    toggleDuration: Number(parameters['ToggleDuration'] || 30),
    xPosition: Number(parameters['x位置'] || 0),
    yPosition: Number(parameters['y位置'] || 0),
    fixYSpeed: Number(parameters['y位置合わせスピード'] || 100),
    slideFromX: Number(parameters['スライドアニメーション開始位置'] || 0),
    slideToX: Number(parameters['スライドアニメーション終了位置'] || 0),
    height: Number(parameters['ティッカー高さ']),
    fontSize: Number(parameters['フォントサイズ']),
    iconSize: Number(parameters['アイコンサイズ']),
    backgroundImg: parameters['背景画像'],
    isBaseTop: parameters['上か下か'] == '上',
    easingType: parameters['イージング'],
    logOnSwitch: Number(parameters['ログ機能ONスイッチ']),
    stateAutoEnableSWId: Number(parameters['ステート自動表示スイッチ']),
    autoSetting: {
      enableSWId: Number(parameters['アイテム・お金自動表示スイッチ']),
      enableLose: parameters['消失時にティッカーを表示'] == 'true',
      getItemText: parameters['アイテム・武器防具入手時テキスト'],
      loseItemText: parameters['アイテム・武器防具消失時テキスト'],
      getGoldText: parameters['お金入手時テキスト'],
      loseGoldText: parameters['お金消失時テキスト'],
      goldIcon: parameters['お金アイコン'],
      getItemSE: parseSE(parameters['アイテム・武器・防具入手時SE']),
      getGoldSE: parseSE(parameters['お金入手時SE']),
      loseItemSE: parseSE(parameters['アイテム・武器・防具消失時SE']),
      loseGoldSE: parseSE(parameters['お金消失時SE']),
    }
  };

  const gameSystemInitialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    //ゲーム内からパラメータを変更したいのでセーブデータに含める
    gameSystemInitialize.call(this);
    this.setDefaultTickerSetting();
    this.tickerLogs = [];
  };

  Game_System.prototype.setDefaultTickerSetting = function () {
    this.ticker = JsonEx.makeDeepCopy(defaultTickerSetting);
  };

  function parseSE(se) {
    try {
      se = JSON.parse(se);
    } catch (e) {
      return null;
    }
    if (!se || !se.name) return null;
    se.pitch = Number(se.pitch);
    se.volume = Number(se.volume);
    se.pan = Number(se.pan);
    return se;
  }

  window.TickerManager = function () { };

  //パラメータをデフォルトに戻したいケースのため保持
  TickerManager.param = defaultTickerSetting;

  TickerManager.createTickerContainer = function () {
    //通常ティッカー用のコンテナ
    if (!SceneManager._scene._tickerContainer) {
      let tc = new TickerContainer(false);
      SceneManager._scene._tickerContainer = tc;
      SceneManager._scene.addChild(tc);
    }
    //ログティッカー表示用のコンテナ
    if (!SceneManager._scene._tickerLogContainer) {
      let tc = new TickerContainer(true);
      SceneManager._scene._tickerLogContainer = tc;
      SceneManager._scene.addChild(tc);
    }
  };

  TickerManager.show = function (text, needPlus = true) {
    this.createTickerContainer();
    if (this.isLogContainerEnable()) SceneManager._scene._tickerLogContainer.show(text, needPlus);
    else SceneManager._scene._tickerContainer.show(text, needPlus);
  };

  TickerManager.hideAll = function () {
    if (SceneManager._scene._tickerContainer) {
      SceneManager._scene._tickerContainer.hideAll();
    }
  };

  TickerManager.isLogContainerEnable = function () {
    return this.isLogOn() && (SceneManager._scene.constructor == Scene_Map || SceneManager._scene.constructor == Scene_Battle);
  };

  TickerManager.isLogOn = function () {
    return $gameSwitches.value($gameSystem.ticker.logOnSwitch);
  };

  TickerManager.isAutoDisplayEnabled = function () {
    return $gameSystem.ticker.autoSetting.enableSWId > 0 && $gameSwitches.value($gameSystem.ticker.autoSetting.enableSWId);
  };

  TickerManager.clearAllLog = function () {
    if (!$gameParty.inBattle()) $gameSystem.tickerLogs = [];

    if (SceneManager._scene._tickerLogContainer) {
      if ($gameParty.inBattle()) SceneManager._scene._tickerLogContainer.instantLog = [];
      SceneManager._scene._tickerLogContainer.hideAll();
    }
  };

  TickerManager.clearOldestLog = function () {
    if (!$gameParty.inBattle()) $gameSystem.tickerLogs.shift();
    if (SceneManager._scene._tickerLogContainer) {
      if ($gameParty.inBattle()) SceneManager._scene._tickerLogContainer.instantLog.shift();
      SceneManager._scene._tickerLogContainer.hideOldest();
    }
  };

  var createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    createDisplayObjects.call(this);
    //メニューから戻ったり、ロードしたりしたときにログ用のティッカーを復元する
    if ($gameSystem.tickerLogs.length > 0) {
      TickerManager.createTickerContainer();
      $gameSystem.tickerLogs.forEach((log) => {
        SceneManager._scene._tickerLogContainer.showFromLog(log);
      });
      SceneManager._scene._tickerLogContainer.alpha = TickerManager.isLogOn() ? 1 : 0;
    }
  };

  function TickerContainer(isLogMode) {
    PIXI.Container.call(this);
    this.isLogMode = isLogMode;
    this.instantLog = [];  //そのシーンだけのログ
  }

  TickerContainer.prototype = Object.create(PIXI.Container.prototype);
  TickerContainer.prototype.constructor = TickerContainer;

  TickerContainer.prototype.update = function () {
    this.displayFade();
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].update();
      if (this.children[i].tickerState == 'end') {
        this.removeChildAt(i);
        this.adjustY();
        i--;
      }
    }
  };

  TickerContainer.prototype.displayFade = function () {
    //ログと通常の切替時にフェード入れる
    const duration = 0.1;
    var direction = 1;
    var logEnabled = TickerManager.isLogContainerEnable();
    if (this.isLogMode && !logEnabled) direction = -1;
    else if (!this.isLogMode && logEnabled) direction = -1;
    this.alpha = (this.alpha + direction * duration).clamp(0, 1);
  };

  TickerContainer.prototype.show = function (text, needPlus) {
    var ticker = this.makeTicker(text, needPlus);
    if (this.isLogMode) {
      //ログモードのとき画面切り替えやセーブに対応するため変換後のテキストを保存する。変換後でないと変数の値が変わる可能性がある
      var logs = $gameParty.inBattle() ? this.instantLog : $gameSystem.tickerLogs;
      logs.push(ticker.getCovertedText());
      if (logs.length > $gameSystem.ticker.maxDisplay) {
        logs.shift();
      }
    }
    if (this.countDisplay() > $gameSystem.ticker.maxDisplay) this.hideOldest();
  };

  TickerContainer.prototype.showFromLog = function (text, needPlus) {
    //ログを復帰するとき。表示アニメーションを飛ばして最初から表示にしたい
    var ticker = this.makeTicker(text, needPlus);
    ticker.setDisplayMode();
  };

  TickerContainer.prototype.makeTicker = function (text, needPlus) {
    var ticker = new Ticker(text, needPlus, this.isLogMode);
    ticker.setY(this.children.length);
    this.addChild(ticker);
    return ticker;
  };

  TickerContainer.prototype.adjustY = function () {
    //y位置直し
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].setToY(i);
    }
  };

  TickerContainer.prototype.hideOldest = function () {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].isShowState()) {
        this.children[i].hide();
        return;
      }
    }
  };

  TickerContainer.prototype.countDisplay = function () {
    return this.children.filter((child) => child.isShowState()).length;
  };

  TickerContainer.prototype.hideAll = function () {
    for (var i = 0; i < this.children.length; i++)this.children[i].hide();
  };

  function Ticker() {
    this.frameCount = 0;
    this.tickerState = 'showing';
    this.initialize.apply(this, arguments);
  }

  Ticker.prototype = Object.create(PIXI.Container.prototype);
  Ticker.prototype.constructor = Ticker;

  Ticker.prototype.initialize = function (text, addPlus, isLogMode) {
    PIXI.Container.call(this);
    this.x = $gameSystem.ticker.xPosition;
    this.width = Graphics.width;
    this.height = $gameSystem.ticker.height;
    this.text = text;
    this.isLogMode = isLogMode;
    this.createBackground();
    this.contents = new Window_Ticker(text, $gameSystem.ticker.slideFromX, 0, this._width, this._height, addPlus);
    this.addChild(this.contents);
  };

  Ticker.prototype.setY = function (index) {
    this.y = $gameSystem.ticker.isBaseTop ? this.height * index + $gameSystem.ticker.yPosition : Graphics.height - this.height * (index + 1) - $gameSystem.ticker.yPosition;
  };

  Ticker.prototype.setToY = function (index) {
    this.toY = $gameSystem.ticker.isBaseTop ? this.height * index + $gameSystem.ticker.yPosition : Graphics.height - this.height * (index + 1) - $gameSystem.ticker.yPosition;
  };

  Ticker.prototype.createBackground = function () {
    this._backSprite = new Sprite();
    if ($gameSystem.ticker.backgroundImg) {
      this._backSprite.bitmap = ImageManager.loadPicture($gameSystem.ticker.backgroundImg);
    } else {
      this._backSprite.bitmap = new Bitmap(this._width, this._height);
      this._backSprite.bitmap.fillAll('rgba(0, 0, 0, 1)');
    }
    this._backSprite.opacity = 0;
    this.addChild(this._backSprite);
  };

  Ticker.prototype.hide = function () {
    if (!this.isShowState()) return;
    this.tickerState = 'hiding';
    this.frameCount = 0;
  };

  Ticker.prototype.isShowState = function () {
    return this.tickerState == 'showing' || this.tickerState == 'display';
  };

  Ticker.prototype.setDisplayMode = function () {
    //アニメなしで表示する（ログのとき画面切り替えしたときとかのため）
    this._backSprite.opacity = $gameSystem.ticker.backgroundOpacity;
    this.contents.contentsOpacity = 255;
    this.contents.x = $gameSystem.ticker.slideToX;
    this.tickerState = 'display';
  };

  Ticker.prototype.getCovertedText = function () {
    return this.contents.convertEscapeCharacters(this.text);
  };

  Ticker.prototype.update = function () {
    this.children.forEach(function (child) {
      child.update();
    });
    this.frameCount++;
    if (this.toY != null && this.y != this.toY) {
      if (this.y > this.toY) {
        this.y -= $gameSystem.ticker.fixYSpeed;
        if (this.y < this.toY) this.y = this.toY;
      } else {
        this.y += $gameSystem.ticker.fixYSpeed;
        if (this.y > this.toY) this.y = this.toY;
      }

    }
    switch (this.tickerState) {
      case 'showing':
        var rate = easing[$gameSystem.ticker.easingType](this.frameCount / $gameSystem.ticker.toggleDuration);
        this._backSprite.opacity = rate * $gameSystem.ticker.backgroundOpacity;
        this.contents.contentsOpacity = rate * 255;
        this.contents.x = $gameSystem.ticker.slideToX + (1 - rate) * $gameSystem.ticker.slideFromX;
        if (this.frameCount == $gameSystem.ticker.toggleDuration) {
          this.tickerState = 'display';
          this.frameCount = 0;
        }
        break;
      case 'display':
        if (this.frameCount == $gameSystem.ticker.displayDuration) {
          if (this.isLogMode) {
            //ログ表示中は消去にいかない
            return;
          }
          this.tickerState = 'hiding';
          this.frameCount = 0;
        }
        break;
      case 'hiding':
        this._backSprite.opacity = (1 - this.frameCount / $gameSystem.ticker.toggleDuration) * $gameSystem.ticker.backgroundOpacity;
        this.contents.contentsOpacity = (1 - this.frameCount / $gameSystem.ticker.toggleDuration) * 255;
        if (this.frameCount == $gameSystem.ticker.toggleDuration) {
          this.tickerState = 'end';
        }
        break;
    }

  };


  function Window_Ticker() {
    this.initialize.apply(this, arguments);
  }

  Window_Ticker.prototype = Object.create(Window_Base.prototype);
  Window_Ticker.prototype.constructor = Window_Ticker;

  Window_Ticker.prototype.initialize = function (text, x, y, width, height, addPlus) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.addPlus = addPlus;
    this.drawTextEx(text, 0, height / 2 - this.standardFontSize() / 2 - 4);
  };

  Window_Ticker.prototype.lineHeight = function () {
    return $gameSystem.ticker.fontSize + 8;
  };

  Window_Ticker.prototype.standardPadding = function () {
    return 0;
  };

  Window_Ticker.prototype.standardFontSize = function () {
    return $gameSystem.ticker.fontSize;
  };

  //変数にプラス記号をつけるため
  Window_Ticker.prototype.convertEscapeCharacters = function (text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
      var v = $gameVariables.value(parseInt(arguments[1]));
      return (v > 0 && this.addPlus ? '+' : '') + v;
    }.bind(this));
    text = text.replace(/\x1bV\[\+*(\d+)\]/gi, function () {
      var v = $gameVariables.value(parseInt(arguments[1]));
      return (v > 0 && this.addPlus ? '+' : '') + v;
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function () {
      return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function () {
      return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
  };

  Window_Ticker.prototype.processDrawIcon = function(iconIndex, textState) {
    var size = this.getIconSize();
    var y = ($gameSystem.ticker.height - size) / 2;
    this.drawIcon(iconIndex, textState.x + 2, y);
    textState.x += size + 4;
  };

  Window_Ticker.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var size = this.getIconSize();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
  };

  Window_Ticker.prototype.getIconSize = function() {
    return $gameSystem.ticker.iconSize ? $gameSystem.ticker.iconSize : Window_Base._iconWidth;
  };

  //自動表示-----------------------------------------------------------------

  function formatTickerText(text, strs) {
    text = text.replace('%1', '\\I[' + strs[0] + ']');
    for (var i = 1; i <= strs.length; i++) {
      text = text.replace('%' + (i + 1), strs[i]);
    }
    return text;
  }

  function GetItemDescription(item) {
    if (item.meta.ticker) {
      return item.meta.ticker;
    }
    return item.description.replace(/[\r\n]+.*/m, '');
  }

  function showAutoTicker(getText, loseText, getSE, loseSE, strs, value) {
    let format = '';
    let se;
    if (value > 0) {
      format = getText;
      se = getSE;
    } else if ($gameSystem.ticker.autoSetting.enableLose && value < 0) {
      format = loseText;
      se = loseSE;
    }
    if (format) {
      let formated = formatTickerText(format, strs);
      TickerManager.show(formated);
      if (se) {
        AudioManager.playSe(se);
      }
    }
  }

  // Change Gold
  const command125 = Game_Interpreter.prototype.command125;
  Game_Interpreter.prototype.command125 = function () {
    command125.call(this);
    if (TickerManager.isAutoDisplayEnabled()) {
      let value = this.operateValue(this._params[0], this._params[1], this._params[2]);
      showAutoTicker($gameSystem.ticker.autoSetting.getGoldText, $gameSystem.ticker.autoSetting.loseGoldText,
        $gameSystem.ticker.autoSetting.getGoldSE, $gameSystem.ticker.autoSetting.loseGoldSE,
        [$gameSystem.ticker.autoSetting.goldIcon, Math.abs(value), $dataSystem.currencyUnit], value);
    }
    return true;
  };

  // Change Items
  const command126 = Game_Interpreter.prototype.command126;
  Game_Interpreter.prototype.command126 = function () {
    command126.call(this);
    if (TickerManager.isAutoDisplayEnabled()) {
      let value = this.operateValue(this._params[1], this._params[2], this._params[3]);
      let item = $dataItems[this._params[0]];
      showAutoTicker($gameSystem.ticker.autoSetting.getItemText, $gameSystem.ticker.autoSetting.loseItemText,
        $gameSystem.ticker.autoSetting.getItemSE, $gameSystem.ticker.autoSetting.loseItemSE,
        [item.iconIndex, item.name, Math.abs(value), GetItemDescription(item)], value);
    }
    return true;
  };


  // Change Weapons
  const command127 = Game_Interpreter.prototype.command127;
  Game_Interpreter.prototype.command127 = function () {
    command127.call(this);
    if (TickerManager.isAutoDisplayEnabled()) {
      let value = this.operateValue(this._params[1], this._params[2], this._params[3]);
      let item = $dataWeapons[this._params[0]];
      showAutoTicker($gameSystem.ticker.autoSetting.getItemText, $gameSystem.ticker.autoSetting.loseItemText,
        $gameSystem.ticker.autoSetting.getItemSE, $gameSystem.ticker.autoSetting.loseItemSE,
        [item.iconIndex, item.name, Math.abs(value), GetItemDescription(item)], value);
    }
    return true;
  };

  // Change Armors
  const command128 = Game_Interpreter.prototype.command128;
  Game_Interpreter.prototype.command128 = function () {
    command128.call(this);
    if (TickerManager.isAutoDisplayEnabled()) {
      let value = this.operateValue(this._params[1], this._params[2], this._params[3]);
      let item = $dataArmors[this._params[0]];
      showAutoTicker($gameSystem.ticker.autoSetting.getItemText, $gameSystem.ticker.autoSetting.loseItemText,
        $gameSystem.ticker.autoSetting.getItemSE, $gameSystem.ticker.autoSetting.loseItemSE,
        [item.iconIndex, item.name, Math.abs(value), GetItemDescription(item)], value);
    }
    return true;
  };

  //ステート変化時の自動表示------------------------------------------------------

  function NeedStateChangeDisplay(){
    if($gameSystem.ticker.stateAutoEnableSWId != 0 && !$gameSwitches.value($gameSystem.ticker.stateAutoEnableSWId)) return false;

    return  !(SceneManager._scene instanceof Scene_Battle) ||
     ($gameTroop && $gameTroop.isEventRunning());
  }

  const _gameBattlerBaseAddNewState = Game_BattlerBase.prototype.addNewState;
  Game_BattlerBase.prototype.addNewState = function(stateId) {
    if(NeedStateChangeDisplay() && this._states && !this._states.contains(stateId)){
      let state = $dataStates[stateId];
      if(state.message1) TickerManager.show(this._name + state.message1);
    }
    _gameBattlerBaseAddNewState.apply(this, arguments);
  };

  const _gameBattlerBaseEraseState = Game_BattlerBase.prototype.eraseState;
  Game_BattlerBase.prototype.eraseState = function(stateId) {
    if(NeedStateChangeDisplay() && this._states && this._states.contains(stateId)){
      let state = $dataStates[stateId];
      if(state.message4) TickerManager.show(this._name + state.message4);
    }
    _gameBattlerBaseEraseState.apply(this, arguments);
  };

  const _gameBattlerBaseClearStates = Game_BattlerBase.prototype.clearStates;
  Game_BattlerBase.prototype.clearStates = function() {
    if(NeedStateChangeDisplay() && this._states){
      this._states.forEach(function(stateId) {
        let state = $dataStates[stateId];
        if(state.message4) TickerManager.show(this._name + state.message4);
      }.bind(this));
    }
    _gameBattlerBaseClearStates.apply(this, arguments);
  };

  
  //歩行時のウィンドウでのステート表示を消す
  // Game_Actor.prototype.showAddedStates = function() {
  // 
  //};

  Game_Actor.prototype.showRemovedStates = function() {
    
  };


  
  //戦闘中のバトルログをTickerに流す-------------------------------------
  const _windowBackLogInitialize = Window_BattleLog.prototype.initialize;
  Window_BattleLog.prototype.initialize = function () {
    _windowBackLogInitialize.call(this);
    this.visible = false;
  };

  Window_BattleLog.prototype.drawLineText = function (index) {
    if (this._actionIcon && this._lines[index].match('<SIMPLE>')) {
      this._lines[index] = '\\I[' + this._actionIcon + ']' + this._lines[index];
    }
    TickerManager.show(this._lines[index].replace('<CENTER>', '').replace('<SIMPLE>', ''));
    this._lines.pop();
  };

  //easing-------------------------------------------------------------
  var easing = {
    linear: function (pos) {
      return pos;
    },

    easeInQuad: function (pos) {
      return Math.pow(pos, 2);
    },

    easeOutQuad: function (pos) {
      return -(Math.pow((pos - 1), 2) - 1);
    },

    easeInOutQuad: function (pos) {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2);
      return -0.5 * ((pos -= 2) * pos - 2);
    },

    easeInCubic: function (pos) {
      return Math.pow(pos, 3);
    },

    easeOutCubic: function (pos) {
      return (Math.pow((pos - 1), 3) + 1);
    },

    easeInOutCubic: function (pos) {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
      return 0.5 * (Math.pow((pos - 2), 3) + 2);
    },

    easeInQuart: function (pos) {
      return Math.pow(pos, 4);
    },

    easeOutQuart: function (pos) {
      return -(Math.pow((pos - 1), 4) - 1);
    },

    easeInOutQuart: function (pos) {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
      return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },

    easeInQuint: function (pos) {
      return Math.pow(pos, 5);
    },

    easeOutQuint: function (pos) {
      return (Math.pow((pos - 1), 5) + 1);
    },

    easeInOutQuint: function (pos) {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5);
      return 0.5 * (Math.pow((pos - 2), 5) + 2);
    },

    easeInSine: function (pos) {
      return -Math.cos(pos * (Math.PI / 2)) + 1;
    },

    easeOutSine: function (pos) {
      return Math.sin(pos * (Math.PI / 2));
    },

    easeInOutSine: function (pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },

    easeInExpo: function (pos) {
      return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));
    },

    easeOutExpo: function (pos) {
      return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    },

    easeInOutExpo: function (pos) {
      if (pos === 0) return 0;
      if (pos === 1) return 1;
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
      return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    },

    easeInCirc: function (pos) {
      return -(Math.sqrt(1 - (pos * pos)) - 1);
    },

    easeOutCirc: function (pos) {
      return Math.sqrt(1 - Math.pow((pos - 1), 2));
    },

    easeInOutCirc: function (pos) {
      if ((pos /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - pos * pos) - 1);
      return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
    },

    easeOutBounce: function (pos) {
      if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    easeInBack: function (pos) {
      var s = 1.70158;
      return (pos) * pos * ((s + 1) * pos - s);
    },

    easeOutBack: function (pos) {
      var s = 1.70158;
      return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    },

    easeInOutBack: function (pos) {
      var s = 1.70158;
      if ((pos /= 0.5) < 1) return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
      return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },

    elastic: function (pos) {
      return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
    },

    swingFromTo: function (pos) {
      var s = 1.70158;
      return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
        0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },

    swingFrom: function (pos) {
      var s = 1.70158;
      return pos * pos * ((s + 1) * pos - s);
    },

    swingTo: function (pos) {
      var s = 1.70158;
      return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },

    bounce: function (pos) {
      if (pos < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    bouncePast: function (pos) {
      if (pos < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    easeFromTo: function (pos) {
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
      return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },

    easeFrom: function (pos) {
      return Math.pow(pos, 4);
    },

    easeTo: function (pos) {
      return Math.pow(pos, 0.25);
    }
  };

})();
