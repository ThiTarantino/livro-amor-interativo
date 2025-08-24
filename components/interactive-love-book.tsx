"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ChevronLeft, ChevronRight, Check, Mail, Star, Gift, Music } from "lucide-react"

interface Surprise {
  text: string
  message: string
  icon: React.ComponentType<any>
  position: { x: number; y: number }
}

interface InteractiveData {
  type:
    | "heart-fill"
    | "puzzle"
    | "memory"
    | "word-find"
    | "sequence"
    | "riddle"
    | "tap-game"
    | "color-match"
    | "slider"
    | "connect-dots"
    | "number-game"
    | "pattern-match"
  data: any
  completed: boolean
  reward: string
}

interface BookPage {
  id: number
  type: "cover" | "story" | "interactive" | "game" | "message" | "chapter" | "surprise"
  title?: string
  content?: string
  chapter?: number
  surprises?: Surprise[]
  interactive?: InteractiveData
}

const bookPages: BookPage[] = [
  // Capa
  {
    id: 0,
    type: "cover",
    title: "Nossa História de Amor",
    content: "Um livro especial feito com todo meu amor para você",
  },

  // Capítulo 1: O Começo
  {
    id: 1,
    type: "chapter",
    chapter: 1,
    title: "O Primeiro Olhar",
    content: "Todo grande amor começa com um simples olhar...",
  },
  {
    id: 2,
    type: "story",
    title: "O Dia que Mudou Tudo",
    content:
      "Era uma vez, em um dia comum que se tornou extraordinário, quando nossos olhares se cruzaram pela primeira vez. Naquele momento, o mundo parou e eu soube que você seria especial. Seu sorriso iluminou meu coração de uma forma que eu nunca imaginei ser possível.",
    surprises: [
      {
        text: "💕",
        message: "Lembra do nosso primeiro encontro? Meu coração batia tão forte que eu achei que você ia ouvir! 💓",
        icon: Heart,
        position: { x: 80, y: 140 },
      },
      {
        text: "✨",
        message: "Seus olhos brilhavam tanto naquele dia... aliás, brilham todos os dias! 🌟",
        icon: Star,
        position: { x: 20, y: 120 },
      },
    ],
  },
  {
    id: 3,
    type: "interactive",
    title: "Preencha Meu Coração",
    content: "Clique no coração para preenchê-lo com nosso amor! Cada clique representa um momento especial juntos.",
    interactive: {
      type: "heart-fill",
      data: { clicks: 0, maxClicks: 12 },
      completed: false,
      reward: "💕 Você preencheu meu coração completamente! Assim como você faz todos os dias na vida real! 💕",
    },
  },

  // Capítulo 2: Conhecendo Você
  {
    id: 4,
    type: "chapter",
    chapter: 2,
    title: "Descobrindo Você",
    content: "Cada conversa revelava algo novo e maravilhoso...",
  },
  {
    id: 5,
    type: "story",
    title: "A Primeira Conversa",
    content:
      "Lembro-me de cada palavra da nossa primeira conversa. Sua voz era como música para meus ouvidos, e cada risada sua fazia meu coração acelerar. Conversamos por horas, e mesmo assim, parecia que o tempo havia passado em segundos.",
    surprises: [
      {
        text: "🎭",
        message: "Você tem o dom de me fazer feliz até nos momentos mais difíceis! Eu te amooo!",
        icon: Heart,
        position: { x: 60, y: 140 },
      },
    ],
  },
  {
    id: 6,
    type: "interactive",
    title: "Decifre o Enigma do Amor",
    content: "Resolva este enigma para descobrir uma mensagem especial!",
    interactive: {
      type: "riddle",
      data: {
        riddle:
          "Sou invisível, mas você me sente. Não tenho forma, mas te transformo. Cresço quando é compartilhado. O que sou?",
        answer: "amor",
        attempts: 0,
      },
      completed: false,
      reward: "🎉 Correto! O AMOR é a resposta para tudo! Você é muito inteligente, mais um motivo para te amar! 🎉",
    },
  },
  {
    id: 7,
    type: "interactive",
    title: "Jogo das Cores do Amor",
    content: "Memorize a sequência de cores e repita na ordem certa!",
    interactive: {
      type: "color-match",
      data: {
        sequence: ["red", "pink", "purple", "red"],
        userSequence: [],
        showSequence: true,
        sequenceStep: 0,
        gamePhase: "showing",
        attempts: 0,
      },
      completed: false,
      reward: "🌈 Perfeito! Você trouxe todas as cores para minha vida! Antes de você, tudo era cinza! 🌈",
    },
  },

  // Capítulo 3: Crescendo Juntos
  {
    id: 8,
    type: "chapter",
    chapter: 3,
    title: "Crescendo Juntos",
    content: "Nosso amor cresceu firme e forte, como algo que nasceu para durar.",
  },
  {
    id: 9,
    type: "story",
    title: "Descobrindo Seus Sonhos",
    content:
      "A cada dia que passa, eu descobro algo novo e maravilhoso sobre você. Seus sonhos, seus medos, suas paixões - tudo em você me fascina. Você se tornou não apenas minha paixão, mas a minha maior conquista. ",
    surprises: [
      {
        text: "🦋",
        message: "Se o amor tivesse forma, seria uma borboleta pousando suave em nosso destino! 🦋✨",
        icon: Heart,
        position: { x: 75, y: 120 },
      },
      {
        text: "🌙",
        message: "Se eu pudesse, traria a lua só pra te ver sorrir.! 🌙💫",
        icon: Star,
        position: { x: 30, y: 140 },
      },
    ],
  },
  {
    id: 10,
    type: "interactive",
    title: "Jogo da Memória do Amor",
    content: "Encontre os pares românticos! Teste sua memória com símbolos do nosso amor.",
    interactive: {
      type: "memory",
      data: {
        cards: ["💕", "🌹", "💋", "🎵", "⭐", "🦋"],
        flipped: [],
        matched: [],
        attempts: 0,
        canFlip: true,
      },
      completed: false,
      reward: "🧠 Incrível! Sua memória é tão boa quanto seu coração é grande! 🧠",
    },
  },
  {
    id: 11,
    type: "interactive",
    title: "Conecte os Pontos do Destino",
    content: "Conecte os pontos na ordem numérica para revelar nosso destino juntos!",
    interactive: {
      type: "connect-dots",
      data: {
        dots: [
          { id: 1, x: 20, y: 30, connected: false },
          { id: 2, x: 50, y: 20, connected: false },
          { id: 3, x: 80, y: 40, connected: false },
          { id: 4, x: 60, y: 70, connected: false },
          { id: 5, x: 30, y: 80, connected: false },
        ],
        currentDot: 1,
        lines: [],
        completed: false,
      },
      completed: false,
      reward: "⭐ Perfeito! Nosso destino sempre foi ficar juntos! As estrelas conspiraram a nosso favor! ⭐",
    },
  },

  // Capítulo 4: Momentos Especiais
  {
    id: 12,
    type: "chapter",
    chapter: 4,
    title: "Momentos Mágicos",
    content: "Cada momento juntos se tornou uma lembrança dourada...",
  },
  {
    id: 13,
    type: "story",
    title: "Nossa Primeira Aventura",
    content:
      "Nosso primeiro encontro na praça. Caminhamos, conversamos, rimos... Cada passo ao seu lado era uma nova descoberta. Naquele dia, eu soube que queria viver muitas aventuras com você.",
    surprises: [
      {
        text: "🗺️",
        message: "Cada lugar que visitaremos juntos se tornará especial! Você transforma qualquer lugar em paraíso! 🗺️💕",
        icon: Heart,
        position: { x: 65, y: 140 },
      },
    ],
  },
  {
    id: 14,
    type: "interactive",
    title: "Complete a Sequência do Amor",
    content: "Complete a sequência romântica para revelar uma surpresa!",
    interactive: {
      type: "sequence",
      data: {
        sequence: ["💕", "💖", "💗", "?", "💝"],
        options: ["💘", "💙", "💚", "💛"],
        correct: 0,
      },
      completed: false,
      reward: "💘 Perfeito! A sequência do amor sempre cresce, assim como meus sentimentos por você! 💘",
    },
  },
  {
    id: 15,
    type: "interactive",
    title: "Quebra-Cabeça do Coração",
    content: "Clique nas peças para trocar de posição e formar o coração perfeito!",
    interactive: {
      type: "puzzle",
      data: {
        pieces: [
          { id: 1, currentPos: 0, correctPos: 0, symbol: "🙈" },
          { id: 2, currentPos: 1, correctPos: 1, symbol: "🙉" },
          { id: 3, currentPos: 2, correctPos: 2, symbol: "🙊" },
          { id: 4, currentPos: 3, correctPos: 3, symbol: "🙋‍♂️" },
          { id: 5, currentPos: 4, correctPos: 4, symbol: "🙋‍♀️" },
          { id: 6, currentPos: 5, correctPos: 5, symbol: "👪" },
          { id: 7, currentPos: 6, correctPos: 6, symbol: "😛" },
          { id: 8, currentPos: 7, correctPos: 7, symbol: "😜" },
          { id: 9, currentPos: 8, correctPos: 8, symbol: "🤪" },
        ],
        selectedPiece: null,
        moves: 0,
        solved: false,
      },
      completed: false,
      reward: "🧩 Perfeito! Assim como este quebra-cabeça, você completou minha vida! 🧩",
    },
  },

  // Capítulo 5: Superando Desafios
  {
    id: 16,
    type: "chapter",
    chapter: 5,
    title: "Mais Fortes Juntos",
    content: "Todo amor verdadeiro enfrenta tempestades e sai mais forte...",
  },
  {
    id: 17,
    type: "story",
    title: "Juntos Somos Invencíveis",
    content:
      "Nem tudo são flores, mas cada desafio que enfrentaremos juntos nos tornará mais unidos. Aprendi que o amor verdadeiro não é apenas sobre os momentos felizes, mas sobre estar ao lado um do outro em todos os momentos.",
    surprises: [
      {
        text: "⚡",
        message: "Quando estamos juntos, até a própria natureza se curva diante da nossa força! ⚡💪",
        icon: Heart,
        position: { x: 45, y: 140 },
      },
    ],
  },
  {
    id: 18,
    type: "interactive",
    title: "Encontre as Palavras do Amor",
    content: "Clique nas letras para encontrar as palavras escondidas que descrevem nosso amor!",
    interactive: {
      type: "word-find",
      data: {
        words: ["AMOR", "UNIDOS", "PAIXAO", "FELIZ", "ETERNO"],
        found: [],
        selectedCells: [],
        grid: [
          ["A", "M", "O", "R", "X", "E"],
          ["U", "N", "I", "D", "O", "S"],
          ["P", "A", "I", "X", "A", "O"],
          ["F", "E", "L", "I", "Z", "R"],
          ["O", "H", "O", "S", "O", "N"],
          ["E", "T", "E", "R", "N", "O"],
        ],
        wordPositions: {
          AMOR: [
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
          ],
          CARINHO: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 1, col: 5 },
          ],
          PAIXAO: [
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 2, col: 3 },
            { row: 2, col: 4 },
            { row: 2, col: 5 },
          ],
          FELIZ: [
            { row: 3, col: 0 },
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 3, col: 3 },
            { row: 3, col: 4 },
          ],
          ETERNO: [
            { row: 5, col: 0 },
            { row: 5, col: 1 },
            { row: 5, col: 2 },
            { row: 5, col: 3 },
            { row: 5, col: 4 },
            { row: 5, col: 5 },
          ],
        },
      },
      completed: false,
      reward: "📝 Você encontrou todas! Essas palavras resumem perfeitamente o que sinto por você! 📝",
    },
  },
  {
    id: 19,
    type: "interactive",
    title: "Jogo do Toque Mágico",
    content: "Memorize a sequência de corações que piscam e repita tocando na ordem certa!",
    interactive: {
      type: "tap-game",
      data: {
        sequence: [1, 3, 2, 4, 1],
        userTaps: [],
        showingSequence: false,
        sequenceStep: 0,
        gamePhase: "ready",
        hearts: [
          { id: 1, x: 25, y: 30, active: false },
          { id: 2, x: 75, y: 30, active: false },
          { id: 3, x: 25, y: 70, active: false },
          { id: 4, x: 75, y: 70, active: false },
        ],
        attempts: 0,
      },
      completed: false,
      reward: "✨ Seu toque não encosta só na pele… ele alcança minha alma. ✨",
    },
  },

  // Capítulo 6: Nosso Presente
  {
    id: 20,
    type: "chapter",
    chapter: 6,
    title: "Vivendo o Amor",
    content: "Hoje vivemos o melhor momento da nossa história...",
  },
  {
    id: 21,
    type: "story",
    title: "Cada Dia é um Presente",
    content:
      "Quando olhei para você, descubri que a sorte tem seu nome. Cada dia é um presente, e você trouxe luz e cores para minha vida que eu nem sabia que podiam sentir.",
    surprises: [
      {
        text: "☀️",
        message: "Você é meu sol! Em você encontro a luz que dissipa qualquer sombra dentro de mim!",
        icon: Star,
        position: { x: 70, y: 120 },
      },
      {
        text: "🏠",
        message: "Você não é apenas meu amor, é meu lar, meu porto seguro, meu lugar favorito no mundo.",
        icon: Heart,
        position: { x: 30, y: 140 },
      },
    ],
  },
  {
    id: 22,
    type: "interactive",
    title: "Jogo dos Números do Amor",
    content: "Clique nos números na ordem crescente para formar nossa data especial!",
    interactive: {
      type: "number-game",
      data: {
        numbers: [
          { value: 1, x: 20, y: 30, clicked: false },
          { value: 4, x: 80, y: 30, clicked: false },
          { value: 2, x: 50, y: 50, clicked: false },
          { value: 5, x: 20, y: 70, clicked: false },
          { value: 3, x: 80, y: 70, clicked: false },
        ],
        currentNumber: 1,
        completed: false,
      },
      completed: false,
      reward: " Perfeito! Cada número representa um beijo que voce me deve ksksksks! ",
    },
  },
  {
    id: 23,
    type: "interactive",
    title: "Deslize para o Amor",
    content: "Deslize o controle até o máximo para mostrar quanto te amo!",
    interactive: {
      type: "slider",
      data: {
        value: 0,
        maxValue: 100,
        completed: false,
      },
      completed: false,
      reward: " Isso mesmo! Meu amor por você está sempre no máximo! 100% seuuu!  ",
    },
  },

  // Capítulo 7: Nosso Futuro
  {
    id: 24,
    type: "chapter",
    chapter: 7,
    title: "Para Sempre",
    content: "O melhor ainda está por vir...",
  },
  {
    id: 25,
    type: "story",
    title: "Sonhando Juntos",
    content:
      "Quando penso no futuro, você está em cada sonho, em cada plano, em cada esperança. Quero envelhecer ao seu lado, criar memórias, viver aventuras e continuar me apaixonando por você todos os dias.",
    surprises: [
      {
        text: "🌈",
        message: "Como em um arco-íris, no final sempre terá um grande tesouro!",
        icon: Star,
        position: { x: 55, y: 140 },
      },
    ],
  },
  {
    id: 26,
    type: "interactive",
    title: "Jogo dos Padrões do Coração",
    content: "Complete o padrão romântico clicando nos corações na sequência correta!",
    interactive: {
      type: "pattern-match",
      data: {
        pattern: ["💕", "💖", "💕", "💖", "?"],
        options: ["💕", "💖", "💗", "💘"],
        userChoice: null,
        completed: false,
      },
      completed: false,
      reward: "💝 Incrível! Você entende perfeitamente o padrão do meu coração. Afinal é onde voce mora! 💝",
    },
  },
  {
    id: 27,
    type: "surprise",
    title: "Tesouro de Surpresas Especiais",
    content: "Você encontrou um baú de tesouros! Toque em cada joia para descobrir surpresas especiais! 💎",
    surprises: [
      {
        text: "💎",
        message: "VALE-JANTAR ROMÂNTICO! 💎 Você ganhou um jantar especial à luz de velas! 🕯️",
        icon: Gift,
        position: { x: 40, y: 30 },
      },
      {
        text: "👑",
        message: "Você é minha rainha! 👑 Mas também é o meu nenem! 👸",
        icon: Star,
        position: { x: 60, y: 45 },
      },
      {
        text: "🎁",
        message: "VALE-PRESENTE! 🎁 Um presente ou um beijo misterioso?! 😉",
        icon: Gift,
        position: { x: 25, y: 65 },
      },
      {
        text: "🌟",
        message: "VALE-MASSAGEM! 🌟 Você ganhou uma massagem relaxante feita com muito carinho! 💆‍♀️",
        icon: Heart,
        position: { x: 75, y: 60 },
      },
      {
        text: "🎪",
        message: "VALE-DIVERSÃO! 🎪 Vamos fazer algo divertido juntos! Você escolhe! 🎉",
        icon: Music,
        position: { x: 50, y: 75 },
      },
    ],
  },

  // Páginas finais
  {
    id: 28,
    type: "story",
    title: "Promessas de Amor",
    content:
      "Prometo te amar para sempre, em todos os momentos da minha vida. Prometo ser seu companheiro em todas as aventuras. Prometo sempre cuidar de você e te proteger. Prometo sempre te fazer sorrir, mesmo nos dias difíceis.",
    surprises: [
      {
        text: "💍",
        message: "PROMESSA ETERNA! 💍 Estas são promessas que faço do fundo do meu coração! 💕",
        icon: Heart,
        position: { x: 50, y: 140 },
      },
    ],
  },
  {
    id: 29,
    type: "story",
    title: "Infinito",
    content:
      "Não importa quantas páginas este livro tenha, nossa história nunca terá fim. Cada dia é uma nova página, cada momento uma nova linha de amor. Te amo hoje, amanhã e sempre!",
    surprises: [
      {
        text: "♾️",
        message: "INFINITO! ♾️ Assim é meu amor por você - SemEspaçoSemVirgulaESemPontoFinal - EuTeAmo",
        icon: Heart,
        position: { x: 50, y: 140 },
      },
    ],
  },
  {
    id: 30,
    type: "message",
    title: "Sua Vez de Escrever",
    content:
      "Agora é sua vez! Escreva uma mensagem especial para mim nesta última página. Suas palavras serão o final perfeito para nosso livro de amor! ✍️💕",
  },
]

export default function InteractiveLoveBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [bookStarted, setBookStarted] = useState(false)
  const [pageStates, setPageStates] = useState<Record<number, any>>({})
  const [showSurprise, setShowSurprise] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Efeito de corações flutuantes
  useEffect(() => {
    if (!bookStarted) return

    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-8),
        {
          id: Date.now(),
          x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
          y: typeof window !== "undefined" ? window.innerHeight : 600,
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [bookStarted])

  // Inicializar estados das páginas interativas
  useEffect(() => {
    const initialStates: Record<number, any> = {}
    bookPages.forEach((page) => {
      if (page.interactive) {
        // Embaralhar quebra-cabeça
        if (page.interactive.type === "puzzle") {
          const shuffled = [...page.interactive.data.pieces]
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = shuffled[i].currentPos
            shuffled[i].currentPos = shuffled[j].currentPos
            shuffled[j].currentPos = temp
          }
          initialStates[page.id] = { ...page.interactive.data, pieces: shuffled }
        } else {
          initialStates[page.id] = { ...page.interactive.data }
        }
      }
    })
    setPageStates(initialStates)
  }, [])

  const flipPage = (direction: "next" | "prev") => {
    if (isFlipping) return

    setIsFlipping(true)
    setTimeout(() => {
      if (direction === "next" && currentPage < bookPages.length - 1) {
        setCurrentPage(currentPage + 1)
      } else if (direction === "prev" && currentPage > 0) {
        setCurrentPage(currentPage - 1)
      }
      setIsFlipping(false)
    }, 300)
  }

  // Controles de toque para mobile
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = e.changedTouches[0].clientX
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) flipPage("next")
    if (isRightSwipe) flipPage("prev")
  }

  const handleSurpriseClick = (surprise: Surprise) => {
    setShowSurprise(surprise.message)
    // Criar corações na posição do clique
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setHearts((prev) => [...prev, ...newHearts])
  }

  // Handler para coração que preenche
  const handleHeartFill = (pageId: number) => {
    const currentState = pageStates[pageId]
    if (currentState && currentState.clicks < currentState.maxClicks) {
      const newClicks = currentState.clicks + 1
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, clicks: newClicks },
      }))

      if (newClicks === currentState.maxClicks) {
        const page = bookPages.find((p) => p.id === pageId)
        if (page && page.interactive && page.interactive.reward) {
          setTimeout(() => setShowSurprise(page.interactive.reward), 500)
        }
      }
    }
  }

  // Handler para enigma
  const handleRiddle = (pageId: number, answer: string) => {
    const currentState = pageStates[pageId]
    const page = bookPages.find((p) => p.id === pageId)

    if (currentState && answer.toLowerCase().trim() === currentState.answer) {
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, solved: true },
      }))
      if (page && page.interactive && page.interactive.reward) {
        setShowSurprise(page.interactive.reward)
      }
    } else if (currentState) {
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, attempts: currentState.attempts + 1 },
      }))
    }
  }

  // Handler para jogo da memória
  const handleMemoryCard = (pageId: number, index: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    // Não permitir clique se já tem 2 cartas viradas ou se a carta já está matched
    if (!currentState.canFlip || currentState.flipped.length >= 2 || currentState.matched.includes(index)) {
      return
    }

    // Não permitir clicar na mesma carta duas vezes
    if (currentState.flipped.includes(index)) {
      return
    }

    const newFlipped = [...currentState.flipped, index]
    setPageStates((prev) => ({
      ...prev,
      [pageId]: { ...currentState, flipped: newFlipped },
    }))

    // Se virou 2 cartas, verificar se são iguais
    if (newFlipped.length === 2) {
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, flipped: newFlipped, canFlip: false },
      }))

      setTimeout(() => {
        const [first, second] = newFlipped
        const cards = [...currentState.cards, ...currentState.cards] // Duplicar cartas

        if (cards[first] === cards[second]) {
          // Match encontrado
          const newMatched = [...currentState.matched, first, second]
          setPageStates((prev) => ({
            ...prev,
            [pageId]: {
              ...currentState,
              matched: newMatched,
              flipped: [],
              attempts: currentState.attempts + 1,
              canFlip: true,
            },
          }))

          // Verificar se o jogo terminou
          if (newMatched.length === currentState.cards.length * 2) {
            const page = bookPages.find((p) => p.id === pageId)
            if (page && page.interactive && page.interactive.reward) {
              setTimeout(() => setShowSurprise(page.interactive.reward), 500)
            }
          }
        } else {
          // Não é match, virar as cartas de volta
          setPageStates((prev) => ({
            ...prev,
            [pageId]: {
              ...currentState,
              flipped: [],
              attempts: currentState.attempts + 1,
              canFlip: true,
            },
          }))
        }
      }, 1000)
    }
  }

  // Handler para sequência
  const handleSequence = (pageId: number, optionIndex: number) => {
    const currentState = pageStates[pageId]
    const page = bookPages.find((p) => p.id === pageId)

    if (currentState && optionIndex === currentState.correct) {
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, solved: true },
      }))
      if (page && page.interactive && page.interactive.reward) {
        setShowSurprise(page.interactive.reward)
      }
    }
  }

  // Handler para jogo de cores
  const handleColorMatch = (pageId: number, color: string) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    if (currentState.gamePhase !== "playing") return

    const newUserSequence = [...currentState.userSequence, color]
    setPageStates((prev) => ({
      ...prev,
      [pageId]: { ...currentState, userSequence: newUserSequence },
    }))

    // Verificar se a sequência está correta até agora
    const isCorrectSoFar = newUserSequence.every((userColor, index) => userColor === currentState.sequence[index])

    if (!isCorrectSoFar) {
      // Sequência errada, resetar
      setTimeout(() => {
        setPageStates((prev) => ({
          ...prev,
          [pageId]: {
            ...currentState,
            userSequence: [],
            gamePhase: "showing",
            sequenceStep: 0,
            attempts: currentState.attempts + 1,
          },
        }))
        // Mostrar sequência novamente
        showColorSequence(pageId)
      }, 1000)
      return
    }

    if (newUserSequence.length === currentState.sequence.length) {
      // Sequência completa e correta!
      const page = bookPages.find((p) => p.id === pageId)
      if (page && page.interactive && page.interactive.reward) {
        setTimeout(() => setShowSurprise(page.interactive.reward), 500)
      }
    }
  }

  // Função para mostrar sequência de cores
  const showColorSequence = (pageId: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    let step = 0

    const showNext = () => {
      if (step < currentState.sequence.length) {
        setPageStates((prev) => ({
          ...prev,
          [pageId]: { ...currentState, sequenceStep: step, gamePhase: "showing" },
        }))
        step++
        setTimeout(showNext, 800)
      } else {
        setPageStates((prev) => ({
          ...prev,
          [pageId]: { ...currentState, gamePhase: "playing", sequenceStep: 0 },
        }))
      }
    }
    showNext()
  }

  // Handler para slider
  const handleSlider = (pageId: number, value: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    setPageStates((prev) => ({
      ...prev,
      [pageId]: { ...currentState, value },
    }))

    if (value >= currentState.maxValue && !currentState.completed) {
      const page = bookPages.find((p) => p.id === pageId)
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, completed: true },
      }))
      if (page && page.interactive && page.interactive.reward) {
        setTimeout(() => setShowSurprise(page.interactive.reward), 500)
      }
    }
  }

  // Handler para conectar pontos
  const handleConnectDot = (pageId: number, dotId: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    if (dotId === currentState.currentDot) {
      const newDots = currentState.dots.map((dot: any) => (dot.id === dotId ? { ...dot, connected: true } : dot))

      const newLines = [...currentState.lines]
      if (currentState.currentDot > 1) {
        const prevDot = currentState.dots.find((d: any) => d.id === currentState.currentDot - 1)
        const currentDotObj = currentState.dots.find((d: any) => d.id === currentState.currentDot)
        if (prevDot && currentDotObj) {
          newLines.push({
            from: { x: prevDot.x, y: prevDot.y },
            to: { x: currentDotObj.x, y: currentDotObj.y },
          })
        }
      }

      const nextDot = currentState.currentDot + 1
      const isCompleted = nextDot > currentState.dots.length

      setPageStates((prev) => ({
        ...prev,
        [pageId]: {
          ...currentState,
          dots: newDots,
          lines: newLines,
          currentDot: isCompleted ? currentState.currentDot : nextDot,
          completed: isCompleted,
        },
      }))

      if (isCompleted) {
        const page = bookPages.find((p) => p.id === pageId)
        if (page && page.interactive && page.interactive.reward) {
          setTimeout(() => setShowSurprise(page.interactive.reward), 500)
        }
      }
    }
  }

  // Handler para quebra-cabeça
  const handlePuzzlePiece = (pageId: number, pieceId: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    if (currentState.selectedPiece === null) {
      // Selecionar primeira peça
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, selectedPiece: pieceId },
      }))
    } else if (currentState.selectedPiece === pieceId) {
      // Desselecionar se clicar na mesma peça
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, selectedPiece: null },
      }))
    } else {
      // Trocar posições das peças
      const pieces = [...currentState.pieces]
      const piece1Index = pieces.findIndex((p) => p.id === currentState.selectedPiece)
      const piece2Index = pieces.findIndex((p) => p.id === pieceId)

      if (piece1Index !== -1 && piece2Index !== -1) {
        const temp = pieces[piece1Index].currentPos
        pieces[piece1Index].currentPos = pieces[piece2Index].currentPos
        pieces[piece2Index].currentPos = temp

        // Verificar se está resolvido
        const isSolved = pieces.every((piece) => piece.currentPos === piece.correctPos)

        setPageStates((prev) => ({
          ...prev,
          [pageId]: {
            ...currentState,
            pieces,
            selectedPiece: null,
            moves: currentState.moves + 1,
            solved: isSolved,
          },
        }))

        if (isSolved) {
          const page = bookPages.find((p) => p.id === pageId)
          if (page && page.interactive && page.interactive.reward) {
            setTimeout(() => setShowSurprise(page.interactive.reward), 500)
          }
        }
      }
    }
  }

  // Handler para caça-palavras
  const handleWordFindCell = (pageId: number, row: number, col: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    const cellKey = `${row}-${col}`

    const newSelectedCells = currentState.selectedCells.includes(cellKey)
      ? currentState.selectedCells.filter((cell: string) => cell !== cellKey)
      : [...currentState.selectedCells, cellKey]

    // Verificar se alguma palavra foi formada
    const newFound = [...currentState.found]

    Object.entries(currentState.wordPositions).forEach(([word, positions]: [string, any]) => {
      if (!newFound.includes(word)) {
        const wordCells = positions.map((pos: any) => `${pos.row}-${pos.col}`)
        const isWordSelected = wordCells.every((cell: string) => newSelectedCells.includes(cell))

        if (isWordSelected) {
          newFound.push(word)
        }
      }
    })

    setPageStates((prev) => ({
      ...prev,
      [pageId]: {
        ...currentState,
        selectedCells: newSelectedCells,
        found: newFound,
      },
    }))

    // Verificar se todas as palavras foram encontradas
    if (newFound.length === currentState.words.length) {
      const page = bookPages.find((p) => p.id === pageId)
      if (page && page.interactive && page.interactive.reward) {
        setTimeout(() => setShowSurprise(page.interactive.reward), 500)
      }
    }
  }

  // Handler para jogo do toque
  const handleTapGame = (pageId: number, heartId?: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    if (currentState.gamePhase === "ready") {
      // Iniciar o jogo mostrando a sequência
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, gamePhase: "showing", sequenceStep: 0 },
      }))

      showTapSequence(pageId)
    } else if (currentState.gamePhase === "playing" && heartId) {
      // Jogador tocou em um coração
      const newUserTaps = [...currentState.userTaps, heartId]

      // Verificar se o toque está correto
      const currentStep = newUserTaps.length - 1
      const isCorrect = newUserTaps[currentStep] === currentState.sequence[currentStep]

      if (!isCorrect) {
        // Toque errado, resetar
        setPageStates((prev) => ({
          ...prev,
          [pageId]: {
            ...currentState,
            userTaps: [],
            gamePhase: "ready",
            attempts: currentState.attempts + 1,
          },
        }))
        return
      }

      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, userTaps: newUserTaps },
      }))

      // Verificar se completou a sequência
      if (newUserTaps.length === currentState.sequence.length) {
        setPageStates((prev) => ({
          ...prev,
          [pageId]: { ...currentState, gamePhase: "complete" },
        }))

        const page = bookPages.find((p) => p.id === pageId)
        if (page && page.interactive && page.interactive.reward) {
          setTimeout(() => setShowSurprise(page.interactive.reward), 500)
        }
      }
    }
  }

  // Função para mostrar sequência do jogo do toque
  const showTapSequence = (pageId: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    let step = 0

    const showNext = () => {
      if (step < currentState.sequence.length) {
        const heartId = currentState.sequence[step]
        const newHearts = currentState.hearts.map((heart: any) => ({
          ...heart,
          active: heart.id === heartId,
        }))

        setPageStates((prev) => ({
          ...prev,
          [pageId]: { ...currentState, hearts: newHearts, sequenceStep: step },
        }))

        setTimeout(() => {
          const resetHearts = currentState.hearts.map((heart: any) => ({
            ...heart,
            active: false,
          }))
          setPageStates((prev) => ({
            ...prev,
            [pageId]: { ...currentState, hearts: resetHearts },
          }))
        }, 500)

        step++
        setTimeout(showNext, 800)
      } else {
        setPageStates((prev) => ({
          ...prev,
          [pageId]: { ...currentState, gamePhase: "playing" },
        }))
      }
    }
    showNext()
  }

  // Handler para jogo de números
  const handleNumberGame = (pageId: number, numberValue: number) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    if (numberValue === currentState.currentNumber) {
      const newNumbers = currentState.numbers.map((num: any) =>
        num.value === numberValue ? { ...num, clicked: true } : num,
      )

      const nextNumber = currentState.currentNumber + 1
      const isCompleted = nextNumber > Math.max(...currentState.numbers.map((n: any) => n.value))

      setPageStates((prev) => ({
        ...prev,
        [pageId]: {
          ...currentState,
          numbers: newNumbers,
          currentNumber: isCompleted ? currentState.currentNumber : nextNumber,
          completed: isCompleted,
        },
      }))

      if (isCompleted) {
        const page = bookPages.find((p) => p.id === pageId)
        if (page && page.interactive && page.interactive.reward) {
          setTimeout(() => setShowSurprise(page.interactive.reward), 500)
        }
      }
    }
  }

  // Handler para jogo de padrões
  const handlePatternMatch = (pageId: number, option: string) => {
    const currentState = pageStates[pageId]
    if (!currentState) return

    // O padrão é ["💕", "💖", "💕", "💖", "?"] então a resposta é "💕"
    const correctAnswer = "💕"

    if (option === correctAnswer) {
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, userChoice: option, completed: true },
      }))

      const page = bookPages.find((p) => p.id === pageId)
      if (page && page.interactive && page.interactive.reward) {
        setTimeout(() => setShowSurprise(page.interactive.reward), 500)
      }
    } else {
      setPageStates((prev) => ({
        ...prev,
        [pageId]: { ...currentState, userChoice: option },
      }))
    }
  }

  const renderInteractivePage = (page: BookPage) => {
    const state = pageStates[page.id]
    if (!state || !page.interactive) return null

    switch (page.interactive.type) {
      case "heart-fill":
        const progress = (state.clicks / state.maxClicks) * 100
        return (
          <div className="text-center">
            <p className="text-amber-700 mb-6">{page.content}</p>
            <div className="relative mb-6">
              <button
                onClick={() => handleHeartFill(page.id)}
                className="relative text-8xl transition-all duration-300 hover:scale-110"
                disabled={state.clicks >= state.maxClicks}
              >
                <Heart className="w-32 h-32 text-red-200 fill-current" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                >
                  <Heart className="w-32 h-32 text-red-500 fill-current" />
                </div>
              </button>
            </div>
            <p className="text-sm text-amber-600">
              {state.clicks}/{state.maxClicks} cliques
            </p>
            {progress === 100 && <div className="mt-4 text-2xl animate-bounce">💕 Completo! 💕</div>}
          </div>
        )

      case "riddle":
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
              <p className="text-amber-800 font-medium mb-4">"{state.riddle}"</p>
              {!state.solved ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Sua resposta..."
                    className="flex-1 p-2 border border-amber-300 rounded"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleRiddle(page.id, e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      if (input) {
                        handleRiddle(page.id, input.value)
                        input.value = ""
                      }
                    }}
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    Tentar
                  </Button>
                </div>
              ) : (
                <div className="text-center text-green-600 font-bold">
                  <Check className="w-6 h-6 inline mr-2" />
                  Correto! 🎉
                </div>
              )}
            </div>
          </div>
        )

      case "memory":
        const allCards = [...state.cards, ...state.cards]
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="grid grid-cols-4 gap-2 mb-4 max-w-xs mx-auto">
              {allCards.map((card: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleMemoryCard(page.id, index)}
                  className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl transition-all duration-300 ${
                    state.flipped.includes(index) || state.matched.includes(index)
                      ? "bg-pink-100 border-pink-300"
                      : "bg-amber-100 border-amber-300 hover:bg-amber-200"
                  }`}
                  disabled={state.matched.includes(index) || !state.canFlip}
                >
                  {state.flipped.includes(index) || state.matched.includes(index) ? card : "❓"}
                </button>
              ))}
            </div>
            <p className="text-sm text-amber-600 text-center">Tentativas: {state.attempts}</p>
            {state.matched.length === allCards.length && (
              <div className="text-center text-green-600 font-bold mt-4">
                <Check className="w-6 h-6 inline mr-2" />
                Parabéns! 🎉
              </div>
            )}
          </div>
        )

      case "sequence":
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-2 text-4xl mb-4">
                {state.sequence.map((item: string, index: number) => (
                  <span key={index} className={index === 3 ? "text-gray-400" : ""}>
                    {item}
                  </span>
                ))}
              </div>
              {!state.solved ? (
                <div className="flex justify-center gap-2">
                  {state.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleSequence(page.id, index)}
                      className="text-3xl p-2 bg-amber-100 hover:bg-amber-200 rounded-lg border border-amber-300 transition-all duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-green-600 font-bold">
                  <Check className="w-6 h-6 inline mr-2" />
                  Perfeito! 🎉
                </div>
              )}
            </div>
          </div>
        )

      case "color-match":
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="text-center mb-6">
              {state.gamePhase === "showing" && (
                <div className="mb-4">
                  <p className="text-sm text-amber-600 mb-2">Memorize a sequência:</p>
                  <div className="flex justify-center gap-2 mb-4">
                    {state.sequence.map((color: string, index: number) => (
                      <div
                        key={index}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          index === state.sequenceStep ? "scale-125 border-4" : ""
                        } ${
                          color === "red"
                            ? "bg-red-500"
                            : color === "pink"
                              ? "bg-pink-500"
                              : color === "purple"
                                ? "bg-purple-500"
                                : "bg-blue-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {state.gamePhase === "playing" && (
                <div>
                  <p className="text-sm text-amber-600 mb-2">Repita a sequência:</p>
                  <div className="flex justify-center gap-2 mb-4">
                    {state.userSequence.map((color: string, index: number) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full border-2 ${
                          color === "red"
                            ? "bg-red-500"
                            : color === "pink"
                              ? "bg-pink-500"
                              : color === "purple"
                                ? "bg-purple-500"
                                : "bg-blue-500"
                        }`}
                      />
                    ))}
                    {Array.from({ length: state.sequence.length - state.userSequence.length }).map((_, index) => (
                      <div key={index} className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100" />
                    ))}
                  </div>

                  <div className="flex justify-center gap-2">
                    {["red", "pink", "purple", "blue"].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorMatch(page.id, color)}
                        className={`w-12 h-12 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform ${
                          color === "red"
                            ? "bg-red-500"
                            : color === "pink"
                              ? "bg-pink-500"
                              : color === "purple"
                                ? "bg-purple-500"
                                : "bg-blue-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {state.gamePhase === "ready" && (
                <Button onClick={() => showColorSequence(page.id)} className="bg-amber-500 hover:bg-amber-600">
                  Iniciar Jogo
                </Button>
              )}
            </div>
          </div>
        )

      case "connect-dots":
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="relative bg-amber-50 rounded-lg p-4 mx-auto" style={{ width: "300px", height: "200px" }}>
              {/* Linhas conectadas */}
              <svg className="absolute inset-0 w-full h-full">
                {state.lines.map((line: any, index: number) => (
                  <line
                    key={index}
                    x1={`${line.from.x}%`}
                    y1={`${line.from.y}%`}
                    x2={`${line.to.x}%`}
                    y2={`${line.to.y}%`}
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                ))}
              </svg>

              {/* Pontos */}
              {state.dots.map((dot: any) => (
                <button
                  key={dot.id}
                  onClick={() => handleConnectDot(page.id, dot.id)}
                  className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    dot.connected
                      ? "bg-green-500 border-green-600 text-white"
                      : dot.id === state.currentDot
                        ? "bg-amber-300 border-amber-500 text-amber-800 animate-pulse"
                        : "bg-white border-amber-300 text-amber-600 hover:bg-amber-100"
                  }`}
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  disabled={dot.id !== state.currentDot}
                >
                  {dot.id}
                </button>
              ))}
            </div>
            <p className="text-sm text-amber-600 text-center mt-2">Clique no ponto {state.currentDot}</p>
            {state.completed && (
              <div className="text-center text-green-600 font-bold mt-4">
                <Check className="w-6 h-6 inline mr-2" />
                Destino revelado! 🎉
              </div>
            )}
          </div>
        )

      case "puzzle":
        const sortedPieces = [...state.pieces].sort((a, b) => a.currentPos - b.currentPos)
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto mb-4">
              {sortedPieces.map((piece: any) => (
                <button
                  key={piece.id}
                  onClick={() => handlePuzzlePiece(page.id, piece.id)}
                  className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl transition-all duration-200 ${
                    state.selectedPiece === piece.id
                      ? "bg-yellow-200 border-yellow-400 scale-105"
                      : "bg-amber-100 border-amber-300 hover:bg-amber-200"
                  }`}
                >
                  {piece.symbol}
                </button>
              ))}
            </div>
            <p className="text-sm text-amber-600 text-center">Movimentos: {state.moves}</p>
            {state.solved && (
              <div className="text-center text-green-600 font-bold mt-4">
                <Check className="w-6 h-6 inline mr-2" />
                Quebra-cabeça resolvido! 🎉
              </div>
            )}
          </div>
        )

      case "word-find":
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="mb-4">
              <p className="text-sm text-amber-600 mb-2">
                Encontre: {state.words.filter((w: string) => !state.found.includes(w)).join(", ")}
              </p>
              <div className="grid grid-cols-6 gap-1 max-w-xs mx-auto">
                {state.grid.map((row: string[], rowIndex: number) =>
                  row.map((letter: string, colIndex: number) => {
                    const cellKey = `${rowIndex}-${colIndex}`
                    const isSelected = state.selectedCells.includes(cellKey)
                    return (
                      <button
                        key={cellKey}
                        onClick={() => handleWordFindCell(page.id, rowIndex, colIndex)}
                        className={`w-8 h-8 border border-amber-300 flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                          isSelected ? "bg-green-200 border-green-400" : "bg-amber-100 hover:bg-amber-200"
                        }`}
                      >
                        {letter}
                      </button>
                    )
                  }),
                )}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-amber-600">
                Palavras encontradas: {state.found.length}/{state.words.length}
              </p>
              {state.found.length === state.words.length && (
                <div className="text-green-600 font-bold mt-2">
                  <Check className="w-6 h-6 inline mr-2" />
                  Todas encontradas! 🎉
                </div>
              )}
            </div>
          </div>
        )

      case "tap-game":
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="text-center">
              {state.gamePhase === "ready" && (
                <div className="mb-4">
                  <Button onClick={() => handleTapGame(page.id)} className="bg-amber-500 hover:bg-amber-600">
                    Iniciar Sequência
                  </Button>
                </div>
              )}

              {state.gamePhase === "showing" && <p className="text-sm text-amber-600 mb-4">Memorize a sequência...</p>}

              {state.gamePhase === "playing" && (
                <p className="text-sm text-amber-600 mb-4">Repita a sequência tocando nos corações!</p>
              )}

              <div className="relative bg-amber-50 rounded-lg p-4 mx-auto" style={{ width: "300px", height: "200px" }}>
                {state.hearts.map((heart: any) => (
                  <button
                    key={heart.id}
                    onClick={() => handleTapGame(page.id, heart.id)}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                      heart.active
                        ? "bg-red-300 scale-125 animate-pulse"
                        : state.gamePhase === "playing"
                          ? "bg-red-100 hover:bg-red-200 hover:scale-110"
                          : "bg-red-100"
                    }`}
                    style={{
                      left: `${heart.x}%`,
                      top: `${heart.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    disabled={state.gamePhase !== "playing"}
                  >
                    💕
                  </button>
                ))}
              </div>

              <p className="text-sm text-amber-600 mt-2">
                Progresso: {state.userTaps.length}/{state.sequence.length}
              </p>

              {state.gamePhase === "complete" && (
                <div className="text-center text-green-600 font-bold mt-4">
                  <Check className="w-6 h-6 inline mr-2" />
                  Sequência perfeita! 🎉
                </div>
              )}

              {state.attempts > 0 && <p className="text-xs text-amber-500 mt-2">Tentativas: {state.attempts}</p>}
            </div>
          </div>
        )

      case "number-game":
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="relative bg-amber-50 rounded-lg p-4 mx-auto" style={{ width: "300px", height: "200px" }}>
              {state.numbers.map((number: any) => (
                <button
                  key={number.value}
                  onClick={() => handleNumberGame(page.id, number.value)}
                  className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all duration-200 ${
                    number.clicked
                      ? "bg-green-500 border-green-600 text-white"
                      : number.value === state.currentNumber
                        ? "bg-amber-300 border-amber-500 text-amber-800 animate-pulse"
                        : "bg-white border-amber-300 text-amber-600 hover:bg-amber-100"
                  }`}
                  style={{
                    left: `${number.x}%`,
                    top: `${number.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  disabled={number.clicked || number.value !== state.currentNumber}
                >
                  {number.value}
                </button>
              ))}
            </div>
            <p className="text-sm text-amber-600 text-center mt-2">Clique no número {state.currentNumber}</p>
            {state.completed && (
              <div className="text-center text-green-600 font-bold mt-4">
                <Check className="w-6 h-6 inline mr-2" />
                Sequência completa! 🎉
              </div>
            )}
          </div>
        )

      case "slider":
        return (
          <div>
            <p className="text-amber-700 mb-6">{page.content}</p>
            <div className="text-center">
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={state.maxValue}
                  value={state.value}
                  onChange={(e) => handleSlider(page.id, Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <p className="text-2xl font-bold text-amber-800 mb-2">{state.value}%</p>
              <p className="text-sm text-amber-600">Deslize até 100% para mostrar seu amor!</p>
              {state.value >= state.maxValue && <div className="mt-4 text-2xl animate-bounce"> Máximo! </div>}
            </div>
          </div>
        )

      case "pattern-match":
        return (
          <div>
            <p className="text-amber-700 mb-4">{page.content}</p>
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-2 text-4xl mb-4">
                {state.pattern.map((item: string, index: number) => (
                  <span key={index} className={index === 4 ? "text-gray-400" : ""}>
                    {item}
                  </span>
                ))}
              </div>
              {!state.completed ? (
                <div className="flex justify-center gap-2">
                  {state.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handlePatternMatch(page.id, option)}
                      className={`text-3xl p-2 rounded-lg border transition-all duration-200 ${
                        state.userChoice === option
                          ? option === "💕"
                            ? "bg-green-100 border-green-300"
                            : "bg-red-100 border-red-300"
                          : "bg-amber-100 border-amber-300 hover:bg-amber-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-green-600 font-bold">
                  <Check className="w-6 h-6 inline mr-2" />
                  Padrão perfeito! 🎉
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!bookStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-amber-100 to-orange-100 shadow-2xl border-amber-200">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">📚</div>
              <h1 className="text-3xl font-bold text-amber-800 mb-2">Livro do nosso Amor</h1>
              <p className="text-amber-700 text-lg mb-4">30 páginas para ler quando sentir saudade.! 💕</p>
            </div>

            <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-2">Mini sinopse:</h3>
              <div className="text-sm text-amber-700 space-y-1">
                <p>Olá Isabela Da silva Luetkemeyer</p>
                <p>Este não é apenas um livro, é um pedaço do meu coração. Cada página foi criada para que, quando a saudade apertar, você possa me encontrar nas palavras, nos jogos e nos pequenos detalhes. Aqui, nosso amor ganha forma em histórias, memórias e sorrisos. É um lugar seguro onde, mesmo distante, eu sempre estarei ao seu lado.</p>
                
              </div>
            </div>

            <Button
              onClick={() => setBookStarted(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Heart className="w-5 h-5 mr-2" />
              Abrir o Livro
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const page = bookPages[currentPage]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Corações flutuantes */}
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-red-300 animate-ping pointer-events-none z-10"
          style={{
            left: heart.x,
            top: heart.y,
            animation: "float 4s ease-in-out forwards",
          }}
        />
      ))}

      {/* Modal de surpresa */}
      {showSurprise && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm bg-gradient-to-br from-pink-100 to-red-100 shadow-2xl border-pink-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4 animate-bounce"></div>
              <p className="text-pink-800 text-lg leading-relaxed mb-4">{showSurprise}</p>
              <Button
                onClick={() => setShowSurprise(null)}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Continuar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Livro */}
      <div className="relative">
        <Card
          className={`w-full max-w-lg mx-auto bg-gradient-to-br from-amber-100 to-orange-100 shadow-2xl border-amber-300 relative transition-transform duration-300 ${
            isFlipping ? "scale-95" : "scale-100"
          }`}
          style={{ minHeight: "600px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className="p-8 h-full relative">
            {/* Número da página */}
            <div className="absolute top-4 right-4 text-xs text-amber-600">
              {currentPage + 1} / {bookPages.length}
            </div>

            {/* Conteúdo da página */}
            <div className="h-full flex flex-col">
              {page.type === "cover" && (
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="text-6xl mb-6 animate-pulse">💕</div>
                  <h1 className="text-3xl font-bold text-amber-800 mb-4">{page.title}</h1>
                  <p className="text-amber-700 text-lg leading-relaxed">{page.content}</p>
                  <div className="mt-8 text-4xl animate-bounce">📖</div>
                </div>
              )}

              {page.type === "chapter" && (
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="text-5xl mb-4">📖</div>
                  <h1 className="text-2xl font-bold text-amber-800 mb-2">Capítulo {page.chapter}</h1>
                  <h2 className="text-xl text-amber-700 mb-4">{page.title}</h2>
                  <p className="text-amber-600 italic">{page.content}</p>
                </div>
              )}

              {page.type === "story" && (
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-amber-800 mb-6">{page.title}</h2>
                  <div className="flex-1 relative">
                    <p className="text-amber-700 text-lg leading-relaxed mb-4">{page.content}</p>

                    {/* Surpresas escondidas */}
                    {page.surprises?.map((surprise, index) => (
                      <button
                        key={index}
                        onClick={() => handleSurpriseClick(surprise)}
                        className="absolute text-2xl hover:scale-125 transition-transform duration-200 animate-pulse"
                        style={{
                          left: `${surprise.position.x}%`,
                          top: `${surprise.position.y}%`,
                        }}
                      >
                        {surprise.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {page.type === "interactive" && (
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-amber-800 mb-4">{page.title}</h2>
                  <div className="flex-1">{renderInteractivePage(page)}</div>
                </div>
              )}

              {page.type === "surprise" && (
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-amber-800 mb-4">{page.title}</h2>
                  <p className="text-amber-700 text-lg mb-6">{page.content}</p>

                  <div className="flex-1 relative bg-gradient-to-br from-pink-50 to-red-50 rounded-lg border-2 border-pink-200 p-4">
                    {page.surprises?.map((surprise, index) => (
                      <button
                        key={index}
                        onClick={() => handleSurpriseClick(surprise)}
                        className="absolute text-3xl hover:scale-125 transition-transform duration-200 animate-bounce"
                        style={{
                          left: `${surprise.position.x}%`,
                          top: `${surprise.position.y}%`,
                          animationDelay: `${index * 0.5}s`,
                        }}
                      >
                        {surprise.text}
                      </button>
                    ))}

                    <div className="text-center text-pink-600 text-sm mt-8">
                      Toque nos símbolos para descobrir as surpresas! 💝
                    </div>
                  </div>
                </div>
              )}

              {page.type === "message" && (
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-amber-800 mb-4">{page.title}</h2>
                  <p className="text-amber-700 mb-6">{page.content}</p>

                  <div className="flex-1 flex flex-col">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escreva sua mensagem de amor aqui... 💕"
                      className="flex-1 p-4 border-2 border-amber-200 rounded-lg resize-none focus:border-amber-400 focus:outline-none bg-white/80"
                      style={{ minHeight: "300px" }}
                    />

                    <Button
                      onClick={() => {
                        if (message.trim()) {
                          alert(
                            `Mensagem enviada com amor! 💕\n\n"${message}"\n\nObrigado por escrever em nosso livro! ❤️`,
                          )
                          setMessage("")
                        }
                      }}
                      disabled={!message.trim()}
                      className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Enviar Mensagem de Amor
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Controles de navegação */}
            <div className="absolute bottom-0 left-4 right-4 flex justify-between items-center">
              <Button
                onClick={() => flipPage("prev")}
                disabled={currentPage === 0 || isFlipping}
                className="bg-amber-200 hover:bg-amber-300 text-amber-800 p-2 rounded-full"
                size="sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="text-xs text-amber-600">Deslize ou use as setas para virar</div>

              <Button
                onClick={() => flipPage("next")}
                disabled={currentPage === bookPages.length - 1 || isFlipping}
                className="bg-amber-200 hover:bg-amber-300 text-amber-800 p-2 rounded-full"
                size="sm"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
