export default function Navbar() {
    return (
        <nav>
            <div className="nav-app-title">
                <img src={require("../images/troll-face-logo.png")} alt="logo" />
                <h1>Meme Generator</h1>
            </div>
            <p>React Course - Project 3</p>
        </nav>
    );
}