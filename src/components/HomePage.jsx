import React, { useState, useRef } from "react";
import Header from "./Header";
import ImageSlider from "./ImageSlider";

function HomePage() {
  const [isOn, setIsOn] = useState(true);
  const sectionRef = useRef(null);
  
  // Add state to track files
  const [files, setFiles] = useState({
    edges: null,
    songs: null,
    users: null
  });
  
  // Add state to track drag status for styling
  const [dragActive, setDragActive] = useState({
    edges: false,
    songs: false,
    users: false
  });

  function handleScroll() {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  
  // Handle file change from input
  const handleFileChange = (e, fileType) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({
        ...prev,
        [fileType]: e.target.files[0]
      }));
    }
  };
  
  // Handle drag events
  const handleDrag = (e, fileType, isDragging) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragActive(prev => ({
      ...prev,
      [fileType]: isDragging
    }));
  };
  
  // Handle drop event
  const handleDrop = (e, fileType) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragActive(prev => ({
      ...prev,
      [fileType]: false
    }));
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(prev => ({
        ...prev,
        [fileType]: e.dataTransfer.files[0]
      }));
    }
  };

  return (
    <div className="layout-container">
      <Header />
      <div className="container">
        <div className="content-container">
          <h3>Upload your data</h3>
          <p className="description">
            Get personalized song recommendations by uploading a CSV file with
            the following columns: user_id, track_id, rating. Your data will be
            processed using graph neural networks (GNNs) and homomorphic
            encryption to protect your privacy.
          </p>
          <div className="button-container">
            <button className="btn-choose" onClick={handleScroll}>
              Get Started
            </button>
          </div>
        </div>
        <div className="cards-container">
          <div className="card">
            <p className="card-title">GNNs at work</p>
            <p className="card-percentage">25%</p>
            <p className="card-step">Step 1/3</p>
          </div>

          <div className="card">
            <p className="card-title">Homomorphic encryption</p>
            <p className="card-percentage">50%</p>
            <p className="card-step">Step 2/3</p>
          </div>

          <div className="card">
            <p className="card-title">Data processing</p>
            <p className="card-percentage">75%</p>
            <p className="card-step">Step 3/3</p>
          </div>
        </div>
        <div className="upload-sections" ref={sectionRef}>
          <div className="upload-section">
            <h4>Edges File</h4>
            <div 
              className={`upload-area ${dragActive.edges ? 'drag-active' : ''}`}
              onDragEnter={(e) => handleDrag(e, 'edges', true)}
              onDragLeave={(e) => handleDrag(e, 'edges', false)}
              onDragOver={(e) => handleDrag(e, 'edges', true)}
              onDrop={(e) => handleDrop(e, 'edges')}
            >
              <input
                type="file"
                id="edges-file"
                onChange={(e) => handleFileChange(e, 'edges')}
                style={{ display: 'none' }}
              />
              <label htmlFor="edges-file" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="upload-area-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 340.531 419.116"
                  >
                    <path
                      d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                      transform="translate(2944 428)"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="upload-area-title">
                  {files.edges ? files.edges.name : "Upload Edges File"}
                </span>
                <span className="upload-area-description">
                  {files.edges ? "File selected" : "Click to upload or drag and drop"}
                </span>
              </label>
            </div>
          </div>

          <div className="upload-section">
            <h4>Song File</h4>
            <div 
              className={`upload-area ${dragActive.songs ? 'drag-active' : ''}`}
              onDragEnter={(e) => handleDrag(e, 'songs', true)}
              onDragLeave={(e) => handleDrag(e, 'songs', false)}
              onDragOver={(e) => handleDrag(e, 'songs', true)}
              onDrop={(e) => handleDrop(e, 'songs')}
            >
              <input
                type="file"
                id="songs-file"
                onChange={(e) => handleFileChange(e, 'songs')}
                style={{ display: 'none' }}
              />
              <label htmlFor="songs-file" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="upload-area-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 340.531 419.116"
                  >
                    <path
                      d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                      transform="translate(2944 428)"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="upload-area-title">
                  {files.songs ? files.songs.name : "Upload Song File"}
                </span>
                <span className="upload-area-description">
                  {files.songs ? "File selected" : "Click to upload or drag and drop"}
                </span>
              </label>
            </div>
          </div>

          <div className="upload-section">
            <h4>User File</h4>
            <div 
              className={`upload-area ${dragActive.users ? 'drag-active' : ''}`}
              onDragEnter={(e) => handleDrag(e, 'users', true)}
              onDragLeave={(e) => handleDrag(e, 'users', false)}
              onDragOver={(e) => handleDrag(e, 'users', true)}
              onDrop={(e) => handleDrop(e, 'users')}
            >
              <input
                type="file"
                id="users-file"
                onChange={(e) => handleFileChange(e, 'users')}
                style={{ display: 'none' }}
              />
              <label htmlFor="users-file" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="upload-area-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 340.531 419.116"
                  >
                    <path
                      d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                      transform="translate(2944 428)"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="upload-area-title">
                  {files.users ? files.users.name : "Upload User File"}
                </span>
                <span className="upload-area-description">
                  {files.users ? "File selected" : "Click to upload or drag and drop"}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="recommendation-button-container">
          <button
            className="btn-recommendations"
            onClick={() => setIsOn((pre) => !pre)}
            disabled={!files.edges || !files.songs || !files.users}
          >
            Get recommendations
          </button>
        </div>
        <div className="progress-section">
          <div className="progress-header">
            <p>Processing your data</p>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: "25%" }}></div>
          </div>
          <p className="progress-description">
            This process uses GNNs to generate song embeddings, then encrypts
            the embeddings using homomorphic encryption to protect your privacy.
          </p>
        </div>
      </div>
      {isOn && <ImageSlider />}
    </div>
  );
}

export default HomePage;