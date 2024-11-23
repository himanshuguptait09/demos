import logo from "/assets/logo.png";

const Footer = () => {
  return (
    <div className="container-fluid">
      <div className="footer ms-2">
        <span className="footer-span float-md-start d-block d-md-inline-block text-center mt-3 mb-1">COPYRIGHT © 2024
          <a href="https://www.rgcirc.org/" className="custom-link text-decoration-none">
            <img
              src={logo}
              alt="logo"
              className="rotate-flip"
              style={{ height: '1.7rem' }}
            />
          </a><a className="custom-link text-decoration-none" href="#" target="_blank">RGCI&amp;RC</a>
          <span className="d-none d-sm-inline-block">, All rights
            Reserved</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
