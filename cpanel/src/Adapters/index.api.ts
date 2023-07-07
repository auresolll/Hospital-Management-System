import server from "../Config/axios/axios";

export interface ResponseOverviewsAPI<T> {
  statusCode: number;
  data: T;
}

// API getOverviews

export interface OverviewsAPI {
  count: number;
  countPrevious: number;
  totalCountInMonth: number;
  percentageIncrease: number;
  type: string;
}

export const getOverviews = async (): Promise<
  ResponseOverviewsAPI<OverviewsAPI[]>
> => {
  const request = await server.get("overviews");
  return request.data;
};

// End API getOverviews
