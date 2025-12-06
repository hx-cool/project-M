import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { HeroSection } from "@/components/HeroSection";
import { Info, Target, Shield } from "lucide-react";

const AboutUs = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">About MoviesWala</h1>
        
        <div className="space-y-6">
          <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
            <div className="flex items-start gap-4">
              <Info className="text-pink w-6 h-6 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Who We Are</h2>
                <p className="text-gray-400 leading-relaxed">
                  MoviesWala.is is your ultimate destination for downloading the latest Hollywood, Bollywood, 
                  South Indian movies, web series, anime, and K-dramas. We provide high-quality content in 
                  multiple resolutions (480p, 720p, 1080p) with dual audio options.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
            <div className="flex items-start gap-4">
              <Target className="text-pink w-6 h-6 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
                <p className="text-gray-400 leading-relaxed">
                  To provide easy access to entertainment content with fast, secure, and hassle-free downloads. 
                  We strive to keep our library updated with the latest releases and maintain the highest 
                  quality standards for all our content.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] rounded-xl p-8 border border-white/20">
            <div className="flex items-start gap-4">
              <Shield className="text-pink w-6 h-6 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Why Choose Us?</h2>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">✓</span>
                    <span>Multiple quality options (480p, 720p, 1080p)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">✓</span>
                    <span>Dual audio support (Hindi-English)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">✓</span>
                    <span>Fast and secure downloads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">✓</span>
                    <span>Regular updates with latest releases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink mt-1">✓</span>
                    <span>User-friendly interface</span>
                  </li>
                </ul>
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

export default AboutUs;
