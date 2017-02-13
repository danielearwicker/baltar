import * as React from "react";
import { action } from "mobx";

import { Tool } from "./Tool";
import { Pick } from "./Pick";
import { EditorModel } from "../EditorModel";
import { ShapeModel } from "../ShapeModel";

export class Add implements Tool {

    constructor(private editor: EditorModel, public id: string, displayName: string) { 
        this.label = <span>{displayName}</span>;
    }

    label: JSX.Element;

    adding: ShapeModel | undefined;

    get grip() {
        return this.adding && this.adding.target.grips[0];
    }

    @action.bound
    mouseDown(ev: React.MouseEvent<SVGElement>) {
        
        const shape = new ShapeModel(this.editor, this.id);

        for (const point of shape.target.outline) {
            point.x.live = ev.pageX;
            point.y.live = ev.pageY;
        }

        this.editor.shapes.push(shape);
        this.adding = shape;
    }

    @action.bound
    mouseMove(ev: React.MouseEvent<SVGElement>) {
        
        if (this.grip) {
            this.grip.x.live = ev.pageX;
            this.grip.y.live = ev.pageY;
        }
    }

    @action.bound
    mouseUp() {
        if (this.grip && this.adding) {
            this.grip.commit(true);

            this.editor.selection.clear();            
            this.adding.selected = true;

            this.adding = undefined;

            this.editor.tool = new Pick(this.editor);
        }
    }

    content = <rect width="100%" height="100%" opacity={0.3} 
                onMouseDown={this.mouseDown} 
                onMouseMove={this.mouseMove} 
                onMouseUp={this.mouseUp}/>;        
}
