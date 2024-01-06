import Card from "@/AtomicComponents/Card";
import DynamicBanner from "@/AtomicComponents/DynamicBanner";
import Footer from "@/AtomicComponents/Footer";
import Nav from "@/AtomicComponents/Nav";
import { getListingsPerPage, sendQuery } from "@/services/request";
import React, { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import PaginationButtons from "@/AtomicComponents/PaginationButtons";
import { X } from "heroicons-react";
import { RiSearch2Line } from "react-icons/ri";

const Automobile = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const images = [
    "/pic7.jpg",
    "/pic5.jpg",
    "pic13.jpg",
    "pic15.jpg",
    "pic17.jpg",
    "pic6.jpg",
    "pic11.jpg",
  ];

  const fetchData = async () => {
    setLoading(true);
    let data = await getListingsPerPage(page, "cars");
    setListings(data?.list);
    setTotalData(data?.number);
    setLoading(false);
  };

  const [text, setText] = useState("");
  const handleSearch = (e) => {
    setText(e.target.value);
  };
  const submit = async () => {
    setLoading(true);
    let data = await sendQuery(text);
    let data1 = data.map((item) => {
      item.postedBy = {
        firstName: item["postedBy.firstName"],
        lastName: item["postedBy.lastName"],
        profilePicture: item["postedBy.profilePicture"],
      };
      return item;
    });
    setListings(data);
    // setTotalData(data.number);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <Nav active={2} />

      <DynamicBanner images={images}>
        <h1 className="text-white text-[4em]  sm:text-[40px] font-[700]">
          AUTOMOBILE <span className="text-primary1">.</span>
        </h1>
        <p className="text-white font-[600]">
          find new and preowned cars for sale
        </p>

        <div className="flex gap-3 items-center sm:flex-col sm:justify-center sm:w-full sm:items-center">
          <div className="flex gap-3 py-3 px-5 rounded-lg w-[40VW] sm:w-full items-center my-3 bg-white text-black">
            <RiSearch2Line />
            <input
              type="text"
              className="focus:outline-0 w-full"
              placeholder="Describe your desired car"
              value={text}
              onChange={handleSearch}
            />
            <X
              className="cursor-pointer"
              size="20px"
              onClick={() => setText("")}
            />
          </div>

          <button
            className="bg-primary1 text-black px-6 py-3  gap-2 flex items-center rounded-md"
            onClick={submit}
          >
            Search <RiSearch2Line />{" "}
          </button>
        </div>
      </DynamicBanner>

      <div className="list-container my-20 sm:my-14 mx-xPadding">
        <h3 className="text-center my-10 text[1.5em] font-[600]">
          Explore Automobiles
        </h3>

        <div className="grid grid-cols-3 w-full sm:grid-cols-1 gap-10">
          {loading ? (
            <>
              <div>
                <SpinnerCircular
                  color="white"
                  className="flex justify-center"
                  secondaryColor={"#F2BE5C"}
                  size={50}
                  thickness={150}
                />
              </div>
            </>
          ) : (
            <>
              {listings?.map((item, i) => {
                return <Card key={i} listing={item} />;
              })}
            </>
          )}
        </div>
        {!loading && (
          <div className="w-full flexmm mt-10">
            <PaginationButtons
              range={[1, 2, 3]}
              pagination={30}
              page={page}
              setPage={setPage}
              loading={loading}
              totalData={totalData}
              background={"#F2BE5C"}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Automobile;
