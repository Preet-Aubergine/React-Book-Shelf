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

const Current = (): JSX.Element => {
  const navigate = useNavigate();
  const currentBooks = JSON.parse(
    localStorage.getItem("currentBooks") || "[]"
  ) as BookData[];
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">Books that you're Currently Reading</h1>
        <button
          onClick={() => navigate("/profile")}
          className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Back to Profile
        </button>
      </div>

      <div className="container mx-auto px-4">
        {currentBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {currentBooks.map((item) => (
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
              Currently Not Reading any Books !
            </p>
            <p className="mt-4 text-gray-500">
              Search a Book and Start Reading
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Current;
