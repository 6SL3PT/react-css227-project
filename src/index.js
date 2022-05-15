import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import store from './redux/store'
import reportWebVitals from './reportWebVitals'
import App from './App'
import './global.css'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    closeButton={false}
                    theme="colored"
                    icon={false}
                />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)

reportWebVitals()
