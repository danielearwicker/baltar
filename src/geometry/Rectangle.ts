import { computed } from "mobx";
import { json } from "json-mobx";
import { Coordinate } from "./Coordinate";
import { Point } from "./Point";
import { Grip } from "./Grip";
import { Offsetable, Offset } from "./Offsetable";

export class Rectangle implements Offsetable {

    @json readonly l: Coordinate;
    @json readonly t: Coordinate;
    @json readonly r: Coordinate;
    @json readonly b: Coordinate;

    constructor(l?: Coordinate, t?: Coordinate, r?: Coordinate, b?: Coordinate) {
        this.l = l || new Coordinate();
        this.t = t || new Coordinate();
        this.r = r || new Coordinate();
        this.b = b || new Coordinate();
    }

    offset(delta: Offset) {
        this.l.offset(delta.x);
        this.t.offset(delta.y);
        this.r.offset(delta.x);
        this.b.offset(delta.y);
    }

    commit(keep: boolean) {        
        if (keep) {
            json.load(this, this.normalized);
        } else {
            this.l.commit(keep);
            this.t.commit(keep);
            this.r.commit(keep);
            this.b.commit(keep);
        }
    }

    @computed get centre() {
        return {
            x: (this.l.live + this.r.live) / 2,
            y: (this.t.live + this.b.live) / 2
        };
    }

    @computed get normalized() {
        return {
            l: Math.min(this.l.live, this.r.live),
            t: Math.min(this.t.live, this.b.live),
            r: Math.max(this.l.live, this.r.live),
            b: Math.max(this.t.live, this.b.live)
        };
    }

    @computed get grips() {
        const cent_x = new Coordinate(this.centre.x), 
              cent_y = new Coordinate(this.centre.y);       

        return [
            new Grip(this.r, this.b, "nwse-resize", this),
            new Grip(this.l, this.t, "nwse-resize", this),            
            new Grip(this.l, this.b, "nesw-resize", this),
            new Grip(this.r, this.t, "nesw-resize", this),
            new Grip(this.l, cent_y, "ew-resize", this),
            new Grip(this.r, cent_y, "ew-resize", this),
            new Grip(cent_x, this.t, "ns-resize", this),
            new Grip(cent_x, this.b, "ns-resize", this)            
        ];
    }

    @computed get outline() {
        return [
            new Point(this.l, this.t), 
            new Point(this.r, this.t), 
            new Point(this.r, this.b), 
            new Point(this.l, this.b), 
        ];
    }
}
