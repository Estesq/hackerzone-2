import React from 'react';
import '../../assets/css/modal.scss';
import '@fortawesome/fontawesome-free/css/all.css'

const ModalModel = (props) => {
  const { closeModal } = props;

  const closeicon = () => (
    <i className="fas fa-times-circle fa-2x"
      onClick={closeModal}
      style={{
        color: '#32a11d7',
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 0,
        position: 'absolute',
        top: '0.3rem',
        right: '0.5rem',
        zIndex: 999,
        mixBlendMode: "difference"
      }}
    />
  );

  return (
    <div className="overlay">

      { closeicon()}
      {props.children}
    </div>
  );
};


export default ModalModel;