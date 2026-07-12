import Link from "next/link";
import { navLinks } from "@/data/nav";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-white/10 bg-black px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-concrete">
            — Let&rsquo;s build
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight md:text-6xl">
            Start your
            <br />
            project
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.15em] text-white/70">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-cursor="link" className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.15em] text-white/70">
            <a href="mailto:hello@jcmhomebuilders.com" data-cursor="link" className="hover:text-white">
              hello@jcmhomebuilders.com
            </a>
            <a href="tel:+10000000000" data-cursor="link" className="hover:text-white">
              +1 (000) 000-0000
            </a>
            <span>Licensed &amp; Insured</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} JCM Home Builders. All rights reserved.</span>
        <span>Forward by design. Built with purpose.</span>
      </div>
    </footer>
  );
}
