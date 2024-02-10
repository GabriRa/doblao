import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

const clientId = '2e02a85d42f14f2c8b0a8cf103ec2877';
const redirectUri = 'https://192.168.1.77:4200/bingo-musical/redirect';

@Component({
  selector: 'app-bingo-redirect',
  templateUrl: './bingo-redirect.component.html',
  styleUrls: ['./bingo-redirect.component.scss'],
})

// poner variables en env
export class BingoRedirectComponent {
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly spotifyService: SpotifyService,
    private readonly localStorage: LocalStorageService
  ) {
    this.checkTokenAndSetSpotify();
  }

  private checkTokenAndSetSpotify(): void {
    const now = new Date();
    const { accessToken, expiresIn } = this.spotifyService.getSpotifyTokens();

    if (accessToken) {
      if (!expiresIn) return;

      // Is token expired?
      const expiresInDate = new Date(expiresIn);
      const isTokenExpired: boolean = now >= expiresInDate;

      if (isTokenExpired) {
        // Expired token, refreh
        this.spotifyService.getRefreshToken();
      } else {
        // Token still valid
        this.router.navigate(['/bingo-musical']);
      }
    }

    // Check if current url comes from Spotify
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (code) {
      this.setSpotifyCode(code);
    } else {
      // No code on URL, bad use. Just return;
      this.location.back();
    }
  }

  private async setSpotifyCode(code: string): Promise<void> {
    let codeVerifier = this.localStorage.getItem('code_verifier');

    if (!codeVerifier) return;

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }

    const data = await response.json();

    const now: Date = new Date();
    const tokenExpireDate: string = now
      .setSeconds(now.getSeconds() + 3600)
      .toString();

    this.localStorage.setItem('expires_in', tokenExpireDate);
    this.localStorage.setItem('refresh_token', data.refresh_token);
    this.localStorage.setItem('access_token', data.access_token);

    this.router.navigate(['/bingo-musical']);
  }
}
