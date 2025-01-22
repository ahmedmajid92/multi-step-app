// Import necessary React utilities:
// - createContext: To create a new context for state management
// - useState: To manage the form state
// - useEffect: To perform side effects such as loading data from storage
import React, { createContext, useState, useEffect } from 'react'; 

// Create a new context 
export const FormContext = createContext(); 

  // Define a provider component that will wrap the app and provide access to the context
export const FormProvider = ({ children }) => { 

    // Initialize the state to store form data.
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
            name: '',            // User's name field.
            email: '',           // User's email field.
            gender: '',          // User's gender selection ('male' or 'female').
            address: '',         // User's address field.
            preferences: [],     // User's selected preferences (stored as an array of strings).
        };
    });

    // Use useEffect to persist formData in localStorage whenever it changes
    useEffect(() => {
        // Save formData to localStorage whenever it changes
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]); // Dependency array: only run this effect when formData changes

    const [currentStep, setCurrentStep] = useState(1);

    // Function to update the form data dynamically based on the provided key and value.
    const updateFormData = (key, value) => {
        
        setFormData((prev) => {
        
        // Reset the `preferences` field to an empty array
        if (key === 'gender' && prev.gender !== value) {
            return { ...prev, gender: value, preferences: [] };
        }

        // For all other updates, spread the existing state and update the specified key with the new value.
        return { ...prev, [key]: value };
        });
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return formData.name.trim() !== '' && formData.email.trim() !== '';
            case 2:
                return formData.gender !== '' && formData.address.trim() !== '';
            default:
                return true;
        }
    };

    const goToStep = (step) => {
        if (step >= 1 && step <= 3) setCurrentStep(step);
    };

    return (
        // `FormContext.Provider` provides access to `formData` (state) and `updateFormData` (updater function).
        <FormContext.Provider value={{ formData, updateFormData, validateStep, currentStep, goToStep }}>
        {children} 
        </FormContext.Provider>
    );
};
