import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best selling' },
  { value: 'name-asc', label: 'Alphabetically A-Z' },
  { value: 'name-desc', label: 'Alphabetically Z-A' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price high to low' },
  { value: 'date-old', label: 'Date, old to new' }
];

const categories = [
  'All Wines',
  'Red Wines',
  'White Wines',
  'Rosé Wines',
  'Ice Wines',
  'Reserve & Private Cellar',
  'Award Winning',
  'Custom Labeled Wine',
  'Gift Sets and Baskets',
  'Merchandise'
];

interface FilterBarProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export function FilterBar({ sortBy, setSortBy, selectedCategory, setSelectedCategory }: FilterBarProps) {
  return (
    <section className="w-full bg-white border-t border-b border-cream">
      <div className="flex flex-col md:flex-row md:justify-end">
        <div className="w-full md:w-auto max-w-7xl md:pl-6 flex flex-col md:flex-row md:items-stretch">
          {/* Filter Dropdown */}
          <div className="flex-1 md:flex-none md:w-40 flex items-center justify-center h-16 border-b md:border-b-0 md:border-l border-cream">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-transparent border-0 h-auto p-0 gap-2 hover:opacity-80 transition-opacity justify-center text-center w-full text-brown-primary">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1 md:flex-none md:w-40 flex items-center justify-center h-16 border-l border-r border-cream">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-transparent border-0 h-auto p-0 gap-2 hover:opacity-80 transition-opacity justify-center text-center w-full text-brown-primary">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}