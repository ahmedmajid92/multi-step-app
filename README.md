# Multi-Step Form Application

This is a multi-step form application built with React, Vite, Tailwind CSS, and React Router. It demonstrates complex state management using Context API, routing between steps, form validation, and dynamic data handling.
---

### Folder Structure

multi-step-form
├── src
│   ├── components
│   │   ├── ProgressBar.jsx
│   │   ├── Step1.jsx
│   │   ├── Step2.jsx
│   │   ├── Step3.jsx
│   ├── context
│   │   └── FormContext.jsx
│   ├── routes
│   │   └── AppRoutes.jsx
│   ├── styles
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── public
│   └── index.html
├── .gitignore
├── package.json
└── README.md

### State Management
The application uses the **Context API** to manage shared state across steps. The `FormContext` provides a global `formData` object and an `updateFormData` function to update the state dynamically.
This approach was chosen for simplicity and avoids the overhead of Redux for a small-scale application.

### Routing
Routing is handled by **React Router**, with each step mapped to a specific route:
- `/step1`: Collects basic user information.
- `/step2`: Collects additional information based on user choices.
- `/step3`: Displays a summary of the form data for review and submission.

---

## Implementation Details

### Why Context API?
- **Simplicity:** The Context API is a lightweight solution that avoids the complexity of Redux for this small application.
- **Trade-offs:** While Context API is sufficient for this use case, it may not scale well for larger applications with more complex state logic.

### Interesting Decisions and Trade-offs
1. **Dynamic Preferences:** Preferences in Step 2 are rendered dynamically based on the gender selected in Step 1. This required resetting preferences whenever the gender changes.
2. **Form Validation:** Added real-time email validation in Step 1 to enhance UX. This ensures the user cannot proceed with an invalid email.
3. **Progress Bar:** A progress bar visually indicates the user's position in the multi-step flow, improving navigation clarity.

### Extra Features
- **Dynamic Data Handling:** Gender-specific preferences dynamically adjust based on the user’s choice.
- **Validation:** Ensures all fields are correctly filled before proceeding to the next step.
- **Responsive Design:** Fully responsive design using Tailwind CSS.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/multi-step-form.git
   cd multi-step-form
   npm install
   npm run dev

Ahmed Majid Ahmed
