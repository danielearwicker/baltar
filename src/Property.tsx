import * as React from "react";

export interface PropertyProps {
    label?: string;
    children?: React.ReactNode;
}

export function Property({label, children}: PropertyProps) {
    return label ? (
        <div className="property">
            <label>
                <div className="propertyLabel">{label}</div>
                {children}
            </label>
        </div>
     ) : (
        <div className="property">            
            {children}            
        </div>
     );
}
