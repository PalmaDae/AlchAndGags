import { Engine } from "./canvas/engine";
import { MapScene } from "./scenes/MapScene";
import { Entity } from "./entities/Entity";
import { Uebok } from "./entities/Uebok";

const app = document.getElementById("app");
const engine = new Engine(app);

const entities: Entity[] = [];

const mapImage = new Image();
mapImage.src = "/src/assets/images/img.png";

mapImage.onload = () => {
    const map = new MapScene(engine, mapImage, entities);

    map.width = window.innerWidth;
    map.height = window.innerHeight;
    map.engine.canvas.width = map.width;
    map.engine.canvas.height = map.height;

    window.addEventListener("resize", () => {
        map.width = window.innerWidth;
        map.height = window.innerHeight;
        map.engine.canvas.width = map.width;
        map.engine.canvas.height = map.height;
    });

    const eblan = new Uebok(
        100,
        450,
        "Еблан",
        "/src/assets/images/avatar5.jpg",
        "Ну чё ты смотришь?"
    );

    const nuts = new Uebok(
        200,
        250,
        "Nuts",
        "/src/assets/images/nuts.jpg",
        "Zарегался V MAX❤️🇷🇺 — сначала было немного непривVычно🇷🇺🇷🇺🇷🇺 после телеги, но быстро Vтянулся🇷🇺🤫💪. Интерфейс удобный✅✅✅, Vсё❤️🇷🇺 работает чётко, а главное — SVOя, отечестVенная платформа❤️❤️❤️❤️✅✅✅🙏🙏🙏🇷🇺🇷🇺🇷🇺🇷🇺. Приятно осоZнаVать✅🇺🇸✅🇺🇸✅🇺🇸✅🇺🇸✅🇺🇸, что можно не ZаVисеть от иностранных серVисоV.🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺 СоVетую попробоVать!❤️🙏✅🙏🇷🇺❤️🇷🇺❤️✅⚡️⚡️⚡️⚡️"
    );

    map.addEntity(nuts);
    map.addEntity(eblan);

    engine.setScene(map);
    engine.start();
};