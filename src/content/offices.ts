// 8billionideas offices, shown as a list under the map on mobile (/contact).
// Set open: true and change the status when an office opens.
export interface Office {
  city: string;
  status: string;
  open: boolean;
}

export const offices: Office[] = [
  { city: "London", status: "UK", open: true },
  { city: "Dubai", status: "UAE", open: true },
  { city: "Hong Kong", status: "Opening soon", open: false },
  { city: "USA", status: "Coming soon", open: false },
  { city: "Sydney", status: "Coming soon", open: false },
];
