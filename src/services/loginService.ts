import { User } from "../models/User";
import { Request } from "./request";
import { API_URL } from "./utils";

export class LoginService {
  public static async login(email: string, password: string): Promise<true> {
    const response = await Request.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const { token } = response;

    const me = await Request.get(`${API_URL}/artisan/me`, {
      Authorization: `Bearer ${token}`,
    });

    const user: User = {
      id: me.id,
      email: me.email,
      name: me.name,
      token,
    };

    return true;
  }
}
