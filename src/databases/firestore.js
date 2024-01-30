const FirebaseService = require('../services/amazon/firebase')
const amazonServiceAccount = require('../../configs/amazon/firebase.key.json')
const portfolioServiceAccount = require('../../configs/portfolio/firebase.key.json')

const amazonFirebaseService = new FirebaseService(amazonServiceAccount)
const amazonFirestore = () => amazonFirebaseService.app.firestore()

const portfolioFirebaseService = new FirebaseService(portfolioServiceAccount)
const portfolioFirestore = () => portfolioFirebaseService.app.firestore()

module.exports = {
	amazonFirestore,
	portfolioFirestore,
	amazonFirebaseService,
	portfolioFirebaseService
}
