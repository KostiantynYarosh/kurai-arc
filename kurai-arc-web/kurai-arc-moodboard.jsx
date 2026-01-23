import React, { useState, useEffect } from 'react';

const KuraiArcMoodboard = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const colors = {
    primary: {
      deepBlack: '#0A0A0B',
      softBlack: '#141417',
      darkGray: '#1C1C21',
      warmWhite: '#E8E6E3',
    },
    accent: {
      purple: '#8B5CF6',
      indigo: '#6366F1',
      red: '#DC2626',
    },
    secondary: {
      gray: '#71717A',
      border: '#27272A',
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.primary.deepBlack,
      color: colors.primary.warmWhite,
      fontFamily: "'Neue Montreal', 'SF Pro Display', -apple-system, sans-serif",
      overflow: 'hidden',
    }}>
      {/* Noise Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 1000,
      }} />

      {/* Hero Section */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '2rem',
      }}>
        {/* Glow Effect */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.accent.purple}15 0%, transparent 70%)`,
          filter: 'blur(100px)',
          opacity: loaded ? 0.6 : 0,
          transition: 'opacity 2s ease-out',
        }} />

        {/* Logo/Brand */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          textAlign: 'center',
          zIndex: 10,
        }}>
          <div style={{
            fontSize: 'clamp(4rem, 15vw, 10rem)',
            fontWeight: 200,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            marginBottom: '0.5rem',
          }}>
            kurai<span style={{ color: colors.accent.purple }}>.arc</span>
          </div>
          <div style={{
            fontSize: '0.875rem',
            letterSpacing: '0.3em',
            color: colors.secondary.gray,
            textTransform: 'uppercase',
            marginTop: '1.5rem',
          }}>
            暗い — darkness refined
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          opacity: loaded ? 0.5 : 0,
          transition: 'opacity 1.5s ease-out 0.5s',
          animation: 'float 2s ease-in-out infinite',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.secondary.gray} strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Color Palette Section */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: colors.primary.softBlack,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: colors.secondary.gray,
            marginBottom: '3rem',
            textTransform: 'uppercase',
          }}>
            Color System
          </h2>

          {/* Primary Colors */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 300 }}>Primary</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {Object.entries(colors.primary).map(([name, color], i) => (
                <div key={name} style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                }}>
                  <div style={{
                    height: '120px',
                    backgroundColor: color,
                    borderRadius: '8px',
                    border: `1px solid ${colors.secondary.border}`,
                    marginBottom: '0.75rem',
                  }} />
                  <div style={{ fontSize: '0.875rem', color: colors.primary.warmWhite }}>{name}</div>
                  <div style={{ fontSize: '0.75rem', color: colors.secondary.gray, fontFamily: 'monospace' }}>{color}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Accent Colors */}
          <div>
            <div style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 300 }}>Accent</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {Object.entries(colors.accent).map(([name, color], i) => (
                <div key={name} style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(i + 4) * 0.1}s`,
                }}>
                  <div style={{
                    height: '120px',
                    backgroundColor: color,
                    borderRadius: '8px',
                    marginBottom: '0.75rem',
                    boxShadow: `0 0 60px ${color}40`,
                  }} />
                  <div style={{ fontSize: '0.875rem', color: colors.primary.warmWhite }}>{name}</div>
                  <div style={{ fontSize: '0.75rem', color: colors.secondary.gray, fontFamily: 'monospace' }}>{color}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: colors.primary.deepBlack,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: colors.secondary.gray,
            marginBottom: '3rem',
            textTransform: 'uppercase',
          }}>
            Typography
          </h2>

          <div style={{ marginBottom: '4rem' }}>
            <div style={{ fontSize: '5rem', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Aa Bb Cc
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 300, color: colors.secondary.gray, marginBottom: '2rem' }}>
              暗い 闇 影
            </div>
            <div style={{ fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', color: colors.secondary.gray }}>
              Typography should feel weightless yet present. Thin weights for headlines, 
              regular for body. Letter-spacing negative for impact, wide for subtlety.
            </div>
          </div>

          {/* Font Weights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { weight: 200, label: 'Light', size: '2.5rem' },
              { weight: 300, label: 'Book', size: '2rem' },
              { weight: 400, label: 'Regular', size: '1.5rem' },
              { weight: 500, label: 'Medium', size: '1.25rem' },
            ].map((item) => (
              <div key={item.weight} style={{
                padding: '2rem',
                backgroundColor: colors.primary.softBlack,
                borderRadius: '8px',
                border: `1px solid ${colors.secondary.border}`,
              }}>
                <div style={{ fontWeight: item.weight, fontSize: item.size, marginBottom: '1rem' }}>
                  kurai.arc
                </div>
                <div style={{ fontSize: '0.75rem', color: colors.secondary.gray }}>
                  {item.label} — {item.weight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UI Components Section */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: colors.primary.softBlack,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: colors.secondary.gray,
            marginBottom: '3rem',
            textTransform: 'uppercase',
          }}>
            UI Components
          </h2>

          {/* Buttons */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ fontSize: '1rem', marginBottom: '1.5rem', color: colors.secondary.gray }}>Buttons</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button style={{
                backgroundColor: colors.accent.purple,
                color: colors.primary.warmWhite,
                border: 'none',
                padding: '1rem 2.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                boxShadow: `0 0 30px ${colors.accent.purple}50`,
              }}>
                SHOP NOW
              </button>
              <button style={{
                backgroundColor: 'transparent',
                color: colors.primary.warmWhite,
                border: `1px solid ${colors.secondary.border}`,
                padding: '1rem 2.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}>
                VIEW COLLECTION
              </button>
              <button style={{
                backgroundColor: colors.accent.red,
                color: colors.primary.warmWhite,
                border: 'none',
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                borderRadius: '2px',
              }}>
                SALE
              </button>
            </div>
          </div>

          {/* Product Card */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ fontSize: '1rem', marginBottom: '1.5rem', color: colors.secondary.gray }}>Product Card</div>
            <div style={{
              maxWidth: '320px',
              backgroundColor: colors.primary.darkGray,
              borderRadius: '8px',
              overflow: 'hidden',
              border: `1px solid ${colors.secondary.border}`,
            }}>
              <div style={{
                height: '400px',
                backgroundColor: colors.primary.deepBlack,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: '200px',
                  height: '280px',
                  backgroundColor: colors.primary.softBlack,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${colors.secondary.border}`,
                }}>
                  <span style={{ color: colors.secondary.gray, fontSize: '0.75rem' }}>IMAGE</span>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: colors.accent.purple,
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.625rem',
                  letterSpacing: '0.1em',
                  borderRadius: '2px',
                }}>
                  NEW
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.625rem', color: colors.secondary.gray, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                  OVERSIZED TEE
                </div>
                <div style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 300 }}>
                  Phantom Archive Tee
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.accent.purple }}>₴ 1,890</span>
                  <span style={{ fontSize: '0.75rem', color: colors.secondary.gray }}>XS - XXL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: '1rem', marginBottom: '1.5rem', color: colors.secondary.gray }}>Navigation</div>
            <nav style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem 2rem',
              backgroundColor: colors.primary.deepBlack,
              borderRadius: '8px',
              border: `1px solid ${colors.secondary.border}`,
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 300 }}>
                kurai<span style={{ color: colors.accent.purple }}>.arc</span>
              </div>
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                {['SHOP', 'DROPS', 'ARCHIVE', 'ABOUT'].map((item) => (
                  <span key={item} style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    color: colors.secondary.gray,
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                  }}>
                    {item}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.secondary.gray} strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.secondary.gray} strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* Moodboard Grid */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: colors.primary.deepBlack,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: colors.secondary.gray,
            marginBottom: '3rem',
            textTransform: 'uppercase',
          }}>
            Moodboard
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(6, 80px)',
            gap: '1rem',
          }}>
            {/* Large image placeholder */}
            <div style={{
              gridColumn: '1 / 6',
              gridRow: '1 / 5',
              backgroundColor: colors.primary.softBlack,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colors.secondary.border}`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${colors.accent.purple}10 0%, transparent 50%)`,
              }} />
              <span style={{ color: colors.secondary.gray, fontSize: '0.75rem', zIndex: 1 }}>
                DARK STREETWEAR
              </span>
            </div>

            {/* Text block */}
            <div style={{
              gridColumn: '6 / 9',
              gridRow: '1 / 3',
              backgroundColor: colors.accent.purple,
              borderRadius: '8px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>暗い</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>darkness</div>
            </div>

            {/* Small blocks */}
            <div style={{
              gridColumn: '9 / 13',
              gridRow: '1 / 3',
              backgroundColor: colors.primary.darkGray,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colors.secondary.border}`,
            }}>
              <span style={{ color: colors.secondary.gray, fontSize: '0.75rem' }}>OVERSIZED</span>
            </div>

            <div style={{
              gridColumn: '6 / 10',
              gridRow: '3 / 5',
              backgroundColor: colors.primary.softBlack,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colors.secondary.border}`,
            }}>
              <span style={{ color: colors.secondary.gray, fontSize: '0.75rem' }}>TECHWEAR</span>
            </div>

            <div style={{
              gridColumn: '10 / 13',
              gridRow: '3 / 5',
              backgroundColor: colors.primary.darkGray,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colors.secondary.border}`,
            }}>
              <span style={{ color: colors.secondary.gray, fontSize: '0.75rem' }}>MINIMAL</span>
            </div>

            {/* Bottom row */}
            <div style={{
              gridColumn: '1 / 5',
              gridRow: '5 / 7',
              backgroundColor: colors.primary.darkGray,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colors.secondary.border}`,
            }}>
              <span style={{ color: colors.secondary.gray, fontSize: '0.75rem' }}>MONOCHROME</span>
            </div>

            <div style={{
              gridColumn: '5 / 9',
              gridRow: '5 / 7',
              backgroundColor: colors.accent.indigo,
              borderRadius: '8px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 300 }}>ARCHIVE</div>
                <div style={{ fontSize: '0.625rem', opacity: 0.7, letterSpacing: '0.2em' }}>2024—∞</div>
              </div>
            </div>

            <div style={{
              gridColumn: '9 / 13',
              gridRow: '5 / 7',
              backgroundColor: colors.primary.softBlack,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colors.secondary.border}`,
            }}>
              <span style={{ color: colors.secondary.gray, fontSize: '0.75rem' }}>JAPANESE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Tags Preview */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: colors.primary.softBlack,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: colors.secondary.gray,
            marginBottom: '3rem',
            textTransform: 'uppercase',
          }}>
            Brand Tags & Labels
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
            {/* Main Label */}
            <div style={{
              width: '120px',
              height: '180px',
              backgroundColor: colors.primary.deepBlack,
              border: `1px solid ${colors.secondary.border}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 300, marginBottom: '0.25rem' }}>kurai.arc</div>
              <div style={{ fontSize: '0.5rem', color: colors.secondary.gray }}>暗い</div>
              <div style={{
                marginTop: 'auto',
                fontSize: '0.5rem',
                color: colors.secondary.gray,
                letterSpacing: '0.1em',
              }}>
                MADE IN UA
              </div>
            </div>

            {/* Woven Label */}
            <div style={{
              width: '60px',
              height: '30px',
              backgroundColor: colors.primary.deepBlack,
              border: `1px solid ${colors.secondary.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.05em' }}>k.arc</div>
            </div>

            {/* Size Label */}
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: colors.accent.purple,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>XL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '4rem 2rem',
        backgroundColor: colors.primary.deepBlack,
        borderTop: `1px solid ${colors.secondary.border}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>
              kurai<span style={{ color: colors.accent.purple }}>.arc</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: colors.secondary.gray }}>
              © 2024 — darkness refined
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['INSTAGRAM', 'TELEGRAM', 'TIKTOK'].map((social) => (
              <span key={social} style={{
                fontSize: '0.625rem',
                letterSpacing: '0.15em',
                color: colors.secondary.gray,
                cursor: 'pointer',
              }}>
                {social}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        button:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default KuraiArcMoodboard;
