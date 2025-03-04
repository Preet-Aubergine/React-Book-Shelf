import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormProps {
  onSubmit: (data: { username: string; password: string }) => void;
  buttonText: string;
}

const Form = ({ onSubmit, buttonText }: FormProps): JSX.Element => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-gray-700">
          Username:{" "}
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-gray-700">
          Password:{" "}
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {buttonText}
        </button>
      </div>
      <div>
        <button
          className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default Form;
