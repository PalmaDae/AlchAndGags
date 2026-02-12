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

    private entityWidth = 100;
    private entityHeight = 100;

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
        ctx.drawImage(this.mapImage, 0, 0, this.width, this.height);

        this.entities.forEach((entity: any) => {
            if ("img" in entity) {
                ctx.drawImage(
                    entity.img,
                    entity.x,
                    entity.y,
                    this.entityWidth,
                    this.entityHeight
                );
            } else {
                ctx.fillStyle = "red";
                ctx.fillRect(
                    entity.x,
                    entity.y,
                    this.entityWidth,
                    this.entityHeight
                );
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

        for (const entity of this.entities as any[]) {
            const ex = entity.x;
            const ey = entity.y;

            if (
                x >= ex &&
                x <= ex + this.entityWidth &&
                y >= ey &&
                y <= ey + this.entityHeight
            ) {
                if (entity instanceof Uebok) {
                    const uebokScene = new UebokScene(this.engine, entity, this);
                    this.engine.setScene(uebokScene);
                }
                break;
            }
        }
    };
}
