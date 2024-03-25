import DynamicBanner from "@/AtomicComponents/DynamicBanner";
import Footer from "@/AtomicComponents/Footer";
import Nav from "@/AtomicComponents/Nav";
import React, { useEffect, useState } from "react";
import { RiArrowRightFill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { getArticles } from "@/services/request";
import { SpinnerCircular } from "spinners-react";
import DOMPurify from "isomorphic-dompurify";

const Blog = () => {
  const [articles, setArticles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchArticles = async () => {
    setIsLoading(true);
    const data = await getArticles();
    //console.log("title", data.data[0].title);
    //console.log(data);
    setArticles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const images = ["/pic18.jpeg", "/pic19.png"];

  return (
    <>
      <Nav active={6} />
      <DynamicBanner images={images}>
        <h1 className="text-white text-[4em] sm:text-[40px] font-[700]">
          OUR BLOG
        </h1>
        <p className="text-primary1 font-[800] w-full text-center">
          Stay informed with our latest insights on real estate and automobiles.
        </p>
        <div className="flex flex-col items-center">
          {/* <div className="text-primary1">
            Want to write a blog on real estate or automobile?{" "}
          </div> */}
          {/* <Link href="/blog-form">
            <button className="bg-primary1 hover:bg-[#f2be56] text-black px-12 py-3 mt-3 rounded-md">
              Post an article
            </button>
          </Link> */}
        </div>
      </DynamicBanner>

      <div className="grid grid-cols-1 gap-20 sm:grid-cols-1 mx-xPadding my-8 sm:my-20 items-center">
        {isLoading ? (
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
          articles?.data.map((article) => (
            <div
              key={article._id}
              className="w-full gap-8 sm:gap-2 flex flex-row"
            >
              <div className=" w-[50%]">
                <h1 className="text-[2em] sm:text-[1em] font-[700] line-clamp-1 sm:line-clamp-2">
                  {article.title}
                </h1>
                {/* <p className="text-gray-500">
                  posted on {new Date(article.createdAt).toLocaleString()}
                </p> */}
                <div className="  ">
                  <p
                    className="text-ellipsis sm:text-[0.8em] line-clamp-6 sm:line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(article.body),
                    }}
                  />
                </div>
                <Link href={`/blog/${article._id}`}>
                  <button className="flex gap-2 items-center px-10 sm:px-6 py-3 mt-5 sm:mt-3 bg-primary1 text-black rounded-md sm:text-[0.8em]">
                    Read more
                    <RiArrowRightFill />
                  </button>
                </Link>
              </div>
              <img
                src={article.cover}
                alt={article.title}
                className="rounded-md w-[50vw] h-[20vw] sm:h-[40vw] "
              />
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default Blog;
