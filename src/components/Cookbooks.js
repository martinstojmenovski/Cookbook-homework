import { useEffect, useState } from "react"

import { useParams } from "react-router-dom";

const Cookbooks = function () {
    const params = useParams();
    // use state to display the authors name
    const [author, setAuthor] = useState("")
    //use state to display the cookbook from the same author in an array
    const [cookbooks, setCookbooks] = useState([])
    const [addCookbook, setAddCookbook] = useState({title: "", yearPublished: ""})

    useEffect(() => {
        fetch("http://localhost:3000/authors/firstname/" + params.id)
            .then(response => response.json())
            .then(data => {
                // console.log(data.firstName[0])
                setAuthor(data.firstName[0])
                setCookbooks(data.firstName[0].cookbooks)
            })
    }, [])
    //map method to display he cookbooks from the author
    const displayCookbooks = cookbooks.map((book, index) => (
        <li key={index}>{book.title} {book.yearPublished}</li>
    ))
    //-----------------------------------------------------------------------------------------------------

    const handleChange = (event) => {
        // console.log(event.target.value)
        setAddCookbook({...addCookbook, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/cookbooks" , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                const copy = [...cookbooks]
                copy.push(data.cookbooks)
                setCookbooks(copy)
                setAddCookbook({ title: "", yearPublished: "" })
                // console.log(data)
            })
    }


    return (
        <div>
            <h3>{author.firstName} {author.lastName}</h3>
            <h1>Cookbooks</h1>
            <form 
            onSubmit={handleSubmit} 
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                onChange={handleChange}
                value={addCookbook.title}
                />
                <input type="text"
                    name="yearPublished"
                    placeholder="Year published"
                onChange={handleChange}
                value={addCookbook.yearPublished}
                />
                <input type="submit" value="Add Cookbooks" />
            </form>
            <ul>
                {displayCookbooks}
            </ul>



        </div>
    )

}

export default Cookbooks