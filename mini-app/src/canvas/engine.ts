export class Engine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

    private scene: any;

    constructor(container: HTMLElement) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;
        container.appendChild(this.canvas);

        this.resize();
        window.addEventListener("resize", () => this.resize());
    }

    setScene(scene: any) {
        this.scene = scene;
    }

    start() {
        requestAnimationFrame(this.loop);
    }

    private loop = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.scene) {
            this.scene.update();
            this.scene.render(this.ctx);
        }

        requestAnimationFrame(this.loop);
    };

    private resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
}
