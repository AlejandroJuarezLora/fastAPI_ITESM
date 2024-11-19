import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

interface Item_interface{
  id: number;
  name: string;
  description: string;
  price:string;

} 

const App = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  const fetchItems = async () => {
    // const response = await ApiLocal.get('/api/items/');
    fetch('/api/items/')  // This will be proxied to http://your-api-url.com/items
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
      console.log('Fetched data:', data);
      setItems(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  

  useEffect(() => {
    fetchItems();
  }, []);

  const handleInputChange = (event: any) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  }

  const handleFormSubmit = async (event:any) => {
    event.preventDefault();
    //await ApiLocal.post('/api/items/', formData);
    fetch('/api/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),  // Send the new item as JSON in the request body
    })
      .then(response => response.json())  // Parse the JSON response
      .then(data => {
        console.log('Item created:', data);
      })
      .catch(error => {
        console.error('Error creating item:', error);
      });
    fetchItems();
    setFormData({
      name: '',
      description: '',
      price: ''
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            Basic CRUD Operation
          </a>
        </div>
      </nav>

      {/* Form Section */}
      <div className='container my-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-12'>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Item Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='description' className='form-label'>
                  Item Description
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  name='description'
                  onChange={handleInputChange}
                  value={formData.description}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='price' className='form-label'>
                  Item Price
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='price'
                  name='price'
                  onChange={handleInputChange}
                  value={formData.price}
                />
              </div>

              <button type='submit' className='btn btn-primary w-100'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='container'>
        <h2 className='text-center my-4'>Items List</h2>
        <table className='table table-striped table-bordered'>
          <thead className='table-dark'>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            
            {items.map((item: Item_interface) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )

}

export default App;