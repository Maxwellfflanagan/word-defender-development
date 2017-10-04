export default class PointsTimer {

    constructor(options) {
        this.zones = options.zones;
        this.onNoMoreTimers = options.onNoMoreTimers;
        this.$el = options.$el;
        this.timeout = null;
        this.position = 0;
        this.initialize()
    }

    initialize(){
        this.startCurrentTimer();
        this.renderCurrentPoints();
    }

    startCurrentTimer(){
        this.timeout = setTimeout(this.nextPointZone.bind(this), this.zones[this.position].time);
        this.renderCurrentPoints();
    }

    renderCurrentPoints(){
        this.$el.html("<span class='timer timer-" +this.currentPoints() + "'/>");
    }

    currentPoints(){
        return this.zones[this.position].points;
    }

    nextPointZone(){
        if (this.position + 1 >= this.zones.length) {
            this.onNoMoreTimers();
        } else {
            this.position = this.position + 1;
            this.startCurrentTimer();
            this.renderCurrentPoints();
        }
    }

    pause(){
        clearTimeout(this.timeout);
    }

};
