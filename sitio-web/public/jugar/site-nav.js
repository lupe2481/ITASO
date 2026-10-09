(() => {
  const links = document.querySelectorAll('[data-account-link]');
  async function refreshAccount() {
    try {
      const response = await fetch('/api/profile', { cache: 'no-store' });
      if (!response.ok) return;
      const { user } = await response.json();
      links.forEach(link => {
        link.textContent = user ? 'Mi perfil' : 'Iniciar sesión';
        link.href = user ? '/perfil' : '/cuenta';
      });
    } catch {
      // Games remain playable when the account service is unavailable.
    }
  }
  refreshAccount();
  window.addEventListener('focus', refreshAccount);
})();
