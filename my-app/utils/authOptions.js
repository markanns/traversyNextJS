import GoogleProvider from "next-auth/providers/google";
import  connectDB from '@/config/database';
import User from '@/models/User';
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on successful sign in
    async signIn({ profile }) {
      //connect to database
      await connectDB();
      //check if user exists
      const userExists = await User.findOne({ email:profile.email });
      //if not create user
      if (!userExists) {
        const userName = profile.name.slice(0,20);
        await User.create({
          email: profile.email,
          userName,
          image: profile.picture,
        });
      }
      //return true to allow sign in
      return true;
    },
    //session callbac func that modifies the session object
    async session({ session }) {
      //get user from database
      const user = await User.findOne({ email: session.user.email });
      //assign uset id to session object
      session.user.id = user.id.toString();
      return session;
    },
  },
};
