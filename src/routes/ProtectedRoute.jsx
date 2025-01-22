// Import React and the `useContext` hook to access the global state from the context.
import React, { useContext } from 'react'; 

// Import `Navigate` to programmatically redirect users if they attempt to access restricted routes.
import { Navigate } from 'react-router-dom'; 

// Import the `FormContext` to check the current state of form data.
import { FormContext } from '../context/FormContext'; 

const ProtectedRoute = ({ children, step }) => {
    // `children` refers to the component(s) rendered if access is allowed.
    // `step` specifies the current step of the form, used to determine access.

    // Access the `formData` from the global context to check which fields are filled.
    const { formData } = useContext(FormContext);

    // A helper function to validate whether the required fields for a step are filled.
    const isStepValid = () => {

        // Step 1 is always accessible, so it returns true without checking form data.
        if (step === 1) return true; 
        
        // Step 2 is accessible only if `name`, `email`, and `gender` are filled.
        if (step === 2) return formData.name && formData.email && formData.gender; 
        
        // Step 3 is accessible only if `name`, `email`, `gender`, and `address` are filled.
        if (step === 3) return formData.name && formData.email && formData.gender && formData.address; 
        
        // For any other step, access is denied by default.
        return false; 
        
    };

    // If the current step is valid, render the child components, Otherwise, redirect the user to Step 1.
    return isStepValid() ? children : <Navigate to="/step1" />;
    
};

export default ProtectedRoute; 
