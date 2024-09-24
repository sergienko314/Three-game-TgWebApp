import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './utility/globalStyles';
import { theme } from './utility/theme';

import { LanguageProvider } from './utility/LanguageContext.js';
import Page from './page/MapPage/Page.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LanguageProvider>
        <Page />
      </LanguageProvider>
    </ThemeProvider>
  </BrowserRouter>
);
