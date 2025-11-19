// assets/js/api.js - helper to call PHP JSON APIs (demo)
const API = {
  get: async (endpoint) => {
    const res = await fetch('api/' + endpoint);
    return res.json();
  },
  post: async (endpoint, payload) => {
    const res = await fetch('api/' + endpoint, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    return res.json();
  }
};
