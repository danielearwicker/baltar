export interface Offset {
    x: number;
    y: number;
}

export interface Offsetable {
    offset(delta: Offset): void;
    commit(keep: boolean): void;
}
