export const mockDashboardData = {
  summaryData: {
    시간대별방문추이: {
      방문: 346,
      방문자: 172,
    },
    페이지뷰: "14",
    체류시간: "56초",
  },
  timeSeriesData: Array.from({ length: 24 }, (_, i) => ({
    hour: String(i).padStart(2, "0"),
    방문: Math.floor(Math.random() * 200),
    방문자: Math.floor(Math.random() * 150),
  })),
  statusDistribution: {
    신규방문: 154,
    재방문: 55,
  },
  browserData: [
    { name: "Chrome", percentage: 74 },
    { name: "Firefox", percentage: 15 },
    { name: "Safari", percentage: 11 },
  ],
  topPages: [
    { page: "main", visits: 268, percentage: 41 },
    { page: "item", visits: 139, percentage: 21 },
    { page: "list", visits: 125, percentage: 19 },
    { page: "cart", visits: 61, percentage: 9 },
    { page: "login", visits: 60, percentage: 9 },
  ],
  topItems: [
    { item: "Honey Nut Cheerios", visits: 1250, percentage: 35 },
    { item: "Cinnamon Toast Crunch", visits: 980, percentage: 28 },
    { item: "Froot Loops", visits: 650, percentage: 18 },
    { item: "Chocolate Lucky Charms", visits: 420, percentage: 12 },
    { item: "Chocolate Cheerios", visits: 250, percentage: 7 },
  ],
};
