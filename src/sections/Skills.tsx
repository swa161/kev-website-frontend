import { Accordion, AccordionDetails, ListItemIcon, AccordionSummary, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import './Skill.css'
import { useTranslation } from 'react-i18next';
import { useObserver } from '../hooks/useObserver';

export function Skills() {
    const { t } = useTranslation()
    const { ref, visible } = useObserver({ threshold: 0 })
    const skillsData = [
        {
            title: "Frontend Development",
            expand: "defaultExpanded",
            values: [
                "React fundamentals (functional components, hooks)",
                "TypeScript basics",
                "Mobile-first & responsive design",
                "Component-based UI development",
                "CSS fundamentals"
            ]
        },
        {
            title: "Backend Development & APIs",
            values: [
                "Node.js fundamentals",
                "Express.js",
                "RESTful API design",
                "Basic authentication & authorization concepts",
                "Error handling and input validation"
            ]
        },
        {
            title: "Programming Languages",
            values: [
                "TypeScript",
                "Python",
                "Kotlin"
            ]
        },
        {
            title: "Databases",
            values: [
                "PostgreSQL (basic schema design & queries)",
                "MySQL (basic queries)",
                "Relational database fundamentals"
            ]
        },
        {
            title: "DevOps & Deployment",
            values: [
                "CI/CD fundamentals",
                "Deployment using Vercel and Render",
                "Environment variable configuration",
                "Basic production troubleshooting"
            ]
        },
        {
            title: "Development Tools & Workflow",
            values: [
                "Git version control",
                "Vite",
                "npm",
                "VS Code"
            ]
        }
    ]
    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`skill-container ${visible ? 'is-visible' : ''}`}>

            <Typography variant='h2' className="skills-title">{t('skills')}</Typography>
            <Typography variant='subtitle1' className="skills-sub-title">{t('my_tech_level')}</Typography>
            <div className="accordion-container">
                {skillsData.map((item, index) => (
                    <Accordion key={index} className='accordion' defaultExpanded={index === 0}
                        sx={{
                            boxShadow: 5,
                            borderRadius: 1.1,
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="programming-language-content"
                            id="pl-content"
                        >
                            <Typography className="skills-text" component={'span'}>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='accordion-details'>
                            <List >
                                {item.values.map((v, i) => (
                                    <ListItem key={i}>
                                        <ListItemIcon>
                                            <CircleIcon sx={{ color: 'var(--txt-color)' }} />
                                        </ListItemIcon>
                                        <ListItemText className='skills-item' primary={v} />
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>


        </div>
    )
}