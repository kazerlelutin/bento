// Constante -------------------------------------------------------------------
let idb
const subscribers = []
const IDB_NAME = 'kllbf_db'
const IDB_VERSION = 1
const STORES = {
  DOCS: {
    NAME: 'docs',
    INDEXES: {
      TITLE: 'title',
      CREATED_AT: 'createdAt',
      UPDATED_AT: 'updatedAt',
      LANG: 'lang',
    },
    FIELDS: {
      FAVORITE: 'favorite',
      CONTENT: 'content',
    },
  },
  WORDS: {
    NAME: 'words',
    INDEXES: {
      NAME: 'name',
    },
    FIELDS: {
      TRANSLATION: 'translation',
      STATE: 'state',
      RELATIONS: 'relations',
      INFO: 'info',
      EMOJI: 'emoji',
      LANG: 'lang',
      UPDATED_AT: 'updatedAt',
    },
  },
}

// INITIALISATION --------------------------------------------------------------

/**
 * @description  Permet à un composant de s'abonner pour être notifié des changements dans la base de données.
 * @param {Function} callback - La fonction à appeler lorsqu'un changement est détecté.
 * @returns {Function} Une fonction pour se désabonner et arrêter de recevoir des notifications.
 */
export function subscribe(callback) {
  if (!subscribers.includes(callback)) {
    subscribers.push(callback)
  }

  return () => {
    const index = subscribers.indexOf(callback)
    if (index !== -1) subscribers.splice(index, 1)
  }
}

/**
 * @description Notifie tous les abonnés des changements dans la base de données.
 * Appelle chaque fonction callback des abonnés et force une nouvelle dessin de la vue Mithril.
 */
export async function notifySubscribers(payload) {
  // Attendre que toutes les callbacks soient appelées, fonctionne même pour les callbacks synchrones
  await Promise.all(
    subscribers.map((callback) => {
      const result = callback(payload)
      return result instanceof Promise ? result : Promise.resolve(result)
    })
  )
}

/**
 * @description Ouvre la base de données et la met à niveau si nécessaire.
 */
export async function openDatabase() {
  const openRequest = indexedDB.open(IDB_NAME, IDB_VERSION)

  return new Promise((resolve, reject) => {
    openRequest.onupgradeneeded = (event) => {
      idb = event.target.result

      const docStore = idb.createObjectStore(STORES.DOCS.NAME, {
        keyPath: 'id',
        autoIncrement: true,
      })

      Object.keys(STORES.DOCS.INDEXES).forEach((indexKey) => {
        docStore.createIndex(
          STORES.DOCS.INDEXES[indexKey],
          STORES.DOCS.INDEXES[indexKey]
        )
      })

      const wordStore = idb.createObjectStore(STORES.WORDS.NAME, {
        keyPath: 'id',
        autoIncrement: true,
      })

      Object.keys(STORES.WORDS.INDEXES).forEach((indexKey) => {
        wordStore.createIndex(
          STORES.WORDS.INDEXES[indexKey],
          STORES.WORDS.INDEXES[indexKey]
        )
      })
    }

    openRequest.onsuccess = (event) => {
      idb = event.target.result
      resolve(idb)
    }

    openRequest.onerror = (event) => {
      reject(
        "Erreur lors de l'ouverture de la base de données : " +
        event.target.errorCode
      )
    }
  })
}

// ====== DOCUMENTS ===========================================================

async function addDocument(doc) {
  const transaction = idb.transaction([STORES.DOCS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.DOCS.NAME)
  const request = store.add(doc)

  const result = await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = (e) => reject("Erreur lors de l'ajout du document.", e)
  })

  notifySubscribers()
  return result
}

async function getDocuments() {
  const transaction = idb.transaction([STORES.DOCS.NAME], 'readonly')
  const store = transaction.objectStore(STORES.DOCS.NAME)
  const request = store.getAll()

  return await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () =>
      reject('Erreur lors de la récupération des documents.')
  })
}

async function getDocument(id) {
  const transaction = idb.transaction([STORES.DOCS.NAME], 'readonly')
  const store = transaction.objectStore(STORES.DOCS.NAME)
  const request = store.get(id)

  return await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () =>
      reject('Erreur lors de la récupération du document.')
  })
}

async function removeDocument(id) {
  const transaction = idb.transaction([STORES.DOCS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.DOCS.NAME)
  const request = store.delete(id)

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve()
    request.onerror = () => reject('Erreur lors de la suppression du document.')
  })

  notifySubscribers()
}

async function updateDocument(doc) {
  const transaction = idb.transaction([STORES.DOCS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.DOCS.NAME)
  const request = store.put({
    ...doc,
    updatedAt: Date.now(),
  })

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve()
    request.onerror = () => reject('Erreur lors de la mise à jour du document.')
  })

  notifySubscribers()
}

// ====== WORDS ===============================================================

async function getWords() {
  const transaction = idb.transaction([STORES.WORDS.NAME], 'readonly')
  const store = transaction.objectStore(STORES.WORDS.NAME)
  const request = store.getAll()

  return await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject('Erreur lors de la récupération des mots.')
  })
}

async function getWord(word) {
  const transaction = idb.transaction([STORES.WORDS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.WORDS.NAME)
  const index = store.index(STORES.WORDS.INDEXES.NAME)
  const request = index.get(word.toLowerCase())

  const result = await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = (e) => reject('Erreur lors de la recherche du mot.', e)
  })
  return result
}

async function findOrCreateWord(word) {
  const transaction = idb.transaction([STORES.WORDS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.WORDS.NAME)
  const index = store.index(STORES.WORDS.INDEXES.NAME)
  const request = index.get(word.toLowerCase())

  const result = await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = (e) => reject('Erreur lors de la recherche du mot.', e)
  })

  if (result) return result

  const newWord = {
    name: word.toLowerCase(),
    translation: '',
    state: 'unknown',
    info: '',
    emoji: '',
    lang: '',
    updatedAt: Date.now(),
  }

  const addRequest = store.add(newWord)

  return await new Promise((resolve, reject) => {
    addRequest.onsuccess = () => resolve(newWord)
    addRequest.onerror = (e) => reject("Erreur lors de l'ajout du mot.", e)
  })
}

async function addWord(word) {
  const transaction = idb.transaction([STORES.WORDS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.WORDS.NAME)
  const request = store.add({
    ...word,
    name: word.name.toLowerCase(),
    updatedAt: Date.now(),
  })

  const result = await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = (e) => reject("Erreur lors de l'ajout du mot.", e)
  })

  notifySubscribers()
  return result
}

async function removeWord(id) {
  const transaction = idb.transaction([STORES.WORDS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.WORDS.NAME)
  const request = store.delete(id.toLowerCase())

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve()
    request.onerror = () => reject('Erreur lors de la suppression du mot.')
  })

  notifySubscribers()
}

async function updateWord(word) {
  const transaction = idb.transaction([STORES.WORDS.NAME], 'readwrite')
  const store = transaction.objectStore(STORES.WORDS.NAME)
  const request = store.put({
    ...word,
    name: word.name.toLowerCase(),
    updatedAt: Date.now(),
  })

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve()
    request.onerror = () => reject('Erreur lors de la mise à jour du mot.')
  })

  notifySubscribers()
}

// EXPORTS ---------------------------------------------------------------------

export const Docs = {
  add: addDocument,
  get: getDocuments,
  getById: getDocument,
  remove: removeDocument,
  update: updateDocument,
}

export const Words = {
  add: addWord,
  get: getWords,
  getById: getWord,
  remove: removeWord,
  update: updateWord,
  findOrCreate: findOrCreateWord,
}
