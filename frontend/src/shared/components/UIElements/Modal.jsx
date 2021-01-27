import React from 'react';
import classes from './Modal.module.css';
const Modal = (props) => {
  const showHideClassName = props.show
    ? [classes.Modal, classes.Show]
    : [classes.Modal, classes.DontShow];
  return (
    <div className={showHideClassName.join(' ')}>
      <section onClick={() => {}} className={classes.ModalMain}>
        {props.children}
      </section>
    </div>
  );
};

export default Modal;
