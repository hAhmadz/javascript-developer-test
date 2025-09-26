const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  var successKey = 'Arnie Quote';
  var failureKey = 'FAILURE';
  const responses = await Promise.all(
    urls.map(async (url) => {
      try {
        
        const res = await withTimeout(httpGet(url));

        let msg;
        try {
          const parsed = JSON.parse(res.body);
          msg = parsed.message;
        } 
        catch {
          return { [failureKey]: 'Invalid response' };
        }

        if (res.status === 200) {
          return { [successKey]: msg };
        } 
        else {
          return { [failureKey]: msg };
        }
      } 
      catch (err) {
        return { [failureKey] : err.message};
      }
    })
  );

  return responses;
};

// Method to add explicit timeout constraint < 500ms
const withTimeout = (promise) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('code to be executed in less than 400ms')), 500)
    )
  ]);
};

module.exports = {
  getArnieQuotes,
};
