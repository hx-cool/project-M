import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export const TelegramBanner = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan/20 via-luxury/10 to-cyan/20 p-12 shadow-cinema">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/5 to-transparent blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan glow-cyan">
              <Send className="h-8 w-8 text-background" />
            </div>
            
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Join Our Telegram Channel
            </h2>
            
            <p className="mb-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Get instant notifications for new movie releases, exclusive content, and direct download links. 
              Join 50K+ movie lovers!
            </p>
            
            <Button variant="hero" size="lg" className="gap-3">
              <Send className="h-5 w-5" />
              Join Now on Telegram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
