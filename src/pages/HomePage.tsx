import { Header } from "../components/Header"
import { Hero } from "../sections/Hero"
import { About } from "../sections/About"
import { Skills } from "../sections/Skills"
import { Projects } from "../sections/Projects"
import { Contact } from "../sections/Contact"
import { Fragment } from "react/jsx-runtime"
import { Footer } from "../components/Footer"
import './HomePage.css'
import type { HeroProps } from "../types/user"
import { ThemeProvider } from "@emotion/react"
import {LeftSide} from '../components/LeftSide'
import { RightSide } from "../components/RightSide"
import { theme } from "../theme/Theme"

export function HomePage({ user }: HeroProps) {
    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <Header />
                <div className="whole-page-container">
                    <LeftSide />
                    <div className="sections-container">
                        <section id='home' className="hero-section">
                            <Hero user={user} />
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
                            <Contact user={user} />
                        </section>
                    </div>
                    <RightSide />
                </div>

                <Footer user={user}/>
            </Fragment>
        </ThemeProvider>

    )
}