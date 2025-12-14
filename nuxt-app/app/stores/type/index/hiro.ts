type typeType =  "primary" | "success" | "info" | "warning" | "danger"
type effectType = "dark" | "light" | "plain"
export interface tagType {
    effect: effectType;
    type: typeType;
    text: string;
    id: number;
}
export interface btnType {
    src: string;
    id: number;
    url:string;
}
export interface hiroType {
    tags: tagType[];
    btns: btnType[];
    TextH1: string;
    TextSpan: string;
}