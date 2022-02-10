import React from "react";
import { FooterUI, ImgAdornment } from './styleFooter';


export default function Footer(props) {


  return (
    <FooterUI > 
      <ImgAdornment
        alt="black decorative slash"
        src="/assets/footerAdornment.svg"       
      />
    </FooterUI>
  );
}
