cc.Class({
    extends: cc.Component,

    properties: {
        TeamPage: {
            default: null,
            type: cc.Prefab,
        },
        StorePrefab: {
            default: null,
            type: cc.Prefab,
        },
        dialogPrefab: {
            default: null,
            type: cc.Prefab,
        },
        LoadingPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    start() {
        this.canvas = cc.find("Canvas");
        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");
        var content = cc.find("Canvas/Team PageView/view/content");
        
        
        this.loadingNode = cc.instantiate(this.LoadingPrefab);
        this.canvas.addChild(this.loadingNode);

        this.loadImage(0);

        //cc.log(cc.view.getFrameSize().height);
        //cc.log(this.node.height);

        //this.node.height = cc.find("Canvas").scaleY * cc.view.getFrameSize().height;
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");



        var self = this;
        this.node.on('change-coin', function () {
            self.setCoin();
        });

        this.page = 1;

        for (var i = 0; i < this.teamManager.teams.length; i++) {
            const teamPage = cc.instantiate(this.TeamPage);
            content.addChild(teamPage);
            var layout = content.getComponent(cc.Layout);
            //layout.type = cc.Layout.HORIZONTAL;
            layout.updateLayout();

            teamPage.getChildByName("team_logo").getChildByName("TeamNameLbl").getComponent(cc.Label).string = " " + this.teamManager.teams[i].name + "  ";
            var button = teamPage.getChildByName("SelectBtn").getComponent(cc.Button);
            var pruches = this.DBStorage.getItem("buyTeam_" + this.teamManager.teams[i].id)

            if (pruches != "yes" && this.teamManager.teams[i].price != 0) {
                button.node.getChildByName("BtnLbl").getComponent(cc.Label).string = this.replaceNum("سکه  " + this.teamManager.teams[i].price + "  ");
            }

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; //This node is the node to which your event handler code component belongs
            clickEventHandler.component = "TeamSelect";//This is the code file name
            clickEventHandler.handler = "selectTeam";
            clickEventHandler.customEventData = this.teamManager.teams[i].id;

            button.clickEvents.push(clickEventHandler);

            cc.loader.loadRes("logo/" + this.teamManager.teams[i].id, cc.SpriteFrame, function (err, spriteFrame) {
                teamPage.getChildByName("team_logo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            var count = 0;

            for (var j = 0; j < this.teamManager.players.length; j++) {
                if (this.teamManager.players[j].teamID == this.teamManager.teams[i].id) {

                    count++;
                    teamPage.getChildByName("team").getChildByName("Player" + count).getChildByName("jersey").getChildByName("numberLbl").getComponent(cc.Label).string = this.teamManager.players[j].number;

                    if (this.teamManager.teams[i].numberColor == "black")
                        teamPage.getChildByName("team").getChildByName("Player" + count).getChildByName("jersey").getChildByName("numberLbl").color = cc.Color.BLACK;

                    if (count == 1) {

                        cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player1").getChildByName("body").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player1").getChildByName("head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player1").getChildByName("jersey").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                    }
                    else if (count == 2) {
                        cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player2").getChildByName("body").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player2").getChildByName("head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player2").getChildByName("jersey").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                    }
                    else if (count == 3) {
                        cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player3").getChildByName("body").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player3").getChildByName("head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player3").getChildByName("jersey").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            //cc.log("k");
                        });
                    }
                }
            }
        }

        this.node.getComponent(cc.PageView).content = content;

        var content = cc.find("Canvas/Team PageView/view/content");
        //cc.log(content.width / 16);
        //cc.log(content.x);
        this.startX = content.x;
        //this.nextPage();

        this.setCoin();
    },

    setCoin: function () {
        var coin = this.DBStorage.getItem("coin", 0);

        var coinBox = this.node.getChildByName("coin_box");
        coinBox.getComponentInChildren(cc.Label).string = this.replaceNum(coin.toString());
    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },

    nextPage: function () {
        var pView = this.node.getComponent(cc.PageView);
        if (pView.getCurrentPageIndex() + 1 == pView.getPages().length) return;

        pView.setCurrentPageIndex((pView.getCurrentPageIndex() + 1) % pView.getPages().length);
    },

    previousPage: function () {
        var pView = this.node.getComponent(cc.PageView);
        if (pView.getCurrentPageIndex() + 1 == 1) return;

        pView.setCurrentPageIndex((pView.getPages().length + pView.getCurrentPageIndex() - 1) % pView.getPages().length);
    },

    selectTeam: function (event, customEventData) {
        var pruches = this.DBStorage.getItem("buyTeam_" + this.teamManager.teams[customEventData].id)
        if (pruches != "yes" && this.teamManager.teams[customEventData].price != 0) {
            var coin = this.DBStorage.getItem("coin");
            if (coin >= this.teamManager.teams[customEventData].price) {

                const dialog = cc.instantiate(this.dialogPrefab);
                cc.find("Canvas").addChild(dialog);
                var d = dialog.getComponent("Dialog");
                d.titleLable.string = this.teamManager.teams[customEventData].name;
                d.bodyLable.string = "میخوای این تیم رو بخری؟";
                d.positiveBtn.getComponentInChildren(cc.Label).string = "آره";
                d.negativeBtn.getComponentInChildren(cc.Label).string = "    فعلا نه";

                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; //This node is the node to which your event handler code component belongs
                clickEventHandler.component = "TeamSelect";//This is the code file name
                clickEventHandler.handler = "buyTeam";
                clickEventHandler.customEventData = customEventData;

                d.positiveBtn.clickEvents.push(clickEventHandler);
            }
            else {
                const dialog = cc.instantiate(this.dialogPrefab);
                cc.find("Canvas").addChild(dialog);
                var d = dialog.getComponent("Dialog");
                d.titleLable.string = ":( سکه نداری";
                d.bodyLable.string = "میخوای بری فروشگاه سکه بخری؟";
                d.positiveBtn.getComponentInChildren(cc.Label).string = "آره";
                d.negativeBtn.getComponentInChildren(cc.Label).string = "بیخیال";

                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; //This node is the node to which your event handler code component belongs
                clickEventHandler.component = "TeamSelect";//This is the code file name
                clickEventHandler.handler = "goToShop";
                clickEventHandler.customEventData = 0;

                d.positiveBtn.clickEvents.push(clickEventHandler);
            }
            //button.node.getChildByName("BtnLbl").getComponent(cc.Label).string = "سکه  " + this.teamManager.teams[i].price + "  ";
        }
        else {
            this.DBStorage.setItem("team", customEventData);
            this.DBStorage.save();
            cc.find("Canvas").getComponent("MainMenu").setPlayer(customEventData);
            this.close();
        }
        //cc.log("S: " + customEventData);


    },

    buyTeam: function (event, customEventData) {
        var coin = this.DBStorage.getItem("coin");

        this.DBStorage.setItem("team", customEventData);
        this.DBStorage.setItem("buyTeam_" + this.teamManager.teams[customEventData].id, "yes");

        coin -= this.teamManager.teams[customEventData].price;
        this.DBStorage.setItem("coin", coin);
        this.DBStorage.save();

        cc.find("Canvas").getComponent("MainMenu").setPlayer(customEventData);
        this.close();
    },

    goToShop: function (event, customEventData) {
        const storeNode = cc.instantiate(this.StorePrefab);
        this.canvas.addChild(storeNode);

        storeNode.getComponent("Shop").callBackNode = this.node;

    },
    loadImage: function (j) {
        if (j < this.teamManager.players.length) {
            var self = this;
            cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) { });

            cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) { });
            cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                self.loadImage(++j);
            });

            cc.loader.loadRes("logo/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) { });
        }
        else {
            this.loadingNode.destroy();
        }
    },


    close: function () {
        this.node.destroy();
    }
});

