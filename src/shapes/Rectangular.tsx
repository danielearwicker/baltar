import { json } from "json-mobx";

import { ShapeContent } from "../factory";
import { Rectangle } from "../geometry";

export abstract class Rectangular implements ShapeContent {

    @json protected readonly rect: Rectangle;

    constructor(rect?: Rectangle) {
        this.rect = rect || new Rectangle();
    }

    abstract get content(): JSX.Element;

    get grips() {
        return this.rect.grips;
    }

    get outline() {
        return this.rect.outline;
    }

    offset(delta: { x: number, y: number }) {
        this.rect.offset(delta);
    }

    commit(keep: boolean) {        
        this.rect.commit(keep);        
    }

    dispose() { }
}
