import {Entity} from "./Entity";

class ObjectEntity implements Entity {
    x: number;
    y: number;
    name: string;
    img: HTMLImageElement;


    constructor(x: number, y: number, name: string, imgString: string) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = new Image();

        this.img.src = imgString;
    }


}