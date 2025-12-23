import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios'
import './About.css'


type ImageData = {
    id: string,
    title: string,
    description: string,
    created_at: string
}

export function About() {

    const [imageData, setImageData] = useState<ImageData[] | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [counter, setCounter] = useState(1)
    const slideRef = useRef<HTMLDivElement | null>(null)

    const previousImg = () => {
        if (!slideRef.current || !imageData) return
        if (counter <= 0) return
        setCounter(prev => prev - 1)
    }

    const nextImg = () => {
        if (!slideRef.current || !imageData) return
        setCounter(prev => prev + 1)
    }

    // After slide transition ends, reset the position when reaching
    // cloned first/last slides to create an infinite carousel effect
    useEffect(() => {
        const handleTransitionEnd = () => {
            if (!slideRef.current || !imageData) return
            const size = slideRef.current.clientWidth

            if (counter === 0) {
                slideRef.current.style.transition = 'none'
                const realLastIndex = imageData.length
                setCounter(realLastIndex)
                slideRef.current.style.transform = `translateX(${-size * realLastIndex}px)`
            }

            if (counter === imageData.length + 1) {
                slideRef.current.style.transition = 'none'
                setCounter(1)
                slideRef.current.style.transform = `translateX(${-size * 1}px)`
            }
        }
        const node = slideRef.current
        node?.addEventListener('transitionend', handleTransitionEnd)
        return () => { node?.removeEventListener('transitionend', handleTransitionEnd) }
    }, [counter, imageData])

    useEffect(() => {
        const fetchImagesInfo = async () => {
            const res = await axios.get('/api/v1/photos')
            setImageData(res.data)
        }
        fetchImagesInfo()
    }, [])

    useEffect(() => {
        if (!imageData || isPaused) return
        const interval = setInterval(() => {
            setCounter(prev => prev + 1)
        }, 4000)
        return () => clearInterval(interval)
    }, [imageData, isPaused])

    useEffect(() => {
        if (slideRef.current && imageData) {
            const size = slideRef.current.clientWidth
            slideRef.current.style.transition = `transform 0.5s ease-in-out`
            slideRef.current.style.transform = `translateX(${-size * counter}px)`
        }
    }, [imageData, counter])

    useEffect(() => {
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
        return (() => {document.removeEventListener('visibilitychange', handleVisibilityChange)})
    }, [counter])

    return (
        <Fragment>
            <div className='about-container' >
                <div className='carousel-container' >
                    {<ArrowBackIosNew className='leftBtn' onClick={previousImg} />}
                    <div className='carousel-viewport'>
                        <div
                            className='carousel-slide'
                            ref={slideRef}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {imageData && (
                                <div className='image-container' id='lastClone'>
                                    <div className='image-description'>
                                        {imageData && imageData[imageData.length - 1].description}
                                    </div>

                                    <div className='image-date'>
                                        {imageData?.[imageData.length - 1]?.created_at && (
                                            Intl.DateTimeFormat('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            }).format(new Date(imageData[imageData.length - 1].created_at))
                                        )}

                                    </div>
                                    <div>
                                        <img
                                            className='image'
                                            src={`/api/v1/photos/${imageData && imageData[imageData.length - 1].id}/image`}
                                            loading='lazy'
                                            alt={imageData?.[imageData.length - 1].title && imageData[imageData.length - 1].title}
                                        />
                                        <img
                                            className='reflection'
                                            src={`/api/v1/photos/${imageData?.[imageData.length - 1].title
                                                && imageData[imageData.length - 1].id}/image`}
                                            loading='lazy'
                                            alt={imageData?.[imageData.length - 1].title
                                                && imageData[imageData.length - 1].title} />
                                    </div>
                                </div>
                            )}

                            {imageData?.map((img, index) => (
                                <div key={img.id} className='image-container'>

                                    <div className='image-description'>
                                        {img.description}
                                    </div>

                                    <div className='image-date'>
                                        {Intl.DateTimeFormat('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        }).format(new Date(img.created_at))}
                                    </div>
                                    <div>
                                        <img
                                            className='image'
                                            src={`/api/v1/photos/${img.id}/image`}
                                            loading='lazy'
                                            alt={img.title}
                                            id={String(index)}

                                        />
                                        <img
                                            className='reflection'
                                            src={`/api/v1/photos/${img.id}/image`}
                                            loading='lazy'
                                            alt={img.title} />
                                    </div>

                                </div>
                            ))}
                            {imageData && (
                                <div className='image-container' id='firstClone'>
                                    <div className='image-description'>
                                        {imageData && imageData[0].description}
                                    </div>

                                    <div className='image-date'>
                                        {imageData?.[0]?.created_at && (
                                            Intl.DateTimeFormat('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            }).format(new Date(imageData[0].created_at))
                                        )}

                                    </div>
                                    <div>
                                        <img
                                            className='image'
                                            src={`/api/v1/photos/${imageData && imageData[0].id}/image`}
                                            loading='lazy'
                                            alt={imageData?.[0].title && imageData[0].title}
                                        />
                                        <img
                                            className='reflection'
                                            src={`/api/v1/photos/${imageData?.[0].title
                                                && imageData[0].id}/image`}
                                            loading='lazy'
                                            alt={imageData?.[0].title
                                                && imageData[0].title} />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    {<ArrowForwardIos className='rightBtn' onClick={nextImg} />}
                </div>

            </div>

        </Fragment>

    )
}