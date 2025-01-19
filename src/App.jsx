import { useEffect, useState } from 'react'
import fontNames from './utils/fontnames'
import fetchData from './utils/FetchData'
import './App.css'
import Header from './components/Header'
import Search from './components/Search'
import { BrowserRouter, useSearchParams } from 'react-router-dom'

import Loader from './components/Loader'
import Word from './components/Word'

function App() {
  const [currentFont, setCurrentFont] = useState(localStorage.getItem('current-font') ?? 'Serif')
  const fontClass = fontNames[currentFont]
  const [word, setWord] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [input, setInput] = useState(''); // Input for search field
  const [queryParams, setQueryParams] = useSearchParams(); 

  function handleFetchData(input) {
    fetchData(input, setWord, setIsLoading, setIsError);
  }
  
  useEffect(() => {
    const initialWord = queryParams.get('word') || 'keyboard'; // Default search word
    setInput(initialWord); // Set input to query parameter word
    handleFetchData(initialWord); // Fetch data on load
  }, [queryParams]);

  useEffect(() => {
    localStorage.setItem('current-font', currentFont)
  }, [currentFont])

  
  const errorElement = (
    <main className="my-20 tablet:my-[8.25rem] text-center">
      <div className="text-heading-l">😢</div>
      <h5 className="font-bold mt-5 tablet:mt-11">No Definitions Found</h5>
      <p className="mt-3 tablet:mt-6">
      Sorry, we couldn't find definitions for the word you were looking for. You can try searching again later, or you can explore alternative options on the web instead.
      </p>
    </main>
  )

  return (

     <div className={`${fontClass} desktop:container px-6 tablet:px-10 text-black-3 dark:text-white text-body-m`}>
     <Header  currentFont={currentFont} applyFont={setCurrentFont}/>
     <Search input={input} setInput={setInput} setQueryParams={setQueryParams} fetchData={handleFetchData} />
   {/* Show Loader if data is still loading */}
   {isLoading && <Loader />}

{/* Show Word data when available, and only if no errors */}
{word && !isError && !isLoading && <Word data={word}  setInput={setInput} // Pass setInput to update the input field
            setQueryParams={setQueryParams}  />}

{/* Show error if no data or error occurred */}
{isError && !isLoading && errorElement}
     </div>


  )
}

export default App
