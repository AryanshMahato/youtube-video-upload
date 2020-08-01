export class EnvConfig {
  public static getServerPort(): string {
    if (!process.env.PORT)
      throw new Error("PORT is not available as Environment Variable");

    return process.env.PORT;
  }

  public static getAuthToken(): string {
    if (!process.env.AUTH_TOKEN)
      throw new Error("Add Auth Token in Environment variables");

    return process.env.AUTH_TOKEN;
  }
}
