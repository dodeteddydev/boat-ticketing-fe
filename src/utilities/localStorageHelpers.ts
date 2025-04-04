export class LocalStorageHelpers {
  static setToken(access: string) {
    localStorage.setItem("accessToken", access);
  }

  static removeToken() {
    localStorage.removeItem("accessToken");
  }

  static getAccessToken() {
    return localStorage.getItem("accessToken");
  }
}
