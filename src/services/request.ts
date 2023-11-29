export class Request {
  static validStatusCodes = [200, 201, 204];

  public static async get(url: string, headers?: HeadersInit): Promise<any> {
    const response = await fetch(url, {
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

  public static async post(url: string, body: any): Promise<any> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
