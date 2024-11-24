import React, { useState } from "react"
import { Input, Button } from "@fluentui/react-components"
import { IAudioList } from "../../../main/db/model/audio"
import * as path from "node:path"

const FileList: React.FC = () => {
  const [itemList, setItemList] = useState<IAudioList | undefined>()

  const handlerAddFolder = (): void => {
    window.electron.ipcRenderer.invoke("getFolderContent").then((data) => {
      setItemList(data)
    })
  }
  return (
    <div className="p-4 gap-4">
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <Input className="w-full" />
        </div>

        <Button appearance="primary" onClick={handlerAddFolder}>
          Add Folder
        </Button>
      </div>

      {itemList &&
        itemList.items.map((item, index) => (
          <div
            key={index}
            onDoubleClick={() => {
              window.electron.ipcRenderer.send("playing-music", path.join(itemList.path, item.fileName))
            }}
          >
            {JSON.stringify(item)}
          </div>
        ))}
    </div>
  )
}

export default FileList
