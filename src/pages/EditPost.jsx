import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
// import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    const getPost = async () => {
      if (id) {
        // console.log("Id: ", id);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/post/${id}`, {
          method: "GET",
          credentials: "include", // keep cookies if using auth
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.log("Error fetching the post");
        }

        const data = await response.json();
        // console.log("Data: ", data);
        // setPosts(data);
        setPosts({
          ...data.data.post,
          imageURL: data.data.imageUrl.url, // merge image url into post
        });
      } else navigate("/");
    };
    getPost();
  }, [id, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;

