import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import ProgressBar from './ProgressBar'; // Import ProgressBar

const Step3 = () => {
    const { formData } = useContext(FormContext);
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        setIsSubmitted(true);
        console.log('Form Data:', formData);
        setTimeout(() => {
        navigate('/step1'); // Redirect after submission
        }, 3000);
    };

    const handleBack = () => navigate('/step2');

    return (
        <div className="h-screen justify-center items-center text-center p-6 bg-slate-200">
        <div className="mb-20">
            <ProgressBar step={3} /> {/* ProgressBar */}
        </div>
        {!isSubmitted ? (
            <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-10">Step 3: Review and Submit</h2>

            {/* Basic Information */}
            <div className="mb-4 w-96 text-center">
                <h3 className="font-bold">Basic Information</h3>
                <p>
                <strong>Name:</strong> {formData.name}
                </p>
                <p>
                <strong>Email:</strong> {formData.email}
                </p>
                <p>
                <strong>Gender:</strong> {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}
                </p>
            </div>

            {/* Additional Information */}
            <div className="mb-4 w-96 text-center">
                <h3 className="font-bold">Additional Information</h3>
                <p>
                <strong>Address:</strong> {formData.address}
                </p>
                <h4 className="font-bold">Preferences:</h4>
                <ul className="list-disc list-inside">
                {formData.preferences.map((preference, index) => (
                    <li key={index}>{preference}</li>
                ))}
                </ul>
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
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:text-stone-600 hover:bg-green-400"
                >
                Submit
                </button>
            </div>
            </div>
        ) : (
            <div className="text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">Thank you!</h2>
            <p>Your data has been submitted successfully.</p>
            </div>
        )}
        </div>
    );
};

export default Step3;
