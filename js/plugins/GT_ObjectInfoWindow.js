//=============================================================================
// GT50 Plugins - ObjectInfoWindow
// GT_ObjectInfoWindow.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_ObjectInfoWindow = true;

var GT = GT || {};
GT.OIWin = GT.OIWin || {};
GT.OIWin.version = 1.1;

//=============================================================================
/*:
 * @plugindesc [v1.1]        控件 - 模块信息窗口
 * @author ganfly
 *
 * @help
 * =============================================================================
 * +++ GT_ObjectInfoWindow [v1.1] +++
 * By ganfly
 *
 * ============================================================================
 *  介绍
 * ============================================================================
 * 
 * 查看物品/装备/技能时，会弹出窗口并对其详细介绍。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，是以下插件的依赖，请将以下插件置于本插件下方。
 * 可作用于：
 *   - GT_X_YEPPluginInfo     控件 - 模块信息窗口 - YEP插件信息扩展
 *   - GT_X_EquipSuitInfo     控件 - 模块信息窗口 - 套装信息扩展
 *
 * ----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、战斗界面
 *   作用于菜单的几个界面，以及战斗的技能/物品窗口界面。
 * 2.介绍默认自动生成，你也可以手动配置自动生成的方式。
 *  
 * ============================================================================
 *  备注
 * ============================================================================
 * ----物品/装备/技能备注
 * 
 *     <描述P:xxx>
 *     <描述前:xxx>
 *     这会在自动生成的描述前加上冒号后面的自定义内容
 *     每个备注内容会显示一行，可添加多行
 *     例如<描述P:这是一句非常长的没有意>
 *         <描述P:义的话。>
 * 
 *     <描述A:xxx>
 *     <描述后:xxx>
 *     这会在自动生成的描述后加上冒号后面的自定义内容
 *     每个备注内容会显示一行，可添加多行
 *     例如<描述A:这是一句非常长的没有意>
 *         <描述A:义的话。>
 *
 *     <顶部信息>
 *     xxxx
 *     xxxx
 *     </顶部信息>
 *     这会在自动生成的描述顶部加上备注中间的自定义内容
 *     备注中间的内容每一行都代表显示的一行，可以写多行
 *     例如 <顶部信息>
 *          这是一句非常长的没有意
 *          义的话。
 *          </顶部信息>
 *
 *     <底部信息>
 *     xxxx
 *     xxxx
 *     </底部信息>
 *     这会在自动生成的描述底部加上备注中间的自定义内容
 *     备注中间的内容每一行都代表显示的一行，可以写多行
 *     例如 <底部信息>
 *          这是一句非常长的没有意
 *          义的话。
 *          </底部信息>
 *
 *     <帮助插入:前>
 *     <帮助插入:后>
 *     这会在自动生成的描述前或后插入物品帮助信息的内容
 *
 *  -------------------------------!!注意!! ------------------------------
 *      各种描述的显示顺序如下图
 *
 *      物品名
 *      -----------------
 *      顶部信息(包括帮助插入信息)
 *      -----------------
 *      描述前信息
 *      自动生成的信息
 *      描述后信息
 *      -----------------
 *      技能/物品伤害信息
 *      -----------------
 *      底部信息(包括帮助插入信息)
 *      -----------------
 *      技能额外消耗信息
 *      -----------------
 *      装备/技能条件信息
 *      -----------------
 *      品质/耐久/价格/技能常规消耗等信息
 *
 *      以上所有信息均可以使用文字代码
 *
 * ============================================================================
 *  兼容性
 * ============================================================================
 * 
 *  目前已经同以下插件兼容，请将此插件置于以下所有插件的下方
 *     Drill_CoreOfColor
 *     YEP_ItemCore
 *     YEP_X_ItemCategories
 *     YEP_SkillCore
 *     FTKR_SkillTreeSystem
 *     Drill_ItemTextColor
 *     Drill_ItemTextFilter
 * 
 * ============================================================================
 *  用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 *  更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 *
 * [v1.1] 修复一些诡异的bug。
 *
 * ============================================================================
 *  帮助结束
 * ============================================================================
 *
 * @param General
 * @text ----总体设定----
 *
 * @param AutoShowWindow
 * @text 是否初始启用窗口?
 * @parent General
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 是否初始启用模块信息窗口
 * @default true
 *
 * @param MaxRowsList
 * @text 换列标准
 * @parent General
 * @type number[]
 * @min 1
 * @desc 根据描述行数调整列数，设置[14，21，28]代表14行以内用1列，14-21行用2列，21-28行用3列，以此类推。
 * @default ["14","21","28"]
 *
 * @param SwitchBtn
 * @text 切换按钮
 * @parent General
 * @type text[]
 * @desc 切换该窗口是否显示的按钮。tab的设置意思是，按tab键会隐藏窗口，再按会显示。
 * @default ["tab","menu"]
 *
 * @param DecimalDigit
 * @text 显示数值小数点位数
 * @parent General
 * @type number
 * @min 0
 * @desc 自动显示中，百分比的小数位显示的精度，0表示100%，1表示111.1%。
 * @default 0
 *
 * @param ColorSet
 * @text 颜色设置
 * @type struct<ColorSet>
 * @parent General
 * @desc 颜色设置
 * @default {"BackColor":"rgba(38,38,38,0.8)","OutlineColor":"rgba(255,255,176,1)","DelimiterColor":"rgba(255,255,255,1)","TextColor":"","BasicColor":"6","SystemColor":"4","IncreaseColor":"24","DecreaseColor":"2"}
 *
 * @param SceneSet
 * @text ----各个界面的设定----
 *
 * @param Scene_Item
 * @text 物品界面设置
 * @type struct<SceneSet>
 * @parent SceneSet
 * @desc 物品界面设置
 * @default {"ShowWindow":"true","FixWindow":"false","WindowX":"0","WindowY":"0","WindowWidth":"0","WindowHeight":"0","WindowScale":"0.6","WindowSkin":"Window","WindowOpacity":"0","WindowBack":"true","WindowOutline":"true","ShowBigIcon":"true","FixMaxCols":"false","ScrollSpeed":"4"}
 *
 * @param Scene_Skill
 * @text 技能界面设置
 * @type struct<SceneSet>
 * @parent SceneSet
 * @desc 技能界面设置
 * @default {"ShowWindow":"true","FixWindow":"false","WindowX":"0","WindowY":"0","WindowWidth":"0","WindowHeight":"0","WindowScale":"0.6","WindowSkin":"Window","WindowOpacity":"0","WindowBack":"true","WindowOutline":"true","ShowBigIcon":"true","FixMaxCols":"false","ScrollSpeed":"4"}
 *
 * @param Scene_Equip
 * @text 装备界面设置
 * @type struct<SceneSet>
 * @parent SceneSet
 * @desc 装备界面设置
 * @default {"ShowWindow":"true","FixWindow":"false","WindowX":"0","WindowY":"0","WindowWidth":"0","WindowHeight":"0","WindowScale":"0.6","WindowSkin":"Window","WindowOpacity":"0","WindowBack":"true","WindowOutline":"true","ShowBigIcon":"true","FixMaxCols":"false","ScrollSpeed":"4"}
 *
 * @param Scene_Shop
 * @text 商店界面设置
 * @type struct<SceneSet>
 * @parent SceneSet
 * @desc 商店界面设置
 * @default {"ShowWindow":"true","FixWindow":"false","WindowX":"0","WindowY":"0","WindowWidth":"0","WindowHeight":"0","WindowScale":"0.6","WindowSkin":"Window","WindowOpacity":"0","WindowBack":"true","WindowOutline":"true","ShowBigIcon":"true","FixMaxCols":"false","ScrollSpeed":"4"}
 *
 * @param Scene_Battle
 * @text 战斗界面设置
 * @type struct<SceneSet>
 * @parent SceneSet
 * @desc 战斗界面设置
 * @default {"ShowWindow":"true","FixWindow":"false","WindowX":"0","WindowY":"0","WindowWidth":"0","WindowHeight":"0","WindowScale":"0.6","WindowSkin":"Window","WindowOpacity":"0","WindowBack":"true","WindowOutline":"true","ShowBigIcon":"true","FixMaxCols":"false","ScrollSpeed":"4"}
 *
 * @param Scene_STS
 * @text FTKR技能树界面设置
 * @type struct<SceneSet>
 * @parent SceneSet
 * @desc FTKR技能树界面设置(！！需要FTKR_SkillTreeSystem插件！！)
 * @default {"ShowWindow":"true","FixWindow":"false","WindowX":"0","WindowY":"0","WindowWidth":"0","WindowHeight":"0","WindowScale":"0.6","WindowSkin":"Window","WindowOpacity":"0","WindowBack":"true","WindowOutline":"true","ShowBigIcon":"true","FixMaxCols":"false","ScrollSpeed":"4"}
 *
 * @param Text
 * @text ----用语设定----
 *
 * @param ShowIcon
 * @text 是否显示图标?
 * @parent Text
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示状态和技能的图标？
 * @default false
 *
 * @param MainText
 * @text 基本用语
 * @type struct<MainText>
 * @parent Text
 * @desc 基本信息的显示设置
 * @default {"Colon":":","TraitText":"特性","ShowCategory":"true","PriceText":"{\"Name\":\"价格\",\"Show\":\"true\"}","Scope":"{\"Name\":\"范围\",\"Show\":\"true\"}","ScopeText":"[\"敌方单体\",\"敌方全体\",\"敌方随机1人\",\"敌方随机2人\",\"敌方随机3人\",\"敌方随机4人\",\"我方单体\",\"我方全体\",\"我方死亡单体\",\"我方死亡全体\",\"使用者自身\"]","Consumable":"{\"Name\":\"消耗品\",\"Show\":\"true\"}","Occasion":"{\"Name\":\"使用场合\",\"Show\":\"true\"}","OccasionText":"[\"随时可用\",\"战斗\",\"非战斗\",\"无法使用\"]","ShowTopBottomText":"true"}
 * @param ActionText
 * @text 行动发动用语
 * @type struct<ActionText>
 * @parent Text
 * @desc 行动发动信息的显示设置
 * @default {"Speed":"{\"Name\":\"速度补正\",\"Show\":\"true\"}","SuccessRate":"{\"Name\":\"成功率\",\"Show\":\"true\"}","Repeats":"{\"Name\":\"连击次数\",\"Show\":\"true\"}","TpGain":"{\"Name\":\"获得TP\",\"Show\":\"true\"}","HitType":"{\"Name\":\"命中类型\",\"Show\":\"true\"}","HitTypeText":"[\"必中\",\"物伤\",\"法伤\"]"}
 *
 * @param DamageText
 * @text 伤害用语
 * @type struct<DamageText>
 * @parent Text
 * @desc 伤害信息的显示设置
 * @default {"Type":"{\"Name\":\"伤害类型\",\"Show\":\"true\"}","TypeText":"[\"HP伤害\",\"MP伤害\",\"HP恢复\",\"MP恢复\",\"HP吸收\",\"MP吸收\"]","Critical":"{\"Name\":\"可暴击\",\"Show\":\"true\"}","Element":"{\"Name\":\"属性\",\"Show\":\"true\"}","Formula":"{\"Name\":\"伤害公式\",\"Show\":\"true\"}","Variance":"{\"Name\":\"伤害浮动\",\"Show\":\"true\"}"}
 *
 * @param SkillCostText
 * @text 技能消耗用语
 * @type struct<SkillCostText>
 * @parent Text
 * @desc 技能消耗信息的显示设置
 * @default {"HpFormat":"%1%2","HpTextColor":"18","HpIcon":"162","MpFormat":"%1%2","MpTextColor":"23","MpIcon":"165","TpFormat":"%1%2","TpTextColor":"29","TpIcon":"164","CustomCost":"{\"Name\":\"额外消耗\",\"Show\":\"true\"}"}
 *
 * @param ObjRequireText
 * @text 需求条件用语
 * @type struct<ObjRequireText>
 * @parent Text
 * @desc 技能需求条件信息的显示设置
 * @default {"WtypeRequire":"{\"Name\":\"需要武器\",\"Show\":\"true\"}"}
 *
 * @param QualitySet
 * @text 物品品质用语
 * @parent Text
 * @type struct<ItemQualitySet>[]
 * @desc 物品品质设定，此功能需要Drill_CoreOfColor和Drill_ItemTextColor的支持。
 * @default ["{\"QualityText\":\"普通\",\"QualityColor\":\"11\",\"ColorCategory\":\"普通颜色\"}","{\"QualityText\":\"稀有\",\"QualityColor\":\"3\",\"ColorCategory\":\"普通颜色\"}","{\"QualityText\":\"史诗\",\"QualityColor\":\"7\",\"ColorCategory\":\"普通颜色\"}","{\"QualityText\":\"传说\",\"QualityColor\":\"2\",\"ColorCategory\":\"普通颜色\"}","{\"QualityText\":\"神圣\",\"QualityColor\":\"1\",\"ColorCategory\":\"普通颜色\"}","{\"QualityText\":\"创世\",\"QualityColor\":\"1\",\"ColorCategory\":\"高级颜色\"}"]
 *
 * @param Trait
 * @text ----特性用语设定----
 * @parent Text
 *
 * @param ResistText
 * @text 抗性用语
 * @type struct<ResistText>
 * @parent Trait
 * @desc 抗性的显示名称
 * @default {"Attribute":"{\"Name\":\"抗性\",\"Show\":\"true\"}","Debuff":"{\"Name\":\"弱化抗性\",\"Show\":\"true\"}","State":"{\"Name\":\"抗性\",\"Show\":\"true\"}","StateImmunity":"{\"Name\":\"状态免疫\",\"Show\":\"true\"}"}
 *
 * @param NParamText
 * @text 通常参数用语
 * @type struct<NParamText>
 * @parent Trait
 * @desc 设置是否显示通常参数
 * @default {"MHP":"true","MMP":"true","ATK":"true","DEF":"true","MAT":"true","MDF":"true","AGI":"true","LUK":"true"}
 *
 * @param XParamText
 * @text 额外参数用语
 * @type struct<XParamText>
 * @parent Trait
 * @desc 设置额外参数的显示名称
 * @default {"HIT":"{\"Name\":\"命中率\",\"Show\":\"true\"}","EVA":"{\"Name\":\"闪避率\",\"Show\":\"true\"}","CRI":"{\"Name\":\"暴击率\",\"Show\":\"true\"}","CEV":"{\"Name\":\"暴击闪避率\",\"Show\":\"true\"}","MEV":"{\"Name\":\"魔法闪避率\",\"Show\":\"true\"}","MRF":"{\"Name\":\"魔法反射率\",\"Show\":\"true\"}","CNT":"{\"Name\":\"反击率\",\"Show\":\"true\"}","HRG":"{\"Name\":\"生命自动回复\",\"Show\":\"true\"}","MRG":"{\"Name\":\"魔法自动回复\",\"Show\":\"true\"}","TRG":"{\"Name\":\"怒气自动回复\",\"Show\":\"true\"}"}
 *
 * @param SParamText
 * @text 特殊参数用语
 * @type struct<SParamText>
 * @parent Trait
 * @desc 设置特殊参数的显示名称
 * @default {"TGR":"{\"Name\":\"受到攻击几率\",\"Show\":\"true\"}","GRD":"{\"Name\":\"防御效果\",\"Show\":\"true\"}","REC":"{\"Name\":\"回复效果\",\"Show\":\"true\"}","PHA":"{\"Name\":\"药理知识\",\"Show\":\"true\"}","MCR":"{\"Name\":\"魔法消耗率\",\"Show\":\"true\"}","TCR":"{\"Name\":\"怒气补充率\",\"Show\":\"true\"}","PDR":"{\"Name\":\"物理伤害率\",\"Show\":\"true\"}","MDR":"{\"Name\":\"魔法伤害率\",\"Show\":\"true\"}","FDR":"{\"Name\":\"地形伤害率\",\"Show\":\"true\"}","EXR":"{\"Name\":\"经验获得率\",\"Show\":\"true\"}"}
 *
 * @param AttackText
 * @text 攻击效果用语
 * @type struct<AttackText>
 * @parent Trait
 * @desc 设置攻击效果用语。
 * @default {"AtkAttribute":"{\"Name\":\"攻击属性\",\"Show\":\"true\"}","AtkState":"{\"Name\":\"攻击附加状态\",\"Show\":\"true\"}","AtkSpeed":"{\"Name\":\"攻击速度补正\",\"Show\":\"true\"}","AtkAppend":"{\"Name\":\"攻击追加次数\",\"Show\":\"true\"}"}
 *
 * @param SkillText
 * @text 技能效果用语
 * @type struct<SkillText>
 * @parent Trait
 * @desc 设置技能效果用语。
 * @default {"AddSType":"{\"Name\":\"添加技能类型\",\"Show\":\"true\"}","SealStype":"{\"Name\":\"封印技能类型\",\"Show\":\"true\"}","AddSkill":"{\"Name\":\"添加技能\",\"Show\":\"true\"}","SealSkill":"{\"Name\":\"封印技能\",\"Show\":\"true\"}"}
 *
 * @param EquipText
 * @text 装备效果用语
 * @type struct<EquipText>
 * @parent Trait
 * @desc 设置装备效果用语。
 * @default {"EquipWeapon":"{\"Name\":\"装备武器类型\",\"Show\":\"true\"}","EquipArmor":"{\"Name\":\"装备护甲类型\",\"Show\":\"true\"}","FixEquip":"{\"Name\":\"固定装备\",\"Show\":\"true\"}","SealEquip":"{\"Name\":\"封印装备\",\"Show\":\"true\"}","EquipSlot":"{\"Name\":\"装备槽类型\",\"Show\":\"true\"}","EquipSlotText":"[\"正常\",\"二刀流\"]"}
 *
 * @param BResultText
 * @text 战斗结算用语
 * @type struct<BResultText>
 * @parent Trait
 * @desc 设置战斗结算参数的显示名称
 * @default {"EXP":"{\"Name\":\"战斗经验\",\"Show\":\"true\"}","GOLD":"{\"Name\":\"金币掉落\",\"Show\":\"true\"}","ITEM":"{\"Name\":\"物品爆率\",\"Show\":\"true\"}"}
 *
 * @param OtherTraitText
 * @text 其他特性用语
 * @type struct<OtherTraitText>
 * @parent Trait
 * @desc 设置其他用语
 * @default {"MoreAction":"{\"Name\":\"增加行动次数\",\"Show\":\"true\"}","SpecialSign":"{\"Name\":\"特殊标志\",\"Show\":\"true\"}","SpecialSignText":"[\"自动战斗\",\"启用防御\",\"可援护\",\"保留怒气\"]","DisappearEffect":"{\"Name\":\"消失效果\",\"Show\":\"true\"}","DisappearEffectText":"[\"正常消失\",\"Boss消失\",\"瞬间消失\",\"不消失\"]","PartyAbility":"{\"Name\":\"队伍能力\",\"Show\":\"true\"}","PartyAbilityText":"[\"遇敌减半\",\"无遇敌\",\"取消偷袭\",\"增加先发制人率\",\"双倍金钱\",\"双倍掉落物品\"]"}
 *
 * @param EffectText
 * @text ----效果用语设定----
 * @parent Text
 *
 * @param RecoverText
 * @text 回复效果用语
 * @type struct<RecoverText>
 * @parent EffectText
 * @desc 设置回复效果用语
 * @default {"HPRecover":"{\"Name\":\"回复HP\",\"Show\":\"true\"}","HPCost":"{\"Name\":\"消耗HP\",\"Show\":\"true\"}","MPRecover":"{\"Name\":\"回复MP\",\"Show\":\"true\"}","MPCost":"{\"Name\":\"消耗MP\",\"Show\":\"true\"}","TPRecover":"{\"Name\":\"回复TP\",\"Show\":\"true\"}","TPCost":"{\"Name\":\"消耗TP\",\"Show\":\"true\"}"}
 *
 * @param StateBuffText
 * @text 状态强化用语
 * @type struct<StateBuffText>
 * @parent EffectText
 * @desc 状态BUFF效果用语
 * @default {"AddState":"{\"Name\":\"附加状态\",\"Show\":\"true\"}","RemoveState":"{\"Name\":\"解除状态\",\"Show\":\"true\"}","AddBuff":"{\"Name\":\"强化\",\"Show\":\"true\"}","AddDebuff":"{\"Name\":\"弱化\",\"Show\":\"true\"}","RemoveBuff":"{\"Name\":\"解除强化\",\"Show\":\"true\"}","RemoveDebuff":"{\"Name\":\"解除弱化\",\"Show\":\"true\"}","TurnText":"回合"}
 *
 * @param OtherEffectText
 * @text 其他效果用语
 * @type struct<OtherEffectText>
 * @parent EffectText
 * @desc 其他效果用语
 * @default {"SpecialEffect":"{\"Name\":\"特殊效果\",\"Show\":\"true\"}","GrowUp":"{\"Name\":\"永久提升\",\"Show\":\"true\"}","LearnSkill":"{\"Name\":\"学会技能\",\"Show\":\"true\"}","CommonEvent":"{\"Name\":\"特殊\",\"Show\":\"true\"}","EscapeText":"逃跑"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ColorSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ColorSet:
 *
 * @param BackColor
 * @text 颜色-背景
 * @desc 背景的颜色。
 * @default rgba(38,38,38,0.8)
 *
 * @param OutlineColor
 * @text 颜色-外框
 * @desc 外框的颜色。
 * @default rgba(255,255,176,1)
 *
 * @param DelimiterColor
 * @text 颜色-分隔符
 * @desc 分隔符的颜色。
 * @default rgba(255,255,255,1)
 *
 * @param TextColor
 * @text 颜色-文本
 * @default 
 *
 * @param BasicColor
 * @text 颜色-基本文本
 * @parent TextColor
 * @type number
 * @min 0
 * @desc 窗口显示的基本文本的颜色。
 * @default 6
 *
 * @param SystemColor
 * @text 颜色-系统文本
 * @parent TextColor
 * @type number
 * @min 0
 * @desc 系统自动显示文本的颜色。
 * @default 4
 *
 * @param IncreaseColor
 * @text 颜色-能力上升
 * @parent TextColor
 * @type number
 * @min 0
 * @desc 表示能力上升的文本颜色。
 * @default 24
 *
 * @param DecreaseColor
 * @text 颜色-能力下降
 * @parent TextColor
 * @type number
 * @min 0
 * @desc 表示能力下降的文本颜色。
 * @default 2
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SceneSet>
 * ---------------------------------------------------------------------------
 */
/*~struct~SceneSet:
 *
 * @param ShowWindow
 * @text 是否在该界面显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在该界面显示模块信息窗口。
 * @default true
 *
 * @param FixWindow
 * @text 固定/浮动窗口
 * @type boolean
 * @on 固定
 * @off 浮动
 * @desc 设置在该界面模块信息窗口是固定窗口还是自适应浮动窗口。
 * @default false
 *
 * @param WindowX
 * @text 窗口X坐标
 * @desc 该界面模块信息窗口的X坐标,如果是固定窗口，就是绝对坐标，否则为偏移量。
 * @default 0
 *
 * @param WindowY
 * @text 窗口Y坐标
 * @desc 该界面模块信息窗口的Y坐标,如果是固定窗口，就是绝对坐标，否则为偏移量。
 * @default 0
 *
 * @param WindowWidth
 * @text 窗口宽度
 * @desc 该界面模块信息窗口的宽度,如果是固定窗口且值不为0，就是绝对宽度，否则为宽度修正。
 * @default 0
 *
 * @param WindowHeight
 * @text 窗口高度
 * @desc 该界面模块信息窗口的高度,如果是固定窗口且值不为0，就是绝对高度，否则为高度修正。
 * @default 0
 *
 * @param WindowScale
 * @text 窗口缩放率
 * @desc 该界面模块信息窗口的缩放率
 * @default 0.7
 *
 * @param WindowSkin
 * @text 窗口皮肤
 * @type file
 * @dir img/system/
 * @desc 该界面模块信息窗口的窗口皮肤
 * @default Window
 *
 * @param WindowOpacity
 * @text 窗口不透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 该界面模块信息窗口的窗口不透明度
 * @default 0
 *
 * @param WindowBack
 * @text 是否显示窗口背景
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示窗口背景
 * @default true
 *
 * @param WindowOutline
 * @text 是否绘制窗口外框
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否绘制窗口外框
 * @default true
 *
 * @param ShowBigIcon
 * @text 是否显示大图标?
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否在该界面模块信息窗口中显示大图标
 * @default true
 *
 * @param FixMaxCols
 * @text 固定窗口时是否固定列数?
 * @type boolean
 * @on 固定
 * @off 不固定
 * @desc 固定窗口时是否固定列数为1
 * @default false
 *
 * @param ScrollSpeed
 * @text 窗口滚动速度
 * @type number
 * @min 1
 * @desc 固定窗口时的窗口滚动速度
 * @default 4
 *
 */
/* ---------------------------------------------------------------------------
 * struct<MainText>
 * ---------------------------------------------------------------------------
 */
/*~struct~MainText:
 *
 * @param Colon
 * @text 信息分割符号
 * @desc 信息分割符号，一般为冒号。
 * @default :
 *
 * @param TraitText
 * @text 特性用语
 * @desc 特性用语。
 * @default 特性
 *
 * @param ShowCategory
 * @text 显示物品种类?
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否显示物品种类
 * @default true
 *
 * @param PriceText
 * @text 物品价格用语
 * @type struct<ParamText>
 * @desc 物品价格显示的文字。
 * @default {"Name":"价格","Show":"true"}
 *
 * @param Scope
 * @text 范围
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"范围","Show":"true"}
 *
 * @param ScopeText
 * @text 范围细则
 * @parent Scope
 * @type text[]
 * @desc 参数的显示设置。
 * @default ["敌方单体","敌方全体","敌方随机1人","敌方随机2人","敌方随机3人","敌方随机4人","我方单体","我方全体","我方死亡单体","我方死亡全体","使用者自身"]
 *
 * @param Consumable
 * @text 消耗品
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"消耗品","Show":"true"}
 *
 * @param Occasion
 * @text 使用场合
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"使用场合","Show":"true"}
 *
 * @param OccasionText
 * @text 使用场合细则
 * @parent Occasion
 * @type text[]
 * @desc 参数的显示设置。
 * @default ["随时可用","战斗","非战斗","无法使用"]
 *
 * @param ShowTopBottomText
 * @text 显示物品自定义附加信息?
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否显示YEP_ItemCore中用备注<Info Text Top>和<Info Text Bottom>添加的信息
 * @default true
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ActionText>
 * ---------------------------------------------------------------------------
 */
/*~struct~ActionText:
 *
 * @param Speed
 * @text 速度补正用语
 * @type struct<ParamText>
 * @desc 速度补正显示的文字。
 * @default {"Name":"速度补正","Show":"true"}
 *
 * @param SuccessRate
 * @text 成功率
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"成功率","Show":"true"}
 *
 * @param Repeats
 * @text 连击次数
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"连击次数","Show":"true"}
 *
 * @param TpGain
 * @text 获得TP
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"获得TP","Show":"true"}
 *
 * @param HitType
 * @text 命中类型
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"命中类型","Show":"true"}
 *
 * @param HitTypeText
 * @text 命中类型细则
 * @parent HitType
 * @type text[]
 * @desc 参数的显示设置。
 * @default ["必中","物伤","法伤"]
 *
 */
/* ---------------------------------------------------------------------------
 * struct<DamageText>
 * ---------------------------------------------------------------------------
 */
/*~struct~DamageText:
 *
 * @param Type
 * @text 伤害类型
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"伤害类型","Show":"true"}
 *
 * @param TypeText
 * @text 伤害类型细则
 * @parent Type
 * @type text[]
 * @desc 参数的显示设置。
 * @default ["HP伤害","MP伤害","HP恢复","MP恢复","HP吸收","MP吸收"]
 *
 * @param Critical
 * @text 暴击
 * @type struct<ParamText>
 * @desc 速度补正显示的文字。
 * @default {"Name":"可暴击","Show":"true"}
 *
 * @param Element
 * @text 伤害属性
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"属性","Show":"true"}
 *
 * @param Formula
 * @text 伤害公式
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"伤害公式","Show":"true"}
 *
 * @param Variance
 * @text 伤害分散度
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"伤害浮动","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SkillCostText>
 * ---------------------------------------------------------------------------
 */
/*~struct~SkillCostText:
 *
 * @param HpFormat
 * @text HP消耗显示格式
 * @desc HP消耗显示格式.
 * %1 - 消耗值     %2 - HP
 * @default %1%2
 *
 * @param HpTextColor
 * @text HP消耗显示颜色
 * @type number
 * @min 0
 * @desc HP消耗显示颜色
 * 默认: 18
 * @default 18
 *
 * @param HpIcon
 * @text HP消耗图标
 * @type number
 * @min 0
 * @desc HP消耗图标ID，0代表没有图标
 * @default 162
 *
 * @param MpFormat
 * @text MP消耗显示格式
 * @desc Adjusts the way MP cost appears in the skill list window.
 * %1 - 消耗值     %2 - MP
 * @default %1%2
 *
 * @param MpTextColor
 * @text MP消耗显示颜色
 * @type number
 * @min 0
 * @desc MP消耗显示颜色
 * 默认: 23
 * @default 23
 *
 * @param MpIcon
 * @text MP消耗图标
 * @type number
 * @min 0
 * @desc MP消耗图标ID，0代表没有图标
 * @default 165
 *
 * @param TpFormat
 * @text TP消耗显示格式
 * @desc Adjusts the way TP cost appears in the skill list window.
 * %1 - 消耗值     %2 - TP
 * @default %1%2
 *
 * @param TpTextColor
 * @text TP消耗显示颜色
 * @type number
 * @min 0
 * @desc TP消耗显示颜色
 * 默认: 29
 * @default 29
 *
 * @param TpIcon
 * @text TP消耗图标
 * @type number
 * @min 0
 * @desc TP消耗图标ID，0代表没有图标
 * @default 164
 *
 * @param CustomCost
 * @text 自定义消耗
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"额外消耗","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ObjRequireText>
 * ---------------------------------------------------------------------------
 */
/*~struct~ObjRequireText:
 *
 * @param WtypeRequire
 * @text 武器类型限制
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"需要武器","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ItemQualitySet>
 * ---------------------------------------------------------------------------
 */
/*~struct~ItemQualitySet:
 *
 * @param QualityText
 * @text 品质名称
 * @desc 品质名称。
 * @default 
 *
 * @param QualityColor
 * @text 品质颜色
 * @type number
 * @min 1
 * @desc 品质颜色序号，填Drill_CoreOfColor中的颜色或高级颜色序号。
 * @default 1
 *
 * @param ColorCategory
 * @text 普通颜色/高级颜色
 * @type select
 * @option 普通颜色
 * @value 普通颜色
 * @option 高级颜色
 * @value 高级颜色
 * @desc 颜色序号属于普通颜色还是高级颜色。
 * @default 普通颜色
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ResistText>
 * ---------------------------------------------------------------------------
 */
/*~struct~ResistText:
 *
 * @param Attribute
 * @text 属性抗性
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"抗性","Show":"true"}
 *
 * @param Debuff
 * @text 弱化抗性
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"弱化抗性","Show":"true"}
 *
 * @param State
 * @text 状态抗性
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"抗性","Show":"true"}
 *
 * @param StateImmunity
 * @text 状态免疫
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"状态免疫","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<NParamText>
 * ---------------------------------------------------------------------------
 */
/*~struct~NParamText:
 *
 * @param MHP
 * @text MHP是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数的显示设置。
 * @default true
 *
 * @param MMP
 * @text MMP是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数的显示设置。
 * @default true
 *
 * @param ATK
 * @text ATK是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数的显示设置。
 * @default true
 *
 * @param DEF
 * @text DEF是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数的显示设置。
 * @default true
 *
 * @param MAT
 * @text MAT是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数的显示设置。
 * @default true
 *
 * @param MDF
 * @text MDF是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数的显示设置。
 * @default true
 *
 * @param AGI
 * @text AGI是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数的显示设置。
 * @default true
 *
 * @param LUK
 * @text LUK是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数的显示设置。
 * @default true
 *
 */
/* ---------------------------------------------------------------------------
 * struct<XParamText>
 * ---------------------------------------------------------------------------
 */
/*~struct~XParamText:
 *
 * @param HIT
 * @text HIT
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"命中率","Show":"true"}
 *
 * @param EVA
 * @text EVA
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"闪避率","Show":"true"}
 *
 * @param CRI
 * @text CRI
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"暴击率","Show":"true"}
 *
 * @param CEV
 * @text CEV
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"暴击闪避率","Show":"true"}
 *
 * @param MEV
 * @text MEV
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"魔法闪避率","Show":"true"}
 *
 * @param MRF
 * @text MRF
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"魔法反射率","Show":"true"}
 *
 * @param CNT
 * @text CNT
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"反击率","Show":"true"}
 *
 * @param HRG
 * @text HRG
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"生命自动回复","Show":"true"}
 *
 * @param MRG
 * @text MRG
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"魔法自动回复","Show":"true"}
 *
 * @param TRG
 * @text TRG
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"怒气自动回复","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SParamText>
 * ---------------------------------------------------------------------------
 */
/*~struct~SParamText:
 *
 * @param TGR
 * @text TGR
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"受到攻击几率","Show":"true"}
 *
 * @param GRD
 * @text GRD
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"防御效果","Show":"true"}
 *
 * @param REC
 * @text REC
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"回复效果","Show":"true"}
 *
 * @param PHA
 * @text PHA
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"药理知识","Show":"true"}
 *
 * @param MCR
 * @text MCR
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"魔法消耗率","Show":"true"}
 *
 * @param TCR
 * @text TCR
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"怒气补充率","Show":"true"}
 *
 * @param PDR
 * @text PDR
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"物理伤害率","Show":"true"}
 *
 * @param MDR
 * @text MDR
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"魔法伤害率","Show":"true"}
 *
 * @param FDR
 * @text FDR
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"地形伤害率","Show":"true"}
 *
 * @param EXR
 * @text EXR
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"经验获得率","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<AttackText>
 * ---------------------------------------------------------------------------
 */
/*~struct~AttackText:
 *
 * @param AtkAttribute
 * @text 攻击时属性
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"攻击属性","Show":"true"}
 *
 * @param AtkState
 * @text 攻击时状态
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"攻击附加状态","Show":"true"}
 *
 * @param AtkSpeed
 * @text 攻击速度补正
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"攻击速度补正","Show":"true"}
 *
 * @param AtkAppend
 * @text 攻击追加次数
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"攻击追加次数","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SkillText>
 * ---------------------------------------------------------------------------
 */
/*~struct~SkillText:
 *
 * @param AddSType
 * @text 添加技能类型
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"添加技能类型","Show":"true"}
 *
 * @param SealStype
 * @text 封印技能类型
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"封印技能类型","Show":"true"}
 *
 * @param AddSkill
 * @text 添加技能
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"添加技能","Show":"true"}
 *
 * @param SealSkill
 * @text 封印技能
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"封印技能","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<EquipText>
 * ---------------------------------------------------------------------------
 */
/*~struct~EquipText:
 *
 * @param EquipWeapon
 * @text 装备武器类型
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"装备武器类型","Show":"true"}
 *
 * @param EquipArmor
 * @text 装备护甲类型
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"装备护甲类型","Show":"true"}
 *
 * @param FixEquip
 * @text 固定装备
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"固定装备","Show":"true"}
 *
 * @param SealEquip
 * @text 封印装备
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"封印装备","Show":"true"}
 *
 * @param EquipSlot
 * @text 装备槽类型
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"装备槽类型","Show":"true"}
 *
 * @param EquipSlotText
 * @text 装备槽类型细则
 * @parent EquipSlot
 * @type text[]
 * @desc 参数的显示设置。
 * @default ["正常","二刀流"]
 *
 */
/* ---------------------------------------------------------------------------
 * struct<BResultText>
 * ---------------------------------------------------------------------------
 */
/*~struct~BResultText:
 *
 * @param EXP
 * @text EXP
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"战斗经验","Show":"true"}
 *
 * @param GOLD
 * @text GOLD
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"金币掉落","Show":"true"}
 *
 * @param ITEM
 * @text ITEM
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"物品爆率","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<OtherTraitText>
 * ---------------------------------------------------------------------------
 */
/*~struct~OtherTraitText:
 *
 * @param MoreAction
 * @text 增加行动次数
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"增加行动次数","Show":"true"}
 *
 * @param SpecialSign
 * @text 特殊标志
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"特殊标志","Show":"true"}
 *
 * @param SpecialSignText
 * @text 特殊标志细则
 * @parent SpecialSign
 * @type text[]
 * @desc 参数的显示设置。
 * @default ["自动战斗","启用防御","可援护","保留怒气"]
 *
 * @param DisappearEffect
 * @text 消失效果
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"消失效果","Show":"true"}
 *
 * @param DisappearEffectText
 * @text 消失效果细则
 * @parent DisappearEffect
 * @type text[]
 * @desc 参数的显示设置。
 * @default ["正常消失","Boss消失","瞬间消失","不消失"]
 *
 * @param PartyAbility
 * @text 队伍能力
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"队伍能力","Show":"true"}
 *
 * @param PartyAbilityText
 * @text 队伍能力细则
 * @parent PartyAbility
 * @type text[]
 * @desc 参数的显示设置。
 * @default ["遇敌减半","无遇敌","取消偷袭","增加先发制人率","双倍金钱","双倍掉落物品"]
 *
 */
/* ---------------------------------------------------------------------------
 * struct<RecoverText>
 * ---------------------------------------------------------------------------
 */
/*~struct~RecoverText:
 *
 * @param HPRecover
 * @text HP回复
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"回复HP","Show":"true"}
 *
 * @param HPCost
 * @text HP消耗
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"消耗HP","Show":"true"}
 *
 * @param MPRecover
 * @text MP回复
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"回复MP","Show":"true"}
 *
 * @param MPCost
 * @text MP消耗
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"消耗MP","Show":"true"}
 *
 * @param TPRecover
 * @text TP回复
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"回复TP","Show":"true"}
 *
 * @param TPCost
 * @text TP消耗
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"消耗TP","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<StateBuffText>
 * ---------------------------------------------------------------------------
 */
/*~struct~StateBuffText:
 *
 * @param AddState
 * @text 附加状态
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"附加状态","Show":"true"}
 *
 * @param RemoveState
 * @text 解除状态
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"解除状态","Show":"true"}
 *
 * @param AddBuff
 * @text 强化
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"强化","Show":"true"}
 *
 * @param AddDebuff
 * @text 弱化
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"弱化","Show":"true"}
 *
 * @param RemoveBuff
 * @text 解除强化
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"解除强化","Show":"true"}
 *
 * @param RemoveDebuff
 * @text 解除弱化
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"解除弱化","Show":"true"}
 *
 * @param TurnText
 * @text 回合用语
 * @desc 参数的显示设置。
 * @default 回合
 *
 */
/* ---------------------------------------------------------------------------
 * struct<OtherEffectText>
 * ---------------------------------------------------------------------------
 */
/*~struct~OtherEffectText:
 *
 * @param SpecialEffect
 * @text 特殊效果
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"特殊效果","Show":"true"}
 *
 * @param GrowUp
 * @text 成长
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"永久提升","Show":"true"}
 *
 * @param LearnSkill
 * @text 学会技能
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"学会技能","Show":"true"}
 *
 * @param CommonEvent
 * @text 公共事件
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"特殊","Show":"true"}
 *
 * @param EscapeText
 * @text 逃跑用语
 * @desc 参数的显示设置。
 * @default 逃跑
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ParamText>
 * ---------------------------------------------------------------------------
 */
/*~struct~ParamText:
 *
 * @param Name
 * @text 参数用语
 * @desc 参数的显示名称。
 * @default 
 *
 * @param Show
 * @text 参数是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数是否显示。
 * @default true
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_ObjectInfoWindow');
GT.Param = GT.Param || {};

//General
GT.Param.OIWAutoShowWindow = eval(GT.Parameters['AutoShowWindow']);
GT.Param.OIWMaxRows = JSON.parse(GT.Parameters['MaxRowsList']);
GT.Param.OIWSwitchBtn = JSON.parse(GT.Parameters['SwitchBtn']);
GT.Param.OIWDecimalDigit = Number(GT.Parameters['DecimalDigit']);

GT.Param.OIWColorSet = JSON.parse(GT.Parameters['ColorSet']);

//SceneSet
GT.Param.OIWSceneItemSet = JSON.parse(GT.Parameters['Scene_Item']);
GT.Param.OIWSceneSkillSet = JSON.parse(GT.Parameters['Scene_Skill']);
GT.Param.OIWSceneEquipSet = JSON.parse(GT.Parameters['Scene_Equip']);
GT.Param.OIWSceneShopSet = JSON.parse(GT.Parameters['Scene_Shop']);
GT.Param.OIWSceneBattleSet = JSON.parse(GT.Parameters['Scene_Battle']);
GT.Param.OIWSceneSTSSet = JSON.parse(GT.Parameters['Scene_STS']);

//Text
GT.Param.OIWShowIcon = eval(GT.Parameters['ShowIcon']);
GT.Param.OIWMainText = JSON.parse(GT.Parameters['MainText']);
GT.Param.OIWActionText = JSON.parse(GT.Parameters['ActionText']);
GT.Param.OIWDamageText = JSON.parse(GT.Parameters['DamageText']);
GT.Param.OIWSkillCostText = JSON.parse(GT.Parameters['SkillCostText']);
GT.Param.OIWObjRequireText = JSON.parse(GT.Parameters['ObjRequireText']);
GT.Param.OIWQualitySet = JSON.parse(GT.Parameters['QualitySet']);

//Trait
GT.Param.OIWResistText = JSON.parse(GT.Parameters['ResistText']);
GT.Param.OIWNParamTextShow = JSON.parse(GT.Parameters['NParamText']);
GT.Param.OIWXParamText = JSON.parse(GT.Parameters['XParamText']);
GT.Param.OIWSParamText = JSON.parse(GT.Parameters['SParamText']);
GT.Param.OIWAttackText = JSON.parse(GT.Parameters['AttackText']);
GT.Param.OIWSkillText = JSON.parse(GT.Parameters['SkillText']);
GT.Param.OIWEquipText = JSON.parse(GT.Parameters['EquipText']);
GT.Param.OIWBResultText = JSON.parse(GT.Parameters['BResultText']);
GT.Param.OIWOtherTraitText = JSON.parse(GT.Parameters['OtherTraitText']);

//EffectText
GT.Param.OIWRecoverText = JSON.parse(GT.Parameters['RecoverText']);
GT.Param.OIWStateBuffText = JSON.parse(GT.Parameters['StateBuffText']);
GT.Param.OIWOtherEffectText = JSON.parse(GT.Parameters['OtherEffectText']);

//=============================================================================
// DataManager
//=============================================================================

GT.OIWin.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!GT.OIWin.DataManager_isDatabaseLoaded.call(this)) 
		return false;
    if (!GT._loaded_GT_OIWin) {
		this.processOIWinNotetags($dataItems);
        this.processOIWinNotetags($dataWeapons);
        this.processOIWinNotetags($dataArmors);
		this.processOIWinNotetags($dataSkills);
        GT._loaded_GT_OIWin = true;
    }
    return true;
};

DataManager.processOIWinNotetags = function (group) {
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        this.setupObjectInfoNotetags(obj);
    }
};

DataManager.setupObjectInfoNotetags = function (obj) {
	var note1 = /<(?:描述)([前后PA]):(.+)>/;
	var note2 = /<(?:顶部信息)>/i;
	var note3 = /<\/(?:顶部信息)>/i;
	var note4 = /<(?:底部信息)>/i;
	var note5 = /<\/(?:底部信息)>/i;
	var note6 = /<(?:帮助插入):([前后PA])>/;
	
    var notedata = obj.note.split(/[\r\n]+/);
	obj.preInfos = [];
	obj.afterInfos = [];
	obj.topInfoText = [];
	obj.bottomInfoText = [];
	var evalMode = 'none';
	
    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(note1)) {
			if (RegExp.$1 === '前' || RegExp.$1 === 'P') 
				obj.preInfos.push(RegExp.$2);
            if (RegExp.$1 === '后' || RegExp.$1 === 'A') 
				obj.afterInfos.push(RegExp.$2);
        }
		else if (line.match(note2)) {
            evalMode = 'info text top';
        } 
		else if (line.match(note3)) {
            evalMode = 'none';
        } 
		else if (line.match(note4)) {
            evalMode = 'info text bottom';
        } 
		else if (line.match(note5)) {
            evalMode = 'none';
        }
		else if (line.match(note6) && obj.description !== '') {
			if (RegExp.$1 === '前' || RegExp.$1 === 'P') 
				obj.topInfoText = obj.topInfoText.concat(obj.description.split(/[\r\n]+/));
            if (RegExp.$1 === '后' || RegExp.$1 === 'A') 
				obj.bottomInfoText = obj.bottomInfoText.concat(obj.description.split(/[\r\n]+/));
        }
		else if (evalMode === 'info text top') {
            obj.topInfoText.push(line);
        } 
		else if (evalMode === 'info text bottom') {
            obj.bottomInfoText.push(line);
        }
    }
};

//=============================================================================
// Window_ObjectInfo
//=============================================================================

function Window_ObjectInfo() {
	this.initialize.apply(this, arguments);
}

Window_ObjectInfo.prototype = Object.create(Window_Base.prototype);
Window_ObjectInfo.prototype.constructor = Window_ObjectInfo;

Window_ObjectInfo.prototype.initialize = function(windowSet) {
	this._windowSet = windowSet;
	this._item = null;
	this._actor = null;
	this._category = '';
	this._data = [];
	this._textTop = [];
	this._textBottom = [];
	this._damageData = [];
	this._costData = [];
	this._requireData = [];
	this._lastData = [];
	this._showInfo = GT.Param.OIWAutoShowWindow;
	Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this.openness = 0;
	this.opacity = Number(this._windowSet.WindowOpacity);
};

Window_ObjectInfo.prototype.loadWindowskin = function () {
	this.windowskin = ImageManager.loadSystem(String(this._windowSet.WindowSkin));
};

Window_ObjectInfo.prototype.updateTone = function () {};

Window_ObjectInfo.prototype.scaleRate = function () {
	return Number(this._windowSet.WindowScale);
};

Window_ObjectInfo.prototype.lineHeight = function () {
	return Math.round(36 * this.scaleRate());
};

Window_ObjectInfo.prototype.standardFontSize = function () {
	return Math.round(28 * this.scaleRate());
};

Window_ObjectInfo.prototype.standardPadding = function () {
	return Math.round(18 * this.scaleRate());
};

Window_ObjectInfo.prototype.textPadding = function () {
	return Math.round(6 * this.scaleRate());
};

Window_ObjectInfo.prototype.maxCols = function() {
	if (eval(this._windowSet.FixWindow) && eval(this._windowSet.FixMaxCols))
		return 1;
	var rows = GT.Param.OIWMaxRows;
	rows = [0].concat(rows);
	var length = this.dataLength();
	for (var i = 0; i < rows.length - 1; i++) {
		if (length >= rows[i] && length < rows[i + 1]) 
			return i + 1;
	}
	return rows.length;
};

Window_ObjectInfo.prototype.dataLength = function() {
	var length = this._data.length + this._textTop.length + this._textBottom.length + this._damageData.length + this._requireData.length + this._costData.length;
	return length;
};

Window_ObjectInfo.prototype.processDrawIcon = function (iconIndex, textState) {
	this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
	textState.x += Math.round((32 + 4) * this.scaleRate());
};

Window_ObjectInfo.prototype.drawIcon = function (iconIndex, x, y) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = 32;
	var ph = 32;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	var rate = this.scaleRate();
	this.contents._context.imageSmoothingEnabled = false;
	this.contents.blt(bitmap, sx, sy, pw, ph, x, y, Math.round(pw * rate), Math.round(ph * rate));
	this.contents._context.imageSmoothingEnabled = true;
};

Window_ObjectInfo.prototype.setActor = function (actor) {
	if (this._actor !== actor) {
		this._actor = actor;
	}
};

Window_ObjectInfo.prototype.setItem = function (item, targetWindow) {
	if (Imported.FTKR_STS && SceneManager._scene instanceof Scene_STS && item && item.id) { 
	    item = $dataSkills[item.id]; 
	}
	if (this._item === item) return;
	this._item = item;
	this._targetWindow = targetWindow;
	if (SceneManager._scene instanceof Scene_Battle && targetWindow._actor) {
		this.setActor(targetWindow._actor);
	}
	this.makeObjInfo();
	if (this.dataLength() > 0 && this._showInfo) {
		this.calculateWindowSize();
		this.refresh();
		this.updatePosition(targetWindow);
		this.open();
	}
	else {
		this.close();
	}
};

Window_ObjectInfo.prototype.makeObjInfo = function () {
	var item = this._item;
	this._data = [];
	this._textTop = [];
	this._textBottom = [];
	this._damageData = [];
	this._costData = [];
	this._requireData = [];
	this._lastData = [];
	if (!item) return;
	this.getObjCategory();
	this.getObjInfoText();
	this.getObjPreInfos();
	if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
		this.getEquipInfo();
	}
	else if (DataManager.isSkill(item)) {
		if(item.stypeId == 6) this.getSkillCul();
		else if(item.stypeId == 4) this.getSkillP();
		else this.getSkillInfo();
	}
	this.getObjAfterInfos();
	this.getObjLastInfo();
};

Window_ObjectInfo.prototype.getItemInfo = function () {
	this.getObjScope();
	this.getObjOccasion();
	this.getObjAction();
	this.getObjDamage();
	this.getObjEffects();
};

Window_ObjectInfo.prototype.getEquipInfo = function () {
	var item = this._item;
	this.getObjBaseParam();
	this.getObjTraits(item);
	this.getEquipCul(item);
};

Window_ObjectInfo.prototype.getEquipCul = function (item) {
	if(!DataManager.isArmor(item)) return;
	if(item.id < 80){
		let nameList = ['DEP_攻撃力','DEP_防御力','DEP_魔法力','DEP_魔法防御','DEP_敏捷性'];
		for(var i = 0; i < nameList.length; i++){
			var a = $gameActors.actor(1);
			var k = eval(item.meta[nameList[i]]);
			if(!k) continue;
			var text = nameList[i].slice(4);
			text += Number(k) > 0 ? this.addIncreaseColor('+' + k) : this.addDecreaseColor(k);
			this.pushData(text, this._item);
		}
	}
	this.getCul(item);
};

Window_ObjectInfo.prototype.getSkillCul = function () {
	if(!this._item) return;
	var item = this._item;
	for(var i = 0; i < $gameActors.actor(1)._states.length; i++){
		var s = $dataStates[$gameActors.actor(1)._states[i]];
		if(s.name == item.name){
			if (!s.traits) break;
			s.traits.forEach(function(trait) {
				var code = trait.code;
				if (code > 10 && code < 15) this.getObjTraitResist(trait, s);
				else if (code > 20 && code < 24) this.getObjTraitParam(trait, s);
				else if (code > 30 && code < 35) this.getObjTraitAttack(trait, s);
				else if ([41,42,44].includes(code)) this.getObjTraitSkill(trait, s);
				else if (code > 50 && code < 56) this.getObjTraitEquip(trait, s);
				else if (code > 60 && code < 65) this.getObjTraitOther(trait, s);
			}, this);
			break;
		}
	}
	if(item.meta.flag != "SkillEffect") return;
	this.getCul(item);
};

Window_ObjectInfo.prototype.getSkillP = function () {
	if(!this._item) return;
	var item = this._item;
	let nameList = [
	['HP','MP','攻击力','防御力','魔法力','魔法防御','敏捷性','运气'],
	['命中率','回避率','会心率','会心回避率','魔法回避率','魔法反射率','反击率','HP再生','MP再生','SP再生'],
	['被狙击概率','防御效果','回复效率','草药知识','MP消费率','TP恢复率','物理伤害率','魔法伤害率','地形伤害率','经验获取率']
	]
	var j = 0;
	for(var i = 0; i <= 7; i++){
		this.iteratePassiveSkill('passivePBST' + ('0'+i).slice(-1),nameList[j][i]);
	}
	j++;
	for(var i = 0; i <= 9; i++){
		this.iteratePassiveSkill('passiveXPBST' + ('0'+i).slice(-1),nameList[j][i]);
	}
	j++;
	for(var i = 0; i <= 9; i++){
		this.iteratePassiveSkill('passiveSPBST' + ('0'+i).slice(-1),nameList[j][i]);
	}
	if(item.meta.flag != "SkillEffect") return;
	this.getCul(item);
};

Window_ObjectInfo.prototype.iteratePassiveSkill = function(metaName,firstName){
	var k = this._item.meta[metaName];
	if(!k) return;
	var text = firstName;
	text += Number(k.replace("%","")) > 0 ? this.addIncreaseColor('+' + k) : this.addDecreaseColor(k);
	this.pushData(text, this._item);
};


Window_ObjectInfo.prototype.getCul = function (item) {
	let v = [item.meta.Skill01,item.meta.Skill02,item.meta.Skill03,item.meta.Skill04,item.meta.Skill05,item.meta.Skill06,item.meta.Skill07,item.meta.Skill08,item.meta.Skill09,item.meta.Skill10];
	for(var i = 0; i < v.length; i++){
        if(v[i] && v[i][0]){
			var n = v[i][0];
			var k = v[i][1]
			if($tag_skill_list[n].name){
				var text = $tag_skill_list[n].name;
				text += k > 0 ? this.addIncreaseColor('+' + k) : this.addDecreaseColor(k);
				this.pushData(text, item);
			}
         }
    }
}

Window_ObjectInfo.prototype.getSkillInfo = function () {
	this.getObjScope();
	this.getObjOccasion();
	this.getObjAction();
	this.getObjDamage();
	this.getObjEffects();
	this.getSkillWeaponRequirements();
	this.getObjCost();
};

Window_ObjectInfo.prototype.getObjCategory = function() {
	var item = this._item;
	var text = '';
	if (item.itemCategory && item.itemCategory.length) {
		for (var i = 0; i < item.itemCategory.length; i++) { 
		    if (text !== '') text += '/';
		    text += item.itemCategory[i];
		}
	}
	else if (DataManager.isItem(item)) {
		if (text !== '') text += '/';
		if (item.itypeId === 1)
		    text += TextManager.item;
		else if (item.itypeId === 2)
			text += TextManager.keyItem;
	}
	if (DataManager.isWeapon(item)) {
		if (text !== '') text += '/';
		text += $dataSystem.weaponTypes[item.wtypeId];
	}
	else if (DataManager.isArmor(item)) {
		if (text !== '') text += '/';
		text += $dataSystem.equipTypes[item.etypeId];
	}
	else if (DataManager.isSkill(item)) {
		text = this.getSkillType(item);
	}
	if (item.consumable && this.getObjTextShow('OIWMainText','Consumable'))
		text += '/' + String(JSON.parse(GT.Param.OIWMainText.Consumable).Name);
	this._category = text;
};

Window_ObjectInfo.prototype.getSkillType = function(item) {
	return $dataSystem.skillTypes[item.stypeId];
};
	
Window_ObjectInfo.prototype.getObjPreInfos = function() {
	var item = this._item;
	if (item.baseItemId)
		item = DataManager.getBaseItem(item);
	if (item.preInfos && item.preInfos.length) {
		this._data = this._data.concat(item.preInfos);
	}
};

Window_ObjectInfo.prototype.getObjAfterInfos = function() {
	var item = this._item;
	if (item.baseItemId)
		item = DataManager.getBaseItem(item);
	if (item.afterInfos && item.afterInfos.length)
		this._data = this._data.concat(item.afterInfos);
};

Window_ObjectInfo.prototype.getObjInfoText = function() {
	var item = this._item;
	if (item.baseItemId)
		item = DataManager.getBaseItem(item);
	if (item.topInfoText && item.topInfoText.length) 
	    this._textTop = this._textTop.concat(item.topInfoText);
	if (item.bottomInfoText && item.bottomInfoText.length) 
	    this._textBottom = this._textBottom.concat(item.bottomInfoText);
	if (Imported.YEP_ItemCore && eval(GT.Param.OIWMainText.ShowTopBottomText)) {
		if (item.infoTextTop && item.infoTextTop !== '')
			this._textTop = this._textTop.concat(item.infoTextTop.split(/[\r\n]+/));
		if (item.infoTextBottom && item.infoTextBottom !== '')
			this._textBottom = this._textBottom.concat(item.infoTextBottom.split(/[\r\n]+/));
	}
};

Window_ObjectInfo.prototype.getObjScope = function() {
	var item = this._item;
	if (item.scope === 0 || !this.getObjTextShow('OIWMainText','Scope')) return;
	var text = this.getObjText('OIWMainText','Scope') + this.textColon();
	var scopeText = JSON.parse(GT.Param.OIWMainText.ScopeText);
	text += this.addBasicColor(scopeText[item.scope - 1]);
	this._data.push(text);
};

Window_ObjectInfo.prototype.getObjOccasion = function() {
	var item = this._item;
	if (!this.getObjTextShow('OIWMainText', 'Occasion')) return;
	if (item.passiveStates && item.passiveStates.length && item.occasion === 3) return;
	var text = this.getObjText('OIWMainText', 'Occasion') + this.textColon();
	var occaText = JSON.parse(GT.Param.OIWMainText.OccasionText);
	text += this.addBasicColor(occaText[item.occasion]);
	this._data.push(text);
};

Window_ObjectInfo.prototype.getObjAction = function() {
	var item = this._item;
	var category = 'OIWActionText';
	var text = '';
	if (this.getObjTextShow(category, 'Speed') && item.speed !== 0) {
		text = this.getObjText(category, 'Speed') + this.textColon();
		if (item.speed > 0)  
			text += this.addIncreaseColor('+' + Math.floor(item.speed));
		else
			text += this.addIncreaseColor(Math.floor(item.speed));
		this._data.push(text);
	}
	if (this.getObjTextShow(category, 'SuccessRate')) {
		if (!item.passiveStates || !item.passiveStates.length) {
			text = this.getObjText(category, 'SuccessRate') + this.textColon(); 
			text += this.addBasicColor(Math.floor(item.successRate) + '%');
			this._data.push(text);
		}
	}
	if (this.getObjTextShow(category, 'Repeats') && item.repeats !== 1) {
		text = this.getObjText(category, 'Repeats') + this.textColon(); 
		text += this.addBasicColor(Math.floor(item.repeats));
		this._data.push(text);
	}
	if (this.getObjTextShow(category, 'TpGain') && item.tpGain !== 0) {
		text = this.getObjText(category, 'TpGain') + this.textColon(); 
		text += this.addBasicColor(Math.floor(item.tpGain));
		this._data.push(text);
	}
	if (this.getObjTextShow(category, 'HitType')) {
		if (!item.passiveStates || !item.passiveStates.length) {
			text = this.getObjText(category, 'HitType') + this.textColon(); 
			var hitTypeText = JSON.parse(GT.Param.OIWActionText.HitTypeText);
			text += this.addBasicColor(hitTypeText[item.hitType]);
			this._data.push(text);
		}
	}
};

Window_ObjectInfo.prototype.getObjDamage = function() {
	var item = this._item;
	if (item.damage.type <= 0) return;
	var category = 'OIWDamageText';
	var damage = item.damage;
	var text = '';
	if (this.getObjTextShow(category, 'Type')) {
		text = this.getObjText(category, 'Type') + this.textColon();
		var damageTypeText = JSON.parse(GT.Param.OIWDamageText.TypeText);
		text += this.addBasicColor(damageTypeText[damage.type - 1]);
		text = this.getObjDamageEle(text, damage);
		if (damage.critical && this.getObjTextShow(category, 'Critical')) 
			text += this.addBasicColor('/' + this.getObjText(category, 'Critical', 1));
		this._damageData.push(text);
	}
	if (this.getObjTextShow(category, 'Formula')) {
		text = this.getObjText(category, 'Formula') + this.textColon(); 
		text += this.addBasicColor(damage.formula);
		this._damageData.push(text);
	}
	if (this.getObjTextShow(category, 'Variance') && damage.variance !== 0) {
		text = this.getObjText(category, 'Variance') + this.textColon(); 
		text += this.addBasicColor(Math.floor(damage.variance) + '%');
		this._damageData.push(text);
	}
};

Window_ObjectInfo.prototype.getObjDamageEle = function(text, damage) {
	var category = 'OIWDamageText';
	if (!this.getObjTextShow(category, 'Element')) return text;
	if (damage.elementId > 0) {
		text += this.addBasicColor('/' + $dataSystem.elements[damage.elementId] + this.getObjText(category, 'Element', 1));
	}
	return text;
};

Window_ObjectInfo.prototype.getObjCost = function() {
	var item = this._item;
	if (Imported.YEP_SkillCore)
		this.getObjHMTpCost(item, 'Hp');
	this.getObjHMTpCost(item, 'Mp');
	this.getObjHMTpCost(item, 'Tp');
	if (!this._lastData.length) this._lastData.push('---');
	this.getObjOtherCost(item);
	this.getObjCustomDisplayCost(item);
};

Window_ObjectInfo.prototype.getObjOtherCost = function(item) {
};

Window_ObjectInfo.prototype.getObjHMTpCost = function(skill, code) {
	if (!this._actor) return;
    if (this._actor['skill' + code + 'Cost'](skill) <= 0) return;
	var fmt = String(GT.Param.OIWSkillCostText[code + 'Format']);
	var color = Number(GT.Param.OIWSkillCostText[code + 'TextColor']);
	var icon = Number(GT.Param.OIWSkillCostText[code + 'Icon']);
	var text = fmt.format(this._actor['skill' + code + 'Cost'](skill), TextManager[code.toLowerCase() + 'A']);
	text = '\\c[' + color + ']' + text;
    if (icon > 0) {
		text += '\\I[' + icon + ']';
    }
	this._lastData.push(text);
};

Window_ObjectInfo.prototype.getObjCustomDisplayCost = function(skill) {
	if (!Imported.YEP_SkillCore) return;
	if (!this.getObjTextShow('OIWSkillCostText','CustomCost')) return;
    if (skill.customCostText === '') return;
	var text = this.getObjText('OIWSkillCostText','CustomCost') + this.textColon() + skill.customCostText;
	this._costData.push(text);
};

Window_ObjectInfo.prototype.getObjBaseParam = function () {
	var item = this._item;
	if (!item.params) return;
	var codeList = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
	for (var i = 0; i < 8; i++) {			
		var value = item.params[i];
		var show = eval(GT.Param.OIWNParamTextShow[codeList[i]]);
		if (value !== 0 && show) {
			var text = this.addSystemColor(TextManager.param(i));
			text += value > 0 ? this.addIncreaseColor('+' + Math.round(value)) : this.addDecreaseColor(Math.round(value));
			this._data.push(text);
		}
	}
};

Window_ObjectInfo.prototype.getObjTraits = function (item) {
	if (!item.traits) return;
	item.traits.forEach(function(trait) {
		var code = trait.code;
		if (code > 10 && code < 15) 
			this.getObjTraitResist(trait, item);
		else if (code > 20 && code < 24) 
			this.getObjTraitParam(trait, item);
		else if (code > 30 && code < 35) 
			this.getObjTraitAttack(trait, item);
		else if (code > 40 && code < 45) 
			this.getObjTraitSkill(trait, item);
		else if (code > 50 && code < 56) 
			this.getObjTraitEquip(trait, item);
		else if (code > 60 && code < 65)
			this.getObjTraitOther(trait, item);
	}, this);
};

Window_ObjectInfo.prototype.getObjEffects = function() {
	if (!this._item.effects) return;
	this._item.effects.forEach(function(effect) {
		var code = effect.code;
		if (code > 10 && code < 14) 
			this.getObjEffectValue(effect);
		else if (code > 20 && code < 23) 
			this.getObjEffectState(effect);
		else if (code > 30 && code < 35) 
			this.getObjEffectBuff(effect);
		else if (code > 40 && code < 45) 
			this.getObjEffectOther(effect);
	}, this);
};

Window_ObjectInfo.prototype.getObjTraitResist = function(trait, item) {
	var category = 'OIWResistText';
	var codeList = ['Attribute', 'Debuff', 'State', 'StateImmunity'];
	var code = codeList[(trait.code % 10) - 1];
	if (this.getObjTextShow(category, code)) {
		var dataId = trait.dataId;
		var value = 100 - trait.value * 100;
		if (code === 'StateImmunity') {
			var state = $dataStates[dataId];
			var text = this.getObjText(category, code) + this.textColon();
			if (GT.Param.OIWShowIcon && state.iconIndex !== 0) 
				text += '\\I['+ state.iconIndex + ']';
			text += this.addBasicColor(state.name);
			return this.pushData(text, item);
		}
		if (code === 'Attribute')
			var text = $dataSystem.elements[dataId];
		else if (code === 'Debuff')
			var text = TextManager.param(dataId);
		else {
			var state = $dataStates[dataId];
			var text = state.name;
			if (GT.Param.OIWShowIcon && state.iconIndex !== 0) 
				text = '\\I['+ state.iconIndex + ']' + text;
		}
		text = this.addSystemColor(text);
		text += this.getObjText(category, code); 
		text += value > 0 ? this.addIncreaseColor('+' + this.sortValueDD(value) + '%') : this.addDecreaseColor(this.sortValueDD(value) + '%');
		this.pushData(text, item);
	}
};

Window_ObjectInfo.prototype.getObjTraitParam = function(trait, item) {
	var categoryList = ['OIWNParamText', 'OIWXParamText', 'OIWSParamText'];
	var category = categoryList[(trait.code % 20) - 1];
	var dataId = trait.dataId;
	var value = trait.value;
	if (category === 'OIWNParamText') {
		var codeList = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
		var code = codeList[dataId];
		if (eval(GT.Param.OIWNParamTextShow[code]) && value !== 1.0) {
			var text = this.addSystemColor(TextManager.param(dataId));
			var valueText = '\u00d7' + Math.round(this.sortValueDD(value * 100)) + '%';
			valueText = value > 1.0 ? this.addIncreaseColor(valueText) : this.addDecreaseColor(valueText);
			text += valueText;
			this.pushData(text, item);
		}
	}
	if (category === 'OIWXParamText') {
		var codeList = ['HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'];
		var code = codeList[dataId];
		if (this.getObjTextShow(category, code) && value !== 0) {
			var text = this.getObjText(category, code);
			var valueText = Math.round(this.sortValueDD(value * 100)) + '%';
			valueText = value > 0 ? this.addIncreaseColor('+' + valueText) : this.addDecreaseColor(valueText);
			text += valueText;
			this.pushData(text, item);
		}
	}
	if (category === 'OIWSParamText') {
		var codeList = ['TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];
		var code = codeList[dataId];
		if (this.getObjTextShow(category, code) && value !== 1.0) {
			var text = this.getObjText(category, code);
			var valueText = '\u00d7' + Math.round(this.sortValueDD(value * 100)) + '%';
			valueText = this.addBasicColor(valueText);
			text += valueText;
			this.pushData(text, item);
		}
	}
};

Window_ObjectInfo.prototype.getObjTraitAttack = function(trait, item) {
	var category = 'OIWAttackText';
	var codeList = ['AtkAttribute', 'AtkState', 'AtkSpeed', 'AtkAppend'];
	var code = codeList[(trait.code % 30) - 1];
	var dataId = trait.dataId;
    var value = trait.value;
	var force = [33, 34].contains(trait.code) ? (value !== 0) : true;
	if (this.getObjTextShow(category, code) && force) {
		if (code === 'AtkAttribute')
			var text = this.addBasicColor($dataSystem.elements[dataId]);
		else if (code === 'AtkState') {
			var text = '';
			if (GT.Param.OIWShowIcon && $dataStates[dataId].iconIndex) 
				text += '\\I['+ $dataStates[dataId].iconIndex + ']';
			text += this.addBasicColor($dataStates[dataId].name + ' ' + Math.floor(this.sortValueDD(value * 100)) + '%');
		}
		else if (value > 0)
			var text = this.addIncreaseColor('+' + Math.floor(value));
		else
			var text = this.addDecreaseColor(Math.floor(value));
		text = this.getObjText(category, code) + this.textColon() + text;
		this.pushData(text, item);
	}
};

Window_ObjectInfo.prototype.getObjTraitSkill = function(trait, item) {
	var category = 'OIWSkillText';
	var codeList = ['AddSType', 'SealStype', 'AddSkill', 'SealSkill'];
	var code = codeList[(trait.code % 40) - 1];
	if (this.getObjTextShow(category, code)) {
		var dataId = trait.dataId;
		if (code === 'AddSType' || code === 'SealStype')
			var text = $dataSystem.skillTypes[dataId];
		else {
			var text = $dataSkills[dataId].name;
			if (GT.Param.OIWShowIcon && $dataSkills[dataId].iconIndex)
				text = '\\I['+ $dataSkills[dataId].iconIndex + ']' + text;
		}
		text = this.getObjText(category, code) + this.textColon() + this.addBasicColor(text);
		this.pushData(text, item);
	}
};

Window_ObjectInfo.prototype.getObjTraitEquip = function(trait, item) {
	var category = 'OIWEquipText';
	var codeList = ['EquipWeapon', 'EquipArmor', 'FixEquip', 'SealEquip', 'EquipSlot'];
	var code = codeList[(trait.code % 50) - 1];
	if (this.getObjTextShow(category, code)) {
		var dataId = trait.dataId;
		if (code === 'EquipWeapon')
			var text = $dataSystem.weaponTypes[dataId];
		else if (code === 'EquipArmor')
			var text = $dataSystem.armorTypes[dataId];
		else if (code === 'EquipSlot')
			var text = String(JSON.parse(GT.Param.OIWEquipText.EquipSlotText)[dataId]);
		else 
			var text = $dataSystem.equipTypes[dataId];
		text = this.getObjText(category, code) + this.textColon() + this.addBasicColor(text);
		this.pushData(text, item);
	}
};

Window_ObjectInfo.prototype.getObjTraitOther = function(trait, item) {
	var category = 'OIWOtherTraitText';
	var codeList = ['MoreAction', 'SpecialSign', 'DisappearEffect', 'PartyAbility'];
	var code = codeList[(trait.code % 60) - 1];
	if (this.getObjTextShow(category, code)) {
		var dataId = trait.dataId;
		if (code === 'MoreAction') {
			var text = this.sortValueDD(trait.value * 100) + '%';
		}
		else 
			var text = String(JSON.parse(GT.Param[category][code + 'Text'])[dataId]);
		text = this.getObjText(category, code) + this.textColon() + this.addBasicColor(text);
		this.pushData(text, item);
	}
};

Window_ObjectInfo.prototype.getObjEffectValue = function(effect) {
	var category = 'OIWRecoverText';
	var codeList1 = ['HPRecover', 'MPRecover', 'TPRecover'];
	var codeList2 = ['HPCost', 'MPCost', 'TPCost'];
	var code1 = codeList1[(effect.code % 10) - 1];
	var code2 = codeList2[(effect.code % 10) - 1];
	var text = '';
	var both = false;
	if (code1 === 'TPRecover' && code2 === 'TPCost') {
		if(this.getObjTextShow(category, code1)){
			text = this.getObjText(category, code1) + this.textColon();
			text += this.addIncreaseColor(Math.floor(effect.value1));
			this._data.push(text);
		}
		return;
	}
	if (this.getObjTextShow(category, code1)) {
		text = this.getObjText(category, code1) + this.textColon();
		if (effect.value1 > 0) {
			text += this.addIncreaseColor(this.sortValueDD(effect.value1 * 100) + '%');
			both = true;
		}
		if(effect.value2 > 0){
			if (both) text += this.addIncreaseColor('+');
			text += this.addIncreaseColor(Math.floor(effect.value2));
		}
		if(effect.value1 > 0 || effect.value2 > 0) this._data.push(text);
	}
	both = false;
	if (this.getObjTextShow(category, code2)) {
		text = this.getObjText(category, code2) + this.textColon();
		if (effect.value1 < 0) {
			text += this.addDecreaseColor(Math.abs(this.sortValueDD(effect.value1 * 100)) + '%');
			both = true;
		}
		if(effect.value2 < 0){
			if (both) text += this.addDecreaseColor('+');
			text += this.addDecreaseColor(Math.abs(Math.floor(effect.value2)));
		}
		if(effect.value1 < 0 || effect.value2 < 0) this._data.push(text);
	}
};

Window_ObjectInfo.prototype.getObjEffectState = function(effect) {
	var category = 'OIWStateBuffText';
	var codeList = ['AddState', 'RemoveState'];
	var code = codeList[(effect.code % 20) - 1];
	if(this.getObjTextShow(category, code)){
		var state = $dataStates[effect.dataId];
		if (state && effect.value1 > 0) { 
			var text = this.getObjText(category, code) + this.textColon();
			if (GT.Param.OIWShowIcon && state.iconIndex !== 0) 
				text += '\\I['+ state.iconIndex + ']';
			text += this.addBasicColor(state.name + ' ' + this.sortValueDD(effect.value1 * 100) + '%');
			this._data.push(text);
		}
	}
};

Window_ObjectInfo.prototype.getObjEffectBuff = function(effect) {
	var category = 'OIWStateBuffText';
	var codeList = ['AddBuff', 'AddDebuff', 'RemoveBuff', 'RemoveDebuff'];
	var code = codeList[(effect.code % 30) - 1];
	if(this.getObjTextShow(category, code)){
		var name = TextManager.param(effect.dataId);
        if (code === 'AddBuff' || code === 'RemoveBuff')		
		    var icon = Game_BattlerBase.ICON_BUFF_START + effect.dataId;
		if (code === 'AddDebuff' || code === 'RemoveDebuff')		
		    var icon = Game_BattlerBase.ICON_DEBUFF_START + effect.dataId;
		var turnText = String(GT.Param.OIWStateBuffText.TurnText);
		var text = this.getObjText(category, code) + this.textColon();
		//text += '\\I['+ icon + ']' + this.addBasicColor(name);
		text += this.addBasicColor(name);
		if(code === 'AddBuff' || code === 'AddDebuff') 
			text += this.addBasicColor(' ' + Math.floor(effect.value1) + turnText);
		this._data.push(text);
	}
};

Window_ObjectInfo.prototype.getObjEffectOther = function(effect) {
	var category = 'OIWOtherEffectText';
	var codeList = ['SpecialEffect', 'GrowUp', 'LearnSkill', 'CommonEvent'];
	var code = codeList[(effect.code % 40) - 1];
	if (this.getObjTextShow(category, code)) {
		if (code === 'SpecialEffect')
			var text = String(GT.Param.OIWOtherEffectText.EscapeText);
		else if (code === 'GrowUp')
			var text = TextManager.param(effect.dataId) + this.addIncreaseColor('+' + Math.floor(effect.value1));
		else if (code === 'LearnSkill')
			var text = $dataSkills[effect.dataId].name;
		else 
			var text = $dataCommonEvents[effect.dataId].name;
		text = this.getObjText(category, code) + this.textColon() + this.addBasicColor(text);
		this._data.push(text);
	}
};

Window_ObjectInfo.prototype.getSkillWeaponRequirements = function () {
	var item = this._item;
	if (!this.getObjTextShow('OIWObjRequireText','WtypeRequire')) return;
	var text = this.getObjText('OIWObjRequireText','WtypeRequire') + this.textColon();
	if (item.requiredWtypeId1) {
		var text1 = text + this.addBasicColor($dataSystem.weaponTypes[item.requiredWtypeId1]);
		this._requireData.push(text1);
	}
	if (item.requiredWtypeId2) {
		var text1 = text + this.addBasicColor($dataSystem.weaponTypes[item.requiredWtypeId2]);
		this._requireData.push(text1);
	}
};

Window_ObjectInfo.prototype.getObjLastInfo = function () {
	var text = '';
	if (this.getObjTextShow('OIWMainText','PriceText') && !DataManager.isSkill(this._item)) {
		text = this.addSystemColor(this.getObjText('OIWMainText','PriceText')) + this.textColon() + this.addBasicColor(this._item.price);
		this._lastData.push(text);
	}
	
};

Window_ObjectInfo.prototype.calculateWindowSize = function () {
	var windowWidth = eval(this._windowSet.WindowWidth);
	var windowHeight = eval(this._windowSet.WindowHeight);
	if (eval(this._windowSet.FixWindow) && windowWidth && windowHeight) {
		this.width = windowWidth;
		this.height = windowHeight;
	}
	else if (this.dataLength() === 0) {
		this.width = 0;
		this.height = 0;
	}
	else {
		var width = this.calculateTitleWidth();
		width = this.calAllDataWidth(width);
		width = Math.max(this.calculateLastInfoWidth(), width);
		var height = this.calAllDataHeight();
		this.width = this.standardPadding() * 2 + this.textPadding() * this.maxCols() * 2 + width * this.maxCols() + windowWidth;
		this.height = this.standardPadding() * 2 + height + windowHeight;
	}
};

Window_ObjectInfo.prototype.calAllDataHeight = function () {
	var height = this.titleHeight();
	height += this.dataHeight();
    height += this.exDataHeight(this._textTop);
	height += this.exDataHeight(this._textBottom);
	height += this.exDataHeight(this._requireData);
	height += this.exDataHeight(this._damageData);
	height += this.exDataHeight(this._costData);
	height += this.LastInfoHeight();
	return height;
};

Window_ObjectInfo.prototype.calAllDataWidth = function (width) {
	width = this.calculateDataWidth(this._data, width);
	width = this.calculateDataWidth(this._textTop, width, 1);
	width = this.calculateDataWidth(this._textBottom, width, 1);
	width = this.calculateDataWidth(this._requireData, width, 1);
	width = this.calculateDataWidth(this._damageData, width, 1);
	width = this.calculateDataWidth(this._costData, width, 1);
	return width;
};

Window_ObjectInfo.prototype.calculateTitleWidth = function () {
	if (!this._item) return 0;
	var width = this.textWidth(this._item.name) * 1.5;
	width = Math.max(this.textWidth(this._category), width);
	width += eval(this._windowSet.ShowBigIcon) ? this.titleHeight() : (32 + 15) * this.scaleRate();
	return width / this.maxCols();
};

Window_ObjectInfo.prototype.calculateDataWidth = function (data, width, type) {
	for (var i = 0; i < data.length; i++) {
		var line = data[i];
		var lineWidth = this.textWidthEx(line);
		if (type) lineWidth /= this.maxCols();
		width = Math.max(lineWidth, width);
	}
	return width;
};

Window_ObjectInfo.prototype.calculateLastInfoWidth = function () {
	var width = 0;
	for (var i = 0; i < this._lastData.length; i++) {
		var line = this._lastData[i];
		var lineWidth = this.textWidthEx(line);
		width = Math.max(lineWidth, width);
	}
	if (this._lastData.length < 3) return width * 3 / this.maxCols();
	return width * 4 / this.maxCols();
};

Window_ObjectInfo.prototype.titleHeight = function () {
	if (!eval(this._windowSet.ShowBigIcon))
		return this.lineHeight() * 2.5 + this.textPadding() * 2;
	return this.lineHeight() * 3 + this.textPadding() * 2;
};

Window_ObjectInfo.prototype.dataHeight = function () {
	var height = this.MoreColsCalHeight(this._data);
	if (height) height += this.textPadding() * 2;
	return height;
};

Window_ObjectInfo.prototype.MoreColsCalHeight = function (data) {
	if (data.length % this.maxCols())
		return ((data.length - (data.length % this.maxCols())) / this.maxCols() + 1) * this.lineHeight();
	return (data.length / this.maxCols()) * this.lineHeight();
};

Window_ObjectInfo.prototype.exDataHeight = function (data) {
	var height = data.length * this.lineHeight();
	if (height) height += this.textPadding() * 2;
	return height;
};

Window_ObjectInfo.prototype.LastInfoHeight = function () {
    var height = this.lineHeight();
	if (height) height += this.textPadding() * 1.5;
	return height;
};

Window_ObjectInfo.prototype.updatePosition = function (targetWindow) {
	if (eval(this._windowSet.FixWindow)) {
		this.x = eval(this._windowSet.WindowX);
		this.y = eval(this._windowSet.WindowY);
		return;
	}
	var rect = targetWindow._cursorRect;
	var offsetX = eval(this._windowSet.WindowX);
	var offsetY = eval(this._windowSet.WindowY);
	var wx = targetWindow.x + targetWindow.standardPadding();
	wx += rect.x + rect.width + offsetX - this.width;
	wx = wx.clamp(0, Graphics.boxWidth - this.width);
	var wy = targetWindow.y + targetWindow.standardPadding();
	wy += rect.y + rect.height + offsetY;
	wy = wy.clamp(0, Graphics.boxHeight - this.height);
	this.x = wx;
	this.y = wy;
};

Window_ObjectInfo.prototype.refresh = function () {
	this.createContents();
	this.contents.clear();
	this.origin.y = 0;
	if (!this._item) return;
	this.drawBackground();
	this.drawItemName();
	this.drawItemCategory();
	this.drawInfoTextTop();
	this.drawObjectInfo();
	this.drawDamage();
	this.drawInfoTextBottom();
	this.drawCost();
	this.drawRequirements();
	this.drawOtherInfo();
	this.drawLastInfo();
};

Window_ObjectInfo.prototype.drawOtherInfo = function () {
};

Window_ObjectInfo.prototype.drawBackground = function () {
	var x = 0;
	var y = 0;
	var width = this.contents.width;
	var height = this.contents.height;
	var backColor = String(GT.Param.OIWColorSet.BackColor);
	var outlineColor = String(GT.Param.OIWColorSet.OutlineColor);
	this.drawFillRect(x, y, width, height, backColor);
	this.drawOutline(x, y, width, height, outlineColor);
};

Window_ObjectInfo.prototype.drawFillRect = function (x, y, w, h, color) {
	if(!eval(this._windowSet.WindowBack)) return;
    this.contents.fillRect(x, y, w, h, color);
	var itemColor = this.getItemColor();
	if (itemColor && !this.isSeniorColor(itemColor)) {
		this.contents.paintOpacity = 100;
		this.contents.gradientFillRect(x, y, w, this.titleHeight(), itemColor, color);
		this.changePaintOpacity(true);
	}
};

Window_ObjectInfo.prototype.drawOutline = function (x, y, w, h, color) {
	if(!eval(this._windowSet.WindowOutline)) return;
	var itemColor = this.getItemColor();
	if (itemColor && !this.isSeniorColor(itemColor)) {
	    this.contents.fillRect(x, y, w, 1, itemColor);//上横
		this.contents.gradientFillRect(x, y, 1, h, itemColor, color, true);//左竖
		this.contents.gradientFillRect(x + w - 1, y, 1, h, itemColor, color, true);//右竖
		this.contents.fillRect(x, y + this.titleHeight(), w - 1, 1, itemColor);//中横
	}
	else {
		this.contents.fillRect(x, y, w, 1, color);//上横
		this.contents.fillRect(x, y, 1, h, color);//左竖
	    this.contents.fillRect(x + w - 1, y, 1, h, color);//右竖
		this.contents.fillRect(x, y + this.titleHeight(), w - 1, 1, color);//中横
	}
	this.contents.fillRect(x, y + h - 1, w - 1, 1, color);//下横
};

Window_ObjectInfo.prototype.getItemColor = function () {
	if (!Imported.Drill_ItemTextColor) return null;
	var item = this._item;
	var color = null;
	if (item.baseItemId)
		item = DataManager.getBaseItem(item);
	if(DataManager.isItem(item))
		color = $gameSystem._drill_ITC_items[item.id];
	else if(DataManager.isWeapon(item))
		color = $gameSystem._drill_ITC_weapons[item.id];
	else if(DataManager.isArmor(item))
		color = $gameSystem._drill_ITC_armors[item.id];
	else if(DataManager.isSkill(item))
		color = $gameSystem._drill_ITC_skills[item.id];
	return color;
};

Window_ObjectInfo.prototype.isSeniorColor = function (color) {
	if (typeof(color) == "string" && color != '' && color.indexOf("drill__") != -1 )
		return true;
	return false;
};

Window_ObjectInfo.prototype.drawItemName = function() {
	var item = this._item;
	if (Imported.Drill_ItemTextColor) {
	    this._drill_ITC_isDrawingItemName = true;
	    this._drill_ITC_curItem = item;
	}
	if (Imported.Drill_ItemTextFilter) {
	    this._drill_ITFi_isDrawingItemName = true;
	    this._drill_ITFi_curItem = item;
	}
	var x = this.textPadding();
	var y = 0;
	var width = 312;
    if (item) {
		var iconBoxWidth = this.drawItemIcon(x, y);
        this.resetTextColor();
		this.contents.fontSize *= 1.3;
        this.drawText(item.name, iconBoxWidth, y + this.textPadding(), width - iconBoxWidth);
		this.resetFontSettings();
    }
	if (Imported.Drill_ItemTextColor) 
		this._drill_ITC_isDrawingItemName = false;
	if (Imported.Drill_ItemTextFilter) 
		this._drill_ITFi_isDrawingItemName = false;
	if (this.getItemColor() && !this.isSeniorColor(this.getItemColor())) return;
	if(!eval(this._windowSet.WindowOutline)) 
		this.drawHorzLine(this.titleHeight());
};

Window_ObjectInfo.prototype.drawItemIcon = function(x, y) {
	var width = 0;
	if (eval(this._windowSet.ShowBigIcon)) {
		if (this.itemHasPictureImage()) {
            this.readyItemPictureImage(this._item);
		}
		else {
			this.drawLargeIcon();
		}
		width = this.titleHeight();
	}
	else {
		this.drawIcon(this._item.iconIndex, x + 2, y + 2 + this.textPadding());
		width = (32 + 15) * this.scaleRate();
	}
	return width;
};

Window_ObjectInfo.prototype.itemHasPictureImage = function() {
	return false;
};

Window_ObjectInfo.prototype.readyItemPictureImage = function(item) {
};

Window_ObjectInfo.prototype.drawLargeIcon = function() {
    var iconIndex = this._item.iconIndex;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = 32;
    var ph = 32;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var dw = this.lineHeight() * 3;
    var dh = this.lineHeight() * 3;
    var dx = this.textPadding();
    var dy = this.textPadding();
    this.contents._context.imageSmoothingEnabled = false;
    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
    this.contents._context.imageSmoothingEnabled = true;
};

Window_ObjectInfo.prototype.drawItemCategory = function() {
	if (!eval(GT.Param.OIWMainText.ShowCategory)) return;
	var text = this._category;
	var x = eval(this._windowSet.ShowBigIcon) ? this.titleHeight() : this.textPadding();
	this.drawText(text, x, this.lineHeight() * 1.5);
};

Window_ObjectInfo.prototype.drawInfoTextTop = function () {
	if (!this._textTop.length) return;
	var x = this.textPadding();
	var y = this.titleHeight() + this.textPadding();
	for (var i = 0; i < this._textTop.length; i++) {
		var line = this._textTop[i];
		this.drawTextEx(line, x, y);
		y += this.lineHeight();
	}
	this.drawHorzLine(y + this.textPadding());
};

Window_ObjectInfo.prototype.drawObjectInfo = function () {
	if (!this._data.length) return;
	var x = 0;
	var y = 0;
	var width = this.contents.width / this.maxCols();
	var rows = this._data.length % this.maxCols() ? Math.ceil(this._data.length / this.maxCols()) : this._data.length / this.maxCols();
	for (var i = 0; i < this._data.length; i++) {
		x = this.textPadding() + Math.floor(i / rows) * width;
		y = (i % rows) * this.lineHeight() + this.titleHeight() + this.exDataHeight(this._textTop) + this.textPadding();
		var line = this._data[i];
		this.drawTextEx(line, x, y);
	}
};

Window_ObjectInfo.prototype.drawDamage = function () {
	if (!this._damageData.length) return;
	var x = this.textPadding();
	var y = this.titleHeight() + this.exDataHeight(this._textTop) + this.dataHeight();
	this.drawHorzLine(y);
	y += this.textPadding();
	for (var i = 0; i < this._damageData.length; i++) {
		var line = this._damageData[i];
		this.drawTextEx(line, x, y);
		y += this.lineHeight();
	}
};

Window_ObjectInfo.prototype.drawInfoTextBottom = function () {
	if (!this._textBottom.length) return;
	var x = this.textPadding();
	var y = this.titleHeight() + this.exDataHeight(this._textTop) + this.dataHeight() + this.exDataHeight(this._damageData);
	if (this._stateData) y += this.stateHeight();
	this.drawHorzLine(y);
	y += this.textPadding();
	for (var i = 0; i < this._textBottom.length; i++) {
		var line = this._textBottom[i];
		this.drawTextEx(line, x, y);
		y += this.lineHeight();
	}
};

Window_ObjectInfo.prototype.drawCost = function () {
	if (!this._costData.length) return;
	var x = this.textPadding();
	var y = this.titleHeight() + this.exDataHeight(this._textTop) + this.dataHeight() + this.exDataHeight(this._damageData) + this.exDataHeight(this._textBottom);
	if (this._stateData) y += this.stateHeight();
	this.drawHorzLine(y);
	y += this.textPadding();
	for (var i = 0; i < this._costData.length; i++) {
		var line = this._costData[i];
		this.drawTextEx(line, x, y);
		y += this.lineHeight();
	}
};

Window_ObjectInfo.prototype.drawRequirements = function () {
	if (!this._requireData.length) return;
	var x = this.textPadding();
	var y = this.titleHeight() + this.exDataHeight(this._textTop) + this.dataHeight() + this.exDataHeight(this._damageData) + this.exDataHeight(this._textBottom) + this.exDataHeight(this._costData);
	if (this._stateData) y += this.stateHeight();
	this.drawHorzLine(y);
	y += this.textPadding();
	for (var i = 0; i < this._requireData.length; i++) {
		var line = this._requireData[i];
		this.drawTextEx(line, x, y);
		y += this.lineHeight();
	}
};

Window_ObjectInfo.prototype.drawLastInfo = function () {
	var length = this._lastData.length;
	var x = this.textPadding();
	var y = this.contents.height - this.lineHeight() - this.textPadding()/2;
	var dw = 0;
	this.drawHorzLine(y - this.textPadding());
	this.drawItemQuality();
	for (var i = 0; i < length; i++) {
		var line = this._lastData[i];
		dw = this.textWidthEx(line) + this.textPadding() * 2;
		this.drawTextEx(line, x, y);
		x += dw;
	}
};

Window_ObjectInfo.prototype.drawItemQuality = function() {
	if (!this.getItemColor()) return;
	var qualityList = GT.Param.OIWQualitySet;
	var text = '';
	for (var i = 0; i < qualityList.length; i++) {
		if (String(JSON.parse(qualityList[i]).ColorCategory) === '普通颜色')
		    var color = String(DrillUp.drill_COC_getColor(Number(JSON.parse(qualityList[i]).QualityColor) - 1));
		else
			var color = String(DrillUp.drill_COC_getSeniorColor(Number(JSON.parse(qualityList[i]).QualityColor) - 1));
		if (color === this.getItemColor()) {
			text = String(JSON.parse(qualityList[i]).QualityText);
			break;
		}
	}
	if (text !== '') {
		this.changeTextColor(this.getItemColor());
		var x = this.contents.width - this.textPadding() * 2 - this.textWidth(text);
		var y = this.contents.height - this.lineHeight() - this.textPadding()/2;
		this.drawText(text, x, y);
		this.resetTextColor();
	}
};

Window_ObjectInfo.prototype.drawHorzLine = function (y) {
	var backColor = String(GT.Param.OIWColorSet.BackColor);
	var lineColor = String(GT.Param.OIWColorSet.DelimiterColor);
    this.contents.gradientFillRect(1, y, this.contents.width / 4 - 1, 1, backColor, lineColor);
	this.contents.fillRect(this.contents.width / 4, y, this.contents.width / 2, 1, lineColor);
	this.contents.gradientFillRect(this.contents.width * 3/4 - 1.5, y, this.contents.width / 4, 1, lineColor, backColor);
};

Window_ObjectInfo.prototype.sortValueDD = function(value) {
	return value.toFixed(GT.Param.OIWDecimalDigit);
};

Window_ObjectInfo.prototype.getObjTextShow = function(category, code) {
	return eval(JSON.parse(GT.Param[category][code]).Show);
};

Window_ObjectInfo.prototype.getObjText = function(category, code, noColor) {
	var text = String(JSON.parse(GT.Param[category][code]).Name);
	if (!noColor)
		text = this.addSystemColor(text);
	return text;
};

Window_ObjectInfo.prototype.textColon = function() {
	return String(GT.Param.OIWMainText.Colon);
};

Window_ObjectInfo.prototype.pushData = function(text, item) {
	return this._data.push(text);
};

Window_ObjectInfo.prototype.textWidthEx = function(text) {
	return this.drawTextEx(text, 0, this.contents.height);
};

Window_ObjectInfo.prototype.addSystemColor = function(text) {
	var color = Number(GT.Param.OIWColorSet.SystemColor);
	return '\\c[' + color + ']' + text + '\\c[0]';
};

Window_ObjectInfo.prototype.addBasicColor = function(text) {
	var color = Number(GT.Param.OIWColorSet.BasicColor);
	return '\\c[' + color + ']' + text + '\\c[0]';
};

Window_ObjectInfo.prototype.addIncreaseColor = function(text) {
	var color = Number(GT.Param.OIWColorSet.IncreaseColor);
	return '\\c[' + color + ']' + text + '\\c[0]';
};

Window_ObjectInfo.prototype.addDecreaseColor = function(text) {
	var color = Number(GT.Param.OIWColorSet.DecreaseColor);
	return '\\c[' + color + ']' + text + '\\c[0]';
};

Window_ObjectInfo.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.processWheel();
};

Window_ObjectInfo.prototype.processWheel = function() {
	if (!this.isOpen()) return;
	if (!eval(this._windowSet.FixWindow)) return;
    if (!this.isInsideFrame()) return;
    var threshold = 20;
    if (TouchInput.wheelY >= threshold) {
		this.scrollOriginDown(this.scrollSpeed() * 4);
    }
    if (TouchInput.wheelY <= -threshold) {
		this.scrollOriginUp(this.scrollSpeed() * 4);
    }
};

Window_ObjectInfo.prototype.isInsideFrame = function() {
    var x = this.canvasToLocalX(TouchInput._mouseOverX);
    var y = this.canvasToLocalY(TouchInput._mouseOverY);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_ObjectInfo.prototype.scrollOriginDown = function(speed) {
    var value = this.contentsHeight() - this.height + this.standardPadding() * 2;
    this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_ObjectInfo.prototype.scrollOriginUp = function(speed) {
    this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_ObjectInfo.prototype.scrollSpeed = function() {
    return Number(this._windowSet.ScrollSpeed);
};

Window_ObjectInfo.prototype.contentsHeight = function() {
    var standard = this.height - this.standardPadding() * 2;
    return Math.max(standard, this.calAllDataHeight());
};

//=============================================================================
// Window_Selectable
//=============================================================================

Window_Selectable.prototype.setObjInfoWindow = function (objInfoWindow) {
	this._objInfoWindow = objInfoWindow;
};

GT.OIWin.Window_Selectable_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function (index) {
	GT.OIWin.Window_Selectable_select.call(this, index);
	if (this._objInfoWindow && this._objInfoWindow._showInfo) {
		this._objInfoWindow.setItem(this.item(), this);
	}
};

GT.OIWin.Window_Selectable_activate = Window_Selectable.prototype.activate;
Window_Selectable.prototype.activate = function() {
	GT.OIWin.Window_Selectable_activate.call(this);
	if (this._objInfoWindow && !this._objInfoWindow.isOpen() && this._objInfoWindow._showInfo && this._objInfoWindow.dataLength()) 
		this._objInfoWindow.open();
};

GT.OIWin.Window_Selectable_deactivate = Window_Selectable.prototype.deactivate;
Window_Selectable.prototype.deactivate = function() {
	GT.OIWin.Window_Selectable_deactivate.call(this);
	if (this._objInfoWindow) {
		this._objInfoWindow.close();
	}
};

GT.OIWin.Window_Selectable_processHandling = Window_Selectable.prototype.processHandling;
Window_Selectable.prototype.processHandling = function() {
	GT.OIWin.Window_Selectable_processHandling.call(this);
	if (this.isOpenAndActive() && this._objInfoWindow && this.isIwSwitchTriggered()) {
		SoundManager.playCursor();
		this._objInfoWindow._showInfo = !this._objInfoWindow._showInfo;
		(this._objInfoWindow._showInfo && this._objInfoWindow.dataLength()) ? this._objInfoWindow.open() : this._objInfoWindow.close();
		this._objInfoWindow.setItem(this.item(), this);
	}
};

Window_Selectable.prototype.isIwSwitchTriggered = function() {
	for (var i = 0; i < GT.Param.OIWSwitchBtn.length; i++) {
		var key = GT.Param.OIWSwitchBtn[i];
		if (Input.isTriggered(key)) return true;
	}
	return false;
};

Window_Selectable.prototype.isInsideFrame = function() {
    var x = this.canvasToLocalX(TouchInput._mouseOverX);
    var y = this.canvasToLocalY(TouchInput._mouseOverY);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};


//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.createObjInfoWindow = function() {
	this._objInfoWindow = new Window_ObjectInfo(this._objInfoWindowSet);
	this.addChild(this._objInfoWindow);
	if (this._buyWindow) 
		this._buyWindow.setObjInfoWindow(this._objInfoWindow);
	if (this._sellWindow) 
		this._sellWindow.setObjInfoWindow(this._objInfoWindow);
	if (this._slotWindow) 
		this._slotWindow.setObjInfoWindow(this._objInfoWindow);
	if (this._itemWindow)
		this._itemWindow.setObjInfoWindow(this._objInfoWindow);
	if (this._skillWindow) 
		this._skillWindow.setObjInfoWindow(this._objInfoWindow);
	if (Imported.FTKR_STS && this._stsSkillTreeWindow) 
		this._stsSkillTreeWindow.setObjInfoWindow(this._objInfoWindow);
};

Scene_Base.prototype.getObjInfoWindowSet = function() {
	if (this.constructor === Scene_Item)
		this._objInfoWindowSet = GT.Param.OIWSceneItemSet;
	else if (this.constructor === Scene_Skill)
		this._objInfoWindowSet = GT.Param.OIWSceneSkillSet;
	else if (this.constructor === Scene_Equip)
		this._objInfoWindowSet = GT.Param.OIWSceneEquipSet;
	else if (this.constructor === Scene_Shop)
		this._objInfoWindowSet = GT.Param.OIWSceneShopSet;
	else if (this.constructor === Scene_Battle)
		this._objInfoWindowSet = GT.Param.OIWSceneBattleSet;
	else if (Imported.FTKR_STS && this.constructor === Scene_STS)
		this._objInfoWindowSet = GT.Param.OIWSceneSTSSet;
};

//=============================================================================
// Scene_Item
//=============================================================================

GT.OIWin.Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
	GT.OIWin.Scene_Item_create.call(this);
	if (eval(GT.Param.OIWSceneItemSet.ShowWindow)) {
		this.getObjInfoWindowSet();
		this.createObjInfoWindow();
	}
};

//=============================================================================
// Scene_Skill
//=============================================================================

GT.OIWin.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
	GT.OIWin.Scene_Skill_create.call(this);
	if (eval(GT.Param.OIWSceneSkillSet.ShowWindow)) {
		this.getObjInfoWindowSet();
		this.createObjInfoWindow();
		this._objInfoWindow.setActor(this.actor());
	}
};

GT.OIWin.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function () {
	GT.OIWin.Scene_Skill_refreshActor.call(this);
	if (this._objInfoWindow) {
		this._objInfoWindow.setActor(this.actor());
	}
};

//=============================================================================
// Scene_Equip
//=============================================================================

GT.OIWin.Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function () {
	GT.OIWin.Scene_Equip_create.call(this);
	if (eval(GT.Param.OIWSceneEquipSet.ShowWindow)) {
		this.getObjInfoWindowSet();
		this.createObjInfoWindow();
		this._objInfoWindow.setActor(this.actor());
	}
};

GT.OIWin.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function () {
	GT.OIWin.Scene_Equip_refreshActor.call(this);
	if (this._objInfoWindow) {
		this._objInfoWindow.setActor(this.actor());
	}
};

GT.OIWin.Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
Scene_Equip.prototype.onItemOk = function () {
	GT.OIWin.Scene_Equip_onItemOk.call(this);
	this._objInfoWindow.setItem(this._slotWindow.item(), this._slotWindow);
};

GT.OIWin.Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
Scene_Equip.prototype.onItemCancel = function () {
	GT.OIWin.Scene_Equip_onItemCancel.call(this);
	this._objInfoWindow.setItem(this._slotWindow.item(), this._slotWindow);
};

//=============================================================================
// Scene_Shop
//=============================================================================

GT.OIWin.Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function () {
	GT.OIWin.Scene_Shop_create.call(this);
	if (eval(GT.Param.OIWSceneShopSet.ShowWindow)) { 
	    this.getObjInfoWindowSet();
		this.createObjInfoWindow();
	}
};

//=============================================================================
// Scene_Battle
//=============================================================================

GT.OIWin.Scene_Battle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
	GT.OIWin.Scene_Battle_create.call(this);
	if (eval(GT.Param.OIWSceneBattleSet.ShowWindow)) {
		this.getObjInfoWindowSet();
		this.createObjInfoWindow();
	}
};

if(Imported.FTKR_STS) {
//=============================================================================
// Scene_STS
//=============================================================================

GT.OIWin.Scene_STS_createSkillTreeWindow = Scene_STS.prototype.createSkillTreeWindow;
Scene_STS.prototype.createSkillTreeWindow = function() {
	GT.OIWin.Scene_STS_createSkillTreeWindow.call(this);
	if (eval(GT.Param.OIWSceneSTSSet.ShowWindow)) {
		this.getObjInfoWindowSet();
		this.createObjInfoWindow();
		this._objInfoWindow.setActor(this.actor());
	}
};

GT.OIWin.Scene_STS_refreshActor = Scene_STS.prototype.refreshActor;
Scene_STS.prototype.refreshActor = function () {
	GT.OIWin.Scene_STS_refreshActor.call(this);
	if (this._objInfoWindow) {
		this._objInfoWindow.setActor(this.actor());
	}
};

}//Imported.FTKR_STS

//=============================================================================
// End of File
//=============================================================================