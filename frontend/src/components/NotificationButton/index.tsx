import './styles.css'
import icon from '../../../src/assets/img/send-not.svg'

function NotificationButton() {
  return (
    <div className="dsmeta-red-btn">
      <img src={icon} alt="Notificar" />
    </div>
  )

}

export default NotificationButton