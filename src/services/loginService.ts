import { User } from "../models/User";
import { Request } from "./request";

export class LoginService {
  public static async login(email: string, password: string): Promise<User> {
    const response = await Request.post("auth/login", {
      email,
      password,
    });

    const { token } = response;

    const me = await Request.get("artisan/me", {
      Authorization: `Bearer ${token}`,
    });

    const user: User = {
      id: me.id,
      email: me.email,
      name: me.name,
      token,
    };

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  }
}
