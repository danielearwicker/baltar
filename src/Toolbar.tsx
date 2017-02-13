import * as React from "react";
import { observer } from "mobx-react";

import { EditorModel } from "./EditorModel";
import { Undo } from "json-mobx";

import { factory } from "./factory";
import { Tool, Pick, Add } from "./tools";

export interface ToolbarProps {
    editor: EditorModel;
    undo: Undo;    
}

function Toolbar({ editor, undo }: ToolbarProps) {

    const noSel = editor.selection.shapes.length === 0;

    const tools = [ new Pick(editor) as Tool ].concat(
        factory.types().map(type => new Add(editor, type, factory.displayName(type))));

    return (
        <div className="toolbar">            
            {
                tools.map(tool => (
                    <button key={tool.id} 
                            className={editor.tool.id === tool.id ? "selected" : undefined} 
                            onClick={() => editor.tool = tool}>{tool.label}</button>
                ))
            }
            <span className="separator"/>
            <button disabled={!undo.canUndo} onClick={undo.undo}>Undo</button>
            <button disabled={!undo.canRedo} onClick={undo.redo}>Redo</button>
            <span className="separator"/>
            <button disabled={noSel} onClick={editor.remove}>Remove</button>
            <button disabled={noSel} onClick={editor.bringToFront}>Bring to front</button>
            <button disabled={noSel} onClick={editor.putToBack}>Put to back</button>
        </div>
    );
}

export default observer(Toolbar);
