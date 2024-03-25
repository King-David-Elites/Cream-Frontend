import { useRouter } from "next/router";
import Card from "@/AtomicComponents/Card";
import DynamicBanner from "@/AtomicComponents/DynamicBanner";
import Footer from "@/AtomicComponents/Footer";
import Nav from "@/AtomicComponents/Nav";
import { getAllListings, getListingsPerPage } from "@/services/request";
import { sendQuery } from "@/services/request";
import React, { useEffect, useState } from "react";
import PaginationButtons from "@/AtomicComponents/PaginationButtons";
import { SpinnerCircular } from "spinners-react";
import { X } from "heroicons-react";
import { RiSearch2Line } from "react-icons/ri";
import BuyFromCream from "@/AtomicComponents/BuyFromCream";

function CreamRealEstate() {
  const router = useRouter();
  const data = router.query;
  const idFromRouter = data.id;
  const name = data.name;

  const [id, setId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("creamRealEstateId");
    if (idFromRouter) {
      setId(idFromRouter);
      localStorage.setItem("creamRealEstateId", idFromRouter);
    } else if (storedId) {
      setId(storedId);
    }
  }, [idFromRouter]);

  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [loader, setLoader] = useState(false);
  const images = [
    "pic25.jpg",
    "/pic27.jpg",
    "pic33.jpg",
    "pic34.jpg",
    "pic2.jpg",
    "pic30.jpg",
  ];

  const fetchData = async () => {
    setLoading(true);
    let data = await getListingsPerPage(page, "real-estate", id);
    console.log("data: ", data);
    //console.log("total: ", data?.number);
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
    //console.log(data);
    let data1 = data.map((item) => {
      item.postedBy = {
        firstName: item["postedBy.firstName"],
        lastName: item["postedBy.lastName"],
        profilePicture: item["postedBy.profilePicture"],
      };
      return item;
    });
    //console.log(data1);
    setListings(data);
    // setTotalData(data.number);
    setLoading(false);
  };
  useEffect(() => {
    // getAllListings()
    if (typeof id != "undefined") {
      console.log("id", id);
      fetchData();
    }
    // submit()
  }, [page, page]);

  return (
    <>
      <Nav active={10} />

      {/* <>
        <h1 className="text-white text-[4em] sm:text-[40px] font-[700]">
          REAL <span className="text-primary1">ESTATE</span>
        </h1>
        <p className="text-white font-[600]">One search is all it takes.</p>

        <div className="flex gap-3 items-center sm:flex-col sm:justify-center sm:w-full justify-center sm:items-center">
          <div className="flex gap-3 py-3 px-5 rounded-lg w-[40VW] sm:w-full items-center my-3  bg-white text-black ">
            <RiSearch2Line />
            <input
              type="text"
              className="focus:outline-0 w-full border border-gray-800 rounded-md py-2"
              placeholder="Describe your desired house"
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
      </> */}

      <div className="list-container my-20 sm:my-14 mx-xPadding">
        <h3 className="text-center my-10 text[1.5em] font-[700]">{name}</h3>

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
}

export default CreamRealEstate;
