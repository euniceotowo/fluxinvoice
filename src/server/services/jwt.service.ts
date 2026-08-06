import { jwtVerify, type JWTPayload } from "jose";

export class JWTService {
  static async verifyAccessToken(token: string): Promise<JWTPayload> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload;
  }
}
