import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchGraphList = async () => {
  try {
    const response = await api.get("/pipeline/graphList");
    return response.data.map((graph) => ({
      id: graph.id,
      name: graph.graph_name,
    }));
  } catch (error) {
    console.error("Error fetching graph list:", error);
    throw error;
  }
};

// export const submitGraphSelections = async (processId, graphIds) => {
//   const responses = await Promise.all(
//     graphIds.map(async (graphId) => {
//       switch (graphId) {
//         case 1: // barchart
//           return fetchTop5Items(processId);
//         case 2: // piechart
//           return fetchPieChart(processId);
//         case 3: // treemap
//           return fetchTreemap(processId);
//         case 4: // priceboard
//           return fetchPriceBoard(processId);
//         default:
//           return null;
//       }
//     })
//   );
//   return responses;
// };
