    function AboutPage() {
        return (
            <main>
                <h1>About My Todo App</h1>
                <p>
                    This todo app showcases React.js concepts I've learned through classwork with Code the Dream, a non-profit located in Durham, NC.
                </p>

                <section>
                    <h2>App Features</h2>
                    <ul>
                        <li>Add and edit todos to a list</li>
                        <li>Mark tasks as completed</li>
                        <li>Filter and sort through todos</li>
                        <li>Log in securely to access todos</li>
                    </ul>
                </section>

                <section>
                    <h2>Technologies Used</h2>
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Vite</li>
                    </ul>
                </section>
            </main>
        )
    }
    
    export default AboutPage;