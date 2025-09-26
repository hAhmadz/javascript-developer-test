const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  var responses = await Promise.all(
    urls.map(async (url) => {
      var successKey = 'Arnie Quote';
      var failureKey = 'FAILURE';
      const res = await httpGet(url);
      const { message } = JSON.parse(res.body);

      if (res.status === 200) {
        return { [successKey]: message };
      } else {
        return { [failureKey]: message };
      }
    })
  );

  return responses;
};

module.exports = {
  getArnieQuotes,
};
