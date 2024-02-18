import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

export default function LiveScores() {
  const [liveScores, setLiveScores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const scoresPerPage = 5; 

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://www.thesportsdb.com/api/v2/json/60130162/livescore.php?s=Soccer';
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.events) {
          setLiveScores(data.events);
        }
      } catch (error) {
        console.error('Error fetching live scores:', error);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const filteredLiveScores = liveScores.filter((score) =>
    score.strHomeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    score.strAwayTeam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;
  const currentScores = filteredLiveScores.slice(indexOfFirstScore, indexOfLastScore);

  const totalPages = Math.ceil(filteredLiveScores.length / scoresPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h2>Live Scores</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a team"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {currentScores.length === 0 && <p>No live scores available</p>}
      {currentScores.map((score, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img src={score.strHomeTeamBadge} alt={score.strHomeTeam} style={{ width: '50px' }} />
                <span className="ml-2">{score.strHomeTeam}</span>
              </div>
              <div className="col-md-4 text-center">
                <h3>{score.intHomeScore} - {score.intAwayScore}</h3>
                <p>{score.strProgress}</p>
                <p>{score.strStatus}</p>
                <p>{score.strEventTime}</p>
              </div>
              <div className="col-md-4">
                <img src={score.strAwayTeamBadge} alt={score.strAwayTeam} style={{ width: '50px' }} />
                <span className="ml-2">{score.strAwayTeam}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
