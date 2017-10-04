import CentralStation from 'centralstation';
import CharacterSet from './characterSet';
import PointsTimer from './pointsTimer';
import PlayerScore from './playerScore';
import NextPlayerScreen from './nextPlayerScreen';
import AudioManager from './audioManager';
import bear from 'json/WD_blueBear_idle-0';
import bear1 from 'json/WD_blueBear_idle-1';
import bear2 from 'json/WD_blueBear_idle-2';
import bear3 from 'json/WD_blueBear_idle-3';
import tiger from 'json/WD_tiger_idle-0';
import tiger1 from 'json/WD_tiger_idle-1';
import tiger2 from 'json/WD_tiger_idle-2';
import panda from 'json/panda_idle-0';
import panda1 from 'json/panda_idle-1';
import panda2 from 'json/panda_idle-2';
import panda3 from 'json/panda_idle-3';
import redRainbow from 'json/nPG_redRainbowBear_idle01-0';
import redRainbow1 from 'json/nPG_redRainbowBear_idle01-1';
import redRainbow2 from 'json/nPG_redRainbowBear_idle01-2';
import pinkBear from 'json/WD_pinkBear_idle-0';
import pinkBear1 from 'json/WD_pinkBear_idle-1';
import pinkBear2 from 'json/WD_pinkBear_idle-2';
import pinkBear3 from 'json/WD_pinkBear_idle-3';

export default class App {

    constructor(environment) {
        this.characters = [];

        this.characterSprites = [
            {sprites: [bear, bear1, bear2, bear3]},
            {sprites: [tiger, tiger1, tiger2]},
            {sprites: [panda, panda1, panda2, panda3]},
            {sprites: [redRainbow, redRainbow1, redRainbow2]},
            {sprites: [pinkBear, pinkBear1, pinkBear2, pinkBear3]}
        ];
        this.direction = {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0
        }
        this.player = {
            id: window.localStorage.getItem('userId'),
            name: window.localStorage.getItem('firstName'),
            readingLevel: parseInt(window.localStorage.getItem('readingLevel')),
            token: window.localStorage.getItem('authToken')
        }
        this.players = [
            this.player,
            {
                name: 'Player 2'
            }
        ]

        this.$viewpointElement = $('#targets');
        this.playerScores = [
            new PlayerScore({
                $scoreEl: $('.wd-score.student'),
                $nameEl: $('.wd-player.student'),
                player: this.player
            }),
            new PlayerScore({
                $scoreEl: $('.wd-score.player2'),
                $nameEl: $('.wd-player.player2'),
                player: this.players[1]
            })
        ];
        this.nextPlayerScreen = new NextPlayerScreen({
            players: this.players,
            $el: $('.next-player__container')
        })
        this.currentPlayerIndex = 0;
        this.centralstation = new CentralStation('staging');
        this.centralstation.token = this.player.token;
        this.centralstation.players = [this.player.id];
        AudioManager.initialize(this.centralstation);
    }

    init(){
        this.centralstation.gameSession('word_defender').then((data) => {
            this.gameSessionId = data.id
        }).then(this.startGame()).catch(() => {
            // Keep going?
            // (window.top || window).location = this.centralStation.studentPortalUrl;
        });
    }

    startGame() {
        this.generateSpritemaps();
        this.startCamera();
        this.updateOnGyro();
        this.showNextPlayerScreen(this.currentPlayerIndex);
        this.bindReplayAudio();
        window.requestAnimationFrame(this.loop.bind(this))
    }


    startCamera() {
        setTimeout(function () {
            CameraPreview.startCamera({
                x: 0,
                y: 0,
                width: window.screen.width,
                height: window.screen.height,
                toBack: true,
                camera: 'back'
            }, function(){
                $('.container').css('border', '0px')
            });
        }, 200)
    }

    updateOnGyro() {

        var gn = new GyroNorm();
        var _this = this;

        gn.init({
            screenAdjusted: true
        }).then(function () {
            gn.start(function (data) {

                _this.direction = {
                    rotateY: -1 * data.do.gamma,
                    rotateX: 1 * data.do.beta,
                    rotateZ: (1 * data.do.alpha - 180)
                }
            });
        }).catch(function (e) {
            // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
        });
    }

    loop(timestamp) {
        this.render()
        window.requestAnimationFrame(this.loop.bind(this))
    }

    render(progress) {
        var translation = 'rotateY(' + this.direction.rotateY + 'deg) rotateX(' + this.direction.rotateX + 'deg) rotateZ(' + this.direction.rotateZ + 'deg) ';
        this.$viewpointElement.css("transform", translation);
        this.animateCharacters()
    }

    generateSpritemaps(){
        this.spriteMaps = this.characterSprites.map(this.getSpriteMapping)
    }

    getSpriteMapping(template) {
        var spriteMapping = [];
        template.sprites.forEach(function (s) {
            s.frames.forEach(function (f) {
                var sprite_number = parseInt(f.filename.split('_').pop());
                spriteMapping[sprite_number] = {
                    frame: f.frame,
                    sprite: s.meta.image,
                    filename: f.filename,
                    classname: s.meta.image.split('.')[0]
                }
            })
        });
        return spriteMapping;
    }

    animateCharacters() {
        if (this.characterSet){
            this.characterSet.animate();
        }
    }

    newQuestion() {
        this.centralstation.randomQuestion(this.player.id, this.player.readingLevel).then(this.displayQuestion.bind(this));
    }

    displayQuestion(question) {
        this.updateTurnIndicator();
        this.characterSet = new CharacterSet({  question: question,
                                                characterTemplates: this.spriteMaps,
                                                viewpointElement: this.$viewpointElement,
                                                onCorrect: this.correctFlow.bind(this),
                                                onIncorrect: this.incorrectFlow.bind(this)
        });
        this.replaceTimer();
    }

    replaceTimer(){
        this.timer = new PointsTimer({
            $el: $('.timer__container'),
            zones: [
                {
                    time: 3000,
                    points: 9
                },
                {
                    time: 3000,
                    points: 8
                },
                {
                    time: 3000,
                    points: 7
                },
                {
                    time: 3000,
                    points: 6
                },
                {
                    time: 3000,
                    points: 5
                },
                {
                    time: 3000,
                    points: 4
                },
                {
                    time: 3000,
                    points: 3
                },
                {
                    time: 3000,
                    points: 2
                },
                {
                    time: 3000,
                    points: 1
                }
            ],
            onNoMoreTimers: this.onNoMoreTimers.bind(this)
        })
    }

    bindReplayAudio(){
        $('.ear-button').on('click', function(e) { this.replayAudio(); }.bind(this) );
    }

    replayAudio(){
        this.characterSet.replayAudio();
    }

    correctFlow(character) {
        var _this = this;
        this.timer.pause();
        character.displayPoints(this.timer.currentPoints());
        this.playerScores[this.currentPlayerIndex].addPoints(this.timer.currentPoints());
        if (this.isStudent()){
            this.centralstation.logAnswer(character.question.assessed.id, character.stimulus.id, true, this.player.id, this.gameSessionId)
        }
        setTimeout(function(){
            _this.characterSet.remove();
            _this.nextPlayer.call(_this);
        }.bind(this), 3000)
    }

    isStudent(){
        return this.currentPlayerIndex === 0;
    }

    incorrectFlow(character) {
        var _this = this;
        this.timer.pause();
        if (this.isStudent()){
            this.centralstation.logAnswer(character.question.assessed.id, character.stimulus.id, false, this.player.id, this.gameSessionId)
        }
        character.review().then(function(){
            return character.reviewCorrect();
        }).then(this.delay(1000))
            .then(function(){
            _this.characterSet.remove();
            _this.nextPlayer.call(_this);
        });

    }

    nextPlayer(){
        this.currentPlayerIndex = this.currentPlayerIndex + 1 >= this.playerScores.length ? 0 : this.currentPlayerIndex + 1;
        this.showNextPlayerScreen();
    }

    showNextPlayerScreen(){
        this.nextPlayerScreen.showScreen(this.currentPlayerIndex, function(){
            this.newQuestion();
        }.bind(this));
    }

    updateTurnIndicator(){
        $('#lasso-area').removeClass('player1 player2');
        $('#lasso-area').addClass('player' + (this.currentPlayerIndex + 1));
    }

    delay(ms, value) {
        return function (val) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, ms, value !== undefined ? value : val);
            });
        };
    }

    onNoMoreTimers(){
        //alert("It's over here!");
    }


    getScreenshot() {

        CameraPreview.setOnPictureTakenHandler(function (picture) {
            document.body.style.cssText = 'background-image: url(data:image/jpeg;base64,' + picture + ')';
            navigator.screenshot.save(function (error, res) {
                if (error) {
                    console.error(error);
                } else {
                    cordova.plugins.imagesaver.saveImageToGallery(res.filePath, function () {
                        alert("Saved to Camera Roll!")
                        document.body.style.cssText = 'background: transparent';
                    }, function (error) {
                        console.error(error);
                    });
                }
            });
        });
        CameraPreview.takePicture({maxWidth: 640, maxHeight: 640});
    }

};
