import React, { useEffect, useState } from "react";
import { Box, GlobalStyles } from "@mui/material";
import MapboxMap from "../../Components/Map";
import { loadBikeHubs } from "../../Components/Map/Layers/availabilityLayer";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (process.env.REACT_APP_BYSYKLER_API) {
        const res = await fetch(process.env.REACT_APP_BYSYKLER_API);
        const json = await res.json();
        setData(json);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data.length);
  }, [data]);

  return (
    <>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#0d131e", width: "100vw", height: "100vh" },
        }}
      />
      <Box sx={{ p: 0, m: 0, width: "100vw", height: "100vh" }}>
        {data.length > 0 ? (
          <MapboxMap
            onLoaded={(map) => {
              loadBikeHubs(map, data);
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </>
  );
};

export default Home;
