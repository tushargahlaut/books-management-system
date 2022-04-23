import { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
const axios=require("axios");

function App() {
const [allBooks,setAllBooks]=useState([])
let books;
  const getAllBooks=async (e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/books");
    console.log(res);
    books = await res.json();
    setAllBooks(books);

  }
  const [singleBook,setBook] = useState({
    title:"",
    id:0
  })
  const onChange = (e) =>{
    setBook({...singleBook,[e.target.name]:e.target.value});
  }
  const addBook = async()=>{
    console.log(JSON.stringify(singleBook.title));
    const result = await axios.post("http://localhost:5000/api/books/addbook",{
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       " Access-Control-Allow-Origin": "*"
      },
        "name":singleBook.title
    })
    console.log(result);
    setBook({
      title:""
    })
  }

  const getBook = async (id) =>{
      const result = await axios.get("http://localhost:5000/api/books/"+id);
      setBook({
        title:result.data[0].name,
        id:result.data[0].id 
      })
  }
  const handleUpdate = async()=>{
    const updating = await axios.put("http://localhost:5000/api/books/"+singleBook.id,{
      headers:{
        "Content-Type":"application/json"
      },
      "name":singleBook.title
    })
    console.log(updating);
  }

  const deleteBook = async(id)=>{
    const deleting = await axios.delete("http://localhost:5000/api/books/"+id);
    console.log(deleting);
  }

 
  return (
    <div className="container">
      <span className='title-bar'>
      <button className='btn btn-primary' onClick={getAllBooks}>Get Books</button>
       
        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal">
  Add Book
</button>
      
      </span>
         <table className='table table-straped'>
        <thead>
          <tr>
            
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
            
          </tr>
          </thead>
        <tbody>

       
       {allBooks.map((book)=>(
         <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>
            <button type="button" onClick={()=>getBook(book.id)} className="btn btn-info" data-toggle="modal" data-target="#exampleModal2">
                   Update
            </button>
            <button type="button" onClick={()=>deleteBook(book.id)} class="btn btn-danger">Delete</button>
            </td>
         </tr>
         
       ))}
        </tbody>
       </table>

<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Book</h5>
        <button type="button" className="btn" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <label htmlFor="title">Enter Book Name</label>
        <input type="text" id="title" name="title" value={singleBook.title} onChange={onChange}  />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onClick={addBook} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Book</h5>
        <button type="button" className="btn" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <label htmlFor="title">Enter Book Name</label>
        <input type="text" id="title" name="title" value={singleBook.title} onChange={onChange}  />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onClick={handleUpdate} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default App;
