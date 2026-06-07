import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtUser } from '../Models/jwt-user.model';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private readonly TOKEN_KEY = 'access_token';

    setToken(token: string): void {
        sessionStorage.setItem(
            this.TOKEN_KEY,
            token
        );
    }
    

    getToken(): string | null {
        return sessionStorage.getItem(
            this.TOKEN_KEY
        );
    }

    clear(): void {
        sessionStorage.removeItem(
            this.TOKEN_KEY
        );
    }

    isLoggedIn(): boolean {

        const token = this.getToken();

        if (!token) {
            return false;
        }

        try {

            const decoded =
                jwtDecode<JwtUser>(token);

            return decoded.exp * 1000 > Date.now();

        } catch {

            return false;

        }
    }

    getUser(): JwtUser | null {

        const token = this.getToken();

        if (!token) {
            return null;
        }

        try {

            return jwtDecode<JwtUser>(token);

        } catch {

            return null;

        }
    }
}