
import './LeftSide.css'
import { Cloud } from './components/Cloud'
import { Cloud2 } from './components/Cloud2'
import { StarFourPoints } from './components/Stars'
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
    // const sun: DecorationStyle = {
    //     position: 'absolute',
    //     width: 'calc(var(--whole-page-side-width)*0.5)',
    //     top: '1%',
    //     right: 'calc(var(--whole-page-side-width)*0.68)',
    //     opacity: 1
    // }

    const startFourPts: DecorationStyle[] = [

        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.1)',
            top: '30%',
            zIndex: 999,
            right: 'calc(var(--whole-page-side-width)*0.4)',
            opacity: 1,
            blinkDuration: '2.3s',
            blinkDelay: '1s'

        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.07)',
            right: 'calc(var(--whole-page-side-width)*0.8)',
            top: '10%',
            opacity: 1,
            blinkDuration: '1.3s',
            blinkDelay: '1s'
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.085)',
            top: '70%',
            right: 'calc(var(--whole-page-side-width)*0.3)',
            opacity: 1,
            blinkDuration: '3.3s',
            blinkDelay: '1s'
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.085)',
            top: '83%',
            right: 'calc(var(--whole-page-side-width)*0.6)',
            opacity: 1,
            blinkDuration: '5.3s',
            blinkDelay: '1s'
        }
    ]


    return (
        <div className="leftside-container">

            {/* <Sun style={{
                position: sun.position,
                zIndex: sun.zIndex,
                top: sun.top,
                right: sun.right,
                left: sun.left,
                width: sun.width,
                transform: sun.transform,
                opacity: sun.opacity
            }} /> */}


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
                {startFourPts.map((f, index) => (
                    <StarFourPoints key={index} style={{
                        position: f.position,
                        zIndex: f.zIndex,
                        top: f.top,
                        right: f.right,
                        left: f.left,
                        width: f.width,
                        transform: f.transform,
                        opacity: f.opacity,
                        animationDuration: f.blinkDuration,
                        animationDelay: f.blinkDelay
                    }} />
                ))}
            </div>
        </div>
    )
}