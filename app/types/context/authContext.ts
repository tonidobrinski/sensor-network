export type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};
