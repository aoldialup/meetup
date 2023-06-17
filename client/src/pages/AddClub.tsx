import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCategories, getStates } from '../http';
import { State } from '../types';

export function AddClub() {
  const [clubCategories, setClubCategories] = useState<string[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [title, setTitle] = useState('Club title');
  const [description, setDescription] = useState('Club description');
  const [image, setImage] = useState('https://nestjs.com/img/nest-og.png');
  const [street, setStreet] = useState('Hacker Street');
  const [state, setState] = useState('Texas');
  const [city, setCity] = useState('Austin');
  const [clubCategory, setClubCategory] = useState('City');

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await getCategories();
        const states = await getStates();

        setClubCategories(categories);
        setStates(states);
      }
      catch(e) {
        alert("bullshit");
      }
    }

    fetchData();
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    axios.post('http://localhost:3000/clubs', data)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return <div>
    <form onSubmit={handleSubmit} method="post">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input name='title' value={title} onChange={(e) => setTitle(e.target.value)} id="title" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="description" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input name="image" value={image} onChange={(e) => setImage(e.target.value)} id="image" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input name="street" value={street} onChange={(e) => setStreet(e.target.value)} id="street" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input name="city" value={city} onChange={(e) => setCity(e.target.value)} id="city" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <select name="clubCategory" value={state} onChange={(e) => setState(e.target.value)} id="state" className="form-control">
          <option>-- Select --</option>
          {states?.map(state => {
            return <option key={state.id} value={state.short}>{state.name}</option>
          })}
        </select>
        {/* <input name="state" value={state} onChange={(e) => setState(e.target.value)} id="state" className="form-control" /> */}
      </div>
      <div className="form-group">
        <label htmlFor="category">Club Category</label>
        <select name="clubCategory" value={clubCategory} onChange={(e) => setClubCategory(e.target.value)} id="category" className="form-control">
          <option>-- Select --</option>
          {clubCategories?.map(category => {
            return <option key={category} value={category}>{category}</option>;
          })}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>;
}
