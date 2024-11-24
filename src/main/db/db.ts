import sqlite3 from "sqlite3";
import * as path from "node:path";
import { FolderModel } from "./model/db_models";

export let dbClient: sqlite3.Database;

export function InitDB(): void {
  dbClient = new sqlite3.Database(path.join(__dirname, "data.db"), (err) => {
    if (err) throw err;
  });

  dbClient.run(
    `CREATE TABLE IF NOT EXISTS folder_list(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    path text NOT NULL,
    add_time TIMESTAMP NOT NULL DEFAULT now(),
  )`,
    (err) => {
      if (err) throw err;
    }
  );
}

export function SaveFolder(folderInfo: FolderModel): Promise<boolean> {
  return new Promise((resolve, reject) => {
    dbClient.run(
      `INSERT INTO folder_list(name, path) VALUES (?, ?)`,
      [folderInfo.name, folderInfo.path],
      (err) => {
        if (err) {
          console.log(`save ${folderInfo} failed: ${err}`)
          reject(err)
        }
        resolve(true)
      }
    )
  })
}

export function QueryAllFolders(): Promise<FolderModel[]> {
  return new Promise<FolderModel[]>((resolve, reject) => {
    dbClient.all<FolderModel>(`SELECT * FROM folder_list`, (err: Error, results: FolderModel[]) => {
      if (err) {
        console.error(`queryAllFolders failed: ${err}`)
        reject(err)
      }
      resolve(results)
    })
  })
}
