// import { useEffect, useState } from 'react';

// // API 데이터를 가져오는 커스텀 훅 예시
// function useFetchData(url: string) {
//   const [data, setData] = useState<null | any>(null); // 데이터를 적절한 타입으로 설정할 수 있음
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<null | string>(null); // Error 메시지를 string으로 처리

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err.message); // Error 메시지로 상태 설정
//         } else {
//           setError('An unexpected error occurred');
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [url]);

//   return { data, loading, error };
// }

// export default useFetchData;
