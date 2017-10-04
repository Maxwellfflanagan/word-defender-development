import AudioManager from './audioManager';
import Word from './word';

export default class OnsetRimeWord extends Word {

    getOnsetAudio(){
        return this.stimulus.onsetAudio;
    }

    getRimeAudio(){
        return this.stimulus.rimeAudio;
    }

    getOnset(){
        if (!this.onset) {
            var onset = this.stimulus.onsetAudio.replace(/\\/g, '/');
            this.onset = onset.substring(onset.lastIndexOf('/')+1, onset.lastIndexOf('.'));
        }
        return this.onset;
    }

    getRime(){
        if (!this.rime) {
            var rime = this.stimulus.rimeAudio.replace(/\\/g, '/');
            this.rime = rime.substring(rime.lastIndexOf('/')+1, rime.lastIndexOf('.'));
        }
        return this.rime;
    }

    review(){
        return new Promise(function(resolve, reject){
            this.reviewOnset().then(function(){
                return this.reviewRime();
            })
        }.bind(this));
    }

    reviewCorrect(){
        this.$el.addClass('correct');
    }

    speakPart(word, url){
        return new Promise(function(resolve, reject){
            AudioManager.playOrSpeak(word, url, resolve)
        }.bind(this))
    }

    reviewOnset(){
        return new Promise(function(resolve, reject){
            this.highlight('.onset');
            this.speakPart(this.getOnset(),this.getOnsetAudio()).then(this.delay(2000))
                .then(function(){
                    this.removeHighlight('.onset');
                    resolve();
                })
        }.bind(this));
    }

    reviewRime(){
        return new Promise(function(resolve, reject){
            this.highlight('.rime');
            this.speakPart(this.getRime(),this.getRimeAudio()).then(this.delay(2000))
                .then(function(){
                    this.removeHighlight('.rime');
                    resolve();
                })
        }.bind(this));
    }


    highlight(subSelector){
        this.$el.find(subSelector).addClass('highlight');
    }

    removeHighlight(){
        this.$el.find(subSelector).removeClass('highlight');
    }

    render(){
        this.$el.append($("<span/>").addClass('onset').text(this.getOnset()));
        this.$el.append($("<span/>").addClass('rime').text(this.getRime()));
        return this.$el;
    }

};



