import { showSuccessMsg } from '../services/event-bus.service.js'
import { AppHeader } from '../cmps/AppHeader.jsx'

export function Home() {
    return <section className="container home">
        <AppHeader />
        <h1>Welcome home</h1>
        <div className="box-container">
        <button onClick={() => showSuccessMsg('Yep, that works')}>Show Msg</button>
            <div className="box1"></div>
            <div className="box2"></div>
        </div>
    </section>
}