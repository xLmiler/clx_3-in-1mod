/*:
 * @plugindesc タグをつけたイベントの一覧を表示し、選択したイベントを実行します。
 * @author hiz
 *
 * @param Window Position
 * @desc イベント一覧の表示位置を設定します。（left:左端 right:右端）
 * @default left
 *
 * @param Window Sort
 * @desc イベント一覧の並び順を設定します。（id:イベントID dist:主人公からの距離 x:X座標 y:Y座標 self:自分で定義）
 * @default id
 *
 * @param Show Range
 * @desc 主人公から一定範囲のイベントのみを対象とする場合に、範囲の表示有無を設定します。（0:表示しない 1:表示する）
 *
 * @help
 * タグをつけたイベントの一覧を表示し、選択したイベントを実行します。
 * イベントの選択方法は、イベント名の一覧から選択する方法と直接選択する方法の二種類から選択できます。
 *
 * スクリプトコマンド
 *   hzChoiceEvent list [tag] [varNo] [resetScroll] [maxDist]
 *                                          # [tag]（必須）で指定したタグのついたイベント名の一覧を表示し、
 *                                          # 選択されたイベントを起動します。
 *                                          # [varNo]（必須）には、初期選択するイベントのIDおよび選択されたイベントのIDを
 *                                          # 保管する変数の番号を指定します。（イベント選択がキャンセルされた場合、-1がセットされます）
 *                                          # [resetScroll]（任意）は、イベント起動前にスクロール位置を主人公の位置に戻すか否かを指定します。
 *                                          # true:戻す false:戻さない（指定しなかった場合、true）
 *                                          # [maxDist]（任意）は、主人公から一定範囲のイベントのみを対象とする場合に指定します。
 *                                          # 指定した値分のタイルを半径とする円内のイベントのみをイベント一覧に表示します。
 *
 *   hzChoiceEvent cursor [tag] [varNo] [resetScroll] [maxDist]
 *                                          # [tag]（必須）で指定したタグのついたイベントをカーソルで選択し、
 *                                          # 選択されたイベントを起動します。
 *                                          # パラメータは上記「hzChoiceEvent list」と同様です。
 *
 *   hzResetScroll                          # スクロール位置を主人公の位置に戻します。
 *                                          # hzChoiceEventにて[resetScroll]をfalseに設定した際、
 *                                          # 手動でスクロール位置を主人公の位置に戻すために使用します。
 *
 *  例）
 *   hzChoiceEvent list land 1              # タグ「land」のイベント名一覧を表示し、
 *                                          # 選択されたイベントを起動します。
 *                                          # 選択されたイベントの番号は変数1に保管されます。
 *
 *   hzChoiceEvent cursor chest 1 false 5   # 半径5マス以内のタグ「chest」のイベントをカーソルで選択し、
 *                                          # 選択されたイベントを起動します。
 *                                          # ※ [resetScroll]にfalseを指定しているため起動後はスクロール位置は戻りません。
 *                                          #   起動されたイベント側で「hzResetScroll」を呼び出す必要があります。
 *                                          # 選択されたイベントの番号は変数1に保管されます。
 *
 *   hzResetScroll                          # スクロール位置を主人公の位置に戻します。
 *                                          # 起動されたイベント側で呼び出します。
 *
 * イベントメモ：
 *   <hzChoice:[tag]>                       # イベントに[tag]タグを付けます。
 *   <hzChoice:[tag],[condition]>           # イベントに[tag]タグを付けます。選択条件を満たす場合のみ、
 *                                          # イベントが選択対象となります。
 *
 *【選択条件（[condition]）の設定方法】
 *   選択条件には、スイッチとイベントのセルフスイッチを使用できます。
 *   ・特定のスイッチONを条件とする場合、スイッチの番号[1-9999]を指定します。
 *   ・特定のセルフスイッチONを条件とする場合、スイッチのID[A-D]を指定します。
 *   ・スイッチ・セルフスイッチOFFを条件とする場合、先頭に!(ビックリマーク)をつけます。
 *   例）
 *   　<hzChoice:tag>                        # タグ「tag」を無条件で付与。
 *   　<hzChoice:tag,31>                     # スイッチ31がONの場合、タグ「tag」を付与。
 *   　<hzChoice:tag,B>                      # セルフスイッチBがONの場合、タグ「tag」を付与。
 *   　<hzChoice:tag,!25>                    # スイッチ25がOFFの場合、タグ「tag」を付与。
 *   　<hzChoice:tag,!D>                     # セルフスイッチDがOFFの場合、タグ「tag」を付与。
 *
 * 【注意点】
 * 　「hzChoiceEvent」を実行するイベントでは、「hzChoiceEvent」実行後はそのまま処理を終了させて下さい。
 * 　別のコマンドを実行すると、選択したイベントの起動が正しく行われない場合があります。
 *   「hzChoiceEvent」の実行を繰り返し行いたい場合は、セルフスイッチと自動実行を使用して、
 *   イベント終了後に再度「hzChoiceEvent」のイベントが実行されるように設定して下さい。
 *
 * 【使用素材】
 * ・矢印デザイン様(http://yajidesign.com/)のカーソルアイコン素材を使用しています。
 *
 * 【修正履歴】
 * 　・2017/02/05 ツクールMV v1.3.4に対応
 *   ・2019/10/16 kido 改造
 *
 */


function HzChoiceEvent(){}

(function() {
    function convertEscape(txt) {return Window_Base.prototype.convertEscapeCharacters(txt)};


    var TYPE_LIST = 'list';
    var TYPE_CURSOR = 'cursor';

    var parameters = PluginManager.parameters('HzChoiceEvent');
    var windowPosition = String(parameters['Window Position'] || 'left');
    var windowSort = String(parameters['Window Sort'] || 'id');
    var showRange = parameters['Show Range'] != null ? parameters['Show Range'] : 1;

    var cursorSetting = {};

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toUpperCase() === 'HZCHOICEEVENT') {
			this.setWaitMode("hzChoiceEvent");
            var type           = args[0];
            var tag            = convertEscape(args[1]);
            var resultVarNo    = convertEscape(args[2]);
            var resetScroll    = args[3] == 'false' ? false : true;
            var maxDist        = !!args[4] ? Number(convertEscape(args[4])) : null;
			this._hzChoceEvent = new HzChoiceEvent(tag, resultVarNo, resetScroll, maxDist, type);
        } else if(command.toUpperCase() === 'HZRESETSCROLL') {
            scrollToPlayer();
        } else if(command.toUpperCase() === 'HZCHOICECUSTOM') {
            if(args.length < 2) {
                console.error('コマンドが足りません');
                return;
            }
            var name = args[0];
            var type = args[1];
            if(type != 'color' && type != 'disabled' && type != 'message'){
                console.error('コマンドの1番目はcolor か disabled か messageです');
                return;
            }
            if(type != 'disabled' && args.length < 3){
                console.error('コマンドが足りません');
                return;
            }
            var setting = args.splice(2).join(' ');  //スペースもありにする
            var events = $gameMap.events();
            for(var event of events){
                if(event.event().name == name){
                    if(!event.hzCustomSetting) event.hzCustomSetting = {};
                    event.hzCustomSetting[type] = setting;
                    break;
                }
            }
        } else if(command.toUpperCase() === 'HZCURSORCHANGE') {
            if(args.length < 3) {
                console.error('コマンドが足りません');
                return;
            }
            cursorSetting.picture = ImageManager.loadPicture(args[0]);
            cursorSetting.x = parseInt(args[1]);
            cursorSetting.y = parseInt(args[2]);
        }
    };

    // 待機状態の更新用関数に機能追加
    var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        var waiting = null;
        switch (this._waitMode) {
        case 'hzChoiceEvent':
            // 待機状態の更新
            // ※ waitingには必ずtrueかfalseをセットすること！
            waiting = this._hzChoceEvent.update();
            if(!waiting) {
                // 終了処理
                this._hzChoceEvent.terminate();
                this._hzChoceEvent = null;
            }
            break;
        }
        if (waiting !== null) {
            if(!waiting) {
                this._waitMode = '';
            }
            return waiting;
        }
        return _Game_Interpreter_updateWaitMode.call(this);
    };

    function HzChoiceEvent() {
        this.initialize.apply(this, arguments);
    }

    //-----------------------------------------------------------------------------
    // HzChoiceEvent
    //

    // 初期化処理
    HzChoiceEvent.prototype.initialize = function(tag, resultVarNo, resetScroll, maxDist, type) {
        this._resultVarNo = resultVarNo;
        this._resetScroll = resetScroll;
        this._maxDist = maxDist;
        this._type = type;

        // 選択対象のイベントを取得
        this._choiceEvents = $gameMap.events().filter(function(event) {
            // 特定の変数がON/OFFの場合のみ選択対象に含める
            // 特定のセルフ変数がON/OFFの場合のみ選択対象に含める
            // 一定の距離内のイベントのみ選択対象に含める
            if(maxDist != null) {
                if(Math.sqrt((event.x - $gamePlayer.x) * (event.x - $gamePlayer.x) +
                             (event.y - $gamePlayer.y) * (event.y - $gamePlayer.y)) > maxDist) {
                             return false;
                             };
            }

            var hzChoice = event.event().meta.hzChoice;

            if(hzChoice == null) {
                return false;
            } else if(hzChoice.indexOf(',') < 0) {
                return tag == hzChoice.trim();
            } else {
                var parms = hzChoice.split(',');

                if(parms[1][0] != '$'){
                    var condVariable = parms[1].trim();

                    var not = false;
                    var variable;
                    if(condVariable.startsWith('!')) {
                        not = true;
                        variable = condVariable.substr(1);
                    } else {
                        variable = condVariable;
                    }

                    if(variable == 'A' || variable == 'B' || variable == 'C' || variable == 'D') {
                        // セルフスイッチ
                        var key = [$gameMap.mapId(), event.eventId(), variable];
                        console.log($gameSelfSwitches.value(key));
                        if($gameSelfSwitches.value(key) != !not) return false;
                    } else {
                        // スイッチ
                        if($gameSwitches.value(Number(variable)) != !not) return false;
                    }
                }
                return parms[0].trim() == tag;
            }
            return false;
        });
        
        this._cancelCount = -1;
        this._forceCancel = false;
        if(this._choiceEvents.length == 0) {
            this._forceCancel = true;
            return;
        }

        // 変数の値が1以上の場合、IDが一致するイベントを初期選択
        var preEvent;
        if(this._resultVarNo > 0) {
            var eventId = $gameVariables.value(this._resultVarNo);
            var event = $gameMap.event(eventId);
            var index = this._choiceEvents.indexOf(event);
            if(index >= 0) {
                preEvent = this._choiceEvents[index];
            }
        }
        if(preEvent) {
            this._selectedEvent = preEvent;
        }
        if(type === TYPE_LIST) {
            if(windowSort === 'id') {
                // ソートしない
            } else if(windowSort === 'dist') {
                // 主人公からの距離でソート
                this._choiceEvents.sort(sortByDistancePlayer);
            } else if(windowSort === 'x') {
                // X座標でソート
                this._choiceEvents.sort(function(e1, e2) {
                    if(e1.x < e2.x) return -1;
                    if(e1.x > e2.x) return 1;
                    return e1.y < e2.y ? -1 : 1;
                });
            } else if(windowSort === 'y') {
                // Y座標でソート
                this._choiceEvents.sort(function(e1, e2) {
                    if(e1.y < e2.y) return -1;
                    if(e1.y > e2.y) return 1;
                    return e1.x < e2.x ? -1 : 1;
                });
            }else if(windowSort === 'self'){
                this.sortEventsBySelfOrder();
            }
            if(!this._selectedEvent) this._selectedEvent = this._choiceEvents[0];
        } else if(type === TYPE_CURSOR) {
            // 主人公からの距離でソート
            this._choiceEvents.sort(sortByDistancePlayer);
            // 主人公から最も近いイベントを選択
            if(!this._selectedEvent)this._selectedEvent = this._choiceEvents[0];
        }

        this.startScroll(this._selectedEvent, 10);

        if(type === TYPE_LIST) {
            // 一覧選択の場合、イベント一覧ウインドウを作成
            var window = SceneManager._scene._hzChoiceEventWindow;
            window.setEvents(this._choiceEvents);
            for(var i=0;i<this._choiceEvents.length;i++) {
                if(this._choiceEvents[i].eventId() == this._selectedEvent.eventId()) {
                    window.setSelectedIndex(i);
                    break;
                }
            }
            window.activate();
            window.show();

            window.setHandler('ok', this.processWindowOk.bind(this));
            window.setHandler('cancel', this.processWindowCancel.bind(this));
            // カーソル移動時に表示を更新
            window.setHandler('select', this.processWindowSelect.bind(this));

            var windowH = SceneManager._scene._hzChoiceHelpWindow;
            windowH.show();
            window.setHelpWindow(windowH);
        }
        this._decided = false;
    };

    HzChoiceEvent.prototype.sortEventsBySelfOrder = function(){
        var defaultOrder = 999999
        for(var event of this._choiceEvents){
            var hzChoice = event.event().meta.hzChoice;
            var params = hzChoice.split(',');
            if(params.length <= 1) event.hzChoiceOrder = defaultOrder;
            else if(params[1][0] == '$') event.hzChoiceOrder = parseInt(params[1].slice(1));
            else if(params[2] && params[2][0] == '$') event.hzChoiceOrder = parseInt(params[2].slice(1));
            else event.hzChoiceOrder = defaultOrder;   
        }
        this._choiceEvents.sort((a, b) => {
            return a.hzChoiceOrder - b.hzChoiceOrder;
        });
    };

    // 更新処理（終了時はfalseを返す）
    HzChoiceEvent.prototype.update = function() {
        var self = this;

        if(this._decided || this._forceCancel) {
            return false;
        }

        if(this._cancelCount >= 0) {
            if(this._cancelCount == 0) {
                // 結果変数に0をセット
                $gameVariables.setValue(this._resultVarNo, 0);
                // プレイヤーの位置までスクロール
                scrollToPlayer();
                return false;
            }
            this._cancelCount --;
        }

        // スクロール
        this.updateScroll();

        var ok     = false;
        var cancel = false;
        var left   = false;
        var right  = false;
        var up     = false;
        var down   = false;


        if(this._type === TYPE_CURSOR) {
            // カーソル選択の場合

            // キーボード入力
            if(Input.isTriggered('ok')     ) ok     = true;
            if(Input.isTriggered('cancel') ) cancel = true;
            if(Input.isTriggered ('left')  ) left   = true;
            if(Input.isTriggered ('right') ) right  = true;
            if(Input.isTriggered ('up')    ) up     = true;
            if(Input.isTriggered ('down')  ) down   = true;

            // タッチ入力
            if(TouchInput.isCancelled()) cancel = true;
            if(TouchInput.isTriggered()) {
                var x = $gameMap.canvasToMapX(TouchInput.x);
                var y = $gameMap.canvasToMapY(TouchInput.y);
                var events = $gameMap.eventsXy(x, y);
                var self = this;
                var choiceEvents = events.filter(function(event) {
                    return self._choiceEvents.indexOf(event) >= 0;
                });
                if(choiceEvents.length > 0) {
                    // イベントをタッチした場合、そのイベントを選択してOKボタン押下時処理実施
                    this._selectedEvent = choiceEvents[0];
                    ok = true;
                } else {
                    // イベント以外をタッチした場合、タッチ位置に応じて上下左右に移動
                    var xrate = (TouchInput.x - Graphics.width  / 2) / Graphics.width;
                    var yrate = (TouchInput.y - Graphics.height / 2) / Graphics.height;
                    if(Math.abs(xrate) < Math.abs(yrate)) {
                        if(yrate < 0) up = true;
                        else down = true;
                    } else {
                        if(xrate < 0) left = true;
                        else right = true;
                    }
                }
            }

            // イベント選択
            if(ok) {
                this.processOk();
                return false;
            }

            // キャンセル
            if(cancel) {
                this.processCancel();
                return true;
            }

            // カーソル選択

            if(left) {
                // カーソル左側の最も近いイベントを選択
                var sortedEvents = this._choiceEvents.filter(function(event) {
                    if(event === self._selectedEvent) return false;
                    var dx = event.x - self._selectedEvent.x;
                    var dy = event.y - self._selectedEvent.y;
                    return dx < 0 && Math.abs(dy/3) < Math.abs(dx);
                }).sort(createEventSort(this._selectedEvent, true));
                if(sortedEvents != null && sortedEvents.length > 0) {
                    this._selectedEvent = sortedEvents[0];
                    // イベントの位置にスクロール
                    this.startScroll(this._selectedEvent,10);
                    SoundManager.playCursor();
                } else {
                    SoundManager.playBuzzer();
                }

            } else if(right) {
                // カーソル右側の最も近いイベントを選択
                var sortedEvents = this._choiceEvents.filter(function(event) {
                    if(event === self._selectedEvent) return false;
                    var dx = event.x - self._selectedEvent.x;
                    var dy = event.y - self._selectedEvent.y;
                    return dx > 0 && Math.abs(dy/3) < Math.abs(dx);
                }).sort(createEventSort(this._selectedEvent, true));
                if(sortedEvents != null && sortedEvents.length > 0) {
                    this._selectedEvent = sortedEvents[0];
                    // イベントの位置にスクロール
                    this.startScroll(this._selectedEvent,10);
                    SoundManager.playCursor();
                } else {
                    SoundManager.playBuzzer();
                }
            } else if(up) {
                // カーソル上側の最も近いイベントを選択
                var sortedEvents = this._choiceEvents.filter(function(event) {
                    if(event === self._selectedEvent) return false;
                    var dx = event.x - self._selectedEvent.x;
                    var dy = event.y - self._selectedEvent.y;
                    return dy < 0 && Math.abs(dx/3) < Math.abs(dy);
                }).sort(createEventSort(this._selectedEvent, false));
                if(sortedEvents != null && sortedEvents.length > 0) {
                    this._selectedEvent = sortedEvents[0];
                    // イベントの位置にスクロール
                    this.startScroll(this._selectedEvent,10);
                    SoundManager.playCursor();
                } else {
                    SoundManager.playBuzzer();
                }
            } else if(down) {
                // カーソル下側の最も近いイベントを選択
                var sortedEvents = this._choiceEvents.filter(function(event) {
                    if(event === self._selectedEvent) return false;
                    var dx = event.x - self._selectedEvent.x;
                    var dy = event.y - self._selectedEvent.y;
                    return dy > 0 && Math.abs(dx/3) < Math.abs(dy);
                }).sort(createEventSort(this._selectedEvent, false));
                if(sortedEvents != null && sortedEvents.length > 0) {
                    this._selectedEvent = sortedEvents[0];
                    // イベントの位置にスクロール
                    this.startScroll(this._selectedEvent,10);
                    SoundManager.playCursor();
                } else {
                    SoundManager.playBuzzer();
                }
            }
        }



        // UIのクリア
        var bitmap = SceneManager._scene._spriteset._hzChoiceScreen.bitmap;
        bitmap.clear();
        // フォント設定
        var ctx = SceneManager._scene._spriteset._hzChoiceScreen.bitmap.context;
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";

        // 範囲表示
        if(showRange == 1 && this._maxDist != null) {
            ctx.fillStyle   = "rgba(255,255,255,0.1)";
            ctx.strokeStyle = "rgba(255,255,255,1.0)";
            ctx.beginPath();
            ctx.arc($gamePlayer.screenX(),$gamePlayer.screenY(), (this._maxDist + 0.5) * $gameMap.tileWidth(),0,2*Math.PI);
            ctx.stroke();
            ctx.fill();
        }

        // イベント毎の描画
        this._choiceEvents.forEach(function(ev, idx) {
            var event = ev.event();
            var x = ev.screenX();
            var y = ev.screenY() - 64;

            var w = 90;
            var alpha = 0.5;
            ctx.font = '12px "GameFont"';
            if(ev === self._selectedEvent) {
                alpha = 0.8;
                ctx.font = '16px "GameFont"';
                w = 120;
            }

            // イベント名描画
            if(event.name) {
                // 枠描画
                ctx.fillStyle   = "rgba(255,255,255," + alpha + ")";
                ctx.strokeStyle = "rgba(255,255,255," + alpha + ")";

                roundedRectangle(ctx, x-w/2, y-14, w, 18, 6);
                ctx.fill();

                // イベント名描画
                ctx.fillStyle   = "rgba(0,0,0,1.0)";
                ctx.fillText(event.name, x, y);
            }

            // 矢印描画
            ctx.fillStyle   = "rgba(255,255,255," + alpha + ")";
            drawTriangle(ctx, x, y+12, 12, -8);
            ctx.fill();

            // カーソル描画
            if(ev === self._selectedEvent) {
                ctx.save();
                if(!cursorSetting.picture){
                    ctx.fillStyle   = "rgba(255,255,255,1.0)";
                    ctx.translate(ev.screenX()-12, ev.screenY()-24);
                    drawCursor(ctx);
                }else{
                    if(cursorSetting.picture._image){
                        ctx.drawImage(cursorSetting.picture._image, ev.screenX() + cursorSetting.x - cursorSetting.picture._image.width / 2, 
                          ev.screenY() - cursorSetting.picture._image.height / 2 + cursorSetting.y - 24);
                    }
                }
                ctx.restore();
            }
        }.bind(this));
        return true;
    };

    // 決定時の処理
    HzChoiceEvent.prototype.processOk = function() {
        // イベント起動
        this._selectedEvent.start();
        // 結果変数にイベントIDをセット
        $gameVariables.setValue(this._resultVarNo, this._selectedEvent.eventId());
        // プレイヤーの位置までスクロール
        if(this._resetScroll) {
            scrollToPlayer();
        }
        this._decided = true;
    };

    // イベント一覧ウインドウでの決定時処理
    HzChoiceEvent.prototype.processWindowOk = function() {
        var window = SceneManager._scene._hzChoiceEventWindow;
        window.deactivate();
        window.hide();
        var windowH = SceneManager._scene._hzChoiceHelpWindow;
        windowH.hide();
        this.processOk();
    };

    // キャンセル時の処理
    HzChoiceEvent.prototype.processCancel = function() {
        this._cancelCount = 1;
        SoundManager.playCancel();
    };

    // イベント一覧ウインドウでのキャンセル時処理
    HzChoiceEvent.prototype.processWindowCancel = function() {
        var window = SceneManager._scene._hzChoiceEventWindow;
        window.deactivate();
        window.hide();
        var windowH = SceneManager._scene._hzChoiceHelpWindow;
        windowH.hide();
        this.processCancel();
        this._cancelCount = 0;
    };

    // イベント一覧ウインドウでの行選択時処理
    HzChoiceEvent.prototype.processWindowSelect = function() {
        var window = SceneManager._scene._hzChoiceEventWindow;
        this._selectedEvent = this._choiceEvents[window._index];
        this.startScroll(this._selectedEvent,1);
    };

     // 終了処理
    HzChoiceEvent.prototype.terminate = function() {
        var bitmap = SceneManager._scene._spriteset._hzChoiceScreen.bitmap;
        bitmap.clear();
    };

    // プレイヤーからの距離でソート
    function sortByDistancePlayer(e1, e2) {
        var dist1 =  (e1.x - $gamePlayer.x) * (e1.x - $gamePlayer.x) +
                     (e1.y - $gamePlayer.y) * (e1.y - $gamePlayer.y);
        var dist2 =  (e2.x - $gamePlayer.x) * (e2.x - $gamePlayer.x) +
                     (e2.y - $gamePlayer.y) * (e2.y - $gamePlayer.y);
        if(dist1 < dist2) return -1;
        if(dist1 > dist2) return  1;
        return 0;
    }

    // 特定の対象からの距離でソート
    function createEventSort(origin, horz) {
        return function(e1, e2) {
            var dist1, dist2;
            if(horz) {
                dist1 =  Math.abs(e1.x - origin.x) * 0.5 +
                         Math.abs(e1.y - origin.y);
                dist2 =  Math.abs(e2.x - origin.x) * 0.5 +
                         Math.abs(e2.y - origin.y);
            } else {
                dist1 =  Math.abs(e1.x - origin.x) +
                         Math.abs(e1.y - origin.y) * 0.5;
                dist2 =  Math.abs(e2.x - origin.x) +
                         Math.abs(e2.y - origin.y) * 0.5;
            }
            if(dist1 < dist2) return -1;
            if(dist1 > dist2) return  1;
            return 0;
        };
    }

    // 特定のイベントまでスクロール開始
    HzChoiceEvent.prototype.startScroll = function(event, frame) {
        this._scrollSpeedX = 0;
        this._scrollSpeedY = 0;
        this._scrollCount = 0;

        var dx = event.x - ($gameMap.displayX() + (Graphics.boxWidth  / $gameMap.tileWidth() ) / 2);
        var dy = event.y - ($gameMap.displayY() +(Graphics.boxHeight / $gameMap.tileHeight()) / 2);
        if(dx != 0) {
            this._scrollCount = frame;
            this._scrollSpeedX = dx / this._scrollCount;
        }
        if(dy != 0) {
            this._scrollCount = frame;
            this._scrollSpeedY = dy / this._scrollCount;
        }
    };

    // スクロール更新
    HzChoiceEvent.prototype.updateScroll = function() {
        this._scrollCount --;
        if(this._scrollCount >= 0) {
            if(this._scrollSpeedX > 0) {
                $gameMap.scrollRight(Math.abs(this._scrollSpeedX));
            } else if(this._scrollSpeedX < 0) {
                $gameMap.scrollLeft(Math.abs(this._scrollSpeedX));
            }
            if(this._scrollSpeedY > 0) {
                $gameMap.scrollDown(Math.abs(this._scrollSpeedY));
            } else if(this._scrollSpeedY < 0) {
                $gameMap.scrollUp(Math.abs(this._scrollSpeedY));
            }
        }
    };

    // プレイヤーの位置までスクロール
    function scrollToPlayer() {
        var dx = $gamePlayer.x - ($gameMap.displayX() + (Graphics.boxWidth  / $gameMap.tileWidth() ) / 2);
        var dy = $gamePlayer.y - ($gameMap.displayY() +(Graphics.boxHeight / $gameMap.tileHeight()) / 2);
        if(dx > 0) {
            $gameMap.scrollRight(Math.abs(dx));
        } else if(dx < 0) {
            $gameMap.scrollLeft(Math.abs(dx));
        }
        if(dy > 0) {
            $gameMap.scrollDown(Math.abs(dy));
        } else if(dy < 0) {
            $gameMap.scrollUp(Math.abs(dy));
        }
    };

    //-----------------------------------------------------------------------------
    // Window_EventList
    //
    // イベント選択用ウインドウ

    function Window_EventList() {
        this.initialize.apply(this, arguments);
    }

    Window_EventList.prototype = Object.create(Window_Selectable.prototype);
    Window_EventList.prototype.constructor = Window_EventList;

    // 初期化処理
    Window_EventList.prototype.initialize = function(x, y, width, height) {
        this._listevents = [];
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.deactivate();
        this.hide();
    };

    // イベント一覧の設定
    Window_EventList.prototype.setEvents = function(events) {
        this._listevents = events;
        this.refresh();
    };

    // 選択行の設定
    Window_EventList.prototype.setSelectedIndex = function(index) {
        this._index = index;
        this.refresh();
    };

    // 項目数
    Window_EventList.prototype.maxItems = function() {
        return this._listevents.length;
    };

    Window_EventList.prototype.item = function() {
        return this._listevents ? this._listevents[this.index()] : null;
    };

    Window_EventList.prototype.isCurrentItemEnabled = function() {
        return this.isItemEnabled(this.index());
    };

    Window_EventList.prototype.isItemEnabled = function(index) {
        var event = this._listevents[index];
        if(!event)return false;
        if(!event.hzCustomSetting) return true;
        return event.hzCustomSetting.disabled === undefined;
    };

    // 列数
    Window_EventList.prototype.maxCols = function() {
        return 1;
    };

    // 項目の描画
    Window_EventList.prototype.drawItem = function(index) {
        var event = this._listevents[index];
        var rect = this.itemRect(index);
        if(event.hzCustomSetting && event.hzCustomSetting.color){
            this.changeTextColor(this.textColor(parseInt(event.hzCustomSetting.color)));
        }else{
            this.resetTextColor();
        }
        this.changePaintOpacity(this.isItemEnabled(index));
        this.drawText(event.event().name, rect.x, rect.y, rect.width);
        this.resetTextColor();
    };

    // 行選択
    Window_EventList.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        this.callHandler('select');
    };

    Window_EventList.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.item());
    };
    

    Window_EventList.prototype.setHelpWindowItem = function(event) {
        if (this._helpWindow){
            if(event && event.hzCustomSetting && event.hzCustomSetting.message) {
                var text = event.hzCustomSetting.message.replace(/\\n/g, '\n');
                this._helpWindow.setText(text);
            }else{
                this._helpWindow.clear();
            }
        }
    };


    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //

    // マップのSpriteSetに選択UI表示用のSpriteを追加
    var _Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
    Spriteset_Map.prototype.createUpperLayer = function() {
        _Spriteset_Map_createUpperLayer.call(this);
        this._hzChoiceScreen = new Sprite();
        this._hzChoiceScreen.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
        this.addChild(this._hzChoiceScreen);
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //
    // The scene class of the map screen.

    // イベント選択ウインドウを追加
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        var w = 200;
        var x = windowPosition == 'left' ? 0 : Graphics.boxWidth - w;
        this._hzChoiceEventWindow = new Window_EventList(x, 0, w, Graphics.boxHeight);
        this.addWindow(this._hzChoiceEventWindow);
        this._hzChoiceHelpWindow = new Window_Help(3);
        this._hzChoiceHelpWindow.hide();
        this.addWindow(this._hzChoiceHelpWindow);
    };

    //-----------------------------------------------------------------------------
    // 描画用関数
    //

    // 三角形を描画
    function drawTriangle(ctx, x, y, triangleWidth, triangleHeight){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + triangleWidth / 2, y + triangleHeight);
        ctx.lineTo(x - triangleWidth / 2, y + triangleHeight);
        ctx.closePath();
    }

    // 角丸長方形を描画
    function roundedRectangle(ctx, left, top, width, height, borderRadius) {
        ctx.beginPath();
        ctx.moveTo(left + borderRadius, top);
        ctx.lineTo(left + width - borderRadius, top);
        ctx.quadraticCurveTo(left + width, top, left + width, top + borderRadius);
        ctx.lineTo(left + width, top + height - borderRadius);
        ctx.quadraticCurveTo(left + width, top + height, left + width - borderRadius, top + height);
        ctx.lineTo(left + borderRadius, top + height);
        ctx.quadraticCurveTo(left, top + height, left, top + height - borderRadius);
        ctx.lineTo(left, top + borderRadius);
        ctx.quadraticCurveTo(left, top, left + borderRadius, top);
        ctx.closePath();
    }

    // カーソルを描画
    // ※ 矢印デザイン様(http://yajidesign.com/)のカーソルアイコン素材を使用
    function drawCursor(ctx) {
        // #g3
        ctx.save();
        ctx.transform(0.288098, 0.000000, 0.000000, 0.288098, -29.876393, -7.580578);

        // #path5
        ctx.beginPath();
        ctx.fillStyle = 'rgb(53, 53, 53)';
        ctx.moveTo(105.853000, 29.093000);
        ctx.bezierCurveTo(105.816000, 27.569000, 105.486000, 26.186000, 104.906000, 25.001000);
        ctx.bezierCurveTo(104.040000, 23.215000, 102.623000, 21.935000, 101.090000, 21.162000);
        ctx.bezierCurveTo(99.551000, 20.382000, 97.897000, 20.060000, 96.326000, 20.058000);
        ctx.lineTo(58.264000, 20.058000);
        ctx.bezierCurveTo(59.280000, 19.246000, 60.204000, 18.407000, 61.022000, 17.536000);
        ctx.bezierCurveTo(62.151000, 16.327000, 63.080000, 15.052000, 63.743000, 13.682000);
        ctx.bezierCurveTo(64.405000, 12.317000, 64.793000, 10.844000, 64.793000, 9.328000);
        ctx.bezierCurveTo(64.797000, 7.724000, 64.349000, 6.102000, 63.489000, 4.599000);
        ctx.bezierCurveTo(62.544000, 2.928000, 61.230000, 1.713000, 59.798000, 0.987000);
        ctx.bezierCurveTo(58.363000, 0.258000, 56.857000, 0.000000, 55.468000, 0.000000);
        ctx.bezierCurveTo(54.058000, 0.002000, 52.748000, 0.258000, 51.614000, 0.603000);
        ctx.bezierCurveTo(50.476000, 0.954000, 49.527000, 1.385000, 48.790000, 1.826000);
        ctx.bezierCurveTo(47.695000, 2.482000, 37.691000, 8.474000, 27.753000, 14.295000);
        ctx.bezierCurveTo(22.785000, 17.204000, 17.830000, 20.073000, 14.024000, 22.204000);
        ctx.bezierCurveTo(12.124000, 23.269000, 10.505000, 24.151000, 9.341000, 24.752000);
        ctx.bezierCurveTo(8.759000, 25.052000, 8.287000, 25.282000, 7.980000, 25.418000);
        ctx.bezierCurveTo(7.920000, 25.445000, 7.872000, 25.465000, 7.828000, 25.483000);
        ctx.bezierCurveTo(5.932000, 25.483000, 2.200000, 25.483000, 2.200000, 25.483000);
        ctx.bezierCurveTo(1.621000, 25.483000, 1.054000, 25.717000, 0.645000, 26.128000);
        ctx.bezierCurveTo(0.234000, 26.536000, 0.000000, 27.103000, 0.000000, 27.682000);
        ctx.lineTo(0.000000, 71.446000);
        ctx.bezierCurveTo(0.000000, 72.025000, 0.234000, 72.592000, 0.645000, 73.002000);
        ctx.bezierCurveTo(1.054000, 73.411000, 1.621000, 73.646000, 2.200000, 73.646000);
        ctx.lineTo(9.807000, 73.646000);
        ctx.bezierCurveTo(9.828000, 73.639000, 10.231000, 73.730000, 10.767000, 73.965000);
        ctx.bezierCurveTo(11.732000, 74.373000, 13.157000, 75.154000, 14.809000, 76.081000);
        ctx.bezierCurveTo(17.297000, 77.475000, 20.334000, 79.202000, 23.611000, 80.603000);
        ctx.bezierCurveTo(26.891000, 81.998000, 30.423000, 83.095000, 34.014000, 83.102000);
        ctx.bezierCurveTo(34.014000, 83.102000, 53.148000, 83.102000, 54.760000, 83.102000);
        ctx.bezierCurveTo(56.253000, 83.100000, 57.959000, 83.060000, 59.730000, 82.738000);
        ctx.bezierCurveTo(61.054000, 82.495000, 62.421000, 82.090000, 63.737000, 81.396000);
        ctx.bezierCurveTo(65.713000, 80.367000, 67.528000, 78.638000, 68.731000, 76.145000);
        ctx.bezierCurveTo(69.729000, 74.091000, 70.338000, 71.552000, 70.526000, 68.419000);
        ctx.bezierCurveTo(70.849000, 68.344000, 71.178000, 68.246000, 71.519000, 68.112000);
        ctx.bezierCurveTo(72.739000, 67.631000, 74.069000, 66.707000, 75.065000, 65.209000);
        ctx.bezierCurveTo(76.065000, 63.713000, 76.684000, 61.695000, 76.678000, 59.204000);
        ctx.bezierCurveTo(76.680000, 57.493000, 76.344000, 55.996000, 75.770000, 54.751000);
        ctx.bezierCurveTo(75.644000, 54.476000, 75.505000, 54.220000, 75.359000, 53.972000);
        ctx.bezierCurveTo(75.918000, 53.861000, 76.453000, 53.663000, 76.994000, 53.383000);
        ctx.bezierCurveTo(78.203000, 52.738000, 79.409000, 51.650000, 80.320000, 50.069000);
        ctx.bezierCurveTo(81.228000, 48.492000, 81.812000, 46.437000, 81.810000, 43.957000);
        ctx.bezierCurveTo(81.811000, 42.256000, 81.490000, 40.773000, 80.931000, 39.538000);
        ctx.bezierCurveTo(80.861000, 39.383000, 80.784000, 39.240000, 80.707000, 39.095000);
        ctx.lineTo(96.031000, 39.095000);
        ctx.bezierCurveTo(97.131000, 39.094000, 98.265000, 38.948000, 99.383000, 38.607000);
        ctx.bezierCurveTo(101.051000, 38.101000, 102.705000, 37.135000, 103.927000, 35.570000);
        ctx.bezierCurveTo(105.156000, 34.009000, 105.865000, 31.901000, 105.857000, 29.444000);
        ctx.bezierCurveTo(105.856000, 29.326000, 105.855000, 29.209000, 105.853000, 29.093000);
        ctx.fill();

        // #path7
        ctx.beginPath();
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.moveTo(100.971000, 32.016000);
        ctx.bezierCurveTo(100.531000, 32.969000, 99.885000, 33.578000, 99.023000, 34.029000);
        ctx.bezierCurveTo(98.167000, 34.472000, 97.085000, 34.698000, 96.032000, 34.696000);
        ctx.lineTo(59.817000, 34.696000);
        ctx.bezierCurveTo(58.602000, 34.696000, 57.618000, 35.680000, 57.618000, 36.895000);
        ctx.bezierCurveTo(57.618000, 38.110000, 58.602000, 39.094000, 59.817000, 39.094000);
        ctx.bezierCurveTo(59.817000, 39.094000, 66.435000, 39.094000, 74.036000, 39.094000);
        ctx.bezierCurveTo(74.063000, 39.090000, 74.398000, 39.133000, 74.757000, 39.276000);
        ctx.bezierCurveTo(75.315000, 39.492000, 75.967000, 39.895000, 76.470000, 40.574000);
        ctx.bezierCurveTo(76.969000, 41.258000, 77.403000, 42.244000, 77.411000, 43.957000);
        ctx.bezierCurveTo(77.403000, 46.365000, 76.698000, 47.776000, 75.976000, 48.630000);
        ctx.bezierCurveTo(75.614000, 49.055000, 75.234000, 49.338000, 74.928000, 49.499000);
        ctx.bezierCurveTo(74.778000, 49.578000, 74.647000, 49.628000, 74.560000, 49.653000);
        ctx.lineTo(74.469000, 49.674000);
        ctx.lineTo(74.462000, 49.675000);
        ctx.bezierCurveTo(72.791000, 49.675000, 59.963000, 49.675000, 59.963000, 49.675000);
        ctx.bezierCurveTo(58.749000, 49.675000, 57.764000, 50.659000, 57.764000, 51.874000);
        ctx.bezierCurveTo(57.764000, 53.089000, 58.749000, 54.073000, 59.963000, 54.073000);
        ctx.lineTo(67.988000, 54.073000);
        ctx.bezierCurveTo(68.225000, 54.162000, 68.482000, 54.218000, 68.752000, 54.219000);
        ctx.lineTo(68.752000, 54.220000);
        ctx.bezierCurveTo(68.752000, 54.219000, 68.847000, 54.226000, 68.981000, 54.257000);
        ctx.bezierCurveTo(69.219000, 54.311000, 69.577000, 54.432000, 69.941000, 54.630000);
        ctx.bezierCurveTo(70.493000, 54.931000, 71.059000, 55.387000, 71.494000, 56.076000);
        ctx.bezierCurveTo(71.928000, 56.769000, 72.274000, 57.721000, 72.280000, 59.205000);
        ctx.bezierCurveTo(72.280000, 60.400000, 72.089000, 61.282000, 71.833000, 61.936000);
        ctx.bezierCurveTo(71.444000, 62.915000, 70.919000, 63.429000, 70.400000, 63.766000);
        ctx.bezierCurveTo(70.142000, 63.931000, 69.881000, 64.040000, 69.661000, 64.106000);
        ctx.bezierCurveTo(69.442000, 64.173000, 69.256000, 64.190000, 69.201000, 64.189000);
        ctx.lineTo(55.419000, 64.189000);
        ctx.bezierCurveTo(54.204000, 64.189000, 53.220000, 65.173000, 53.220000, 66.388000);
        ctx.bezierCurveTo(53.220000, 67.602000, 54.204000, 68.587000, 55.419000, 68.587000);
        ctx.bezierCurveTo(55.419000, 68.587000, 61.988000, 68.587000, 66.113000, 68.587000);
        ctx.bezierCurveTo(65.952000, 70.714000, 65.560000, 72.363000, 65.043000, 73.620000);
        ctx.bezierCurveTo(64.526000, 74.876000, 63.899000, 75.753000, 63.201000, 76.420000);
        ctx.bezierCurveTo(62.158000, 77.412000, 60.899000, 77.977000, 59.430000, 78.311000);
        ctx.bezierCurveTo(57.969000, 78.641000, 56.336000, 78.706000, 54.760000, 78.704000);
        ctx.lineTo(34.014000, 78.704000);
        ctx.bezierCurveTo(31.955000, 78.707000, 29.669000, 78.189000, 27.361000, 77.356000);
        ctx.bezierCurveTo(23.894000, 76.111000, 20.408000, 74.179000, 17.452000, 72.520000);
        ctx.bezierCurveTo(15.970000, 71.689000, 14.621000, 70.928000, 13.413000, 70.340000);
        ctx.bezierCurveTo(12.806000, 70.045000, 12.234000, 69.794000, 11.664000, 69.599000);
        ctx.bezierCurveTo(11.090000, 69.409000, 10.525000, 69.253000, 9.824000, 69.246000);
        ctx.lineTo(4.398000, 69.246000);
        ctx.lineTo(4.398000, 29.881000);
        ctx.lineTo(8.136000, 29.881000);
        ctx.bezierCurveTo(8.453000, 29.878000, 8.616000, 29.835000, 8.764000, 29.802000);
        ctx.bezierCurveTo(9.040000, 29.734000, 9.223000, 29.661000, 9.432000, 29.579000);
        ctx.bezierCurveTo(9.827000, 29.417000, 10.268000, 29.208000, 10.811000, 28.937000);
        ctx.bezierCurveTo(12.822000, 27.929000, 16.166000, 26.065000, 20.151000, 23.787000);
        ctx.bezierCurveTo(32.079000, 16.961000, 49.570000, 6.486000, 51.053000, 5.597000);
        ctx.bezierCurveTo(51.421000, 5.374000, 52.108000, 5.050000, 52.900000, 4.810000);
        ctx.bezierCurveTo(53.696000, 4.565000, 54.606000, 4.398000, 55.468000, 4.399000);
        ctx.bezierCurveTo(56.324000, 4.400000, 57.114000, 4.557000, 57.796000, 4.906000);
        ctx.bezierCurveTo(58.477000, 5.261000, 59.095000, 5.791000, 59.665000, 6.779000);
        ctx.bezierCurveTo(60.188000, 7.705000, 60.391000, 8.517000, 60.394000, 9.330000);
        ctx.bezierCurveTo(60.392000, 10.098000, 60.203000, 10.894000, 59.782000, 11.769000);
        ctx.bezierCurveTo(59.155000, 13.077000, 57.976000, 14.528000, 56.298000, 15.978000);
        ctx.bezierCurveTo(54.702000, 17.361000, 52.660000, 18.741000, 50.306000, 20.059000);
        ctx.lineTo(42.517000, 20.059000);
        ctx.bezierCurveTo(41.302000, 20.059000, 40.319000, 21.043000, 40.319000, 22.258000);
        ctx.bezierCurveTo(40.319000, 23.473000, 41.302000, 24.457000, 42.517000, 24.457000);
        ctx.lineTo(96.326000, 24.457000);
        ctx.bezierCurveTo(97.608000, 24.452000, 98.946000, 24.837000, 99.846000, 25.559000);
        ctx.bezierCurveTo(100.303000, 25.921000, 100.673000, 26.358000, 100.954000, 26.932000);
        ctx.bezierCurveTo(101.233000, 27.505000, 101.430000, 28.233000, 101.457000, 29.204000);
        ctx.bezierCurveTo(101.458000, 29.285000, 101.459000, 29.364000, 101.459000, 29.442000);
        ctx.bezierCurveTo(101.457000, 30.550000, 101.259000, 31.375000, 100.971000, 32.016000);
        ctx.fill();
        ctx.restore();
    }

})();
