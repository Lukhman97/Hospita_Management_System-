import { Link } from "react-router-dom";
import "./BlogPage.css"
const BlogPage = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Recent Posts</h2>
        <p className="text-muted w-75 mx-auto">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </div>

      <div className="row">
        {/* Blog Card 1 */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <img
              src="https://mdbootstrap.com/img/Photos/Others/images/81.jpg"
              className="card-img-top"
              alt="Blog 1"
            />
            <div className="card-body">
              <h6 className="text-danger fw-bold">Adventure</h6>
              <h5 className="card-title fw-bold">Title of the news</h5>
              <p className="text-muted small">
                by Billy Forester • 15/07/2018
              </p>
              <p className="card-text">
                Nam libero tempore, cum soluta nobis est eligendi optio cumque
                nihil impedit quo minus.
              </p>
              <Link to="#" className="btn btn-danger btn-sm">
                Read More
              </Link>
            </div>
          </div>
        </div>

        {/* Blog Card 2 */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <img
              src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
              className="card-img-top"
              alt="Blog 2"
            />
            <div className="card-body">
              <h6 className="text-warning fw-bold">Education</h6>
              <h5 className="card-title fw-bold">Title of the news</h5>
              <p className="text-muted small">
                by Billy Forester • 13/07/2018
              </p>
              <p className="card-text">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis voluptatum.
              </p>
              <Link to="#" className="btn btn-warning btn-sm text-white">
                Read More
              </Link>
            </div>
          </div>
        </div>

        {/* Blog Card 3 */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <img
              src="https://mdbootstrap.com/img/Photos/Others/images/13.jpg"
              className="card-img-top"
              alt="Blog 3"
            />
            <div className="card-body">
              <h6 className="text-info fw-bold">Culture</h6>
              <h5 className="card-title fw-bold">Title of the news</h5>
              <p className="text-muted small">
                by Billy Forester • 11/07/2018
              </p>
              <p className="card-text">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit.
              </p>
              <Link to="#" className="btn btn-info btn-sm">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
