export class LocalStorageHelpers {
  static setToken(access: string, refresh: string) {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  }

  static removeToken() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  static getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  static getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
}
