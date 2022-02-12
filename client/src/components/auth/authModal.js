import React, {useState} from 'react'

export default (ChildComponent) => {
  
  const ComposedComponent = (props) => {

    const [show, setShow] = useState(true);

    const showModal = () => {
      setShow(true);
    };

    const hideModal = () => {
      setShow(false);
    };

    const tempProps = {...props};
    Object.assign(tempProps, {show: show, handleClose: hideModal});

    return (
      <ChildComponent {...tempProps}/>
    );
  };

  return ComposedComponent;
};