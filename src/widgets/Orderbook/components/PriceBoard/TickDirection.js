import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

const TickDirection = ({ lastTickDirection }) => {
  let icon;

  switch(lastTickDirection) {
    case 'PlusTick':
      icon = 'md-arrow-up';
      break;
    case 'ZeroPlusTick':
      icon = 'md-arrow-dropup';
      break;
    case 'MinusTick':
      icon = 'md-arrow-down';
      break;
    case 'ZeroMinusTick':
      icon = 'md-arrow-dropdown';
      break;
    default:
      icon = '';
      break;
  }

  if (icon) {
    return <Ionicon icon={icon} fontSize="20px" />;
  }

  return null;
};

TickDirection.propTypes = {
  lastTickDirection: PropTypes.string.isRequired,
};

export { TickDirection };
