import { Entity } from "./Entity";

export class Uebok implements Entity {
    x: number;
    y: number;
    name: string;
    img: HTMLImageElement;
    text: string;

    constructor(
        x: number,
        y: number,
        name: string,
        imgString: string,
        text: string
    ) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.text = text;

        this.img = new Image();
        this.img = new Image();
        this.img.src = imgString;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y);
    }

    isHit(mx: number, my: number): boolean {
        return (
            mx >= this.x &&
            mx <= this.x + this.img.width &&
            my >= this.y &&
            my <= this.y + this.img.height
        );
    }
}
