import useSWR from 'swr';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetUsers() {
  const URL = endpoints.user.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  console.log("data: ", data);
  console.log("isLoading: ", isLoading);
  console.log("error: ", error);
  console.log("isValidating: ", isValidating);
  // const memoizedValue = useMemo(
  //   () => ({
  //     users: data?.users || [],
  //     usersLoading: isLoading,
  //     usersError: error,
  //     usersValidating: isValidating,
  //     usersEmpty: !isLoading && !data?.users.length,
  //   }),
  //   [data?.users, error, isLoading, isValidating]
  // );

  // return memoizedValue;
}

// ----------------------------------------------------------------------

// export function useGetPost(title) {
//   const URL = title ? [endpoints.post.details, { params: { title } }] : '';

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       post: data?.post,
//       postLoading: isLoading,
//       postError: error,
//       postValidating: isValidating,
//     }),
//     [data?.post, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

// ----------------------------------------------------------------------

// export function useGetLatestPosts(title) {
//   const URL = title ? [endpoints.post.latest, { params: { title } }] : '';

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       latestPosts: data?.latestPosts || [],
//       latestPostsLoading: isLoading,
//       latestPostsError: error,
//       latestPostsValidating: isValidating,
//       latestPostsEmpty: !isLoading && !data?.latestPosts.length,
//     }),
//     [data?.latestPosts, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

// ----------------------------------------------------------------------

// export function useSearchPosts(query) {
//   const URL = query ? [endpoints.post.search, { params: { query } }] : '';

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
//     keepPreviousData: true,
//   });

//   const memoizedValue = useMemo(
//     () => ({
//       searchResults: data?.results || [],
//       searchLoading: isLoading,
//       searchError: error,
//       searchValidating: isValidating,
//       searchEmpty: !isLoading && !data?.results.length,
//     }),
//     [data?.results, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }
