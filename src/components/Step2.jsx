// Import React hooks
import React, { useContext } from 'react';

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

    // Determine if the "Next" button should be disabled.
    const isNextDisabled =
        !formData.address ||
        !formData.country ||
        !formData.city ||
        !formData.region ||
        !formData.company;

    const handleNext = () => navigate('/step3');
    const handleBack = () => navigate('/step1');

    // Handle checkbox state for preferences.
    const handlePreferenceChange = (preference) => {
        const updatedPreferences = formData.preferences.includes(preference)
        ? formData.preferences.filter((p) => p !== preference)
        : [...formData.preferences, preference];
        updateFormData('preferences', updatedPreferences);
    };

    const preferencesList =
        formData.gender === 'male'
        ? ['Science', 'Sports', 'Business', 'Cars']
        : ['Arts', 'Travel', 'Shopping', 'Food'];

    return (
        <div className="h-screen justify-center items-center text-center p-6 bg-stone-100">
        <div className="mb-20">
            <ProgressBar step={2} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Step 2: Additional Information</h2>
        <div className="flex items-center justify-center">
            <form className="flex flex-wrap items-center justify-center w-96 pr-6 pl-6 py-10 bg-slate-500 rounded">
            {/* Address Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Address</label>
                <input
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your address"
                />
            </div>

            {/* Country Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Country</label>
                <input
                type="text"
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your country"
                />
            </div>

            {/* City Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">City</label>
                <input
                type="text"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your city"
                />
            </div>

            {/* Region Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Region</label>
                <input
                type="text"
                value={formData.region}
                onChange={(e) => updateFormData('region', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your region"
                />
            </div>

            {/* Company/Organization Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Company/Organization</label>
                <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter your company/organization"
                />
            </div>

            {/* Preferences Field */}
            <div className="mb-4 w-96 text-left">
                <label className="block text-base font-medium mb-2 ml-2 text-gray-100">Preferences</label>
                <div className="grid grid-cols-2 gap-4 items-center">
                    {preferencesList.map((preference) => (
                        <label key={preference} className="flex items-center space-x-2 text-gray-100">
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
                className="bg-gray-300 text-grey-700 px-4 py-2 rounded hover:text-stone-800 hover:bg-slate-400"
                >
                Back
                </button>
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
            </div>
            </form>
        </div>
        </div>
    );
};

export default Step2;
