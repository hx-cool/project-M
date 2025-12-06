import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { HeroSection } from "@/components/HeroSection";
import { Shield, AlertTriangle, Mail } from "lucide-react";

const DMCA = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <HeroSection />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">DMCA Policy</h1>
        
        <div className="space-y-6">
          <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
            <div className="flex items-start gap-4">
              <Shield className="text-pink w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Copyright Notice</h2>
                <p className="text-gray-400 leading-relaxed">
                  MoviesWala.is respects the intellectual property rights of others and expects its users to do the same. 
                  In accordance with the Digital Millennium Copyright Act (DMCA), we will respond expeditiously to claims 
                  of copyright infringement committed using our website.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-pink w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Disclaimer</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  MoviesWala.is does not host any files on its servers. All content is provided by non-affiliated third parties. 
                  We merely index links that are publicly available on the internet. We do not upload, store, or distribute any 
                  copyrighted material.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement 
                  and is accessible via our website, please notify us immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
            <div className="flex items-start gap-4">
              <Mail className="text-pink w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Filing a DMCA Complaint</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  If you are a copyright owner or authorized to act on behalf of one, please report alleged copyright 
                  infringements by providing us with the following information:
                </p>
                <ul className="space-y-3 text-gray-400 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">•</span>
                    <span>A physical or electronic signature of the copyright owner or authorized representative</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">•</span>
                    <span>Identification of the copyrighted work claimed to have been infringed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">•</span>
                    <span>Identification of the material that is claimed to be infringing with URL links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">•</span>
                    <span>Your contact information (address, telephone number, and email address)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">•</span>
                    <span>A statement that you have a good faith belief that use of the material is not authorized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">•</span>
                    <span>A statement that the information in the notification is accurate</span>
                  </li>
                </ul>
                <div className="bg-pink/10 border border-pink/30 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">Contact Email:</p>
                  <a href="mailto:dmca@movieswala.is" className="text-pink hover:text-magenta transition-colors">
                    dmca@movieswala.is
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-3">Response Time</h2>
            <p className="text-gray-400 leading-relaxed">
              Upon receipt of a valid DMCA notice, we will remove or disable access to the allegedly infringing material 
              within 24-48 hours. We will also notify the user who posted the content about the removal.
            </p>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-3">Counter-Notification</h2>
            <p className="text-gray-400 leading-relaxed">
              If you believe that your content was removed by mistake or misidentification, you may file a counter-notification 
              with us. The counter-notification must include your contact information, identification of the removed material, 
              and a statement under penalty of perjury that the material was removed by mistake.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default DMCA;
