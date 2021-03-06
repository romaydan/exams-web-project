import { Link, NavLink } from 'react-router-dom';

const NavBar = (props) => {
  const { organization, admin } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Administration System {organization && `- ${organization.name}`}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!admin && (
            <>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </>
          )}

          {admin && (
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
