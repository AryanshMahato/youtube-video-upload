export class EnvConfig {
  public static getServerPort(): string {
    if (!process.env.PORT)
      throw new Error("PORT is not available as Environment Variable");

    return process.env.PORT;
  }
}
