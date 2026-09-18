'use client';

import { useState } from 'react';
import { VT323 } from 'next/font/google';

const vt323 = VT323({ weight: '400', subsets: ['latin'] });

export default function StartUUPGateway() {
  const [view, setView] = useState<'HOME' | 'REGISTER'>('HOME');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('LOADING');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Falha no protocolo S.A.M.');

      setStatus('SUCCESS');
      setMessage(
        data.isPremium
          ? 'ACESSO FORJADO. VOCÊ ESTÁ ENTRE OS 100 PRIMEIROS. 1 MÊS PREMIUM GARANTIDO.'
          : 'ACESSO FORJADO. VAGAS PREMIUM ESGOTADAS. BEM-VINDO AO PLANO BASE.'
      );
    } catch (err: any) {
      setStatus('ERROR');
      setMessage(err.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${vt323.className}`}
      style={{ backgroundColor: '#FFFFFF', color: '#000000', margin: 0, padding: 0 }}
    >
      {/* 1. FAIXA SUPERIOR: Idêntica à faixa inferior, estreita, preta com bordas vermelhas e sem texto */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#000000',
          borderTop: '2px solid #FF0000',
          borderBottom: '2px solid #FF0000',
          height: '19px',
        }}
      />

      {/* 2. ÁREA CENTRAL */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '16px' }}>
        
        {/* Bandeira Pixel Art proporcional */}
        <div style={{ width: '130px', height: '130px', marginBottom: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 70 A 20 5 0 0 0 70 70" stroke="#000000" strokeWidth="5" fill="none" />
            <path d="M20 75 A 30 8 0 0 0 80 75" stroke="#000000" strokeWidth="5" fill="none" />
            <path d="M25 80 A 25 7 0 0 0 75 80" stroke="#000000" strokeWidth="5" fill="none" />
            <rect x="47" y="15" width="6" height="60" fill="#000000" />
            <path d="M53 15 L92 28 L53 42 Z" fill="#FF0000" stroke="#000000" strokeWidth="3" strokeLinejoin="miter" />
          </svg>
        </div>

        {view === 'HOME' ? (
          <>
            <h1
              style={{
                fontSize: '20px',
                textAlign: 'center',
                lineHeight: '1.1',
                marginBottom: '24px',
                letterSpacing: '2px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#000000',
              }}
            >
              CONECTE-SE<br />COLABORE<br />CRIE
            </h1>

            {/* BOTÕES: Menores, estreitos (210px x 38px) e bem separados */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                type="button"
                style={{
                  width: '210px',
                  height: '30px',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: '2px solid #FF0000',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                ENTRAR
              </button>

              <button
                type="button"
                onClick={() => setView('REGISTER')}
                style={{
                  width: '210px',
                  height: '30px',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: '2px solid #FF0000',
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
          </>
        ) : (
          /* Formulário de Cadastro e Promoção */
          <div style={{ width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {status === 'SUCCESS' ? (
              <div style={{ border: '2px solid #FF0000', backgroundColor: '#000000', color: '#FFFFFF', padding: '20px', textAlign: 'center', fontSize: '20px', width: '100%' }}>
                {message}
              </div>
            ) : (
              <>
                <div style={{ border: '2px solid #000000', padding: '14px', marginBottom: '16px', textAlign: 'center', width: '100%', fontSize: '18px' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '6px' }}>FÁBRICA MERITOCRÁTICA DE MVPS (S.A.M.)</p>
                  <p style={{ color: '#FF0000', fontWeight: 'bold' }}>PROMOÇÃO DE FUNDAÇÃO:</p>
                  <p>Os primeiros 100 Founders recebem 1 mês de Patente Premium gratuita.</p>
                </div>

                <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <input
                    type="email"
                    required
                    placeholder="E-MAIL DE FOUNDER"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'LOADING'}
                    style={{
                      width: '240px',
                      height: '38px',
                      border: '2px solid #000000',
                      padding: '0 10px',
                      fontSize: '18px',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: '#000000',
                    }}
                  />

                  {status === 'ERROR' && (
                    <p style={{ color: '#FFFFFF', backgroundColor: '#FF0000', padding: '4px 8px', marginBottom: '10px', fontSize: '16px', textAlign: 'center', width: '240px' }}>
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'LOADING'}
                    style={{
                      width: '240px',
                      height: '38px',
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '2px solid #FF0000',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}
                  >
                    {status === 'LOADING' ? 'PROCESSANDO...' : 'INICIAR PROTOCOLO'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setView('HOME')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#555555',
                      cursor: 'pointer',
                      fontSize: '16px',
                      textDecoration: 'underline',
                      textTransform: 'uppercase',
                    }}
                  >
                    VOLTAR
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>

      {/* 3. BASE: Faixa inferior mais estreita, preta com bordas vermelhas */}
      <div style={{ width: '100%' }}>
        <div
          style={{
            width: '100%',
            backgroundColor: '#000000',
            borderTop: '2px solid #FF0000',
            borderBottom: '2px solid #FF0000',
            padding: '2px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            ENTRAR COM GITHUB
          </button>
        </div>

        <div style={{ textAlign: 'center', padding: '6px 0', backgroundColor: '#FFFFFF' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', color: '#000000', textTransform: 'uppercase' }}>
            STARTUPP V.1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}