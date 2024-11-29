import NextAuth, { AuthOptions, TokenSet } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

// Función para solicitar la actualización del token de acceso
async function requestRefreshOfAccessToken(token: JWT) {
  const response = await fetch(`${process.env.AUTH_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.IBIRADOPTA_FRONTEND_CLIENT_ID!,
      client_secret: process.env.IBIRADOPTA_FRONTEND_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
    }),
    method: "POST",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  return response.json();
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.IBIRADOPTA_FRONTEND_CLIENT_ID!,
      clientSecret: process.env.IBIRADOPTA_FRONTEND_CLIENT_SECRET!,
      issuer: process.env.AUTH_ISSUER,
    }),
  ],
  session: {
    maxAge: 60 * 30, // 30 minutos
  },
  callbacks: {
    // Callback para manejar el token JWT
    async jwt({ token, account, profile }) {
      if (account) {
        // Guardar los valores iniciales del token
        token.id = profile?.sub || account.providerAccountId; // ID del usuario
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.userName = profile?.name;
        // Extraer los roles desde el perfil (si están disponibles)
        const decodedAccessToken = JSON.parse(
          Buffer.from(account.access_token.split(".")[1], "base64").toString()
        );
        token.roles = decodedAccessToken.realm_access?.roles || [];

        return token;
        return token;
      }

      // Verificar si el token ha expirado
      if (token.expiresAt && Date.now() < token.expiresAt * 1000 - 60 * 1000) {
        return token;
      }

      // Refrescar el token si ha expirado
      try {
        const refreshedTokens: TokenSet = await requestRefreshOfAccessToken(token);

        return {
          ...token,
          idToken: refreshedTokens.id_token,
          accessToken: refreshedTokens.access_token,
          expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in!),
          refreshToken: refreshedTokens.refresh_token || token.refreshToken, // Mantén el refresh token actual si no se devuelve uno nuevo
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    // Callback para manejar la sesión
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.userName = token.userName;
      session.user = {
        ...session.user,
        id: token.id, // Añade el ID del usuario a la sesión
        roles: token.roles || [], // Añade los roles del usuario a la sesión
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions); // Eliminar cualquier punto y coma innecesario

export { handler as GET, handler as POST }; // Eliminar cualquier conflicto con el formato
