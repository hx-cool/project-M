export const Footer = () => {
  const footerLinks = [
    { name: "📞 Contact Us", href: "/contact-us" },
    { name: "📝 Request Us", href: "/request-us" },
    { name: "ℹ️ About Us", href: "/about-us" },
    { name: "⚖️ DMCA", href: "/dmca" },
  ];

  return (
    <footer className="bg-gradient-to-r from-black via-[#0d0000] to-[#1a0000] border-t border-white/20 py-3 md:py-5 mt-6 md:mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Copyright */}
        <div className="text-center mb-3 md:mb-4">
          <p className="text-muted-foreground text-xs md:text-sm">
            Movieswala - Download Bollywood & Hollywood Movies 720p, 1080p & 2160p 4K © 2025. All Rights Reserved.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/30 to-transparent mb-3 md:mb-4"></div>

        {/* Footer Links */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-pink transition-colors duration-300 text-xs md:text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};