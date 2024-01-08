function damagecul_final(b_mhp, b_hp, a_atk, b_def, a_mat, b_mdf, level, e_enhance) {
    var damage1 = 0;
    var damage2 = 0;
    var damage = 0;
    var enhance = $gameVariables.value(1199);
    enhance += $gameVariables.value(e_enhance)
    damage1 = a_atk * a_atk / (a_atk + b_def);
    if (damage1 < 0) {
        damage1 = 0
    }
    damage2 = a_mat * a_mat / (a_mat + b_mdf);
    if (damage2 < 0) {
        damage2 = 0
    }
    damage = damage1 + damage2;
    damage *= 2
    damage *= level;
    enhance += 100;
    if(enhance < 1) enhance = 1;
    enhance /= 100;
    damage *= enhance;
    if (b_hp <= 5000 || b_hp <= 0.3 * b_mhp) {
        damage *= 2;
    }
    return damage;
}

function damagecul_magic_normal(a_atk, b_def, a_mat, b_mdf, level, e_enhance) {
    var damage1 = 0;
    var damage2 = 0;
    var damage = 0;
    var enhance = $gameVariables.value(1199);
    enhance += $gameVariables.value(e_enhance)
    damage1 = a_atk * a_atk / (a_atk + b_def);
    if (damage1 < 0) {
        damage1 = 0
    }
    damage2 = a_mat * a_mat / (a_mat + b_mdf);
    if (damage2 < 0) {
        damage2 = 0
    }
    damage = damage1 + damage2;
    damage *= 2
    damage *= level;
    enhance += 100;
    if(enhance < 1) enhance = 1;
    enhance /= 100;
    damage *= enhance;
    return damage;
}

function damagecul_normal(a_atk, b_def, level, e_enhance) {
    var damage = 0;
    var enhance = 0;
    enhance += $gameVariables.value(e_enhance)
    damage = a_atk * a_atk / (a_atk + b_def);
    damage *= 2
    damage *= level;
    enhance += 100;
    if(enhance < 1) enhance = 1;
    enhance /= 100;
    damage *= enhance;
    return damage;
}

function damagecul_magic(a_atk, b_def, level, e_enhance) {
    var damage = 0;
    var enhance = $gameVariables.value(1199);
    enhance += $gameVariables.value(e_enhance)
    damage = a_atk * a_atk / (a_atk + b_def);
    damage *= 2
    damage *= level;
    enhance += 100;
    if(enhance < 1) enhance = 1;
    enhance /= 100;
    damage *= enhance;
    return damage;
}

function damagecul_enemy_normal(a_atk, b_def, level) {
    var damage = 0;
    damage = a_atk * a_atk / (a_atk + b_def);
    damage *= 2
    damage *= level;
    if (damage <= 0) { damage = Math.floor(Math.random() * 3) }
    return damage;
}

function damagecul_penetration(a_atk, b_def, level) {
    var damage = 0;
    damage = a_atk * a_atk / (a_atk + b_def / 2);
    damage *= 2
    damage *= level;
    return damage;
}

function damagecul_mat01(a_mat, b_mdf, level) {
    var damage = 0;
    damage = a_atk * a_atk / (a_atk + b_def);
    damage *= 2
    damage *= level;
    return damage;
}