import './styles.css'
import icon from '../../../src/assets/img/send-not.svg'
import axios from 'axios';
import { BASE_URL } from '../../utils/request';

type Props = {
  saleId: number;
}

function handleClickSendNotification(id: number) {
  axios(`${BASE_URL}/sales/notifySaleUser/${id}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then(response => {
      console.log("SUCCESS!");
    })
}

function NotificationButton({ saleId }: Props) {
  return (
    <div className="dsmeta-blue-btn" onClick={() => handleClickSendNotification(saleId)}>
      <img src={icon} alt="Notificar" />
    </div>
  )

}

export default NotificationButton