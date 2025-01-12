import React, { useState } from 'react';
import { marked } from 'marked';
import data from "./data.json";
import './App.css'
const productData = data[0].content 

function App() {
  const [defaultMarkdown, setDefaultMarkdown] = useState(productData);
  const [isChecked,setIsChecked] = useState(false)
  const [addFile,setAddFile] = useState([])
  const [showMarkDown, setShowMarkDown] = useState(false)
  const [fileName, setFileName] = useState("");
   
  function handleCheck() {
    setIsChecked(!isChecked)
  }

  function sendFiles() {
    const file = {
      id:crypto.randomUUID(),
      title:'untitled-document.md',
      date: new Date().toLocaleDateString("tr-TR", { hour: "numeric", minute: "numeric", second: "numeric", year: "numeric", month: "long", day: "numeric" }),
      src: './assets/img/file.svg',
      content: '',
    }
    setAddFile((prev) => [...prev, file])
    setDefaultMarkdown(data[1].content)
    console.log(file)
    console.log(addFile)
  }

  function selectFile(id) {
    const selectedFile = addFile.find((file) => file.id === id);
    if(selectedFile) {
      setDefaultMarkdown(selectedFile.content)
    }
  }

  function showDisableMarkDown() {
    setShowMarkDown(!showMarkDown)
  }

  function changeName(e) {
  setFileName(e.target.value)
  }
 
  return(
    <>
    <Header handleCheck = {handleCheck} isChecked={isChecked} sendFiles = {sendFiles} addFile={addFile} selectFile = {selectFile}/>
    <div className={isChecked ? 'margin' : 'container'}>
    
    <Main defaultMarkdown = {defaultMarkdown} setDefaultMarkdown = {setDefaultMarkdown} showDisableMarkDown ={showDisableMarkDown} showMarkDown={showMarkDown} setShowMarkDown = {setShowMarkDown}/>
  </div>
  </>
  )
}

function Header({handleCheck,isChecked,sendFiles, selectFile, addFile}) {
 return(
<header className={isChecked ? 'margin' : 'container'}>
  <div className='hamburger-area'>
    <input type="checkbox" className ='hamburger-checkbox' id="checkbox" onChange={handleCheck} />
    <label htmlFor="checkbox" className='checkbox'>
    <img src="./assets/img/hamburger-icon.svg" className='hamburger-icon' />
    </label>
      <div className="nav-mobile">
          <h3>MARKDOWN</h3>
          <h6>My DOCUMENTS</h6>
          <button onClick={sendFiles}>+ New Document</button>
        <ul>
          {addFile.map(x => <li onClick={() => selectFile(x.id)} key={x.id} className='menu-items'> <img src = {x.src} alt = {x.title} />
          <div>
             <span>{x.date}</span>
             <h5>{x.title}</h5>
          </div>
            </li>)}
        </ul>
      </div>
    <input type="text" defaultValue="untitled.md"/>
  </div>

    <div className='button-area'>
      <img src="./assets/img/trash.svg"/>
      <img className='save-icon' src="./assets/img/save.svg"/>
    </div>
</header>
 )
}

function Main({defaultMarkdown, setDefaultMarkdown,showMarkDown, showDisableMarkDown }) {
  function handleMarkDown(e) {
    setDefaultMarkdown(e.target.value)
    
  }

  function getMarkDown() {
      return { __html: marked(defaultMarkdown) };
    };

  function handleSubmit(e) {
    e.preventDefault()
    }
 console.log(showMarkDown)
    
return(
<div className='editor'>
  <div className='preview-area'>
    <h5>{showMarkDown ? 'PREVIEW' : 'MARKDOWN'}</h5>
    <img onClick={showDisableMarkDown} src={showMarkDown ? './assets/img/hide-preview-icon.svg' : './assets/img/show-preview-icon.svg'}/>
  </div>
 <form action="" onSubmit={handleSubmit}>
 <textarea value={defaultMarkdown} onChange={handleMarkDown} className={showMarkDown ? 'display' : 'text-area'}>
 {productData}
 </textarea>
 </form>
  <div className={showMarkDown ? 'result-area' : 'display'} dangerouslySetInnerHTML={getMarkDown()}>
  </div>
</div>
)
}
export default App;

