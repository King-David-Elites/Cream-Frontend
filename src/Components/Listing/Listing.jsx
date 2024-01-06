import axios from "axios";
import { Heart, HeartOutline, LocationMarker } from "heroicons-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import globalApi from "../../api";
import { setConfig } from "../../infrastructure/api/user/userRequest";
import { Container } from "./Listing.styled";
import services from "../../ioc/services";

const Listing = ({ list, type }) => {
  const [loved, setLoved] = useState(false);
  const [id, setId] = useState(list._id);
  const postedBy = list.postedBy?.email;
  const user = useSelector((state) => state.user);
  const userEmail = user.email;

  const saveListing = async () => {
    setId(id);
    await axios
      .patch(`${globalApi}/listing/${id}`, id, setConfig())
      .then((resp) => {
        if (resp.data.status === 1) {
          console.log(resp.data);
          services.toast.success("You liked this post");
        }
      })
      .catch((err) => services.toast.error(err));
  };

  const unSaveListing = async () => {
    await axios
      .patch(`${globalApi}/listing/${id}`, id, setConfig())
      .then((resp) => {
        if (resp.data.status === 0) {
          services.toast.success("You unlike this post");
        }
      })
      .catch((err) => console.log(err));
  };

  const truncate = (text, txtLimit) => {
    let limit = txtLimit || 30;
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    } else {
      return text;
    }
  };

  const formatLocation = (location) => {
    let list = null;
    if (location) {
      list = location.split("#");
      list = list.join(", ");
    }

    return list;
  };

  const navigate = useNavigate();
  const fullName = list.postedBy.firstName + " " + list.postedBy.lastName;

  const redirect = (id) => {
    navigate(id);
  };
  return (
    <Container>
      {list.category.title !== "Collectibles" && (
        <Link
          to={
            postedBy !== userEmail
              ? `/profile/${list.postedBy?._id}`
              : "/profile"
          }
          className="btn"
        >
          {postedBy === userEmail ? (
            <div className="profile hidden">
              <img src={list.postedBy.profilePicture} alt="" />
              <h4>{truncate(fullName, 25)}</h4>
            </div>
          ) : (
            <div className="profile">
              <img src={list.postedBy.profilePicture} alt="" />
              <h4>{truncate(fullName, 25)}</h4>
            </div>
          )}
          {/* <div className="profile">
            <img src={list.postedBy.profilePicture} alt="" />
            <h4>{truncate(fullName, 25)}</h4>
          </div> */}
        </Link>
      )}
      <div className="image">
        <img src={list.images[0]} alt="" className="relative" />
        <div
          onClick={() => {
            setLoved(!loved);
          }}
          className="absolute top-3 left-3 bg-[#ffffff28] rounded-full p-2"
        >
          {postedBy !== userEmail && (
            <>
              {loved ? (
                <Heart
                  color="#FFDF00"
                  className="cursor-pointer"
                  onClick={unSaveListing}
                />
              ) : (
                <HeartOutline
                  color="#FFFF"
                  className="cursor-pointer"
                  onClick={() => saveListing()}
                />
              )}
            </>
          )}
        </div>
        <div
          className="view"
          onClick={() => {
            redirect(`${id}/media`);
          }}
        >
          View More
        </div>
      </div>

      <p className="title">{list.title}</p>
      {list.forRent === false ? (
        <p className="price">&#x20A6; {list.price.toLocaleString()}</p>
      ) : (
        <p className="price">&#x20A6; {list.price.toLocaleString()} /day</p>
      )}

      <p className="description">
        <LocationMarker size="16px" />{" "}
        {truncate(formatLocation(list.location), 40)}
      </p>

      {list.forRent === false ? (
        <div
          className="enquireNow"
          onClick={() => {
            redirect(id);
          }}
        >
          Enquire Now
        </div>
      ) : (
        <div
          className="enquireNow"
          onClick={() => {
            redirect(id);
          }}
        >
          Book Now
        </div>
      )}
    </Container>
  );
};

export default Listing;
