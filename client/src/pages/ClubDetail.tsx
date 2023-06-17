import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Club } from '../types';

export function ClubDetail() {
  const [club, setClub] = useState<Club | null>();
  const { id } = useParams();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`http://localhost:3000/clubs/${id}`);
        const json = response.data;
        setClub(json[0]);
        console.log('trash' + json);
      }
      catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (club) {
    return (
      <div className="row">
        <div className="col-md-8">
          <img className="img-fluid" width={200} src={club.image} alt="" />
        </div>

        <div className="col-md-4">
          <h3 className="my-3">title: {club.title}</h3>
          <p>description: {club.description}</p>
          {club.address &&
            <h3 className="my-3">{club.address.street}, {club.address.city} {club.address.state}, USA</h3>}
          <ul>
            {/* <li>@Model.race.Address.City</li>
                <li>@Model.race.Address.State</li>
                <li>@Model.race.ClubCategory</li> */}
          </ul>
        </div>
      </div>
    );
  }

  return <h1>Finding club</h1>;
}
