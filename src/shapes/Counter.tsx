import * as React from "react";

import { observable } from "mobx";
import { Rectangular } from "./Rectangular";

export class Counter extends Rectangular {

    @observable count = 0;

    timer: any;

    constructor() {
        super();
        this.timer = setInterval(() => this.count++, 1000);
    }

    dispose() {
        clearInterval(this.timer);
    }

    get content() {
        const { l, b } = this.rect.normalized;
        return <text fill="magenta" fontSize="5em" x={l} y={b}>{this.count+""}</text>
    }
}
