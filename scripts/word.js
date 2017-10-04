import AudioManager from './audioManager';

export default class Word {

    constructor(options) {
        this.stimulus = options.stimulus;
        this.$el = options.$el || $("<span class='word'/>");
        this.centralStation = options.centralStation;
    }

    getText(){
        return this.stimulus.text;
    }


    speak(){
        return new Promise(function(resolve, reject){
            AudioManager.playOrSpeak(this.stimulus.text, this.stimulus.audio, resolve)
        }.bind(this))
    }

    delay(ms, value) {
        return function (val) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, ms, value !== undefined ? value : val);
            });
        };
    }

    review(){
        var _this = this;
        return new Promise(function(resolve, reject){
            this.highlight();
            this.speak().then(this.delay(2000))
                .then(function(){
                _this.removeHighlight();
                resolve();
                })
        }.bind(this));
    }

    reviewCorrect(){
        this.$el.addClass('correct');
        return this.review();
    }

    highlight(){
        this.$el.addClass('highlight');
    }

    removeHighlight(){
        this.$el.removeClass('highlight');
    }

    render(){
        return this.$el.html(this.getText());
    }

};



