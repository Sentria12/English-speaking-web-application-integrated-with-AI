import Header from '../components/Header.tsx'
import AuthCard from '../components/AuthCard.tsx'

const AuthPage = () => (
  <div className="container">
    <Header />
    <section className="auth-wrapper">
      <AuthCard />
    </section>
  </div>
)

export default AuthPage