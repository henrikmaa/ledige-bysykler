import React, { useEffect, useState } from "react";
import { Box, GlobalStyles } from "@mui/material";
import MapboxMap from "../../Components/Map";
import { loadBikeHubs } from "../../Components/Map/Layers/availabilityLayer";
import HubInfoCard from "../../Components/HubInfoCard";
import { BikeHub } from "../../../dto/hubs.dto";

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState<BikeHub | null>(null);
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
            onClickCallback={(feature) => setSelectedFeature(feature)}
            initialPosition={[5.733107, 58.969975]}
            onLoaded={(map) => {
              loadBikeHubs(map, data);
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Box>
      {selectedFeature && (
        <Box
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(8),
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <HubInfoCard hub={selectedFeature} />
        </Box>
      )}
    </>
  );
};

export default Home;
