
import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

function App() {
  const [item, setItem] = useState({
    title:"",
    description:""
  })

  //fetch the data display at frontend from database
  const [items, setItems] = useState([
    {
      title:"",
      description:"",
      _id:""
    }
  ]);

  //once update button get clicked will render to update page
  const [isPut, setIsPut] = useState(false);

  //item be updated to latest
  const [updatedItem, setUpdatedItem] = useState({
    title:"",
    description:"",
    id:""
  })

  useEffect(() => {
    fetch("/items")
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    })
    .then(jsonRes => setItems(jsonRes))
    .catch(err => console.log(err));
  }, [items])
  //this function should be rendered only we change the items variables
  //avoid to rendering the function continuously

  function handleChange(event) {
    const {name, value} = event.target;
    setItem(prevInput => {
      return {
        ...prevInput,
        [name]: value
        };
      });
  }

  function addItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description
    };
    axios.post("/newitem", newItem);
    console.log(newItem);
    setItem({
      title:"",
      description:""
    });
  }

  function deleteItem(id) {
    axios.delete('/delete/' + id);
    alert("item deleted");
    console.log(`deleted item with id ${id}`);
  }

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem(prevInput => {
      return {
        ...prevInput,
        id: id,
      }
    })
  }

function updateItem(id) {
  axios.put("/put/" + id, updatedItem);
  alert("item upated");
  console.log(`item with id ${id} updated`);
}

function handleUpdate(event) {
  const {name, value} = event.target;
  setUpdatedItem(prevInput => {
    return(
      {
        ...prevInput,
        [name]: value
      }
    )
  });
  console.log(updatedItem);
}

  return (
    <div>
    <Header />
    {!isPut ?
      (<form>
        <div className="mb-3">
          <input onChange={handleChange} className="form-control" name="title" value={item.title} placeholder="Add title"></input>
          <textarea onChange={handleChange} className="form-control" name="description" value={item.description} placeholder="Add note"></textarea>
          <button onClick={addItem} className="btn btn-outline-secondary"><AddOutlinedIcon /></button>
        </div>
      </form> ) : (
      <form>
        <div className="mb-3">
          <input onChange={handleUpdate} className="form-control" name="title" value={updatedItem.title} placeholder="Edit title"></input>
          <textarea onChange={handleUpdate} className="form-control" name="description" value={updatedItem.description} placeholder="Edit note"></textarea>
          <button onClick={() => updateItem(updatedItem.id)} className="btn btn-outline-secondary"><CreateOutlinedIcon /></button>
          <p className="card-text"><small className="text-muted">Refresh page for cancelling edit</small></p>
        </div>
      </form>
      )}

      {items.map(item => {
        return(

          <div key={item._id} className="card" style={{width: "20rem"}}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(item._id)}><HighlightOffOutlinedIcon /></button>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => openUpdate(item._id)}><CreateOutlinedIcon /></button>
            </div>
          </div>

        )
      })}
      <Footer />
    </div>
  );
}

export default App;
