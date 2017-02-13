import { action } from "mobx";

import { Offsetable, Offset, Grip } from "./geometry";
import { ShapeModel } from "./ShapeModel";

export class Selection implements Offsetable {

    readonly grips: Grip[];

    constructor(public shapes: ShapeModel[]) {
        this.grips = shapes.map(shape => shape.target.grips)
                           .reduce((l, r) => l.concat(r), [])
    }

    @action
    clear() {
        for (const shape of this.shapes) {
            shape.selected = false;
        }
    }

    @action
    remove() {
        for (const shape of this.shapes) {
            shape.remove();            
        }
        return this.shapes;
    }

    @action
    offset(delta: Offset) {
        for (const shape of this.shapes) {
            shape.target.offset(delta);
        }
    }

    @action
    commit(keep: boolean) {
        for (const shape of this.shapes) {
            shape.target.commit(keep);
        }
    }
}
