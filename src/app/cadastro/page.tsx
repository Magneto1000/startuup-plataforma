'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VT323 } from 'next/font/google';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import LogoContainer from '@/components/LogoContainer';

const vt323 = VT323({ weight: '400', subsets: ['latin'] });

export default function CadastroPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    roleArea: '',
    age: '',
    lgpdConsent: false,
  });

  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.lgpdConsent) {
      setStatus('ERROR');
      setMessage('É NECESSÁRIO CONCORDAR COM OS TERMOS DE DADOS (LGPD).');
      return;
    }

    setStatus('LOADING');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
          padding: '20px 16px',
          width: '100%',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        {/* Parâmetros exclusivos do Cadastro */}
        <LogoContainer size={120} topOffset="-20px" marginBottom="12px" />

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Caixa do Vídeo com reprodutor integrado */}
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#000000',
              border: '3px solid #FF0000',
              marginBottom: '16px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '15px',
                letterSpacing: '2px',
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              VÍDEO DE APRESENTAÇÃO // PROTOCOLO S.A.M.
            </p>
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#000000',
                border: '2px dashed #FF0000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <video
                src="/apresentacao.mp4"
                controls
                playsInline
                preload="metadata"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  outline: 'none',
                }}
              >
                O seu navegador não suporta a reprodução deste vídeo.
              </video>
            </div>
          </div>

          {status === 'SUCCESS' ? (
            <div
              style={{
                border: '3px solid #FF0000',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                padding: '20px',
                textAlign: 'center',
                fontSize: '19px',
                width: '100%',
                maxWidth: '420px',
              }}
            >
              <p style={{ marginBottom: '14px' }}>{message}</p>
              <button
                type="button"
                onClick={() => router.push('/')}
                style={{
                  background: 'none',
                  border: '2px solid #FFFFFF',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  textTransform: 'uppercase',
                }}
              >
                RETORNAR AO GATEWAY
              </button>
            </div>
          ) : (
            <>
              {/* Regras de Fundação */}
              <div
                style={{
                  border: '3px solid #000000',
                  padding: '12px',
                  marginBottom: '14px',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '420px',
                  fontSize: '17px',
                }}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>FÁBRICA MERITOCRÁTICA DE MVPS (S.A.M.)</p>
                <p style={{ color: '#FF0000', fontWeight: 'bold' }}>PROMOÇÃO DE FUNDAÇÃO:</p>
                <p>Os primeiros 100 Founders recebem 1 mês de Patente Premium gratuita.</p>
              </div>

              {/* Formulário com Inputs e Botão Ajustados */}
              <form
                onSubmit={handleRegister}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="NOME COMPLETO DO FOUNDER"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={status === 'LOADING'}
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    height: '30px',
                    border: '3px solid #000000',
                    padding: '0 12px',
                    fontSize: '10px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                  }}
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="E-MAIL DE CONTATO"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'LOADING'}
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    height: '30px',
                    border: '3px solid #000000',
                    padding: '0 12px',
                    fontSize: '10px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                  }}
                />

                <input
                  type="text"
                  name="roleArea"
                  required
                  placeholder="ÁREA DE ATUAÇÃO (EX: TECH, DESIGN, PRODUTO)"
                  value={formData.roleArea}
                  onChange={handleChange}
                  disabled={status === 'LOADING'}
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    height: '30px',
                    border: '3px solid #000000',
                    padding: '0 12px',
                    fontSize: '10px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                  }}
                />

                <input
                  type="number"
                  name="age"
                  required
                  min="16"
                  max="120"
                  placeholder="IDADE"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={status === 'LOADING'}
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    height: '30px',
                    border: '3px solid #000000',
                    padding: '0 12px',
                    fontSize: '10px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                  }}
                />

                {/* Termos LGPD */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    border: '2px solid #000000',
                    padding: '10px',
                    backgroundColor: '#F8F8F8',
                    fontSize: '13px',
                    lineHeight: '1.25',
                  }}
                >
                  <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#000000' }}>
                    TERMOS DE PRIVACIDADE E DADOS (LGPD - LEI Nº 13.709/2018):
                  </p>
                  <p style={{ color: '#333333', marginBottom: '8px' }}>
                    Os dados cadastrados serão utilizados exclusivamente para autenticação de acesso, atribuição de patentes do algoritmo S.A.M. e comunicação oficial da StartUUP. Não comercializamos dados a terceiros.
                  </p>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    <input
                      type="checkbox"
                      name="lgpdConsent"
                      checked={formData.lgpdConsent}
                      onChange={handleChange}
                      disabled={status === 'LOADING'}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <span>CONCORDO COM OS TERMOS E USO DE DADOS</span>
                  </label>
                </div>

                {status === 'ERROR' && (
                  <p
                    style={{
                      width: '100%',
                      maxWidth: '360px',
                      backgroundColor: '#FF0000',
                      color: '#FFFFFF',
                      padding: '6px 10px',
                      fontSize: '15px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'LOADING'}
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    height: '20px',
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    border: '3px solid #FF0000',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  {status === 'LOADING' ? 'PROCESSANDO...' : 'INICIAR PROTOCOLO'}
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#000000',
                    cursor: 'pointer',
                    fontSize: '9px',
                    textDecoration: 'underline',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                    marginBottom: '8px',
                  }}
                >
                  VOLTAR AO INÍCIO
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <BottomBar />
    </div>
  );
}