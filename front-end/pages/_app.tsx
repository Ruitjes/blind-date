import '../i18n';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(far, fas);

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useProfile } from '../hooks/useProfile';
import React from 'react';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {

  const { profile } = useProfile();

  return (
    <UserProvider>
      <Component {...pageProps} profile={profile} />
    </UserProvider>
  );
}

export default MyApp
