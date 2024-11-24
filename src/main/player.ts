import { Howl, Howler } from "howler";

let player: Howl

export function StartMusic(files: string[]): void{
  player = new Howl({
    src: files,
    autoplay: true,
    html5: true
  })
}

export function PauseMusic(): void{
  player.pause()
}
