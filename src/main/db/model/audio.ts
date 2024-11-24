export interface IAudioListItem {
  fileName: string;
  title: string | undefined;
  album: string | undefined;
  artists: string[] | undefined;
  duration: number | undefined;
}

export interface IAudioList {
  path: string
  items: IAudioListItem[]
}
