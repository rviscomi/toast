import React from 'react';

import Button from '../Button';
import { ToastContext } from '../ToastProvider';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const messageId = React.useId();
  const variantIds = [
    React.useId(),
    React.useId(),
    React.useId(),
    React.useId(),
  ];

  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  const { popToast } = React.useContext(ToastContext);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={e => {
        e.preventDefault();

        if (!message) {
          return;
        }
        
        popToast(message, variant);
        setMessage('');
        setVariant(VARIANT_OPTIONS[0]);
      }}>
        <div className={styles.row}>
          <label
            htmlFor={messageId}
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id={messageId} className={styles.messageInput} value={message} onChange={e => {
              setMessage(e.target.value);
            }} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option, i) => (
              <label htmlFor={variantIds[i]} key={option}>
                <input
                  id={variantIds[i]}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={option === variant}
                  onChange={e => {
                    setVariant(e.target.value);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
