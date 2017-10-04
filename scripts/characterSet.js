import Character from './character.js'

export default class CharacterSet {

    constructor(options) {
        this.characters = [];
        this.quadrants = this.shuffleArray([0,1,2,3]);
        this.characterTemplates = this.shuffleArray(options.characterTemplates.slice(0));
        this.$viewpointElement = options.viewpointElement;
        this.question = options.question;
        this.onCorrect = options.onCorrect;
        this.onIncorrect = options.onIncorrect;
        this.generateCharacters();
        this.populateCharacters();

    }

    generateCharacters() {
        this.characters = this.question.stimuli.map(this.generateCharacter.bind(this))
    }

    generateCharacter(stimulus){
        return new Character({location: this.randomLocation(),
            template: this.randomTemplate(),
            stimulus: stimulus,
            onCorrect: this.onCorrect,
            onIncorrect: this.onIncorrect,
            question: this.question
        })
    }

    animate(){
        this.characters.forEach(function(character){character.animate.call(character)})
    }

    randomQuadrant(){

    }

    randomLocation(){
        return {
            rotateX: Math.floor(Math.random() * 110) + 40,
            rotateY: Math.floor(Math.random() * 90) + (this.quadrants.pop() * 90) + 1,
            rotateZ: 0,
            translateZ: 1500
        }
    }

    randomTemplate(){
        return this.characterTemplates.pop();
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    remove(){
        this.characters.forEach(function(character){
            character.remove();
        });
    }

    replayAudio(){
        $.grep(this.characters, function(c) { return c.isCorrect(); })[0].speak();
    }

    populateCharacters(){
        this.characters.forEach(this.appendCharacter.bind(this));
    }

    appendCharacter(character){
        this.$viewpointElement.append(character.$el)
    }


};
