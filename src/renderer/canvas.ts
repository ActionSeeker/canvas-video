import Coordinates from '../interfaces/coordinates'
import EMath from './extended-math'
import { NoiseRenderer } from './figures/noise-renderer'
import { SineRenderer } from './figures/sine-renderer'
import { TriangleRenderer } from './figures/triangle-renderer'

export class CanvasManipuilator {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private video: HTMLVideoElement

    private sineRenderer1: SineRenderer
    private sineRenderer2: SineRenderer

    constructor(identifier: string, videoId: string) {
        this.canvas = document.getElementById(identifier) as HTMLCanvasElement
        this.context = this.canvas.getContext('2d', {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D
        this.video = document.getElementById(videoId) as HTMLVideoElement
        // this.sineRenderer = new SineRenderer(this.context, 2)

        this.video.addEventListener(
            'loadeddata',
            () => {
                this.resizeCanvasAndVideo()
                this.addResizeEventListener()

                this.video.autoplay = true
                this.video.loop = true
                this.video.play()
            },
            false
        )

        this.sineRenderer1 = new SineRenderer(this.context, 30, '#FF0000')
        this.sineRenderer2 = new SineRenderer(this.context, -150, '#ADC5CE')
    }

    private resizeCanvasAndVideo() {
        this.strechCanvasToViewPort()
        this.doLoad()
    }

    private doLoad() {
        this.video.addEventListener(
            'play',
            () => {
                this.timerCallback()
            },
            false
        )
    }

    private timerCallback() {
        if (this.video.paused || this.video.ended) {
            return
        }
        this.computeFrame()
        setTimeout(() => {
            this.timerCallback()
        }, 0)
    }

    private computeFrame() {
        this.context.drawImage(
            this.video,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        )

        let imageData = this.context.getImageData(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        )

        // for (let i = 0; i < imageData.data.length / 4; i++) {
        //     let r = imageData.data[i * 4]
        //     let g = imageData.data[i * 4 + 1]
        //     let b = imageData.data[i * 4 + 2]

        //     let isRedInRange = r >= 150 && r <= 200
        //     let isGreenInRange = g >= 160 && g <= 200
        //     let isBlueInRange = b >= 200 && b <= 220

        //     if (isRedInRange && isGreenInRange && isBlueInRange) {
        //         let isBlack = Math.random() <= 0.5
        //         imageData.data[i * 4] = isBlack ? 0 : 255
        //         imageData.data[i * 4 + 1] = isBlack ? 0 : 255
        //         imageData.data[i * 4 + 2] = isBlack ? 0 : 255
        //         imageData.data[i * 4 + 3] = 255
        //     }
        // }

        this.context.putImageData(imageData, 0, 0)

        this.sineRenderer1.render()
        this.sineRenderer2.render()

        return
    }

    private strechCanvasToViewPort() {
        this.canvas.width = Math.min(window.innerWidth, this.video.videoWidth)
        this.canvas.height = Math.max(
            window.innerHeight,
            this.video.videoHeight
        )
    }

    private addResizeEventListener() {
        window.addEventListener('resize', () => {
            this.resizeCanvasAndVideo()
        })
    }
}
