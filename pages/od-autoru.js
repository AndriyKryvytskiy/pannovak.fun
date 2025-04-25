import Image from "next/image";

export default function OdAutoru() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-center p-6 md:p-12 gap-8 bg-neutral-50 min-h-screen">
      {/* Фото слева */}
      <div className="w-full md:w-1/3">
        <Image
          src="/images/autor.jpg" // Убедись, что файл назван так и лежит в public/images/
          alt="Tvůrce obsahu"
          width={600}
          height={900}
          className="rounded-xl shadow-md"
        />
      </div>

      {/* Текст и контакты справа */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Od autorů</h1>
        <p className="text-lg text-gray-700">
          Ahoj! Jsme dva tvůrci, kteří pro vás vytvořili tento projekt.<br />
          Věříme, že vás potěší, pobaví a inspiruje.<br />
          Budeme rádi, když se nám ozvete!
        </p>

        <div className="mt-6 space-y-2 text-md text-gray-700">
          <p>
            📧 <span className="font-semibold">E-mail:</span> <a
              href="mailto:kryvytskiy_av@outlook.com"
              className="text-blue-600 hover:underline"
            >tkryvytskiy_av@outlook.com</a>
          </p>
          <p>
            🔗 <span className="font-semibold">LinkedIn:</span> <a
              href="www.linkedin.com/in/andriy-kryvytskiy-35909227"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >linkedin.com/in/andriy-kryvytskiy-35909227</a>
          </p>
        </div>
      </div>
    </div>
  );
}
