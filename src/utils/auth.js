export const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const role = localStorage.getItem('userRole') || null;
      return { isAuthenticated, role };
    };
