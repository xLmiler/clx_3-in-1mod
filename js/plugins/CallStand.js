/*---------------------------------------------------------------------------*
 * 2020/01/7 shimo8
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 立ち絵表示プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CallStand 立ち絵IDor立ち絵エロ名 アニメX アニメY //衣装指定とかもできると〇
 * 
 * 戦闘エロのメモ
 * v[351] = 口を塞いでいる相手のID
 * v[352] = 前の以下略
 * v[353] = 後ろの以下略
 * v[415] = 拘束相手
 * 
 * 種族[1,human][2,tentacle][3,demon][4,worm?]
 */


(function () {
	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'CallStand' || command === 'CallStandForce') {
			let StandPoseID = 0;
			if (args[0].match(/\\v/)) {
				//args[1]包含\v时的处理
				array = args[0].match(/[0-9]+\.?[0-9]*/g);
				for (var i = 0; i < array.length; i++) {
					args[0] = Number(array);
					StandPoseID = $gameVariables.value(args[0]);
				}
			} else { StandPoseID = args[0] }
			if (args[1] != null) { var StandAnimeX = Number(args[1]) } else { var StandAnimeX = 0 };//アニメーション座標X
			if (args[2] != null) { var StandAnimeY = Number(args[2]) } else { var StandAnimeY = 0 };//アニメーション座標Y
			if (args[3] != null) { var StandAnimeWait = Number(args[3]) } else { var StandAnimeWait = 1 };//アニメーションウェイト


			//此部分是进行变量初始化部分

			//角色部分
			const user = $gameActors.actor(1);

			//立绘坐标部分
			let Stand1X = 380; //立绘的X坐标
			let Stand1Y = 0;//立绘的Y坐标
			let origin = 0;//立绘的原点 0左上，1中间
			let scale = 100;//立绘的缩放大小

			//立绘显示部分，用于输入调用文件名
			let BasePoseFileName = 'actor01_pose' //显示的角色的姿势文件名前缀1
			let BasePose2FileName = 'actor04_pose'//显示的角色的姿势文件名前缀2
			let BaseID = "0002" //显示角色的姿势的后缀id
			var weaponIndex = '' //显示的武器id
			let FileName = 0 //立绘文件名
			let Dif1PicFileName = 0;// 显示的立绘文件名1
			let Dif2PicFileName = 0;// 显示的立绘文件名2
			//通用模具编号
			let StandAltFlag = $gameSwitches.value(131) ? 1 : 0
			let ClothUpdate = 0

			//获取身上装备的id编号
			let weaponId = user._equips[0] ? user._equips[0]._itemId : 0 //获取角色装备的武器的id
			let StandEqNum = user._equips[1] ? user._equips[1]._itemId : 1//获取角色穿着衣服的id
			let legId = user._equips[7] ? user._equips[7]._itemId : 0//获取角色穿着裤子的id
			let neckId = user._equips[8] ? user._equips[8]._itemId : 0//获取角色穿着项圈的id
			let eyeId = user._equips[9] ? user._equips[9]._itemId : 0//获取角色佩戴的眼罩的id
			let pierceId = user._equips[10] ? user._equips[10]._itemId : 0//获取角色装备的乳环的id
			let mouthId = user._equips[11] ? user._equips[11]._itemId : 0//获取角色佩戴的口部装备的id
			var underPicId = user._equips[12] ? user._equips[12]._itemId : 0;//获取角色的装备的内衣id
			let earId = user._equips[13] ? user._equips[13]._itemId : 0;//获取角色穿着耳朵装备的id
			let clitId = user._equips[14] ? user._equips[14]._itemId : 0//获取角色穿着阴蒂装备的id

			//获取身上装备的文件编号
			let EyePicFileNum = eyeId >= 5 ? eval($dataArmors[user._equips[9]._itemId].meta.PID) : 0;//眼部图片文件编号
			let MouthPicFileNum = mouthId >= 5 ? eval($dataArmors[user._equips[11]._itemId].meta.PID) : 0;//口部图片文件编号
			let NeckPicFileNum = neckId >= 5 ? eval($dataArmors[user._equips[8]._itemId].meta.PID) : 0;//项圈图片文件编号
			let EarPicFileNum = earId >= 5 ? eval($dataArmors[earId].meta.PID) : 0;//耳朵图片文件编号
			let UnderPicFileNum = 0;//内衣的编号，由UnderPicFlag控制开关
			let LegPicFileNum = legId >= 5 ? $dataArmors[legId].meta.PID : 0;//获取腿部的装备图片编号
			let LegOpacity = legId >= 5 ? $dataArmors[legId].meta.LegOpacity : 0; //获取腿部的装备
			let ClitPicFileNum = clitId >= 5 ? eval($dataArmors[clitId].meta.PID) : 0;//角色的阴蒂图片文件编号
			let ClothPicFileNum = 0;//获取角色穿着衣服的图片编号
			let PiercePicFileNum = pierceId >= 5 ? eval($dataArmors[pierceId].meta.PID) : 0; //需要显示在衣服外的文件编号
			let PiercePicFileNumR = PiercePicFileNum;//需要显示在衣服外右部分的文件编号
			let PierceL = pierceId >= 5 && $dataArmors[pierceId].meta["CorrectL"] && $dataArmors[pierceId].meta["CorrectR"] ? $dataArmors[pierceId].meta.CorrectL[StandPoseID - 1] : -1;//左乳钉，大于0代表有超出身体
			let PierceR = pierceId >= 5 && $dataArmors[pierceId].meta["CorrectL"] && $dataArmors[pierceId].meta["CorrectR"] ? $dataArmors[pierceId].meta.CorrectR[StandPoseID - 1] : -1;//右乳钉，大于0代表有超出身体


			//获取身上装备的特殊属性值
			let EqClothOpacity = StandEqNum >= 5 ?$dataArmors[StandEqNum].meta.ClothOpacity : 0 //获取角色衣服的不透明度数值
			let UnderPicFlag = StandEqNum >= 5 ? Number($dataArmors[StandEqNum].meta.ClothUnderFlag):0; //获取角色内衣的标志，是否显示内衣
			let NippleL = StandEqNum >= 5 ? $dataArmors[StandEqNum].meta.ClothNippleL[StandPoseID - 1] : 1
			let NippleR = StandEqNum >= 5 ? $dataArmors[StandEqNum].meta.ClothNippleR[StandPoseID - 1] : 1
			let Cosplay =  StandEqNum >= 5 && $dataArmors[StandEqNum].meta.Cosplay ? 1:0;//获取角色衣服是否是cosplay


			//检查各种立绘状态标志
			let LovejuiceFlag = 0 //爱液标志
			let SweatFlag = 0//汗液标志
			let BreathFlag = 0//呼气标志
			let Mark1 = "0";//身体的纹路标志1
			let Mark2 = "0";//身体的纹路标志2
			let PaintIndex = "0";//身体的涂鸦标志
			let ScarFlag = 0;//身体的伤痕标志

			//色情立绘的处理部分
			let MouthStateID = $gameVariables.value(351)//口塞ぎの相手番号
			let VaginaStateID = $gameVariables.value(352)//小穴状态
			let AnusStateID = $gameVariables.value(353)//屁穴状态
			let poseName = 0;
			let BindType = $gameVariables.value(415)//拘束的物种
			let WaitStateID = $gameVariables.value(354)//挿入前相手番号
			let OrganID = 0;

			//精液染色程度
			let SemenBody = $gameVariables.value(942) //身体部分
			let SemenFace = $gameVariables.value(941) //脸部部分
			let SemenAnus = $gameVariables.value(945)//肛门部分
			let SemenVagina = $gameVariables.value(944)//小穴部分
			let SemenMouth = $gameVariables.value(943)//嘴部部分

			//身体颜色部分
			let bodyTone = user.isStateAffected(316) ? [50, 0, 29, 0] : [0, 0, 0, 0];//存储身体的色调变化

			//其他变量设置

			//衣装耐久
			$gameVariables._data[741] = $gameVariables.value(702)
			$gameVariables._data[742] = $gameVariables.value(722)
			let blackBody = $gameSwitches.value(3001)//日晒皮肤开关
			let demonBody = $gameSwitches.value(98)//魔人皮肤开关


			//这里开始是游戏的立绘处理

			//确定图像的显示位置
			if ($gameSwitches.value(180)) {
				Stand1X = 512
				Stand1Y = 384
				scale = 82
				origin = 1;
			}
			else if (user.zoomIn) {
				Stand1X = 480
				Stand1Y = 30
				scale = 80
			}
			//传递给游戏内部变量
			$gameVariables._data[902] = Stand1X
			$gameVariables._data[903] = Stand1Y

			//立绘的姿势变量以及矫正
			if (StandPoseID == "0" || StandPoseID == 0 || StandPoseID == null) { StandPoseID = 1 }
			else if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(ID => StandPoseID == ID)) { StandPoseID = Number(StandPoseID); }
			else if ($sexPoseId[StandPoseID]) {
				$gameVariables._data[356] = StandPoseID;
				$gameVariables._data[415] = $sexPoseId[StandPoseID].BindType;
				$gameVariables._data[351] = $sexPoseId[StandPoseID].MouthStateID;
				$gameVariables._data[352] = $sexPoseId[StandPoseID].VaginaStateID;
				$gameVariables._data[353] = $sexPoseId[StandPoseID].AnusStateID;
				$gameVariables._data[354] = $sexPoseId[StandPoseID].WaitStateID;
				poseName = $gameVariables._data[356];
				StandPoseID = $sexPoseId[StandPoseID].poseID;
			}
			else {
				console.error('ポーズIDが不正'); StandPoseID = 1;
			}
			$gameVariables._data[915] = StandPoseID//ゲーム内変数に入れておく
			$gameVariables._data[916] = StandPoseID//ゲーム内変数に入れておく
			if (StandPoseID == 11) {//土下座
				for (var i = 110; i <= 150; i++) { $gameScreen.erasePicture(i); }
				if ($gameSwitches.value(131)) {
					if (user.isStateAffected(95)) submitCloth = 12;
					else submitCloth = 11;
					$gameScreen.showPicture(111, 'submit/2', 0, Stand1X, Stand1Y, scale, scale, 255, 0);
				} else {
					submitCloth = 14;
					$gameScreen.showPicture(111, 'submit/1', 0, Stand1X, Stand1Y, scale, scale, 255, 0);
				}
				FileName = 'submit/' + submitCloth;
				$gameScreen.showPicture(112, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0);
				this.wait(10);
				return;
			}


			if (command == 'CallStandForce') { $gameVariables._data[912] = StandPoseID }
			else { $gameVariables._data[912] = 0 }

			//标志赋予
			if ($gameVariables.value(1027) >= 100) {
				LovejuiceFlag = 1
				SweatFlag = 1
				BreathFlag = 1
			} else {
				if ($gameVariables.value(1027) >= 50) LovejuiceFlag = 1
				if ($gameVariables.value(1026) >= 500) {
					SweatFlag = 1
					BreathFlag = 1
				}
			}

			//伤痕
			if (user.isStateAffected(320)) ScarFlag = 1;
			//淫纹
			if (user.isStateAffected(321)) {
				if (user.mark) Mark1 = user.mark;
				else Mark1 = "6";
				if ([6, 7].includes(StandPoseID)) Mark1 = "0";
			}
			if (user.isStateAffected(322)) Mark2 = "10";
			//大淫纹
			if (user.isStateAffected(407)) {
				Mark1 = "14";
			}
			//涂鸦
			if ($gameVariables.value(4900) > 0) {
				if ($gameVariables.value(4900) <= 1) { PaintIndex = "11" }
				else if ($gameVariables.value(4900) <= 2) { PaintIndex = "12" }
				else { PaintIndex = "13" }
			}


			var [
				stand_difback,
				stand_base, //136、201、229
				stand_vb,
				stand_bb,
				stand_pv,
				stand_pvb,
				stand_scar,
				stand_paint,
				stand_mark1,
				stand_mark2,
				stand_ero,
				stand_sweat,
				stand_semenhole,
				stand_face,
				stand_eye,
				stand_mouth,
				stand_hair,
				stand_ear,
				stand_clitRing,
				stand_pierceL,
				stand_pierceR,
				stand_under,
				stand_leg,
				effect_splash,
				stand_cloth, //乳环处理到此为止
				stand_Lmark1,
				stand_Lmark2,
				stand_neck,
				stand_byt,
				stand_semenbody,
				stand_semenface,
				stand_semenmouth, //尾巴处理到此为止
				effect_breath,
				stand_diffront] = Array(34).fill(null).map((_, i) => i); //diffront在下面reset_ERO

			var stand_array = Array(34).fill(null).map((_, i) => i + 110);

			//如果您想指定服装，请在此处更改流程
			if (StandEqNum >= 5) {
				if (user.isStateAffected(55) || user.addedSkills().contains(722) || user.isLearnedSkill(722)) {
					EqClothOpacity = EqClothOpacity / 2
				}//すけすけステート食らっている場合
				if ($gameVariables.value(4964) != EqClothOpacity) {
					ClothUpdate = 1
				} else { ClothUpdate = 0 }//透過度が違う場合保存して更新フラグオン
				$gameVariables._data[4964] = EqClothOpacity

				//衣服破损状态的切换
				if (StandEqNum == 65 && user.isStateAffected(94)) StandEqNum = 61
				if (StandEqNum == 65 && user.isStateAffected(95)) StandEqNum = 62
				if (StandEqNum == 67 && user.isStateAffected(94)) StandEqNum = 68
				if (StandEqNum == 67 && user.isStateAffected(95)) StandEqNum = 69
				if (StandEqNum == 71 && user.isStateAffected(94)) StandEqNum = 72
				if (StandEqNum == 71 && user.isStateAffected(95)) StandEqNum = 73
				if (StandEqNum == 76 && user.isStateAffected(94)) StandEqNum = 63
				if (StandEqNum == 76 && user.isStateAffected(95)) StandEqNum = 64
				ClothPicFileNum = $dataArmors[StandEqNum].meta.PID;
				//淫触魔衣切换
				if (StandEqNum == 70 && $gameSwitches.value(1838)) ClothPicFileNum += 'b';

				//乳牛服装切换
				if (StandEqNum == 77 && $CM_runiu < 3) {
					switch ($CM_runiu) {
						case 1: ClothPicFileNum = "48a"; break;
						case 2: ClothPicFileNum = "48b";
					}
				}
				//乳牛服装状态增加
				(StandEqNum == 77 && $CM_runiu == 3) ? user.addState(423) : user.removeState(423);
				//永恒特效
				if ([65, 61, 62].includes(StandEqNum) && (user.isStateAffected(88) || user.isStateAffected(382))) ClothPicFileNum += 'b';

				if (StandPoseID <= 2 && StandEqNum == 75) {
					if (user.isStateAffected(435)) {
						ClothPicFileNum += 'a';
					} else if (user.isStateAffected(436)) {
						ClothPicFileNum += 'b';
					} else if (user.isStateAffected(437)) {
						ClothPicFileNum += 'c';
					} else if (user.isStateAffected(438)) {
						ClothPicFileNum += 'd';
					} else if (user.isStateAffected(439)) {
						ClothPicFileNum += 'e';
					}
				}
				if (StandAltFlag < 1 && $dataArmors[StandEqNum].meta.AltDifference && $dataArmors[StandEqNum].meta.AltDifference[StandPoseID - 1] > 0) ClothPicFileNum += 'b';
			}
			else {
				EqClothOpacity = 255 //衣装透過度
				UnderPicFlag = 1; //下着
				ClothPicFileNum = 0
			}

			//cosplay衣服处理
			if (Cosplay) StandAltFlag = 1

			//处理尾巴
			if (earId >= 5 && StandPoseID == 6) {
				stand_array.splice(stand_ear, 0, ...stand_array.splice(stand_cloth, 1));
			}
			//内衣的显示处理
			if (underPicId) {
				if (underPicId == 87 || underPicId == 284 || underPicId == 286) UnderPicFlag = 1;//奶牛内衣与榨乳器显示
				if (underPicId >= 5 && (UnderPicFlag >= 1 || $dataArmors[underPicId].meta.ForceDisplay)) {
					UnderPicFileNum = eval($dataArmors[underPicId].meta.PID)
					if (StandAltFlag < 1 && $dataArmors[underPicId].meta.AltDifference && $dataArmors[underPicId].meta.AltDifference[StandPoseID - 1] > 0) UnderPicFileNum += 'b';
					if (NippleL == 1) NippleL = $dataArmors[underPicId].meta.UnderNippleL[StandPoseID - 1];
					if (NippleR == 1) NippleR = $dataArmors[underPicId].meta.UnderNippleR[StandPoseID - 1];
				}
			}

			//打开露出判定开关
			$gameSwitches._data[2922] = NippleL >= 1 ? true : false;
			$gameSwitches._data[2923] = NippleR >= 1 ? true : false;

			//处理吊坠
			if (PierceR + PierceL >= 0) {
				PiercePicFileNum += 'l';
				PiercePicFileNumR += 'r';
				if (PierceL >= 1 && NippleL < 1) PiercePicFileNum += 'b';
				if (PierceR >= 1 && NippleR < 1) PiercePicFileNumR += 'b';
				if (NippleR >= 1) stand_array.splice(stand_pierceR, 0, ...stand_array.splice(stand_cloth, 1));
				if (NippleL >= 1) stand_array.splice(stand_pierceL, 0, ...stand_array.splice(stand_cloth, 1));
			}

			//大淫纹处理
			if (user.isStateAffected(407)) { stand_array.splice(stand_mark1, 0, ...stand_array.splice(stand_cloth, 1)); }
			//心乳贴处理
			let heartNipple = (UnderPicFileNum == 8 && StandEqNum !== 41) ? 1 : 0;

			[
				stand_difback,
				stand_base, //136、201、229
				stand_vb,
				stand_bb,
				stand_pv,
				stand_pvb,
				stand_scar,
				stand_paint,
				stand_mark1,
				stand_mark2,
				stand_ero,
				stand_sweat,
				stand_semenhole,
				stand_face,
				stand_eye,
				stand_mouth,
				stand_hair,
				stand_ear,
				stand_clitRing,
				stand_pierceL,
				stand_pierceR,
				stand_under,
				stand_leg,
				effect_splash,
				stand_cloth, //乳环处理到此为止
				stand_Lmark1,
				stand_Lmark2,
				stand_neck,
				stand_byt,
				stand_semenbody,
				stand_semenface,
				stand_semenmouth, //尾巴处理到此为止
				effect_breath,
				stand_diffront] = stand_array; //diffront在下面reset_ERO

			window.savePicIndex = { under: stand_under, socks: stand_leg, cloth: stand_cloth, ear: stand_ear };

			//立ち絵ポーズ基本ファイル名
			StandPoseID = ('00' + StandPoseID).slice(-2);//ゼロ埋め
			BasePoseFileName += StandPoseID//ポーズ名を結合
			BasePose2FileName += StandPoseID//ポーズ名を結合
			//立ち絵素体//変身中か乳首見えてるかなど'';
			if (StandAltFlag >= 1) {
				if (demonBody) {
					BaseID = "0006";
					BasePose2FileName = BasePoseFileName;
				}
				else {
					BaseID = "0004";
				}
				//武器处理
				if (StandPoseID <= 2 && weaponId >= 5) {
					weaponIndex = $dataWeapons[weaponId].meta.PID ? eval($dataWeapons[weaponId].meta.PID) : 1;
					if ($dataWeapons[weaponId].meta.feat) {
						if (user.isStateAffected(392) || window.weaponEffect) weaponIndex += 'b';
					}
				}
			}
			//身体处理
			FileName = blackBody ? BasePose2FileName + "_body_" + BaseID : BasePoseFileName + "_body_" + BaseID

			if ($gameScreen.picture(stand_base) && $gameScreen.picture(stand_base)._name == FileName) { }
			else {
				$gameScreen.showPicture(stand_base, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0)
			}
			//身体色调
			if ($gameScreen.picture(stand_base) && bodyTone != $gameScreen.picture(stand_base)._tone) $gameScreen.picture(stand_base).tint(bodyTone, 0);

			//性器变黑
			if (ConfigManager.noBlacken) { $gameScreen.erasePicture(stand_vb); $gameScreen.erasePicture(stand_bb); }
			else {
				FileName = 'organ/' + StandPoseID + 'v';
				if ($gameScreen.picture(stand_vb) && $gameScreen.picture(stand_vb)._name == FileName) {
				} else {
					$gameScreen.showPicture(stand_vb, FileName, origin, Stand1X, Stand1Y, scale, scale, ((($gameVariables.value(1104) + $gameVariables.value(1106)) * 10 + $gameVariables.value(1045)) / 2.5).clamp(0, 160), 0)
				}
				FileName = 'organ/' + StandPoseID + 'b';
				if ($gameScreen.picture(stand_bb) && $gameScreen.picture(stand_bb)._name == FileName) {
				} else {
					$gameScreen.showPicture(stand_bb, FileName, origin, Stand1X, Stand1Y, scale, scale, (($gameVariables.value(1103) + $gameVariables.value(1074)) / 20 * 255).clamp(0, 255), 0);
				}
			}

			//头发
			if (!$gameScreen.picture(stand_base) || demonBody) $gameScreen.erasePicture(stand_hair);
			else {
				if (StandAltFlag >= 1) FileName = 'hair/' + StandPoseID + '_2';
				else FileName = 'hair/' + StandPoseID + '_1';
				if ($gameScreen.picture(stand_hair) && $gameScreen.picture(stand_hair)._name == FileName) { }
				else {
					var realPictureId = $gameScreen.realPictureId(stand_hair);
					var P = new Game_Picture();
					P.show(FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0);
					if (StandAltFlag >= 1) P._tone = user.hairToneb;
					else P._tone = user.hairTone;
					$gameScreen._pictures[realPictureId] = P;
				}
			}
			//衣装
			if (ClothPicFileNum != 0 && heartNipple == 0) {
				FileName = BasePoseFileName + "_cloth_" + "00" + (ClothPicFileNum.replace(/\D/g, '').length > 1 ? "" : "0") + ClothPicFileNum
				if ($gameScreen.picture(stand_cloth) && $gameScreen.picture(stand_cloth)._name == FileName && ClothUpdate == 0) {
				} else {
					var realPictureId = $gameScreen.realPictureId(stand_cloth);
					var P = new Game_Picture();
					P.show(FileName, origin, Stand1X, Stand1Y, scale, scale, EqClothOpacity, 0);
					P._tone = $gameActors.actor(2).toneArray[user._equips[1]._itemId];
					$gameScreen._pictures[realPictureId] = P;
				}
			} else { $gameScreen.erasePicture(stand_cloth) } 
			//脚　変身中は反映なし
			if (LegPicFileNum != 0 && (StandAltFlag == 0 || Cosplay == 1)) {
				FileName = BasePoseFileName + "_option_" + "00" + (LegPicFileNum.replace(/\D/g, '').length > 1 ? "" : "0") + LegPicFileNum
				if ($gameScreen.picture(stand_leg) && $gameScreen.picture(stand_leg)._name == FileName) {
				} else {
					var realPictureId = $gameScreen.realPictureId(stand_leg);
					var P = new Game_Picture();
					P.show(FileName, origin, Stand1X, Stand1Y, scale, scale, LegOpacity, 0);
					P._tone = $gameActors.actor(2).toneArray[user._equips[7]._itemId];
					$gameScreen._pictures[realPictureId] = P;
				}
			} else { $gameScreen.erasePicture(stand_leg); }

			//下着
			FileName = 'under/' + StandPoseID + "_" + UnderPicFileNum
			if ($gameScreen.picture(stand_under) && $gameScreen.picture(stand_under)._name == FileName) {
			} else {
				if (UnderPicFileNum != 0) { //取得した装備タグの衣装ファイル名が0(全裸)以外の場合  
					var realPictureId = $gameScreen.realPictureId(stand_under);
					var P = new Game_Picture();
					P.show(FileName, origin, Stand1X, Stand1Y, scale, scale, 240, 0);
					P._tone = $gameActors.actor(2).toneArray[user._equips[12]._itemId];
					$gameScreen._pictures[realPictureId] = P;
				} else {
					$gameScreen.erasePicture(stand_under)//全裸の場合消去
				}
			}
			//息
			FileName = BasePoseFileName + "_option_" + "0035"
			if ($gameScreen.picture(effect_breath) && $gameScreen.picture(effect_breath)._name == FileName) {
			} else {
				if (BreathFlag >= 1) {
					$gameSwitches._data[52] = true; //吐息アニメ    
					$gameScreen.showPicture(effect_breath, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0);
				} else {
					$gameSwitches._data[52] = false; //吐息アニメ
					$gameScreen.erasePicture(effect_breath);
				}
			}
			//表情    
			var FaceId = AutoFaceId(user);
			if (user._classId == 4 && StandPoseID <= 2) {
				if (user.isStateAffected(435)) {
					FaceId = '62a';
				} else if (user.isStateAffected(436)) {
					FaceId = '62b';
				} else if (user.isStateAffected(437)) {
					FaceId = '62c';
				} else if (user.isStateAffected(438)) {
					FaceId = '62d';
				} else if (user.isStateAffected(439)) {
					FaceId = '62e';
				}
			}//魔人
			if (FaceId == 0 || ['06', '10'].includes(StandPoseID) || !$gameScreen.picture(stand_base)) {
				if ($gameScreen.picture(stand_face)) $gameScreen.erasePicture(stand_face);
			} else {
				FaceId = ('0000' + FaceId).slice(-4); //ゼロ埋め
				FileName = BasePoseFileName + "_face_" + FaceId;
				if ($gameScreen.picture(stand_face) && $gameScreen.picture(stand_face)._name == FileName) {
				} else {
					$gameScreen.showPicture(stand_face, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0);
				}
			}

			//汗水+爱液
			if (SweatFlag < 1 && LovejuiceFlag < 1) { $gameScreen.erasePicture(stand_sweat); }
			else {
				if (SweatFlag >= 1 && LovejuiceFlag >= 1) { var SweatPicFileNum = "0032" }
				else if (SweatFlag >= 1 && LovejuiceFlag == 0) { var SweatPicFileNum = "0036" }
				else if (SweatFlag == 0 && LovejuiceFlag >= 1) { var SweatPicFileNum = "0031" }
				else { }
				FileName = BasePoseFileName + "_option_" + SweatPicFileNum;
				if ($gameScreen.picture(stand_sweat) && $gameScreen.picture(stand_sweat)._name == FileName) { }
				else { $gameScreen.showPicture(stand_sweat, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//侵蚀
			if (!ConfigManager.Erode) { $gameScreen.erasePicture(stand_ero); }
			else {
				FileName = 'mark/' + StandPoseID + "_9";
				if (StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
				var s = ($gameVariables.value(1030) - 45) * 5;
				if ($gameScreen.picture(stand_ero) && $gameScreen.picture(stand_ero)._name == FileName && $gameScreen.picture(stand_ero)._opacity == s) { }
				else { $gameScreen.showPicture(stand_ero, FileName, origin, Stand1X, Stand1Y, scale, scale, s, 0); }
			}
			//伤痕
			if (ScarFlag < 1) { $gameScreen.erasePicture(stand_scar); }
			else {
				FileName = 'mark/' + StandPoseID + "_8";
				if ($gameScreen.picture(stand_scar) && $gameScreen.picture(stand_scar)._name == FileName) { }
				else { $gameScreen.showPicture(stand_scar, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//涂鸦
			if (PaintIndex == "0") { $gameScreen.erasePicture(stand_paint); }
			else {
				FileName = 'mark/' + StandPoseID + "_" + PaintIndex;
				if (StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
				if ($gameScreen.picture(stand_paint) && $gameScreen.picture(stand_paint)._name == FileName) { }
				else { $gameScreen.showPicture(stand_paint, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//淫紋
			if (Mark1 == "0") { $gameScreen.erasePicture(stand_mark1); }
			else {
				FileName = 'mark/' + StandPoseID + "_" + Mark1;
				if ($gameScreen.picture(stand_mark1) && $gameScreen.picture(stand_mark1)._name == FileName) { }
				else {
					$gameScreen.showPicture(stand_mark1, FileName, origin, Stand1X, Stand1Y, scale, scale, 200, 0);
					$gameScreen.picture(stand_mark1)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
					$gameScreen.showPicture(stand_Lmark1, FileName, origin, Stand1X, Stand1Y, scale, scale, 66, 0);
					$gameScreen.picture(stand_Lmark1)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
				}
			}
			if (Mark2 == "0") { $gameScreen.erasePicture(stand_mark2); }
			else {
				FileName = 'mark/' + StandPoseID + "_" + Mark2;
				if ($gameScreen.picture(stand_mark2) && $gameScreen.picture(stand_mark2)._name == FileName) { }
				else {
					$gameScreen.showPicture(stand_mark2, FileName, origin, Stand1X, Stand1Y, scale, scale, 200, 0);
					$gameScreen.picture(stand_mark2)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
					$gameScreen.showPicture(stand_Lmark2, FileName, origin, Stand1X, Stand1Y, scale, scale, 66, 0);
					$gameScreen.picture(stand_Lmark2)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
				}
			}
			//眼罩
			if (EyePicFileNum == 0 || demonBody) { $gameScreen.erasePicture(stand_eye); }
			else {
				FileName = 'eye/' + StandPoseID + "_" + EyePicFileNum;
				if ($gameScreen.picture(stand_eye) && $gameScreen.picture(stand_eye)._name == FileName) { }
				else { $gameScreen.showPicture(stand_eye, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//口球
			if (MouthPicFileNum == 0) { $gameScreen.erasePicture(stand_mouth); }
			else {
				FileName = 'mouth/' + StandPoseID + "_" + MouthPicFileNum;
				if ($gameScreen.picture(stand_mouth) && $gameScreen.picture(stand_mouth)._name == FileName) { }
				else { $gameScreen.showPicture(stand_mouth, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//项链
			if (NeckPicFileNum == 0) { $gameScreen.erasePicture(stand_neck); }
			else {
				FileName = 'neck/' + StandPoseID + "_" + NeckPicFileNum;
				if ($gameScreen.picture(stand_neck) && $gameScreen.picture(stand_neck)._name == FileName) { }
				else { $gameScreen.showPicture(stand_neck, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//耳朵
			if (EarPicFileNum == 0) { $gameScreen.erasePicture(stand_ear); }
			else {
				FileName = 'ear/' + StandPoseID + "_" + EarPicFileNum;
				if ($gameScreen.picture(stand_ear) && $gameScreen.picture(stand_ear)._name == FileName) { }
				else {
					$gameScreen.showPicture(stand_ear, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0);
					if (!$dataArmors[earId].meta.noTone) {
						if (StandAltFlag >= 1) $gameScreen.picture(stand_ear)._tone = user.hairToneb;
						else $gameScreen.picture(stand_ear)._tone = user.hairTone;
					}
				}
			}
			//避孕套
			if (!$gameSwitches.value(2910)) { $gameScreen.erasePicture(stand_byt); }
			else {
				FileName = 'BYT/' + StandPoseID + '_' + $gameVariables.value(4888);
				if (StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
				if ($gameScreen.picture(stand_byt) && $gameScreen.picture(stand_byt)._name == FileName) { }
				else { $gameScreen.showPicture(stand_byt, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//阴蒂环
			if (ClitPicFileNum == 0) { $gameScreen.erasePicture(stand_clitRing); }
			else {
				FileName = 'clit/' + StandPoseID + "_" + ClitPicFileNum;
				if ($gameScreen.picture(stand_clitRing) && $gameScreen.picture(stand_clitRing)._name == FileName) { }
				else { $gameScreen.showPicture(stand_clitRing, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//ピアスL
			if (PiercePicFileNum == 0) { $gameScreen.erasePicture(stand_pierceL); }
			else {
				FileName = 'nipple/' + StandPoseID + "_" + PiercePicFileNum;
				if ($gameScreen.picture(stand_pierceL) && $gameScreen.picture(stand_pierceL)._name == FileName) { }
				else { $gameScreen.showPicture(stand_pierceL, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//ピアスR
			if (PiercePicFileNumR == 0) { $gameScreen.erasePicture(stand_pierceR); }
			else {
				FileName = 'nipple/' + StandPoseID + "_" + PiercePicFileNumR;
				if ($gameScreen.picture(stand_pierceR) && $gameScreen.picture(stand_pierceR)._name == FileName) { }
				else { $gameScreen.showPicture(stand_pierceR, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//喷水
			if (!$gameSwitches.value(2914)) { $gameScreen.erasePicture(effect_splash); }
			else {
				FileName = BasePoseFileName + "_option_" + "0037";
				if ($gameScreen.picture(effect_splash) && $gameScreen.picture(effect_splash)._name == FileName) { }
				else { $gameScreen.showPicture(effect_splash, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//精液body
			if (SemenBody < 1) { $gameScreen.erasePicture(stand_semenbody); }
			else {
				if (SemenBody >= 15) { var SemenBodyPicFileNum = "0006" }
				else if (SemenBody >= 8) { var SemenBodyPicFileNum = "0005" }
				else { var SemenBodyPicFileNum = "0004" }
				FileName = BasePoseFileName + "_semen_" + SemenBodyPicFileNum;
				if ($gameScreen.picture(stand_semenbody) && $gameScreen.picture(stand_semenbody)._name == FileName) { }
				else { $gameScreen.showPicture(stand_semenbody, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//精液face
			if (SemenFace < 1) { $gameScreen.erasePicture(stand_semenface); }
			else {
				if (SemenFace >= 15) { var SemenFacePicFileNum = "0003" }
				else if (SemenFace >= 8) { var SemenFacePicFileNum = "0002" }
				else { var SemenFacePicFileNum = "0001" }
				FileName = BasePoseFileName + "_semen_" + SemenFacePicFileNum;
				if ($gameScreen.picture(stand_semenface) && $gameScreen.picture(stand_semenface)._name == FileName) { }
				else { $gameScreen.showPicture(stand_semenface, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//精液下体
			if (SemenVagina < 1 && SemenAnus < 1) { $gameScreen.erasePicture(stand_semenhole); }
			else {
				if (SemenVagina >= 1 && SemenAnus >= 1) { var SemenHolePicFileNum = "0009" }
				else if (SemenVagina >= 1 && SemenAnus == 0) { var SemenHolePicFileNum = "0007" }
				else if (SemenVagina == 0 && SemenAnus >= 1) { var SemenHolePicFileNum = "0008" }
				else { }
				FileName = BasePoseFileName + "_semen_" + SemenHolePicFileNum;
				if ($gameScreen.picture(stand_semenhole) && $gameScreen.picture(stand_semenhole)._name == FileName) { }
				else { $gameScreen.showPicture(stand_semenhole, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//精液口
			if (SemenMouth < 1) { $gameScreen.erasePicture(stand_semenmouth); }
			else {
				FileName = BasePoseFileName + "_semen_" + "0010";
				if ($gameScreen.picture(stand_semenmouth) && $gameScreen.picture(stand_semenmouth)._name == FileName) { }
				else { $gameScreen.showPicture(stand_semenmouth, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0); }
			}
			//赋值
			$gameSwitches._data[1785] == true
			if (poseName != 0 && StandPoseID >= 4) {
				OrganID = $sexPoseId[poseName].OrganID;
				Dif1PicFileName = $sexPoseId[poseName].Dif1PicFileName;
				Dif2PicFileName = $sexPoseId[poseName].Dif2PicFileName;
			}
			//暂无解决办法，只能重新使用这种进行色情拘束立绘判断
			//色情立绘字典
			const BindTypeRestraint = {
				'04_1_0_0_0_0': ['manhand', 'man', 0],
				'04_2_0_0_0_0': ['tentacle', 0, 0],
				'04_3_0_0_0_0': ['tentaclewall', 'tentaclewallback', 0],
				'04_4_0_0_0_0': ['worm', 0, 0],
				'04_5_0_0_0_0': [0, 0, 0],
				'04_10_0_0_0_0': ['chain', 0, 0],
				'04_11_0_0_0_0': ['tickle', 0, 0],
				'04_15_0_0_0_0': [0, 0, 0],
				'04_16_0_0_0_0': [0, 0, 0],
				'04_17_0_0_0_0': [0, 0, 0],
				'04_18_0_0_0_0': [0, 0, 0],
				'05_1_0_0_0_1': ['man01_penis', 'man01', 0],
				'05_1_0_1_0_0': ['man01_penis_v', 'man01', 51],
				'05_2_0_0_0_0': ['tentacle_01', 0, 0],
				'05_2_2_2_0_0': ['tentacle_05', 0, 0],
				'05_2_2_0_2_0': ['tentacle_06', 0, 0],
				'05_2_0_2_0_0': ['tentacle_02', 0, 0],
				'05_2_0_0_2_0': ['tentacle_03', 0, 0],
				'05_2_0_2_2_0': ['tentacle_04', 0, 0],
				'05_2_2_2_2_0': ['tentacle_07', 0, 0],
				'05_20_0_0_0_0': ['tentacleman_01', 0, 0],
				'05_20_20_0_0_0': ['tentacleman_02', "tentacleman", 0],
				'05_21_21_0_0_0': ['tentacleman_03', 'tentacleman', 0],
				'05_21_21_0_0_21': ['tentacleman_04', 'tentacleman', 0],
				'05_21_21_21_0_0': ['tentacleman_05', 'tentacleman', 0],
				'05_21_21_0_21_0': ['tentacleman_06', 'tentacleman', 0],
				'06_1_0_1_1_0': ['man01', 0, 0],
				'06_1_0_0_1_0': ['man01', 0, 0],
				'07_10_0_1_0_0': ['man02_hand', 'man02', 0],
				'07_10_0_1_1_0': ['man01_hand02', 'man01', 0],
				'07_1_0_1_1_0': ['man01_hand', 'man01', 0],
				'08_1_0_1_0_0': ['man01_penis_v', 'man01', 81],
				'08_1_0_0_1_0': ['man01_penis_a', 'man01', 0],
				'08_1_1_1_0_0': ['penis_m', 'man01', '81'],
				'08_1_1_0_1_0': ['penis_ma', 'man01', 0],
				'08_1_1_1_1_0': ['penis_maa', 'man01', 82],
				'08_8_0_0_0_0': ['tentaclehypnosis', 0, 0],
				'08_9_0_0_0_0': ['tentaclechair_f', 'tentaclechair', 0],
				'08_9_0_1_1_0': ['tentaclechair_w', 'tentaclechair', 0],
				'08_1_0_0_1_0': ['man01_penis_a', 'man01', 0],
				'09_1_1_0_0_0': ['mouthhuman', 0, 0],
				'09_2_2_0_0_0': ['mouthtentacle', 0, 0],
				'09_1_1_0_0_0': ['mouthhuman', 0, 0],
				'10_1_0_0_0_0': [0, 0, 0],
				'10_1_0_1_0_0': ['man', 0, 0]
			};
			let key = `${StandPoseID}_${BindType}_${MouthStateID}_${VaginaStateID}_${AnusStateID}_${WaitStateID}`;
			// 检查组合是否存在于映射中，并相应更新文件名
			if (BindTypeRestraint.hasOwnProperty(key)) {
				[Dif1PicFileName, Dif2PicFileName, OrganID] = BindTypeRestraint[key];
			}
			//方便自动创建字典列表
			// if (typeof bbb === "undefined") bbb = 0;
			// var aaa = "'"+key+"'"+":['"+Dif1PicFileName+"','"+Dif2PicFileName+"','"+OrganID+"']"
			// if(aaa !== bbb)
			// {
			// 	console.log(aaa)
			// 	bbb = aaa;
			// }
			if (user.hasArmor($dataArmors[83]) && StandPoseID == 8 && VaginaStateID == 1) Dif1PicFileName += 'b';
			if (VaginaStateID > 0) user.biriSocks();
			if (StandPoseID <= 2) { FileName = 'weapon/' + StandPoseID + '_' + weaponIndex; Dif1PicFileName = weaponIndex; }
			else FileName = BasePoseFileName + "_sexual_" + Dif1PicFileName;

			if ($gameScreen.picture(stand_diffront) && $gameScreen.picture(stand_diffront)._name == FileName) {
				//既に同じファイル名が表示されてる場合はスルー
			} else {
				if (Dif1PicFileName != 0) {
					$gameScreen.showPicture(stand_diffront, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0);
				} else {
					$gameScreen.erasePicture(stand_diffront)
				}
			}
			FileName = "organ/" + OrganID + 'v';
			if ($gameScreen.picture(stand_pv) && $gameScreen.picture(stand_pv)._name == FileName) {
				//既に同じファイル名が表示されてる場合はスルー
			} else {
				if (OrganID != 0) {
					$gameScreen.showPicture(stand_pv, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0)
					if (!ConfigManager.noBlacken) $gameScreen.showPicture(stand_pvb, FileName + 'b', origin, Stand1X, Stand1Y, scale, scale, ((($gameVariables.value(1104) + $gameVariables.value(1106)) * 10 + $gameVariables.value(1045)) / 2.5).clamp(0, 160), 0)
				} else {
					$gameScreen.erasePicture(stand_pv)
					$gameScreen.erasePicture(stand_pvb)
				}
			}


			FileName = BasePoseFileName + "_sexual_" + Dif2PicFileName//ファイル名指定
			if ($gameScreen.picture(stand_difback) && $gameScreen.picture(stand_difback)._name == FileName) {
				//既に同じファイル名が表示されてる場合はスルー
			} else {
				if (Dif2PicFileName != 0) {
					$gameScreen.showPicture(stand_difback, FileName, origin, Stand1X, Stand1Y, scale, scale, 255, 0)
				} else {
					$gameScreen.erasePicture(stand_difback)
				}
			}

			//アニメーション座標
			if (StandAnimeX != 0 || StandAnimeY != 0) {
				$gameVariables._data[902] = Stand1X
				$gameVariables._data[903] = Stand1Y
				var StandMoveX = Stand1X
				var StandMoveY = Stand1Y
				StandMoveX = Stand1X + StandAnimeX
				StandMoveY = Stand1Y + StandAnimeY
				this.wait(5)

				//動かす処理
				for (var i = 0; i < stand_array.length; i++) {
					MovePic(stand_array[i], Stand1X, Stand1Y, StandMoveX, StandMoveY, StandAnimeWait)
				}
				this.wait(5)
			}

			//呼吸处理
			if ($gameScreen.picture(effect_breath)) {
				if (!window.breathDir) window.breathDir = -5
				if (window.breathDir >= 0) {
					window.breathDir -= 5;
					if (Math.abs(window.breathDir) < 10) {
						window.breathDir = -40;
						$gameScreen.movePicture(effect_breath, origin, Stand1X, Stand1Y, scale, scale, 180, 0, 20);
					}
				} else {
					window.breathDir += 5;
					if (Math.abs(window.breathDir) < 10) {
						window.breathDir = 120;
						$gameScreen.movePicture(effect_breath, origin, Stand1X, Stand1Y, scale, scale, 0, 0, 60);
					}
				}
			}
		};//おわり


		//消去コマンド
		if (command === 'ResetStandEro') {//消去1
			$gameVariables._data[912] = 0//強制指定解除
			$gameVariables._data[415] = 0//拘束相手
			$gameVariables._data[351] = 0//口
			$gameVariables._data[352] = 0//膣
			$gameVariables._data[353] = 0//尻
			$gameVariables._data[354] = 0//挿入まち
			$gameScreen.erasePicture(110)
			$gameScreen.erasePicture(143) //这俩为敌人图层
		}

		if (command === 'EraceStand1' || command === 'EraceStand') {//消去1
			for (var i = 34; i <= 59; i++) { $gameScreen.erasePicture(i); }
			for (var i = 110; i <= 150; i++) { $gameScreen.erasePicture(i); }
		}


		if (command === 'TempEraceStand1' || command === 'イベント中一時立ち絵消去') {//消去1
			$gameSwitches._data[46] = true;
		}


		if (command === 'StandAnimation') {//アニメーションのみ
			var Stand1X = 450
			var Stand1Y = 50
			if (args[0] != null) { var StandAnimeX = Number(args[0]) } else { var StandAnimeX = 0 };//アニメーション座標X
			if (args[1] != null) { var StandAnimeY = Number(args[1]) } else { var StandAnimeY = 0 };//アニメーション座標Y
			if (args[2] != null) { var StandAnimeWait = Number(args[2]) } else { var StandAnimeWait = 1 };//アニメーションウェイト
			if (StandAnimeX != 0 || StandAnimeY != 0) {
				var StandMoveX = Stand1X + StandAnimeX
				var StandMoveY = Stand1Y + StandAnimeY
				for (var i = 110; i <= 150; i++) {
					MovePic(i, Stand1X, Stand1Y, StandMoveX, StandMoveY, StandAnimeWait)
				}
			}
		}
	};
	/**
	 * @param MovePic 移动图片函数
	 * @param TempPicNum：图片编号
	 * @param Stand1X：图片1的X坐标
	 * @param Stand1Y：图片1的Y坐标
	 * @param StandMoveX：移动点的X坐标
	 * @param StandMoveY：移动点的Y坐标
	 * @param StandAnimeWait：移动动画等待时间
	 */
	function MovePic(TempPicNum, Stand1X, Stand1Y, StandMoveX, StandMoveY, StandAnimeWait) {
		if ($gameScreen.picture(TempPicNum)) {
			Torigoya.Tween.create($gameScreen.picture(TempPicNum))
				.to({ _x: StandMoveX, _y: StandMoveY }, StandAnimeWait, Torigoya.Tween.Easing.easeOutSine)
				.to({ _x: Stand1X, _y: Stand1Y }, StandAnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
		}
	}
	function AutoFaceId(user) {
		if ($gameSwitches.value(15) || $gameSwitches.value(34)) { var FaceId = $gameVariables.value(895) }//イベント中or立ち絵エロ中はFaceIdで指定
		else {
			var FaceId = 2
			var Estrus = 35
			var BigEstrus = 60
			var OverEstrus = 61
			var Battle = 13
			var Extasy = 34
			var ShameSmile = 33
			var ShameUnhappy = 32
			var Shame = 31
			var Jito = 17
			var Joy = 5
			var Stern = 7
			var Yoin = 37
			var PokerFace = 2
			var MouthOpen = 25
			var Damage = 15
			var Orgasm = 36
			var BigOrgasm = 41
			var Hyp = 38

			if (user._classId == 3) { FaceId = 50; }//魅魔
			else if ($gameVariables.value(916) == 9 && $gameVariables.value(351) >= 1) { FaceId = MouthOpen }//奉仕
			else if (user.isStateAffected(164)) { FaceId = BigOrgasm }//强绝顶
			else if (user.isStateAffected(163)) { FaceId = Orgasm }//弱绝顶
			else if ($gameVariables.value(1027) >= 150) { FaceId = OverEstrus; }//界限発情中
			else if ($gameVariables.value(1027) >= 100) { FaceId = BigEstrus; }//强発情中
			else if ($gameVariables.value(1027) >= 50 && $gameVariables.value(1026) >= $gameVariables.value(619) * 0.5) { FaceId = Estrus; }//発情中
			else if (user.isStateAffected(165)) {
				if ($gameVariables.value(1033) == 3) FaceId = 40;
				else FaceId = 37;
			}//绝顶余韵
			else if ($gameVariables.value(1026) >= $gameVariables.value(619) * 0.5) { FaceId = Extasy }//快感高
			else if ($gameVariables.value(1020) >= 1) { FaceId = ShameUnhappy }//ぶっかけ
			else if (user.isStateAffected(28)) { FaceId = Shame }//羞恥
			else if ($gameParty.inBattle()) {
				if ($gameSwitches.value(38)) { FaceId = Joy }//戦闘終了時
				else if ($gameSwitches.value(170)) { FaceId = Damage }//ダメージ
				else if (user.isStateAffected(410)) { FaceId = Hyp }
				else { FaceId = Battle }//戦闘中
			}//暫定
			else if (user.isStateAffected(220)) { FaceId = Damage }//感情受伤
			else if (user.isStateAffected(219)) { FaceId = Jito }//感情じとー
			else if (user.isStateAffected(216)) { FaceId = Yoin }//感情余韻
			else if (user.isStateAffected(221)) { FaceId = Shame }//感情羞恥
			else if ($gameSwitches.value(228)) { FaceId = Shame }//露出中オン
			else if (user._equips[1]._itemId == 0 && $dataMap.meta["PubricSpot"]) {
				if ($gameVariables.value(1021) >= 100) {
					FaceId = ShameSmile
				} else { FaceId = Shame }
			}//全裸
			else if (user.hp < user.mhp / 4) { FaceId = 14 }
			else if ($dataMap.meta["EnemyBase"]) { FaceId = Stern }//平常敵ダンジョン攻略中
			else { FaceId = PokerFace };//平常
		}
		$gameVariables._data[895] = FaceId //変数に代入しておく
		return FaceId
	}
})();