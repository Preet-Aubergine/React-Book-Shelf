import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const Register = (): JSX.Element => {
  const navigate = useNavigate();

  const handleRegister = (formData: { username: string; password: string }): void => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const userExists = users.some(
      (user: { username: string; password: string }) => 
        user.username === formData.username || 
        user.password === formData.password
    );

    if (userExists) {
      alert("User already exists!");
    } else {
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      navigate('/login');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="p-8 bg-white rounded-lg shadow-xl w-96">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Register</h1>
        <Form 
          onSubmit={handleRegister}
          buttonText="Register"
        />
      </div>
    </div>
  );
};

export default Register;
