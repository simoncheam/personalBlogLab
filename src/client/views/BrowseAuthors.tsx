import * as React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useHistory, Link} from "react-router-dom";
import { Blogs, BlogTagsJoined, Tags, Authors} from '../client_types';
import Skeleton from 'react-loading-skeleton'


//import client types

const BrowseAuthors =()=>{

    
    const [allblogs, setAllBlogs] = useState<BlogTagsJoined[] >([]); 
    const [loaded, setHasLoaded] = useState<boolean>(false);
    const [selectedAuthorId, setSelectedAuthorId] = useState(null);
    const [authors, setAuthors]= useState<Authors[]>([]);

    const {goBack} = useHistory();
    const hist = useHistory();

    // USE EFFECT #1 - load all authors

        useEffect(()=>{
           
            fetch('/api/authors')
            .then(res=>res.json())
            .then((t)=> {
                setAuthors(t)  
            })
            .catch(e=>console.log(e))
        },[])
    

        useEffect(()=>{

            if(!selectedAuthorId){return}

            fetch(`/api/blogs/browseauthors/${selectedAuthorId}`)
            .then(res=>res.json())
            .then(data=>{
                setAllBlogs(data[0])
                setHasLoaded(true);
            })
            .catch(e=>console.log(e))
        },[selectedAuthorId])

        
        
         // handleAuthorSelectUpdate - fires on tag select
         const handleAuthorSelectUpdate = (e:React.ChangeEvent<HTMLSelectElement>) =>{

            setHasLoaded(false); // set has loaded = false
            setAllBlogs([]) // clears allblogs state
            setSelectedAuthorId(e.target.value) // set tagid >>> fires useEffect #2
        };

   
            
            
            

return(
<>


    <div className="row justify-content-center">
        <h1 className="display-3 m-3 text-center"> Browse Blogs by Author... </h1>

       
          <label className="row" >All Bloggers:</label>


            <select onChange={handleAuthorSelectUpdate} className="form-control m-2">
                
                        <option value={0}> Select an author to see their work</option>

                        {authors.map(author=>(
                            <option key={`author-option-${author.id}`} value={author.id}>
                                {author.name}
                            </option>
                        ))}
            </select>
            <div>

        
       
      

       </div>
        {/* Add to notes */}
       {
           selectedAuthorId && !allblogs.length && (!loaded ? <Skeleton  /> : <h1>No blogs found, the author needs more coffee ☕️ </h1>)

       }


        {allblogs.map(blog=>(

            <div key = {`blog-${blog.blog_id}-${blog.tag_id}`} className="container">
                
                <div className="card col-12 col-md-6 shadow-lg m-3">
                        <h5 className="card-header">Featured Blog #: {blog.blog_id} | 🏷 {blog.tag_name}</h5>
                        
                        <div className="card-body">

                            <h5 className="card-title"> {blog.title} </h5>
                            <p className="card-text"> {blog.content}</p>
                            <footer className="blockquote-footer"> {blog.blog_created} </footer>
                            
                            <Link to ={`/blogs/${blog.blog_id}/`} className="btn mx-2 btn-primary">
                                        Read More
                            </Link>
                        </div>
                </div>
            </div>
        ))}
    </div>
    <div onClick={goBack} className="btn m-2 btn-danger">
        Go Back?
    </div>
    <Link to ={`/blogs/browse/`} className="btn m-2 btn-primary">
        Want to Browse by Subject? Click Here
    </Link>




</>
);
}

export default BrowseAuthors;