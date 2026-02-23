import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <section className="not-found">
      <div className="not-found__card">
        <p className="not-found__code">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="not-found__action">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
