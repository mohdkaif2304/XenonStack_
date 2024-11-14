import About from "@/components/About";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AnimatedTestimonialsDemo } from "@/components/testimonial";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      
      <Hero />
      <About />
      <AnimatedTestimonialsDemo />
      </div>
  );
}
