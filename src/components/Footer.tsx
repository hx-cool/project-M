export const Footer = () => {
  const footerLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Request Us", href: "/request" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <footer className="bg-surface border-t border-border/20 py-4 md:py-8 mt-8 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-4 md:mb-6">
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

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/30 to-transparent mb-4 md:mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-xs md:text-sm">
            © 2025 <span className="text-pink font-bold">MoviesWala</span>. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-[10px] md:text-xs mt-1 md:mt-2">
            Premium movie download experience with neon aesthetics.
          </p>
        </div>
      </div>
    </footer>
  );
};