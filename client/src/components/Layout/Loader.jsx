import React from 'react'
import '../../assets/css/Loader.scss'

export default function Loader() {
  return (
    <>
      <div className="loading">
        <div className="finger finger-1">
          <div className="finger-item">
            <span></span><i></i>
          </div>
        </div>
        <div className="finger finger-2">
          <div className="finger-item">
            <span></span><i></i>
          </div>
        </div>
        <div className="finger finger-3">
          <div className="finger-item">
            <span></span><i></i>
          </div>
        </div>
        <div className="finger finger-4">
          <div className="finger-item">
            <span></span><i></i>
          </div>
        </div>
        <div className="last-finger">
          <div className="last-finger-item"><i></i></div>
        </div>
      </div>

      <div className="credits-info">
        <h1>Hey Hacker! Be prepared...</h1>
      </div>
    </>
  )
}
