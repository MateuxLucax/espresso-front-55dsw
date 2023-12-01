import { Request } from "./request";

export class MethodService {
  static async all(): Promise<string[]> {
    const cachedMethods = sessionStorage.getItem("methods");
    if (cachedMethods) {
      return JSON.parse(cachedMethods);
    }

    const methods = await Request.get({ url: "brew/methods" });

    sessionStorage.setItem("methods", JSON.stringify(methods));

    return methods;
  }
}
