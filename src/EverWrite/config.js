import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.everWriteUrl)
      .setProject(conf.everWriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.everWriteDatabaseId,
        conf.everWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.everWriteDatabaseId,
        conf.everWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.everWriteDatabaseId,
        conf.everWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.everWriteDatabaseId,
        conf.everWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.everWriteDatabaseId,
        conf.everWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
      return false;
    }
  }

  // file upload methods
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.everWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.everWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.everWriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
