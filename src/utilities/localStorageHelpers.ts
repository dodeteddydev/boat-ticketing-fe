export class LocalStorageHelpers {
  static setToken(access: string, refresh: string) {
    if (access) localStorage.setItem("accessToken", access);
    if (refresh) localStorage.setItem("refreshToken", refresh);
  }

  static getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  static getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
}
