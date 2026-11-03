import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
        }, 6000);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMsg("Network error. Please check your internet connection and try again.");
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-24 border-t transition-colors duration-300"
      style={{
        backgroundColor: "var(--section-color)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="p-8 md:p-12 rounded-[3rem] border relative overflow-hidden shadow-xl"
          style={{
            backgroundColor: "var(--card-color)",
            borderColor: "var(--border-color)",
          }}
        >
          <div
            className="absolute -top-40 -right-40 w-96 h-96 blur-[100px] rounded-full pointer-events-none opacity-20"
            style={{ backgroundColor: "var(--primary-color)" }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 blur-[100px] rounded-full pointer-events-none opacity-20"
            style={{ backgroundColor: "var(--primary-color)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-24">
            {/* Left Column: Direct info */}
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                  Let's <span className="text-gradient-primary">Connect</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Currently open for new opportunities and exciting collaborations. Whether you have a project idea, a question, or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <a
                  href="mailto:loriyasaleh@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border"
                    style={{
                      backgroundColor: "var(--section-color)",
                      borderColor: "var(--border-color)",
                    }}
                  >
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
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border"
                    style={{
                      backgroundColor: "var(--section-color)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-base">
                    +91 7862072271
                  </span>
                </a>

                <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border"
                    style={{
                      backgroundColor: "var(--section-color)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-base">
                    Siddhpur, Gujarat, India
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div
              className="flex-1 p-8 rounded-[2rem] border relative shadow-sm"
              style={{
                backgroundColor: "var(--section-color)",
                borderColor: "var(--border-color)",
              }}
            >
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-xl py-3 px-4 border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-muted-foreground/50 text-sm transition-all shadow-sm disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--border-color)",
                      color: "var(--fg-color)",
                    }}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-xl py-3 px-4 border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-muted-foreground/50 text-sm transition-all shadow-sm disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--border-color)",
                      color: "var(--fg-color)",
                    }}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-xl py-3 px-4 border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none placeholder:text-muted-foreground/50 min-h-[120px] text-sm transition-all shadow-sm disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      borderColor: "var(--border-color)",
                      color: "var(--fg-color)",
                    }}
                    placeholder="How can I help you?"
                  />
                </div>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Thank you! Your message has been sent successfully. I'll get back to you soon.</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg || "Failed to send message. Please try again."}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-xl font-bold shadow-lg mt-4 h-12 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "#FFFFFF",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
