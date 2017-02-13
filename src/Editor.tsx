import * as React from "react";
import { observer } from "mobx-react";

import PropertyPalette from "./PropertyPalette";
import Toolbar from "./Toolbar";
import Paper from "./Paper";

import { EditorModel } from "./EditorModel";
import { Undo } from "json-mobx";

export interface EditorProps {
    editor: EditorModel;
    undo: Undo;
}

function Editor(p: EditorProps) {
    return (
        <div className="editor">
            <Toolbar {...p}/>
            <PropertyPalette editor={p.editor}/>            
            <Paper editor={p.editor}/>
        </div>
    );
}

export default observer(Editor);
