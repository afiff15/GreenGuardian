const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Rice___Bacterial_leaf_blight', 'Rice___Brown_spot', 'Rice___Leaf_smut'];

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    let hasil, penjelasan, penyebab, saran;

    if (label === 'Rice___Bacterial_leaf_blight') {
      hasil = "Penyakit Hawar Daun Bakteri"
      penjelasan = "Daun Anda terkena penyakit Hawar Daun Bakteri."
      penyebab = "Bakteri xanthomonas oryzae"
      saran = "Lakukan sanitasi lahan, perlakuan benih, pengeringan sawah, dan pengendalian secara kimiawi."
    }
  
    if (label === 'Rice___Brown_spot') {
      hasil = "Penyakit Bercak Coklat"
      penjelasan = "Daun Anda terkena penyakit Bercak Coklat."
      penyebab = "Jamur Bipolaris oryzae"
      saran = "Gunakan varietas padi yang tahan terhadap penyakit, lakukan pemupukan yang tepat, pengelolaan lingkungan dan fungsida."
    }

    if (label === 'Rice___Leaf_smut') {
      hasil = "Penyakit Gosong Daun Padi"
      penjelasan = "Daun Anda terkena penyakit Gosong Daun Padi."
      penyebab = "Jamur Entyloma oryzae"
      saran = "Gunakan benih yang sehat, lakukan rotasi tanaman, pengelolaan lingkungan, serta sanitasi lapangan."
    }

    return { confidenceScore, label, hasil, penjelasan, penyebab, saran };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;