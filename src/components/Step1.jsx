import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import ProgressBar from './ProgressBar'; // Import ProgressBar

const Step1 = () => {
    const { formData, updateFormData } = useContext(FormContext);
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');

    const handleNext = () => {
        if (!formData.name || !formData.email || !formData.gender) {
        alert('Please fill in all fields.');
        return;
        }
        if (!validateEmail(formData.email)) {
        setEmailError('Please enter a valid email address.');
        return;
        }
        setEmailError('');
        navigate('/step2');
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return emailRegex.test(email);
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-stone-400"
            >
            Next
            </button>
        </form>
        </div>
    );
};

export default Step1;
