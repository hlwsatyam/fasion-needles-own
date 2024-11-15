import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const commentApi = createApi({
  reducerPath: 'wishlistApi',
 
  baseQuery: fetchBaseQuery({ baseUrl:  `${process.env.REACT_APP_API_URL}/user/comment`, prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('Oneuptoken'); // Retrieve the token from local storage
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },}),
  endpoints: (builder) => ({
    postComment: builder.mutation({
        query: (data) => ({
          url: `/`,
          method:'POST',
          body:data
        })
      }),
    getComment: builder.mutation({
        query: (data) => ({
          url: `/getComment`,
          method:'POST',
          body:data
        })
      }),
       
  }),
})

export const { usePostCommentMutation,useGetCommentMutation  } = commentApi