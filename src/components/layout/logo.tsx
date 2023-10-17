export function Logo() {
  return (
    <div className="flex flex-row items-center text-xl font-semibold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        // className="lucide lucide-circle-dollar-sign"
      >
        <circle className="text-foreground" cx="12" cy="12" r="10" />
        <path
          className="text-primary"
          d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"
        />
        <path className="text-primary" d="M12 18V6" />
      </svg>

      <span className="ml-2">Exp</span>
      <span className="text-primary">Tracker</span>
    </div>
  )
}
