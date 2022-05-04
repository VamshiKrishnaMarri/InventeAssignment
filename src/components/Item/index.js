import './index.css'

const Item = props => {
  const {itemDetails} = props
  const {name, email, number, image} = itemDetails

  return (
    <li className="item-container">
      <img src={image} alt="profile" className="image1" />
      <p className="name">Name: {name}</p>
      <p className="email">Email: {email}</p>
      <p className="email">Number: {number}</p>
    </li>
  )
}

export default Item
