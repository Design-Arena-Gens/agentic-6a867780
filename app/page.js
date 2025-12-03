'use client';

import { useRef, useState, useEffect } from 'react';

export default function SignatureGenerator() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000080';
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureImage(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    setSignatureImage(image);
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'signature-ouabas-hakima.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '700px',
        width: '100%'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '10px',
          fontSize: '32px',
          fontWeight: '700'
        }}>
          Signature Électronique
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '18px'
        }}>
          Ouabas Hakima
        </p>

        <div style={{
          border: '3px solid #667eea',
          borderRadius: '12px',
          marginBottom: '20px',
          background: '#f8f9ff',
          overflow: 'hidden'
        }}>
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{
              display: 'block',
              cursor: 'crosshair',
              width: '100%',
              height: 'auto'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={clearSignature}
            style={{
              padding: '12px 24px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#dc2626'}
            onMouseOut={(e) => e.target.style.background = '#ef4444'}
          >
            Effacer
          </button>

          <button
            onClick={saveSignature}
            style={{
              padding: '12px 24px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#059669'}
            onMouseOut={(e) => e.target.style.background = '#10b981'}
          >
            Enregistrer
          </button>

          <button
            onClick={downloadSignature}
            style={{
              padding: '12px 24px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#5568d3'}
            onMouseOut={(e) => e.target.style.background = '#667eea'}
          >
            Télécharger PNG
          </button>
        </div>

        {signatureImage && (
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#f0fdf4',
            borderRadius: '12px',
            border: '2px solid #10b981'
          }}>
            <p style={{
              color: '#059669',
              fontWeight: '600',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              ✓ Signature enregistrée avec succès
            </p>
            <img
              src={signatureImage}
              alt="Signature sauvegardée"
              style={{
                maxWidth: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                background: 'white'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
