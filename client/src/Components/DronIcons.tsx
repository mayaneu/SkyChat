const CopterIcon = ({ color = 'currentColor', size = '24px' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ width: size, height: size }}>
      <path d="M4 9 h4 l10 2 v1 l-10 2 h-4 z" />
      <path d="M9 9 v6" />
      <circle cx="5" cy="12" r="1" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
      <path d="M14 12 h2" />
    </svg>
  );
}

export default CopterIcon;
