import * as React from "react";

import { Grip, Point } from "./geometry";

export interface ShapeContent {
    content: JSX.Element;
    settings?: JSX.Element;
    grips: Grip[];
    outline: Point[];
    offset(delta: { x: number, y: number }): void;
    commit(keep: boolean): void;
    dispose(): void;
}

export function placeholder(type: string): ShapeContent {
    type; // unused
    return {
        get content() {
            return React.createElement("g");
        },
        get settings() {
            return React.createElement("div");
        },
        offset() {},
        commit() {},
        grips: [],
        outline: [],
        json: undefined,
        dispose() {}
    } as ShapeContent;
};

const types: {
    [type: string]: {
        displayName: string;
        alloc: () => ShapeContent;
    }
} = {};

export const factory = {

    register(type: string, displayName: string, alloc: () => ShapeContent) {
        if (types[type]) {
            throw new Error(`Duplicate type: ${type}`);
        }

        types[type] = { displayName, alloc };
    },

    alloc(type: string) {
        const registration = types[type];
        if (!registration) {
            return placeholder(type);
        }
        return registration.alloc();
    },

    types(): string[] {
        return Object.keys(types);
    },

    displayName(type: string) {
        return (types[type] || { displayName: `Unknown: ${type}` }).displayName;
    }
};
