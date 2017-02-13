import { observable } from "mobx";
import { Polymorph } from "json-mobx";
import { factory, ShapeContent } from "./factory";
import { EditorModel } from "./EditorModel";

export class ShapeModel extends Polymorph<ShapeContent> {

    constructor(private owner: EditorModel, type?: string) {
        super(type || "placeholder", factory.alloc);
    }

    remove() {
        const i = this.owner.shapes.indexOf(this);
        if (i !== -1) {
            this.owner.shapes.splice(i, 1);
        }
    }

    @observable selected = false;
}
