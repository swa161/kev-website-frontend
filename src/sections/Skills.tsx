import { Accordion, AccordionDetails, ListItemIcon, AccordionSummary, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import './Skill.css'
import { useTranslation } from 'react-i18next';

export function Skills() {
    const { t } = useTranslation()
    const skillsData = [{
        title: "Frontend Engineering",
        expand: 'defaultExpanded',
        values: [
            'Mobile-First Design',
            'Responsive Design',
            'State Management Fundamentals',
            'Component-based Architecture',
            'Performance-aware UI Development'
        ]
    }, {
        title: "Backend Engineering & APIs",
        values: [
            'RESTful API design',
            'Error Handling',
            'Input Validation',
            'Authorization Basics',
            'CORS Configuration',
            'API Security Baiscs'
        ]
    }, {
        title: "Programming Language",
        values: ['Python', 'Typescript', 'C#']
    },{
        title: "Development Tools",
        values: ['Vite', 'React', 'Node.js','Express']
    }]

    return (
        <div className="skill-container">

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
                        <AccordionDetails  className='accordion-details'>
                            <List >
                                {item.values.map((v, i) => (

                                    <ListItem key={i}>
                                        <ListItemIcon>
                                            <CircleIcon sx={{color:'var(--txt-color)'}} />
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