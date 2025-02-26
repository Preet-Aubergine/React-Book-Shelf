import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [modal, setModal] = useState("none");
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    navigate("/search");
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden-animate");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80')] bg-cover bg-center bg-fixed">
        <div className="flex flex-col items-center justify-center min-h-screen backdrop-blur-sm">
          <div className="w-full max-w-4xl p-8 space-y-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src="./books.svg"
                  alt=""
                  className="h-12 w-12 animate-bounce"
                />
                <h1 className="text-4xl font-bold text-indigo-600">
                  BookShelf
                </h1>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setModal("login")}
                  className="px-6 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Login
                </button>
                <button
                  onClick={() => setModal("register")}
                  className="px-6 py-2 text-indigo-500 bg-white border-2 border-indigo-500 rounded-lg hover:bg-indigo-50 transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Register
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-800 hidden-animate">
                  Discover Your Next Favorite Book
                </h2>
                <p className="text-gray-600 hidden-animate">
                  Join our community of book lovers. Find, share, and discuss
                  your favorite books with like-minded readers.
                </p>
                <button
                  className="px-8 py-3 text-lg text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 transform hover:scale-105 transition duration-300 ease-in-out hidden-animate"
                  disabled
                >
                  Get Started
                </button>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://picsum.photos/600/400"
                  alt="Books"
                  className="rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal === "login" && (
        <Login
          onClose={() => setModal("none")}
          onLoginSuccess={handleLoginSuccess}
          usernameRef={username}
          passwordRef={password}
        />
      )}
      {modal === "register" && (
        <Register
          onClose={() => setModal("none")}
          usernameRef={username}
          passwordRef={password}
        />
      )}
    </div>
  );
}

export default App;
