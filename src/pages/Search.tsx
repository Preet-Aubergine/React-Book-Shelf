import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useDebounce } from "use-debounce";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    description?: string;
  };
}

const Search = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [searchValue] = useDebounce(search, 500);
  const [bookData, setBookData] = useState<BookData[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
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
            `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
          );
          setBookData(response.data.items);
        } catch (err) {
          console.error("Error fetching books:", err);
          setBookData([]);
        }
      }
    }
  };

  useEffect(() => {
    if (searchValue) {
      console.log("Searching for:", searchValue);
    }
  }, [searchValue]);

  return (
    <>
      <div>
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-indigo-600">BookShelf</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="container mx-auto px-4">
          <div className="mt-5 mb-8 flex justify-center">
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {bookData.map((item) => (
              <Card
                key={item.id}
                name={item.volumeInfo.title}
                img={item.volumeInfo.imageLinks?.thumbnail}
                auth={item.volumeInfo.authors[0]}
                desc={item.volumeInfo.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
