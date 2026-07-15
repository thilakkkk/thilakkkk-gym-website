import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import WhyChooseUs from "../../components/WhyChooseUs";
import Membership from "../../components/Membership";
import Trainers from "../../components/Trainers";
import Testimonials from "../../components/Testimonials";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Membership />
      <Trainers />
      <Testimonials />
      <Contact />
      <Footer />

    </main>
  );
}