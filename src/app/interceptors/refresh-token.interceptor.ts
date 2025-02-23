import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RefreshTokenRequest } from '../Services/models/requests';

/**
 * We define a shared BehaviorSubject to track the refresh process.
 * This is shared by all calls to the interceptor.
 */
const isRefreshing$ = new BehaviorSubject<boolean>(false);
export const REFRESH_URL_BLACKLIST = ['signIn', 'signUp', 'refreshToken'];

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const blacklist = REFRESH_URL_BLACKLIST;

  // 1) Attach Access Token if available
  const accessToken = authService.getToken();
  let authReq = req;
  if (accessToken) {
    authReq = addTokenHeader(req, accessToken);
  }

  // 2) Handle the response & errors
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Check for 401 error and that it isn't blacklisted
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !blacklist.some((url) => req.url.match(url))
      ) {
        // Attempt refresh
        return handle401(authReq, next, authService, toastr);
      }

      // Otherwise, rethrow the error
      return throwError(() => error);
    })
  );
};

/**
 * If we get a 401, we attempt a token refresh.
 */
function handle401(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  toastr: ToastrService
): Observable<HttpEvent<unknown>> {
  // If we're not already refreshing, do a refresh
  if (!isRefreshing$.getValue()) {
    isRefreshing$.next(true);

    const refreshToken = authService.getRefreshToken();

    if (refreshToken) {
      const refreshTokenRequest: RefreshTokenRequest = {
        refreshToken: refreshToken,
      };

      return authService.refreshToken(refreshTokenRequest).pipe(
        tap(({ accessToken, refreshToken }) => {
          isRefreshing$.next(false);
          // Save new tokens
          authService.setToken(accessToken, refreshToken);
        }),
        // Retry the original request with new access token
        switchMap(({ accessToken }) =>
          next(addTokenHeader(request, accessToken))
        ),
        catchError((err) => {
          // If refresh fails, notify the AuthService and throw
          isRefreshing$.next(false);

          toastr
            .error('Session TimedOut', 'Error', {
              progressBar: true,
              timeOut: 5000,
              closeButton: false,
              easing: 'ease-in',
            })
            .onHidden.subscribe(() => {
              authService.logout();
            });

          return throwError(() => err);
        })
      );
    }
    // If no refresh token, force log out or handle error
    isRefreshing$.next(false);
    toastr
      .error('Missing refresh token', 'Error', {
        progressBar: true,
        timeOut: 5000,
        closeButton: false,
        easing: 'ease-in',
      })
      .onHidden.subscribe(() => {
        authService.logout();
      });
  }

  // If we're already refreshing, wait until it's done, then retry
  return isRefreshing$.pipe(
    filter((is) => !is),
    take(1),
    switchMap(() => {
      const newAccessToken = authService.getToken();
      return next(addTokenHeader(request, newAccessToken));
    })
  );
}

/**
 * Attach the Bearer token to the request headers.
 */
function addTokenHeader(
  request: HttpRequest<unknown>,
  token: string | null
): HttpRequest<unknown> {
  if (!token) {
    return request;
  }
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
