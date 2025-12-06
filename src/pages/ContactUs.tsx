import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { HeroSection } from "@/components/HeroSection";
import { Mail, MessageSquare } from "lucide-react";

const ContactUs = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Contact Us</h1>
        
        <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="text-pink w-6 h-6 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Email Us</h2>
                <p className="text-gray-400 mb-2">For any queries, suggestions, or support:</p>
                <a href="mailto:contact@movieswala.is" className="text-pink hover:text-magenta">
                  contact@movieswala.is
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageSquare className="text-pink w-6 h-6 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Get in Touch</h2>
                <p className="text-gray-400">
                  We're here to help! Whether you have questions about downloads, technical issues, 
                  or just want to share feedback, feel free to reach out to us.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-3">Response Time</h3>
              <p className="text-gray-400">
                We typically respond to all inquiries within 24-48 hours. Thank you for your patience!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ContactUs;
