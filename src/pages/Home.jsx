import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Process from '../components/Process'
import Projects from '../components/Projects'
import Stats from '../components/Stats'
import Cta from '../components/Cta'

export default function Home({ isLoaded }) {
  return (
    <>
      <Hero isLoaded={isLoaded} />
      <About />
      <Services />
      <Process />
      <Projects />
      <Stats />
      <Cta />
    </>
  )
}
