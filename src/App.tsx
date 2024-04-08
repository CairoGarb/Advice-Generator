import { useMediaQuery } from 'react-responsive'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function App() {

  const responsiveImage = useMediaQuery({ maxWidth: 500 })

  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState('');
  const [fetchAdvice, setFetchAdvice] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.adviceslip.com/advice');
        const { advice, id } = response.data.slip;
        setAdvice(advice);
        setAdviceId(id);
      } catch (error) {
        console.error('Error', error)
      }
    }

    if (fetchAdvice) {
      fetchData();
      setFetchAdvice(false)
    }

  }, [fetchAdvice]);

  const getData = () => {
    setFetchAdvice(true);
  }

  return (
    <div className="appContainer">

      <div className="wrapper">

        {/* Id Number */}
        <div className="adviceNumber">
          <p>Advice #<span id='id'>{adviceId}</span></p>
        </div>

        {/* Advice Quote */}
        <div className="adviceQuote">
          <p>{advice}</p>
        </div>

        {responsiveImage ? (
          <div className="dividerMobile">
            <img src='./pattern-divider-mobile.svg' alt='divider' />
          </div>
        ) : (

          <div className="dividerDesktop">
            <img src='./pattern-divider-desktop.svg' alt='divider' />
          </div>
        )}

        <div className="dice" onClick={getData}>
          <img src='./icon-dice.svg' alt='dice icon' />
        </div>

      </div>

    </div>
  )
}