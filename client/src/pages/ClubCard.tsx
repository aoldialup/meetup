import { Link } from 'react-router-dom';
import { Club } from '../types';

interface ClubCardData {
  club: Club,
  removeClub: any,
}

function ClubCard(props: ClubCardData) {
  const { club, removeClub: removeClub } = props;
  console.log(club);
  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img className="card-img-top" height="225" src={club.image} alt="Card image cap" />
        <div className="card-body">
          <p className="card-text">{club.title}</p>
          <p className="card-text">{club.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link className="btn btn-sm btn-outline-secondary" to={`/clubs/details/${club.id}`}>View</Link>

              <button onClick={() => removeClub(club.id)} type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubCard;