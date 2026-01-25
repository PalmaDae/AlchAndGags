import {Entity} from "./Entity";

export class Uebok implements Entity {
    x: number;
    y: number;
    name: string;
    img: HTMLImageElement


    constructor(x: number, y: number, name: string, imgString: string) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = new Image();

        this.img.src = imgString;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y);
    }

    talk(words: string[]): void {
        for (const word of words) {
            console.log(word)
        }
    }
}

