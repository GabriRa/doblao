import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyEncoderService {
  constructor() {}

  public generateRandomString(length: number) {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public async generateCodeChallenge(codeVerifier: string) {
    function base64encode(string: ArrayBuffer) {
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(string)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }
}
