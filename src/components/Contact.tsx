import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-[3rem] border border-foreground/10 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Left Column: Direct info */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Let's <span className="text-gradient-primary">Connect</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Currently open for new opportunities and exciting collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:loriyasaleh@gmail.com"
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform shadow-md border border-foreground/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground text-base">
                  loriyasaleh@gmail.com
                </span>
              </a>

              <a
                href="tel:+917862072271"
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform shadow-md border border-foreground/10">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground text-base">
                  +91 7862072271
                </span>
              </a>

              <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform shadow-md border border-foreground/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground text-base">
                  Siddhpur, Gujarat, India
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex-1 glass-panel p-8 rounded-[2rem] border border-foreground/10 relative shadow-xl">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl py-3 px-4 bg-foreground/5 border border-foreground/10 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-muted-foreground/50 text-sm transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl py-3 px-4 bg-foreground/5 border border-foreground/10 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-muted-foreground/50 text-sm transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full rounded-xl py-3 px-4 bg-foreground/5 border border-foreground/10 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none placeholder:text-muted-foreground/50 min-h-[120px] text-sm transition-all"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] mt-4 h-12 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer"
              >
                <span>{submitted ? "Message Sent!" : "Send Message"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
