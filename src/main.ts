import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';

// Import initializeApp from the Firebase SDK
import { initializeApp } from 'firebase/app';

if (environment.production) {
  enableProdMode();
}

// Initialize Firebase app with your configuration
initializeApp(environment.firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
