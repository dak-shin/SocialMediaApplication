import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

const Navbar = () => {

    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (event,{name}) => {
        
        setActiveItem(name);
    };
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
             />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }


export default Navbar;