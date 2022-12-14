import EMath from '../extended-math'

export class SineRenderer {
    private eMath: EMath
    private lineWidth: number = 5
    private frequency: number = 0.5
    private amplitude: number = 300

    constructor(
        private context: CanvasRenderingContext2D,
        private phase: number = 0,
        private stroke: string = '#fff',
        private xOffset: number = 0,
        private yOffset: number = 0
    ) {
        this.eMath = new EMath()
    }

    public render() {
        this.context.beginPath()
        let x = this.context.canvas.width / 2
        let y = this.context.canvas.height
        for (; y > 0; y -= 0.1) {
            this.context.moveTo(x + this.xOffset, y + this.yOffset)
            x =
                this.context.canvas.width / 2 -
                this.waveFunc2(y + this.yOffset) +
                this.xOffset
            this.context.lineTo(x + this.xOffset, y + this.yOffset)
        }
        this.context.strokeStyle = this.stroke
        this.context.lineWidth = this.lineWidth
        this.context.stroke()
        this.context.closePath()
        this.phase += 50
    }

    private waveFunc1(angle: number): number {
        return (
            this.eMath.eSin(angle, this.phase, this.frequency) * this.amplitude
        )
    }

    private waveFunc2(angle: number): number {
        return (
            this.eMath.eSin(angle ** 0.5, this.phase, this.frequency ** 2) *
            this.eMath.eCos(angle, this.phase ** 2, this.frequency ** 0.5) *
            this.amplitude
        )
    }
}
