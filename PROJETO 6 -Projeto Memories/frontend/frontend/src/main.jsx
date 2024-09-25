import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

// Pages
import Home from './routes/Home.jsx';
import AddMemory from './routes/AddMemory.jsx';
import Memory from './routes/Memory.jsx';
import { SearchProvider } from './context/SearchContext.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-memory",
        element: <AddMemory />,
      },
      {
        path: "/memories/:id",
        element: <Memory />,
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </StrictMode>,
)
