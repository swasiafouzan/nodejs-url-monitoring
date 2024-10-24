const axios = require("axios");
const monitoredUrls = {}; //In-memory store

const startMonitoring = (url, interval) => {
  if (!monitoredUrls[url]) {
    monitoredUrls[url] = setInterval(async () => {
      try {
        await axios.get(url);
        console.log(`${url} is up`);
      } catch (error) {
        console.log(`${url} might be down`);
      }
    }, interval);
  }
};

const stopMonitoring = (url) => {
  if (monitoredUrls[url]) {
    clearInterval(monitoredUrls[url]);
    delete monitoredUrls[url];
    return true;
  }
  return false;
};

module.exports = { startMonitoring, stopMonitoring };
