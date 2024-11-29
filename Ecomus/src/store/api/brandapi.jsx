import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const brandApi = createApi({
  reducerPath: 'brandApi',

  baseQuery: fetchBaseQuery({ baseUrl:  `${process.env.REACT_APP_API_URL}/brand/` }),
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: () => ({
        url: `frontend`,
        method:'GET'
      })
    }),
    getItemByBrand: builder.query({
      query: ({ name, filter }) => ({
        url: `frontend/${name}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: filter, // Send the filter in the body
      })
    }),
    getNewArrival: builder.query({
      query: () => ({
        url: `list/newarrival`,
        method:'GET'
      })
    }),
    getBestSeller: builder.query({
      query: () => ({
        url: `list/bestseller`,
        method:'GET'
      })
    }),
    getFeatureItem: builder.query({
      query: () => ({
        url: `list/featureitem`,
        method:'GET'
      })
    }),
  }),
})

export const { useGetBrandQuery,useGetItemByBrandQuery,useGetNewArrivalQuery,useGetBestSellerQuery,useGetFeatureItemQuery } = brandApi