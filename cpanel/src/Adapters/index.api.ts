import server from "../Config/axios/axios";

export const getOverviews = async () => {
  const request = await server.get("overviews");
  return request.data;
};
