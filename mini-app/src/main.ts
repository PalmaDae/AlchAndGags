import { Engine } from "./canvas/engine";
import { MapScene } from "./scenes/MapScene";
import { Entity } from "./entities/Entity";
import { Uebok } from "./entities/Uebok";

const app = document.getElementById("app");
const engine = new Engine(app);

const entities: Entity[] = [];

const mapImage = new Image();
mapImage.src = "/src/assets/images/map.png";

const map = new MapScene(engine, mapImage, entities);

const eblan = new Uebok(
    100,
    150,
    "Еблан",
    "/src/assets/images/avatar1.jpg",
    "Ну чё ты смотришь?"
);

map.addEntity(eblan);

engine.setScene(map);

engine.start();