import FileList from './components/FileList'
import './App.css'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <FileList />
    </>
  )
}

export default App
