import React, { useRef, useState } from 'react';
import { marked } from 'marked';
import data from "./data.json";
import './App.css'
const productData = data[0].content 

function App() {
  const [defaultMarkdown, setDefaultMarkdown] = useState(productData);
  const [isChecked,setIsChecked] = useState(false)
  const [addFile,setAddFile] = useState([])
  const [showMarkDown, setShowMarkDown] = useState(false)
  const [fileName, setFileName] = useState("welcome.md");
  const [activeFile, setActiveFile] = useState(null)
  const dialogRef = useRef(null);

  function handleConfirmDelete() {
    dialogRef.current.showModal()
  }

  function handleCheck() {
    setIsChecked(!isChecked)
  }


  function handleSave() {
    const newNameFiles = addFile.map(file => 
      file.id === activeFile ? { ...file, title: fileName } : file
    );
    setAddFile(newNameFiles);
  }

  function sendFiles() {
    const file = {
      id:crypto.randomUUID(),
      title: "untitled.md",
      date: new Date().toLocaleDateString("tr-TR", { hour: "numeric", minute: "numeric", second: "numeric", year: "numeric", month: "long", day: "numeric" }),
      src: './assets/img/file.svg',
      content: '# Create your markdown here',
    }
    setAddFile((prev) => [...prev, file])
    setActiveFile(file.id);
    setFileName("untitled.md");
    setDefaultMarkdown(productData);
    console.log(file)
    console.log(addFile)
  }

  function selectFile(id) {
    const selectedFile = addFile.find((file) => file.id === id);
    if(selectedFile) {
      setActiveFile(id);
      setFileName(selectedFile.title);
      setDefaultMarkdown(selectedFile.content);
    }
  }

  function handleContentChange(e) {
    const updatedContent = e.target.value;
    setDefaultMarkdown(updatedContent);
    setAddFile((prev) =>
      prev.map((file) =>
        file.id === activeFile ? { ...file, content: updatedContent } : file
      )
    );
  }

  function showDisableMarkDown() {
    setShowMarkDown(!showMarkDown)
  }

 
 
  return(
    <>
    <Header handleCheck = {handleCheck} isChecked={isChecked} sendFiles = {sendFiles} addFile={addFile} selectFile = {selectFile} activeFile= {activeFile} setActiveFile = {setActiveFile} setFileName={setFileName} handleSave={handleSave} handleConfirmDelete={handleConfirmDelete} dialogRef={dialogRef} fileName={fileName} setAddFile={setAddFile} setDefaultMarkdown={setDefaultMarkdown}/>
    <div className={isChecked ? 'margin' : 'container'}>
    
    <Main defaultMarkdown = {defaultMarkdown} setDefaultMarkdown = {setDefaultMarkdown} showDisableMarkDown ={showDisableMarkDown} showMarkDown={showMarkDown} setShowMarkDown = {setShowMarkDown} handleContentChange= {handleContentChange}/>
  </div>
  </>
  )
}

function Header({handleCheck,isChecked,sendFiles, selectFile, addFile, setAddFile, setFileName,handleSave,handleConfirmDelete,dialogRef, fileName, setActiveFile, activeFile, setDefaultMarkdown}) {
 
 function handleDelete() {
  const selectedData = addFile.filter((y) => y.id !== activeFile);
  setAddFile(selectedData);
  if (selectedData.length !== 0) {
    setActiveFile(selectedData[selectedData.length-1].id);
    setDefaultMarkdown(selectedData[selectedData.length - 1].content);
    setFileName(selectedData[selectedData.length - 1].title); 
  }else {
    sendFiles();
    setFileName("welcome");
    setDefaultMarkdown(productData);
  }
  dialogRef.current.close()
 }
 
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
    <input type="text"  value={fileName} onChange={(e) => setFileName(e.target.value)}/>
  </div>

    <div className='button-area'>
      <img  onClick={handleConfirmDelete}  src="./assets/img/trash.svg"/>
      <img className='save-icon' onClick={handleSave} src="./assets/img/save.svg"/>
    </div>
    <dialog ref={dialogRef}>
     <h4>Delete this document?</h4>
     <p>Are you sure you want to delete the {fileName} document and its contents? This action cannot be reversed.</p>
     <button onClick={handleDelete}>Confirm & Delete</button>
    </dialog>
</header>
 )
}

function Main({defaultMarkdown, setDefaultMarkdown,showMarkDown, showDisableMarkDown, handleContentChange }) {
  function handleMarkDown(e) {
    setDefaultMarkdown(e.target.value)
    
  }

  function getMarkDown() {
      return { __html: marked(defaultMarkdown) };
    };

  function handleSubmit(e) {
    e.preventDefault()
    }
 
    
  return(
    <>
    <div className='preview-area'>
      <h5>{showMarkDown ? 'PREVIEW' : 'MARKDOWN'}</h5>
      <img onClick={showDisableMarkDown} src={showMarkDown ? './assets/img/hide-preview-icon.svg' : './assets/img/show-preview-icon.svg'}/>
    </div>
  <div className='editor'>
  <form action="" onSubmit={handleSubmit}>
    <textarea value={defaultMarkdown} onChange = {(e) =>{handleMarkDown(e); handleContentChange(e)}}  className={showMarkDown ? 'display' : 'text-area'}>
    {productData}
    </textarea>
  </form>
    <div className={showMarkDown ? 'result-area' : 'display'} dangerouslySetInnerHTML={getMarkDown()}>
    </div>
  </div>
  </>
  )
}
export default App;

