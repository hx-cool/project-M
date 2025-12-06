import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { HeroSection } from "@/components/HeroSection";
import { Film, Send } from "lucide-react";

const RequestUs = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Request a Movie or Series</h1>
        
        <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Film className="text-pink w-6 h-6 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Can't Find What You're Looking For?</h2>
                <p className="text-gray-400">
                  We're constantly updating our library. If you can't find a specific movie or web series, 
                  let us know and we'll do our best to add it!
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">How to Request</h3>
              <div className="space-y-3 text-gray-400">
                <p>📧 Send us an email at: <a href="mailto:request@movieswala.is" className="text-pink hover:text-magenta">request@movieswala.is</a></p>
                <p>Include the following details:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Movie/Series Name</li>
                  <li>Release Year</li>
                  <li>Preferred Quality (480p, 720p, 1080p)</li>
                  <li>Language Preference</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Send className="text-pink w-6 h-6 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Processing Time</h2>
                <p className="text-gray-400">
                  Requests are typically processed within 3-5 business days. We'll notify you via email 
                  once your requested content is available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default RequestUs;
