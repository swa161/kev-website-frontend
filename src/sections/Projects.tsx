
import './Projects.css'
import { Typography, Tabs, Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useState } from 'react';
import { useObserver } from '../hooks/useObserver';
import { tabFontSize,timelineTimeContentFontTheme, timelineContentFontSizeTheme} from '../theme/Theme'
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}



function EducationPanel(props: TabPanelProps) {
    return (
        <div className="education-panel" hidden={props.value !== props.index}>
            <Timeline className='time-line' sx={{ gap: '5px', padding: '1rem' }} position='alternate'>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        Feb 2025 - Nov 2025
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Bachelor of Science
                        <Typography sx={timelineContentFontSizeTheme}>Major: Computer Science</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        Dec 2023 - Dec 2024
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        PAK'nSAVE Papanui
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        Feb 2019 - June 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Bachelor of Product Design
                        <Typography sx={timelineContentFontSizeTheme}>Major: Applied Immersive Game Design</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        Feb 2018
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Bachelor of Science
                        <Typography sx={timelineContentFontSizeTheme}>Major: Computer Science</Typography>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </div>
    )
}

function WorkPanel(props: TabPanelProps) {


    return (
        <div
            hidden={props.value !== props.index}
            className="work-panel">
            <Timeline className='time-line' sx={{ gap: '5px', padding: '1rem' }} position='alternate'>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        Jan 2026- Now
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Donglin Chinese School Website
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        Jan 2026- Now
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Wechat Mini Program
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        Nov 2025 - Now
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Personal Website
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        June 2025 - Nov 2025
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Mobile App Project
                        <Typography sx={timelineContentFontSizeTheme}>Geo Chat App</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        Feb 2025 - May 2025
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Web Development Project
                        <Typography sx={timelineContentFontSizeTheme}>Game Review Site:Frontend & Backend</Typography>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={timelineTimeContentFontTheme}>
                        June 2021 - Nov 2021
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={timelineContentFontSizeTheme}>
                        Final Year Project
                        <Typography sx={timelineContentFontSizeTheme}>Interactive Projector Kiosk Project</Typography>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </div>
    )
}




export function Projects() {
    const { t } = useTranslation()
    const [value, setValue] = useState(0)
    const { ref, visible } = useObserver({threshold: 0})
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`project-container ${visible ? 'is-visible' : ''}`}>
            <Typography variant='h2' className="project-title">{t('qualification')}</Typography>
            <Typography variant='subtitle1' className="project-sub-title">{t('my_education_journey')}</Typography>
            <div className="project-content-container">
                <Tabs
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'var(--selected-color)'
                        },
                    }}
                    value={value}
                    variant='fullWidth'
                    onChange={handleChange}
                >
                    <Tab sx={{
                        fontSize: tabFontSize,
                        color: 'var(--txt-color)',
                        '&.Mui-selected': {
                            color: 'var(--selected-color)'
                        }
                    }} className='education-tab' label={t('education&Work')} />
                    <Tab
                        sx={{
                            fontSize: tabFontSize,
                            color: 'var(--txt-color)',
                            '&.Mui-selected': {
                                color: 'var(--selected-color)'
                            }
                        }}
                        label={t('projects')} />
                </Tabs>
                <EducationPanel value={value} index={0} />
                <WorkPanel value={value} index={1} />
            </div>
        </div>
    )
}