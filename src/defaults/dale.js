let matches = [
  {
    id: 1,
    playerOneId: 1,
    playerTwoId: 2,
    playerWinnerId: 2,
    is_capote: false,
    is_suicide: false,
    created_at: new Date("02/12/2024"),
  },
  {
    id: 2,
    playerOneId: 1,
    playerTwoId: 2,
    playerWinnerId: 2,
    is_capote: false,
    is_suicide: true,
    created_at: new Date("02/12/2024"),
  },
  {
    id: 3,
    playerOneId: 2,
    playerTwoId: 3,
    playerWinnerId: 2,
    is_capote: false,
    is_suicide: false,
    created_at: new Date("02/12/2024"),
  },
  {
    id: 4,
    playerOneId: 1,
    playerTwoId: 3,
    playerWinnerId: 1,
    is_capote: false,
    is_suicide: false,
    created_at: new Date("02/20/2024"),
  },
  {
    id: 5,
    playerOneId: 1,
    playerTwoId: 2,
    playerWinnerId: 2,
    is_capote: false,
    is_suicide: true,
    created_at: new Date("02/20/2024"),
  },
  {
    id: 6,
    playerOneId: 2,
    playerTwoId: 3,
    playerWinnerId: 2,
    is_capote: false,
    is_suicide: true,
    created_at: new Date("02/20/2024"),
  },
  {
    id: 7,
    playerOneId: 2,
    playerTwoId: 3,
    playerWinnerId: 2,
    is_capote: false,
    is_suicide: true,
    created_at: new Date("02/10/2024"),
  },
  {
    id: 8,
    playerOneId: 2,
    playerTwoId: 3,
    playerWinnerId: 2,
    is_capote: false,
    is_suicide: true,
    created_at: new Date("02/10/2024"),
  },
]

let players = [
  {
    id: 1,
    name: "Erik",
    matches: matches.filter(
      (match) => match.playerOneId === 1 || match.playerTwoId === 1
    ),
  },
  {
    id: 2,
    name: "Breno",
    matches: matches.filter(
      (match) => match.playerOneId === 2 || match.playerTwoId === 2
    ),
  },
  {
    id: 3,
    name: "David",
    matches: matches.filter(
      (match) => match.playerOneId === 3 || match.playerTwoId === 3
    ),
  },
]

function playersFnc() {
  console.log("players", players)
}

function matchesFnc() {
  console.log("matches before", matches)
}

function matchesFilterFnc() {
  // const today = new Date("10/02/2024");
  // const matchesFiltered = matches.filter((match) => match.created_at === today);
  // console.log("matches", matchesFiltered);
}

function groupMatches() {
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Função para agrupar as partidas por data
  function groupMatchesByDate() {
    const matchesByDate = {}
    matches.forEach((match) => {
      // const date = match.created_at.toDateString();

      const dateOne = formatDate(match.created_at)

      if (!matchesByDate[dateOne]) {
        matchesByDate[dateOne] = []
      }
      matchesByDate[dateOne].push(match)
    })
    return matchesByDate
  }

  // Exemplo de uso
  const matchesByDate = groupMatchesByDate()
  console.log(matchesByDate)
}

function calcStats(playerId) {
  function calculateStatsForLosers() {
    players.forEach((player) => {
      // Inicialize as estatísticas para cada jogador como 0
      let wins = 0
      let losses = 0
      let suicides = 0

      // Verifique cada partida do jogador
      player.matches.forEach((match) => {
        // Verifique se o jogador é o perdedor da partida
        const isLoser = match.playerWinnerId !== player.id
        if (isLoser) {
          // Incrementa o contador de derrotas
          losses++

          // Verifica se houve suicídio
          if (match.is_suicide) {
            suicides++
          }
        } else {
          // Incrementa o contador de vitórias para o adversário
          const opponentId =
            match.playerOneId === player.id
              ? match.playerTwoId
              : match.playerOneId
          const opponent = players.find((p) => p.id === opponentId)
          opponent.wins++
        }
      })

      // Atualiza as estatísticas no jogador
      player.losses = losses
      player.suicides = suicides
    })
  }

  calculateStatsForLosers()

  players.forEach((player) => {
    console.log(
      `Jogador: ${player.name}, Vitórias: ${player.wins}, Derrotas: ${player.losses}, Suicídios: ${player.suicides}`
    )
  })
}
