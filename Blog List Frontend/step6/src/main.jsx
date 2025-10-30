import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Check to ensure the root element exists before trying to create a root
const container = document.getElementById('root');

if (container) {
  // Create a root for the React application using the container element
  ReactDOM.createRoot(container).render(
    // Render the main App component inside the root
    <App />
  )
} else {
  // Log an error if the root element is missing, though this shouldn't happen 
  // with the provided index.html
  console.error('Failed to find the root element in index.html with id="root".')
}
