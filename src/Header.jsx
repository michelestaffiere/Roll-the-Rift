const Header = () =>{
    const handleThemeChange = () =>{
        
    }
    return(
        <section className="header">
           <div>
            <button className="ThemeChange" onClick={handleThemeChange}> Theme Change</button>
           </div>
            <div className="logo">
            <img src="/src/assets/svg's/logo-no-background.svg" alt="Welcome to Roll The Rift!" />
            </div>
        </section>
    )
}

export default Header