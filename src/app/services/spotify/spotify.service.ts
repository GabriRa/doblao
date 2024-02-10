import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { SpotifyEncoderService } from './spotify-encoder.service';

const clientId = '2e02a85d42f14f2c8b0a8cf103ec2877';
const redirectUri = 'https://192.168.1.77:4200/bingo-musical/redirect';

export interface Root {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: any[];
  type: string;
  uri: string;
  followers: Followers;
  country: string;
  product: string;
  explicit_content: ExplicitContent;
  email: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: any;
  total: number;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface LocalSpotifyTokens {
  accessToken: string | null;
  expiresIn: string | null;
  refreshToken: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private userProfile: any;
  private userData: any;

  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly spotifyEncoder: SpotifyEncoderService
  ) {}

  public isTokenValid(): boolean {
    const { accessToken, expiresIn } = this.getSpotifyTokens();

    if (!accessToken) return false;
    if (!expiresIn) return false;

    const now = new Date();
    const expiresInDate = new Date(Number(expiresIn));
    const isTokenExpired: boolean = now >= expiresInDate;

    if (isTokenExpired) return false;

    return true;
  }

  public isRefreshTokenAvailable(): boolean {
    const { expiresIn } = this.getSpotifyTokens();
    if (!expiresIn) return false;
    return true;
  }

  public async getProfile() {
    const { accessToken } = this.getSpotifyTokens();

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    const data = await response.json();

    return (this.userProfile = data);
  }

  public async getPlaylists(offset: number = 0): Promise<any | Error> {
    if (!this.userProfile || !this.userProfile.id) {
      return new Error('No user');
    }

    const { accessToken } = this.getSpotifyTokens();

    const response = await fetch(
      `https://api.spotify.com/v1/users/${this.userProfile.id}/playlists?limit=25&offset=${offset}`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    const data = await response.json();

    return data;
  }

  public async getTracksFromPLaylist(
    id: string,
    tracksLimit: number,
    offset: number = 0
  ): Promise<any> {
    const { accessToken } = this.getSpotifyTokens();
    const limit: number = 100;
    let currentOffset: number = 0;

    let items: any[] = [];

    while (currentOffset < tracksLimit || limit + currentOffset < tracksLimit) {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}&offset=${currentOffset}`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      const data = await response.json();
      items.push(...data.items);

      currentOffset += limit;
    }

    return items;
  }

  public async setSpotifyLogin() {
    let codeVerifier = this.spotifyEncoder.generateRandomString(128);
    let codeChallenge = await this.spotifyEncoder.generateCodeChallenge(
      codeVerifier
    );
    this.loginSpotify(codeVerifier, codeChallenge);
  }

  private loginSpotify(codeVerifier: any, codeChallenge: any) {
    let state = this.spotifyEncoder.generateRandomString(16);
    let scope =
      'user-read-private user-read-email playlist-read-private playlist-read-collaborative';

    this.localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });

    window.location.assign('https://accounts.spotify.com/authorize?' + args);
  }

  public async getRefreshToken() {
    const { refreshToken } = this.getSpotifyTokens();

    if (!refreshToken) return;

    let body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
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
    this.localStorage.setItem('access_token', data.access_token);
  }

  public shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // Allows to get value on the fly, instead of defining the value on cosntructor or OnInit
  public getSpotifyTokens(): LocalSpotifyTokens {
    const accessToken = this.localStorage.getItem('access_token');
    const expiresIn = this.localStorage.getItem('expires_in');
    const refreshToken = this.localStorage.getItem('refresh_token');

    return { accessToken, expiresIn, refreshToken };
  }

  public deleteLocalStorage(): void {
    this.localStorage.deleteItem('access_token');
    this.localStorage.deleteItem('expires_in');
    this.localStorage.deleteItem('refresh_token');
  }
}
