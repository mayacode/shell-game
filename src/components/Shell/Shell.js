export function Shell({ pos, check, openedShell }) {
  const style = {
    cursor: 'pointer',
    transition: 'all 0.5s ease 0s',
    position: 'absolute',
    zIndex: 10,
    transform: `rotate(${openedShell === pos.key ? '45' : '0'}deg)`,
    width: '55px',
    height: '55px',
    ...pos
  };
  return (
    <svg onClick={check} data-nr={pos.key} viewBox="0 0 55 55" style={style}>
      <path d="M0,50 C0,0 50,0 50,50"></path>
    </svg>
  )
}

export default Shell;
