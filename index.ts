const w : number = window.innerWidth
const h : number = window.innerHeight 
const background : string = 'indigo'
const scGap : number = 0.02 
const delay : number = 20

class State {

    scale : number = 0 
    dir : number = 0 
    prevScale : number = 0 

    update(cb : Function) {
        this.scale += scGap * this.dir 
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale 
            cb()
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale 
            cb()
        }
    }
}

class Animator {

    animated : boolean = false 
    interval : number 

    start(cb : Function) {
       if (!this.animated) {
          this.animated = true 
          this.interval = setInterval(cb, delay)
       }
    }

    stop() {
       if (this.animated) {
          this.animated = false 
          clearInterval(this.interval)
       }
    }
}

const animator : Animator = new Animator()