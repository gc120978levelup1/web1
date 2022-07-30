import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      options={getMapOptions}
      bootstrapURLKeys={{
        key: 'AIzaSyDJXQMJcaatTlzY7u264VmGJn50DV8Yu6Y',
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </Wrapper>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

const getMapOptions = (maps) => {

  return {
      scaleControl: true,
      fullscreenControl: true,
      styles: [{
          featureType: "poi",
          elementType: "labels",
          stylers: [{
              visibility: "on"
          }]
      }],
      gestureHandling: "greedy",
      disableDoubleClickZoom: true,
      minZoom: 5,
      maxZoom: 25,

      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
          style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: maps.ControlPosition.LEFT_TOP,
          mapTypeIds: [
              maps.MapTypeId.ROADMAP,
              maps.MapTypeId.SATELLITE,
              maps.MapTypeId.HYBRID
          ]
      },
      zoomControl: true,
      zoomControlOptions: {
        position: maps.ControlPosition.LEFT_CENTER,
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
        position: maps.ControlPosition.RIGHT_TOP,
      },
      clickableIcons: true
  };
}

export default GoogleMap;
