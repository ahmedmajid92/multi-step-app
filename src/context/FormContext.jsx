import React, { createContext, useState, useEffect } from 'react';

// Create a new context
export const FormContext = createContext();

// Define a provider component
export const FormProvider = ({ children }) => {
    // Initialize formData from sessionStorage
    const [formData, setFormData] = useState(() => {
        const savedData = sessionStorage.getItem('formData');
        return savedData
            ? JSON.parse(savedData)
            : {
                fname: '',
                lname: '',
                email: '',
                gender: '',
                address: '',
                country: '',
                city: '',
                region: '',
                company: '',
                preferences: [],
            };
    });

    // Sync formData to sessionStorage on changes
    useEffect(() => {
        sessionStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const updateFormData = (key, value) => {
        setFormData((prev) => {
            // Reset preferences when gender changes
            if (key === 'gender' && prev.gender !== value) {
                return { ...prev, gender: value, preferences: [] };
            }

            return { ...prev, [key]: value };
        });
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return formData.fname.trim() !== '' && formData.email.trim() !== '';
            case 2:
                return (
                    formData.address.trim() !== '' &&
                    formData.country.trim() !== '' &&
                    formData.city.trim() !== '' &&
                    formData.region.trim() !== '' &&
                    formData.company.trim() !== ''
                );
            case 3:
                return true;
            default:
                return true;
        }
    };

    const [currentStep, setCurrentStep] = useState(1);

    const goToStep = (step) => {
        if (step >= 1 && step <= 3) setCurrentStep(step);
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData, validateStep, currentStep, goToStep }}>
            {children}
        </FormContext.Provider>
    );
};
