import * as React from "react";

import { observer } from "mobx-react";

import { SelectString } from "bidi-mobx";

import { EditorModel } from "./EditorModel";
import { factory } from "./factory";
import { Property } from "./Property"

export interface PropertyPanelProps {
    editor: EditorModel;
}

function PropertyPanel({ editor }: PropertyPanelProps) {

    if (editor.selection.shapes.length !== 1) {
        return (
            <div className="propertyPalette">
                Select a single shape to edit its settings.
            </div>
        );
    }

    const shape = editor.selection.shapes[0];

    return (
        <div className="propertyPalette">
            <Property label="Type">
                <SelectString value={shape}
                              labels={factory.displayName}
                              options={factory.types()} />
            </Property>
            { shape.target.settings }
        </div>
    );
}

export default observer(PropertyPanel);
