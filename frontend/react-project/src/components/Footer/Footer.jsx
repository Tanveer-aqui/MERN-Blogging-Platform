const Footer = ({ visibility = true }) => {
  if (!visibility) return null;

  return (
    <footer className="flex justify-center items-center h-12 bg-zinc-900 text-zinc-300">
      <p className="text-xs lg:text-sm">Copyright 2024 &copy; OSUUS. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
