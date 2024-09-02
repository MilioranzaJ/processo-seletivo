  import axios from 'axios';

  export default axios.create({
      baseURL: 'https://pncp.gov.br',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
   });
  
   