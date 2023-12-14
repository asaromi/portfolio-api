const FirebaseService = require('../services/firebase')
const serviceAccount = require('../../firebase.key.json')

const firebaseService = new FirebaseService(serviceAccount)
function firestore() {
  return firebaseService.app.firestore()
}

module.exports = firestore
