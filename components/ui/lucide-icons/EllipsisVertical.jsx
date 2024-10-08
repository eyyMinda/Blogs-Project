export function EllipsisVertical({ size = 16, strokeWidth = 2 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={`${strokeWidth}`}
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-ellipsis-vertical">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
