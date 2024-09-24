import styled, { createGlobalStyle } from 'styled-components';

const getComputedStyleColor = (variableName, fallbackColor) => {
  if (typeof window !== 'undefined') {
    const color = getComputedStyle(document.documentElement).getPropertyValue(
      variableName
    );
    return color.trim() || fallbackColor;
  }
  return fallbackColor;
};

export const getBackgroundColor = () => {
  return getComputedStyleColor('--tg-theme-bg-color', 'rgba(252, 254, 255,1)');
};

export const getTextColor = () => {
  return getComputedStyleColor('--tg-theme-text-color', 'black');
};

export const getHintColor = () => {
  return getComputedStyleColor('--tg-theme-hint-color', 'gray');
};

export const getLinkColor = () => {
  return getComputedStyleColor('--tg-theme-link-color', 'blue');
};

export const getButtonColor = () => {
  return getComputedStyleColor(
    '--tg-theme-button-color',
    'rgba(35, 159, 219,1)'
  );
};

export const getButtonTextColor = () => {
  return getComputedStyleColor(
    '--tg-theme-button-text-color',
    'rgba(252, 254, 255,1)'
  );
};

export const getSecondaryBackgroundColor = () => {
  return getComputedStyleColor(
    '--tg-theme-secondary-bg-color',
    'rgba(193, 205, 208, 1)'
  );
};

export const getHeaderBgColor = () => {
  return getComputedStyleColor('--tg-theme-header-bg-color', 'pink');
};
export const getAccentTextColor = () => {
  return getComputedStyleColor('--tg-theme-accent-text-color', 'pink');
};
export const getSectionBgColor = () => {
  return getComputedStyleColor('--tg-theme-section-bg-color', 'pink');
};
export const getSectionHeaderTextColor = () => {
  return getComputedStyleColor('--tg-theme-section-header-text-color', 'pink');
};
export const getSubtitleTextColor = () => {
  return getComputedStyleColor(
    '--tg-theme-subtitle-text-color',
    'rgba(99, 99, 102, 1)'
  );
};
export const getDestructiveTextColor = () => {
  return getComputedStyleColor('--tg-theme-destructive-text-color', 'pink');
};
export const themeStyle = () => {
  return window.Telegram.WebApp.colorScheme === 'light';
};

export const ModalContainer = styled.div`
  position: absolute;
  height: 101%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scrollbar-width: none;
  width: 100%;
`;

const GlobalStyle = createGlobalStyle`
.marker img {
  position: absolute;
  top: -15px; 
  left: -15px;
}

  :root {
        --rsbs-handle-bg:${getHintColor()}; 
    }
  .MySlider [data-rsbs-header]::before {
    width: var(--header-before-width, 0px);
}

  
  body {
     font-family: Prompt;
     font-weight: normal;
     letter-spacing: 0.4px ;
     line-height: 1.2 ;
     margin: ${props => props.theme.space[0]}px;
     padding: ${props => props.theme.space[0]}px;
    background-color: ${getBackgroundColor()};
    margin-left:auto ;
    margin-right:auto ;
  overflow: hidden;
  touch-action: none;
   overflow-y: scroll;
height: 101%;
    ${props => props.theme.breakpoints.tab} {
  }
  ${props => props.theme.breakpoints.desc} {
    max-width: 1360px;
  }
   
  }

  ul, li, h1, h2, h3, h4, p, button, img  {
     padding: ${props => props.theme.space[0]}px;
     margin: ${props => props.theme.space[0]}px;
  cursor: default;

  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  
  img {padding:0;
  
  }
  button{
    border:0;
    background:0;
  }
`;

export default GlobalStyle;

export const MainTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0.4px;
  text-align: center;
  color: ${getTextColor()};
`;
export const TelRowTitle = styled.div`
  margin-top: 35px;
  margin-left: 14px;
  margin-bottom: 7px;
  color: ${themeStyle() ? 'rgba(99, 99, 102, 1)' : 'rgba(141, 142, 146, 1)'};
  opacity: 1;
  font-size: 13px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  letter-spacing: 0.1px;
  text-transform: uppercase;
`;

export const TelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 0;
  padding: 10px 16px 12px 16px;
  background-color: ${getBackgroundColor()};
`;

export const TelSeparator = styled.div`
  width: 100%;

  height: 0.33px;
  background-color: ${getHintColor()};
  opacity: 0.65;
  margin-top: 12px;
  padding-left: 16px;
  margin-bottom: 10px;
`;
export const TelRow = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align: left;
    color: ${getTextColor()};
  }
  p {
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align: right;
    color: ${getHintColor()};
    white-space: nowrap;
  }
`;

export const secondaryTitle = styled.div`
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.4px;
  text-align: center;
  color: ${getTextColor()};
`;

export const DragonLine = styled.div`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 41px;
  margin-top: 4px;
  height: 0px;
  border-radius: 9px;
`;

export const ButtonBack = styled.button`
  position: absolute;
  z-index: 115;
  left: 8px;
  display: flex;
  align-items: center;
  color: ${getButtonColor()};
  max-height: 21px;
  display: ${prop => (prop.active ? 'absolute' : 'none')};

  animation: display 240ms ease-out;

  @keyframes display {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  p {
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.4px;
  }
  svg {
    width: 12px;
    height: 21px;
    margin-right: 6px;
  }
  use {
    height: 100%;
    fill: ${getButtonColor()};
  }
`;
