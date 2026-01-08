export interface DecorationStyle {
    position: 'absolute',
    zIndex?: number,
    width: string,
    top?: string,
    right?: string,
    left?: string,
    transform?: string,
    opacity?: number,
    blinkDuration?: string,
    blinkDelay?: string
}

export type DecorationProp = {
    className?: string,
    style: object 
}
