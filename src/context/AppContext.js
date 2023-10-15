import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { defaults } from "autoprefixer";
import {  useNavigate } from "react-router-dom";

//  Step - 1
export const AppContext = createContext();

export default function AppContextProvider({children}) {
    const [loading, setLoading]  = useState(false);
    const [posts, setPosts] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate(); 

    const fetchBlogPosts = async(page = 1, tag=null, category) => {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag) {
            url += `&tag=${tag}`;
        }
        if(category) {
            url += `&category=${category}`;
        }
        // const url = `${baseUrl}?page=${page}`;     // Yha hume 2 chizo ki need thi toh humne baseUrl ke sath page ka data bhi add krdia 
        try{
            const result = await fetch(url);       // Sbse pehle humne API fetch krli, or result me store krlia usse
            const data = await result.json();      // Ab humne result ko json format me convert krlia   
            console.log(data)                      // Data ko ek bari print kralia 
            setPage(data.page)                     // Yha par humne page no set krdia h  
            setPosts(data.posts)                   // Yha par humne post set krdi h jo hume needed hogi  
            setTotalPages(data.totalPages)         // Yha par humne total pages set krdiye h
        }
        catch(error){
            console.log("Error in fetching data");
            setPage(1);                 // Yha humne sari values ko humne firse initialise kardia
            setPosts([]);               // Yha humne sari values ko humne firse initialise kardia
            setTotalPages(null);        // Yha humne sari values ko humne firse initialise kardia
        }
        setLoading(false);
    }

    function handlePageChange(page) {
        navigate({ search: `?page=${page}`});
        setPage(page);              // Phle page no. set krdo 
        fetchBlogPosts(page);       // Fir us page ke according API call mardo 
    }

    const value = {
        loading,
        setLoading,
        posts, 
        setPosts,
        page, 
        setPage, 
        totalPages, 
        setTotalPages, 
        fetchBlogPosts, 
        handlePageChange
    };

    // Step - 2
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
