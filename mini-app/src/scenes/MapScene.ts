import { Engine } from "../canvas/engine";
import { Entity } from "../entities/Entity";
import { Uebok } from "../entities/Uebok";
import { UebokScene } from "./UebokScene";

export class MapScene {
    private engine: Engine;
    private mapImage: HTMLImageElement;
    private entities: Entity[] = [];
    width: number;
    height: number;

    constructor(engine: Engine, mapImage: HTMLImageElement, entities: Entity[] = []) {
        this.engine = engine;
        this.mapImage = mapImage;
        this.entities = entities;

        this.width = engine.canvas.width;
        this.height = engine.canvas.height;

        this.engine.canvas.addEventListener("click", this.onClick);
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    render(ctx: CanvasRenderingContext2D) {
        //карта
        ctx.drawImage(this.mapImage, 0, 0, this.width, this.height);

        //сущности
        this.entities.forEach((entity) => {
            if ("render" in entity) {
                (entity as any).render(ctx);
            } else if ("img" in entity) {
                ctx.drawImage((entity as any).img, (entity as any).x, (entity as any).y);
            } else {
                ctx.fillStyle = "red";
                ctx.fillRect((entity as any).x, (entity as any).y, 10, 10);
            }
        });
    }

    update() {}

    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    private onClick = (e: MouseEvent) => {
        const rect = this.engine.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (const entity of this.entities) {
            if ("isHit" in entity && (entity as any).isHit(x, y)) {
                if (entity instanceof Uebok) {
                    const uebokScene = new UebokScene(this.engine, entity, this);
                    this.engine.setScene(uebokScene);
                }
                break;
            }
        }
    };
}
