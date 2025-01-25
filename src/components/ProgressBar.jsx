import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';

const ProgressBar = ({ step }) => {
    const navigate = useNavigate();
    const { formData, validateStep } = useContext(FormContext);

    // Handle navigation when a step button is clicked
    const handleStepClick = (stepNumber) => {
        // Validate the current step before navigating
        if (stepNumber <= step || validateStep(step)) {
        navigate(`/step${stepNumber}`);
        }
    };

    return (
        <div className="relative w-full bg-gray-200 h-4 rounded-full">
        {/* Progress Bar */}
        <div
            className="absolute top-0 left-0 h-4 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
        ></div>

        {/* Step Buttons */}
        <div className="absolute w-full flex justify-between items-center">
            {[1, 2, 3].map((stepNumber) => (
            <button
                key={stepNumber}
                className={`w-12 h-12 rounded-full text-white font-bold flex items-center justify-center transition-all duration-300 hover:bg-blue-300 hover:text-stone-800 ${
                stepNumber <= step
                    ? 'bg-blue-500'
                    : 'bg-gray-400'
                }`}
                style={{
                transform: stepNumber === 1 ? 'translateX(200px)' : stepNumber === 3 ? 'translateX(-200px)' : 'none',
                position: 'relative',
                top: '-16px', // To make buttons appear larger than the progress bar
                }}
                onClick={() => handleStepClick(stepNumber)}
            >
                {stepNumber}
            </button>
            ))}
        </div>
        </div>
    );
};

export default ProgressBar;
