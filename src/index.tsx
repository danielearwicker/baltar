import * as React from "react";
import * as ReactDOM from "react-dom";

import { json, Undo } from "json-mobx";
import { factory } from "./factory";

import { EditorModel } from "./EditorModel";
import Editor from "./Editor";

import { Ellipse, Box, Counter } from "./shapes";

factory.register("box", "Box", () => new Box());
factory.register("ellipse", "Ellipse", () => new Ellipse());
factory.register("counter", "Counter", () => new Counter());

const state = new EditorModel();

const data = localStorage.getItem("EditorState");
if (data) {
    json.load(state, JSON.parse(data));
}

const undo = new Undo(state, after => {
    const j = JSON.stringify(after, null, 4);
    localStorage.setItem("EditorState", j);
    console.log(j);
});

ReactDOM.render(
    <Editor editor={state} undo={undo}/>,
    document.querySelector("#root"));
