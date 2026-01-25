import {Entity} from "./Entity";

class Uebok implements Entity {
    x: number;
    y: number;
    name: string;

    constructor(x: number, y: number, name: string) {
        this.x = x;
        this.y = y;
        this.name = name;
    }

    talk(words: string[]): void {
        for (const word of words) {
            console.log(word)
        }
    }
}

