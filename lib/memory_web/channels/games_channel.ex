defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("click", %{ "lett" => letter, "i" => id}, socket) do
    game = Game.click(socket.assigns[:game], id, letter);
    socket = assign(socket, :game, game);
    {:reply, {:ok, %{ "game" => Game.client_view(game) }}, socket};
  end

  # def handle_in("assign", payload, socket) do
  #   # assgn = Game.buttonAssignments()
  #   # socket = assign(socket, :assign, assgn)
  #   {:reply, {:ok, %{ "array" => Game.buttonAssignments() }}, socket}
  #   # {:reply, {:ok, {"this is a test"} }, socket}
  # end

  # Add authorization logic here as required.
  def authorized?(_payload) do
    true
  end
end
