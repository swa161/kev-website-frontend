import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Skill.css'

export function Skills() {
    return (
        <div className="skill-container">

            <Typography variant='h2' className="skills-title">Skills</Typography>
            <Typography variant='subtitle1' className="skills-sub-title">My technical level</Typography>
            <div className="accordion-container">
                <Accordion className='accordion' defaultExpanded
                    sx={{
                        width: {
                            xs: '80vw',
                            sm: '65vw',
                            md: '50vw'
                        },
                        boxShadow: 5,
                        borderRadius: 1.1,
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="programming-language-content"
                        id="pl-content"
                    >
                        <Typography className="skills-text" component={'span'}>Frontend</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='accordion'>
                        <Typography className="skills-text" component="span">Python</Typography>
                        <Typography className="skills-text" component="span">TypeScript</Typography>
                        <Typography className="skills-text" component="span">Kotlin</Typography>
                        <Typography className="skills-text" component="span">SQL</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='accordion'
                    sx={{
                        width: {
                            xs: '80vw',
                            sm: '65vw',
                            md: '50vw'
                        },
                        boxShadow: 5,
                        borderRadius: 1.1
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="tools-content"
                        id="tools-content"
                    >
                        <Typography className="skills-text" component={'span'}>Backend</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='accordion'>
                        <Typography className="skills-text" component="span">React</Typography>
                        <Typography className="skills-text" component="span">Node.js</Typography>
                        <Typography className="skills-text" component="span">Express</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>


        </div>
    )
}