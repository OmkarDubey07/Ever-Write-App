const conf = {
  everWriteUrl: String(import.meta.env.VITE_EVERWRITE_URL),
  everWriteProjectID: String(import.meta.env.VITE_EVERWRITE_PROJECT_ID),
  everWriteDatabaseId: String(import.meta.env.VITE_EVERWRITE_DATABASE_ID),
  everWriteCollectionId: String(import.meta.env.VITE_EVERWRITE_COLLECTION_ID),
  everWriteBucketId: String(import.meta.env.VITE_EVERWRITE_BUCKET_ID),
};

export default conf;
