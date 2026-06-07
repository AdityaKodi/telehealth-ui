import {
    Injectable,
    computed,
    signal
} from '@angular/core';
import { JwtUser } from '../Models/jwt-user.model';


@Injectable({
    providedIn: 'root'
})
export class AuthStateService {

    private readonly currentUserSignal =
        signal<JwtUser | null>(null);

    currentUser =
        this.currentUserSignal.asReadonly();

    isAuthenticated = computed(
        () => !!this.currentUserSignal()
    );

    setUser(user: JwtUser): void {

        this.currentUserSignal.set(user);

    }

    clear(): void {

        this.currentUserSignal.set(null);

    }
}