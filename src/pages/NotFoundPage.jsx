import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main>
      <h1>404 - Page Not Found</h1>

      <p>Sorry, the page you're looking for doesn't exist.</p>

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
    </main>
  );
}

export default NotFoundPage;
