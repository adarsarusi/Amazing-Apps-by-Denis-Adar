import { showSuccessMsg } from '../services/event-bus.service.js'
import { AppHeader } from '../cmps/AppHeader.jsx'

export function Home() {
    return <section className="container home">
        <AppHeader />
        <h1>Welcome home</h1>
        <div className="box-container">
          <h1>Welcome</h1>
        </div>
    </section>
}