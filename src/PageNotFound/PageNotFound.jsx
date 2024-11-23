
const PageNotFound = () => {
  return (
    <div className="min-h-100">
      <div className="ms-3 me-3 justify-content-center align-items-center text-center">
        <img
          src="https://th.bing.com/th/id/R.caf2dc218dd304eccdc25c23748722d9?rik=k%2fhfF8ZMJrb5ng&riu=http%3a%2f%2fwww.soephole.go.th%2fimg%2f404.png&ehk=rVAF7WI7NRJ9XUXwsLz8zlZNekU5SOiyuDA6ld357FQ%3d&risl=&pid=ImgRaw&r=0"
          alt="Page Not Found"
          className="img-fluid w-44 mt-5"
        />
        <h2 className="custom-page-notfound fw-bold"> We&#39;re Working on It.</h2>
        <a href="/locations"><button className="custom-btn rounded border-0 shadow">Back</button></a>
      </div>
    </div>
  );
}

export default PageNotFound;
