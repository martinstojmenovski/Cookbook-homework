import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Cookbooks from "./Cookbooks"
const Home = function() {
    //declare useState to display the authors from api
    const [authors, setAuthors] = useState([])

    // declare useState to add new Author
    const [addAuthor, setAddAuthor] = useState({firstName: "", lastName: ""})

    // handleChange to target the value from the inputs
    const handleChange = (event) => {
        // console.log(event.target)
        setAddAuthor({...addAuthor, [event.target.name]: event.target.value})
    }
    


        // handle submit to add new author in api
    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/authors`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(addAuthor)
          })
        .then(response => response.json())
        .then(data => {
            // console.log(data.author)
            const copy = [...authors]
            copy.push(data.author)
            setAuthors(copy)
            setAddAuthor({firstName: "", lastName: ""})
        })
    }


    // useEffect to display the authors from
    useEffect(() => {
        //use fetch to access the api
        fetch(`http://localhost:3000/authors`)
            .then(response => response.json())
            .then(data => {
                // console.log(data.authors)
                 setAuthors(data.authors)
                })
    }, [])
    const authorsDisplay = authors.map((author, index) => (
        //display autors in list items and make route to authors id
        <li key={index}> Author: <Link to={"/"+ author.firstName}>{author.firstName} {author.lastName} </Link></li>
    ))





    return (
        <div>
        
         <form onSubmit={handleSubmit} >
                <input 
                type="text"
                name="firstName"  
                placeholder="First name"
                onChange={handleChange}
                value={addAuthor.firstName}
                />
                <input type="text"  
                name="lastName"  
                placeholder="Last name"
                onChange={handleChange}
                value={addAuthor.lastName}
                />
                <input type="submit" value="Add Author"/>
            </form>
            <ul>
                {authorsDisplay}
            </ul>
        </div>
    )
}

export default Home