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

    // Declare a local state variable `emailError`. phoneError, and birthdayError to store validation errors for the fields.
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');

    // Determine if the "Next" button should be disabled, if any required field is empty.
    const isNextDisabled =
        !formData.fname ||
        !formData.lname ||
        !formData.email ||
        !formData.phone ||
        !formData.birthday ||
        !formData.gender ||
        !!birthdayError;

    // Handle the "Next" button click event.
    const handleNext = () => {
        console.log('Next button clicked'); // Debugging log
        console.log('isNextDisabled:', isNextDisabled); // Debugging log

        if (isNextDisabled) {
        alert('Please fill in all fields.');
        return;
        }

        if (!validateEmail(formData.email)) {
        setEmailError('Please enter a valid email address.');
        return;
        }
        setEmailError('');

        if (!validatePhone(formData.phone)) {
        setPhoneError('Please enter a valid phone number.');
        return;
        }
        setPhoneError('');

        if (!validateBirthday(formData.birthday)) {
        setBirthdayError('You are underage.');
        return;
        }
        setBirthdayError('');

        console.log('Navigating to Step 2'); // Debugging log
        navigate('/step2'); // Navigate to Step 2
    };

    const validateEmail = (email) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        console.log('validateEmail:', email, isValid); // Debugging log
        return isValid;
    };

    const validatePhone = (phone) => {
        const isValid = /^\+?[0-9]{10,15}$/.test(phone);
        console.log('validatePhone:', phone, isValid); // Debugging log
        return isValid;
    };

    const validateBirthday = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        const age = today.getUTCFullYear() - birthDate.getUTCFullYear();
        const isOldEnough = age > 16 || (age === 16 && today >= new Date(birthDate.setUTCFullYear(today.getUTCFullYear())));
        console.log('validateBirthday:', birthday, isOldEnough); // Debugging log
        return isOldEnough;
    };

    const handleBirthdayChange = (date) => {
        updateFormData('birthday', date);
        if (!validateBirthday(date)) {
        setBirthdayError('You are underage.');
        } else {
        setBirthdayError('');
        }
    };

    return (
        <div className="h-screen justify-center items-center text-center p-6 bg-stone-100">
        <div className="mb-20">
            <ProgressBar step={1} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Step 1: Basic Information</h2>
        <div className="flex items-center justify-center">
            <form className="flex flex-wrap items-center justify-center w-96 pr-6 pl-6 py-10 bg-slate-500 rounded">
            {/* First Name Field */}
            <div className="mb-4 w-2/5 text-left inline-block mr-8">
                <label className="flex text-base font-medium mb-2 ml-2 text-gray-100">First Name</label>
                <input
                type="text"
                value={formData.fname}
                onChange={(e) => updateFormData('fname', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Ex: Ahmed"
                />
            </div>
            {/* Last Name Field */}
            <div className="mb-4 w-2/5 text-left inline-block ml-8">
                <label className="flex text-base font-medium mb-2 ml-2 text-gray-100">Last Name</label>
                <input
                type="text"
                value={formData.lname}
                onChange={(e) => updateFormData('lname', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Ex: Al-Saadi"
                />
            </div>
            <div className="basis-full"></div>
            {/* Email Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Email</label>
                <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your email"
                />
                {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            </div>
            <div className="basis-full"></div>
            {/* Phone Number Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Phone Number</label>
                <input
                type="text"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your phone number"
                />
                {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
            </div>
            <div className="basis-full"></div>
            {/* Birthday Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Birthday</label>
                <input
                type="date"
                value={formData.birthday}
                onChange={(e) => handleBirthdayChange(e.target.value)}
                className="border rounded p-2 w-full"
                />
                {birthdayError && <p className="text-red-500 text-sm mt-2">{birthdayError}</p>}
            </div>
            <div className="basis-full"></div>
            {/* Gender Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Gender</label>
                <select
                value={formData.gender}
                onChange={(e) => updateFormData('gender', e.target.value)}
                className="border rounded p-2 w-full"
                >
                <option value="" disabled>
                    Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            </div>
            <div className="basis-full"></div>
            {/* Next Button */}
            <button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`px-4 py-2 rounded ${
                isNextDisabled
                    ? 'bg-gray-300 text-gray-800 cursor-not-allowed'
                    : 'bg-stone-900 text-white hover:bg-stone-700 hover:text-stone-400'
                }`}
            >
                Next
            </button>
            </form>
        </div>
        </div>
    );
};

export default Step1;
