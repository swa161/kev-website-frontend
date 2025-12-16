import { Header } from "../components/Header"
import { Hero } from "../sections/Hero"
import { Fragment } from "react/jsx-runtime"

export function HomePage() {
    return (
        <Fragment>
            <Header />
            <section id='home'>
                <Hero />
            </section>

        </Fragment>
    )
}