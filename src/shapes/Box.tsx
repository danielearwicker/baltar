import * as React from "react";

import { observable } from "mobx";
import { json } from "json-mobx";
import { SelectString, box } from "bidi-mobx";

import { Property } from "../Property";
import { Rectangular } from "./Rectangular";

export class Box extends Rectangular {

    @json @observable colour = "red";

    get content() {
        const { l, t, r, b } = this.rect.normalized;
        return <rect x={l} y={t} width={r - l} height={b - t} fill={this.colour}/>;
    }

    get settings(): JSX.Element {
        return (
            <Property label="Colour">
                <SelectString value={box(this).colour} 
                    options={["red", "green", "blue", "cyan", "magenta", "yellow"]} />
            </Property>
        );
    }
}
