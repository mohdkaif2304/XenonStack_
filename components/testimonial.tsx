import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "EstateNex's virtual tours and 3D walkthroughs have revolutionized how we showcase properties. Our clients love being able to view homes remotely with such detail.",
      name: "Sarah Chen",
      designation: "Senior Real Estate Agent at LuxuryHomes",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The automated property matching system has transformed our business. It connects buyers with their perfect homes faster than ever before.",
      name: "Michael Rodriguez",
      designation: "Broker at PremiumEstates",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The smart contract integration for property transactions has made closings seamless and secure. It's the future of real estate.",
      name: "Emily Watson",
      designation: "Real Estate Attorney at PropertyLegal",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "EstateNex's market analysis tools provide invaluable insights for property valuation. It helps us price homes accurately every time.",
      name: "James Kim",
      designation: "Property Appraiser at ValuePro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The AI-powered lead generation and client management system has doubled our conversion rates. It's an essential tool for modern real estate.",
      name: "Lisa Thompson",
      designation: "Marketing Director at RealtyTech",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="relative">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          EstateNex Success Stories
        </h2>
        <p className="mt-4 text-lg leading-8 text-blue-500/80">
          Transforming property transactions with innovative technology
        </p>
      </div>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
