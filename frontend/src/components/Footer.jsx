const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-2">🛍️ ShopEasy</h2>
        <p className="text-gray-400">Your one-stop ecommerce solution</p>

        <div className="mt-4 flex justify-center gap-6 text-gray-400">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          © 2026 ShopEasy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;