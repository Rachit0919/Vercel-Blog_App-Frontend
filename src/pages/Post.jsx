// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// // import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";
// import { deletePost } from "../services/postService";

// export default function Post() {
//   const [post, setPost] = useState(null);
//   console.log("Post: ", post);
//   //   const [image, setImage] = useState(null)
//   const { id } = useParams();
//   console.log("\nPost ID from params:: ", id);
//   const navigate = useNavigate();

//   const userData = useSelector((state) => state.auth.userData);
//   // console.log("\npost.userId: ", post.data.owner)
//   // console.log("\nuserData._id: ", userData._id )

//   const isAuthor =
//     post && userData ? post.data.post.owner === userData._id : false;

//   useEffect(() => {
//     const getPost = async () => {
//       if (id) {
//         // console.log("Id: ", id);
//         const response = await fetch(
//           `${import.meta.env.VITE_API_BASE_URL}/api/v1/post/${id}`,
//           {
//             method: "GET",
//             credentials: "include", // keep cookies if using auth
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (!response.ok) {
//           console.log("Error fetching the post");
//         }

//         const data = await response.json();
//         // console.log("Data: ", data);
//         setPost(data);
//       } else navigate("/");
//     };
//     getPost();
//   }, [id, navigate]);

//   return post ? (
//     <div className="py-8">
//       <Container>
//         <div className="w-full flex justify-center mb-4 relative border rounded-xl  p-5 ">
//           <img
//             src={post.data.imageUrl.imageURL}
//             alt={post.title}
//             className="rounded-xl"
//           />

//           {isAuthor && (
//             <div className="absolute right-6 top-6 space-x-2 ">
//               <Link to={`/edit-post/${id}`}>
//                 <Button className=" mr-3 rounded">Edit</Button>
//               </Link>
//               {/* <Button
//                 className=" bg-red-500 rounded hover:bg-red-700"
//                 onClick={() => deletePost(id)}
//               >
//                 Delete
//               </Button> */}
//               <Button
//                 className="bg-red-500 rounded hover:bg-red-700"
//                 onClick={async () => {
//                   try {
//                     await deletePost(id);
//                     // conditional redirect
//                     if (window.location.pathname.startsWith("/my-posts")) {
//                       navigate("/my-posts");
//                     } else {
//                       navigate("/");
//                     }
//                   } catch (error) {
//                     console.error("Failed to delete post:", error);
//                   }
//                 }}
//               >
//                 Delete
//               </Button>
//             </div>
//           )}
//         </div>
//         <div className="w-full mb-6">
//           <h1 className="text-2xl font-bold text-center">
//             {post.data.post.title}
//           </h1>
//         </div>
//         <div className="browser-css text-center text-">
//           {parse(post.data.post.content)}
//         </div>
//       </Container>
//     </div>
//   ) : null;
// }


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { deletePost } from "../services/postService";

export default function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.data.post.owner === userData._id : false;

  // Fetch post by ID
  useEffect(() => {
    const getPost = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/post/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            console.log("Post not found. Redirecting...");
            navigate("/"); // Redirect if post deleted
            return;
          }
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching the post:", error);
        navigate("/"); // Fallback redirect
      }
    };

    getPost();
  }, [id, navigate]);

  // Handle delete post
  const handleDelete = async () => {
    try {
      await deletePost(id);
      // Redirect based on current route
      if (window.location.pathname.startsWith("/my-posts")) {
        navigate("/my-posts");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (!post) return null;

  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-5">
          <img
            src={post.imageURL}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 space-x-2">
              <Link to={`/edit-post/${id}`}>
                <Button className="mr-3 rounded">Edit</Button>
              </Link>
              <Button
                className="bg-red-500 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">{post.title}</h1>
        </div>

        <div className="browser-css text-center">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
}
