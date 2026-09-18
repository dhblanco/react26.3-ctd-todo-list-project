import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="paper-page">
      <div className="paper-padding">
        <h1>404 - Page Not Found</h1>
      </div>
            <div className="paper-content">
        <div className="paper-padding">
          <h2>Sorry!</h2>
      <p>The page you're looking for doesn't exist.</p>

      <p>Try one of these pages:</p>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
      </ul>
    </div>
    </div>
    </div>
  );
}

export default NotFoundPage;
