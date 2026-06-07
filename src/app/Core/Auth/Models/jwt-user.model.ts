export interface JwtUser {
  sub: string;
  userId: string;
  exp: number;

  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;

  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
}