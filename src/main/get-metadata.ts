import { dialog } from 'electron'
import * as path from 'node:path'
import { loadMusicMetadata } from 'music-metadata'
import { IAudioList } from '../model/audio'
import fs from 'fs'
import FileType from 'file-type'

export async function GetFolderContent(): Promise<IAudioList> {
  const result: IAudioList = {
    path: '',
    items: []
  }
  const folders = dialog.showOpenDialogSync({
    title: '选择文件夹',
    properties: ['openDirectory']
  })
  if (folders && folders.length > 0) {
    for (const folder of folders) {
      result.path = folder
      const { parseFile } = await loadMusicMetadata() // With version v10.3.1 you can update your CommonJS TypeScript code to: https://github.com/Borewit/music-metadata/issues/1357#issuecomment-2321329951
      const files = fs.readdirSync(folder)
      for (const file of files) {
        const filepath = path.join(folder, file)
        if (await IsAudioMedia(filepath)) {
          const metadata = await parseFile(filepath)
          result.items.push({
            fileName: file,
            title: metadata.common.title,
            album: metadata.common.album,
            artists: metadata.common.artists,
            duration: metadata.format.duration
          })
        }
      }
    }
  }
  return result
}

async function IsAudioMedia(path: string): Promise<boolean> {
  const fileType = await FileType.fromFile(path)
  if (fileType) {
    const type = fileType.mime.split('/')
    if (type[0] === 'audio') {
      return true
    }
  }
  return false
}
