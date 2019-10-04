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

  def reset_game() do
    new()
  end

  def client_view(game) do
    %{
      completed: game.completed,
      skeleton: genSkel(game),
      freeze: game.freeze,
      clicks: game.clicks,
      lastGuess: game.lastGuess,
      lastGuess2: game.lastGuess2
    }
  end

  def click(game, id) do
    # get the assignments, the letter
    # and the lastGuess and lastGuess2
    assignments = game.assignments;
    letter = Enum.at(assignments, id);
    lastGuess = game.lastGuess
    lastGuess2 = game.lastGuess2
    clicks = game.clicks + 1

    # If this is the first guess or the first guess after trying
    # to make a match
    if (length(lastGuess) === 0 || length(lastGuess2) != 0) do
      Map.merge(game, %{lastGuess: [id, letter], lastGuess2: [],
                        clicks: clicks})

    # otherwise
    else
      # if you made a match update the completed array
      if to_string(tl lastGuess) === letter do
        completed = game.completed
        completed = [letter | completed]

        Map.merge(game, %{completed: completed,
                          lastGuess: [],
                          lastGuess2: [],
                          clicks: clicks})
      else
        # the delay needs to go here
        Map.merge(game, %{lastGuess2: [id, letter], clicks: clicks})
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
