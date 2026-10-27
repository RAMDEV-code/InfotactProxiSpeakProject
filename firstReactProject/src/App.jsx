import { useState, useEffect } from 'react'
import './App.css'
import ParticipantCard from './components/participantCard.jsx'


function App() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
  async function fetchParticipants() {
    try {
      const response = await fetch(
        'http://localhost:5000/api/participants'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch participants')
      }

      const result = await response.json()
      setParticipants(result.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchParticipants()
}, [])

  return (
    <main className="app">
      <header className="app-header">
        <h1>ProxiSpeak</h1>
        <p>Move closer. Join the conversation.</p>
      </header>

      <section className="office">
    <h2>Virtual Office</h2>

    <button
      type="button"
      onClick={() => setIsSpeaking((current) => !current)}
    >
      {isSpeaking ? "Stop speaking" : "Start speaking"}
    </button>

    <form
  onSubmit={async (event) => {
    event.preventDefault()
    setAdding(true)
    setError('')

    try {
      const response = await fetch(
        'http://localhost:5000/api/participants',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            role,
            x: 150,
            y: 180
          })
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message || 'Could not add participant'
        )
      }

      setParticipants((current) => [...current, result.data])
      setName('')
      setRole('')
    } catch (err) {
      setError(err.message)
    } finally {
      setAdding(false)
    }
  }}
>
  <input
    type="text"
    placeholder="Participant name"
    value={name}
    onChange={(event) => setName(event.target.value)}
    required
  />

  <input
    type="text"
    placeholder="Participant role"
    value={role}
    onChange={(event) => setRole(event.target.value)}
    required
  />

  <button type="submit" disabled={adding}>
    {adding ? 'Adding...' : 'Add participant'}
  </button>
</form>

    <div className="office-room">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="office-person"
          style={{
            left: `${Math.min(participant.x, 500)}px`,
            top: `${participant.y}px`
          }}
        >
          <ParticipantCard
            name={participant.name}
            role={participant.role}
            status={
              participant.name === "You"
                ? (isSpeaking ? "Speaking" : "Listening")
                : participant.status
            }
          />
        </div>
      ))}
    </div>
</section>

      </main>
  )
}

export default App











// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
