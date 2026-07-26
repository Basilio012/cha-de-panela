import React, { useState } from 'react';
import { MapPin, Heart, Gift, Phone, Check, X } from 'lucide-react';

const ChaDePanel = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const [selectedGifts, setSelectedGifts] = useState(new Set());
  const [confirmedGifts, setConfirmedGifts] = useState(new Set());
  const [showConfirmModal, setShowConfirmModal] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [giftToReset, setGiftToReset] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userData, setUserData] = useState({
    nome: '',
    telefone: '',
    mensagem: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const ADMIN_PASSWORD = 'emanuelly2024';
  const WHATSAPP_NUMBER = '556292684729';

  const gifts = {
    'COZINHA': [
      'Jogo de pratos',
      'Jogo de copos',
      'Jogo de xícaras',
      'Jogo de talheres',
      'Conjunto de facas',
      'Tábua de corte',
      'Escorredor de louças',
      'Escorredor de arroz e macarrão',
      'Abridor de latas',
      'Saca-rolhas',
      'Ralador',
      'Espremedor de alho',
      'Colheres de silicone',
      'Espátula',
      'Concha',
      'Pegador de massa',
      'Panos de prato',
      'Potes organizadores',
      'Assadeiras',
      'Formas para bolo',
      'Jogo de panelas',
      'Frigideira',
      'Panela de pressão'
    ],
    'ELETRODOMÉSTICOS': [
      'Liquidificador',
      'Batedeira',
      'Cafeteira',
      'Sanduicheira',
      'Air Fryer',
      'Micro-ondas',
      'Forno',
      'Máquina de lavar'
    ],
    'SALA': [
      'Almofadas',
      'Manta para sofá',
      'Tapete',
      'Cortinas',
      'Televisão',
      'Mesa de jantar'
    ],
    'QUARTO': [
      'Jogo de cama',
      'Travesseiros',
      'Cobertor',
      'Manta',
      'Cabides'
    ],
    'BANHEIRO': [
      'Jogo de toalhas',
      'Tapete de banheiro',
      'Lixeira',
      'Porta-sabonete',
      'Porta-escova de dentes',
      'Cesto de roupa'
    ],
    'LIMPEZA': [
      'Mop',
      'Esponjas',
      'Panos de limpeza',
      'Varal',
      'Pregadores',
      'Lixeira para cozinha'
    ],
    'DECORAÇÃO': [
      'Velas aromáticas',
      'Porta-retratos',
      'Luminária'
    ]
  };

  const handleGiftClick = (gift) => {
    if (confirmedGifts.has(gift)) {
      return;
    }
    if (selectedGifts.has(gift)) {
      const newSelected = new Set(selectedGifts);
      newSelected.delete(gift);
      setSelectedGifts(newSelected);
    } else {
      setShowConfirmModal(gift);
    }
  };

  const handleConfirmGift = () => {
    setShowUserForm(true);
  };

  const handleUserFormChange = (field, value) => {
    let formattedValue = value;

    if (field === 'nome') {
      formattedValue = value.replace(/[^a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
    }

    if (field === 'telefone') {
      const numbersOnly = value.replace(/\D/g, '');
      const limited = numbersOnly.slice(0, 11);
      
      if (limited.length <= 2) {
        formattedValue = limited;
      } else if (limited.length <= 6) {
        formattedValue = `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
      } else {
        formattedValue = `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
      }
    }

    setUserData({
      ...userData,
      [field]: formattedValue
    });

    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!userData.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
    } else if (userData.nome.trim().length < 3) {
      errors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!userData.telefone.trim()) {
      errors.telefone = 'Telefone é obrigatório';
    } else {
      const phoneDigits = userData.telefone.replace(/\D/g, '');
      if (phoneDigits.length !== 11) {
        errors.telefone = 'Telefone deve ter 11 dígitos (XX) 9XXXX-XXXX';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendToWhatsApp = () => {
    if (!validateForm()) {
      return;
    }

    const mensagem = `🎁 *Nova Confirmação de Presente!*\n\n*Presente Escolhido:* ${showConfirmModal}\n\n*Dados de Quem Escolheu:*\n*Nome:* ${userData.nome}\n*Telefone:* ${userData.telefone}${userData.mensagem ? `\n*Mensagem:* ${userData.mensagem}` : ''}`;

    const newSelected = new Set(selectedGifts);
    newSelected.add(showConfirmModal);
    setSelectedGifts(newSelected);
    
    const newConfirmed = new Set(confirmedGifts);
    newConfirmed.add(showConfirmModal);
    setConfirmedGifts(newConfirmed);

    setShowConfirmModal(null);
    setShowUserForm(false);
    setUserData({
      nome: '',
      telefone: '',
      mensagem: ''
    });

    const encodedMessage = encodeURIComponent(mensagem);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
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

  const resetGift = (gift) => {
    const newConfirmed = new Set(confirmedGifts);
    newConfirmed.delete(gift);
    setConfirmedGifts(newConfirmed);
    
    const newSelected = new Set(selectedGifts);
    newSelected.delete(gift);
    setSelectedGifts(newSelected);
    
    setGiftToReset(null);
  };

  const resetAllGifts = () => {
    if (window.confirm('Tem certeza que deseja resetar TODOS os presentes confirmados?')) {
      setConfirmedGifts(new Set());
      setSelectedGifts(new Set());
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: '"Segoe UI", Tahoma, Geneva, sans-serif' }}>
      {/* Header com Navegação Fixa */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px'
        }}>
          <div style={{ display: 'flex', gap: '40px' }}>
            <button
              onClick={() => setSelectedTab('home')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: selectedTab === 'home' ? '600' : '400',
                color: selectedTab === 'home' ? '#7BA7C6' : '#666',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
            >
              Convite
            </button>
            <button
              onClick={() => setSelectedTab('gifts')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: selectedTab === 'gifts' ? '600' : '400',
                color: selectedTab === 'gifts' ? '#7BA7C6' : '#666',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
            >
              Presentes
            </button>
          </div>
          <button
            onClick={() => setShowAdminPanel(true)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              color: '#999',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'all 0.2s'
            }}
          >
            ⚙️
          </button>
        </div>
      </nav>

      {/* Tab: Convite Principal */}
      {selectedTab === 'home' && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '40px 20px',
            marginTop: '30px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: '80px',
              height: '100px',
              backgroundColor: '#7BA7C6',
              borderRadius: '20px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '48px',
              fontStyle: 'italic',
              fontWeight: '300',
              fontFamily: 'Georgia, serif'
            }}>
              E<br />M
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              fontStyle: 'italic',
              color: '#7BA7C6',
              fontFamily: 'Georgia, serif',
              fontWeight: '400',
              margin: '20px 0',
              lineHeight: '1.2'
            }}>
              Emanuelly<br />e Mateus
            </h1>

            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Com muita alegria te convido para fazer parte dessa nova jornada nas nossas vidas!
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              margin: '30px 0',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px', fontWeight: '600' }}>MÊS</div>
                <div style={{ fontSize: '28px', fontWeight: '600', color: '#7BA7C6' }}>Setembro</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px', fontWeight: '600' }}>DIA</div>
                <div style={{ fontSize: '48px', fontWeight: '300', color: '#7BA7C6', fontStyle: 'italic' }}>05</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px', fontWeight: '600' }}>HORA</div>
                <div style={{ fontSize: '28px', fontWeight: '600', color: '#7BA7C6' }}>19:00</div>
              </div>
            </div>

            <div style={{
              height: '1px',
              backgroundColor: '#e0e0e0',
              margin: '30px 0'
            }}></div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginTop: '30px'
            }}>
              <button
                onClick={() => setSelectedTab('gifts')}
                style={{
                  backgroundColor: '#f0f5f9',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '30px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e0ecf5';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(123, 167, 198, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f5f9';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Gift size={40} color="#7BA7C6" style={{ marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>PRESENTES</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#7BA7C6' }}>Lista de Presentes</div>
              </button>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '60px',
            marginBottom: '40px',
            fontSize: '14px',
            color: '#999'
          }}>
            Com carinho, Emanuelly e Mateus ♥
          </div>
        </div>
      )}

      {/* Tab: Lista de Presentes */}
      {selectedTab === 'gifts' && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '40px 20px',
            marginTop: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontStyle: 'italic',
              color: '#7BA7C6',
              fontFamily: 'Georgia, serif',
              fontWeight: '400',
              textAlign: 'center',
              marginBottom: '10px'
            }}>
              Lista de Presentes
            </h2>
            <p style={{
              textAlign: 'center',
              color: '#999',
              marginBottom: '40px',
              fontSize: '14px'
            }}>
              Clique no presente para marcar que já foi escolhido
            </p>

            {Object.entries(gifts).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#7BA7C6',
                  marginBottom: '20px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #f0f5f9'
                }}>
                  {category}
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '12px'
                }}>
                  {items.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleGiftClick(item)}
                      disabled={confirmedGifts.has(item)}
                      style={{
                        padding: '16px 12px',
                        backgroundColor: confirmedGifts.has(item) ? '#f0f0f0' : selectedGifts.has(item) ? '#e0ecf5' : '#f8f9fa',
                        border: confirmedGifts.has(item) ? '1px solid #ddd' : '1px solid #e0e0e0',
                        borderRadius: '8px',
                        cursor: confirmedGifts.has(item) ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left',
                        fontSize: '14px',
                        color: confirmedGifts.has(item) ? '#999' : selectedGifts.has(item) ? '#7BA7C6' : '#333',
                        textDecoration: confirmedGifts.has(item) ? 'line-through' : 'none',
                        opacity: confirmedGifts.has(item) ? 0.7 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!confirmedGifts.has(item) && !selectedGifts.has(item)) {
                          e.currentTarget.style.backgroundColor = '#f0f5f9';
                          e.currentTarget.style.borderColor = '#7BA7C6';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!confirmedGifts.has(item) && !selectedGifts.has(item)) {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                          e.currentTarget.style.borderColor = '#e0e0e0';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {confirmedGifts.has(item) ? (
                          <Check size={18} color="#999" />
                        ) : selectedGifts.has(item) ? (
                          <Check size={18} color="#7BA7C6" />
                        ) : (
                          <div style={{
                            width: '18px',
                            height: '18px',
                            border: '2px solid #ddd',
                            borderRadius: '4px'
                          }}></div>
                        )}
                        <span>{item}</span>
                        {confirmedGifts.has(item) && (
                          <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>Escolhido</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div style={{
              marginTop: '40px',
              padding: '20px',
              backgroundColor: '#f0f5f9',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Presentes escolhidos</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#7BA7C6' }}>
                {confirmedGifts.size}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                onClick={() => setSelectedTab('home')}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#7BA7C6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b94b0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(123, 167, 198, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#7BA7C6';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                ← Voltar ao Convite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Admin - Login */}
      {showAdminPanel && !adminAuthenticated && (
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
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '24px'
            }}>
              Acesso de Administrador
            </h3>

            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '24px'
            }}>
              Digite a senha para acessar o painel de administração
            </p>

            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              placeholder="Senha"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '24px',
                boxSizing: 'border-box'
              }}
            />

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setShowAdminPanel(false);
                  setAdminPassword('');
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
                onClick={handleAdminLogin}
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
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Admin - Painel */}
      {showAdminPanel && adminAuthenticated && (
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
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '8px'
            }}>
              Painel de Administração
            </h3>

            <p style={{
              fontSize: '13px',
              color: '#999',
              marginBottom: '30px'
            }}>
              Gerencie os presentes confirmados
            </p>

            <div style={{
              padding: '20px',
              backgroundColor: '#f0f5f9',
              borderRadius: '8px',
              marginBottom: '30px'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Presentes Confirmados</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#7BA7C6' }}>
                {confirmedGifts.size}
              </div>
            </div>

            {confirmedGifts.size > 0 ? (
              <>
                <div style={{
                  textAlign: 'left',
                  marginBottom: '30px',
                  maxHeight: '300px',
                  overflow: 'auto'
                }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '12px'
                  }}>
                    Clique para reativar um presente:
                  </p>
                  {Array.from(confirmedGifts).map((gift) => (
                    <button
                      key={gift}
                      onClick={() => {
                        setGiftToReset(gift);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px',
                        marginBottom: '8px',
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        textAlign: 'left',
                        fontSize: '14px',
                        cursor: 'pointer',
                        color: '#333',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9f9f9';
                        e.currentTarget.style.borderColor = '#7BA7C6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    >
                      <span style={{ color: '#999' }}>✓</span> {gift}
                    </button>
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
                  setSelectedGifts(new Set(selectedGifts.filter(g => g !== showConfirmModal)));
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
  );
};

export default ChaDePanel;
