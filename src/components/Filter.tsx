import { FC } from 'react';
import { IoMdClose } from "react-icons/io";

interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  filters: FilterOptions;
}

export interface FilterOptions {
  genre: string;
  minRating: number;
  yearRange: {
    start: string;
    end: string;
  };
}

const Filter: FC<FilterProps> = ({ isOpen, onClose, onApplyFilters, onClearFilters, filters }) => {
  const genres = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "History",
    "Biography",
    "Business",
    "Self-Help",
    "Poetry",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newFilters: FilterOptions = {
      genre: formData.get('genre') as string,
      minRating: Number(formData.get('rating')),
      yearRange: {
        start: formData.get('yearStart') as string,
        end: formData.get('yearEnd') as string,
      }
    };
    
    onApplyFilters(newFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Filter Books</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genre
            </label>
            <select
              name="genre"
              defaultValue={filters.genre}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <input
              type="range"
              name="rating"
              min="0"
              max="5"
              step="0.5"
              defaultValue={filters.minRating}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>0</span>
              <span>5</span>
            </div>
          </div>

          {/* Year Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publication Year Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="yearStart"
                placeholder="From"
                defaultValue={filters.yearRange.start}
                min="1800"
                max={new Date().getFullYear()}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="yearEnd"
                placeholder="To"
                defaultValue={filters.yearRange.end}
                min="1800"
                max={new Date().getFullYear()}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={() => {
                onClearFilters();
                onClose();
              }}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Clear Filters
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter; 