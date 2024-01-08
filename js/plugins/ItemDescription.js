//=============================================================================
// ItemDescription.js
// ----------------------------------------------------------------------------
// Version
// 0.8.0 2019/10/13 試験公開（完全版は出るかもしれないし出ないかもしれない）
/*:
 * @plugindesc アイテム説明文自動生成プラグイン
 * @author 饗庭淵
 *
 * @param validWeapon
 * @text 武器
 * @desc 武器に対して説明文の自動生成を有効にします
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * 
 * @param validArmor
 * @text 防具
 * @desc 防具に対して説明文の自動生成を有効にします
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * 
 * @param exceptionWeaponList
 * @text 例外武器リスト
 * @desc プラグインの対象にしたくない武器のリストです（IDを入力）
 * @type string[]
 * @default []
 * 
 * @param exceptionArmorList
 * @text 例外防具リスト
 * @desc プラグインの対象にしたくない防具のリストです（IDを入力）
 * @type string[]
 * @default []
 *
 * @param exceptionElementList
 * @text 例外付与属性リスト
 * @desc 説明文に追加したくない属性のリストです（IDを入力）
 * （すべての武器に付与される「物理」属性など）
 * @type string[]
 * @default []
 * 
 * @param 用語設定
 * @default ====================================
 * 
 * @param enchant
 * @text 付与
 * @desc 属性や状態異常を付与するリストを並べる際の頭につける表示です
 * @default 付
 * @parent 用語設定
 * 
 * @param resist
 * @text 耐性
 * @desc 属性や状態異常の耐性リストを並べる際の頭につける表示です
 * @default 耐
 * @parent 用語設定
 * 
 * @param weak
 * @text 弱点
 * @desc 属性や状態異常の弱点リストを並べる際の頭につける表示です
 * @default 弱
 * @parent 用語設定
 * 
 * @param hit
 * @text 命中率
 * @desc 命中率の表示名です（空白にした場合は表示しません）
 * @default 命中
 * @parent 用語設定
 * 
 * @param eva
 * @text 回避率
 * @desc 回避率の表示名です（空白にした場合は表示しません）
 * @default 回避
 * @parent 用語設定
 * 
 * @param cri
 * @text 会心率
 * @desc 会心率の表示名です（空白にした場合は表示しません）
 * @default 会心
 * @parent 用語設定
 * 
 * @param cev
 * @text 会心回避率
 * @desc 会心回避率の表示名です（空白にした場合は表示しません）
 * @default 会心回避
 * @parent 用語設定
 * 
 * @param mev
 * @text 魔法回避率
 * @desc 魔法回避率の表示名です（空白にした場合は表示しません）
 * @default 魔法回避
 * @parent 用語設定
 * 
 * @param mrf
 * @text 魔法反射率
 * @desc 魔法反射率の表示名です（空白にした場合は表示しません）
 * @default 魔法反射
 * @parent 用語設定
 * 
 * @param cnt
 * @text 反撃率
 * @desc 反撃率の表示名です（空白にした場合は表示しません）
 * @default 反撃
 * @parent 用語設定
 * 
 * @param hrg
 * @text HP再生率
 * @desc HP再生率の表示名です（空白にした場合は表示しません）
 * @default HP再生
 * @parent 用語設定
 * 
 * @param mrg
 * @text MP再生率
 * @desc MP再生率の表示名です（空白にした場合は表示しません）
 * @default MP再生
 * @parent 用語設定
 * 
 * @param trg
 * @text TP再生率
 * @desc TP再生率の表示名です（空白にした場合は表示しません）
 * @default TP再生
 * @parent 用語設定
 * 
 * @help 
 * --------------------------------
 * ●概要
 * --------------------------------
 * アイテム（武器と防具）の説明文をパラメーター設定から自動生成します。
 * 生成された内容は説明文の二行目以降に追加されます。
 * 
 * 手動で説明文を打ちこんでいると「説明文と実際の効果が違うやん！」という
 * ミスが起こりがちです。
 * つまりその手のミスを防ぐものです。いちいち手打ちする手間も省けます。
 * 
 * 【例】
 * （「炎の剣」の場合）
 * 狭い室内で振り回すな　すべての剣にいえることだが
 * <剣>[攻撃+20] 付[炎][火傷]
 * 
 * （「とても重い鎧」の場合）
 * めちゃくちゃ重いが、そのぶんに防御力は高い
 * <重装防具>[防御+30][敏捷-10][回避-20%]
 * 
 * 二行目は自動生成されたもので、一行目は従来通りツクール上で入力されたものです。
 * 
 * --------------------------------
 * ●メモ欄
 * --------------------------------
 * また、パラメータ設定の枠に収まらない特殊な説明が必要な場合は
 * メモ欄にメタタグ<option>を追記してください。
 *
 * 【例】
 * （<option:備考[たまに喋る]>と入力）
 * 狭い室内で振り回すな　すべての剣にいえることだが
 * <剣>[攻撃+20] 付[炎][火傷] 備考[たまに喋る]
 * 
 * --------------------------------
 * ●注意点
 * --------------------------------
 * 本プラグインは機械的に説明文を追加するものであるため
 * 効果が多く設定されていると説明欄からはみ出す場合があります。
 * そういった場合は「例外リスト」に登録し、そのアイテムだけ手動で入力する
 * というような使い方になると思います。
 * 
 * また、説明文を二行書いていると自動生成された説明文は三行目に追加されることに
 * なるため、本プラグインを適用しただけでははみ出ることになります。
 * 
 * 現在は試験的に「武器」と「防具」だけですが、
 * 原理的には「アイテム」「スキル」でも同じことができます。
 * スクリプトがわかる人はコピペして改変した方が使いやすいかもしれません。
 * 
 * また、「特殊」設定での「追加能力値」までは対応していますが、
 * 「特殊能力値」までは現在対応していません。
 * 
 * --------------------------------
 * ●スクリプトがわかる人向け
 * --------------------------------
 * ヘルプウインドウ以外でも使いたい場合は
 * Window_Base に descriotion(item) や drawItemDescriotion(item, x, y)
 * という関数が定義されていますので、こちらをご利用ください。
 * 
 * --------------------------------
 * ●利用規約
 * --------------------------------
 * 特に制限はありません。
 * ご自由にどうぞ。
 */

 (function() {
    var pluginName = "ItemDescription";
    
    //パラメータを受け取る
    var parameters = PluginManager.parameters(pluginName);

    var validWeapon = Boolean(parameters['validWeapon']);
    var validArmor = Boolean(parameters['validWeapon']);
    var exceptionWeaponList = JSON.parse(parameters['exceptionWeaponList']).map(function(id) {
        return Number(id);
    });
    var exceptionArmorList = JSON.parse(parameters['exceptionArmorList']).map(function(id) {
        return Number(id);
    });
    var exceptionElementList = JSON.parse(parameters['exceptionElementList']).map(function(id) {
        return Number(id);
    });

    var enchant = String(parameters['enchant']);
    var resist = String(parameters['resist']);
    var weak = String(parameters['weak']);

    var xparams = [];
    xparams.push(String(parameters['hit']));
    xparams.push(String(parameters['eva']));
    xparams.push(String(parameters['cri']));
    xparams.push(String(parameters['cev']));
    xparams.push(String(parameters['mev']));
    xparams.push(String(parameters['mrf']));
    xparams.push(String(parameters['cnt']));
    xparams.push(String(parameters['hrg']));
    xparams.push(String(parameters['mrg']));
    xparams.push(String(parameters['trg']));


    TextManager.xparam = function(paramId) {
        return xparams[paramId] || '';
    };

    Window_Help.prototype.setItem = function(item) {
        this.setText(item ? this.descriotion(item) : '');
    };

    Window_Base.prototype.drawItemDescriotion = function(item, x, y) {
        var text = this.descriotion(item);
        this.drawTextEx(text, x, y);
    };

    Window_Base.prototype.descriotion = function(item) {
        var text = item ? item.description : '';
        //if(DataManager.isItem(item)) text = this.itemDescriotion(item);
        if(DataManager.isWeapon(item) && validWeapon && !exceptionWeaponList.includes(item.id)) text = this.weaponDescriotion(item);
        if(DataManager.isArmor(item) && validArmor && !exceptionArmorList.includes(item.id)) text = this.ArmorDescriotion(item);
        return text;
    };

    Window_Base.prototype.itemDescriotion = function(item) {
        var description = JSON.parse(JSON.stringify(item.description)) + '\n';

        return description;
    };
    
    Window_Base.prototype.weaponDescriotion = function(item) {
        var description = JSON.parse(JSON.stringify(item.description)) + '\n';
        // 種類
        var wtypeId = item.wtypeId;
        description += '<' + $dataSystem.weaponTypes[wtypeId] + '>';
    
        // パラメーター情報
        var params = item.params;
        var traits = item.traits;
        description += paramList(params) + xparamList(traits);
    
        // 属性と状態異常の付与
        description += enchantList(traits);

        // 属性と状態異常の耐性
        description += resistList(traits) + weakList(traits);

        // 備考
        description += itemOption(item);
        return description;
    };
    
    Window_Base.prototype.ArmorDescriotion = function(item) {
        var description = JSON.parse(JSON.stringify(item.description)) + '\n';
        // 種類
        var atypeId = item.atypeId;
        description += '<' + $dataSystem.armorTypes[atypeId] + '>';
    
        /*
        // 部位
        var etypeId = item.etypeId;
        description += '<' + $dataSystem.equipTypes[etypeId] + '>';
        */
    
        // パラメーター情報
        var params = item.params;
        var traits = item.traits;
        description += paramList(params) + xparamList(traits);

        // 属性と状態異常
        description += resistList(traits) + weakList(traits);

        // 備考
        description += itemOption(item);
        return description;
    };

    function paramList(params) {
        var description = '';
        for(var i = 0; i < params.length; i++){
            if(params[i] != 0){
                var sign = params[i] > 0 ? '+' : '';
                description += '[' + TextManager.param(i) + sign + params[i] + ']'
            }
        }
        return description;
    };

    function xparamList(traits) {
        var description = '';
        for(var i = 0; i < traits.length; i++){
            if(traits[i].code == 22 && traits[i].value != 0){
                var param = Math.floor(traits[i].value * 100);
                var sign = param > 0 ? '+' : '';
                description += '[' + TextManager.xparam(traits[i].dataId) + sign + param + '%]'
            }
        }
        return description;
    };

    function enchantList(traits) {
        var description = '';
        var fore = ' ' + enchant;
        // 属性
        var elemets = $dataSystem.elements;
        for(var i = 0; i < traits.length; i++){
            if(traits[i].code == 31 && !exceptionElementList.includes(traits[i].dataId)){
                description += fore + '[' + elemets[traits[i].dataId] + ']'
                fore = '';
            }
        }

        // 状態異常
        var states = $dataStates.map(function(state) {
            return state && state.name;
        });

        for(var i = 0; i < traits.length; i++){
            if(traits[i].code == 32){
                description += fore + '[' + states[traits[i].dataId] + ']'
                fore = '';
            }
        }
        return description;
    };

    function resistList(traits) {
        var description = '';
        // 属性
        var elemets = $dataSystem.elements;
        var fore = ' ' + resist;
        for(var i = 0; i < traits.length; i++){
            if(traits[i].code == 11 && traits[i].value < 1){
                description += fore + '[' + elemets[traits[i].dataId] + ']'
                fore = '';
            }
        }

        // 状態異常
        var states = $dataStates.map(function(state) {
            return state && state.name;
        });

        for(var i = 0; i < traits.length; i++){
            if(traits[i].code == 13 && traits[i].value < 1){
                description += fore + '[' + states[traits[i].dataId] + ']'
                fore = '';
            }
        }
        return description;
    };

    function weakList(traits) {
        var description = '';
        // 属性
        var elemets = $dataSystem.elements;
        var fore = ' ' + weak;;
        for(var i = 0; i < traits.length; i++){
            if(traits[i].code == 11 && traits[i].value > 1){
                description += fore + '[' + elemets[traits[i].dataId] + ']'
                fore = '';
            }
        }

        // 状態異常
        var states = $dataStates.map(function(state) {
            return state && state.name;
        });

        for(var i = 0; i < traits.length; i++){
            if(traits[i].code == 13 && traits[i].value > 1){
                description += fore + '[' + states[traits[i].dataId] + ']'
                fore = '';
            }
        }
        return description;
    };

    function itemOption(item) {
        var description = '';
        if(item.meta.option) description += ' ' + item.meta.option;
        return description;
    };
})();