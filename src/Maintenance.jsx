export default function Maintenance() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', color: '#333' }}>
        Site Under Maintenance
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        See you at nationals!
      </p>
    </div>
  );
}
