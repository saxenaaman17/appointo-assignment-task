import { createApi } from "@reduxjs/toolkit/query/react";
import { HOME_MODULE } from "../constants/modules";
import {
  BaseQueryFn,
  EndpointBuilder,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { TIME_SLOTS_API } from "../constants/api";

export interface LoginRequest {
  email: string;
  password: string;
}

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface Schedule {
  date: string;
  slots: TimeSlot[];
}

interface TimeslotsRequest {
  startDate: string;
  endDate: string;
}

type TimeslotsResponse = Schedule[];

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://app.appointo.me/scripttag/" }),
  tagTypes: [HOME_MODULE],
  reducerPath: `api/${HOME_MODULE}`,
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    fetchTimeSlots: builder.query<TimeslotsResponse, TimeslotsRequest>({
      query: ({ startDate, endDate }) =>
        `${TIME_SLOTS_API}?start_date=${startDate}&end_date=${endDate}`,
      providesTags: [HOME_MODULE],
    }),
  }),
  keepUnusedDataFor: 300,
});

export const { useFetchTimeSlotsQuery } = api;
