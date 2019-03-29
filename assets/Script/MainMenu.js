cc.Class({
    extends: cc.Component,

    properties: {
        selectTeamPrefab: {
            default: null,
            type: cc.Prefab,
        },
        selectMatchPrefab: {
            default: null,
            type: cc.Prefab,
        },
        diactiveBartarCup:{
            default: null,
            type:cc.SpriteFrame
        },
        diactiveHazfiCup:{
            default: null,
            type:cc.SpriteFrame
        }
    },

    start() {
        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");

        for (var j = 0; j < this.teamManager.players.length; j++) {
                
                cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                });

                cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                });

                cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                });
                
                cc.loader.loadRes("logo/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                });
            
        }

        this.canvas = cc.find("Canvas");

        var bartarCup = cc.find("Canvas/shelf_3/cup_bartar");
        var hazfiCup = cc.find("Canvas/shelf_3/cup_hazfi");

        if(cc.sys.localStorage.getItem(1 + "_detail_" + "week_" + 15) == null)
        {
            bartarCup.getComponent(cc.Sprite).spriteFrame = this.diactiveBartarCup;
            bartarCup.getComponent(cc.Button).interactable = false;
        }
        if(cc.sys.localStorage.getItem(2 + "_detail_" + "week_" + 30) == null)
        {
            hazfiCup.getComponent(cc.Sprite).spriteFrame = this.diactiveHazfiCup;
            hazfiCup.getComponent(cc.Button).interactable = false;
        }
        this.setPlayer(cc.sys.localStorage.getItem("team"));
    },

    setPlayer: function(selectedteamID)
    {
        for (var j = 0; j < this.teamManager.players.length; j++) {
            if (this.teamManager.players[j].teamID ==  selectedteamID) {
                var player = cc.find("Canvas/shelf_2/Player");
                player.getChildByName("jersey").getChildByName("numberLbl").getComponent(cc.Label).string = this.teamManager.players[j].number;
                
                cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                    player.getChildByName("body").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                    player.getChildByName("head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                    player.getChildByName("jersey").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                return;
            }
        }
    },


    aboutUsClick: function () {

    },
    storeClick: function () {

    },
    teamSelectClick: function () {

        const selectTeamNode = cc.instantiate(this.selectTeamPrefab);
        this.canvas.addChild(selectTeamNode);
    },
    rubikupClick: function () {
        const selectMatchNode = cc.instantiate(this.selectMatchPrefab);
        this.canvas.addChild(selectMatchNode);
        selectMatchNode.getComponent("MatchList").cup = 1;
    },
    premierLeague_1Click: function () {
        const selectMatchNode = cc.instantiate(this.selectMatchPrefab);
        this.canvas.addChild(selectMatchNode);
        selectMatchNode.getComponent("MatchList").cup = 2;
    },
    cupClick: function () {
        const selectMatchNode = cc.instantiate(this.selectMatchPrefab);
        this.canvas.addChild(selectMatchNode);
        selectMatchNode.getComponent("MatchList").cup = 3;
    },
    premierLeague_2Click: function () {
        const selectMatchNode = cc.instantiate(this.selectMatchPrefab);
        this.canvas.addChild(selectMatchNode);
        selectMatchNode.getComponent("MatchList").cup = 4;
    }
});