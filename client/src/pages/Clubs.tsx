import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClub, getClubs, deleteClub } from '../http';
import { Club } from '../types';
import ClubCard from './ClubCard';

export function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const clubs = await getClubs();
        console.log(clubs);
        setClubs(clubs);
      }
      catch (e: any) {
        alert("Couldn't retrieve clubs from the database!");
      }
    })();
  }, []);

  function handleClubRemove(id: number) {
    (async function () {
      try {
        await deleteClub(id);
        setClubs((data: any) => data.filter((x: any) => x.id !== id));
      }
      catch (e: any) {
        alert("Couldn't retrieve clubs from the database!");
      }
    })();
  }

  return (
    <div>
      <h1>Clubs</h1>
      <Link className='btn btn-primary' to="/clubs/add">Add club</Link>
      <div className="album py-5">
        <div className="container">
          <div className="row">
            <div className="album py-5">
              <div className="container">
                <div className="row">
                  {!clubs.length && <p>No clubs </p>}
                  {clubs.map(club => {
                    return <ClubCard key={crypto.randomUUID()} club={club} removeClub={handleClubRemove} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



