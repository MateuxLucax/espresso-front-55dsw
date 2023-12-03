import { API_URL } from "./utils";

export type GetProps = {
  url: string;
  useToken?: boolean;
};

export type PostProps = {
  url: string;
  body?: any;
  useToken?: boolean;
};

export class Request {
  static validStatusCodes = [200, 201, 204];

  public static async get({ url, useToken = true }: GetProps): Promise<any> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (useToken) {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/${url}`, {
      method: "GET",
      headers,
    });

    if (this.validStatusCodes.includes(response.status)) {
      return response.json();
    } else {
      throw response;
    }
  }

  public static async post({
    url,
    body,
    useToken = true,
  }: PostProps): Promise<any> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (useToken) {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (this.validStatusCodes.includes(response.status)) {
      return response.json();
    } else {
      throw response;
    }
  }

  public static async put({
    url,
    body,
    useToken = true,
  }: PostProps): Promise<any> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (useToken) {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/${url}`, {
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (this.validStatusCodes.includes(response.status)) {
      return response.json();
    } else {
      throw response;
    }
  }

  public static async delete({
    url,
    useToken = true,
  }: PostProps): Promise<any> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (useToken) {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/${url}`, {
      method: "DELETE",
      headers,
    });

    if (this.validStatusCodes.includes(response.status)) {
      return response.json();
    } else {
      throw response;
    }
  }
}
