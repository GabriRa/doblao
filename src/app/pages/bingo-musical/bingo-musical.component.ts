import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';

import * as htmlToImage from 'html-to-image';
@Component({
  selector: 'app-bingo-musical',
  templateUrl: './bingo-musical.component.html',
  styleUrls: ['./bingo-musical.component.scss'],
})
export class BingoMusicalComponent implements OnInit {
  public userPlaylists: any[];

  public user: any;
  public selectedPlaylist: any;
  public tracks: any;

  public bingoCard: any[] | null;

  public tracksLoading: boolean = false;

  public counter: number = 0;

  public currentPlaylistLimit: number | null;
  public currentPlaylistTotal: number | null;

  @ViewChild('loginAnimationStart') loginAnimationStartRef: ElementRef;
  @ViewChild('bingoCardElm') bingoCardRef: ElementRef;

  constructor(private readonly spotifyService: SpotifyService) {}

  async ngOnInit(): Promise<void> {
    const isTokenValid = this.spotifyService.isTokenValid();
    // const isRefreshTokenAvailable =
    //   this.spotifyService.isRefreshTokenAvailable();

    if (isTokenValid) {
      this.getUserAndPlaylist();
    }

    this.startAnimation();
  }

  public async getUserAndPlaylist() {
    this.user = await this.spotifyService.getProfile();
    await this.getPlaylists();
  }

  private startAnimation(): void {
    // !! Can be blocked trigger to early.
    // Needs to be worked on
    setTimeout(() => {
      if (!this.loginAnimationStartRef) return;
      const elm = this.loginAnimationStartRef.nativeElement;
      elm.classList.add('login-animation-start');
    }, 0);
  }

  public login(): void {
    this.spotifyService.setSpotifyLogin();
  }

  public logout(): void {
    // Reset values
    this.userPlaylists = [];
    this.user = null;
    this.selectedPlaylist = null;
    this.tracks = null;
    this.bingoCard = null;
    this.tracksLoading = false;
    this.counter = 0;
    this.currentPlaylistLimit = null;
    this.currentPlaylistTotal = null;

    this.spotifyService.deleteLocalStorage();

    this.startAnimation();
  }

  public async selectPlaylist(playlist: any): Promise<void> {
    this.counter = 0;
    this.tracksLoading = true;
    this.selectedPlaylist = playlist;
    await this.getTracksFromPlaylist();
    this.tracksLoading = false;
  }

  public generateBingoCard(): void {
    this.counter++;

    this.bingoCard = this.spotifyService.shuffle(this.tracks).slice(0, 25);
  }

  // Generate and donwload bingo card as an image
  public downlaodBingoCard(): void {
    var node = document.querySelector('.bingo-card-container') as HTMLElement;
    if (!node) return;

    htmlToImage.toJpeg(node, { quality: 0.95 }).then((dataUrl) => {
      var link = document.createElement('a');
      link.download = 'my-image-name.jpeg';
      link.href = dataUrl;
      link.click();
    });
  }

  public async refreshPlaylistTracks(): Promise<void> {
    this.counter = 0;
    await this.getTracksFromPlaylist();
  }

  public async getTracksFromPlaylist(): Promise<void> {
    this.tracks = await this.spotifyService.getTracksFromPLaylist(
      this.selectedPlaylist.id,
      this.selectedPlaylist.tracksLimit,
      0
    );
  }

  public async loadMorePlaylist(): Promise<void> {
    if (!this.currentPlaylistLimit) return;

    const playlistData = await this.spotifyService.getPlaylists(
      this.currentPlaylistLimit
    );

    const userPlaylists = playlistData.items;

    const a = this.formatPlaylistData(userPlaylists);

    this.userPlaylists = [...this.userPlaylists, ...a];

    this.showPlaylistEffect(this.currentPlaylistLimit);

    this.currentPlaylistLimit += playlistData.limit;
  }

  public async getPlaylists() {
    const playlistData = await this.spotifyService.getPlaylists();

    const userPlaylists = playlistData.items;

    this.currentPlaylistLimit = playlistData.limit;
    this.currentPlaylistTotal = playlistData.total;

    // Set user playlist data
    this.userPlaylists = this.formatPlaylistData(userPlaylists);

    this.showPlaylistEffect();
  }

  private showPlaylistEffect(offset: number = 0): void {
    // Effect
    setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('.user-playlist--item')
        .forEach((item, i) => {
          if (offset > i) return;

          item.style.transitionDelay = `${0.2 * (i - offset) + 0}s`;
          item.classList.add('user-playlist--item-show');
        });
    }, 0);
  }

  private formatPlaylistData(playlistData: any[]): any[] {
    return playlistData.map((playlist: any) => {
      const imgUrl = playlist.images[0]
        ? playlist.images.length > 1
          ? playlist.images[1].url
          : playlist.images[0].url
        : '';

      return {
        name: playlist.name,
        imgUrl,
        id: playlist.id,
        tracksUrl: playlist.tracks.href,
        tracksLimit: playlist.tracks.total,
      };
    });
  }
}
