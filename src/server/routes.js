const { postPredictHandler, getAllPredictionsHandler } = require('../server/handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      },
    }
  },
  {
    path: '/predict/history',
    method: 'GET',
    handler: getAllPredictionsHandler,
  }
];

module.exports = routes;