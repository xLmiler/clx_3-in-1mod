/*---------------------------------------------------------------------------*
 * 20/07/1 しもや
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc エフェクトテンプレート
 * @author shimo8
 * @help
 * ・プラグインコマンド
 *   TEF EffectID
 * 
 * 
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'TEF') {
      var effectid = args[0];
      var seid = 0
      var flash = 0
      var wait = 30
        if(effectid === 'Insert'){
            seid = 'Insert01'//SE
            flash = 'white'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'Heartbeat'){
            seid = 'Heartbeat'//SE
            flash = 'pink'//フラッシュ種類
            wait = 60//ウェイト
        }
        else if(effectid === 'ExtasyNormal'){
            seid = 'Muon'//SE
            flash = 'white'//フラッシュ種類
            wait = 90//ウェイト
        }else if(effectid === 'ExtasyHard'){
            seid = 'Muon'//SE
            flash = 'white'//フラッシュ種類
            wait = 90//ウェイト
        }else if(effectid === 'SemenHard'){//精液激しめ
            seid = 'Semen01'//SE
            flash = 'ivory'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'SemenNormal'){//精液1
            seid = 'Semen01'//SE
            flash = 'ivory'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'SemenMulti'){//複数ぶっかけ
            seid = 'SemenMulti01'//SE
            flash = 'ivory'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === ''){
            seid = 'Heartbeat'//SE
            flash = 'pink'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'TentacleBirth'){//触手出産
            seid = 'Tentacle02'//SE
            flash = 'pink'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'TentaclePrison'){//触手に包まれる}
            seid = 'Tentacle02'//SE
            flash = 'pink'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'Curth'){
            seid = 'Paralysis01'//SE
            flash = 'violet'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'Gokkun'){
            seid = 'Drink01'//SE
            flash = 0//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'Drawout'){
            seid = 'Nuku'//SE
            flash = 0//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'Miasma'){
            seid = 'Wind01'//SE
            flash = 'black'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'Rustle'){
            seid = 'Rustle01'//SE
            flash = 0//フラッシュ種類
            wait = 30//ウェイト
        }else if(effectid === 'Splash'){
            seid = 'Spouts01'//SE
            flash = 0//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'Warp'){
            seid = 'Warp01'//SE
            flash = 'white'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === 'Camera'){
            seid = 'Camera01'//SE
            flash = 'white'//フラッシュ種類
            wait = 30//ウェイト
        }else if(effectid === 'HitSkin'){
            seid = 'HitSkin01'//SE
            flash = 'white'//フラッシュ種類
            wait = 30//ウェイト
        }else if(effectid === 'Spark'){
            seid = 'Paralysis01'//SE
            flash = 'yellow'//フラッシュ種類
            wait = 60//ウェイト
        }else if(effectid === ''){
            seid = 'Heartbeat'//SE
            flash = 'pink'//フラッシュ種類
            wait = 60//ウェイト
        }else{
            seid = 'Muon'
        }


        //SE
      var volume = 90
      var pitch = 100
      var pan = 0
      var index = $se_list.seID.indexOf(seid);
      if(index != -1){
        var file =  $se_list.File[index];
        AudioManager.playSe({
          name: file,
          volume: isNaN(volume) ? 90 : volume,
          pitch: isNaN(pitch) ? 100 : pitch,
          pan: isNaN(pan) ? 0 : pan
        });
      }else{
        console.error(seid + ' は見つかりません');
      }
      //SEここまで

      //フラッシュ
      if(flash != 0){
          var flashlevel = 150
          if(flash === 'white'){$gameScreen.startFlash([255,255,255,flashlevel], 30)}
          else if(flash === 'pink'){$gameScreen.startFlash([255,20,147,flashlevel], 30)}
          else if(flash === 'red'){$gameScreen.startFlash([255,0,0,flashlevel], 30)}
          else if(flash === 'blue'){$gameScreen.startFlash([65,105,255,flashlevel], 30)}
          else if(flash === 'black'){$gameScreen.startFlash([0,0,0,flashlevel], 30)}
          else if(flash === 'green'){$gameScreen.startFlash([0,128,0,flashlevel], 30)}
          else if(flash === 'violet'){$gameScreen.startFlash([148,0,211,flashlevel], 30)}
          else if(flash === 'ivory'){$gameScreen.startFlash([255,255,240,flashlevel], 30)}
          else if(flash === 'yellow'){$gameScreen.startFlash([255,215,0,flashlevel], 30)}
          else{$gameScreen.startFlash([255,255,255,flashlevel], 30)}
      }
      //フラッシュここまで

      //ウェイト
      var WaitTime = wait
        if(Input.isPressed('control')){
            //スキップ中
        }else{
            this.wait(WaitTime)
        }
      //ウェイトここまで
            
    }
  };


})();