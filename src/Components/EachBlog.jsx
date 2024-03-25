"use client";
import DynamicBanner from "@/AtomicComponents/DynamicBanner";
import Footer from "@/AtomicComponents/Footer";
import Nav from "@/AtomicComponents/Nav";
import React, { useEffect, useState } from "react";
import { RiArrowLeftFill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { getArticleById } from "@/services/request";
import Markdown from "react-markdown";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

function EachBlog() {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("blogId");
    if (router.query.id && !id) {
      setId(router.query.id);
      localStorage.setItem("blogId", router.query.id);
    } else if (storedId && !id) {
      setId(storedId);
    }
  }, [router.query.id, id]);

  useEffect(() => {
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (id) => {
    try {
      const response = await getArticleById(id);
      if (response?.data) {
        setArticle(response.data);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      // Handle error state here
    }
  };

  const sanitizedArticle = DOMPurify.sanitize(article?.body);

  return (
    <>
      <Nav active={6} />
      {article && (
        <>
          <div className="mt-24 flex flex-col items-center flex-1 mx-xPadding">
            <div className="text-black text-[4em] sm:text-[30px] font-[700]">
              {article.title}
            </div>
            <p className="text-primary1 font-[800] w-full text-center">
              posted on {new Date(article.createdAt).toLocaleString()}
            </p>
            <div className="w-full h-[90vh] sm:h-[50vh] object-contain">
              <img src={article.cover} className="w-full h-full  rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1  my-8 items-center mx-xPadding">
            <div className=" mx-auto">
              <Link href="/blog">
                <div
                  href="/blog"
                  className="flex items-center text-primary1 mb-5"
                >
                  <RiArrowLeftFill className="text-lg" />
                  <span className="ml-2">Back to Blog</span>
                </div>
              </Link>
              <div
                className="prose max-w-full"
                dangerouslySetInnerHTML={{ __html: sanitizedArticle }}
              />
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default EachBlog;

// export async function getStaticPaths() {
//   // Get the paths we want to pre-render based on blog posts
//   const paths = blogPosts.map((post) => ({
//     params: { slug: post.slug },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// // This also gets called at build time
// export async function getStaticProps({ params }) {
//   // Get the blog post based on the slug parameter
//   const post = blogPosts.find((post) => post.slug === params.slug);

//   // Pass post data to the page via props
//   return { props: { post } };
// }
