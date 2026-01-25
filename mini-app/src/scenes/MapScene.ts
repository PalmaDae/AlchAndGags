import { Engine } from "../canvas/engine";
import { Entity } from "../entities/Entity";

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

        this.width = engine.width;
        this.height = engine.height;
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    update() {
        this.entities.forEach((entity) => {
            if ("update" in entity) {
                (entity as any).update();
            }
        });
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.mapImage, 0, 0, this.width, this.height);

        this.entities.forEach((entity) => {
            if ("render" in entity) {
                (entity as any).render(ctx);
            } else if ("image" in entity) {
                ctx.drawImage(entity.img, entity.x, entity.y);
            } else {
                ctx.fillStyle = "red";
                ctx.fillRect(entity.x, entity.y, 10, 10);
            }
        });
    }

    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
