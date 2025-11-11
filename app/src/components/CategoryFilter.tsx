interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { id: '', label: 'All Products', icon: '🏪' },
    { id: 'honey', label: 'Honey', icon: '🍯' },
    { id: 'nuts', label: 'Nuts', icon: '🥜' },
    { id: 'combo', label: 'Combos', icon: '🎁' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full border-2 transition-colors ${
            selectedCategory === category.id
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500 hover:text-primary-600'
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span className="font-medium">{category.label}</span>
        </button>
      ))}
    </div>
  );
}