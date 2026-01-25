import {Engine} from "./canvas/engine";
import {MapScene} from "./scenes/MapScene";
import {Entity} from "./entities/Entity";
import {Uebok} from "./entities/Uebok";

const app = document.getElementById("app");

const engine = new Engine(app);

const enitites: Entity[] = []

const mapImage = new Image();

mapImage.src = "/src/assets/images/map.png";

const map = new MapScene(engine, mapImage, enitites);

let eblan = new Uebok(100,150,"еблан", "/src/assets/images/avatar1.jpg");

map.addEntity(eblan)



engine.setScene(map);

engine.start()