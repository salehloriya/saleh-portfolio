import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "BirStock - Inventory & ERP Suite",
    subtitle: "Desktop software for automated stock tracking, barcode scanning, and PDF invoicing",
    link: "https://birstock.com/",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-7 h-[420px]",
  },
  {
    id: 2,
    title: "Restaurant POS & Billing System",
    subtitle: "Petpooja-style cloud POS with table management, live KOT billing & real-time analytics",
    link: "#",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-5 h-[420px]",
  },
  {
    id: 3,
    title: "Tailor Management App",
    subtitle: "Mobile app with OTP login, client measurement ledgers, and order tracking",
    link: "https://github.com/salehloriya/tailor_g",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-5 h-[360px]",
  },
  {
    id: 4,
    title: "E-Commerce & Admin Dashboard",
    subtitle: "Modern digital store with product CRUD, cart operations & revenue metrics",
    link: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-7 h-[360px]",
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center md:text-left">
          Selected <span className="text-gradient-primary">Works</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-lg">
          A showcase of complex systems, elegant interfaces, and scalable applications I've engineered.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {projects.map((item, idx) => (
          <motion.a
            key={item.id}
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            rel={item.link.startsWith("http") ? "noreferrer" : undefined}
            className={`group relative overflow-hidden rounded-[2.25rem] block shadow-xl border border-foreground/10 ${item.gridClass}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Background image & gradient overlay */}
            <div className="absolute inset-0 bg-neutral-950">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Bottom Content Banner */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
              <div className="flex items-end justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 transform-gpu">
                <div className="z-10 max-w-lg">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-white/80 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {item.subtitle}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 group-hover:bg-white group-hover:text-black transition-all duration-300 rotate-45 group-hover:rotate-0 z-10 shadow-lg">
                  <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
