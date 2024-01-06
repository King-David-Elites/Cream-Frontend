import React from "react";
import { useState, useEffect } from "react";
import { X } from "heroicons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import axiosRequest from "@/services/axiosConfig";
import Loader from "@/AtomicComponents/Loader/Loader";
import { useRouter } from "next/router";
import { success } from "@/services/toaster";

const CreateCarListing = () => {
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);
  const [changing, setChanging] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [size, setSize] = useState(0);
  const [loader, setLoader] = useState(false);
  const [loadImage, setLoadImage] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const navigate = useRouter();

  const [userListings, setUserListings] = useState({
    title: "",
    location: "",
    //locationISO: "",
    attachedDocuments: [""],
    category: "640e4a13975b9d627cbc5e51",
    description: "",
    forRent: false,
    images: images,
    videos: videos,
    price: "",
    year: new Date().getFullYear(),
    //carCondition: "New",
    //engineType: "",
    //color: "",
    features: [],
    model: "",
  });

  useEffect(() => {
    console.log("form:", userListings);
  }, [userListings.forRent]);

  useEffect(() => {
    setLoadImage(loadImage);
    userListings["images"] = images;
    userListings["videos"] = videos;
    if (allImages.length !== 0 && loadImage === true) {
      Load(allImages, "image", size);
    }
    if (allVideos.length !== 0 && loadImage === false) {
      Load(allVideos, "video", size);
    }
  }, [loaded, loadImage]);

  useEffect(() => {
    userListings["images"] = images;
    userListings["videos"] = videos;
    if (
      userListings["title"] &&
      userListings["description"] &&
      userListings["features"] &&
      // userListings["model"] &&
      userListings["price"] &&
      // userListings["carCondition"] &&
      // userListings["engineType"] &&
      // userListings["colour"] &&
      userListings["images"].length >= 4 &&
      userListings["location"]
    ) {
      setValid(true);
      setError(false);
    } else {
      setValid(false);
      setError(true);
    }
  }, [changing]);

  const Load = (base64, type, size) => {
    if (type === "image") {
      if (size <= 52428800 && size !== 0) {
        setImages(
          images.concat(
            base64.filter(
              (items) =>
                items.type === "image/jpeg" ||
                items.type === "image/png" ||
                items.type === "image/gif"
            )
          )
        );
      }
    }
    if (type === "video") {
      if (size <= 52428800 && size !== 0) {
        setVideos(base64.filter((items) => items.type === "video/mp4"));
      }
    }
    setChanging(!changing);
  };

  const setConfig = () => {
    const authToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        ContentType: "application/json",
      },
    };

    return config;
  };

  const formatedPrice = (price) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  const acceptNumbersOnly = (name, value) => {
    var numeric = /^[0-9,]+$/;
    if (numeric.test(value) && value >= 0) {
      console.log("yea");
      setUserListings({ ...userListings, [name]: formatedPrice(value) });
      setChanging(!changing);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "price") {
      let price = parseInt(value.replace(/,/g, "")) || 0;
      acceptNumbersOnly(name, price);
    } else {
      setUserListings({ ...userListings, [name]: value });
      setChanging(!changing);
    }
  };
  const priceAsInteger = (price) => parseInt(price, 10); // 10 is the radix (base) for the conversion
  const category_id = {
    "Real Estate": "640e4a12975b9d627cbc5e4f",
    Automobile: "640e4a13975b9d627cbc5e51",
  };

  const postUserListings = async (userListings) => {
    await axiosRequest
      .post(
        `/listing`,
        {
          ...userListings,
          price: priceAsInteger(userListings.price),
          features: [userListings.features],
        },
        setConfig()
      )
      .then((resp) => {
        setLoader(false);
        success("response.data.message");
        navigate.push("/profile");
      })
      .catch((err) => {
        setLoader(false);
        setPopUp(true);
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    setLoader(true);
    postUserListings(userListings);
  };

  return (
    <>
      {loader && <Loader />}
      {popUp && (
        <>
          <div
            className="fixed w-full z-50 h-[100%] top-0 left-0 flex justify-center items-center"
            style={{ background: "rgba(0,0,0,0.5" }}
            onClick={() => {
              setPopUp(false);
            }}
          >
            <div className="md:w-1/3 md:h-1/3 w-2/3 h-1/4 bg-[white] flex justify-center rounded-xl items-center">
              <div className="flex flex-col justify-center items-center p-5">
                <p className="text-xl text-center font-bold">
                  Seems there is a connection error.{" "}
                  <span className="text-[#F2BE5C] block">
                    please try again!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="form_Content">
        <div className="section">
          <p>Location</p>
          <input type="text" name="location" required onChange={handleChange} />
        </div>
        <div className="section">
          <p>Brand Name</p>
          <input type="text" name="title" required onChange={handleChange} />
        </div>
        {/* <div className="section">
          <p>Car Model</p>
          <input type="text" name="model" required onChange={handleChange} />
        </div> */}
        <div className="section">
          <p>About the Car</p>
          <textarea
            type="text"
            name="description"
            required
            onChange={handleChange}
          />
        </div>
        <div className="section">
          <hr />
        </div>
        {/* 
        <p>Car Condition</p>
        <div className="NumbB">
          <div className="sec">
            <select name="carCondition" required onChange={handleChange}>
              <option value="New">New</option>
              <option value="Used">Preowned</option>
            </select>
          </div>
        </div>
        <p>Engine Type</p>
        <div className="NumbB">
          <div className="sec">
            <input
              type="text"
              name="engineType"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <p>Color</p>
        <div className="NumbB">
          <div className="sec">
            <input type="text" name="colour" required onChange={handleChange} />
          </div>
        </div> */}
        <p>Other Features</p>
        <div className="NumbB">
          <div className="sec">
            <input
              type="text"
              name="features"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="section">
          <hr />
        </div>
        <div className="rental">
          <div className="sect">
            <p>For Sale</p>
            <input
              type="checkbox"
              name="forRent"
              checked={userListings["forRent"] === false ? true : false}
              onClick={() => {
                if (userListings["forRent"] === true) {
                  setUserListings({ ...userListings, forRent: false });
                } else {
                  setUserListings({ ...userListings, forRent: true });
                }
              }}
            />
          </div>
          <div className="sect">
            <p>For Rent</p>
            <input
              type="checkbox"
              name="forRent"
              checked={userListings["forRent"] === true ? true : false}
              onClick={() => {
                if (userListings["forRent"] === false) {
                  setUserListings({ ...userListings, forRent: true });
                } else {
                  setUserListings({ ...userListings, forRent: false });
                }
              }}
            />
          </div>
        </div>
        <div className="section">
          <hr />
        </div>
        <div className="section">
          <div className="sectionHead">
            <p>Images ({images.length})</p>
            <div className="browseCont">
              <p>Browse</p>
              <div className="browse">
                <FileBase64
                  name="images"
                  defaultValue={userListings.images}
                  multiple={true}
                  onDone={(base64Array) => {
                    setSize(0);
                    base64Array.forEach((item) => {
                      setSize(size + item.file["size"]);
                    });
                    const imagesArray = base64Array.map((item) => ({
                      base64: item.base64,
                    }));
                    console.log("images array", imagesArray);
                    setImages((prevImages) => [...prevImages, ...imagesArray]);
                    setAllImages(base64Array);
                    setChanging(!changing);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="chosenImages">
            {images.map((image) => {
              return (
                <div className="imgCont">
                  <img src={image.base64} alt="listedImage" />
                  <div
                    className="close"
                    onClick={() => {
                      setImages((images) => {
                        return images.filter(
                          (item) => item.base64 !== image.base64
                        );
                      });
                      setChanging(!changing);
                    }}
                  >
                    <X color="black" width="15px" />
                  </div>
                </div>
              );
            })}
          </div>
          {images.length !== 0 && (
            <>
              <div className="clearCont">
                <div
                  className="clear"
                  onClick={() => {
                    setImages([]);
                    setAllImages([]);
                    setChanging(!changing);
                  }}
                >
                  Clear All
                </div>
              </div>
            </>
          )}
          <div className="base">PNG, JPEG, GIF. Not more than 50mb.</div>
          <div className="base">
            mark and upload more than one high-quality images (At least 4).
            Listings with low quality images may be rejected.
          </div>
        </div>
        <div className="section">
          <div className="sectionHead">
            <p>Video</p>
            <div className="browseCont">
              <p>Browse</p>
              <div className="browse">
                <FileBase64
                  name="videos"
                  defaultValue={userListings.videos}
                  multiple={false}
                  onDone={(base64) => {
                    setSize(0);
                    setSize(base64.file["size"]);
                    setLoaded(!loaded);
                    setAllVideos([base64]);
                    setLoadImage(false);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="chosenImages">
            {videos.map((video) => {
              return (
                <>
                  <div className="videoCont">
                    <video width="300px" height="300px" controls>
                      <source src={video.base64} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div
                      className="close"
                      onClick={() => {
                        setVideos([]);
                        setAllVideos([]);
                        setChanging(!changing);
                      }}
                    >
                      <X color="black" width="15px" />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="base">MP4. Not more than 50mb</div>
          <div className="base">
            upload a clear video displaying the views (optional)
          </div>
        </div>
        <div className="NumbB">
          <div className="sect">
            {userListings["forRent"] === true ? (
              <p>Price per Day</p>
            ) : (
              <p>
                <p>Price</p>
              </p>
            )}
            <div className="price">
              <input
                type="text"
                name="price"
                required
                value={userListings["price"]}
                onChange={handleChange}
              />
              <select>
                <option>NGN</option>
              </select>
            </div>
          </div>
        </div>
        <div className="NumbB">
          <div
            className={valid ? "enable" : "disable"}
            onClick={valid && handleSubmit}
          >
            List
          </div>
        </div>
        {error && (
          <p className="error">
            Please fill in the required fields. Selected Images must be more
            than 4 (four)
          </p>
        )}
      </div>
    </>
  );
};
export default CreateCarListing;
