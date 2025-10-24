

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Container, PostCard } from "../components";
// // import { getCurrentUser } from "../services/authService";
// import { login } from "../store/authSlice";

// export default function AllPosts() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.userData);
//   // const id = data.data._id;
//   console.log("User at allPost.jsx: ", user)
  
//   const [posts, setPosts] = useState([]);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const [id, setId] = useState(null);
//   console.log("id at allPost.jsx: ", id)

//   // 1️⃣ Fetch current user and store in Redux
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`,
//           {
//             credentials: "include",
//           }
//         );
//         const data = await res.json();
//         dispatch(login({ user: data.data }));
//         setId(data.data._id)
//       } catch (err) {
//         console.error("Error fetching current user:", err);
//       } finally {
//         setLoadingUser(false);
//       }
//     };
//     fetchUser();
//   }, [dispatch]);

//   // 2️⃣ Fetch posts after user is available
//   useEffect(() => {
//     if (!user) return;

//     const fetchPosts = async () => {
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_API_BASE_URL}/api/v1/all-posts/${user._id}`,
//           {
//             credentials: "include",
//           }
//         );

//         if (!res.ok) throw new Error(`Error fetching posts: ${res.status}`);
//         const data = await res.json();
//         setPosts(data.data || []);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//         setPosts([]);
//       } finally {
//         setLoadingPosts(false);
//       }
//     };

//     fetchPosts();
//   }, [user]);

//   // Loading state
//   if (loadingUser || loadingPosts) {
//     return (
//       <p className="text-center text-lg font-medium text-indigo-600 animate-pulse">
//         Loading posts...
//       </p>
//     );
//   }

//   if (posts.length === 0) {
//     return <p className="text-center text-white">No posts available.</p>;
//   }

//   return (
//     <section className="w-full py-8">
//       <Container>
//         {posts.length === 1 ? (
//           <div className="flex justify-center">
//             <div className="p-2">
//               <PostCard {...posts[0]} />
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-wrap justify-center mx-2 items-start">
//             {posts.map((post) => (
//               <div key={post._id} className="p-2">
//                 <PostCard {...post} />
//               </div>
//             ))}
//           </div>
//         )}
//       </Container>
//     </section>
//   );
// }


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import { login } from "../store/authSlice";

export default function AllPosts() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);

  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // 1️⃣ Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data?.data) {
          dispatch(login({ user: data.data }));
        } else {
          console.error("No user data received");
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  // 2️⃣ Fetch posts once user is available
  useEffect(() => {
    if (!user?._id) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/all-posts/${user._id}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();
        setPosts(data?.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [user]);

  // 3️⃣ Handle loading and empty states
  if (loadingUser || loadingPosts) {
    return (
      <p className="text-center text-lg font-medium text-indigo-600 animate-pulse">
        Loading posts...
      </p>
    );
  }

  if (!loadingPosts && posts.length === 0) {
    return <p className="text-center text-white">No posts available.</p>;
  }

  // 4️⃣ Render posts
  return (
    <section className="w-full py-8">
      <Container>
        {posts.length === 1 ? (
          <div className="flex justify-center">
            <div className="p-2">
              <PostCard {...posts[0]} />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center mx-2 items-start">
            {posts.map((post) => (
              <div key={post._id} className="p-2">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
