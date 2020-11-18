import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
html,
body {
  height: 100%;
  overflow-x: hidden;
}

body {
  background-color: rgba(0, 136, 204, .1);
}

.h100 {
  height: 100%;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.ant-layout {
  background: none;
}

`;
