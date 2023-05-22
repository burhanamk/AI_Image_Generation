import React from 'react'
import "./homepage.css"
import { useState,useRef} from 'react'
import { Radio } from 'react-loader-spinner'

const Homepage = () => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [imgLink,setImgLink]=useState("")
  const [error,setError]=useState("")
  const ref=useRef()
  
  
  const handleChange=(e)=>{
      setQuery(e.target.value)
  }

  const handleKey = (e) => {
    if (e.keyCode == 13) {
        handleSubmit(e)
    }
}



  const handleSubmit = async (e) => {
    e.preventDefault()
    const new_query=query.trim()
    
    if(new_query.length<=0){
          return
    }
    const temp=new_query;
    ref.current.style.display="none"
    setQuery("")
    setImgLink("")
    setLoading(true)
    const response = await fetch("http://localhost:5000/api/genImg", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: temp
      })
    })

    if (response.status >= 200 && response.status <= 299) {
      const jsonData = await response.json()
      setImgLink(jsonData.imgLink)
      setLoading(false)
      ref.current.style.display="block"
      setError(false)
      ref.current.innerText="Image generated successfully."
    }
    else {
      const jsonData = await response.json()
      console.log(jsonData)
      setLoading(false)
      ref.current.style.display="block"
      setError(true)
      ref.current.innerText="Something went wrong"
    }
  }



  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1 text-center">AI-Image-Generation</span>
        </div>
      </nav>
      <div className='row'>
        <div className='col-md-4 col-12' id='imageForm'>
          <form class="row g-3" onSubmit={handleSubmit}>
            <div class="mb-1">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Give Me Any Instruction To Generate Image' onChange={handleChange} onKeyUp={handleKey} value={query} required></textarea>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-3">Submit</button>
            </div>
          </form>
        </div>
        <div className='col-md-8 col-12' id='imageWrapper'>
          <div id='imageContainer'>
            {loading && <div id='loader'>
              <Radio
                visible={loading}
                height="80"
                width="80"
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClass="radio-wrapper"
              />
            </div>}
           {imgLink ? <img src={imgLink} id="AIImg"></img>:
             "Image will appear here"}
          </div>
          <p ref={ref} id="alertP" style={{color:error?"red":"green"}}></p>
        </div>
      </div>
    </>
  )
}

export default Homepage