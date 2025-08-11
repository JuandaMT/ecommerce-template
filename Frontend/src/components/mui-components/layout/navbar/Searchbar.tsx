import React from "react";
import { styled } from "@mui/material";

const SearchContainer = styled("div")({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const CustomInput = styled("input")({
  height: 32,
  width: "100%",
  paddingRight: 36,
  border: "1px solid #BEBEBE",
  backgroundColor: "#FFF",
  outline: "none",
});

const IconContainer = styled("div")({
  position: "absolute",
  right: 10,
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
});

const customIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M19.4844 20.1501L13.2229 13.8886C12.7229 14.3143 12.1479 14.6438 11.4979 14.8771C10.8479 15.1105 10.1947 15.2271 9.53837 15.2271C7.9367 15.2271 6.58112 14.6727 5.47162 13.5639C4.36228 12.455 3.80762 11.1003 3.80762 9.49962C3.80762 7.89879 4.36203 6.54287 5.47087 5.43187C6.5797 4.32104 7.93445 3.76562 9.53512 3.76562C11.136 3.76562 12.4919 4.32029 13.6029 5.42962C14.7137 6.53912 15.2691 7.89471 15.2691 9.49637C15.2691 10.1912 15.146 10.8636 14.8999 11.5136C14.6537 12.1636 14.3306 12.7194 13.9306 13.1809L20.1921 19.4426L19.4844 20.1501ZM9.53837 14.2271C10.8652 14.2271 11.9854 13.7704 12.8989 12.8569C13.8124 11.9435 14.2691 10.8234 14.2691 9.49637C14.2691 8.16937 13.8124 7.04921 12.8989 6.13587C11.9854 5.22237 10.8652 4.76562 9.53837 4.76562C8.21137 4.76562 7.0912 5.22237 6.17787 6.13587C5.26437 7.04921 4.80762 8.16937 4.80762 9.49637C4.80762 10.8234 5.26437 11.9435 6.17787 12.8569C7.0912 13.7704 8.21137 14.2271 9.53837 14.2271Z"
      fill="#939393"
    />
  </svg>
);

interface SearchbarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const Searchbar = ({ name, onChange, value }: SearchbarProps) => {
  return (
    <SearchContainer>
      <CustomInput name={name} value={value} onChange={onChange} />
      <IconContainer>{customIcon}</IconContainer>
    </SearchContainer>
  );
};
