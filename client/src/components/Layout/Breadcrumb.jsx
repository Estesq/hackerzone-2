import React, { Component } from 'react'
import '../../assets/css/Breadcrumb.scss'
import { Link } from "react-router-dom";

class Breadcrumbs extends Component {

  render() {
    return (

      <div className="container">
        <div className="row">
          <ul className="breadcrumb wizard">

            <li
              className="completed">
              <Link to='/'>
                Home
                </Link>
            </li>
            {this.props.bread.map((el, index) => {
              return (<li
                key={index}
                className={el.link ? "completed" : ""}>
                <Link to={el.link ? `${el.link}` : '/'}>
                  {el.title}
                </Link>
              </li>)
            }
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Breadcrumbs
