import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-2 lg:px-8 mt-32">
        <div className="flex lex-row items-center justify-between border-t border-gray-900/10 sm:mt-20 lg:mt-16 py-4">
          <div className="items-center flex flex-row">
            <Image
              src="/logo.png"
              alt="My Image"
              className="h-5 w-auto"
              width={500} 
              height={500} 
            />
          </div>
          <p className="text-xs leading-5 text-gray-500">
            &copy; 2024 Vayuguna. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
