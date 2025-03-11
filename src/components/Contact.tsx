import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';

// Definir la interfaz para las reseñas
interface Review {
  id: number;
  text: string;
  author: string;
  company: string;
  rating: number;
}

const ContactSection = styled(motion.section)`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 20%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: var(--accent);
    filter: blur(150px);
    opacity: 0.1;
    pointer-events: none;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  background: linear-gradient(to right, var(--text-primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 800;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormSection = styled(motion.div)`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(to right, var(--primary), var(--accent));
  border: none;
  padding: 1rem 2rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const TestimonialsSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TestimonialCard = styled(motion.div)`
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TestimonialText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.div`
  color: var(--text-primary);
  font-weight: 600;
`;

const Stars = styled.div`
  color: #ffd700;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled(motion.div)`
  color: #10B981;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ReviewSection = styled(motion.div)`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StarButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  color: ${props => props.isActive ? '#ffd700' : 'rgba(255, 215, 0, 0.3)'};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0;
  transition: transform 0.2s, color 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #ffd700;
  }
`;

const AdminButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const DeleteButton = styled(motion.button)`
  background: none;
  border: none;
  color: #ef4444;
  opacity: 0.6;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const AdminModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 1000;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const Contact = () => {
  const [formStatus, setFormStatus] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const ADMIN_PASSWORD = 'rafacharlokali2';

  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedReviews = localStorage.getItem('portfolio_reviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      {
        id: 1,
        text: "Juan Carlos demostró ser un desarrollador excepcional. Su atención al detalle y capacidad para entender nuestras necesidades fue impresionante.",
        author: "María González",
        company: "Tech Solutions",
        rating: 5
      },
      {
        id: 2,
        text: "Excelente profesional. Entregó el proyecto antes de tiempo y con una calidad superior a la esperada.",
        author: "Carlos Rodríguez",
        company: "Digital Innovation",
        rating: 5
      },
      {
        id: 3,
        text: "Su conocimiento técnico y habilidad para resolver problemas hicieron que nuestro proyecto fuera un éxito total.",
        author: "Ana Martínez",
        company: "Creative Studios",
        rating: 5
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('portfolio_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    emailjs.init("D57bI41aFe_LV-EdK");
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setShowAdminModal(false);
      setAdminPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (isAdmin) {
      const updatedReviews = reviews.filter((review: Review) => review.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem('portfolio_reviews', JSON.stringify(updatedReviews));

      try {
        await emailjs.send(
          'service_44uul35',
          'template_odzww4c',
          {
            name: 'Sistema',
            email: 'sistema@reviews.com',
            subject: 'Reseña eliminada del portafolio',
            message: `Se ha eliminado una reseña del portafolio.\nID de la reseña: ${reviewId}`
          },
          'D57bI41aFe_LV-EdK'
        );
      } catch (error) {
        console.error('Error al enviar notificación de eliminación:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setFormStatus('Enviando mensaje...');
    
    try {
      await emailjs.sendForm(
        'service_44uul35',
        'template_odzww4c',
        form,
        'D57bI41aFe_LV-EdK'
      );
      
      setFormStatus('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
      form.reset();
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setFormStatus('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.querySelector('input[name="reviewer_name"]') as HTMLInputElement;
    const companyInput = form.querySelector('input[name="reviewer_company"]') as HTMLInputElement;

    const newReview = {
      id: Date.now(),
      text: comment,
      author: nameInput.value,
      company: companyInput.value,
      rating: rating
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('portfolio_reviews', JSON.stringify(updatedReviews));

    setComment('');
    setRating(5);
    form.reset();

    try {
      await emailjs.send(
        'service_44uul35',
        'template_odzww4c',
        {
          name: nameInput.value,
          email: nameInput.value,
          subject: '⭐ Nueva reseña en el portafolio',
          message: `
¡Has recibido una nueva reseña en tu portafolio!

Autor: ${nameInput.value}
Empresa: ${companyInput.value}
Calificación: ${'⭐'.repeat(rating)}
Comentario: ${comment}

Esta reseña ya está visible en tu portafolio.
          `.trim()
        },
        'D57bI41aFe_LV-EdK'
      );
    } catch (error) {
      console.error('Error al enviar notificación de reseña:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ContactSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Title variants={itemVariants}>Contacto</Title>
      <ContentWrapper>
        <FormSection variants={itemVariants}>
          {formStatus && (
            <SuccessMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {formStatus}
            </SuccessMessage>
          )}
          <Form onSubmit={handleSubmit}>
            <Input 
              type="text" 
              name="name" 
              placeholder="Nombre" 
              required 
            />
            <Input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
            />
            <Input 
              type="text" 
              name="subject" 
              placeholder="Asunto" 
              required 
            />
            <TextArea 
              name="message" 
              placeholder="Mensaje" 
              required 
            />
            <Button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enviar Mensaje
            </Button>
          </Form>

          <ReviewSection variants={itemVariants}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Deja tu reseña</h3>
            <Form onSubmit={handleReviewSubmit}>
              <StarRating>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarButton
                    key={star}
                    type="button"
                    isActive={star <= rating}
                    onClick={() => setRating(star)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </StarButton>
                ))}
              </StarRating>
              <Input
                type="text"
                name="reviewer_name"
                placeholder="Tu nombre"
                required
              />
              <Input
                type="text"
                name="reviewer_company"
                placeholder="Empresa"
                required
              />
              <TextArea
                placeholder="Tu comentario"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <Button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Publicar Reseña
              </Button>
            </Form>
          </ReviewSection>
        </FormSection>
        
        <TestimonialsSection variants={itemVariants}>
          {reviews.map((review: Review) => (
            <TestimonialCard
              key={review.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Stars>
                  {[...Array(review.rating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                  ))}
                </Stars>
                {isAdmin && (
                  <DeleteButton
                    onClick={() => handleDeleteReview(review.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteButton>
                )}
              </div>
              <TestimonialText>{review.text}</TestimonialText>
              <TestimonialAuthor>
                {review.author} - {review.company}
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsSection>
      </ContentWrapper>

      <AdminButton
        onClick={() => isAdmin ? handleAdminLogout() : setShowAdminModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={isAdmin ? faUnlock : faLock} />
        {isAdmin ? 'Salir modo admin' : 'Modo admin'}
      </AdminButton>

      {showAdminModal && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAdminModal(false)}
          />
          <AdminModal
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Acceso Administrador</h3>
            <Input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Contraseña"
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <Button
              onClick={handleAdminLogin}
              style={{ marginTop: '1rem' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Acceder
            </Button>
          </AdminModal>
        </>
      )}
    </ContactSection>
  );
};

export default Contact; 