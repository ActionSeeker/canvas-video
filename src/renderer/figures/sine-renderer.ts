export class SineRenderer {
    constructor(
        private context: CanvasRenderingContext2D,
        private lineWidth: number = 1,
        private phase: number = 0,
        private stroke: string = '#fff',
        private frequency: number = 5,
        private amplitude: number = 300
    ) {}

    public render() {
        this.context.beginPath()
        let x = this.context.canvas.width / 2
        for (let y = this.context.canvas.height; y > 0; y -= 0.1) {
            this.context.moveTo(x, y)
            x =
                this.context.canvas.width / 2 -
                Math.sin(((y + this.phase) * Math.PI * this.frequency) / 180) *
                    this.amplitude
            this.context.lineTo(x, y)
        }
        this.context.strokeStyle = this.stroke
        this.context.lineWidth = this.lineWidth
        this.context.stroke()
        this.context.closePath()
        this.phase += 50
    }
}
