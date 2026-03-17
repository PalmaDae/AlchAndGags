import { Engine } from "../canvas/engine";
import { Entity } from "../entities/Entity";
import { Uebok } from "../entities/Uebok";
import { UebokScene } from "./UebokScene";

export class MapScene {
    public engine: Engine;
    private mapImage: HTMLImageElement;
    private entities: Entity[] = [];
    width: number;
    height: number;

    private entityWidth = 150;
    private entityHeight = 150;

    cameraX = 0;
    cameraY = 0;
    scale = 1;

    private lastTouch: { x: number; y: number } | null = null;
    private lastDistance: number | null = null;

    private velocityX = 0;
    private velocityY = 0;
    private inertiaActive = false;
    private friction = 0.95;

    constructor(engine: Engine, mapImage: HTMLImageElement, entities: Entity[] = []) {
        this.engine = engine;
        this.mapImage = mapImage;
        this.entities = entities;

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.engine.canvas.width = this.width;
        this.engine.canvas.height = this.height;

        window.addEventListener("resize", () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.engine.canvas.width = this.width;
            this.engine.canvas.height = this.height;
        });

        this.engine.canvas.addEventListener("click", this.onClick);
        this.engine.canvas.addEventListener("touchstart", this.onTouchStart, { passive: false });
        this.engine.canvas.addEventListener("touchmove", this.onTouchMove, { passive: false });
        this.engine.canvas.addEventListener("touchend", this.onTouchEnd, { passive: false });

        this.scale = 1;
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.width, this.height);

        const visibleWidth = this.width / this.scale;
        const visibleHeight = this.height / this.scale;

        ctx.drawImage(
            this.mapImage,
            this.cameraX,
            this.cameraY,
            visibleWidth,
            visibleHeight,
            0,
            0,
            this.width,
            this.height
        );

        this.entities.forEach((entity: any) => {
            const ex = (entity.x - this.cameraX) * this.scale;
            const ey = (entity.y - this.cameraY) * this.scale;
            const ew = this.entityWidth * this.scale;
            const eh = this.entityHeight * this.scale;

            ctx.drawImage(entity.img, ex, ey, ew, eh);
        });
    }

    update() {}

    private moveCamera(dx: number, dy: number) {
        this.cameraX -= dx / this.scale;
        this.cameraY -= dy / this.scale;

        const maxCamX = Math.max(0, this.mapImage.width - this.width / this.scale);
        const maxCamY = Math.max(0, this.mapImage.height - this.height / this.scale);

        this.cameraX = Math.max(0, Math.min(maxCamX, this.cameraX));
        this.cameraY = Math.max(0, Math.min(maxCamY, this.cameraY));
    }

    private zoomAt(factor: number, centerX: number, centerY: number) {
        const oldScale = this.scale;
        let newScale = this.scale * factor;

        const minScaleX = this.width / this.mapImage.width;
        const minScaleY = this.height / this.mapImage.height;
        const minScale = Math.max(minScaleX, minScaleY);
        newScale = Math.max(newScale, minScale);
        newScale = Math.min(newScale, 3);

        const mapX = centerX / oldScale + this.cameraX;
        const mapY = centerY / oldScale + this.cameraY;

        this.scale = newScale;

        this.cameraX = mapX - centerX / this.scale;
        this.cameraY = mapY - centerY / this.scale;

        const maxCamX = Math.max(0, this.mapImage.width - this.width / this.scale);
        const maxCamY = Math.max(0, this.mapImage.height - this.height / this.scale);
        this.cameraX = Math.min(Math.max(this.cameraX, 0), maxCamX);
        this.cameraY = Math.min(Math.max(this.cameraY, 0), maxCamY);
    }

    private onClick = (e: MouseEvent) => {
        const rect = this.engine.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / this.scale + this.cameraX;
        const y = (e.clientY - rect.top) / this.scale + this.cameraY;

        for (const entity of this.entities as any[]) {
            const ex = entity.x;
            const ey = entity.y;
            if (x >= ex && x <= ex + this.entityWidth && y >= ey && y <= ey + this.entityHeight) {
                if (entity instanceof Uebok) {
                    const uebokScene = new UebokScene(this.engine, entity, this);
                    this.engine.setScene(uebokScene);
                }
                break;
            }
        }
    };

    private getDistance(t1: Touch, t2: Touch) {
        const dx = t2.clientX - t1.clientX;
        const dy = t2.clientY - t1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private onTouchStart = (e: TouchEvent) => {
        this.inertiaActive = false;

        const rect = this.engine.canvas.getBoundingClientRect();
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.lastTouch = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        } else if (e.touches.length === 2) {
            this.lastDistance = this.getDistance(e.touches[0], e.touches[1]);
        }
    };

    private onTouchMove = (e: TouchEvent) => {
        const rect = this.engine.canvas.getBoundingClientRect();
        if (e.touches.length === 1 && this.lastTouch) {
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            const dx = x - this.lastTouch.x;
            const dy = y - this.lastTouch.y;

            this.moveCamera(dx, dy);

            this.velocityX = dx;
            this.velocityY = dy;

            this.lastTouch = { x, y };
            e.preventDefault();
        } else if (e.touches.length === 2 && this.lastDistance) {
            const newDistance = this.getDistance(e.touches[0], e.touches[1]);
            const delta = newDistance - this.lastDistance;

            let factor = 1 + delta / 200;
            factor = Math.max(0.8, Math.min(1.2, factor));

            const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
            const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

            this.zoomAt(factor, centerX, centerY);
            this.lastDistance = newDistance;

            e.preventDefault();
        }
    };

    private onTouchEnd = (e: TouchEvent) => {
        const rect = this.engine.canvas.getBoundingClientRect();

        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.lastTouch = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        } else if (e.touches.length === 0) {
            this.lastTouch = null;
            this.startInertia();
        }

        if (e.touches.length < 2) this.lastDistance = null;
    };

    private startInertia() {
        this.inertiaActive = true;

        const step = () => {
            if (!this.inertiaActive) return;

            this.velocityX *= this.friction;
            this.velocityY *= this.friction;

            this.moveCamera(this.velocityX, this.velocityY);

            if (Math.abs(this.velocityX) < 0.1 && Math.abs(this.velocityY) < 0.1) {
                this.inertiaActive = false;
                return;
            }

            requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }
}