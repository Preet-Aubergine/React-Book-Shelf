import { FormEvent, RefObject } from 'react';

interface FormProps {
  onSubmit: (data: { username: string; password: string }) => void;
  buttonText: string;
  usernameRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
}

const Form = ({ onSubmit, buttonText, usernameRef, passwordRef }: FormProps): JSX.Element => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      onSubmit({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-gray-700">Username: </label>
        <input
          id="username"
          type="text"
          ref={usernameRef}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-gray-700">Password: </label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
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
    </form>
  );
};

export default Form;
