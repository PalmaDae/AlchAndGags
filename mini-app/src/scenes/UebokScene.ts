import { Engine } from "../canvas/engine";
import { Uebok } from "../entities/Uebok";
import { MapScene } from "./MapScene";

export class UebokScene {
    private engine: Engine;
    private mapScene: MapScene;
    private uebok: Uebok;

    width: number;
    height: number;

    private closeBtn = { x: 0, y: 0, w: 0, h: 0 };

    constructor(engine: Engine, uebok: Uebok, mapScene: MapScene) {
        this.engine = engine;
        this.uebok = uebok;
        this.mapScene = mapScene;

        this.width = engine.canvas.width;
        this.height = engine.canvas.height;

        this.engine.canvas.addEventListener("click", this.onClick);
    }

    update() {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, this.width, this.height);

        const imgHeight = this.height * 0.3;
        ctx.drawImage(this.uebok.img, 0, 0, this.width, imgHeight);

        // имя
        ctx.fillStyle = "black";
        ctx.font = "26px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(this.uebok.name, this.width / 2, imgHeight + 10);

        // сообщение
        ctx.font = "22px Arial";
        ctx.textBaseline = "middle";
        ctx.fillText(this.uebok.text, this.width / 2, this.height / 2);

        // кнопка закрыть
        const btnText = "ЗАКРЫТЬ";
        ctx.font = "20px Arial";
        const metrics = ctx.measureText(btnText);

        this.closeBtn.w = metrics.width;
        this.closeBtn.h = 24;
        this.closeBtn.x = this.width / 2 - this.closeBtn.w / 2;
        this.closeBtn.y = this.height - 30;

        ctx.fillText(btnText, this.width / 2, this.closeBtn.y);
    }

    private onClick = (e: MouseEvent) => {
        const rect = this.engine.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (
            x >= this.closeBtn.x &&
            x <= this.closeBtn.x + this.closeBtn.w &&
            y >= this.closeBtn.y - this.closeBtn.h &&
            y <= this.closeBtn.y
        ) {
            this.engine.canvas.removeEventListener("click", this.onClick);

            this.engine.setScene(this.mapScene);
        }
    };

    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
