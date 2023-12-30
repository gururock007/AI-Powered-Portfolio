import { useState } from "react"
import axios from "./api/axios"
import ReactMarkdown from 'react-markdown'

const GET_INFO_URL = '/ask'

const App = () => {

  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')

  function handleForm (event) {
    setQuestion(() => (event.target.value))
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    setResponse('typing...')
    try {
      const response = await axios.post(
        GET_INFO_URL,
        JSON.stringify({'question': question}),
        {
          headers: {'Content-Type' : 'application/json'}
        }
        )
        const result = response.data.response
        console.log(result)
        setResponse(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" text-center container flex flex-col my-auto mx-auto h-screen">
      <div className=" text-5xl font-bold text-[#1e1e1e] p-10">PORTFOLIO</div>
      <div className=" bg-[#1e1e1e] rounded-xl text-[#C08497] p-10">
        <div className=" ">
          <form onSubmit={handleSubmit} className=" pb-5">
            <div className="flex items-center gap-10">
              <div className="w-4/5  rounded-xl">
                <input type="text"
                name="Question"
                onChange={handleForm}
                className=" bg-[#1e1e1e] focus:outline-none p-2 w-full"
                placeholder="Ask any question" />
              </div>
              <div className=" text-center w-1/5 border rounded-3xl hover:border-[#C08497] hover:text-white">
                <button className=" p-2" >
                  GET INFO
                </button>
              </div>
            </div>
          </form>
          <div className=" border border-[#C08497]/50 text-white text-left p-2 h-[40vh] rounded-md pt-2 overflow-scroll">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
