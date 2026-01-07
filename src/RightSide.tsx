import './RightSide.css'
import { Cloud } from './components/Cloud'
import { Cloud2 } from './components/Cloud2'
import { StarTriple } from './components/Stars'
import { Moon } from './components/Moon'
import type { DecorationStyle } from './types/decorationTypes'


export function RightSide() {
    const cloud1s: DecorationStyle[] = [
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.95)',
            top: '40%',
            right: 'calc(var(--whole-page-side-width)*-0.3)',
            opacity: 1
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.90)',
            right: 'calc(var(--whole-page-side-width)*-0.3)',
            top: '87%',
            opacity: 1
        }

    ]
    const cloud2s: DecorationStyle[] = [
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.45)',
            right: 'calc(var(--whole-page-side-width)*0.15)',
            top: '10%',
            opacity: 1
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.45)',
            right: 'calc(var(--whole-page-side-width)*0.07)',
            top: '12.5%',
            opacity: 1
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.90)',
            right: 'calc(var(--whole-page-side-width)*-0.2)',
            top: '45%',
            opacity: 1
        }
    ]
    const starTriples: DecorationStyle[] = [
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.5)',
            top: '40%',
            zIndex: 999,
            right: 'calc(var(--whole-page-side-width)*0.5)',
            opacity: 1
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.8)',
            top: '87%',
            opacity: 1
        }

    ]
    const moon: DecorationStyle = {
        position: 'absolute',
        width: 'calc(var(--whole-page-side-width)*0.45)',
        top: '1%',
        right: 'calc(var(--whole-page-side-width)*0.1)',
        opacity: 1
    }


    return (
        <div className="rightside-container">
            <Moon style={{
                position: moon.position,
                zIndex: moon.zIndex,
                top: moon.top,
                right: moon.right,
                left: moon.left,
                width: moon.width,
                transform: moon.transform,
                opacity: moon.opacity
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