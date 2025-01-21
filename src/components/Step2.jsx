import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import ProgressBar from './ProgressBar'; // Import ProgressBar

const Step2 = () => {
    const { formData, updateFormData } = useContext(FormContext);
    const navigate = useNavigate();
    const [preferencesList, setPreferencesList] = useState([]);

    // Update preferences list based on gender
    useEffect(() => {
        if (formData.gender === 'male') {
        setPreferencesList(['Science', 'Sports', 'Business', 'Cars']);
        } else if (formData.gender === 'female') {
        setPreferencesList(['Arts', 'Travel', 'Shopping', 'Food']);
        }
    }, [formData.gender]);

    const handleNext = () => {
        if (!formData.address || !formData.preferences || formData.preferences.length === 0) {
        alert('Please fill in all fields and select at least one preference.');
        return;
        }
        navigate('/step3');
    };

    const handleBack = () => navigate('/step1');

    const handlePreferenceChange = (preference) => {
        const updatedPreferences = formData.preferences.includes(preference)
        ? formData.preferences.filter((p) => p !== preference) // Remove if already selected
        : [...formData.preferences, preference]; // Add if not selected
        updateFormData('preferences', updatedPreferences);
    };

    return (
        <div className="h-screen justify-center items-center text-center p-6 bg-slate-200">
        <div className="mb-20">
            <ProgressBar step={2} /> {/* ProgressBar */}
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
            <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-stone-400"
            >
                Next
            </button>
            </div>
        </form>
        </div>
    );
};

export default Step2;
