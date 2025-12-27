import { Header } from "../components/Header"
import { Hero } from "../sections/Hero"
import { About } from "../sections/About"
import { Skills } from "../sections/Skills" 
import { Projects } from "../sections/Projects"
import { Contact } from "../sections/Contact"
import { Fragment } from "react/jsx-runtime"
import './HomePage.css'
import type { HeroProps } from "../types/user"

export function HomePage({ user }: HeroProps) {
    return (
        <Fragment>
            <Header />
            <div className="sections-container">
                <section id='home' className="hero-section">
                    <Hero user={user}/>
                </section>

                <section id='about' className="about-section">
                    <About />
                </section>

                <section id='skills' className="skills-section">
                    <Skills />
                </section>

                <section id='projects' className="projects-section">
                    <Projects />
                </section>

                <section id='contact' className="contact-section">
                    <Contact />
                </section>
            </div>
        </Fragment>
    )
}