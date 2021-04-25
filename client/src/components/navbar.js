import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu} from 'semantic-ui-react'

const Navbar = () => {

    const path = window.location.pathname;

    const pathName = path === '/'? 'home' : path.substr(1);

    const [activeItem, setActiveItem] = useState(pathName);

    const handleItemClick = (event,{name}) => {
        
        setActiveItem(name);
    };
    return (
      <div>
        <Menu pointing secondary size="massive">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
             />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
                to="/register"
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }


export default Navbar;