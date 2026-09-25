import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Hammer, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="py-28 bg-stone-50 text-center text-stone-900 min-h-[70vh] flex items-center">
      <Container size="narrow" className="space-y-6">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-300">
          <Hammer className="h-8 w-8" />
        </div>
        <h1 className="text-6xl font-extrabold font-heading text-stone-950 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-bold font-heading text-stone-800">
          Page Not Found in the Masonry
        </h2>
        <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
          The page or blueprint you are looking for has either been relocated or carved in another location.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/20">
              <Home className="h-4 w-4 mr-2" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
