/*:
 * @plugindesc アイテムの合計数を取得するプラグインです。
 * @author MAR_kun
 * @help 所持しているアイテムの合計数を取得します。
 * 所持しているアイテムの種類数ではなく、所持している各アイテムの個数の合計です。
 * イベントの「変数の操作」や「条件分岐」などの「スクリプト」でご使用ください。
 * プラグインコマンドはありません。
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 使用方法
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 例１：所持しているアイテム（通常アイテム、大事なもの）の合計数が取得したい。
 * $gameItemCount.Items();
 *
 * 例２：所持している大事なものの合計数が取得したい。
 * $gameItemCount.Key();
 *
 * 例３：装備している特定の武器の合計数が取得したい。（武器IDが15の場合）
 * $gameItemCount.EquipedWeaponFromId(15);
 *
 * 例４：所持・装備している特定の装備タイプの合計数が取得したい。
 *     （装備タイプIDが3の場合）
 * $gameItemCount.AllEquipFromEquipTypeId(3)
 *
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 説明
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ・アイテム関連
 * $gameItemCount.AllItems()
 *    通常アイテム、大事なもの、隠しアイテムA・Bの合計を取得します。
 *
 * $gameItemCount.Items()
 *    通常アイテム、大事なものの合計を取得します。
 *
 * $gameItemCount.Normal()
 *    通常アイテムの合計を取得します。
 *
 * $gameItemCount.Key()
 *    大事なものの合計を取得します。
 *
 * $gameItemCount.HiddenA()
 *    隠しアイテムAの合計を取得します。
 *
 * $gameItemCount.HiddenB()
 *    隠しアイテムBの合計を取得します。
 *
 * $gameItemCount.AllHidden()
 *    隠しアイテムA・Bの合計を取得します。
 *
 *
 * ・装備関連
 * $gameItemCount.Equipment()
 *    『所持中』の武器・防具の合計を取得します。
 *
 * $gameItemCount.AllEquipment()
 *    『所持中』の武器・防具、『装備中』の武器・防具の合計を取得します。
 *
 * $gameItemCount.Weapon()
 *    『所持中』の武器の合計を取得します。
 *
 * $gameItemCount.EquipedWeapon()
 *    『装備中』の武器の合計を取得します。
 *
 * $gameItemCount.AllWeapon()
 *    『所持中』、『装備中』の武器の合計を取得します。
 *
 * $gameItemCount.Armor()
 *    『所持中』の防具の合計を取得します。
 *
 * $gameItemCount.EquipedArmor()
 *    『装備中』の防具の合計を取得します。
 *
 * $gameItemCount.AllArmor()
 *    『所持中』、『装備中』の防具の合計を取得します。
 *
 * $gameItemCount.AllEquiped()
 *    『装備中』の武器・防具の合計を取得します。
 *
 *
 * ・ID指定
 * $gameItemCount.ItemFromId(アイテムID) 
 *    IDで指定したアイテムの合計を取得します。
 *   （通常アイテム、大事なもの、隠しアイテムA・B）
 *
 * $gameItemCount.WeaponFromId(武器ID) 
 *    IDで指定した『所持中』の武器の合計を取得します。
 *
 * $gameItemCount.EquipedWeaponFromId(武器ID) 
 *    IDで指定した『装備中』の武器の合計を取得します。
 *
 * $gameItemCount.AllWeaponFromId(武器ID) 
 *    IDで指定した『所持中』、『装備中』の武器の合計を取得します。
 *
 * $gameItemCount.ArmorFromId(防具ID) 
 *    IDで指定した『所持中』の防具の合計を取得します。
 *
 * $gameItemCount.EquipedArmorFromId(防具ID) 
 *    IDで指定した『装備中』の防具の合計を取得します。
 *
 * $gameItemCount.AllArmorFromId(防具ID) 
 *    IDで指定した『所持中』、『装備中』の防具の合計を取得します。
 *
 * 
 * ・武器タイプ指定
 * $gameItemCount.WeaponFromWeaponTypeId(武器タイプID) 
 *    タイプIDで指定した『所持中』の武器タイプの合計を取得します。
 *
 * $gameItemCount.EquipedWeaponFromWeaponTypeId(武器タイプID) 
 *    タイプIDで指定した『装備中』の武器タイプの合計を取得します。
 *
 * $gameItemCount.AllWeaponFromWeaponTypeId(武器タイプID)
 *    タイプIDで指定した『所持中』、『装備中』の武器タイプの合計を取得します。
 *
 * 
 * ・防具タイプ指定
 * $gameItemCount.ArmorFromArmorTypeId(防具タイプID) 
 *    タイプIDで指定した『所持中』の防具タイプの合計を取得します。
 *
 * $gameItemCount.EquipedArmorFromArmorTypeId(防具タイプID)
 *    タイプIDで指定した『装備中』の防具タイプの合計を取得します。
 *
 * $gameItemCount.AllArmorFromArmorTypeId(防具タイプID) 
 *    タイプIDで指定した『所持中』、『装備中』の防具タイプの合計を取得します。
 *
 * 
 * ・装備タイプ指定
 * $gameItemCount.EquipmentFromEquipTypeId(装備タイプID)
 *    タイプIDで指定した『所持中』の装備タイプの合計を取得します。
 *
 * $gameItemCount.EquipedFromEquipTypeId(装備タイプID)
 *    タイプIDで指定した『装備中』の装備タイプの合計を取得します。
 *
 * $gameItemCount.AllEquipFromEquipTypeId(装備タイプID)
 *    タイプIDで指定した『所持中』、『装備中』の装備タイプの合計を取得します。
 *
 *
 * ・全アクター検索（※）
 * $gameItemCount.AllActor_AllEquipment()
 *    ゲームに登場する全アクターが『装備中』の武器・防具、『所持中』の武器・防具の合計を取得します。
 *
 * $gameItemCount.AllActor_EquipedWeapon()
 *    ゲームに登場する全アクターが『装備中』の武器の合計を取得します。
 *
 * $gameItemCount.AllActor_AllWeapon()
 *    ゲームに登場する全アクターが『装備中』の武器、『所持中』の武器の合計を取得します。
 *
 * $gameItemCount.AllActor_EquipedArmor()
 *    ゲームに登場する全アクターが『装備中』の防具の合計を取得します。
 *
 * $gameItemCount.AllActor_AllArmor()
 *    ゲームに登場する全アクターが『装備中』の防具、『所持中』の防具の合計を取得します。
 *
 *   ※全アクター検索はデータベースの「アクター」に登録されているすべてのアクターを検索します。
 *     ストーリー上登場していないアクターの初期装備も含めて検索されてしまいますので、考慮してお使いください。
 */



function Game_ItemCount() {
    this.initialize.apply(this, arguments);
}
Game_ItemCount.prototype.initialize = function () {
    this._typeNormal = 1;
    this._typeKey = 2;
    this._typeHiddenA = 3;
    this._typeHiddenB = 4;
    this._typeWeapon = 5;
    this._typeArmor = 6;
    this._typeEquipedWeapon = 7;
    this._typeEquipedArmor = 8;
    this._typeAllActorEquipedWeapon = 9;
    this._typeAllActorEquipedArmor = 10;
}

/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeNormal = function () {
    return this._typeNormal;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeKey = function () {
    return this._typeKey;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeHiddenA = function () {
    return this._typeHiddenA;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeHiddenB = function () {
    return this._typeHiddenB;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeWeapon = function () {
    return this._typeWeapon;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeArmor = function () {
    return this._typeArmor;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeEquipedWeapon = function () {
    return this._typeEquipedWeapon;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeEquipedArmor = function () {
    return this._typeEquipedArmor;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeAllActorEquipedWeapon = function () {
    return this._typeAllActorEquipedWeapon;
}
/**
 * @returns {number}
 */
Game_ItemCount.prototype.TypeAllActorEquipedArmor = function () {
    return this._typeAllActorEquipedArmor;
}


/**
 * IDで指定したアイテムの個数を取得します。
 * @param {number} id
 * @returns {number}
 */
Game_ItemCount.prototype.ItemFromId = function (id) {
    return $gameItemCount.GetSpecificCount(id, $gameItemCount.TypeNormal());
}
/**
 * IDで指定した所持中の武器の個数を取得します。
 * @param {number} id
 * @returns {number}
 */
Game_ItemCount.prototype.WeaponFromId = function (id) {
    return $gameItemCount.GetSpecificCount(id, $gameItemCount.TypeWeapon());
}
/**
 * IDで指定した装備中の武器の個数を取得します。
 * @param {number} id
 * @returns {number}
 */
Game_ItemCount.prototype.EquipedWeaponFromId = function (id) {
    return $gameItemCount.GetSpecificCount(id, $gameItemCount.TypeEquipedWeapon());
}
/**
 * IDで指定した装備中・所持中の武器の個数を取得します。
 * @returns {number}
 */
Game_ItemCount.prototype.AllWeaponFromId = function (id) {
    return $gameItemCount.WeaponFromId(id) + $gameItemCount.EquipedWeaponFromId(id);
}
/**
 * IDで指定した防具の個数を取得します。
 * @param {number} id
 * @returns {number}
 */
Game_ItemCount.prototype.ArmorFromId = function (id) {
    return $gameItemCount.GetSpecificCount(id, $gameItemCount.TypeArmor());
}
/**
 * IDで指定した装備中の防具の個数を取得します。
 * @param {number} id
 * @returns {number}
 */
Game_ItemCount.prototype.EquipedArmorFromId = function (id) {
    return $gameItemCount.GetSpecificCount(id, $gameItemCount.TypeEquipedArmor());
}
/**
 * IDで指定した装備中、所持中の防具の個数を取得します。
 * @param {number} id
 * @returns {number}
 */
Game_ItemCount.prototype.AllArmorFromId = function (id) {
    return $gameItemCount.ArmorFromId(id) + $gameItemCount.EquipedArmorFromId(id);
}
/**
 * typeIdで指定した武器タイプの所持中の武器の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.WeaponFromWeaponTypeId = function (typeId) {
    return $gameItemCount.GetSpecificTypeCount(typeId, $gameItemCount.TypeWeapon());
}
/**
 * typeIdで指定した武器タイプの装備中の武器の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.EquipedWeaponFromWeaponTypeId = function (typeId) {
    return $gameItemCount.GetSpecificTypeCount(typeId, $gameItemCount.TypeEquipedWeapon());
}
/**
 * 全アクターからtypeIdで指定した武器タイプの装備中の武器の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.AllActor_EquipedWeaponFromWeaponTypeId = function (typeId) {
    return $gameItemCount.GetSpecificTypeCount(typeId, $gameItemCount.TypeAllActorEquipedWeapon());
}
/**
 * typeIdで指定した武器タイプの所持中、装備中の武器の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.AllWeaponFromWeaponTypeId = function (typeId) {
    return $gameItemCount.WeaponFromWeaponTypeId(typeId) + $gameItemCount.EquipedWeaponFromWeaponTypeId(typeId);
}
/**
 * typeIdで指定した防具タイプの所持中の防具の個数を取得します。
 * @param {number} typeId
 * @returns {number}
 */
Game_ItemCount.prototype.ArmorFromArmorTypeId = function (typeId) {
    return $gameItemCount.GetSpecificTypeCount(typeId, $gameItemCount.TypeArmor());
}
/**
 * typeIdで指定した防具タイプの装備中の防具の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.EquipedArmorFromArmorTypeId = function (typeId) {
    return $gameItemCount.GetSpecificTypeCount(typeId, $gameItemCount.TypeEquipedArmor());
}

/**
 * 全アクターからtypeIdで指定した防具タイプの装備中の防具の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.AllActor_EquipedArmorFromArmorTypeId = function (typeId) {
    return $gameItemCount.GetSpecificTypeCount(typeId, $gameItemCount.TypeAllActorEquipedArmor());
}
/**
 * typeIdで指定した防具タイプの所持中、装備中の防具の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.AllArmorFromAromorTypeId = function (typeId) {
    return $gameItemCount.ArmorFromArmorTypeId(typeId) + $gameItemCount.EquipedArmorFromArmorTypeId(typeId);
}
/**
 * typeIdで指定した装備タイプの所持中の装備の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.EquipmentFromEquipTypeId = function (typeId) {
    return $gameItemCount.GetSpecificEquipTypeCount(typeId, $gameItemCount.TypeArmor()) + $gameItemCount.GetSpecificEquipTypeCount(typeId, $gameItemCount.TypeWeapon());
}
/**
 * typeIdで指定した装備タイプの装備中の装備の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.EquipedFromEquipTypeId = function (typeId) {
    return $gameItemCount.GetSpecificEquipTypeCount(typeId, $gameItemCount.TypeEquipedArmor()) +
        $gameItemCount.GetSpecificEquipTypeCount(typeId, $gameItemCount.TypeEquipedWeapon());
}
/**
 * typeIdで指定した装備タイプの所持中、装備中の装備の個数を取得します。
 * @param {number} typeID
 * @returns {number}
 */
Game_ItemCount.prototype.AllEquipFromEquipTypeId = function (typeId) {
    return $gameItemCount.EquipmentFromEquipTypeId(typeId) + $gameItemCount.EquipedFromEquipTypeId(typeId);
}

/**
 * 通常アイテム・大事なもの・隠しアイテムA・隠しアイテムBの合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllItems = function () {
    var itemCount = $gameItemCount.Items() + $gameItemCount.AllHidden();
    return itemCount;
}
/**
 * 通常アイテム・大事なものの合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.Items = function () {
    var itemCount = $gameItemCount.GetNormalCount() + $gameItemCount.GetKeyCount();
    return itemCount;
}
/**
 * 通常アイテムの合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.Normal = function () {
    return $gameItemCount.GetNormalCount();
}
/**
 * 大事なものの合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.Key = function () {
    return $gameItemCount.GetKeyCount();
}
/**
 * 隠しアイテムAの合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.HiddenA = function () {
    return $gameItemCount.GetHiddenACount();
}
/**
 * 隠しアイテムBの合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.HiddenB = function () {
    return $gameItemCount.GetHiddenBCount();
}
/**
 * 隠しアイテムA・隠しアイテムBの合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllHidden = function () {
    return $gameItemCount.HiddenA() + $gameItemCount.HiddenB();
}
/**
 * 武器・防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.Equipment = function () {
    return $gameItemCount.Weapon() + $gameItemCount.Armor();
}
/**
 * 装備中の武器・防具、所持中の武器・防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllEquipment = function () {
    return $gameItemCount.AllWeapon() + $gameItemCount.AllArmor();
}
/**
 * 全アクターが装備中の武器・防具、所持中の武器・防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllActor_AllEquipment = function () {
    return $gameItemCount.AllActor_AllWeapon() + $gameItemCount.AllActor_AllArmor();
}
/**
 * 所持中の武器の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.Weapon = function () {
    return $gameItemCount.GetWeaponsCount();
}
/**
 * 装備中の武器の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.EquipedWeapon = function () {
    return $gameItemCount.GetEquipedWeaponCount();
}
/**
 * 全アクターが装備中の武器の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllActor_EquipedWeapon = function () {
    return $gameItemCount.GetAllActorEquipedWeaponCount();
}
/**
 * 装備中の武器、所持中の武器の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllWeapon = function () {
    return $gameItemCount.Weapon() + $gameItemCount.EquipedWeapon();
}
/**
 * 全アクターが装備中の武器、所持中の武器の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllActor_AllWeapon = function () {
    return $gameItemCount.Weapon() + $gameItemCount.AllActor_EquipedWeapon();
}
/**
 * 所持中の防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.Armor = function () {
    return $gameItemCount.GetArmorsCount();
}
/**
 * 装備中の防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.EquipedArmor = function () {
    return $gameItemCount.GetEquipedArmorCount();
}
/**
 * 全アクターが装備中の防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllActor_EquipedArmor = function () {
    return $gameItemCount.GetAllActorEquipedArmorCount();
}
/**
 * 装備中の防具、所持中の防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllArmor = function () {
    return $gameItemCount.Armor() + $gameItemCount.EquipedArmor();
}
/**
 * 全アクターが装備中の防具、所持中の防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllActor_AllArmor = function () {
    return $gameItemCount.Armor() + $gameItemCount.AllActor_EquipedArmor();
}
/**
 * 装備中の武器・防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllEquiped = function () {
    return $gameItemCount.EquipedWeapon() + $gameItemCount.EquipedArmor();
}
/**
 * 装備中の武器・防具の合計を取得します。
 * @return {number}
 */
Game_ItemCount.prototype.AllActor_AllEquiped = function () {
    return $gameItemCount.AllActor_EquipedWeapon() + $gameItemCount.AllActor_EquipedArmor();
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 個数取得用ローカル関数の定義
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * 指定したタイプと指定したIDの個数を取得します。
 * @param {number} id 
 * @param {number} type
 * @returns {number}
 */
Game_ItemCount.prototype.GetSpecificCount = function (id, type) {
    switch (type) {
        case $gameItemCount.TypeNormal():
        case $gameItemCount.TypeKey():
        case $gameItemCount.TypeHiddenA():
        case $gameItemCount.TypeHiddenB():
            return $gameParty.numItems($dataItems[id]);
        case $gameItemCount.TypeWeapon():
            return $gameParty.numItems($dataWeapons[id]);
        case $gameItemCount.TypeArmor():
            return $gameParty.numItems($dataArmors[id]);
        case $gameItemCount.TypeAllActorEquipedWeapon():
            var weaponCount = 0;
            for (var i = 1; i < $dataActors.length; i++) {
                var actor = $gameActors.actor(i);
                var weaponList = actor.weapons();
                for (var j = 0; j < weaponList.length; j++) {
                    if (weaponList[j] === $dataWeapons[id]) {
                        weaponCount += 1;
                    }
                }
            }
            return weaponCount;
        case $gameItemCount.TypeAllActorEquipedArmor():
            var armorCount = 0;
            for (var k = 1; k < $dataActors.length; k++) {
                var actor2 = $gameActors.actor(k);
                var armorList = actor2.armors();
                for (var l = 0; l < armorList.length; l++) {
                    if (armorList[l] === $dataArmors[id]) {
                        armorCount += 1;
                    }
                }
            }
            return armorCount;
        case $gameItemCount.TypeEquipedWeapon():
            var weaponCount2 = 0;
            var members = $gameParty.members();
            for (var m = 0; m < members.length; m++) {
                var actor3 = members[m];
                var weaponList2 = actor3.weapons();
                for (var n = 0; n < weaponList2.length; n++) {
                    if (weaponList2[n] === $dataWeapons[id]) {
                        weaponCount2 += 1;
                    }
                }
            }
            return weaponCount2;
        case $gameItemCount.TypeEquipedArmor():
            var armorCount2 = 0;
            var members2 = $gameParty.members();
            for (var o = 0; o < members2.length; o++) {
                var actor4 = members2[o];
                var armorList2 = actor4.armors();
                for (var p = 0; p < armorList2.length; p++) {
                    if (armorList2[p] === $dataArmors[id]) {
                        armorCount2 += 1;
                    }
                }
            }
            return armorCount2;
    }
}
/**
 * 特定の装備タイプIDのアイテム及び武器・防具を取得します。
 * @param {number} eType 
 * @param {number} ArmorOrWeaponType
 * @returns {number}
 */
Game_ItemCount.prototype.GetSpecificEquipTypeCount = function (eType, ArmorOrWeaponType) {
    var equipCount = 0;
    switch (ArmorOrWeaponType) {
        case $gameItemCount.TypeWeapon():
            for (var i = 1; i < $dataWeapons.length; i++) {
                if ($dataWeapons[i].etypeId === eType) {
                    equipCount += $gameParty.numItems($dataWeapons[i]);
                }
            }
            return equipCount;
        case $gameItemCount.TypeArmor():
            for (var j = 1; j < $dataArmors.length; j++) {
                if ($dataArmors[j].etypeId === eType) {
                    equipCount += $gameParty.numItems($dataArmors[j]);
                }
            }
            return equipCount;
        case $gameItemCount.TypeAllActorEquipedArmor():
            for (var k = 1; k < $dataActors.length; k++) {
                var actor = $gameActors.actor(k);
                var armorList = actor.armors();
                for (var l = 0; l < armorList.length; l++) {
                    if (armorList[l].etypeId === eType) {
                        equipCount += 1;
                    }
                }
            }
            return equipCount;
        case $gameItemCount.TypeAllActorEquipedWeapon():
            for (var m = 1; m < $dataActors.length; m++) {
                var actor2 = $gameActors.actor(m);
                var weaponList = actor2.weapons();
                for (var n = 0; n < weaponList.length; n++) {
                    if (weaponList[n].etypeId === eType) {
                        equipCount += 1;
                    }
                }
            }
            return equipCount;
        case $gameItemCount.TypeEquipedWeapon():
            for (var o = 0; o < $gameParty.members().length; o++) {
                var members = $gameParty.members();
                var actor3 = members[o];
                var weaponList2 = actor3.weapons();
                for (var p = 0; p < weaponList2.length; p++) {
                    if (weaponList2[p].etypeId === eType) {
                        equipCount += 1;
                    }
                }
            }
            return equipCount;
        case $gameItemCount.TypeEquipedArmor():
            for (var q = 0; q < $gameParty.members().length; q++) {
                var members2 = $gameParty.members();
                var actor4 = members2[q];
                var armorList2 = actor4.armors();
                for (var r = 0; r < armorList2.length; r++) {
                    if (armorList2[r].etypeId === eType) {
                        equipCount += 1;
                    }
                }
            }
            return equipCount;
    }
}
/**
 * 特定のタイプIDのアイテム及び武器・防具を取得します。
 * @param {number} type 
 * @param {number} ArmorOrWeaponType
 * @returns {number}
 */
Game_ItemCount.prototype.GetSpecificTypeCount = function (type, ArmorOrWeaponType) {
    var equipCount = 0;
    switch (ArmorOrWeaponType) {
        case $gameItemCount.TypeWeapon():
            for (var i = 1; i < $dataWeapons.length; i++) {
                if ($dataWeapons[i].wtypeId === type) {
                    equipCount += $gameParty.numItems($dataWeapons[i]);
                }
            }
            return equipCount;
        case $gameItemCount.TypeArmor():
            for (var j = 1; j < $dataArmors.length; j++) {
                if ($dataArmors[j].atypeId === type) {
                    equipCount += $gameParty.numItems($dataArmors[j]);
                }
            }
            return equipCount;
        case $gameItemCount.TypeAllActorEquipedWeapon():
            for (var k = 1; k < $dataActors.length; k++) {
                var actor = $gameActors.actor(k);
                var weaponList = actor.weapons();
                for (var l = 0; l < weaponList.length; l++) {
                    if (weaponList[l].wtypeId === type) {
                        equipCount += 1;
                    }
                }
            }
            return equipCount;
        case $gameItemCount.TypeAllActorEquipedArmor():
            for (var m = 1; m < $dataActors.length; m++) {
                var actor2 = $gameActors.actor(m);
                var armorList = actor2.armors();
                for (var n = 0; n < armorList.length; n++) {
                    if (armorList[n].atypeId === type) {
                        equipCount += 1;
                    }
                }
            }
            return equipCount;
        case $gameItemCount.TypeEquipedWeapon():
            for (var o = 0; o < $gameParty.members().length; o++) {
                var members = $gameParty.members();
                var actor3 = members[o];
                var weaponList2 = actor3.weapons();
                for (var p = 0; p < weaponList2.length; p++) {
                    if (weaponList2[p].wtypeId === type) {
                        equipCount += 1;
                    }
                }
            }
            return equipCount;
        case $gameItemCount.TypeEquipedArmor():
            for (var q = 0; q < $gameParty.members().length; q++) {
                var members2 = $gameParty.members();
                var actor4 = members2[q];
                var armorList2 = actor4.armors();
                for (var r = 0; r < armorList2.length; r++) {
                    if (armorList2[r].atypeId === type) {
                        equipCount += 1;
                    }
                }
            }
            return equipCount;
    }
}


/**
 * プレイヤーのインベントリに存在する通常アイテムの合計数を取得します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetNormalCount = function () {
    var itemCount = 0;
    for (var i = 1; i < $dataItems.length; i++) {
        if ($dataItems[i].itypeId === 1) {
            itemCount += $gameParty.numItems($dataItems[i]);
        }
    }
    return itemCount;
}
/**
 * プレイヤーのインベントリに存在する大事なものの合計数を取得します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetKeyCount = function () {
    var itemCount = 0;
    for (var i = 1; i < $dataItems.length; i++) {
        if ($dataItems[i].itypeId === 2) {
            itemCount += $gameParty.numItems($dataItems[i]);
        }
    }
    return itemCount;
}

/**
 * プレイヤーのインベントリに存在する隠しアイテムAの合計数を取得します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetHiddenACount = function () {
    var itemCount = 0;
    for (var i = 1; i < $dataItems.length; i++) {
        if ($dataItems[i].itypeId === 3) {
            itemCount += $gameParty.numItems($dataItems[i]);
        }
    }
    return itemCount;
}

/**
 * プレイヤーのインベントリに存在する隠しアイテムAの合計数を取得します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetHiddenBCount = function () {
    var itemCount = 0;
    for (var i = 1; i < $dataItems.length; i++) {
        if ($dataItems[i].itypeId === 4) {
            itemCount += $gameParty.numItems($dataItems[i]);
        }
    }
    return itemCount;
}
/**
 * プレイヤーのインベントリにに存在する武器の合計数を取得します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetWeaponsCount = function () {
    var weaponCount = 0;
    for (var i = 1; i < $dataWeapons.length; i++) {
        weaponCount += $gameParty.numItems($dataWeapons[i]);
    }
    return weaponCount;
}

/**
 * パーティーが装備中の武器の数を返します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetEquipedWeaponCount = function () {
    var weaponCount = 0;
    for (var i = 1; i < $dataWeapons.length; i++) {
        var members = $gameParty.members();
        for (var j = 0; j < members.length; j++) {
            var actor = members[j];
            var weaponList = actor.weapons();
            for (var k = 0; k < weaponList.length; k++) {
                if (weaponList[k] === $dataWeapons[i]) {
                    weaponCount += 1;
                }
            }
        }
    }
    return weaponCount;
}

/**
 * 全アクターが装備中の武器の数を返します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetAllActorEquipedWeaponCount = function () {
    var weaponCount = 0;
    for (var i = 1; i < $dataWeapons.length; i++) {
        for (var j = 1; j < $dataActors.length; j++) {
            var weaponList = $gameActors.actor(j).weapons();
            for (var k = 0; k < weaponList.length; k++) {
                if (weaponList[k] === $dataWeapons[i]) {
                    weaponCount += 1;
                }
            }
        }
    }
    return weaponCount;
}

/**
 * プレイヤーのインベントリに存在する防具の合計数を取得します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetArmorsCount = function () {
    var armorCount = 0;
    for (var i = 1; i < $dataArmors.length; i++) {
        armorCount += $gameParty.numItems($dataArmors[i]);
    }
    return armorCount;
}

/**
 * パーティーが装備中の武器の数を返します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetEquipedArmorCount = function () {
    var armorCount = 0;
    for (var i = 1; i < $dataArmors.length; i++) {
        var members = $gameParty.members();
        for (var j = 0; j < members.length; j++) {
            var actor = members[j];
            var armorList = actor.armors();
            for (var k = 0; k < armorList.length; k++) {
                if (armorList[k] === $dataArmors[i]) {
                    armorCount += 1;
                }
            }
        }
    }
    return armorCount;
}

/**
 * 全アクターが装備中の武器の数を返します。
 * @returns {number}
 */
Game_ItemCount.prototype.GetAllActorEquipedArmorCount = function () {
    var armorCount = 0;
    for (var i = 1; i < $dataArmors.length; i++) {
        for (var j = 1; j < $dataActors.length; j++) {
            var armorList = $gameActors.actor(j).armors();
            for (var k = 0; k < armorList.length; k++) {
                if (armorList[k] === $dataArmors[i]) {
                    armorCount += 1;
                }
            }
        }
    }
    return armorCount;
}
var $gameItemCount = new Game_ItemCount();