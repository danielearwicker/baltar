import { observable } from "mobx";

export class Coordinate {

    @observable live: number;
    @observable private committed: number;

    constructor(value?: number) {
        this.json = value || 0;
    }

    offset(delta: number) {
        this.live += delta;
    }

    /** Pass true to commit the live value, or false to revert to the committed value */
    commit(keep: boolean) {
        if (keep) {
            this.committed = this.live;
        } else {
            this.live = this.committed;    
        }
    }

    get json() {
        return this.committed;
    }
    set json(value: number) {
        this.live = this.committed = value;
    }
}
