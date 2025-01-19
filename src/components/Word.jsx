import { useEffect, useRef } from 'react'
import playIcon from '../assets/images/icon-play.svg'
import newWindowIcon from '../assets/images/icon-new-window.svg'
import Meaning from './Meaning';

const Word = ({data,setInput, setQueryParams}) => {
    const validPhonetics = data?.phonetics?.find(phonetics => phonetics.text && phonetics.audio);
    console.log(validPhonetics);
    
    const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio(validPhonetics?.audio)
  }, [data])

  const playAudio = () => audioRef.current?.play();
  return (
    <main className="mt-10 mb-[5.25rem] tablet:mt-11 tablet:mb-[7.75rem]">
              <div className="flex justify-between items-center">
        <div>
        <h1 className="text-mobile-heading-l tablet:text-heading-l tablet:leading-heading-l font-bold tablet:mb-2">
            {data.word}
          </h1>
          <p className="text-purple text-body-m leading-body-m tablet:text-heading-m tablet:leading-heading-m">
            {validPhonetics?.text}
          </p>
        </div>    {validPhonetics?.audio && (
          <button aria-label="Play" onClick={playAudio}>
            <img src={playIcon} aria-hidden="true" alt="Play icon" className="w-[48px] tablet:w-[75px]" />
          </button>
        )}
      </div>

 {/* Meanings */}
 <div>
        { data && data.meanings?.map((meaning, index) => (
          <Meaning key={index} meaning={meaning} setInput={setInput} // Pass setInput to update the input field
          setQueryParams={setQueryParams}  />
        ))}
      </div>

      <div className="mt-8 tablet:mt-[2.375rem] pt-6 tablet:pt-[1.125rem] border-t-1 border-t-[1px] border-t-gray-2 dark:border-t-black-4 text-body-s leading-body-s tablet:flex items-center">
        <div className="text-gray mb-2 underline tablet:mr-5 tablet:mb-0">Source</div>
        <div className="flex">
          <a href={data.sourceUrls[0]} className="underline mr-2" target="_blank">
            {data.sourceUrls[0]}
          </a>
          <img src={newWindowIcon} alt="External link" />
        </div>
      </div>
        </main>
  )
}

export default Word