import { redirect } from 'react-router-dom';

// Class to handle authorization
class AuthService {
  // Get expiration date from local storage and subtract from now to see how much time is left for token
  getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  }

  // On login, store data in local storage user can be tracked during application
  login(user) {
    localStorage.setItem('user', JSON.stringify(user));
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());
  }

  // On logout, remove items from local storage
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('expiration');
    return redirect('/');
  }

  // Get user info from local storage to see if user exists
  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const tokenDuration = this.getTokenDuration();

    if (!user) {
      return null;
    }

    if (tokenDuration < 0) {
      return this.logout();
    }

    return user;
  }
}

const Auth = new AuthService();

export default Auth;
