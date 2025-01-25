// Import React hooks
import React, { useContext, useState, useEffect } from 'react';

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

    // Track submission status using sessionStorage to persist across page reloads
    const [isSubmitted, setIsSubmitted] = useState(() => {
        const savedStatus = sessionStorage.getItem('isSubmitted');
        return savedStatus === 'true'; // Convert string to boolean
    });

    // Ensure the submit button is disabled after submission
    const [isButtonDisabled, setIsButtonDisabled] = useState(isSubmitted);

    // Update submission state in sessionStorage on change
    useEffect(() => {
        sessionStorage.setItem('isSubmitted', isSubmitted.toString());
    }, [isSubmitted]);

    const handleSubmit = () => {
        setIsSubmitted(true); // Mark as submitted
        setIsButtonDisabled(true); // Disable the submit button
        console.log('Form data submitted:', formData);

        // Optionally, you can add additional logic here for API calls or processing
    };

    const handleBack = () => navigate('/step2'); // Navigate to Step 2

    return (
        <div className="h-screen justify-center items-center text-center p-6 bg-stone-100">
        <div className="mb-20">
            <ProgressBar step={3} />
        </div>

        {!isSubmitted ? (
            <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-10">Step 3: Review and Submit</h2>

            {/* Basic Information */}
            <div className="mb-4 w-96 text-center">
                <h3 className="font-bold">Basic Information</h3>
                <p>
                <strong>First Name:</strong> {formData.fname}
                </p>
                <p>
                <strong>Last Name:</strong> {formData.lname}
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
                <p>
                <strong>Country:</strong> {formData.country}
                </p>
                <p>
                <strong>City:</strong> {formData.city}
                </p>
                <p>
                <strong>Region:</strong> {formData.region}
                </p>
                <p>
                <strong>Company:</strong> {formData.company}
                </p>
                <h4 className="font-bold mt-4">Preferences:</h4>
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
                disabled={isButtonDisabled} // Disable the button if already submitted
                className={`px-4 py-2 rounded ${
                    isButtonDisabled
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:text-stone-600 hover:bg-green-400'
                }`}
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
