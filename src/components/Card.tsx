import { FC, useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaBook } from "react-icons/fa6";
import { ImCheckboxUnchecked } from "react-icons/im";

interface CardProps {
  id: string;
  name: string;
  img?: string;
  auth?: string;
  desc?: string;
  category?: string;
  pubDate?: string;
  rating?: number;
}

const Card: FC<CardProps> = ({
  id,
  name,
  img,
  auth,
  desc,
  category,
  pubDate,
  rating,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [current, setCurrent] = useState(false);

  // Check if book is already in favorites when component mounts
  useEffect(() => {
    const favouriteBooks = JSON.parse(
      localStorage.getItem("favouriteBooks") || "[]"
    );
    setLiked(favouriteBooks.some((book: any) => book.id === id));
  }, [id]);

  useEffect(() => {
    const currentBooks = JSON.parse(
      localStorage.getItem("currentBooks") || "[]"
    );
    setCurrent(currentBooks.some((book: any) => book.id === id));
  }, [id]);

  // handle click for future implementation

  // const handleLikeClick = () => {
  //   if (!liked) {
  //     const favBook = {
  //       id,
  //       volumeInfo: {
  //         title: name,
  //         authors: auth ? [auth] : [],
  //         imageLinks: img ? { thumbnail: img } : undefined,
  //         description: desc,
  //         categories: category ? [category] : [],
  //         publishedDate: pubDate,
  //       },

  //     }
  //     setBook?.(favBook);
  //     // // Add to favorites
  //     // const newFavourite = {
  //     //   id,
  //     //   volumeInfo: {
  //     //     title: name,
  //     //     authors: auth ? [auth] : [],
  //     //     imageLinks: img ? { thumbnail: img } : undefined,
  //     //     description: desc,
  //     //     categories: category ? [category] : [],
  //     //     publishedDate: pubDate,
  //     //   },
  //     // };
  //     // localStorage.setItem(
  //     //   "favouriteBooks",
  //     //   JSON.stringify([...favouriteBooks, newFavourite])
  //     // );
  //   } else {
  //     // Remove from favorites
  //     removeBook?.(favBook)
  //     // const updatedFavourites = favouriteBooks.filter(
  //     //   (book: any) => book.id !== id
  //     // );
  //     // localStorage.setItem("favouriteBooks", JSON.stringify(updatedFavourites));
  //   }

  //   setLiked(!liked);
  // };

  const handleLikeClick = () => {
    const favouriteBooks = JSON.parse(
      localStorage.getItem("favouriteBooks") || "[]"
    );

    if (!liked) {
      // Add to favorites
      const newFavourite = {
        id,
        volumeInfo: {
          title: name,
          authors: auth ? [auth] : [],
          imageLinks: img ? { thumbnail: img } : undefined,
          description: desc,
          categories: category ? [category] : [],
          publishedDate: pubDate,
        },
      };
      localStorage.setItem(
        "favouriteBooks",
        JSON.stringify([...favouriteBooks, newFavourite])
      );
    } else {
      // Remove from favorites
      const updatedFavourites = favouriteBooks.filter(
        (book: any) => book.id !== id
      );
      localStorage.setItem("favouriteBooks", JSON.stringify(updatedFavourites));
    }

    setLiked(!liked);
  };

  const handleCurrentClick = () => {
    const currentBooks = JSON.parse(
      localStorage.getItem("currentBooks") || "[]"
    );

    if (!current) {
      // Add to favorites
      const newCurrent = {
        id,
        volumeInfo: {
          title: name,
          authors: auth ? [auth] : [],
          imageLinks: img ? { thumbnail: img } : undefined,
          description: desc,
          categories: category ? [category] : [],
          publishedDate: pubDate,
        },
      };
      localStorage.setItem(
        "currentBooks",
        JSON.stringify([...currentBooks, newCurrent])
      );
    } else {
      // Remove from favorites
      const updatedCurrents = currentBooks.filter(
        (book: any) => book.id !== id
      );
      localStorage.setItem("currentBooks", JSON.stringify(updatedCurrents));
    }

    setCurrent(!current);
  };

  function getFirstTwoSentences(text: string | undefined): string {
    if (!text) return "";
    const match = text.match(/[^.!?]+[.!?]\s*/g); // Match sentences
    return match ? match.slice(0, 2).join(" ") : text; // Return first two or full text }
  }

  // Add this helper function to format the date
  const formatDate = (date: string | undefined): string => {
    if (!date) return "";
    const year = date.split("-")[0];
    return year;
  };

  return (
    <>
      <div className="relative flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-64 transform hover:-translate-y-1">
        {/* Like Button with improved styling */}
        <div
          className="absolute top-3 left-3 flex items-center justify-center bg-white/80 backdrop-blur-sm w-9 h-9 rounded-full hover:bg-white cursor-pointer shadow-md z-10 transition-transform hover:scale-110"
          onClick={handleLikeClick}
        >
          {!liked ? (
            <FaRegHeart className="text-red-500 text-xl" />
          ) : (
            <FcLike className="text-xl animate-bounce" />
          )}
        </div>
        <div
          className="absolute top-3 right-3 flex items-center justify-center bg-white/80 backdrop-blur-sm w-9 h-9 rounded-full hover:bg-white cursor-pointer shadow-md z-10 transition-transform hover:scale-110"
          onClick={handleCurrentClick}
        >
          {!current ? (
            <FaBook className="text-gray-500 text-xl" />
          ) : (
            <FaBook className="text-xl animate-bounce" />
          )}
        </div>
        {/* Image Container with gradient overlay */}
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]" />
          <img
            src={img || "/placeholder-book.jpg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {rating && (
            <div className="absolute bottom-2 left-2 z-[2] bg-gray-400 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-white flex items-center gap-1">
              <span>⭐ {rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 flex-1 flex flex-col">
          <h6 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 min-h-[3.5rem]">
            {name}
          </h6>

          <div className="space-y-2 flex-1">
            {auth && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">By</span>
                <span className="text-indigo-600 font-medium">{auth}</span>
              </div>
            )}

            {category && (
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">
                {category}
              </div>
            )}

            {pubDate && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Published</span>
                <span className="text-gray-700">{formatDate(pubDate)}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          {current ? (
            <div className="flex items-center justify-center">
              <button
                onClick={() => setShowDescription(true)}
                className="mt-4 mr-1 w-40 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium 
            transition-all duration-300 transform hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Read more
              </button>
              <button className="mt-4 ml-1 w-15 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium 
            transition-all duration-300 transform hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">D</button>
            </div>
          ) : (
            <button
              onClick={() => setShowDescription(true)}
              className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium 
            transition-all duration-300 transform hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Read more
            </button>
          )}
        </div>
      </div>

      {/* Modal with improved styling */}
      {showDescription && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowDescription(false)}
                className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-6">
                <img
                  src={img}
                  alt={name}
                  className="w-48 h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {name}
                  </h2>
                  <p className="text-indigo-600 font-medium mb-4">By {auth}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {getFirstTwoSentences(desc)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
