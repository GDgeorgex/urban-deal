import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Hero,
  PreorderStrip,
  FeaturedSection,
  AboutSection,
  ContactSection,
} from "@/components/home-sections"
import { CmsContent } from "../layout"; // Import the CmsContent type

export default function HomePage({ cmsContent }: { cmsContent: CmsContent }) {
  return (
    <>
      <Navbar />
      <main>
        <Hero cmsContent={cmsContent} />
        <PreorderStrip cmsContent={cmsContent} />
        <FeaturedSection cmsContent={cmsContent} />
        <AboutSection cmsContent={cmsContent} />
        <ContactSection cmsContent={cmsContent} />
      </main>
      <Footer />
    </>
  )
}
