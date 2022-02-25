import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const Users = {
  304316636: {
    id: "304316636",
    password: "1234",
    type: "student",
    email: "malh04@gmail.com",
    name: "Manuel Alejandro Lara Huerta",
    groupsIds: ["2021-2_1500_2", "2021-2_1501_3", "2021-2_1502_1"],
  },
  "000000000": {
    id: "000000000",
    password: "1234",
    type: "student",
    email: "student1@gmail.com",
    name: "Juan Alberto Romero Juarez",
    groupsIds: ["2021-2_1500_2"],
  },
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { password, username } = credentials;
        const user = Users[username];

        if (user && user.password === password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Adds the user id and groupsId data to the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.groupsIds = user.groupsIds;
      }
      return token;
    },
    // Adds the user id and groupsId data to the session
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.groupsIds = token.groupsIds;
      return session;
    },
  },
});
