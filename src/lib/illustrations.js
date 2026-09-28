import about from '../assets/about.svg'
import certificate from '../assets/certificate.svg'
import chatbot from '../assets/chatBot.svg'
import connection from '../assets/connection.svg'
import contact from '../assets/contact.svg'
import hero from '../assets/pic1.svg'
import skills from '../assets/pic2.svg'
import registration from '../assets/registration.svg'

const illustrations = {
  about,
  certificate,
  chatbot,
  connection,
  contact,
  hero,
  skills,
  registration,
}

export function illustration(key) {
  return illustrations[key] || hero
}

export { illustrations }
