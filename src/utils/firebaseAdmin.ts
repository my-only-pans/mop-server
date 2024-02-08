import admin from 'firebase-admin';
import config from '../config';

export default admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.SERVICE_PROJECT_ID,
    clientEmail: config.SERVICE_ACCOUNT_CLIENT_EMAIL,
    privateKey: config.SERVICE_ACCOUNT_PRIVATE_KEY,
  }),
});
