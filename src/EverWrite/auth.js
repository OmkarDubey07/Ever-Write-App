import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.everWriteUrl)
      .setProject(conf.everWriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another methods
        return this.Login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async Login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null;
  }

  async Logout() {
    try {
      await this.account.deleteSessions();
      console.log("User successfully logged out");
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
