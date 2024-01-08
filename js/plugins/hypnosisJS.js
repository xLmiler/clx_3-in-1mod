
//QTE需求变量
var $CM_speed = null;
var $CM_speedLevel = 1;
var $CM_pointX = null;
var $CM_pendulum = null;
var $CM_pendulum_num = null;
//真白线变量
var $CM_runiu = 1;

//其他临时变量


(function () {
    var CM_DataManagerCreateGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        CM_DataManagerCreateGameObjects.call(this);
        $CM_value = new CM_Game_Variables();
    };
})();

(function () {
    var _Game_Message_add = Game_Message.prototype.add;
    Game_Message.prototype.add = function (text) {
        text = text.replace(/\\cm\[(.*?)\]/gi, function () {
            return $CM_value.get(String(arguments[1]));
        });
        _Game_Message_add.call(this, text);
    };
})();
//自定义临时变量
function CM_Game_Variables() {
    this.initialize.apply(this, arguments);
}

CM_Game_Variables.prototype.initialize = function () {
    this.clear();
};

CM_Game_Variables.prototype.clear = function () {
    this._data = new Map();
};

CM_Game_Variables.prototype.get = function (variableId) {
    return this._data.get(variableId) || 0;
};

CM_Game_Variables.prototype.set = function (variableId, value) {
    {
        this._data.set(variableId, value);
        $gameMap.requestRefresh();

    }
};
//自增
CM_Game_Variables.prototype.add = function (variableId, value) {
    {
        if (this._data.get(variableId) == null || this._data.get(variableId) == 0) {
            this._data.set(variableId, value);
        }
        else {
            this._data.set(variableId, this._data.get(variableId) + value);
        }
        $gameMap.requestRefresh();

    }
};



