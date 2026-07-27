import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';

const ChaDePanel = () => {
  const [gifts, setGifts] = useState([
    { id: 1, name: 'Jogo de Panelas', category: 'Cozinha', emoji: '🍳' },
    { id: 2, name: 'Jogo de Talheres', category: 'Cozinha', emoji: '🔪' },
    { id: 3, name: 'Conjunto de Copos', category: 'Cozinha', emoji: '🥤' },
    { id: 4, name: 'Jogo de Pratos', category: 'Cozinha', emoji: '🍽️' },
    { id: 5, name: 'Toalhas de Banho', category: 'Banheiro', emoji: '🛁' },
    { id: 6, name: 'Tapete de Banheiro', category: 'Banheiro', emoji: '🚪' },
    { id: 7, name: 'Cortina para Chuveiro', category: 'Banheiro', emoji: '🚿' },
    { id: 8, name: 'Jogo de Cama', category: 'Quarto', emoji: '🛏️' },
    { id: 9, name: 'Travesseiros', category: 'Quarto', emoji: '💤' },
    { id: 10, name: 'Edredom', category: 'Quarto', emoji: '🛌' },
    { id: 11, name: 'Tapete Persa', category: 'Sala', emoji: '🏠' },
    { id: 12, name: 'Almofadas Decorativas', category: 'Sala', emoji: '🛋️' },
  ]);

  const [showConfirmModal, setShowConfirmModal] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [userData, setUserData] = useState({ nome: '', telefone: '', mensagem: '' });
  const [formErrors, setFormErrors] = useState({});
  const [confirmedGifts, setConfirmedGifts] = useState(() => {
    const saved = localStorage.getItem('confirmedGifts');
    return saved ? JSON.parse(saved) : {};
  });
  const [giftToReset, setGiftToReset] = useState(null);

  const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '556292684729';
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'emanuelly2024';

  useEffect(() => {
    localStorage.setItem('confirmedGifts', JSON.stringify(confirmedGifts));
  }, [confirmedGifts]);

  const categories = [...new Set(gifts.map(g => g.category))];

  const handleSelectGift = (giftName) => {
    if (confirmedGifts[giftName]) {
      alert('Este presente já foi escolhido!');
      return;
    }
    setShowConfirmModal(giftName);
  };

  const handleConfirmGift = () => {
    setShowUserForm(true);
  };

  const handleUserFormChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!userData.nome.trim()) errors.nome = 'Nome é obrigatório';
    if (!userData.telefone.trim()) errors.telefone = 'Telefone é obrigatório';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendToWhatsApp = () => {
    if (!validateForm()) return;

    const giftName = showConfirmModal;
    const message = `*Chá de Panela - Novo Presente Selecionado* 🎁\n\n*Nome:* ${userData.nome}\n*Telefone:* ${userData.telefone}\n*Presente:* ${giftName}${userData.mensagem ? `\n*Mensagem:* ${userData.mensagem}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setConfirmedGifts(prev => ({
      ...prev,
      [giftName]: {
        nome: userData.nome,
        telefone: userData.telefone,
        mensagem: userData.mensagem,
        data: new Date().toISOString()
      }
    }));

    setShowUserForm(false);
    setShowConfirmModal(null);
    setUserData({ nome: '', telefone: '', mensagem: '' });
    setFormErrors({});

    window.open(whatsappUrl, '_blank');
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      setAdminPassword('');
    } else {
      alert('Senha incorreta!');
      setAdminPassword('');
    }
  };

  const resetGift = (giftName) => {
    setConfirmedGifts(prev => {
      const newConfirmed = { ...prev };
      delete newConfirmed[giftName];
      return newConfirmed;
    });
    setGiftToReset(null);
  };

  const resetAllGifts = () => {
    if (window.confirm('Tem certeza que deseja resetar TODOS os presentes?')) {
      setConfirmedGifts({});
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          color: '#fff',
          marginBottom: '40px',
          paddingTop: '20px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            margin: '0 0 10px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            💍 Chá de Panela
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: '0.95',
            margin: '0'
          }}>
            Emanuelly & Mateus
          </p>
        </div>

        {/* Admin Button */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 100
        }}>
          <button
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            🔐
          </button>
        </div>

        {/* Admin Panel */}
        {showAdminPanel && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
            }}>
              {!adminAuthenticated ? (
                <>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    🔐 Painel Admin
                  </h2>

                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                    placeholder="Digite a senha"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      marginBottom: '20px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />

                  <button
                    onClick={handleAdminLogin}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#7BA7C6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginBottom: '12px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#6b94b0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#7BA7C6';
                    }}
                  >
                    Entrar
                  </button>

                  <button
                    onClick={() => setShowAdminPanel(false)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#f0f5f9',
                      color: '#7BA7C6',
                      border: '1px solid #7BA7C6',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e0ecf5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f5f9';
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    Presentes Confirmados
                  </h2>

                  {Object.keys(confirmedGifts).length > 0 ? (
                    <>
                      <div style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                        marginBottom: '20px'
                      }}>
                        {Object.entries(confirmedGifts).map(([giftName, data]) => (
                          <div key={giftName} style={{
                            padding: '15px',
                            backgroundColor: '#f0f5f9',
                            borderRadius: '8px',
                            marginBottom: '12px',
                            borderLeft: '4px solid #7BA7C6'
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'start',
                              gap: '10px'
                            }}>
                              <div style={{ flex: 1 }}>
                                <div style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: '#333',
                                  marginBottom: '6px'
                                }}>
                                  {giftName}
                                </div>
                                <div style={{
                                  fontSize: '13px',
                                  color: '#666',
                                  marginBottom: '4px'
                                }}>
                                  <strong>Nome:</strong> {data.nome}
                                </div>
                                <div style={{
                                  fontSize: '13px',
                                  color: '#666',
                                  marginBottom: '4px'
                                }}>
                                  <strong>Telefone:</strong> {data.telefone}
                                </div>
                                {data.mensagem && (
                                  <div style={{
                                    fontSize: '13px',
                                    color: '#666'
                                  }}>
                                    <strong>Mensagem:</strong> {data.mensagem}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => setGiftToReset(giftName)}
                                style={{
                                  padding: '8px 12px',
                                  backgroundColor: '#fff',
                                  color: '#ff6b6b',
                                  border: '1px solid #ff6b6b',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  whiteSpace: 'nowrap'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#fff5f5';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#fff';
                                }}
                              >
                                ↺ Reativar
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={resetAllGifts}
                        style={{
                          padding: '12px 24px',
                          backgroundColor: '#ff6b6b',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          marginBottom: '16px',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ee5a52';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#ff6b6b';
                        }}
                      >
                        🔄 Resetar TODOS os Presentes
                      </button>
                    </>
                  ) : (
                    <p style={{
                      fontSize: '14px',
                      color: '#999',
                      padding: '20px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      marginBottom: '30px'
                    }}>
                      Nenhum presente foi confirmado ainda
                    </p>
                  )}

                  <button
                    onClick={() => {
                      setShowAdminPanel(false);
                      setAdminAuthenticated(false);
                    }}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#f0f5f9',
                      color: '#7BA7C6',
                      border: '1px solid #7BA7C6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e0ecf5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f5f9';
                    }}
                  >
                    Fechar
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Modal de Confirmação de Reset */}
        {giftToReset && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2001,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '400px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '12px'
              }}>
                Reativar Presente?
              </h3>

              <p style={{
                fontSize: '16px',
                color: '#7BA7C6',
                marginBottom: '8px',
                padding: '15px',
                backgroundColor: '#f0f5f9',
                borderRadius: '8px',
                fontWeight: '600'
              }}>
                {giftToReset}
              </p>

              <p style={{
                fontSize: '13px',
                color: '#999',
                marginBottom: '24px'
              }}>
                Este presente voltará a estar disponível para escolha.
              </p>

              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => setGiftToReset(null)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#f0f5f9',
                    color: '#7BA7C6',
                    border: '1px solid #7BA7C6',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e0ecf5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f5f9';
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => resetGift(giftToReset)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#ff6b6b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ee5a52';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff6b6b';
                  }}
                >
                  Reativar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Formulário de Dados */}
        {showUserForm && showConfirmModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '450px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              animation: 'slideIn 0.3s ease-out',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '12px',
                textAlign: 'center'
              }}>
                Seus Dados
              </h3>

              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                Preencha seus dados para confirmar o presente
              </p>

              <div style={{
                padding: '15px',
                backgroundColor: '#f0f5f9',
                borderRadius: '8px',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '6px' }}>Presente</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#7BA7C6' }}>
                  {showConfirmModal}
                </div>
              </div>

              {/* Campo Nome */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: formErrors.nome ? '#ff6b6b' : '#333',
                  marginBottom: '8px',
                  gap: '6px'
                }}>
                  Nome {formErrors.nome && <span style={{ color: '#ff6b6b' }}>*</span>}
                </label>
                <input
                  type="text"
                  value={userData.nome}
                  onChange={(e) => handleUserFormChange('nome', e.target.value)}
                  placeholder="Seu nome completo"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: formErrors.nome ? '1px solid #ff6b6b' : '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    backgroundColor: formErrors.nome ? '#fff5f5' : '#fff'
                  }}
                />
                {formErrors.nome && (
                  <div style={{
                    fontSize: '12px',
                    color: '#ff6b6b',
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    ⚠️ {formErrors.nome}
                  </div>
                )}
              </div>

              {/* Campo Telefone */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: formErrors.telefone ? '#ff6b6b' : '#333',
                  marginBottom: '8px',
                  gap: '6px'
                }}>
                  Telefone {formErrors.telefone && <span style={{ color: '#ff6b6b' }}>*</span>}
                </label>
                <input
                  type="tel"
                  value={userData.telefone}
                  onChange={(e) => handleUserFormChange('telefone', e.target.value)}
                  placeholder="(XX) 9XXXX-XXXX"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: formErrors.telefone ? '1px solid #ff6b6b' : '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    backgroundColor: formErrors.telefone ? '#fff5f5' : '#fff'
                  }}
                />
                {formErrors.telefone && (
                  <div style={{
                    fontSize: '12px',
                    color: '#ff6b6b',
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    ⚠️ {formErrors.telefone}
                  </div>
                )}
              </div>

              {/* Campo Mensagem */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Mensagem (opcional)
                </label>
                <textarea
                  value={userData.mensagem}
                  onChange={(e) => handleUserFormChange('mensagem', e.target.value)}
                  placeholder="Uma mensagem especial para os noivos..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                />
              </div>

              {/* Botões */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => {
                    setShowUserForm(false);
                    setShowConfirmModal(null);
                    setUserData({
                      nome: '',
                      telefone: '',
                      mensagem: ''
                    });
                    setFormErrors({});
                  }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#f0f5f9',
                    color: '#7BA7C6',
                    border: '1px solid #7BA7C6',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e0ecf5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f5f9';
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={sendToWhatsApp}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#7BA7C6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6b94b0';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(123, 167, 198, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#7BA7C6';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ✓ Confirmar e Enviar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmação */}
        {showConfirmModal && !showUserForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '400px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#e0ecf5',
                borderRadius: '50%',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Gift size={32} color="#7BA7C6" />
              </div>

              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '12px'
              }}>
                Confirmar Presente
              </h3>

              <p style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '8px',
                lineHeight: '1.4'
              }}>
                Você tem certeza que deseja escolher:
              </p>

              <p style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#7BA7C6',
                marginBottom: '30px',
                padding: '15px',
                backgroundColor: '#f0f5f9',
                borderRadius: '8px'
              }}>
                {showConfirmModal}
              </p>

              <p style={{
                fontSize: '13px',
                color: '#999',
                marginBottom: '24px'
              }}>
                Após confirmar, este presente ficará indisponível para outros usuários.
              </p>

              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => {
                    setShowConfirmModal(null);
                  }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#f0f5f9',
                    color: '#7BA7C6',
                    border: '1px solid #7BA7C6',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e0ecf5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f5f9';
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmGift}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#7BA7C6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6b94b0';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(123, 167, 198, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#7BA7C6';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gifts Grid */}
        {categories.map(category => (
          <div key={category} style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#fff',
              marginBottom: '20px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {category}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '20px'
            }}>
              {gifts.filter(g => g.category === category).map(gift => (
                <div key={gift.id} style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  cursor: confirmedGifts[gift.name] ? 'not-allowed' : 'pointer',
                  opacity: confirmedGifts[gift.name] ? 0.6 : 1,
                  transform: confirmedGifts[gift.name] ? 'scale(0.95)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!confirmedGifts[gift.name]) {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!confirmedGifts[gift.name]) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}>
                    {gift.emoji}
                  </div>

                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    {gift.name}
                  </h3>

                  {confirmedGifts[gift.name] ? (
                    <div style={{
                      padding: '10px 16px',
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      border: '1px solid #c8e6c9',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      ✓ Escolhido por {confirmedGifts[gift.name].nome}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSelectGift(gift.name)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#7BA7C6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#6b94b0';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#7BA7C6';
                      }}
                    >
                      Selecionar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ChaDePanel;
