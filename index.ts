const w : number = window.innerWidth
const h : number = window.innerHeight 
const background : string = 'indigo'
const scGap : number = 0.02 
const delay : number = 35

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

class FlexDiv {

    state : State = new State()
    div : HTMLDivElement = document.createElement('div')
    constructor(i : number) {
        this.div.innerHTML = `${i}`
        this.init()
    }
    init() {
        const size = Math.min(w, h) / 10 
        const width : string = `${size}px`
        const height : string = `${size}px`
        this.div.style.width = width 
        this.div.style.height = height 
        this.div.style.border = `1px solid ${background}`
        this.div.onclick = () => {
            this.state.startUpdating(() => {
                animator.start(() => {
                    this.update(() => {
                        animator.stop()
                        this.update(() => {

                        })
                    })
                })
            })
        }
    }

    update(cb : Function) {
        const size : number = Math.min(w, h) / 10 
        this.div.style.height = `${size + (h - size) * Math.sin(Math.PI * this.state.scale)}px`
        this.state.update(cb)
    }

    appendTo(parent : HTMLDivElement) {
        parent.appendChild(this.div)
    }
}

class FlexDivContainer {

    div : HTMLDivElement = document.createElement('div')
    flexDivs : Array<FlexDiv> = []

    constructor(n : number) {
        this.initStyle()
        this.createDivs(n)
    }

    initStyle() {
        this.div.style.display = 'flex'
        this.div.style.flexDirection = 'row'
        this.div.style.alignItems = 'flex-start'
        this.div.style.justifyContent = 'space-between'
        document.body.appendChild(this.div)
    }

    createDivs(n : number) {
        for (let i = 0; i < n; i++) {
            const div : FlexDiv = new FlexDiv(i)
            div.appendTo(this.div)
        }
    }
}

const flexDivContainer : FlexDivContainer = new FlexDivContainer(6)
