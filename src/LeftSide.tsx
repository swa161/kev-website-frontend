
import './LeftSide.css'
import { Cloud } from './components/Cloud'
import { Cloud2 } from './components/Cloud2'
import { Sun } from './components/Sun'
import { StarTriple } from './components/Stars'
import type { DecorationStyle } from './types/decorationTypes'

export function LeftSide() {
    const cloud1s: DecorationStyle[] = [
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.95)',
            top: '40%',
            zIndex: 999,
            right: 'calc(var(--whole-page-side-width)*0.5)',
            opacity: 1
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.90)',
            top: '87%',
            opacity: 1
        }

    ]
    const cloud2s: DecorationStyle[] = [
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.90)',
            top: '35%',
            opacity: 1
        }
    ]
    const sun: DecorationStyle = {
        position: 'absolute',
        width: 'calc(var(--whole-page-side-width)*0.5)',
        top: '1%',
        right: 'calc(var(--whole-page-side-width)*0.68)',
        opacity: 1
    }

    const starTriples: DecorationStyle[] = [
        {   
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.75)',
            top: '40%',
            zIndex: 999,
            right: 'calc(var(--whole-page-side-width)*0.5)',
            opacity: 1
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.90)',
            top: '87%',
            opacity: 1
        }

    ]

    return (
        <div className="leftside-container">

            <Sun style={{
                position: sun.position,
                zIndex: sun.zIndex,
                top: sun.top,
                right: sun.right,
                left: sun.left,
                width: sun.width,
                transform: sun.transform,
                opacity: sun.opacity
            }} />


            <div className="toggle_cloud">
                {cloud1s.map((c: DecorationStyle, index) => (
                    <Cloud
                        key={index}
                        style={{
                            position: c.position,
                            zIndex: c.zIndex,
                            top: c.top,
                            right: c.right,
                            left: c.left,
                            width: c.width,
                            transform: c.transform,
                            opacity: c.opacity
                        }} />
                ))}
                {cloud2s.map((c, index) => (
                    <Cloud2 key={index}
                        style={{
                            position: c.position,
                            zIndex: c.zIndex,
                            top: c.top,
                            right: c.right,
                            left: c.left,
                            width: c.width,
                            transform: c.transform,
                            opacity: c.opacity
                        }} />
                ))}
            </div>
            <div className="toggle_stars">
                {starTriples.map((s, index) => (
                    <StarTriple key={index} style={{
                        position: s.position,
                        zIndex: s.zIndex,
                        top: s.top,
                        right: s.right,
                        left: s.left,
                        width: s.width,
                        transform: s.transform,
                        opacity: s.opacity
                    }} />
                ))}
            </div>
        </div>
    )
}