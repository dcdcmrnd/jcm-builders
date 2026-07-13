export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

export const stats: Stat[] = [
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Projects Completed", value: 20, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Sq Ft Built", value: 50, suffix: "K+" },
];
