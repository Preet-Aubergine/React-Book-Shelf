import { RefObject } from 'react';
import Form from "../components/Form";

interface LoginProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  usernameRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
}

interface UserData {
  username: string;
  password: string;
}

const Login = ({ onClose, onLoginSuccess, usernameRef, passwordRef }: LoginProps): JSX.Element => {
  const handleLogin = (formData: UserData): void => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as UserData[];
    
    const userExists = users.some(
      (user) => user.username === formData.username && user.password === formData.password
    );

    if (userExists) {
      onLoginSuccess();
    } else {
      alert("Invalid credentials or user does not exist!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="p-8 bg-white rounded-lg shadow-xl w-96">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Login</h1>
        <Form 
          onSubmit={handleLogin} 
          buttonText="Login" 
          usernameRef={usernameRef}
          passwordRef={passwordRef}
        />
        <button
          onClick={onClose}
          className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Login;
