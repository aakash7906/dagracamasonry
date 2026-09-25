import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryProjects } from '@/data/mockData';
import type { GalleryItem, ProjectCategory } from '@/types';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Calendar,
  Sparkles,
  Search,
  X,
  ArrowRight,
  Maximize2,
  Layers,
  Ruler,
  CheckCircle2,
  SplitSquareVertical,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const filterCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Natural Stone & Facades' },
  { id: 'hardscaping', label: 'Patios & Bluestone' },
  { id: 'restoration', label: 'Historic Brick Restoration' },
  { id: 'fireplaces', label: 'Fireplaces & Hearths' },
  { id: 'walls', label: 'Retaining Walls' },
  { id: 'commercial', label: 'Commercial Masonry' },
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<GalleryItem | null>(null);
  const [showModalBefore, setShowModalBefore] = useState(false);
  const [cardBeforeMap, setCardBeforeMap] = useState<Record<string, boolean>>({});

  // Collect unique materials for secondary filter
  const allMaterials = useMemo(() => {
    const set = new Set<string>();
    galleryProjects.forEach((p) => {
      p.materials.forEach((m) => set.add(m));
    });
    return Array.from(set);
  }, []);

  // Filtered dataset
  const filteredProjects = useMemo(() => {
    return galleryProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      const matchesMaterial =
        selectedMaterial === 'all' ||
        project.materials.some((m) =>
          m.toLowerCase().includes(selectedMaterial.toLowerCase())
        );

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.materials.some((m) => m.toLowerCase().includes(query));

      return matchesCategory && matchesMaterial && matchesSearch;
    });
  }, [selectedCategory, selectedMaterial, searchQuery]);

  const toggleCardBefore = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardBeforeMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openModal = (project: GalleryItem) => {
    setActiveModalProject(project);
    setShowModalBefore(false);
  };

  return (
    <div className="py-12 lg:py-20 bg-stone-900 min-h-screen text-stone-100">
      {/* Header Banner */}
      <Container className="mb-14">
        <div className="max-w-3xl space-y-4">
          <Badge variant="stone" className="uppercase font-semibold tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 mr-1.5 inline" />
            Master Craftsman Portfolio
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Our Work Carved in Stone
          </h1>
          <p className="text-stone-300 text-lg sm:text-xl leading-relaxed">
            Inspect our portfolio of custom Pennsylvania bluestone terraces, hand-split fieldstone veneers, historic lime-mortar tuckpointing, and engineered retaining walls across New Jersey and the tri-state area.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              <span>100% Genuine Quarried Natural Stone</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
              <span>25-Year Structural Workmanship Guarantee</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-stone-950 border border-stone-800 shadow-xl space-y-6">
          {/* Search and Category tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search stone, city, or feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-stone-400 font-medium">
              Showing <span className="text-amber-400 font-bold">{filteredProjects.length}</span> verified projects
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/80">
            {filterCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className={
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'border-stone-800 text-stone-300 hover:text-white hover:bg-stone-900 text-xs'
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Material Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-800/60">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider mr-2">
              Filter by Material:
            </span>
            <button
              onClick={() => setSelectedMaterial('all')}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                selectedMaterial === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              All Materials
            </button>
            {allMaterials.slice(0, 6).map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(selectedMaterial === mat ? 'all' : mat)}
                className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                  selectedMaterial === mat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Projects Grid */}
      <Container>
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
            <Layers className="h-12 w-12 text-stone-600 mx-auto" />
            <h3 className="text-xl font-bold font-heading text-white">
              No Masonry Projects Matched Your Search
            </h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto">
              Try resetting your category or material filters to see all completed projects in our portfolio.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedMaterial('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => {
                const isShowingBefore = !!cardBeforeMap[project.id];
                const currentImg =
                  isShowingBefore && project.beforeImageUrl
                    ? project.beforeImageUrl
                    : project.imageUrl;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="group rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                    onClick={() => openModal(project)}
                  >
                    {/* Image Container */}
                    <div className="relative h-64 w-full overflow-hidden bg-stone-900">
                      <img
                        src={currentImg}
                        alt={project.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <Badge variant="stone" className="text-xs font-semibold backdrop-blur-md">
                          {project.categoryLabel}
                        </Badge>

                        {/* Before/After Toggle if available */}
                        {project.beforeImageUrl && (
                          <button
                            onClick={(e) => toggleCardBefore(project.id, e)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-900/90 hover:bg-stone-800 text-amber-400 border border-amber-500/40 shadow-lg backdrop-blur-md transition-colors"
                            title="Click to toggle Before / After transformation"
                          >
                            <SplitSquareVertical className="h-3 w-3" />
                            <span>{isShowingBefore ? 'Viewing: BEFORE' : 'View BEFORE'}</span>
                          </button>
                        )}
                      </div>

                      {/* Expand overlay button */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="inline-flex items-center gap-1 text-xs bg-stone-950/90 text-amber-400 border border-stone-700 px-3 py-1.5 rounded-lg shadow-lg font-semibold">
                          <Maximize2 className="h-3 w-3" />
                          <span>Inspect Craft</span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-xs text-stone-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-amber-500" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-amber-500" />
                            {project.completionYear}
                          </span>
                        </div>

                        <h3 className="text-xl font-heading font-bold text-white group-hover:text-amber-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm text-stone-400 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Specs and Materials */}
                      <div className="space-y-3 pt-3 border-t border-stone-800/80">
                        {project.dimensions && (
                          <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
                            <Ruler className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                            <span>{project.dimensions}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5">
                          {project.materials.map((mat) => (
                            <span
                              key={mat}
                              className="text-[11px] px-2.5 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-stone-300 font-medium"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>

      {/* Lightbox / Inspector Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header Bar */}
              <div className="p-4 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
                <div>
                  <Badge variant="stone" className="text-xs mb-1">
                    {activeModalProject.categoryLabel}
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    {activeModalProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="h-10 w-10 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center border border-stone-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Photo Viewer */}
                <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 h-[340px] sm:h-[440px]">
                  <img
                    src={
                      showModalBefore && activeModalProject.beforeImageUrl
                        ? activeModalProject.beforeImageUrl
                        : activeModalProject.imageUrl
                    }
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Toggle button inside modal if beforeImageUrl exists */}
                  {activeModalProject.beforeImageUrl && (
                    <div className="absolute bottom-4 left-4">
                      <Button
                        size="sm"
                        variant={showModalBefore ? 'secondary' : 'default'}
                        onClick={() => setShowModalBefore(!showModalBefore)}
                        className="shadow-lg backdrop-blur-md text-xs font-bold"
                      >
                        <SplitSquareVertical className="h-3.5 w-3.5 mr-1.5" />
                        {showModalBefore ? 'Show Completed Result' : 'Show Before Restoration'}
                      </Button>
                    </div>
                  )}

                  {showModalBefore && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 font-bold px-3 py-1 rounded-md text-xs uppercase shadow-md">
                      Historical Pre-Condition
                    </div>
                  )}
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-400 block mb-0.5">Location</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-amber-500" />
                      {activeModalProject.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Completed</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-amber-500" />
                      {activeModalProject.completionYear}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Scope / Scale</span>
                    <span className="font-semibold text-white">
                      {activeModalProject.dimensions || 'Custom Estate Project'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Warranty</span>
                    <span className="font-semibold text-amber-400">25-Year Structural</span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-3">
                  <h4 className="text-lg font-heading font-bold text-white">
                    Craftsmanship & Execution Details
                  </h4>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                {/* Materials Used */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                    Hand-Selected Quarry Materials & Specs
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalProject.materials.map((mat) => (
                      <div
                        key={mat}
                        className="flex items-center gap-2 p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                      >
                        <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-6 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-400 text-center sm:text-left">
                  Interested in similar stonework for your home or estate?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => setActiveModalProject(null)}
                    className="w-full sm:w-auto text-xs"
                  >
                    Close
                  </Button>
                  <Link to="/#consultation" className="w-full sm:w-auto">
                    <Button
                      size="default"
                      className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs"
                      onClick={() => setActiveModalProject(null)}
                    >
                      <span>Inquire About This Style</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Consultation Banner */}
      <Container className="mt-20">
        <div className="rounded-3xl bg-stone-950 border border-stone-800 p-8 sm:p-12 text-center space-y-6">
          <Badge variant="stone" className="uppercase font-semibold tracking-wider">
            Ready to Build Your Stone Legacy?
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight max-w-2xl mx-auto">
            Book an On-Site Consultation with Our Master Stonemasons
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
            We will visit your property, review site elevations and soil conditions, and present an itemized estimate with material samples.
          </p>
          <div className="pt-2">
            <Link to="/#consultation">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold">
                <span>Request Free Estimate</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
