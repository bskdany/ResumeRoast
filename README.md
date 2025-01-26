# Resume Wrecker Web App

The **Resume Wrecker Web App** is a user-friendly frontend interface designed to interact with the **Resume Wrecker API**. This web application allows users to upload their resumes, specify their job title, and select their desired feedback intensity (tolerance level). The app then communicates with the backend API to generate humorous and constructive feedback in the form of an audio "roast" of the resume.

The web app is built using **React**, **TypeScript**, and **Vite**, ensuring a modern, fast, and type-safe development experience. It is designed to be intuitive and responsive, providing a seamless user experience across devices.

## Key Features

1. **Resume Upload**:
   - Users can upload their resumes in PDF format.
   - The app validates the file type and size to ensure compatibility.

2. **Job Title Input**:
   - Users can specify their job title to tailor the feedback to their desired role.

3. **Tolerance Level Slider**:
   - Users can select the intensity of the feedback using a slider, ranging from **Constructive Criticism** to **Full Roast**.

4. **Audio Feedback**:
   - The app communicates with the backend API to generate audio feedback based on the resume content, job title, and tolerance level.
   - The feedback is delivered as an audio file, which users can listen to directly in the app.

5. **Responsive Design**:
   - The app is fully responsive, ensuring a smooth experience on both desktop and mobile devices.

6. **Error Handling**:
   - The app provides clear error messages for invalid inputs, such as missing fields or unsupported file types.

7. **React Router Integration**:
   - The app uses **React Router** for seamless navigation between pages, such as the form submission page and the Luigi avatar page.

8. **Avatar Page**:
   - A fun and interactive page featuring a drill seargent that dynamically reacts to the audio feedback.

---

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript for improved developer productivity and code quality.
- **Vite**: A fast build tool for modern web development.
- **React Router**: A library for declarative routing in React applications.
- **CSS Modules**: For scoped and modular styling of components.
- **Azure Static Web Apps**: For hosting the application.

---

## How It Works

1. **User Input**:
   - The user fills out the form with their name, job title, and tolerance level, and uploads their resume.

2. **Form Submission**:
   - The app sends the form data to the **Resume Wrecker API** using a `POST` request.

3. **Feedback Generation**:
   - The API processes the resume and generates feedback using OpenAI's GPT model.
   - The feedback is converted into speech using Azure Cognitive Services.

4. **Audio Playback**:
   - The app retrieves the generated audio file and plays it back to the user.

5. **Avatar Interaction**:
   - On the avatar page, a drill seargent's image dynamically changes in sync with the audio feedback, creating an engaging and humorous experience.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (optional, for containerized development)
- Azure account (optional, for deployment)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/resumeroast.git
   cd resumeroast
   ```
2. **Install dependencies**
```bash
npm install
# or
yarn install
```
3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```
4. **Open Application**
The application will be available at `http://localhost:5173`.

---

## Deployment

### Azure Static Web Apps

This project is configured for deployment to Azure Static Web Apps using GitHub Actions.

1. **Set up Azure Static Web App**:
    - Create a Static Web App in the Azure portal.
    - Obtain the deployment token and add it as a secret (`AZURE_STATIC_WEB_APPS_API_TOKEN`) in your GitHub repository.

2. **Push changes to the main branch**:
    - The GitHub Actions workflow will automatically build and deploy the application to Azure.

