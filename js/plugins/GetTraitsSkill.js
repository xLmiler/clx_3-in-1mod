/*---------------------------------------------------------------------------*
 * 2020/02/04 @kido0617
 * https://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 武器・防具の特徴から「スキル追加」のスキルを取得する。
 * @author kido
 * @help
 *  武器ID 1のスキル追加のスキル名を取得する
 *  var skills = getTraitsSkill('weapon', 1);
 *  console.log(skills[0].name);
 * 
 *  防具ID 2のスキル追加のスキル名を取得する
 *  var skills = getTraitsSkill('armor', 2);
 *  console.log(skills[0].name);
 * 
 */

(function(){

  window.getTraitsSkill = function(type, id){
    var data = null;
    if(type == 'weapon') data = $dataWeapons[id];
    else if(type == 'armor') data = $dataArmors[id];

    if(!data){
      console.error(type + 'に' + id + 'はありません');
      return;
    }

    var skills = [];
    for(var i = 0; i < data.traits.length; i++){
      if(data.traits[i].code == 43){
        skills.push($dataSkills[data.traits[i].dataId]);
      }
    }
    return skills;
  };

})();