import { API_URL } from "./utils";

export class Request {
  static validStatusCodes = [200, 201, 204];

  public static async get(url: string, headers?: HeadersInit): Promise<any> {
    const response = await fetch(`${API_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (this.validStatusCodes.includes(response.status)) {
      return response.json();
    } else {
      throw response;
    }
  }

  public static async post(
    url: string,
    body: any,
    headers?: HeadersInit
  ): Promise<any> {
    const response = await fetch(`${API_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (this.validStatusCodes.includes(response.status)) {
      return response.json();
    } else {
      throw response;
    }
  }
}
