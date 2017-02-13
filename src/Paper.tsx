import * as React from "react";

import { computed } from "mobx";
import { observer } from "mobx-react";
import { json } from "json-mobx";

import { EditorModel } from "./EditorModel";

export interface PaperProps {
    editor: EditorModel;
}

@observer
export default class Paper extends React.Component<PaperProps, {}> {

    @computed get content() {
        return this.props.editor.shapes.map(shape => (
            <g key={json.idOf(shape)}>{ shape.target.content }</g>
        ));
    }

    render() {        
        return (
            <div className="paper">
                <svg width="100%" height="100%">
                    {this.content}
                    {this.props.editor.tool.content}
                </svg>
            </div>
        );
    }
}
