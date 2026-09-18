function AboutPage() {
  return (
    <div className="paper-page">
      <div className="paper-padding">
        <h1>About</h1>
      </div>
      <div className="paper-content">
        <div className="paper-padding">
          <section className="paper-section">
            <h2>About This Todo App</h2>
            <p>
              This todo app showcases React.js concepts I've learned through
              classwork with Code the Dream, a non-profit located in Durham, NC.
            </p>
          </section>

          <section className="paper-section">
            <h2>App Features</h2>
            <ul>
              <li>Add and edit todos to a list</li>
              <li>Mark tasks as completed</li>
              <li>Filter and sort through todos</li>
              <li>Log in securely to access todos</li>
            </ul>
          </section>

          <section className="paper-section">
            <h2>Technologies Used</h2>
            <ul>
              <li>React</li>
              <li>React Router</li>
              <li>Vite</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
