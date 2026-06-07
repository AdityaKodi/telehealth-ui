import {
    Injectable,
    inject
} from '@angular/core';

import {
    HttpClient
} from '@angular/common/http';

import {
    Observable,
    tap
} from 'rxjs';



import { TokenService }
    from './token.service';

import { AuthStateService }
    from './auth-state.service';
import { environment } from '../../../../Environment/environment';
import { LoginRequest } from '../Models/login-request.model';
import { LoginResponse } from '../Models/login-response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly http =
        inject(HttpClient);

    private readonly tokenService =
        inject(TokenService);

    private readonly authState =
        inject(AuthStateService);

    private readonly api =
        environment.apiUrl;

    login(
        request: LoginRequest
    ): Observable<LoginResponse> {

        return this.http.post<LoginResponse>(
            `${this.api}/auth/login`,
            request
        )
            .pipe(
                tap(response => {

                    this.tokenService.setToken(
                        response.accessToken
                    );

                    const user =
                        this.tokenService.getUser();

                    if (user) {
                        this.authState.setUser(user);
                    }

                })
            );
    }

    logout(): void {

        this.tokenService.clear();

        this.authState.clear();

    }
}