'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoContainerProps {
  size?: number;          // Dimensão da imagem em pixels (padrão: 140)
  topOffset?: string;     // Deslocamento relativo da imagem (ex: '-20px')
  marginBottom?: string;  // Margem inferior do container (ex: '16px')
}

export default function LogoContainer({
  size = 140,
  topOffset = '0px',
  marginBottom = '16px',
}: LogoContainerProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        marginBottom,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {!hasError ? (
        <Image
          src="/logo.png"
          alt="StartUUP Logo"
          width={size}
          height={size}
          style={{
            objectFit: 'contain',
            position: 'relative',
            top: topOffset,
          }}
          onError={() => setHasError(true)}
          priority
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '3px dashed #FF0000',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '12px',
            textAlign: 'center',
            padding: '4px',
            fontWeight: 'bold',
          }}
        >
          <span>INSIRA</span>
          <span style={{ color: '#FF0000' }}>logo.jpg</span>
          <span>EM /public</span>
        </div>
      )}
    </div>
  );
}