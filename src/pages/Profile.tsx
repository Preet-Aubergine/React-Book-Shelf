import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();

  const handleFavouritesClick = () => {
    navigate("/profile/favourites");
  };
  const handleCurrentClick = () => {
    navigate("/profile/current");
  };
  const handleFinishedClick = () => {
    navigate("/profile/finished");
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">My Profile</h1>
        <button
          onClick={() => navigate("/search")}
          className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Back to Search
        </button>
      </div>
      <nav className="bg-gray-50">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <button
                  className="text-gray-900 dark:text-white hover:underline"
                  onClick={handleFavouritesClick}
                >
                  Favourites
                </button>
              </li>
              <li>
                <button
                  className="text-gray-900 dark:text-white hover:underline"
                  onClick={handleCurrentClick}
                >
                  Currently Reading
                </button>
              </li>
              <li>
                <button
                  className="text-gray-900 dark:text-white hover:underline"
                  onClick={handleFinishedClick}
                >
                  Finished
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
