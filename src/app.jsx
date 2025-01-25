import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { FormProvider } from './context/FormContext';

const App = () => {
  return (
    <FormProvider>
      <div class="bg-stone-100 flex items-center justify-center py-6">
        <h1 class="text-4xl font-bold">React Multi-Step Application</h1>
      </div>
      <AppRoutes />
    </FormProvider>
  );
};

export default App;
