import Navbar from "./Navbar";
import '../styles/layout.css';

function Layout({children}) {
    return (
        <div className = "layout">
            <Navbar />
            <main className = "main-content">{children} </main>
        </div>
    );
}

export default Layout;