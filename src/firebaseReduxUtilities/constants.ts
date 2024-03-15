const prod = true;
export const API_URL = prod
  ? 'https://us-central1-coral-406419.cloudfunctions.net/api'
  : 'http://127.0.0.1:5001/coral-406419/us-central1/api';
