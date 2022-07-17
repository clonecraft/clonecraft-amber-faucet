import { DomNode } from "skydapp-browser";
import menu from "./menu.json";
import MenuTreeBuilder from "./MenuTreeBuilder";

export default class MobileMenu extends DomNode {

    constructor() {
        super(".mobile-menu");
        this.append(
            MenuTreeBuilder.build(menu.menu),
        );
    }
}
