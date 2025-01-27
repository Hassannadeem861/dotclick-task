import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";

const Layout = ({ Children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "60vh" }}>{Children}</main>
    </>
  );
};

export default Layout;
