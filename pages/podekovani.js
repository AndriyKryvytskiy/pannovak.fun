import React from "react";

export default function Podekovani() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Poděkování</h1>

      <blockquote className="border-l-4 border-gray-400 pl-4 italic text-lg mb-8">
        „Každé nové slovo je jako klíč: někdy nevíte, které dveře otevře – ale jednoho dne se všechny otevřou.“
        <br />
        <span className="font-semibold">— pan Novák</span>
      </blockquote>

      <p className="mb-6">
        S pokorou, radostí a trochou (nebo možná velkou dávkou) humoru děkuji:
      </p>

      <ul className="list-disc list-inside mb-6 space-y-1">
        <li><strong>Jitce Dřevojánkové</strong></li>
        <li><strong>Lence Zábojové</strong></li>
        <li><strong>Renée Grenarové</strong></li>
        <li><strong>Zuzaně Lehoučkové</strong></li>
        <li><strong>Janě Veselé</strong></li>
        <li><strong>Radomile Kotkové</strong></li>
        <li><strong>Janě Novákové</strong></li>
        <li><strong>Nikole Popperové</strong></li>
        <li><strong>a</strong></li>
        <li><strong>Barboře Khomenko</strong></li>
      </ul>

      <p className="mb-6">
        za jejich nesmírnou trpělivost, nekonečnou péči a jemné vedení po všech těch zákeřných stezkách českého jazyka.
      </p>

      <p className="mb-6">
        Bez jejich pomoci bych dnes možná stále zápasil s rozdílem mezi "všechno" a "každý",
        a věřil, že "předložky" jsou jen druh nábytku.
      </p>

      <p className="mb-10">
        Zvláštní poděkování patří také <strong>Ústavu jazykové a odborné přípravy Univerzity Karlovy (ÚJOP UK)</strong>
        za vytvoření prostředí, kde je studium nejen výzvou, ale i radostí.
        Děkuji za podporu, skvělou organizaci a nezapomenutelnou atmosféru během celé cesty.
      </p>

      <div className="text-center text-lg italic">
        S úctou a úsměvem,<br /> <span className="font-semibold">Andriy Kryvytskiy</span>
      </div>
    </div>
  );
}
