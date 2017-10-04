import {Howl} from 'howler';

export default {

    initialize(centralstation){
        this.centralStation = centralstation;
        this.wordAudio = [];
    },

    playOrSpeak(word, url, callback, minTime = 0){
        let startTime = new Date() * 1;
        if (this.centralStation.offline || !url){
            this.speakWordAudio(word, url, callback, startTime, minTime);
        }else if(this.wordAudio[url]){
            this.wordAudio[url].play();

            window.setTimeout(() => {
                if(callback) callback();
            }, minTime);
        }else{
            this.wordAudio[url] = new Howl({
                urls: [url],
                onload: () => {
                    if(this.wordAudio[url]){
                        this.wordAudio[url].play();

                        window.setTimeout(() => {
                            if(callback) callback();
                        }, Math.max((startTime - new Date() * 1), minTime));
                    }else{
                        this.speakWordAudio(word, url, callback, startTime, minTime);
                    }

                },
                onloaderror: () => {
                    this.speakWordAudio(word, url, callback, startTime, minTime);
                }
            });
        }
    },

    speakWordAudio(word, url, callback, startTime, minTime) {
        try {
            this.centralStation.TTSSpeak(word);
        } catch (e) {
            console.error(e);
        } finally {
            this.centralStation.offline = true;
            window.setTimeout(() => {
                    if(url && this.wordAudio[url]) {

                        delete this.wordAudio[url];
                    }
                    if (callback) callback();
                },
                Math.max((startTime - new Date() * 1), minTime)
            );
        }
    }

};
