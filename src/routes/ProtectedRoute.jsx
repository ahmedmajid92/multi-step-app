import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';

const ProtectedRoute = ({ children, step }) => {
    const { formData } = useContext(FormContext);

    // Validation logic for each step
    const isStepValid = () => {
        // Step 1: Always accessible
        if (step === 1) return true;

        // Step 2: Require all Step 1 fields to be filled
        if (step === 2) {
        return (
            formData.fname &&
            formData.lname &&
            formData.email &&
            formData.phone &&
            formData.birthday &&
            formData.gender
        );
        }

        // Step 3: Require Step 1 and Step 2 fields to be filled
        if (step === 3) {
        return (
            formData.fname &&
            formData.lname &&
            formData.email &&
            formData.phone &&
            formData.birthday &&
            formData.gender &&
            formData.address &&
            formData.preferences.length > 0
        );
        }

        // Deny access to any unknown steps
        return false;
    };

    // Redirect to the appropriate step if the current step is invalid
    if (!isStepValid()) {
        // Redirect to the last valid step
        if (step === 2) return <Navigate to="/step1" replace />;
        if (step === 3) return <Navigate to="/step2" replace />;
    }

    // Render the child components if the current step is valid
    return children;
};

export default ProtectedRoute;
