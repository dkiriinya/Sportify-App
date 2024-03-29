import React, { useState, useEffect } from "react";
import {Routes,Route} from "react-router-dom";


const RenderFavoritePlayers = () => {
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  useEffect(() => {
    fetchFavoritePlayers()
  },[])
  const fetchFavoritePlayers = async () => {
    try {
      const response = await fetch("http://localhost:8001/players");
      const data = await response.json();
      console.log(data)
      setFavoritePlayers(data);
    } catch (error) {
      console.error('Error fetching favorite players:', error);
    }
  };
  const removeFavoritePlayer = async (playerId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to remove this player from favorites?")

      if(!isConfirmed) {
        return ;
      }
      const response = await fetch(`http://localhost:8001/players/${playerId}`,{
        method: 'DELETE',
        headers: {
          'content-Type':'application/json'
        }
      })
      if (response.ok){
        setFavoritePlayers(favoritePlayers.filter((favoritePlayer) => favoritePlayer.id !== playerId));
        alert('player deleted successfully')
      }
    } catch (error) {
      console.error('Error removing player from favorites:', error);
    }
  };
  return(
    (
      <div>
      <h2>Favorite Players</h2>
      {favoritePlayers.map((player, index) => (
        <div key={index} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Name: {player.strPlayer}</h5>
                <p className="card-text">
                  Facebook: <a href={player.strFacebook} target="_blank" rel="noopener noreferrer">{player.strFacebook}</a>
                </p>
                <p className="card-text">
                  Twitter: <a href={player.strTwitter} target="_blank" rel="noopener noreferrer">{player.strTwitter}</a>
                </p>
                <p className="card-text">Role: {player.strPosition}</p>
                <button className="btn btn-danger" onClick={() => removeFavoritePlayer(player.id)}>
                  Remove Favorite
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={player.strThumb}
                alt={`${player.strPlayer} thumbnail`}
                className="img-fluid rounded-start"
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div className="card-footer">
            <small className="text-muted">Description: {player.strDescriptionEN}</small>
          </div>
        </div>
      ))}
      </div>
    )
  )
}
const RenderFavoriteTeams=()=> {
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  useEffect(()=> {
    fetchFavoriteTeams();
  })
  const fetchFavoriteTeams = async () => {
    try {
      const response = await fetch("http://localhost:8001/teams");
      const data = await response.json();
      setFavoriteTeams(data);
    } catch (error) {
      console.error('Error fetching favorite teams:', error);
    }
  };
  const removeFavoriteTeam = async (teamId) => {
    try {
      // Perform logic to remove team from favorites
      const isConfirmed = window.confirm('Are you sure you want to remove this event from favorites?');
    
      if (!isConfirmed) {
        
        return;
      }
      const response = await fetch(`http://localhost:8001/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(response.ok){

        setFavoriteTeams(favoriteTeams.filter((favoriteTeam) => favoriteTeam.id !== teamId));
        alert('team deleted succesfully');

      }else{
         alert('team failed to delete')
      }

      
    } catch (error) {
      console.error('Error removing team from favorites:', error);
    }
  };
  return(
    <div>
    <h2 >Favorite Teams</h2>
      {favoriteTeams.map((team, index) => (
        <div key={index} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{team.strTeam}</h5>
                <p className="card-text">Sport: {team.strSport}</p>
                <button className="btn btn-danger" onClick={() => removeFavoriteTeam(team.id)}>
                  Remove Favorite
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={team.strTeamBadge}
                alt={`${team.strTeam} badge`}
                className="img-fluid rounded-start"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
const RenderFavoriteEvents = () => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  useEffect(()=>{
    fetchFavoriteEvents();
  })
  const fetchFavoriteEvents = async () => {
    try {
      const response = await fetch("http://localhost:8001/events");
      const data = await response.json();
      setFavoriteEvents(data);
    } catch (error) {
      console.error('Error fetching favorite events:', error);
    }
  };
  const removeFavoriteEvent = async (eventId) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to remove this event from favorites?');
    
      if (!isConfirmed) {
        
        return;
      }
  
      const response = await fetch(`http://localhost:8001/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        
        setFavoriteEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
  
        alert(`Event has been removed successfully.`);
      } else {
        console.error('Failed to remove event from favorites.');
      }
    } catch (error) {
      console.error('Error removing event from favorites:', error);
    }
  };
  return(
    <div>
    <h2>Favorite Events</h2>
  {favoriteEvents.map((event, index) => (
  <div key={index} className="card mb-3">
    <div className="row g-0">
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{event.strEvent}</h5>
          <p className="card-text">Time: {event.strTime}</p>
          <p className="card-text">Channel: {event.strChannel}</p>
          <p className="card-text">Country: {event.strCountry}</p>
          <button className="btn btn-danger" onClick={() => removeFavoriteEvent(event.id)}>
            Remove Favorite
          </button>
        </div>
      </div>
      <div className="col-md-4">

      </div>
    </div>
  </div>
))}
  </div>
  )
}
const RenderFavoriteLeagues = () => {
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);
  useEffect(()=>{
    fetchFavoriteLeagues();
  },[])
  const fetchFavoriteLeagues = async () => {
    try {
      const response = await fetch("http://localhost:8001/leagues");
      const data = await response.json();
      setFavoriteLeagues(data);
    } catch (error) {
      console.error('Error fetching favorite leagues:', error);
    }
  };
  const removeFavoriteLeague = async (leagueId) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to remove this league from favorites?');
  
      if (!isConfirmed) {
        // If not confirmed, do nothing
        return;
      }
  
      const response = await fetch(`http://localhost:8001/leagues/${leagueId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Remove the deleted league from the state
        setFavoriteLeagues((prevLeagues) =>
          prevLeagues.filter((league) => league.id !== leagueId)
        );
  
        alert(`League has been removed successfully.`);
      } else {
        console.error('Failed to remove league from favorites.');
      }
    } catch (error) {
      console.error('Error removing league from favorites:', error);
    }
  };
  return(
    <div>
    <h2 id="favorite-leagues">Favorite Leagues</h2>
  {favoriteLeagues.map((league, index) => (
  <div key={index} className="card mb-3">
    <div className="row g-0">
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{league.strLeague}</h5>
          <p className="card-text">Sport: {league.strSport}</p>
          <p className="card-text">Country: {league.strCountry}</p>
          <p className="card-text">
            <a href={`http://${league.strWebsite}`} target="_blank" rel="noopener noreferrer">Website</a>
          </p>
          <button className="btn btn-danger" onClick={() => removeFavoriteLeague(league.id)}>
            Remove Favorite
          </button>
        </div>
      </div>
      <div className="col-md-4">
        <img
          src={league.strLogo}
          alt={`${league.strLeague} logo`}
          className="img-fluid rounded-start"
          style={{ width: '100%' }}
        />
      </div>
    </div>
    <div className="card-footer">
      <small className="text-muted">Description: {league.strDescriptionEN}</small>
    </div>
  </div>
))}      
    </div>
  )
}
const RenderFavoriteHighlights = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    
    fetchFavoriteHighlights();
  }, []);

  const fetchFavoriteHighlights = async () => {
    try {
      const response = await fetch("http://localhost:8001/HighLights");
      const data = await response.json();
      setHighlights(data);
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  };

  const removeFavoriteHighlight = async (highlightId) => {
    try {
      // Perform logic to remove league from favorites
      const isConfirmed = window.confirm("Are you sure you want to remove this player from favorites?")

      if(!isConfirmed) {
        return ;
      }
      const response = await fetch(`http://localhost:8001/Highlights/${highlightId}`,{
        method: 'DELETE',
        headers: {
          'content-Type':'application/json'
        }
      })
      if (response.ok){
        setHighlights(highlights.filter((favoriteHighlight) => favoriteHighlight.id !== highlightId));
        alert('Highlight deleted successfully')
      }
    } catch (error) {
      console.error('Error removing highlight from favorites:', error);
    }
  };

  return (
  
    <div className="container mt-5">
      <h2>Highlights</h2>
      {/* Display highlights */}
      {highlights.map((highlight, index) => (
        <div key={index} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{highlight.highlight.strEvent}</h5>
                <p className="card-text">Sport: {highlight.highlight.strSport}</p>
                <p className="card-text">League: {highlight.highlight.strLeague}</p>
                <p className="card-text">Date: {highlight.highlight.dateEvent}</p>
              </div>
            </div>
            <div className="col-md-4">
              <a 
              href={highlight.highlight.strVideo}
              target="_blank"
              rel="noopener noreferrer">
              <img
                src={highlight.highlight.strThumb}
                alt={highlight.highlight.strEvent}
                className="img-fluid rounded-start"
                style={{ width: '100%' }}
              />
              </a>
            </div>
          </div>
          {/* Add button to remove favorite highlight */}
          <div className="card-footer">
            <button
              className="btn btn-danger"
              onClick={() => removeFavoriteHighlight(highlight.id)}
            >
              Remove Favorite
            </button>
          </div>
        </div>
      ))}
      
    </div>
  );

}
const Favorites = () => {
  return(
    <div>
    <Routes>
      <Route path="/players" element={<RenderFavoritePlayers />} />
      <Route path="/teams" element={<RenderFavoriteTeams />} />
      <Route path="/highlights" element={<RenderFavoriteHighlights />} />
      <Route path="/events" element={<RenderFavoriteEvents />} />
      <Route path="/leagues" element={<RenderFavoriteLeagues/>} />
    </Routes>
    </div>
  )
};
export default Favorites;
