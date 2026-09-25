import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Hammer, Phone, Mail, MapPin, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-100 text-stone-700 border-t border-stone-200">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-600 flex items-center justify-center text-white shadow-sm">
                <Hammer className="h-5 w-5 fill-white stroke-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl text-stone-950 tracking-tight">
                  DA GRACA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold -mt-1">
                  Masonry & Stone
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              Family-owned master stonemasons delivering enduring architectural stone, custom brickwork, bluestone terraces, and historic masonry restoration throughout New Jersey and the tri-state area.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-600" />
                <span>NJ HIC #13VH09823400</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-600" />
                <span>Fully Insured & Bonded</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-amber-900 font-heading font-bold text-xs uppercase tracking-wider mb-4">
              Masonry Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="text-stone-600 hover:text-amber-800 transition-colors flex items-center justify-between group">
                  <span>Architectural Stone Masonry</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-stone-600 hover:text-amber-800 transition-colors flex items-center justify-between group">
                  <span>Historic Brick & Tuckpointing</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-stone-600 hover:text-amber-800 transition-colors flex items-center justify-between group">
                  <span>Bluestone Patios & Terraces</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-stone-600 hover:text-amber-800 transition-colors flex items-center justify-between group">
                  <span>Engineered Retaining Walls</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-stone-600 hover:text-amber-800 transition-colors flex items-center justify-between group">
                  <span>Chimney & Fireplace Rebuilds</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-stone-600 hover:text-amber-800 transition-colors flex items-center justify-between group">
                  <span>Commercial Masonry & CMU</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Service Area */}
          <div>
            <h4 className="text-amber-900 font-heading font-bold text-xs uppercase tracking-wider mb-4">
              Service Areas
            </h4>
            <p className="text-xs text-stone-500 mb-3">
              Serving premier estates and commercial properties across:
            </p>
            <ul className="space-y-1.5 text-sm text-stone-700">
              <li>• Somerset County, NJ</li>
              <li>• Hunterdon & Mercer County</li>
              <li>• Morris & Union County</li>
              <li>• Bergen & Essex County</li>
              <li>• Bucks County, PA</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-amber-900 font-heading font-bold text-xs uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a href="tel:9085557866" className="flex items-center gap-3 text-stone-700 hover:text-amber-800 transition-colors">
                <Phone className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="break-all sm:break-normal">(908) 555-STONE / (908) 555-7866</span>
              </a>
              <a href="mailto:info@dagracamasonry.com" className="flex items-center gap-3 text-stone-700 hover:text-amber-800 transition-colors">
                <Mail className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="break-all sm:break-normal">info@dagracamasonry.com</span>
              </a>
              <div className="flex items-start gap-3 text-stone-600">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>HQ: Bridgewater, NJ 08807<br />Mon – Sat: 7:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4 text-center sm:text-left">
          <p>© {currentYear} Da Graca Masonry LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <span className="hover:text-stone-800 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-800 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-800 transition-colors cursor-pointer">Licensing & Insurance</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
