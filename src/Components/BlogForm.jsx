import Footer from "@/AtomicComponents/Footer";
import Nav from "@/AtomicComponents/Nav";
import { postArticle } from "@/services/request";
import React, { useEffect, useState } from "react";
import RealEstate from "./RealEstate";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: ``,
    category: "640e4a12975b9d627cbc5e4f",
    cover: { base64: "" },
  });

  const category_id = {
    "Real Estate": "640e4a12975b9d627cbc5e4f",
    Automobile: "640e4a13975b9d627cbc5e51",
  };

  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn == null) {
      alert("You have to be logged in to post an article");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // const token = localStorage.getItem("token");
  // console.log("token:", token);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData({
        ...formData,
        [name]: category_id[value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          cover: { base64: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // useEffect(() => {
  //   console.log("image: ", formData);
  // }, [formData.cover, formData.category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("You are not logged in, log in to post an article");
      return;
    }
    // Send the formData to your API endpoint
    const response = await postArticle(formData);
    console.log(formData);
    // Reset the form after submission
    if (response == true) {
      setFormData({
        title: "",
        body: ``,
        category: "Real Estate",
        cover: { base64: "" },
      });
    }
  };

  return (
    <>
      <Nav active={6} />
      <div className="justify-center flex bg-gray-300">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-[70vw]  sm:w-[90vw] my-24"
        >
          <h2 className="text-2xl font-bold mb-6">Create a New Blog Post</h2>

          <div className=" grid grid-cols-2 gap-6 ">
            <div>
              <label
                htmlFor="title"
                className="block mb-1 text-gray-700 font-bold"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary1"
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block mb-1 text-gray-700 font-bold"
              >
                Category:
              </label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary1"
                id="category"
                name="category"
                //value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Real Estate">Real Estate</option>
                <option value="Automobile">Automobile</option>
              </select>
            </div>
          </div>

          <label
            htmlFor="body"
            className="block mb-1 mt-2 text-gray-700 font-bold"
          >
            Body:
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary1 resize-none"
            rows="10"
            onChange={handleInputChange}
            required
          />

          <label
            htmlFor="coverImage"
            className="block mb-1 mt-2 text-gray-700 font-bold"
          >
            Cover Image:
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary1"
            onChange={handleCoverChange}
            required
          />

          {formData.cover.base64 && (
            <div className="w-25 h-30">
              <img
                src={formData.cover.base64}
                alt="Cover Preview"
                className="mt-4 mb-4 rounded-lg w-full h-full object-cover "
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-primary1 text-black px-12 py-2 rounded-md hover:bg-primary1 mt-2"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BlogForm;
