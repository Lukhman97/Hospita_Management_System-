import "./Breadcrumb.css";

export default function Breadcrumb({ username = "User" }) {
  return (
    <div className="breadcrumb-wrapper">
      <div className="breadcrumb-container">
        <div className="breadcrumb-user">
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg"
            alt="User Avatar"
          />
          <span>Hello, {username}</span>
        </div>
      </div>
    </div>
  );
}
