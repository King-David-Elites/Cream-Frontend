import DynamicBanner from "@/AtomicComponents/DynamicBanner";
import Footer from "@/AtomicComponents/Footer";
import Nav from "@/AtomicComponents/Nav";
import React, { useEffect, useState } from "react";
import { RiArrowLeftFill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { getArticleById } from "@/services/request";

function EachBlog() {
  const router = useRouter();
  const data = router.query;
  const id = data.id;
  console.log("data", data.id);
  const blogPosts = [
    {
      title: "Embracing Technology in Real Estate",
      image:
        "https://media.licdn.com/dms/image/D5612AQFfdKL0fMEgpA/article-cover_image-shrink_720_1280/0/1702387466169?e=2147483647&v=beta&t=mjNWCCwW7ue1DtdE_aWVRd2DN0OhhxES0PRYfeMrmMQ",
      date: "January 15, 2023",
      excerpt: `
            The Metaverse of Homes: How Technology is Transforming Real Estate
            Step into a future where brick and mortar meets virtual reality, where your dream home awaits just a click and a headset away. The real estate landscape is experiencing a seismic shift, propelled by an influx of groundbreaking technologies that are fundamentally redefining how we search for, buy, and even perceive properties.
            Gone are the days of endless scrolling through flat photographs and navigating confusing listing descriptions. The dawn of immersive virtual tours has ushered in a new era of exploration. Don a VR headset and prepare to teleport into the heart of any property on the market. Wander through sun-drenched living rooms, climb into spacious bedrooms, and even open windows to feel the virtual breeze caress your skin. This isn't just viewing a home; it's experiencing it, feeling its energy and imagining yourself living within its walls.
            But the revolution goes beyond mere visuals. Artificial intelligence is emerging as the real estate agent of the future, learning your preferences and tailoring property recommendations to your unique needs and desires. Imagine whispering your dream home wish list to an AI and watching it curate a personalized portfolio of perfect matches, factoring in location, budget, amenities, and even your unspoken lifestyle aspirations. No more wading through irrelevant listings; just a streamlined journey toward your ideal property.
            
            Technology's impact extends beyond the initial search. Gone are the days of juggling paperwork and chasing signatures. Blockchain technology promises to simplify and secure the entire transaction process, from offer submissions to escrow management. Think seamless contracts, faster closings, and a reduced risk of fraud.
            And that's just the tip of the iceberg. Imagine drone-powered property inspections, augmented reality furniture overlays to see how your existing belongings would fit in a new space, or even 3D printing houses tailored to your exact specifications. The possibilities are truly endless, blurring the lines between reality and possibility and making the home buying journey a thrilling, personalized adventure.
            
            However, amidst the excitement, it's crucial to acknowledge the potential challenges. Ethical considerations regarding data privacy and AI bias need careful attention. Ensuring equitable access to these technologies for all buyers is paramount. The human touch of real estate agents who provide invaluable guidance and negotiation expertise may still hold a cherished place in the process.
            Ultimately, technology is not poised to replace the human element in real estate, but rather to augment and empower it. By embracing these advancements, we stand to unlock a future where finding and owning your dream home is no longer a tedious chore, but a thrilling, personalized journey through the exciting metaverse of homes.
            
            So, buckle up, homebuyers! The real estate game has just changed, and the rules are being rewritten by the architects of the digital age. It's time to grab your VR headset, whisper your dream home wish list to the AI, and prepare to step into a new era of property exploration.
            This is just a starting point, feel free to expand on specific technologies, address potential challenges in more detail, or weave in real-world examples and industry insights to add further depth and context. The possibilities are as vast as the metaverse of homes itself!`,
      slug: "embracing-technology-in-real-estate",
    },
    {
      title: "Revolutionizing Car Buying with AI",
      image:
        "https://www.etags.com/blog/wp-content/uploads/2021/02/Large-44816-HyundaiMotorGroupIntroducesAdvancedHumanoidRobotDAL-eforAutomatedCustomerServices-1.jpg",
      date: "February 5, 2023",
      excerpt:
        "The automotive industry is undergoing a revolutionary transformation, thanks to the integration of artificial intelligence. Discover how AI-powered algorithms are streamlining the car-buying process, offering users personalized recommendations based on their preferences. From smart car features to virtual showrooms, delve into the innovative technologies shaping the future of automotive retail. Join us on a journey where technology meets mobility, making car selection a seamless and enjoyable experience.",
      slug: "revolutionizing-car-buying-with-ai",
    },
    // Add more blog posts as needed
  ];

  const images = ["/pic18.jpeg", "/pic19.png"];
  const filteredPost = blogPosts.filter((post) => {
    return post.slug === data.slug;
  });

  //console.log("filtered post:", post[0]);
  const post = filteredPost[0];

  // If the page is not yet generated, this will be displayed initially
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const [article, setArticle] = useState(null);
  const fetchArticle = async (id) => {
    const data = await getArticleById(id);
    console.log("title", data.data.title);
    console.log(data);
    setArticle(data.data);
  };

  useEffect(() => {
    fetchArticle(id);
  }, []);

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
              posted on {article.createdAt}
            </p>
            <img src={article.cover} className="w-[100%] h-[50%] rounded-md" />
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
              <div className="prose max-w-full">
                <div>{article.body}</div>
              </div>
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
