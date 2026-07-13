import Image from "next/image";
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
            <a href="mailto:jcmconstruction2020@gmail.com" data-cursor="link" className="hover:text-white">
              jcmconstruction2020@gmail.com
            </a>
            <a href="tel:+639165384494" data-cursor="link" className="hover:text-white">
              0916 538 4494
            </a>
            <span>Davao City, Philippines</span>
            <a
              href="https://www.facebook.com/jcmhomebuilders/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="flex items-center gap-2 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 fill-current"
              >
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} JCM Home Builders. All rights reserved.</span>
        <span>Forward by design. Built with purpose.</span>
        <a
          href="https://www.aequoradigital.com/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="flex items-center gap-2 normal-case tracking-normal text-white/40 transition-colors hover:text-white"
        >
          Designed &amp; developed by
          <span className="relative h-5 w-5 shrink-0">
            <Image
              src="/images/Aequora-digital-logo.png"
              alt="Aequora Digital"
              fill
              sizes="20px"
              className="object-contain"
            />
          </span>
          <span className="text-white/60">Aequora Digital</span>
        </a>
      </div>
    </footer>
  );
}
