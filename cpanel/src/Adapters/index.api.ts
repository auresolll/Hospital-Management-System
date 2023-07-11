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

// API getAnalyticWithRole

export interface AnalyticWithRoleAPI {
  name: string;
  type: string;
  fill: string;
  data: number[];
}

export const getAnalyticWithRole = async (
  year: number
): Promise<ResponseOverviewsAPI<AnalyticWithRoleAPI[]>> => {
  const request = await server.get(`overviews/analytics-to-role?year=${year}`);
  return request.data;
};

// End API getAnalyticWithRole

// API getAnalyticWithRole

export interface AnalyticBaseBySemesterAPI {
  name: string;
  countPatients: number;
  countDoctors: number;
  countRoom: number;
  countPatientDischarged: number;
  countPatientReExamination: number;
}

export const getAnalyticBaseBySemester = async (): Promise<
  ResponseOverviewsAPI<AnalyticBaseBySemesterAPI[]>
> => {
  const request = await server.get(`base/analytic/base-by-semester`);
  return request.data;
};

// End API getAnalyticWithRole
