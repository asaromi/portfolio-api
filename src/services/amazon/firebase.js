const admin = require('firebase-admin')

class FirebaseService {
  app
  admin
  firestore

  constructor(serviceAccount) {
    this.admin = admin
    this.app = !admin.apps.length ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    }) : admin.app()
    this.firestore = this.app.firestore()
  }

  async setDocument ({ data, merge, ref }) {
    try {
      const params = [data]
      if (merge) params.push({ merge })

      const collection = ref.split('/')
      if (collection.length % 2 !== 0) throw new Error('Invalid ref')

      const document = collection.pop()

      return await this.firestore
        .collection(collection.join('/'))
        .doc(document)
        .set(...params)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}

module.exports = FirebaseService
