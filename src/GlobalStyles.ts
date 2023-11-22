import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
/* Start of reset CSS */

/* Box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Margins and padding */
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul,
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
  padding: 0;
}

/* Typography */
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
}

/* Links */
a {
  color: inherit;
  text-decoration: none;
}

/* Lists */
ol,
ul {
  list-style: none;
}

/* Forms */
input,
button,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
}

button {
  cursor: pointer;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
}

/* Miscellaneous */
:focus {
  outline: none;
}

/* End of reset CSS */

/* Start of base CSS */ 


:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  margin: 0 auto;
  text-align: center;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  @keyframes beat {
    to {
      transform: scale(1.1);
    }
  }
}


@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

/* End of base CSS */
body {
  overflow: hidden;
}

`;

export default GlobalStyles;
