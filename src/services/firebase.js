const admin = require('firebase-admin')

class FirebaseService {
  app
  admin
  firestore

  constructor(serviceAccount) {
    this.app = !admin.apps.length ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    }) : admin.app()

    this.firestore = this.app.firestore()
    this.admin = admin
  }

  firestoreSetDocument = async ({ data, merge, ref }) => {
    const params = [data]
    if (merge) params.push({ merge })

    const collection = ref.split('/')
    if (collection.length % 2 !== 0) throw new Error('Invalid ref')

    const document = collection.pop()

    await this.firestore
      .collection(collection.json('/'))
      .doc(document)
      .set(...params)
  }
}

module.exports = FirebaseService
