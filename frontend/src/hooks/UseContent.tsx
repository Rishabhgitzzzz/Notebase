import { useEffect, useState } from "react";
import { contentAPI } from "../api/axios";

export const UseContent = () => {
  const [content, setcontent] = useState([]);

  useEffect(() => {
    contentAPI.getContent().then((res) => {
      setcontent(res.data.content);
    });
  }, []);

  return content;
};

export default UseContent;
