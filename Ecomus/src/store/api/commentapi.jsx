import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const commentApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/", prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('Oneuptoken'); // Retrieve the token from local storage
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },}),
  endpoints: (builder) => ({
    postComment: builder.mutation({
        query: (data) => ({
          url: `user/comment`,
          method:'POST',
          body:data
        })
      }),
  }),
})

export const { usePostCommentMutation  } = commentApi