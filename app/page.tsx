import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import TechStack from '@/components/TechStack'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020817] overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <TechStack />
      <ContactSection />
      <Footer />
    </main>
  )
}
