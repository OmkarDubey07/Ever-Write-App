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

  async CreateAccount({ email, password, name }) {
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
  }

  async Login({ email, password }) {
    return await this.account.createEmailSession(email, password);
  }

  async GetCurrentUser() {
    await this.account.get();
  }

  async Logout() {
    await this.account.deleteSessions();
  }
}

const authService = new AuthService();

export default authService;
