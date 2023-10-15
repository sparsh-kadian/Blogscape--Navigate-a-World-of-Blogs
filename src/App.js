import Header from "./components/Header";
import Blogs from './components/Blogs';
import Pagination from './components/Pagination';
import {Route, Routes, useLocation, useSearchParams} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import "./App.css";
import HOME from "./pages/HOME";
import TagPage from "./pages/TagPage";
import BlogPage from "./pages/BlogPage";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  const {fetchBlogPosts} = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;  // Here we used -->`?? 1` bcz agar page ki value na mile, toh '1' default kya use krna h 

    if(location.pathname.includes("tags")) {
      // Iska mtlb tag wala page show krna h
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null, category) // yha tag nhi h isliye uski jgah humne 'null' pass kardia 
    }
    else {
      fetchBlogPosts(Number(page));
    }
  },[location.pathname, location.search]);

  return (
    <Routes>
     <Route path="/" element = {<HOME/>} />
     <Route path="/blog/:blogID" element = {<BlogPage/>} />
     <Route path="/tags/:tag" element = {<TagPage/>} />
     <Route path="/categories/:category" element = {<CategoryPage/>} />
    </Routes>
  );
}

