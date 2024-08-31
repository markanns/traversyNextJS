import "@/assets/styles/globals.css";
export const metadata = {
  title: "My App",
  description: "My awesome app",
  keywords: "realestate, houses, homes",
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
