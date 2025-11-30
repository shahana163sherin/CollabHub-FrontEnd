import NavBar from "../../Components/Layout/NavBar";
import Hero from "../../Components/Sections/Hero";
import SocialProof from "../../Components/Sections/SocialProof";
import Features from "../../Components/Sections/Features";
import Works from "../../Components/Sections/Works";
import CTA from "../../Components/Sections/CTA";
import Footer from "../../Components/Layout/Footer";
export default function Home(){
  return (
    <>
    <NavBar/>
    <Hero/>
   <section id="social">
        <SocialProof />
      </section>
    <section id="features">
    <Features/>
    </section>
     <section id="works"> <Works/></section>
   
    <CTA/>
    <Footer/>

    </>
  );
}