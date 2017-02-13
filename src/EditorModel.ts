import { observable, action, computed } from "mobx";
import { json } from "json-mobx";
import { ShapeModel } from "./ShapeModel";
import { Selection } from "./Selection";
import { Tool, Pick } from "./tools";

export class EditorModel {    
    
    @observable.ref tool: Tool = new Pick(this);

    @json readonly shapes = json.array(() => new ShapeModel(this));

    @computed get selection() {
        return new Selection(this.shapes.filter(w => w.selected));        
    }

    @action.bound
    remove() {
        for (const removed of this.selection.remove()) {
            if (!removed.dispose) {
                removed.dispose();
            }
        }
    }

    @action.bound
    putToBack() {
        this.shapes.splice.apply(this.shapes, 
            [0 as any, 0].concat(this.selection.remove()));
    }

    @action.bound
    bringToFront() {
        const removed = this.selection.remove();
        this.shapes.splice.apply(this.shapes, 
            [this.shapes.length as any, 0].concat(removed));
    } 
}

