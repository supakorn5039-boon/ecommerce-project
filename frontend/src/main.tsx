import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ToastifyContainer } from './components/Toast/Toast';
import store from './store/index';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ToastifyContainer />
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </Provider>
        </Suspense>
    </React.StrictMode>
);
