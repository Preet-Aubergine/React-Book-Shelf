import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const handleLogin = (formData: { username: string; password: string }): void => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const userExists = users.some(
      (user: { username: string; password: string }) => 
        user.username === formData.username && 
        user.password === formData.password
    );

    if (userExists) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUser', formData.username);
      navigate('/search');
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
        />
      </div>
    </div>
  );
};

export default Login;
