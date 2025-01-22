// Import React hooks
import React, { useContext, useEffect } from 'react';

// Import `useNavigate` from React Router for programmatic navigation.
import { useNavigate } from 'react-router-dom';

// Import `FormContext` to access and update the global form state.
import { FormContext } from '../context/FormContext';

// Import the `ProgressBar` component to display the step progress.
import ProgressBar from './ProgressBar';

const Step2 = () => {
    // Destructure `formData` (global form state) and `updateFormData` (function to update state) from `FormContext`.
    const { formData, updateFormData } = useContext(FormContext);

    // Initialize the `navigate` function for programmatic routing.
    const navigate = useNavigate();

    // Determine if the "Next" button should be disabled. It depends only on the address field.
    const isNextDisabled = !formData.address;

    const handleNext = () => {
        navigate('/step3'); // Navigate to Step 3.
    };

    const handleBack = () => navigate('/step1');
    // Navigate back to Step 1 when the "Back" button is clicked.

    // Handle checkbox state for preferences.
    const handlePreferenceChange = (preference) => {
        const updatedPreferences = formData.preferences.includes(preference)
        ? formData.preferences.filter((p) => p !== preference)  // Remove the preference if it is already selected.
        : [...formData.preferences, preference];   // Add the preference if it is not selected.
        
        // Update the preferences in the global `formData` state.
        updateFormData('preferences', updatedPreferences);
    };

    const preferencesList =
        formData.gender === 'male'
        ? ['Science', 'Sports', 'Business', 'Cars']
        : ['Arts', 'Travel', 'Shopping', 'Food'];  // Dynamically generate the preferences list based on the user's gender. 

    return (
        <div className="h-screen justify-center items-center text-center p-6 bg-slate-200">
        
        <div className="mb-20">
            <ProgressBar step={2} /> 
        </div>

        <h2 className="text-2xl font-bold mb-4">Step 2: Additional Information</h2>

        <form className="flex flex-col items-center justify-center">

            {/* Address Field */}
            <div className="mb-4 w-96 text-left">
            <label className="block text-sm font-medium mb-2 ml-2">Address</label>
            <input
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your address"
            />
            </div>

            {/* Preferences Field */}
            <div className="mb-4 w-96 text-left">
            <label className="block text-sm font-medium mb-2 ml-2">Preferences</label>
            <div className="flex flex-col space-y-2">
                {preferencesList.map((preference) => (
                <label key={preference} className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    checked={formData.preferences.includes(preference)}
                    onChange={() => handlePreferenceChange(preference)}
                    className="accent-blue-500"
                    />
                    <span>{preference}</span>
                </label>
                ))}
            </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4">
            <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:text-stone-800 hover:bg-slate-400"
            >
                Back
            </button>
            {/* "Back" button navigates to Step 1. */}

            <button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`px-4 py-2 rounded ${
                isNextDisabled
                    ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-700 hover:text-stone-400'
                }`}
            >
                Next
            </button>
            {/* "Next" button navigates to Step 3 if the address field is filled. */}
            </div>
        </form>
        </div>
    );
};

export default Step2;
