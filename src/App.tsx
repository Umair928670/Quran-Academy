import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrialForm from './components/TrialForm'
import Courses from './components/Courses'
import WhyChooseUs from './components/WhyChooseUs'
import HowItWorks from './components/HowItWorks'
import LadiesSection from './components/LadiesSection'
import GlobalLearning from './components/GlobalLearning'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <LanguageProvider>
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
        <Navbar />
        <main>
          <Hero />
          <TrialForm />
          <Courses />
          <WhyChooseUs />
          <HowItWorks />
          <LadiesSection />
          <GlobalLearning />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}

