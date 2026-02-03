import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { useObserver } from '../hooks/useObserver';
import api from '../api/client';
import './About.css'
import { r2PublicUrl } from '../config/r2';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

type ImageData = {
    id: string,
    title: string,
    description: string,
    image_url: string
    created_at: string
}

export function About() {
    const { ref, visible } = useObserver({ threshold: 0 })
    const [imageData, setImageData] = useState<ImageData[] | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [counter, setCounter] = useState(1)
    const touchStart = useRef<number>(0)
    const touchEnd = useRef<number>(0)
    const slideRef = useRef<HTMLDivElement | null>(null)
    const { t } = useTranslation()

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsPaused(true)
        touchStart.current = e.targetTouches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart.current - touchEnd.current
        const minSwipeDistance = 50

        if (distance > minSwipeDistance) {
            nextImg()
        }

        if (distance < -minSwipeDistance) {
            previousImg()
        }

        touchStart.current = 0
        touchEnd.current = 0
        setIsPaused(false)
    }

    const previousImg = () => {
        if (!slideRef.current || !imageData) return
        if (counter <= 0) return
        setCounter(prev => {
            if (prev <= 0) return prev
            return prev - 1
        })
    }

    const nextImg = () => {
        if (!slideRef.current || !imageData) return

        setCounter(prev => {
            if (prev >= imageData.length + 1) return prev
            return prev + 1
        })
    }

    // After slide transition ends, reset the position when reaching
    // cloned first/last slides to create an infinite carousel effect
    useEffect(() => {
        const handleTransitionEnd = async () => {
            if (!slideRef.current || !imageData) return
            const size = slideRef.current.clientWidth

            if (counter === 0) {
                slideRef.current.style.transition = 'none'
                const realLastIndex = imageData.length
                await setCounter(realLastIndex)
                slideRef.current.style.transform = `translateX(${-size * realLastIndex}px)`
            }

            if (counter === imageData.length + 1) {
                slideRef.current.style.transition = 'none'
                await setCounter(1)
                slideRef.current.style.transform = `translateX(${-size * 1}px)`
            }
        }
        const node = slideRef.current
        node?.addEventListener('transitionend', handleTransitionEnd)
        return () => { node?.removeEventListener('transitionend', handleTransitionEnd) }
    }, [counter, imageData])

    useEffect(() => {
        const fetchImagesInfo = async () => {
            const res = await api.get('/v1/photos')
            setImageData(res.data)
        }
        fetchImagesInfo()
    }, [])

    useEffect(() => { // Auto play
        if (!imageData || isPaused) return
        const interval = setInterval(() => {
            setCounter(prev => prev + 1)
        }, 4000)
        return () => clearInterval(interval)
    }, [imageData, isPaused])

    useEffect(() => { // set the transition animation
        if (slideRef.current && imageData) {
            const size = slideRef.current.clientWidth
            slideRef.current.style.transition = `transform 0.5s ease-in-out`
            slideRef.current.style.transform = `translateX(${-size * counter}px)`
        }
    }, [imageData, counter])

    useEffect(() => { // handle when hidden
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsPaused(true)
            } else {
                setIsPaused(false)

                if (slideRef.current) {
                    const size = slideRef.current.clientWidth;
                    slideRef.current.style.transition = 'none';
                    slideRef.current.style.transform = `translateX(${-size * counter}px)`;
                }
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)
        return (() => { document.removeEventListener('visibilitychange', handleVisibilityChange) })
    }, [counter])

    return (
        <Fragment>
            <div ref={ref as React.RefObject<HTMLDivElement>} className={`about-container ${visible ? 'is-visible' : ''}`}>
                <div className="about-me-container">
                   <Typography 
                sx={{fontStyle: 'italic', 
                    fontWeight: 350,
                    fontSize: {
                        xs: '0.9rem',
                        sm: '1.0rem',
                        md: '1.1rem',
                        lg: '1.2rem'
                    },
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                   fontFamily={'-apple-system'} variant='subtitle1'> {t('hobbit')}</Typography>
                </div>
                <div className='carousel-container' >
                    {<ArrowBackIosNew className='leftBtn'
                        onClick={previousImg}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)} />}
                    <div className='carousel-viewport'
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className='carousel-slide'
                            ref={slideRef}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {imageData && (
                                <div className='image-container' id='lastClone'>

                                    <div className='image-date'>
                                        {imageData?.[imageData.length - 1]?.title}

                                    </div>
                                    <div className='image-description'>
                                        {imageData && imageData[imageData.length - 1].description}
                                    </div>

                                    <div>
                                        <img
                                            className='image'

                                            src={`${r2PublicUrl}${imageData[imageData.length - 1].image_url}`}
                                            loading='lazy'
                                            alt={imageData?.[imageData.length - 1].title && imageData[imageData.length - 1].title}
                                        />
                                        {/* <img
                                            className='reflection'
                                            src={`/v1/photos/${imageData?.[imageData.length - 1].title
                                                && imageData[imageData.length - 1].id}/image`}
                                            loading='lazy'
                                            alt={imageData?.[imageData.length - 1].title
                                                && imageData[imageData.length - 1].title} /> */}
                                    </div>
                                </div>
                            )}

                            {imageData?.map((img, index) => (
                                <div key={img.id} className='image-container'>
                                    <div className='image-date'>
                                        {img.title}
                                    </div>
                                    <div className='image-description'>
                                        {img.description}
                                    </div>


                                    <div className='image-and-reflection'>
                                        <img
                                            className='image'
                                            src={`${r2PublicUrl}${img.image_url}`}
                                            loading='lazy'
                                            alt={img.title}
                                            id={String(index)}

                                        />
                                        {/* <img
                                            className='reflection'
                                            src={`/v1/photos/${img.id}/image`}
                                            loading='lazy'
                                            alt={img.title} /> */}
                                    </div>

                                </div>
                            ))}
                            {imageData && (
                                <div className='image-container' id='firstClone'>
                                    <div className='image-date'>
                                        {imageData?.[0]?.title}

                                    </div>
                                    <div className='image-description'>
                                        {imageData && imageData[0].description}
                                    </div>


                                    <div>
                                        <img
                                            className='image'

                                            src={`${r2PublicUrl}${imageData[0].image_url}`}
                                            loading='lazy'
                                            alt={imageData?.[0].title && imageData[0].title}
                                        />
                                        {/* <img
                                            className='reflection'
                                            src={`/v1/photos/${imageData?.[0].title
                                                && imageData[0].id}/image`}
                                            loading='lazy'
                                            alt={imageData?.[0].title
                                                && imageData[0].title} /> */}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    {
                        <ArrowForwardIos className='rightBtn'
                            onClick={nextImg}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)} />}
                </div>

            </div>

        </Fragment>

    )
}