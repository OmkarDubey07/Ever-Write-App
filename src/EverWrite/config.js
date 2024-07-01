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

  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return (
        await this.databases.createDocument(
          conf.everWriteDatabaseId, 
          conf.everWriteCollectionId,
          slug,
          {
            title,
            content,
            featureImage,
            status,
            userId,
          }
        )
      );
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
    }
  }

  async updatePost(){
   
  }
}

const service = new Service();
export default service;
