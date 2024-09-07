import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from "./App.tsx";
import "./index.css";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "@colday/shared/src/queries/base";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </StrictMode>,
)
