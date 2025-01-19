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
        </main>
  )
}

export default Word