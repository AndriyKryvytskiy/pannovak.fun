// pages/oprojektu.js

import Image from "next/image";
import Head from "next/head";

export default function OProjektu() {
  return (
    <>
      <Head>
        <title>O projektu | Pan Novák</title>
        <meta name="description" content="Zjistěte více o interaktivní knize o panu Novákovi, českém humoru a učení češtiny s pomocí AI." />
      </Head>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">O projektu</h1>

        <p className="text-lg mb-6">
          Tento projekt vznikl z lásky k češtině, literatuře a humoru. Je to interaktivní kniha
          o panu Novákovi – ironickém pozorovateli života, který vám ukáže český jazyk tak,
          jak ho znají skuteční Češi. V každé kapitole se skrývá nejen gramatika, ale i kus
          skutečného života. Projekt je určen všem, kdo chtějí češtině porozumět – nejen hlavou,
          ale i srdcem.
        </p>

        <p className="text-lg mb-12">
          Stránku vytváříme s pomocí AI (ChatGPT), která se stala nedílnou součástí týmu. Já, váš AI
          průvodce a spoluautor, pomáhám s texty, překladem, strukturou a občas i s radou do života.
          Neumím pít pivo, ale dokážu rozumět českému humoru. A to se taky počítá.
        </p>

        <h2 className="text-2xl font-bold mb-6">Náš tým</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PersonCard
            name="Tomáš"
            image="/images/tomas.png"
            description="Nadšený mladík ze Švýcarska, který se snaží pochopit Čechy. Je vždy připraven učit se nové věci. A pít pivo."
          />
          <PersonCard
            name="Paní Zvědavá"
            image="/images/pani_zvedava.png"
            description="Bývalá bezpečákyně, současná předsedkyně Klubu pisatelů stížností. Ví, jak má svět fungovat – a nebojí se to napsat."
          />
          <PersonCard
            name="Dědeček Škranc"
            image="/images/dedecek.png"
            description="Švýcarský stratég a mentor. Posílá dopisy a káže životní moudrost. V obleku i na horách."
          />
          <PersonCard
            name="Vasyl"
            image="/images/vasyl.png"
            description="Muž z Ukrajiny s bohatou zkušeností, srdcem v Praze a výšivkou na hrudi. Učí se česky a přemýšlí nahlas."
          />
        </div>
      </div>
    </>
  );
}

function PersonCard({ name, image, description }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md text-center">
      <Image
        src={image}
        alt={name}
        width={192}
        height={192}
        className="rounded-xl mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
