import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
const ChannelDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, []);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            zIndex: 100,
            height: "300px",
            background:
              "linear-gradient(90deg,rgba(0,238,247,1) 0%,rgba(206,3,184,1) 100%, rgba(0,212,255,1)100% )",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2" sx={{ border: "1px solid red" }}>
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetails;
