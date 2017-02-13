import * as React from "react";
import { computed, action } from "mobx";
import { json } from "json-mobx";

import { Tool } from "./Tool";
import { EditorModel } from "../EditorModel";
import { ShapeModel } from "../ShapeModel";
import { Grip, Point, Offsetable } from "../geometry";

export class Pick implements Tool {

    constructor(private editor: EditorModel) { }

    id = "pick";
    label = <img src="img/pick.png" height="11"/>

    dragLastX = 0;
    dragLastY = 0;
    dragging?: Offsetable;

    dragStartHandler<T>(offsetable: (target: T, ev: React.MouseEvent<SVGElement>) => Offsetable) {
        return (target: T, ev: React.MouseEvent<SVGElement>) => {
            ev.stopPropagation();
            ev.preventDefault();

            this.dragLastX = ev.pageX;
            this.dragLastY = ev.pageY;

            this.dragging = offsetable(target, ev);
        }
    }

    mouseDownShape = action(this.dragStartHandler<ShapeModel>((shape, ev) => {

        if (!ev.ctrlKey) {
            this.editor.selection.clear();
        }

        shape.selected = !shape.selected;
  
        return this.editor.selection;
    }))

    mouseDownGrip = action(this.dragStartHandler<Grip>(grip => grip))

    @action.bound
    mouseDown() {
        this.editor.selection.clear();
    }

    @action.bound
    mouseMove(ev: React.MouseEvent<SVGElement>) {
        if (!this.dragging) {
            return;
        }

        const delta = {
            x: ev.pageX - this.dragLastX,
            y: ev.pageY - this.dragLastY
        };

        this.dragLastX = ev.pageX;
        this.dragLastY = ev.pageY;
        this.dragging.offset(delta);
    }

    @action.bound
    mouseUp() {
        if (this.dragging) {
            this.dragging.commit(true);
            this.dragging = undefined;
        }        
    }

    @computed get shapes() {
        return this.editor.shapes.map(shape => (
            <polygon key={json.idOf(shape)} points={Point.svgString(shape.target.outline)}
                    onMouseDown={e => this.mouseDownShape(shape, e)}
                    fill="transparent" />
        ));
    }

    @computed get outlines() {
        return this.editor.selection.shapes.map(shape => (
            <polygon key={"outline"+json.idOf(shape)}
                    points={Point.svgString(shape.target.outline)}
                    onMouseDown={e => this.mouseDownShape(shape, e)}
                    fill="transparent" 
                    strokeDasharray="5, 2" 
                    stroke="grey" />
        ))
    }

    @computed get grips() {
        return this.editor.selection.grips.map((grip, i) => (
            <circle key={"grip"+i} 
                cx={grip.x.live} 
                cy={grip.y.live} r={4} 
                style={{ cursor: grip.cursor }}
                fill="silver" stroke="gray"
                onMouseDown={e => this.mouseDownGrip(grip, e)}/>
        ))
    }

    @computed get content() {        
        return (
            <g onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>
                <rect width="100%" height="100%" opacity="0"/>
                {this.shapes}
                {this.outlines}
                {this.grips}
            </g>
        );
    }
}
