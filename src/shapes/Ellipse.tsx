import * as React from "react";

import { observable } from "mobx";
import { json } from "json-mobx";
import { SelectString, box } from "bidi-mobx";

import { Property } from "../Property";
import { Rectangular } from "./Rectangular";

export class Ellipse extends Rectangular {

    @json @observable colour = "red";

    get content() {
        const { l, t, r, b } = this.rect.normalized;
        
        return <ellipse cx={(l + r) / 2}
                        cy={(t + b) / 2}
                        rx={(r - l) / 2}
                        ry={(b - t) / 2}                       
                        fill={this.colour}/>;
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
