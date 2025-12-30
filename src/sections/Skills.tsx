import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Skill.css'

export function Skills() {
    return (
        <div className="skill-container">

            <Typography variant='h2' className="skills-title">Skills</Typography>
            <Typography variant='subtitle1' className="skills-sub-title">My technical level</Typography>
            <div className="accordion-container">
                <Accordion defaultExpanded
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
                        <Typography component={'span'}>Frontend</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="span">Python</Typography>
                        <Typography component="span">TypeScript</Typography>
                        <Typography component="span">Kotlin</Typography>
                        <Typography component="span">SQL</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
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
                        <Typography component={'span'}>Backend</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="span">React</Typography>
                        <Typography component="span">Node.js</Typography>
                        <Typography component="span">Express</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>


        </div>
    )
}