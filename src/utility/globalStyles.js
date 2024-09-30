import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    
  }
  ul, li, h1, h2, h3, h4, p, button, img  {
     padding: 0px;
     margin: 0px;
  cursor: default;

  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button{
    
  }
  img {padding:0;
    display: block;
     /* height: auto;

    object-fit: cover;
    object-position: center; */
  }
`;

export default GlobalStyle;
