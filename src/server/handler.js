const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const loadHistoryData = require('../services/loadHistoryData');
const InputError = require('../exceptions/InputError');

const postPredictHandler = async (request, h) => {
    try {
    const { model } = request.server.app;
    const { image } = request.payload;

    const { confidenceScore, hasil, penjelasan, penyebab, saran } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "hasil": hasil,
        "penjelasan": penjelasan,
        "penyebab": penyebab,
        "cara mengatasi": saran,
        "confidenceScore": confidenceScore,
        "createdAt": createdAt
    };

    await storeData(id, data);

    return h.response({
        status: 'success',
        message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data
    })
    .code(201);
  } catch (error) {
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi', 400);
  }
};

const getAllPredictionsHandler = async (request, h) => {
    try {
      const { data } = await loadHistoryData();
  
      return h
        .response({
          status: 'success',
          data,
        })
        .code(200);
    } catch (error) {
      throw new InputError('Terjadi kesalahan dalam melakukan prediksi', 400);
    }
  };
  
module.exports = { postPredictHandler, getAllPredictionsHandler };