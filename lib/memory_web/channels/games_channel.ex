defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game
  alias Memory.BackupAgent

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = BackupAgent.get(name) || Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      BackupAgent.put(name, game)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("click", %{ "i" => id}, socket) do
    game = Game.click(socket.assigns[:game], id);
    socket = assign(socket, :game, game);
    name = socket.assigns[:name]
    BackupAgent.put(name, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game) }}, socket};
  end

  def handle_in("reset", _payload, socket) do
    game = Game.reset_game();
    socket = assign(socket, :game, game);
    name = socket.assigns[:name]
    BackupAgent.put(name, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game) }}, socket};
  end

  # Add authorization logic here as required.
  def authorized?(_payload) do
    true
  end
end
