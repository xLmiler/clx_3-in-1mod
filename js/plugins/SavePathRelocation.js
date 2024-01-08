// SavePathRelocation.js
//######################################################################
// セーブパス再配置プラグイン
// 2017-01-01 Towser(Searothonc)
// 
// このスクリプトをSavePathRelocation.jsの名前で保存し、
// [js/plugins]フォルダに入れて使って下さい。
//----------------------------------------------------------------------
// SavePathRelocation plugin by Towser(Searothonc) 2017-01-01
//
// Save this script and name as 'SavePathRelocation.js',
// and place file at [js/plugins] folder to use.
//######################################################################
/*:
    @plugindesc SavePathRelocation plugin
    @author     Towser(Searothonc)

    @param      BaseAt
    @desc       Base location for save. (exe:Game.exe's location / www:index.html's location)
    @default    exe

    @param      RelatedName
    @desc       Name of save folder. Related path for the location where specified in BaseAt.
    @default    save

    @help
    No plugin command provided.
    This plugin is permitted to use or to distribute under MIT license.

    This plugin explicitly specifies the location of the save folder.
*/
/*:ja
    @plugindesc セーブパス再配置プラグイン
    @author     Towser(Searothonc)
    
    @param      BaseAt
    @desc       セーブフォルダを作る位置 (exe:Game.exeと同じ場所 / www:index.htmlと同じ場所)
    @default    exe
    
    @param      RelatedName
    @desc       セーブフォルダの名前(BaseAtで指定したパスからの相対パス)
    @default    save
    
    @help
    このプラグインには、プラグインコマンドはありません。
    このプラグインの使用または再配布はMITライセンスに基づき許諾されます。
    
    Windows用にゲームをデプロイした際セーブフォルダの位置を指定する
    プラグインです。BaseAtで選択したフォルダを基準にRelatedNameで指定した
    相対パスにセーブファイルが作成されるようになります。
    
    ただし、ツクールからの[テストプレイ]起動ではexeを選んでもwwwが指定された
    ものとして扱われます。また、デプロイされたGame.exeにおいて、
    package.nwからアセットを読み込んだ場合は、wwwを選んでもexeが指定された
    ものとして扱われます。
*/
(function() {
	var _StorageManager_localFileDirectoryPath = StorageManager.localFileDirectoryPath
	StorageManager.localFileDirectoryPath = function() {
		var path = require('path');
		var params = PluginManager.parameters('SavePathRelocation');

		var modulepath	= path.join( process.mainModule.filename, '..' );
		var moduledir	= path.dirname( modulepath );
		var execpath	= path.join( process.execPath, '..' );
		var cwdpath		= process.cwd();
		var savedir

		// 実行環境判定
		if ( execpath!==cwdpath ) {
			// package.nw から起動(=アセットがテンポラリディレクトリ)
			savedir = execpath;			// 常にGame.exeと同じ場所
		} else if (execpath!==moduledir) {
			// 未デプロイ=ツクールの[テストプレイ]コマンドによる起動
			savedir = modulepath;		// 常に[www/]の下
		} else {
			// デプロイしたフォルダからGame.exeで起動(Nw.js更新した場合も含む)
			if ( params['BaseAt']==='exe' ) {
				savedir = execpath;		// Game.exeと同じ場所
			} else {
				savedir = modulepath;	// [www/]の下
			}
		}

		// セーブするディレクトリの名前
		return path.join(savedir, params['RelatedName'].replace(/\/+$/, '')+'/');
	}
})();