import React, { useState, useEffect } from "react";
import { userData } from "../users";
import "./imageSliderStyles.css";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userImages, setUserImages] = useState({});

  const getRandomImageNumber = () => Math.floor(Math.random() * 7) + 1;

  useEffect(() => {
    const images = {};
    Object.keys(userData).forEach((username) => {
      images[username] = getRandomImageNumber();
    });
    setUserImages(images);
  }, []);

  const users = Object.entries(userData);
  const slidesCount = Math.ceil(users.length / 6);

  useEffect(() => {
    if (slideDirection) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  const getCurrentSlideUsers = () => {
    const startIdx = currentSlide * 6;
    const currentUsers = users.slice(startIdx, startIdx + 6);
    while (currentUsers.length < 6) {
      currentUsers.push([`empty-${currentUsers.length}`, {}]);
    }
    return currentUsers;
  };

  const nextSlide = () => {
    if (currentSlide < slidesCount - 1 && !isAnimating) {
      setSlideDirection("slide-left");
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setSlideDirection("slide-right");
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleDotClick = (idx) => {
    if (!isAnimating && idx !== currentSlide) {
      setSlideDirection(idx > currentSlide ? "slide-left" : "slide-right");
      setCurrentSlide(idx);
    }
  };

  const handleCardClick = (user) => {
    if (Object.keys(user[1]).length > 0) {
      setSelectedUser(user[0]);
      setSelectedUserData(user[1]);
    }
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <button
          className={`nav-button prev ${
            currentSlide === 0 || isAnimating ? "disabled" : ""
          }`}
          onClick={prevSlide}
          disabled={currentSlide === 0 || isAnimating}
        >
          <img
            src={`/images/left-arrow.svg`}
            alt="Profile"
            className="arrow-svg"
          />
        </button>

        <div className={`grid-container ${slideDirection}`} key={currentSlide}>
          {getCurrentSlideUsers().map(([username, userSongs], idx) => (
            <div
              key={`${currentSlide}-${username}-${idx}`}
              className={`card ${
                !Object.keys(userSongs).length ? "empty" : ""
              }`}
              onClick={() => handleCardClick([username, userSongs])}
            >
              {Object.keys(userSongs).length > 0 && (
                <>
                  <div className="profile">
                    <div className="profile-user">
                      <img
                        src={`/images/${userImages[username]}.svg`}
                        alt="Profile"
                        className="profile-svg"
                      />
                    </div>
                    <h3 className="profile-userName">{username}</h3>
                  </div>
                  <div className="songs">
                    <hr />
                    <p>{Object.keys(userSongs).length} Songs</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          className={`nav-button next ${
            currentSlide === slidesCount - 1 || isAnimating ? "disabled" : ""
          }`}
          onClick={nextSlide}
          disabled={currentSlide === slidesCount - 1 || isAnimating}
        >
          <img
            src={`/images/right-arrow.svg`}
            alt="Profile"
            className="arrow-svg"
          />
        </button>

        <div className="dots">
          {[...Array(slidesCount)].map((_, idx) => (
            <span
              key={idx}
              className={`dot ${currentSlide === idx ? "active" : ""}`}
              onClick={() => handleDotClick(idx)}
            />
          ))}
        </div>
      </div>

      {selectedUser && selectedUserData && (
        <div
          className="modal-overlay"
          onClick={() => {
            setSelectedUser(null);
            setSelectedUserData(null);
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => {
                setSelectedUser(null);
                setSelectedUserData(null);
              }}
            >
              ×
            </button>
            <div className="profile-image-modal">
              <div className="profile-user-modal">
                <img
                  src={`/images/${userImages[selectedUser]}.svg`}
                  alt="Profile"
                  className="profile-modal-svg"
                />
              </div>
              <h2>{selectedUser}</h2>
            </div>
            <div className="song-list">
              <div className="modal-meta">
                <span>Song Name</span>
                <span>Strength</span>
              </div>
              {Object.entries(selectedUserData).map(
                ([songKey, songData], idx) => (
                  <div key={idx} className="song-item">
                    <div className="song">
                      <div className="song-image">.</div>
                      <span className="song-name">{songData.name}</span>
                    </div>
                    <span className="song-strength">
                      {" "}
                      {songData.strength.toFixed(2)}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
