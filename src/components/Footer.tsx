import { Heart } from "lucide-react";
import { SOCIAL } from "../data/social";
import Logo from "./logo";

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Logo/>

            <p className="max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm">
              The premium daily destination for riddles, logic teasers, and
              brain puzzles. Crafted to sharpen curiosity and lateral thinking.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={SOCIAL.X}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="rounded-lg bg-slate-900 p-2 transition-colors hover:bg-slate-800"
              >
                <img
                  src="/assets/images/twitter.svg"
                  alt="X"
                  className="h-5 w-5"
                  loading="lazy"
                />
              </a>

              <a
                href={SOCIAL.INSTA}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg bg-slate-900 p-2 transition-colors hover:bg-slate-800"
              >
                <img
                  src="/assets/images/instagram.svg"
                  alt="Instagram"
                  className="h-5 w-5"
                  loading="lazy"
                />
              </a>

              <a
                href={SOCIAL.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-lg bg-slate-900 p-2 transition-colors hover:bg-slate-800"
              >
                <img
                  src="/assets/images/facebook.svg"
                  alt="Facebook"
                  className="h-5 w-5"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#daily-puzzle"
                  className="transition-colors hover:text-amber-400"
                >
                  Daily Puzzle
                </a>
              </li>
              <li>
                <a
                  href="#archive"
                  className="transition-colors hover:text-amber-400"
                >
                  Puzzle Archive
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="transition-colors hover:text-amber-400"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#stats"
                  className="transition-colors hover:text-amber-400"
                >
                  Statistics
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="transition-colors hover:text-amber-400"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Legal & Trust
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="transition-colors hover:text-amber-400"
                >
                  Privacy Policy
                </button>
              </li>

              <li>
                <button
                  onClick={onOpenTerms}
                  className="transition-colors hover:text-amber-400"
                >
                  Terms of Service
                </button>
              </li>

              <li>
                <span className="text-slate-500">
                  100% Static & Browser Native
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-xs text-slate-500 sm:flex-row">
          <div>
            © {new Date().getFullYear()} ThePuzzleDrop. All rights reserved.
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span>for curious minds worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}