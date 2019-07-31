import React from 'react';
import Iframe from 'react-iframe';

const Embed = () => (
  <Iframe url="https://c4arena.com/embed"
        width="100%"
        height="480px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
);

export default Embed;
