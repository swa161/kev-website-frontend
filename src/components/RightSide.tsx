import './RightSide.css'
import { Cloud } from './Cloud'
import { Cloud2 } from './Cloud2'
import { StarTriple, StarFourPoints } from './Stars'
import { Moon } from './Moon'
import type { DecorationStyle } from '../types/decorationTypes'
import { useEffect } from 'react'


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
    const startFourPts: DecorationStyle[] = [

        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.1)',
            top: '30%',
            zIndex: 999,
            right: 'calc(var(--whole-page-side-width)*0.4)',
            opacity: 1
        },
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.07)',
            right: 'calc(var(--whole-page-side-width)*0.5)',
            top: '50%',
            opacity: 1
        },        
        {
            position: 'absolute',
            width: 'calc(var(--whole-page-side-width)*0.085)',
            top: '70%',
            right: 'calc(var(--whole-page-side-width)*0.3)',
            opacity: 1
        }


    ]

    useEffect(() => {
        const stars = document.querySelectorAll<SVGElement>('.star-four')

        stars.forEach(star => {
            const duration = 2 + Math.random() * 3
            const delay = Math.random() * 2

            star.style.animationDuration =`${duration}s`
            star.style.animationDelay = `${delay}s`

        })
    },[])



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
                        
                    }} />
                ))}
            </div>
        </div>
    )
}