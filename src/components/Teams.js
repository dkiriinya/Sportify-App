import React, { useState, useEffect,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Teams = ({ leagueId }) => {
  const [allTeams, setAllTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteTeams, setFavoriteTeams] = useState([]); // State to store favorite teams

  const navigate = useNavigate();

  const fetchTeams = useCallback(async () => {
    try {
      const url = `https://www.thesportsdb.com/api/v1/json/60130162/lookup_all_teams.php?id=${leagueId}`;
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Your User Agent",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.teams) {
        setAllTeams(data.teams);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  },[leagueId]);

  useEffect(() => {
    fetchTeams();
  },[fetchTeams]);

  
  useEffect(() => {
    fetchFavoriteTeams();
  },);

  const handleButtonClick = (selectedTeam) => {
    const teamName = encodeURIComponent(selectedTeam.strTeam);
    navigate(`/teams/${teamName}`);
  };

  const onButtonClick = async (team) => {
    if (isTeamFavorite(team.idTeam)) {
      alert('Team is already a favorite.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8001/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
      });

      if (response.ok) {
        alert('Team added to favorites:', team);
        navigate('/favorites/teams')
        setFavoriteTeams((prevFavoriteTeams) => [...prevFavoriteTeams, team]);
      } else {
        console.error('Failed to add team to favorites');
      }
    } catch (error) {
      console.error('Error adding team to favorites:', error);
    }
  };

 

  const fetchFavoriteTeams = async () => {
    try {
      const response = await fetch('http://localhost:8001/teams');
      const data = await response.json();
      setFavoriteTeams(data);
    } catch (error) {
      console.error('Error fetching favorite teams:', error);
    }
  };

  const isTeamFavorite = (teamId) => {
    return favoriteTeams.some((team) => team.idTeam === teamId);
  };

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;

  const filteredTeams = allTeams
    ? allTeams.filter((team) =>
        team.strTeam.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const totalPages = Math.ceil((filteredTeams.length || 1) / teamsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Football Teams</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a team"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="row">
        {currentTeams.map((team) => (
          <div key={team.idTeam} className="col-md-3 mb-3">
            <div className="card">
              <img
                src={team.strTeamBadge}
                className="card-img-top"
                alt={team.strTeam}
              />
              <div className="card-body">
                <h5 className="card-title">{team.strTeam}</h5>
                <p className="card-text">Sport: {team.strSport}</p>
                <p className="card-rext">
                  Leagues: {team.strLeague},{team.strLeague2},{team.strLeague3},
                  {team.strLeague4}{" "}
                </p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleButtonClick(team)}
                >
                  Get Information
                </button>
                <br></br>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => onButtonClick(team)}
                >
                  Add Favorite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Teams;
