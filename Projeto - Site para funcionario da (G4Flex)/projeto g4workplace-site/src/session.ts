// express-session.d.ts
import * as session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: number; // Defina o tipo apropriado para o ID do usuário
  }
}
