import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import Style from './style.module.scss';

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className={Style['style']}>Le App</div>
        </QueryClientProvider>
    );
};

export default React.memo(App);
