// Import React hooks
import React, { useContext, useState } from 'react';

// Import the `useNavigate` hook from React Router for programmatic navigation.
import { useNavigate } from 'react-router-dom';

// Import `FormContext` to access global form state.
import { FormContext } from '../context/FormContext';

// Import the `ProgressBar` component to display the step progress.
import ProgressBar from './ProgressBar'; 

const Step3 = () => {
    // Destructure `formData` from `FormContext` to access the submitted form data.
    const { formData } = useContext(FormContext);

    // Initialize the `navigate` function for routing.
    const navigate = useNavigate();
    
    // Local state to track if the form has been submitted.
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle the form submission.
    const handleSubmit = () => {
        setIsSubmitted(true); 

        // console.log('Form Data:', formData);        

        setTimeout(() => {
            navigate('/step1'); 
            // Redirect back to Step 1 after 2 seconds.
        }, 2000);
    };

    // Helper function to reset form data
    const resetFormData = () => {
        updateFormData('name', '');
        updateFormData('email', '');
        updateFormData('gender', '');
        updateFormData('address', '');
        updateFormData('preferences', []);
    };

    // Navigate back to Step 2 when the "Back" button is clicked.
    const handleBack = () => navigate('/step2');
    
    return (
        <div className="h-screen justify-center items-center text-center p-6 bg-slate-200">

        <div className="mb-20">
            <ProgressBar step={3} /> 
        </div>

        {!isSubmitted ? (
            // Render the review screen if the form has not been submitted.
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
            // Render the thank-you message after the form has been submitted.
            <div className="text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">Thank you!</h2>
            <p>Your data has been submitted successfully.</p>
            </div>
        )}
        </div>
    );
};

export default Step3;
