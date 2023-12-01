import { Request } from "./request";

export class MethodService {
  static async all(token: string): Promise<string[]> {
    const cachedMethods = sessionStorage.getItem("methods");
    if (cachedMethods) {
      return JSON.parse(cachedMethods);
    }

    const methods = await Request.get("brew/methods", {
      Authorization: `Bearer ${token}`,
    });

    sessionStorage.setItem("methods", JSON.stringify(methods));

    return methods;
  }
}
