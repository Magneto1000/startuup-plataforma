'use client';

export default function BottomBar() {
  return (
    <footer
      style={{
        width: '100%',
        flexShrink: 0,
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#000000',
          borderTop: '3px solid #FF0000',
          borderBottom: '3px solid #FF0000',
          padding: '3px 16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          type="button"
          onClick={() => alert('Autenticação via GitHub em desenvolvimento.')}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '10px',
            fontWeight: 'bold',
            letterSpacing: '3px',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          ENTRAR COM GITHUB
        </button>
      </div>

      <div style={{ textAlign: 'center', padding: '8px 0', backgroundColor: '#FFFFFF' }}>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            color: '#000000',
            textTransform: 'uppercase',
          }}
        >
          STARTUPP V.1.0.0
        </p>
      </div>
    </footer>
  );
}