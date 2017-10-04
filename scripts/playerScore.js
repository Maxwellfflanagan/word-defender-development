export default class PlayerScore {

    constructor(options) {
        this.player = options.player;
        this.$nameEl= options.$nameEl;
        this.$scoreEl= options.$scoreEl;
        this.score = 0;
        this.initialize();
    }

    initialize(){
        this.render();
    }

    addPoints(points){
        this.score = this.score + points;
        this.render();
    }

    currentScore(){
        return this.score;
    }

    render(){
        this.$scoreEl.html(this.score);
        this.$nameEl.html(this.player.name);
    }

};
