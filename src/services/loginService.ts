import { User } from "../models/User";
import { Request } from "./request";

export class LoginService {
  public static async me(): Promise<User> {
    return await Request.get({ url: "artisan/me" });
  }

  public static async login(email: string, password: string): Promise<User> {
    const response = await Request.post({
      url: "auth/login",
      body: {
        email,
        password,
      },
      useToken: false,
    });

    const { token } = response;
    localStorage.setItem("token", token);

    const me = await this.me();

    const user: User = {
      id: me.id,
      email: me.email,
      name: me.name,
      token,
    };

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  public static async logout(): Promise<void> {
    localStorage.removeItem("user");
  }

  public static async signup(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const response = await Request.post({
      url: "auth/register",
      body: {
        name,
        email,
        password,
      },
      useToken: false,
    });

    const { token } = response;
    localStorage.setItem("token", token);

    const me = await this.me();

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
