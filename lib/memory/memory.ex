defmodule Memory.Game do

  def new do
    %{
      lastGuess: [],
      lastGuess2: [],
      assignments: buttonAssignments(),
      completed: [],
      freeze: false,
      clicks: 0,
    }
  end

  def client_view(game) do
    %{
      completed: game.completed,
      skeleton: genSkel(game),
      freeze: game.freeze,
      clicks: game.clicks,
    }
  end

  def click(game, id, letter) do
    # update clicks

    lastGuess = game.lastGuess
    if (length(lastGuess) === 0) do
      Map.put(game, :lastGuess, [id, letter])

    else
      if letter === tl lastGuess do
        completed = game.completed
        completed = [letter | completed]
        lastGuess = []
        lastGuess2 = []

        Map.merge(game, %{completed: completed,
                          lastGuess: [],
                          lastGuess2: [] })
        # Map.put(game, :completed, completed)
        # Map.put(game, :lastGuess, [])
        # Map.put(game, :lastGuess2, [])
      else
        Map.put(game, :lastGuess2, [id, letter])
      end
    end
  end

  def genSkel(game) do
    Enum.map_reduce(game.assignments, 0, fn lett, i -> (
        if Enum.member?(game.completed, lett) do
          {lett, i+1}
        else
          if (Enum.at(game.lastGuess, 0) === i) do
            {lett, i+1}
          else
            if (Enum.at(game.lastGuess2, 0) === i) do
              {lett, i+1}
            else
              {" ", i+1}
            end
          end
        end
    ) end)
    |> Tuple.to_list
    |> hd
  end

  def buttonAssignments() do
    letters = ["A", "B", "C", "D", "E", "F", "G", "H",
              "A", "B", "C", "D", "E", "F", "G", "H"]
    Enum.shuffle(letters)
  end

end
