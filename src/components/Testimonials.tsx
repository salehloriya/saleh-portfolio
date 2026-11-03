import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ajit Parmar",
    role: "Product Head, BirStock",
    content:
      "Saleh transformed our inventory workflows with the BirStock ERP system. The real-time tracking, barcode scanning, and automated invoice generator eliminated our stock delays entirely.",
    image:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Amit Patel",
    role: "Owner, SpiceBite Hospitality",
    content:
      "The custom Restaurant POS and table management software Saleh delivered is exceptionally fast and easy for our staff. Table billing and live KOT updates run completely seamlessly.",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Faizan Shaikh",
    role: "Founder, CustomCraft",
    content:
      "Saleh built our tailor management mobile app with clean mobile OTP authentication and order tracking. His technical communication and timely delivery exceeded expectations.",
    image:
      "https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Client <span className="text-gradient-primary">Testimonials</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Feedback from talented leaders I've had the pleasure of partnering with throughout my career.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="p-8 rounded-3xl border flex flex-col relative overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-lg"
            style={{
              backgroundColor: "var(--section-color)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#004E7A]/5 rounded-full blur-[40px] group-hover:bg-[#004E7A]/10 transition-colors duration-500 pointer-events-none" />

            {/* Quote Icon */}
            <div className="absolute top-6 right-8 text-[#004E7A]/15 select-none">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 11l-2 2v-3H4V4h6v7zm10 0l-2 2v-3h-4V4h6v7z" />
              </svg>
            </div>

            <p className="text-muted-foreground leading-relaxed flex-grow relative z-10 italic mb-8">
              "{item.content}"
            </p>

            <div className="flex items-center gap-4 relative z-10 mt-auto">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border border-foreground/10 shadow-sm"
              />
              <div>
                <h4 className="text-foreground font-bold text-sm">{item.name}</h4>
                <p className="text-primary text-xs font-semibold">{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
