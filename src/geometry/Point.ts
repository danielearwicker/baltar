import { json } from "json-mobx";
import { Coordinate } from "./Coordinate";
import { Offsetable, Offset } from "./Offsetable";

export class Point implements Offsetable {
    
    @json readonly x: Coordinate;
    @json readonly y: Coordinate;

    constructor(x?: Coordinate, y?: Coordinate) {
        this.x = x || new Coordinate();
        this.y = y || new Coordinate();
    }

    offset(delta: Offset) {
        this.x.offset(delta.x);
        this.y.offset(delta.y);
    }

    commit(keep: boolean) {
        this.x.commit(keep);
        this.y.commit(keep);
    }

    static svgString(points: Point[]) {
        return points.map(p => `${p.x.live},${p.y.live}`).join(" ");
    }
}
