  import React from "react";
  import { useState } from "react";
  import { useSelector } from "react-redux";
  import axios from "axios";
  import { useNavigate } from "react-router-dom"; 



  const UploadNote = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState("");

    const user = useSelector((state) => state.user.userData);
    const userId = user._id;

    const navigate = useNavigate();

    const submitFile = async (e) =>{
      try{
          e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("tags", tags);
        formData.append("file", file);
        formData.append("userId", userId);

        console.log(title,desc,tags,file,userId)

        const result = await axios.post(
          "http://localhost:5000/notes/upload", 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log("Data: ",result);
        alert("Notes Uploaded Successfully");
        navigate("/");
      }
      catch(err){
        console.log("Failed to upload file",err);
      }
    }

    return (
      <form className="flex h-full w-full max-w-[800px] flex-col items-center justify-start p-5 lg:justify-center md:border md:border-gray-300" onSubmit={submitFile}>
        <h1 className="mb-5 text-2xl font-black">Upload Your Notes</h1>

        {/* Input Fields */}
        <div className="mb-5 w-full max-w-[550px] ">
          <input
            type="text"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none"
          />
        </div>
        <div className="mb-5 w-full max-w-[550px] ">
          <input
            type="text"
            placeholder="Description"
            required
            onChange={(e) => setDesc(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none"
          />
        </div>
        <div className="mb-5 w-full max-w-[550px] ">
          <input
            type="text"
            placeholder="Tags"
            required
            onChange={(e) => setTags(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none"
          />
        </div>

        {/* upload */}
        <div className="flex w-full max-w-[550px] items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100  "
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2 "
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to Upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500">PDF</p>
              <input
                type="file"
                placeholder="File"
                accept="application/pdf"
                required
                id="dropzone-file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"   
              />
            </div>
          </label>
        </div>
        <button className="my-5 w-full max-w-[550px] rounded-xl bg-blue-500 px-5 py-3 font-bold text-white hover:bg-blue-600 " type="submit">Submit</button>
      </form>
    );
  };

  export default UploadNote;
