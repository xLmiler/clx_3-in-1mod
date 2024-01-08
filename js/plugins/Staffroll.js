/*---------------------------------------------------------------------------*
 * 2020/10/1 しもや
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc スタッフロール
 * @author shimo8
 * @help
 * ・プラグインコマンド
 *   Staffroll [速度]
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'Staffroll') {//スタッフロール
        var speed = Number(args[0]);
        $gameSwitches.setValue(2995,true)

        $gameMessage.add("\n\n\n")

        $gameMessage.add("\\C[4]魔法少女セレスフォニア")

        $gameMessage.add("\n\n\n")
        //-----------------------------------------------------------------------------------------
        //制作

        $gameMessage.add("\\C[6]制作\\C[0]")
        $gameMessage.add("\n\n\n")

        $gameMessage.add("しもや / しもばしら工房")
        $gameMessage.add("（制作 / CG / シナリオ / その他）")
        
        $gameMessage.add("\n\n\n")
        //-----------------------------------------------------------------------------------------
        //協力
        $gameMessage.add("\\C[6]協力\\C[0]")
        $gameMessage.add("\n\n\n")

        $gameMessage.add("kido（スクリプト / プラグイン）")
        $gameMessage.add("玖音（変身衣装デザイン）")
        $gameMessage.add("栗下義孝（タイトルロゴ / 戦闘UI / ウィンドウフレーム）")

        $gameMessage.add("\n\n\n")
        //-----------------------------------------------------------------------------------------
        //テストプレイ
        $gameMessage.add("\\C[6]テストプレイ\\C[0]")
        $gameMessage.add("\n\n\n")

        $gameMessage.add("かぶらや嚆矢（正式版）")
        $gameMessage.add("サンペ（正式版）")
        $gameMessage.add("じーぐ（正式版）")
        $gameMessage.add("枝垂ほげ丸（正式版）")
        $gameMessage.add("朱鷺（動作版、正式版）")
        $gameMessage.add("kido（動作版、正式版）")
        $gameMessage.add("他、コメント等に報告を下さった皆様")

        $gameMessage.add("\n\n\n")

        //-----------------------------------------------------------------------------------------
        $gameMessage.add("\n\n\n")

        $gameMessage.add("\\C[6]ゲーム素材\\C[0]")
        $gameMessage.add("（詳細は付属テキストに記載）")

        $gameMessage.add("\n\n\n")




        //-----------------------------------------------------------------------------------------
        //graphic
        $gameMessage.add("\\C[6]グラフィック\\C[0]")
        $gameMessage.add("\n\n\n")

        $gameMessage.add("@damagedgold")
        $gameMessage.add("Andy Chen")
        $gameMessage.add("asado_MV")
        $gameMessage.add("BB ENTERTAINMENT")
        $gameMessage.add("BIT/O")
        $gameMessage.add("BOUGAINVILLEA")
        $gameMessage.add("Celianna")
        $gameMessage.add("Degica.com. ")
        $gameMessage.add("Dreams Circle")
        $gameMessage.add("Gee-kun-soft")
        $gameMessage.add("jaja")
        $gameMessage.add("Joel Steudler")
        $gameMessage.add("KADOKAWA CORPORATION")
        $gameMessage.add("KADOKAWA CORPORATION.")
        $gameMessage.add("Katakura Hibiki.")
        $gameMessage.add("Kaue Luchetta")
        $gameMessage.add("Kokoro Reflections")
        $gameMessage.add("Lunarea")
        $gameMessage.add("Marimo")
        $gameMessage.add("Michael Rookard")
        $gameMessage.add("Naoya")
        $gameMessage.add("NEO HIMEISM")
        $gameMessage.add("REFMAP")
        $gameMessage.add("Sherman3D ")
        $gameMessage.add("STUDIO TOKIWA")
        $gameMessage.add("Un Almacen")
        $gameMessage.add("Visustella")
        $gameMessage.add("whtdragon")
        $gameMessage.add("YOJI OJIMA")
        $gameMessage.add("いず")
        $gameMessage.add("お豆腐村")
        $gameMessage.add("かまやつ")
        $gameMessage.add("じょにー")
        $gameMessage.add("どらぴか")
        $gameMessage.add("にゃん猫")
        $gameMessage.add("ぱらびょ屋こねこ")
        $gameMessage.add("ぴぽや")
        $gameMessage.add("むらくも")
        $gameMessage.add("ゆきだるま")
        $gameMessage.add("エタナラ")
        $gameMessage.add("クロちゃん13")
        $gameMessage.add("コミュ将")
        $gameMessage.add("サイバーな世界")
        $gameMessage.add("ドット絵世界")
        $gameMessage.add("ペンタスラスト")
        $gameMessage.add("ホノルメイド")
        $gameMessage.add("マゼラン")
        $gameMessage.add("メガネ")
        $gameMessage.add("レティナラティス")
        $gameMessage.add("小人の背景屋")
        $gameMessage.add("斉藤千寿")
        $gameMessage.add("栗下義孝")
        $gameMessage.add("海園")
        $gameMessage.add("株式会社ウェストサイド")
        $gameMessage.add("株式会社キューン・プラント")
        $gameMessage.add("株式会社ラナップ")
        $gameMessage.add("永久力吹雪")
        $gameMessage.add("白黒洋菓子店")
        $gameMessage.add("空想曲線")
        $gameMessage.add("素材屋Rosa")
        $gameMessage.add("紫ジャージ")
        $gameMessage.add("魚圭")

        $gameMessage.add("\n\n\n")
        //-----------------------------------------------------------------------------------------
        //BGM / ME
        $gameMessage.add("\\C[6]BGM / ME\\C[0]")
        $gameMessage.add("\n\n\n")

        $gameMessage.add("ayato sound create")
        $gameMessage.add("Degica.com.")
        $gameMessage.add("Joel Steudler")
        $gameMessage.add("MurrayAtkinson")
        $gameMessage.add("MusMus")
        $gameMessage.add("SOUND AIRYLUVS")
        $gameMessage.add("TK.Projects/Show_G.bd")
        $gameMessage.add("ティービースター")
        $gameMessage.add("びーみゅ")
        $gameMessage.add("ビタースウィートエンタテインメント")
        $gameMessage.add("甘茶の音楽工房")
        $gameMessage.add("趣味工房にんじんわいん")

        $gameMessage.add("\n\n\n")

        //-----------------------------------------------------------------------------------------
        //BGS/SE
        $gameMessage.add("\\C[6]BGS / SE\\C[0]")
        $gameMessage.add("\n\n\n")

        $gameMessage.add("aiGame")
        $gameMessage.add("Bastet tail")
        $gameMessage.add("Bob")
        $gameMessage.add("CN studio")
        $gameMessage.add("Honey Drop")
        $gameMessage.add("Joel Steudler")
        $gameMessage.add("KADOKAWA CORPORATION")
        $gameMessage.add("kokko sounds")
        $gameMessage.add("OtoLogic")
        $gameMessage.add("Universal Sound FX")
        $gameMessage.add("VoiceBloom")
        $gameMessage.add("VoiceSample.com")
        $gameMessage.add("YOJI OJIMA")
        $gameMessage.add("となりのつばさちゃん")
        $gameMessage.add("みじんこ素材（CV誠樹ふぁん）")
        $gameMessage.add("シロクマの嫁")
        $gameMessage.add("ビタースウィートエンタテインメント")
        $gameMessage.add("効果音源 ")
        $gameMessage.add("月に憑かれたピエロ")
        $gameMessage.add("無料効果音で遊ぼう！")
        $gameMessage.add("音人")

        $gameMessage.add("\n\n\n")
        //-----------------------------------------------------------------------------------------
        //Scripts
        $gameMessage.add("\\C[6]プラグイン / スクリプト\\C[0]")
        $gameMessage.add("\n\n\n")

        $gameMessage.add("BB ENTERTAINMENT")
        $gameMessage.add("gentlawk")
        $gameMessage.add("hiz")
        $gameMessage.add("kido")
        $gameMessage.add("MAR_kun")
        $gameMessage.add("Me")
        $gameMessage.add("Neon Black")
        $gameMessage.add("ru_shalm")
        $gameMessage.add("Sanshiro")
        $gameMessage.add("SumRndmDde")
        $gameMessage.add("Suppon")
        $gameMessage.add("Terrax")
        $gameMessage.add("tomoaky")
        $gameMessage.add("Trb")
        $gameMessage.add("Tsukimi")
        $gameMessage.add("yana")
        $gameMessage.add("Yanfly Engine Plugins")
        $gameMessage.add("Yoji Ojima")
        $gameMessage.add("かえるぴょこぴょこ")
        $gameMessage.add("しぐれん")
        $gameMessage.add("まっつＵＰ")
        $gameMessage.add("みこと")
        $gameMessage.add("みひらぎ亭")
        $gameMessage.add("りんねぐりっど")
        $gameMessage.add("セアロソンク")
        $gameMessage.add("ツミオ")
        $gameMessage.add("トリアコンタン")
        $gameMessage.add("フェルミウム湾")
        $gameMessage.add("フトコロ")
        $gameMessage.add("マンカインド")
        $gameMessage.add("ムノクラ")
        $gameMessage.add("名無し蛙")
        $gameMessage.add("坂本昌一郎")
        $gameMessage.add("天神いな")
        $gameMessage.add("奏ねこま")
        $gameMessage.add("木星ペンギン")
        $gameMessage.add("村人A")
        $gameMessage.add("柊菜緒")
        $gameMessage.add("神無月サスケ")
        $gameMessage.add("蔦森くいな")
        $gameMessage.add("道楽")
        $gameMessage.add("饗庭淵")

        $gameMessage.add("\n\n\n")
        //-----------------------------------------------------------------------------------------
        //Font
        $gameMessage.add("\\C[6]Fonts\\C[0]")
        $gameMessage.add("\n\n\n")
        $gameMessage.add("本ソフトでは表示フォントに「Mgen+」(http://jikasei.me/font/mgenplus/) \nを使用しています。")
        $gameMessage.add("Licensed under SIL Open Font License 1.1 (http://scripts.sil.org/OFL)")
        $gameMessage.add("© 2015 自家製フォント工房, © 2014, 2015 Adobe Systems Incorporated,")
        $gameMessage.add("© 2015 M+FONTS PROJECT")

        $gameMessage.add("\n\n\n")
        $gameMessage.add("\n\n\n")
        $gameMessage.add("\n\n\n")

        //-----------------------------------------------------------------------------------------
        //最後

        $gameMessage.add("\\C[4]Thank you for playing.\\C[0]")
        $gameMessage.add("\n\n\n")
        $gameMessage.add("\n\n\n")

        //-----------------------------------------------------------------------------------------
        $gameMessage.setScroll(speed, false)

        $gameSwitches.setValue(2995,false)
      }
    };
})();