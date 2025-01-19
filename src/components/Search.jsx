import { useState, useEffect } from 'react'

export default function Search({ input, setInput, setQueryParams, fetchData }) {
    console.log("searchForWorkspaceRoot");
    

  const [isValid, setIsValid] = useState(true)

  // Apply a red border if the input is invalid
  const invalidClass = !isValid ? 'border-[1px] border-red' : ''


  // Handle changes in the input field
  function handleChange(event) {
    setInput(event.target.value)
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault()

    // If input is empty, set it as invalid
    if (input.length < 1) {
      setIsValid(false)
      return
    }

    // If input is valid, update the query parameter and set it as valid
    setIsValid(true)
    setQueryParams({ word: input })
    
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field with dynamic class based on validity */}
      <input
        className={`w-full bg-gray-3 dark:bg-black-2 leading-[1.25rem] rounded-2xl py-[0.875rem] pl-6 pr-14 tablet:py-5 tablet:pl-6
        tablet:pr-18 text-default tablet:text-20 font-bold bg-search bg-no-repeat bg-right-4 placeholder:text-gray outline-none  focus:outline-purple ${invalidClass}`}
        value={input}          
        onChange={handleChange} 
        placeholder="Search for any word…" 
      />
      
      {/* Show an error message if the input is invalid */}
      {!isValid && <div className="text-red mt-2">Whoops, can’t be empty…</div>}
    </form>
  )
}
