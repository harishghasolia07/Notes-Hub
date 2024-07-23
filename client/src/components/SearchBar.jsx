import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";


const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");

  const user = useSelector((state) => state.user.userData);

  const username = user.userName; 

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const notes = await axios.get("http://localhost:5000/notes/getFiles", {
        params: {
          title: searchQuery,
        },
      });

      if (notes.data.data.length > 0) {
        setSearchResults(notes.data.data);
        setSearchStatus("Found");
      } else {
        setSearchResults([]);
        setSearchStatus("Not-Found");
      }
    } catch (error) {
      console.log("Error Fetching Notes: ", error);
    }
  }

  const showPDF = async (files) => {
    window.open(`http://localhost:5000/files/${files}`, "_blank", "noreferrer");
  };



  return (
    <div className="h-heightWithoutNavbar flex flex-col items-center justify-start p-4">
      <div className="flex w-full items-center justify-center">
        <form className="w-full max-w-[700px] rounded-xl bg-[#374151] p-4 hover:border border-blue-700" onSubmit={handleSearch}>
          <div className="flex items-center justify-between">
            {/* Search logo */}
            <FaSearch className="text-2xl text-white" />    
            {/* input */}
            <input
              type="search"
              placeholder="Search for Notes"
              className="ml-3 w-full bg-[#374151] outline-none text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              />
            <button
              type="submit"
              className=" bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
      {/* documents */}
      <div className="h- w-full mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* <div className="border border-red-500 w-[290px] bg-[#374151] text-white flex justify-between items-center px-4 py-2 rounded-xl">
          <p className="">
          <span className="font-bold">File Name :</span>{" "}
          <span>Sem 6</span>
          </p>
          <button className="bg-blue-500 px-3 py-2 font-bold  hover:bg-blue-600 rounded-xl">Show Pdf</button>
        </div> */}
        {/* {
          Array(6).fill(true).map((item,i) => (
            <div 
            key={i}
            className="border w-[290px] bg-[#374151] text-white flex justify-between items-center px-4 py-2 rounded-lg">
            <p className="">
            <span className="font-bold">File Name :</span>{" "}
            <span>Sem 6</span>
            </p>
            <button className="bg-blue-500 px-3 py-2 font-bold  hover:bg-blue-600 rounded-xl">Show Pdf</button>
            </div>
          ))
        } */}

        {searchStatus === "Found" && searchResults.length > 0 && searchResults.map((notes) => (
          <div
            key={notes._id}
            className="flex w-full max-w-[300px] flex-wrap-reverse items-center justify-between rounded-xl bg-[#374151] px-3 py-2 text-white shadow-lg"
          >
            <p className="mt-2 text-sm">
              <span className="font-bold">File name: </span>
              <span >{notes.fileName} </span>
            </p>

            <button onClick={() => showPDF(notes.files)}>
              Show PDF
            </button>

          </div>

        ))}

        {searchStatus === "Not-Found" && (
          <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
            No Notes Found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
