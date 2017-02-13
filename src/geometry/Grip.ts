import { Point } from "./Point";
import { Coordinate } from "./Coordinate";

export class Grip extends Point {

    constructor(x: Coordinate, 
                y: Coordinate, 
                public cursor: string,
                public owner?: { commit(keep:boolean): void }) { 
        super(x, y);
    }

    commit(keep: boolean) {
        if (this.owner) {
            this.owner.commit(keep);
        } else {
            super.commit(keep);
        }
    }
}
