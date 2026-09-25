import { useState } from 'react';
import { portfolioProjects } from '@/data/mockData';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type CategoryFilter = 'all' | 'residential' | 'hardscaping' | 'restoration' | 'commercial';

export function PortfolioSection() {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredProjects = filter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-14 sm:py-24 bg-stone-100/70 border-b border-stone-200">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="stone" className="uppercase font-semibold tracking-wider bg-amber-100 text-amber-950 border-amber-300">
            Featured Craftsmanship
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-heading tracking-tight">
            Recent Masonry Masterpieces
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Inspect our portfolio of custom residential estates, historic restorations, and architectural stone hardscapes throughout the tri-state area.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {(
              [
                { id: 'all', label: 'All Projects' },
                { id: 'residential', label: 'Residential Stone' },
                { id: 'hardscaping', label: 'Patios & Hardscape' },
                { id: 'restoration', label: 'Historic Restoration' },
                { id: 'commercial', label: 'Commercial' },
              ] as const
            ).map((tab) => (
              <Button
                key={tab.id}
                variant={filter === tab.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(tab.id)}
                className={
                  filter === tab.id
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50'
                }
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-amber-500/80 shadow-md hover:shadow-xl hover:shadow-stone-200/80 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-stone-200">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant="stone" className="capitalize text-xs font-semibold bg-white/95 text-stone-900 border-stone-200 shadow-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-stone-500 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-600" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-amber-600" />
                        {project.completionYear}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
