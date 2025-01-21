import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';

const AppRoutes = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/step1" />} />
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />
        </Routes>
        </Router>
    );
};

export default AppRoutes;
