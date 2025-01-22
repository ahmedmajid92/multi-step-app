// Import React hooks:
// - useContext: To access shared state from the context.
// - useState: To manage local state for the email validation error.
import React, { useContext, useState } from 'react';

// Import the `useNavigate` for programmatic navigation.
import { useNavigate } from 'react-router-dom';

// Import `FormContext` to access and update the global form state.
import { FormContext } from '../context/FormContext';

// Import the `ProgressBar` component to display the step progress.
import ProgressBar from './ProgressBar'; 

const Step1 = () => {
    // Destructure `formData` (global form state) and `updateFormData` (function to update the state) from `FormContext`.
    const { formData, updateFormData } = useContext(FormContext);

    // Initialize the `navigate` function to transition between routes.
    const navigate = useNavigate();

    // Declare a local state variable `emailError` to store validation errors for the email field.
    const [emailError, setEmailError] = useState('');

    // Determine if the "Next" button should be disabled, if any required field is empty.
    const isNextDisabled = !formData.name || !formData.email || !formData.gender;

    // Handle the "Next" button click event.
    const handleNext = () => {
        if (!formData.name || !formData.email || !formData.gender) {
            alert('Please fill in all fields.'); // Alert the user if required fields are missing.
            return;
        }
        if (!validateEmail(formData.email)) {
            // Validate the email format using the `validateEmail` function.
            setEmailError('Please enter a valid email address.');
            return; // Stop navigation if the email is invalid.
        }
        setEmailError(''); // Clear any existing email error.
        navigate('/step2'); // Navigate to Step 2.
    };

    const validateEmail = (email) => {
        // Validate the email format using a regular expression.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(email); // Return true if the email matches the regex.
    };

    return (
        <div className="h-screen justify-center items-center text-center p-6 bg-slate-200">
        <div className="mb-20">
            <ProgressBar step={1} /> {/* ProgressBar */}
        </div>
        <h2 className="text-2xl font-bold mb-4">Step 1: Basic Information</h2>
        <form className="flex flex-col items-center justify-center">
            {/* Name Field */}
            <div className="mb-4 w-96 text-left">
            <label className="block text-base font-medium mb-2 ml-2">Name</label>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your name"
            />
            </div>

            {/* Email Field */}
            <div className="mb-4 w-96 text-left">
            <label className="block text-base font-medium mb-2 ml-2">Email</label>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your email"
            />
            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            </div>

            {/* Gender Field */}
            <div className="mb-4 w-96 text-left">
            <label className="block text-base font-medium mb-2 ml-2">Gender</label>
            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={(e) => updateFormData('gender', e.target.value)}
                    className="accent-blue-500"
                />
                <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={(e) => updateFormData('gender', e.target.value)}
                    className="accent-pink-500"
                />
                <span>Female</span>
                </label>
            </div>
            </div>

            {/* Next Button */}
            <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled} // Dynamically disable button
            className={`px-4 py-2 rounded ${
                isNextDisabled
                ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-700 hover:text-stone-400'
            }`}
            >
            Next
            </button>
        </form>
        </div>
    );
};

export default Step1;