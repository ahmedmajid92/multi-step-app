// Import React to create the component and handle the rendering.
import React from 'react'; 

// Import necessary components from React Router:
// - Router: Wraps the entire app and enables routing.
// - Route: Defines the mapping between a URL path and the component that should be rendered.
// - Routes: Groups all Route components for routing.
// - Navigate: Used to redirect users programmatically to a specific route.
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 

// Import Steps components to be displayed when the user visits "/step*".
import Step1 from '../components/Step1'; 
import Step2 from '../components/Step2'; 
import Step3 from '../components/Step3'; 

// Import the ProtectedRoute component to protect access to certain routes based on form completion.
import ProtectedRoute from '../routes/ProtectedRoute'; 

const AppRoutes = () => {
    return (
        <Router> 
            {/* The Router component wraps the app and enables the use of routing functionality */}
            
            <Routes> 
                {/* The Routes component groups all Route definitions */}

                {/* Route for Step 1 */}
                <Route path="/step1" element={<Step1 />} /> 
                {/* Step 1 is publicly accessible, so no restrictions are applied here */}

                {/* Route for Step 2 with Protection */}
                <Route 
                    path="/step2" 
                    element={
                        <ProtectedRoute step={2}> {/* Protect Step 2 */}
                            <Step2 /> {/* Render Step2 if protection allows */}
                        </ProtectedRoute>
                    } 
                />

                {/* Route for Step 3 with Protection */}
                <Route 
                    path="/step3" 
                    element={
                        <ProtectedRoute step={3}> {/* Protect Step 3 */}
                            <Step3 /> {/* Render Step3 if protection allows */}
                        </ProtectedRoute>
                    } 
                />

                {/* Route for the root path, redirecting to Step 1 */}
                <Route path="/" element={<Navigate to="/step1" />} /> 
                {/* If a user visits the root path, redirect them to Step 1 */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
