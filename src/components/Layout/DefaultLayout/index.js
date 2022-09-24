import Header from '../components/Header/Header'
import Sidebar from './Sidebar/Sidebar'

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </>
    )
}

export default DefaultLayout
