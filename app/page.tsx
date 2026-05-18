import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Hero,
  PreorderStrip,
  FeaturedSection,
  AboutSection,
  ContactSection,
} from "@/components/home-sections"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PreorderStrip />
        <FeaturedSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
