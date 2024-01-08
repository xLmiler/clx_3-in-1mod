/*
 * @plugindesc パラメータ加算処理
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   ParaAdd name num
 */



(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'ParaAdd') {
      var ParameterID = args[0];//変動させるパラメータの名前      
      if (args[1].match(/\\v/)) {
        //args[1]に\vを含む場合の処理
        array = args[1].match(/[0-9]+\.?[0-9]*/g);
        for(var i = 0; i < array.length; i++) {
        args[1] = Number(array);
        var ParameterNum = $gameVariables.value(args[1]);//変動させる値
          }
        }else{var ParameterNum = Number(args[1]);//変動させる値
          }
      var ParameterVariable = 0;//値を加算する対象の変数番号
      if(ParameterID === "Estrus" || ParameterID === "発情値"){ParameterVariable = 2027};
      if(ParameterID === "Will" || ParameterID === "戦意"){ParameterVariable = 2029};
      if(ParameterID === "Extasy" || ParameterID === "快感値"){ParameterVariable = 2026};
      if(ParameterID === "Domination" || ParameterID === "支配度"){ParameterVariable = 2212};
      if(ParameterID === "Soul" || ParameterID === "魂"){ParameterVariable = 2217};
      if(ParameterID === "SchoolEva" || ParameterID === "学園評価"){ParameterVariable = 2023};
      if(ParameterID === "CivEva" || ParameterID === "市民評価"){ParameterVariable = 2024};
      if(ParameterID === "LustEXP" || ParameterID === "淫欲経験"){ParameterVariable = 2140};
      if(ParameterID === "MiasmaEXP" || ParameterID === "瘴気経験"){ParameterVariable = 2139};
      if(ParameterID === "MouthEXP" || ParameterID === "口経験"){ParameterVariable = 2122};
      if(ParameterID === "NippleEXP" || ParameterID === "乳首経験"){ParameterVariable = 2123};
      if(ParameterID === "ClitEXP" || ParameterID === "陰核経験"){ParameterVariable = 2124};
      if(ParameterID === "AnusEXP" || ParameterID === "肛穴経験"){ParameterVariable = 2125};
      if(ParameterID === "VaginaEXP" || ParameterID === "膣経験"){ParameterVariable = 2126};
      if(ParameterID === "FlashEXP" || ParameterID === "露出経験"){ParameterVariable = 2149};
      if(ParameterID === "PornoEXP" || ParameterID === "ポルノ経験"){ParameterVariable = 2150};
      if(ParameterID === "SemenDrunkEXP" || ParameterID === "飲精経験"){ParameterVariable = 2055};
      if(ParameterID === "SemenDashEXP" || ParameterID === "浴精経験"){ParameterVariable = 2054};
      if(ParameterID === "Lust" || ParameterID === "淫欲"){ParameterVariable = 2021};
      if(ParameterID === "Erosion" || ParameterID === "侵蝕度"){ParameterVariable = 2022};
      if(ParameterID === "TouchEXP" || ParameterID === "愛撫経験"){ParameterVariable = 2041};
      if(ParameterID === "KissEXP" || ParameterID === "キス経験"){ParameterVariable = 2042};
      if(ParameterID === "MusterbationEXP" || ParameterID === "自慰経験"){ParameterVariable = 2043};
      if(ParameterID === "SexEXP" || ParameterID === "セックス経験"){ParameterVariable = 2045};
      if(ParameterID === "AnalSexEXP" || ParameterID === "アナルセックス経験"){ParameterVariable = 2046};
      if(ParameterID === "DemonSexEXP" || ParameterID === "人外セックス経験"){ParameterVariable = 2047};
      if(ParameterID === "DemonAnalSexEXP" || ParameterID === "人外アナルセックス経験"){ParameterVariable = 2048};
      if(ParameterID === "ServiceEXP" || ParameterID === "奉仕経験"){ParameterVariable = 2051};
      if(ParameterID === "SPServiceEXP" || ParameterID === "特殊奉仕経験"){ParameterVariable = 2052};
      if(ParameterID === "CreampieEXP" || ParameterID === "膣射経験"){ParameterVariable = 2053};
      if(ParameterID === "AnalCreampieEXP" || ParameterID === "肛射経験"){ParameterVariable = 2056};
      if(ParameterID === "ExtasyEXP" || ParameterID === "絶頂経験"){ParameterVariable = 2057};
      if(ParameterID === "HardExtasyEXP" || ParameterID === "強絶頂経験"){ParameterVariable = 2058};
      if(ParameterID === "SyncopeEXP" || ParameterID === "絶頂失神経験"){ParameterVariable = 2059};
      if(ParameterID === "SPExtasyEXP" || ParameterID === "特殊絶頂経験"){ParameterVariable = 2060};
      if(ParameterID === "RapeEXP" || ParameterID === "凌辱経験"){ParameterVariable = 2061};
      if(ParameterID === "ShameEXP" || ParameterID === "羞恥経験"){ParameterVariable = 2062};
      if(ParameterID === "MolesterEXP" || ParameterID === "痴漢経験"){ParameterVariable = 2063};
      if(ParameterID === "PhotoEXP" || ParameterID === "撮影経験"){ParameterVariable = 2064};
      if(ParameterID === "GroupEXP" || ParameterID === "輪姦経験"){ParameterVariable = 2065};
      if(ParameterID === "ToiletEXP" || ParameterID === "便器経験"){ParameterVariable = 2066};
      if(ParameterID === "HypnosisEXP" || ParameterID === "催眠経験"){ParameterVariable = 2067};
      if(ParameterID === "ProstitutionEXP" || ParameterID === "売春経験"){ParameterVariable = 2069};
      if(ParameterID === "DefeatEXP" || ParameterID === "敗北凌辱経験"){ParameterVariable = 2070};
      if(ParameterID === "ImprisonEXP" || ParameterID === "監禁経験"){ParameterVariable = 2071};
      if(ParameterID === "PregnancyEXP" || ParameterID === "妊娠経験"){ParameterVariable = 2072};
      if(ParameterID === "ParasiteEXP" || ParameterID === "寄生経験"){ParameterVariable = 2073};
      if(ParameterID === "未定" || ParameterID === "mitei"){ParameterVariable = 2074};
      if(ParameterID === "CurseEXP" || ParameterID === "呪刻経験"){ParameterVariable = 2075};
      if(ParameterID === "MasoEXP" || ParameterID === "被虐経験"){ParameterVariable = 2076};
      if(ParameterID === "RDefeatEXP" || ParameterID === "レネゲード敗北"){ParameterVariable = 2077};
      if(ParameterID === "PublicRapeEXP" || ParameterID === "公開凌辱経験"){ParameterVariable = 2078};
      if(ParameterID === "ExtasyTimes" || ParameterID === "連続絶頂記録"){ParameterVariable = 2080};
      if(ParameterID === "SwimEXP" || ParameterID === "水泳経験"){ParameterVariable = 2141};
      if(ParameterID === "MassageEXP" || ParameterID === "マッサージ経験"){ParameterVariable = 2142};
      if(ParameterID === "ExerciseEXP" || ParameterID === "運動経験"){ParameterVariable = 2143};
      if(ParameterID === "ClassroomEXP" || ParameterID === "授業経験"){ParameterVariable = 2144};
      if(ParameterID === "BookEXP" || ParameterID === "読書経験"){ParameterVariable = 2145};
      if(ParameterID === "SexualEXP" || ParameterID === "セクハラ経験"){ParameterVariable = 2152};
      if(ParameterID === "DemonEXP" || ParameterID === "怪魔経験"){ParameterVariable = 2155};
      if(ParameterID === "TentacleEXP" || ParameterID === "触手経験"){ParameterVariable = 2156};
      if(ParameterID === "AnalExtasyEXP" || ParameterID === "肛門絶頂経験"){ParameterVariable = 2160};
      if(ParameterVariable === 0){ParameterNum = 0
        console.error('パラメータ名が不正');}//0の時はエラー
      if(ParameterNum != 0){
        $gameVariables._data[ParameterVariable] += Number(ParameterNum);
        ParameterNum = 0
      };//実際に加算する処理
    }
  };
})();