'use client';

import { useRouter } from 'next/navigation';
import { VT323 } from 'next/font/google';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import LogoContainer from '@/components/LogoContainer';

const vt323 = VT323({ weight: '400', subsets: ['latin'] });

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className={vt323.className}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        color: '#000000',
      }}
    >
      <TopBar />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 16px',
          width: '100%',
          maxWidth: '460px',
          margin: '0 auto',
        }}
      >
        {/* Parâmetros exclusivos da Home */}
        <LogoContainer size={130} topOffset="-15px" marginBottom="14px" />

        <h1
          style={{
            fontSize: '20px',
            textAlign: 'center',
            lineHeight: '1.1',
            marginBottom: '28px',
            letterSpacing: '2px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#000000',
          }}
        >
          CONECTE-SE<br />COLABORE<br />CRIE
        </h1>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <button
            type="button"
            onClick={() => alert('Fluxo de login em desenvolvimento')}
            style={{
              width: '100%',
              maxWidth: '240px',
              height: '23px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '3px solid #FF0000',
              fontSize: '10px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            ENTRAR
          </button>

          <button
            type="button"
            onClick={() => router.push('/cadastro')}
            style={{
              width: '100%',
              maxWidth: '240px',
              height: '23px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '3px solid #FF0000',
              fontSize: '10px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            CADASTRAR
          </button>
        </div>
      </main>

      <BottomBar />
    </div>
  );
}