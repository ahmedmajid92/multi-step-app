import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '', // Added gender field
        address: '',
        preferences: [], // Changed preferences to an array for checkbox selections
    });

    const updateFormData = (key, value) => {
        setFormData((prev) => {
            // Clear preferences if the gender changes
            if (key === 'gender' && prev.gender !== value) {
                return { ...prev, gender: value, preferences: [] };
            }
            return { ...prev, [key]: value };
        });
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
        {children}
        </FormContext.Provider>
    );
};
