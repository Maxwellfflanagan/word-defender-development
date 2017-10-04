import CentralStation from 'centralstation';
import Word from './word';
import OnsetRimeWord from './onsetRimeWord';

export default class Character {

    constructor(options) {
        this.location = options.location;
        this.stimulus = options.stimulus;
        this.question = options.question;
        this.template = options.template;
        this.onCorrect = options.onCorrect;
        this.onIncorrect = options.onIncorrect;
        this.position = 0;
        this.word = this.initializeWord(this.stimulus);
        this.initialize()
    }

    initialize(){
        this.createElement();
        if (this.isCorrect()) {
            this.bindCorrectHandler();
            this.speak();
        } else {
            this.bindIncorrectHandler();
        }
    }

    initializeWord(word){
        return this.isOnsetOrRimeQuestion() ? new OnsetRimeWord({stimulus: word}) : new Word({stimulus: word});
    }

    getCorrectWord(){
        return $.grep(this.question.stimuli, function( s ) { return s.isCorrect; })[0];
    }

    isCorrect(){
       return this.stimulus.isCorrect;
    }

    isOnsetOrRimeQuestion(){
        return this.question.type == 'onset' || this.question.type == 'rime';
    }

    createElement(){
        this.$el = $("<Figure></Figure>").append(this.word.render()).append($("<span class='pointsTotal'></span>"));
    }

    changeWord(word){
        this.$el.html(word.render());
    }

    remove(){
        this.$el.remove();
    }

    bindCorrectHandler(){
        this.$el.on('click', function(e){ this.onCorrect(this) }.bind(this));
    }


    bindIncorrectHandler(){
        this.$el.on('click', function(e) { this.onIncorrect(this) }.bind(this));
    }

    displayPoints(points){
        this.$el.find('.pointsTotal').html(points);
        this.points = true;
    }

    review(){
        return this.word.review();
    }

    reviewCorrect(){
        var word = this.initializeWord(this.getCorrectWord());
        this.changeWord(word);
        return word.reviewCorrect();
    }

    speak(){
        return this.word.speak();
    }

    animate() {
        var frame = this.template[Math.floor(this.position / 2)];
        var translateText = 'transform: rotateZ(' + this.location.rotateY + 'deg) rotateX('+this.location.rotateX+'deg) translateZ(' + this.location.translateZ + 'px) rotateX(180deg); ';
        this.$el[0].style.cssText = 'display: inline-block; width:' + frame['frame']['w'] + 'px; height: ' + frame['frame']['h'] + 'px;'
                + 'background-position: -' + frame['frame']['x'] + 'px -' + frame['frame']['y'] + 'px ; ' +
                'padding: 0;' +
                translateText;
        this.$el[0].className = frame.classname + (this.points ? ' points' : '');
        this.position = (this.position + 1 >= this.template.length * 2) ? 0 : this.position + 1;
    }

};
