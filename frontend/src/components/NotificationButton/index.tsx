import './styles.css'
import icon from '../../../src/assets/img/send-not.svg'
import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type Props = {
  saleId: number;
}

function handleClickSendNotification(id: number) {
  const notifyPromise = toast.promise(
    axios(`${BASE_URL}/sales/${id}/notifySaleUser`),
    {
      pending: 'Sending notification...',
      success: 'Notification sent successfully! ',
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
  
  return notifyPromise;
}

function NotificationButton({ saleId }: Props) {
  return (
    <div className="dsmeta-blue-btn" onClick={() => handleClickSendNotification(saleId)}>
      <img src={icon} alt="Notificar" />
    </div>
  )

}

export default NotificationButton