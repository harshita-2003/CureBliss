import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import {PrivyProvider} from '@privy-io/react-auth';
import { StateContextProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <PrivyProvider
      appId="cm7op8r6c01czy81x2i6801wu"
      config={{
        // Display email and wallet as login methods
        loginMethods: ['email', 'wallet'],
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'dark',
          logo: 'https://th.bing.com/th/id/OIP.9Le_FI9SlKvpPTXECQP3UgHaHa?rs=1&pid=ImgDetMain',
        },
      }}
    >
        <Router>
          <StateContextProvider>
            <App />
          </StateContextProvider>
        </Router>
    </PrivyProvider>
)