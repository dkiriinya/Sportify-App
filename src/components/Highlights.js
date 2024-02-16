import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Highlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [favoriteHighlights, setFavoriteHighlights] = useState([]);

  useEffect(() => {
    fetchHighlights();
    fetchFavoriteHighlights();
  }, []);

  const onButtonClick = async (highlight) => {
    // Check if the highlight is already a favorite
    const isFavorite = favoriteHighlights.some(
      (favorite) => favorite.idEvent === highlight.idEvent
    );

    if (isFavorite) {
      alert("This highlight is already a favorite.");
      return; // Do not add the highlight again if it's already a favorite
    }

    try {
      const response = await fetch("http://localhost:8001/HighLights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ highlight }),
      });

      if (response.ok) {
        alert("Highlight added to favorites successfully!");
        // Optionally, you can update the list of favorite highlights
        setFavoriteHighlights([...favoriteHighlights, highlight]);
      } else {
        console.error("Failed to add highlight to favorites");
      }
    } catch (error) {
      console.error("Error adding highlight to favorites:", error);
    }
  };

  const fetchHighlights = async () => {
    const url = `https://www.thesportsdb.com/api/v1/json/60130162/eventshighlights.php?s=Soccer`;

    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Don Gitonga",
        },
      });

      const data = await response.json();

      const modifiedHighlights = data.tvhighlights
        .filter((highlight) => highlight.strThumb)
        .map((highlight) => ({
          ...highlight,
          strThumb: highlight.strThumb,
        }));

      setHighlights(modifiedHighlights);
    } catch (error) {
      console.error("Error fetching highlights:", error);
    }
  };

  const fetchFavoriteHighlights = async () => {
    // Fetch the list of favorite highlights when the component mounts
    try {
      const response = await fetch("http://localhost:8001/HighLights");
      if (response.ok) {
        const data = await response.json();
        setFavoriteHighlights(data);
      } else {
        console.error("Failed to fetch favorite highlights.");
      }
    } catch (error) {
      console.error("Error fetching favorite highlights:", error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of visible slides as needed
    slidesToScroll: 1,
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Recent Match Highlights</h2>
      <Slider {...sliderSettings}>
        {highlights.map((highlight) => (
          <div key={highlight.idEvent} className="mb-4">
            <div className="card">
              {highlight.strThumb && (
                <a
                  href={highlight.strVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={highlight.strThumb}
                    className="card-img-top"
                    alt="Thumbnail"
                  />
                </a>
              )}
              <div className="card-body">
                <h5 className="card-title">{highlight.strEvent}</h5>
                <p className="card-text">League: {highlight.strLeague}</p>
                <p className="card-text">Date: {highlight.dateEvent}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => onButtonClick(highlight)}
                >
                  Add Favorite
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Highlights;
