cc.Class({
    extends: cc.Component,

    properties: {
        BallPrefab:{
            default:null,
            type:cc.Prefab,
        },
        
    },

    start () {
        
    },

    initBall: function()
    {
        var parent = cc.find("Canvas/Environment/BallParent");

        this.newBall(parent, this.node.position);
    },

    newBall: function (parent, position) {
        const ball = cc.instantiate(this.BallPrefab);
        ball.position = position;
        parent.addChild(ball);
        return ball;
    }
    // update (dt) {},
});
