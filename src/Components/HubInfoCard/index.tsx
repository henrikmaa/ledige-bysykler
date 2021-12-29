import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  GlobalStyles,
  keyframes,
  Stack,
  Typography,
} from "@mui/material";
import { BikeHub } from "../../../dto/hubs.dto";
import { statusColor } from "../../utils/status.util";

interface ComponentProps {
  hub: BikeHub;
}

const HubInfoCard = (props: ComponentProps) => {
  const { hub } = props;
  const [color, setColor] = React.useState<any>(null);
  let pulse;
  if (color) {
    pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(${color.r}, ${color.g}, ${color.b}, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(${color.r}, ${color.g}, ${color.b}, 0);
    }

100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(${color.r}, ${color.g}, ${color.b}, 0);
  }
`;
  }

  useEffect(() => {
    setColor(statusColor(hub.available_vehicles, hub.capacity));
  }, [hub]);

  return (
    <>
      {color ? (
        <>
          <GlobalStyles
            styles={{
              ".status-indicator": {
                background: "red",
                boxShadow: `0 0 0 0 rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                transform: "scale(1)",
                animation: `${pulse} 2s infinite`,
              },
            }}
          />
          <Card variant="outlined" sx={{ width: 400 }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 500 }}>
                  {hub.name}
                </Typography>
                <Box
                  className="status-indicator"
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    borderRadius: "50%",
                  }}
                />
              </Stack>
              <Typography
                variant="body1"
                sx={{ mt: (theme) => theme.spacing(2) }}
              >
                Det er {hub.available_vehicles} tilgjengelige sykler av totalt{" "}
                {hub.capacity}
              </Typography>
            </CardContent>
          </Card>
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default HubInfoCard;
