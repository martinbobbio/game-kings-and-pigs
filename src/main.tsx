import ReactDOM from 'react-dom/client';
import Router from './Router.tsx';
import { Loading } from '@/components';
import { ThemeWrapper, SWRWrapper } from '@/wrappers';
import GlobalStyles from './GlobalStyles';
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SWRWrapper>
    <GlobalStyles />
    <ThemeWrapper>
      <Suspense fallback={<Loading />}>
        <Router />
      </Suspense>
    </ThemeWrapper>
  </SWRWrapper>
);
