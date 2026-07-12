export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

export const stats: Stat[] = [
  { label: "Years Experience", value: 14, suffix: "+" },
  { label: "Projects Completed", value: 180, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Sq Ft Built", value: 2, suffix: "M+" },
];
