import app from "./config/app";
class Auth {
  constructor() {
    const raw = localStorage.getItem("session");
    const session = JSON.parse(raw);
    session != null ? (this.user = session.user) : (this.user = "");
    session != null ? (this.isLogged = true) : (this.isLogged = false);
  }

  getUser() {
    return this.user;
  }

  login(user) {
    const session = {
      user,
      isLogged: true
    };
    localStorage.setItem("session", JSON.stringify(session));
    this.user = user;
    this.isLogged = true;
  }

  logout() {
    this.user = "";
    this.isLogged = false;
    localStorage.removeItem("session");
    app.auth().signOut();
  }

  isAuth() {
    return this.isLogged;
  }
}

export default new Auth();