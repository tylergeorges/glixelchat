export function ProfileIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.5 7 9"
      shape-rendering="crispEdges"
      id="profile-icon"
      className={className}
    >
      <path
        stroke="#161616"
        d="M2 0h3M1 1h5M1 2h5M1 3h5M2 4h3M1 6h5M0 7h7M0 8h7"
      />
    </svg>
  );
}
