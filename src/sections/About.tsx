import { Fragment, useEffect, useState } from 'react'
import type { HeroProps } from '../types/user'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios'
import './About.css'


type ImageData = {
    id: string,
    title: string,
    description: string,
    created_at: string
}

export function About({ user }: HeroProps) {

    const [imageData, setImageData] = useState<ImageData[] | null>(null)
    const [currentImgIndex, setCurrentImgIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const previousImg = () => {
        if (imageData) {
            setCurrentImgIndex(i =>
                i === 0 ? imageData.length - 1 : i - 1
            )
        }
    }

    const nextImg = () => {
        if (imageData) {
            setCurrentImgIndex(i =>
                i === imageData.length - 1 ? 0 : i + 1
            )
        }
    }

    useEffect(() => {
        const fetchImagesInfo = async () => {
            const res = await axios.get('/api/v1/photos')
            setImageData(res.data)
        }
        fetchImagesInfo()
    }, [])

    useEffect(() => {
        if (!imageData || isPaused ) return 
        const interval = setInterval(() => {
            setCurrentImgIndex(i => 
                i === imageData.length - 1 ? 0 : i + 1
            )
        }, 4000)
        return () => clearInterval(interval)
    }, [imageData, isPaused])

    useEffect(() => {
        if(!imageData) return
        
        const nextIndex = currentImgIndex === imageData.length - 1 ? 0 : currentImgIndex + 1
        const img = new Image()
        img.src = `/api/v1/photos/${imageData[nextIndex].id}/image`
    }, [currentImgIndex, imageData])

    return (
        <Fragment>
            <div className='about-container' >
                <div className='image-list-container' >
                    { <ArrowBackIosNew className='leftBtn' onClick={previousImg}/> }

                    {imageData && imageData.length > 0 && (() => {
                        const img = imageData[currentImgIndex]
                        return (
                            <div className='image-container'
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                            >
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
                                <img
                                    className='image'
                                    src={`/api/v1/photos/${img.id}/image`}
                                    loading='lazy'
                                    alt={img.title} />
                                <img
                                    className='reflection'
                                    src={`/api/v1/photos/${img.id}/image`}
                                    loading='lazy'
                                    alt={img.title} />
                            </div>
                        )
                    })()}
                    {<ArrowForwardIos className='rightBtn' onClick={nextImg} /> }
                </div>

            </div>

        </Fragment>

    )
}