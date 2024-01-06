import BlackOverlay from "@/AtomicComponents/BlackOverlay";
import Footer from "@/AtomicComponents/Footer";
import Nav from "@/AtomicComponents/Nav";
import globalApi from "./api";
import { setConfig } from "@/infrastructure/api/user/userRequest";
import { getAListing } from "@/services/request";
import { Trash } from "heroicons-react";
import Swal from "sweetalert2";
import { LocationMarker } from "heroicons-react";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import TimeAgo from "react-timeago";
import PictureModal from "./PictureModal";
import { SpinnerCircular } from "spinners-react";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const EachProperty = () => {
  const top = useRef(null);
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]); // Images for the modal

  const features = ["Balcony", "Air Conditioning", "Jacuzzi"];

  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState("");

  const fetchData = async (id) => {
    let data = await getAListing(id);
    // console.log(data);
    setListing(data?.data);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
    setData(JSON.parse(localStorage.getItem("user")));
    // console.log(UseGetUserDetails())
    // console.log(data)
    scrollToRef(top);
  }, [id]);

  const formatDesc = (text) => {
    const itemsArray = text.split("- [ ] ");
    return itemsArray;
  };

  const deleteListings = () => {
    axios
      .delete(`${globalApi}/listings/delete/${id}`, setConfig())
      .then((resp) => {
        console.log(resp.data);
        router.back();
      })
      .catch((err) => console.log(err));
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete this Property?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteListings();
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
      }
    });
  };

  //
  return (
    <>
      <Nav active={listing?.category?.slug === "real-estate" ? 1 : 2} />

      <div className="h-0 w-0" ref={top}></div>
      {listing ? (
        <div className="mt-32 mx-xPadding text-center">
          <div className="mt-32 mx-xPadding">
            <h2 className="font-[600] text-[1.5em]">{listing?.title}</h2>
            <p className="font-[600]">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(listing?.price)}
            </p>
            <p className="flex text-center justify-center">
              <LocationMarker />
              {listing?.location && listing?.location.replace(/#/g, ", ")}.
            </p>
          </div>

          <div className="mt-10 gap-3 grid">
            {!isModalOpen && (
              <>
                <img
                  src={listing?.images[0]}
                  alt=""
                  className="h-[400px] rounded-lg"
                />

                <div className="grid grid-cols-3 gap-3">
                  <img
                    src={listing?.images[1]}
                    alt=""
                    className="h-[200px] rounded-lg"
                  />
                  <img
                    src={listing?.images[2]}
                    alt=""
                    className="h-[200px] rounded-lg"
                  />
                  <a
                    href={
                      listing?.category.slug === "real-estate"
                        ? `/real-estate/${id}/media`
                        : `/automobile/${id}/media`
                    }
                    className="relative cursor-pointer"
                  >
                    <img
                      src={listing?.images[3]}
                      alt=""
                      className="h-[200px] rounded-lg"
                    />
                    <BlackOverlay height="200px" r="rounded-lg" />
                    <p className="absolute h-[200px] top-0 flex justify-center text-[3.7em] items-center text-white font-[500] text-center w-[100%]">
                      +{listing?.images.length - 4}
                    </p>
                  </a>
                </div>
              </>
            )}

            <div>
              <p>
                Listed <TimeAgo date={listing?.createdAt} />
              </p>

              <a
                href={
                  listing?.category.slug === "real-estate"
                    ? `/real-estate/${id}/media`
                    : `/automobile/${id}/media`
                }
                className="block"
              >
                <button
                  className="bg-primary1 text-black px-12 py-3 text-[0.8em] font-[600] rounded-md"
                  // onClick={() => openModal([...listing.images])}
                >
                  View Media
                </button>
              </a>
            </div>
          </div>

          <div className="details flex flex-col items-start my-10">
            <p className="font-[700] text-[1.2em]">Amenities</p>
            {listing?.features.map((item, i) => {
              return <p className="text-gray-700 text-justify">{item}</p>;
            })}
          </div>

          <div className="grid grid-cols-2 gap-6 my-10 items-start justify-start md:grid-cols-1">
            <div className="items-start flex flex-col">
              <p className="font-[700] text-[1.2em]">Description</p>
              <p className="flex flex-col items-start text-justify">
                {formatDesc(listing?.description).map((item, i) => {
                  return <p className="text-gray-700">{item}</p>;
                })}
              </p>
            </div>

            {listing?.postedBy?._id !== data?._id ? (
              <>
                <div className="flex items-start flex-col text-start">
                  <p className="font-[700] text-[1.2em]">Contact Seller</p>

                  <div className="bg-primary1 w-[90%] md:w-full grid grid-cols-2 sm:flex sm:flex-col-reverse gap-5 p-10 items-center rounded-xl">
                    <div className="flex items-start flex-col text-start text-white gap-2">
                      <p className="font-[600]">
                        {listing?.postedBy.firstName +
                          " " +
                          listing?.postedBy.lastName}
                      </p>
                      <p className="text-[0.8em]">
                        {listing?.postedBy.address}
                      </p>
                      <p>Joined 2023</p>

                      <div className="flex flex-wrap gap-3 w-full text-[0.8em]">
                        <a
                          href={`https://wa.me/${
                            "+234" + listing?.postedBy.phoneNumber1
                          }?text=Hi%20${
                            listing?.postedBy.firstName
                          }%2C%20i%20am%20messaging%20you%20to%20request%20for%20this%20property%20-%20https%3A%2F%2Fcream.business%2Freal-estate%2F${
                            listing?._id
                          }`}
                        >
                          <button className="py-2 px-3 bg-black rounded-md">
                            Send Message
                          </button>
                        </a>

                        <button className="py-2 px-3 bg-black rounded-md">
                          View
                        </button>
                      </div>
                    </div>

                    <img
                      src={listing?.postedBy.profilePicture}
                      alt={listing?.postedBy.firstName}
                      className="h-[160px] rounded-tl-3xl rounded-br-3xl border-2 border-white"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="cflexsm gap-[10px]">
                  <h3>Delete Listing</h3>
                  <p className="text-[#646464]">
                    Once you delete a listing, it cannot be reversed
                  </p>
                  <div
                    className="bg-[#c80a0a] rounded-[10px] flexmm gap-[3px] w-full p-[10px] text-[14px] cursor-pointer"
                    onClick={confirmDelete}
                  >
                    <Trash color="white" /> Delete Listing
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-32">
          <SpinnerCircular
            color="white"
            className="flex justify-center"
            secondaryColor={"#F2BE5C"}
            size={50}
            thickness={150}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default EachProperty;
