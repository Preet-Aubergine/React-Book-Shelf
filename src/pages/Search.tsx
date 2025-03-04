import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useMemo,
} from "react";
import { useDebounce } from "use-debounce";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import Filter, { FilterOptions } from "../components/Filter";
import { IoMdClose } from "react-icons/io";

interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    description?: string;
    categories?: string[];
    publishedDate?: string;
    averageRating?: number;
  };
}

const Search = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [searchValue] = useDebounce(search, 100);
  const [bookData, setBookData] = useState<BookData[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const initialFilters: FilterOptions = {
    genre: "All",
    minRating: 0,
    yearRange: {
      start: "",
      end: "",
    },
  };
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [isFiltered, setIsFiltered] = useState(false);

  const username = localStorage.getItem("loggedInUser") || "User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const handleKeyDown = async (
    event: KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.key === "Enter") {
      if (search.trim() === "") {
        setBookData([]);
        setSearch("");
      } else {
        try {
          const response = await axios.get<{ items: BookData[] }>(
            `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`,
          );
          setBookData(response.data.items);
        } catch (err) {
          console.error("Error fetching books:", err);
          setBookData([]);
        }
      }
    }
  };

  const bookQuotes = [
    '"There is no friend as loyal as a book." - Ernest Hemingway',
    '"Books are a uniquely portable magic." - Stephen King',
    '"There is no friend as loyal as a book." - Ernest Hemingway',
    '"Reading is to the mind what exercise is to the body." - Joseph Addison',
  ];

  const randomQuote = useMemo(() => {
    return bookQuotes[Math.floor(Math.random() * bookQuotes.length)];
  }, []);

  const filteredBooks = useMemo(() => {
    return bookData.filter((book) => {
      if (filters.genre !== "All" && book.volumeInfo.categories) {
        if (!book.volumeInfo.categories.some(cat => 
          cat.toLowerCase().includes(filters.genre.toLowerCase())
        )) {
          return false;
        }
      }

      if (filters.minRating > 0 && book.volumeInfo.averageRating) {
        if (book.volumeInfo.averageRating < filters.minRating) {
          return false;
        }
      }

      if (filters.yearRange.start || filters.yearRange.end) {
        const publishYear = book.volumeInfo.publishedDate 
          ? parseInt(book.volumeInfo.publishedDate.split('-')[0])
          : 0;

        if (filters.yearRange.start && publishYear < parseInt(filters.yearRange.start)) {
          return false;
        }
        if (filters.yearRange.end && publishYear > parseInt(filters.yearRange.end)) {
          return false;
        }
      }

      return true;
    });
  }, [bookData, filters]);

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setIsFiltered(false);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setIsFiltered(true);
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-indigo-600">BookShelf</h1>
            <span className="text-gray-600">
              Welcome, <span className="font-semibold">{username}</span> !
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <div
              className="flex flex-col justify-center items-center cursor-pointer hover:text-indigo-600"
              onClick={() => navigate("/profile")}
            >
              <FaRegUser className="text-xl mb-1" />
              <span className="text-sm">My Profile</span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-6 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="mt-5 mb-8 flex justify-center items-center gap-2">
            <input
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search for books..."
              className="w-full max-w-md rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-indigo-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-center"
            />
            <button 
              className={`ml-4 px-4 py-2 text-white rounded-lg transition-colors ${
                isFiltered ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
              onClick={() => setShowFilter(true)}
            >
              <FaFilter className="text-xl text-white-600" />
            </button>
            {isFiltered && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center gap-2"
              >
                <IoMdClose size={20} />
                Clear Filters
              </button>
            )}
          </div>
          {bookData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {filteredBooks.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  name={item.volumeInfo.title}
                  img={item.volumeInfo.imageLinks?.thumbnail}
                  auth={item.volumeInfo.authors?.[0]}
                  desc={item.volumeInfo.description}
                  category={item.volumeInfo.categories?.[0]}
                  pubDate={item.volumeInfo.publishedDate}
                  rating={item.volumeInfo.averageRating}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <img
                src="/books.svg"
                alt="Books"
                className="w-32 h-32 mb-8 opacity-50"
              />
              <p className="text-2xl font-serif text-gray-600 max-w-2xl mx-auto italic">
                {randomQuote}
              </p>
              <p className="mt-4 text-gray-500">
                Search for your favorite books above
              </p>
            </div>
          )}
        </div>
      </div>

      <Filter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        filters={filters}
      />
    </>
  );
};

export default Search;
