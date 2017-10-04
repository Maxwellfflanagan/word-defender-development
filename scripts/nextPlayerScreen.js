export default class NextPlayerScreen {

    constructor(options) {
        this.players = options.players;
        this.$el = options.$el;
        this.initialize();
        this.callback = function(){};
    }

    initialize(){
        this.$el.find('.player-name.player1').html(this.players[0].name + "'s Turn");
        this.$el.find('.player-name.player2').html(this.players[1].name + "'s Turn");
        this.$el.on('click', this.hideScreen.bind(this));
    }

    showScreen(currentPlayerIndex, callback){
        this.$el.addClass('player'+(currentPlayerIndex + 1));
        this.callback = callback;
    }

    hideScreen(){
        this.$el.removeClass('player1 player2');
        this.callback();
    }


};
