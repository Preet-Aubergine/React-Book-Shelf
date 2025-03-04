import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export interface BookData {
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

const Favourite = (): JSX.Element => {
  const navigate = useNavigate();
  const favouriteBooks = JSON.parse(
    localStorage.getItem("favouriteBooks") || "[]"
  ) as BookData[];
  // const setBook = (book: BookData) => {
  //   favouriteBooks.push(book);
  // }
  // const removeBook = (selectedBookId: string) => {
  //   favouriteBooks.filter(
  //     (book: BookData) => book.id !== selectedBookId
  //   );
  // }

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">Favourite Books</h1>
        <button
          onClick={() => navigate("/profile")}
          className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Back to Profile
        </button>
      </div>
      <div className="container mx-auto px-4">
        {favouriteBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {favouriteBooks.map((item) => (
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
                // setBook={setBook}
                // removeBook={removeBook}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <p className="text-2xl font-serif text-gray-600 max-w-2xl mx-auto">
              No favourite books yet!
            </p>
            <p className="mt-4 text-gray-500">
              Add some books to your favourites from the search page
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
