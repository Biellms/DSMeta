import { useState } from 'react';
import './styles.css';
import icon from '../../../src/assets/img/send-not.svg';
import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type Props = {
  saleId: number;
};

function NotificationButton({ saleId }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    const limitedValue = value.slice(0, 11); // Limita a 11 números
    setPhoneInput(
      limitedValue
        .replace(/^(\d{2})(\d)/, '($1) $2') // Formata os dois primeiros dígitos
        .replace(/(\d{4})(\d{4})$/, '$1-$2') // Adiciona o traço no final
    );
  };

  const confirmNotification = () => {
    // const formattedPhoneNumber = `55${phoneInput.replace(/\D/g, '')}`;
    const notifyPromise = toast.promise(
      // axios(`${BASE_URL}/sales/${saleId}/notifySaleUser?phoneNumber=${formattedPhoneNumber}`),
      axios(`${BASE_URL}/sales/${saleId}/notifySaleUser`),
      {
        pending: 'Sending notification...',
        success: 'Notification sent successfully!',
        error: "Failed to send notification! I probably don't have money anymore to request the API! 😭",
      },
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      }
    );
    closeModal();
    return notifyPromise;
  };

  return (
    <>
      <div className="dsmeta-blue-btn" onClick={openModal}>
        <img src={icon} alt="Notificar" />
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <p className='modal-container-title'>Enter the phone number to send the notification:</p>
            <div className="modal-input-group">
              <input
                className="modal-input fixed"
                type="text"
                value="+55"
                readOnly
              />
              <input
                className="modal-input"
                type="text"
                placeholder="(11) 98888-7777"
                value={phoneInput}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="modal-buttons">
              <button className="modal-button confirm" onClick={confirmNotification}>
                Send
              </button>
              <button className="modal-button cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationButton;
