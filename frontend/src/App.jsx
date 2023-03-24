import { useState } from "react";
import axios from "axios";
function App() {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState("");

async  function handlesubmit(event) {
    setLoading(true);
    event.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("video", file);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v2/compress",formData);
      if(response.data.status === "success"){
        setTimeout(()=>{
          setLoading(false);
          console.log(response.data.message);
        },4000);

      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div align="center" className="container">
      <h1>Let's compress some UHD videos</h1>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Compress Video
          </label>
          <input
            type="file"
            className="form-control"
            name="video"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
          {isLoading?"1":<button className="btn btn-success">compress</button>}
        </div>
      </form>
    </div>
  );
}

export default App;
