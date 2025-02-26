import { FC, useState } from 'react';

interface CardProps {
  name: string;
  img?: string;  // Make optional since imageLinks might be undefined
  auth?: string; // Make optional since authors might be undefined
  desc?: string; // Add description prop as optional
}

const Card: FC<CardProps> = ({ name, img, auth, desc }) => {
  const [showDescription, setShowDescription] = useState(false);

  function getFirstTwoSentences(text:string) {
    const match = text.match(/[^.!?]+[.!?]\s*/g); // Match sentences
    return match ? match.slice(0, 2).join(' ') : text; // Return first two or full text
  }

  return (
    <>
      <div className="relative flex flex-col my-6 mx-6 bg-white shadow-sm border border-slate-200 rounded-lg w-56 items-center">
        <div className="relative h-40 w-30 m-2.5 overflow-hidden text-white rounded-md">
          <img src={img} alt="card-image" />
        </div>
        <div className="p-4 w-55">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold text-center">
            {name}
          </h6>
          <p className="text-slate-600 leading-normal font-light text-center">
            {auth}
          </p>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2 text-center w-55">
          <button
            onClick={() => setShowDescription(true)}
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Read more
          </button>
        </div>
      </div>

      {/* Floating Description Modal */}
      {showDescription && (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-3xl flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 relative border-2">
            <button
              onClick={() => setShowDescription(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
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
            <div className="flex gap-6">
              <img src={img} alt={name} className="w-48 h-auto rounded-lg" />
              <div>
                <h2 className="text-2xl font-bold mb-2">{name}</h2>
                <p className="text-gray-600 mb-4">By {auth}</p>
                <p className="text-gray-700">
                  {getFirstTwoSentences(desc)}  
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
