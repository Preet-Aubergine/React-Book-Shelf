import { useNavigate } from "react-router-dom";

const Finished = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">Books that you read</h1>
        <button
          onClick={() => navigate("/profile")}
          className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Back to Profile
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-2xl font-serif text-gray-600 max-w-2xl mx-auto">
          Not finished any books yet!
        </p>
        <p className="mt-4 text-gray-500">
          Start Reading
        </p>
      </div>
    </>
  );
};

export default Finished;
