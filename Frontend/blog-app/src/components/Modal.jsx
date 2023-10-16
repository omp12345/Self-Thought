import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon from react-icons
import './Modal.css';
import { useNavigate } from 'react-router-dom';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleclick = () => {
    navigate('/login');
  };

  const speakGoBack = () => {
    speakMessage('Something Went Wrong');
  };

  useEffect(() => {
    if (isOpen && !isSpeaking) {
      speakGoBack();
    }
  }, [isOpen, isSpeaking]);

  const speakMessage = (message) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
    };
  };

  return (
    <div>
      <button onClick={toggleModal} className="modal-button">
        <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=626&ext=jpg&ga=GA1.1.1660271314.1697394009&semt=ais"
          alt=""
        />
      </button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{color:"red"}}>Go back</h2>
              <button className="close-button" onClick={handleclick}>
                <AiOutlineClose size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
